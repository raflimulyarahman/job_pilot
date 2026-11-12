-- 001_schema.sql — Feature 04 Database Schema
-- Tables: profiles, agent_runs, jobs, agent_logs. RLS: owner-only on all.

-- ---------- profiles ----------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  phone text,
  location text,
  current_title text,
  experience_level text check (experience_level in ('junior','mid','senior','lead')),
  years_experience integer check (years_experience >= 0),
  skills text[] not null default '{}',
  industries text[] not null default '{}',
  work_experience jsonb not null default '[]'::jsonb,
  education jsonb,
  job_titles_seeking text[] not null default '{}',
  remote_preference text check (remote_preference in ('remote','onsite','hybrid','any')),
  preferred_locations text[] not null default '{}',
  salary_expectation text,
  cover_letter_tone text check (cover_letter_tone in ('formal','casual','enthusiastic')),
  linkedin_url text,
  portfolio_url text,
  work_authorization text check (work_authorization in ('citizen','permanent_resident','visa_required')),
  resume_pdf_url text, -- storage object key in the private 'resumes' bucket (not a public URL)
  is_complete boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------- agent_runs ----------
create table if not exists public.agent_runs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  status text not null default 'running' check (status in ('running','completed','failed')),
  job_title_searched text,
  location_searched text,
  jobs_found integer not null default 0,
  started_at timestamptz not null default now(),
  completed_at timestamptz
);

-- ---------- jobs ----------
create table if not exists public.jobs (
  id uuid primary key default gen_random_uuid(),
  run_id uuid references public.agent_runs(id) on delete set null,
  user_id uuid not null references public.profiles(id) on delete cascade,
  source text not null check (source in ('search','url')),
  source_url text,
  external_apply_url text,
  title text,
  company text,
  location text,
  salary text,
  job_type text check (job_type in ('fulltime','parttime','contract')),
  about_role text,
  responsibilities text[] not null default '{}',
  requirements text[] not null default '{}',
  nice_to_have text[] not null default '{}',
  benefits text[] not null default '{}',
  about_company text,
  match_score integer check (match_score between 0 and 100),
  match_reason text,
  matched_skills text[] not null default '{}',
  missing_skills text[] not null default '{}',
  company_research jsonb,
  found_at timestamptz not null default now()
);

-- ---------- agent_logs ----------
create table if not exists public.agent_logs (
  id uuid primary key default gen_random_uuid(),
  run_id uuid references public.agent_runs(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  message text not null,
  level text not null default 'info' check (level in ('info','success','warning','error')),
  job_id uuid references public.jobs(id) on delete set null,
  created_at timestamptz not null default now()
);

-- ---------- indexes ----------
create index if not exists jobs_user_found_idx on public.jobs (user_id, found_at desc);
create index if not exists jobs_user_score_idx on public.jobs (user_id, match_score desc);
create unique index if not exists jobs_user_source_url_uidx on public.jobs (user_id, source_url) where source_url is not null;
create index if not exists agent_runs_user_started_idx on public.agent_runs (user_id, started_at desc);
create index if not exists agent_logs_run_created_idx on public.agent_logs (run_id, created_at);
create index if not exists agent_logs_user_idx on public.agent_logs (user_id);

-- ---------- triggers ----------
create or replace function public.set_updated_at() returns trigger
language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at before update on public.profiles
  for each row execute function public.set_updated_at();

-- Minimal profile row at signup so FKs from agent_runs/jobs always resolve.
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email) values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- Backfill users who signed in before this migration.
insert into public.profiles (id, email)
select id, email from auth.users
on conflict (id) do nothing;

-- ---------- RLS (owner-only) ----------
alter table public.profiles enable row level security;
alter table public.agent_runs enable row level security;
alter table public.jobs enable row level security;
alter table public.agent_logs enable row level security;

create policy profiles_owner_select on public.profiles for select to authenticated using (id = (select auth.uid()));
create policy profiles_owner_insert on public.profiles for insert to authenticated with check (id = (select auth.uid()));
create policy profiles_owner_update on public.profiles for update to authenticated using (id = (select auth.uid())) with check (id = (select auth.uid()));
create policy profiles_owner_delete on public.profiles for delete to authenticated using (id = (select auth.uid()));

create policy agent_runs_owner_select on public.agent_runs for select to authenticated using (user_id = (select auth.uid()));
create policy agent_runs_owner_insert on public.agent_runs for insert to authenticated with check (user_id = (select auth.uid()));
create policy agent_runs_owner_update on public.agent_runs for update to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
create policy agent_runs_owner_delete on public.agent_runs for delete to authenticated using (user_id = (select auth.uid()));

create policy jobs_owner_select on public.jobs for select to authenticated using (user_id = (select auth.uid()));
create policy jobs_owner_insert on public.jobs for insert to authenticated with check (user_id = (select auth.uid()));
create policy jobs_owner_update on public.jobs for update to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
create policy jobs_owner_delete on public.jobs for delete to authenticated using (user_id = (select auth.uid()));

create policy agent_logs_owner_select on public.agent_logs for select to authenticated using (user_id = (select auth.uid()));
create policy agent_logs_owner_insert on public.agent_logs for insert to authenticated with check (user_id = (select auth.uid()));
create policy agent_logs_owner_update on public.agent_logs for update to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
create policy agent_logs_owner_delete on public.agent_logs for delete to authenticated using (user_id = (select auth.uid()));
