# Memory — 04 Database Schema

Last updated: 2026-11-12 11:45:00

## What was built

- Created database migration file `db/migrations/001_schema.sql` and applied to InsForge PostgreSQL database:
  - `profiles`: user profile table linked to `auth.users(id)` with cascading delete, array fields for skills/industries/seeking, JSONB for work experience and education, and enum CHECK constraints.
  - `agent_runs`: tracks job search execution status, criteria, and count, referencing `profiles(id)`.
  - `jobs`: stores discovered job postings with source constraints (`'search' | 'url'`), match score (0-100), AI reasoning, and `company_research` JSONB column.
  - `agent_logs`: logs runtime messages per run and job with severity levels.
  - Indexes: `jobs (user_id, found_at desc)`, `jobs (user_id, match_score desc)`, partial unique index on `jobs (user_id, source_url)` where source_url is not null, `agent_runs (user_id, started_at desc)`, and `agent_logs` indexes.
  - Triggers & functions: `set_updated_at()` for automatic `updated_at` management on `profiles`; `handle_new_user()` security definer trigger on `auth.users` to initialize minimal profile rows on signup, plus existing user backfill.
  - Row Level Security: enabled on all 4 tables with 16 owner-only policies restricting CRUD operations to `auth.uid() = user_id` (or `id = auth.uid()` on `profiles`).
- Storage:
  - Created private `resumes` bucket (`isPublic: false`) in InsForge Storage, protected by built-in uploader-based RLS on `storage.objects`.
- Updated documentation:
  - `context/progress-tracker.md`: Marked 04 Database Schema completed, set next feature to 05 Profile Page — Full UI, and documented schema & storage decisions.
  - `context/architecture.md`: Updated InsForge Storage documentation for private bucket behavior and object key persistence.

## Decisions made

- `profiles.id` mirrors `auth.users.id` directly with `ON DELETE CASCADE`.
- Used `handle_new_user()` trigger to automatically create profile records at signup so foreign keys from downstream tables always resolve.
- Foreign keys on `jobs.run_id` and `agent_logs.job_id` use `ON DELETE SET NULL` to preserve job listings and log context if a run record is removed.
- Enforced strict CHECK constraints for enum columns in Postgres (`jobs.source IN ('search', 'url')`, `match_score BETWEEN 0 AND 100`, etc.).
- Stored object keys (e.g., `{user_id}/resume.pdf`) in `profiles.resume_pdf_url` rather than public URLs, with access via authenticated download.
- Stale "tailored fields" from older plan drafts were omitted, matching `context/architecture.md`.

## Problems solved

- Inspected InsForge internal storage schema and verified built-in `storage.objects` RLS already enforces `uploaded_by = (auth.jwt() ->> 'sub')`, avoiding redundant storage policies.
- Executed migration in two chunks to avoid statement timeouts, verifying all 4 tables, 16 policies, 2 triggers, and 1 bucket via metadata queries.

## Current state

- Phase 1 (Foundation) is 100% complete (01 Homepage, 02 Auth, 03 PostHog Initialization, 04 Database Schema).
- InsForge PostgreSQL schema and private Storage bucket are live and verified.
- Application builds and lints with 0 errors.

## Next session starts with

- Phase 2, Feature 05: Profile Page — Full UI:
  - Build complete profile UI in `app/profile/page.tsx` with mock data (completion banner with ring, resume upload and generator controls, multi-section personal/professional/experience/education/preferences form, and save button).

## Open questions

- None.
