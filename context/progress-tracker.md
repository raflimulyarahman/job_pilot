# Progress Tracker

Update this file after every completed feature. Any AI agent reading this should immediately know what is done, what is in progress, and what is next.

---

## Current Status

**Phase:** Phase 1 — Foundation
**Last completed:** 04 Database Schema
**Next:** 05 Profile Page — Full UI

---

## Progress

### Phase 1 — Foundation

- [x] 01 Homepage
- [x] 02 Auth
- [x] 03 PostHog Initialization
- [x] 04 Database Schema

### Phase 2 — Profile Page

- [ ] 05 Profile Page — Full UI
- [ ] 06 Profile Save Logic
- [ ] 07 AI Profile Extraction from Resume
- [ ] 08 Resume PDF Generation from Profile

### Phase 3 — Find Jobs Page

- [ ] 09 Find Jobs Page — Full UI
- [ ] 10 Adzuna Job Discovery
- [ ] 11 Filter + Sort + Pagination

### Phase 4 — Job Details Page

- [ ] 12 Job Details Page — Full UI
- [ ] 13 Company Research Agent

### Phase 5 — Dashboard

- [ ] 14 Dashboard Page — Full UI
- [ ] 15 Stats Bar — Real Data
- [ ] 16 Recent Activity — Real Data
- [ ] 17 Analytics Charts — PostHog Data

---

## Decisions Made During Build

- **01 Homepage:** Defined `.bg-hero-gradient` and `.bg-hatch-pattern` in `app/globals.css` using `@theme` CSS variables (`--color-info-light`, `--color-accent-light`, `--color-accent-muted`, `--color-surface`, `--color-border`) to reproduce the landing page pastel mesh background and diagonal hatch dividers without any hardcoded hex values or raw Tailwind color classes.
- **01 Homepage:** Configured `Inter` font via `next/font/google` with `--font-sans` variable in `app/layout.tsx` per `ui-rules.md`.
- **02 Auth:** Used `@insforge/sdk/ssr` (`createBrowserClient`, `createServerClient`, `createAuthActions`, `updateSession`, `refreshAuth`) for SSR cookie-based authentication (`lib/insforge-client.ts`, `lib/insforge-server.ts`, `actions/auth.ts`, `app/api/auth/refresh/route.ts`).
- **02 Auth:** Used Next.js 16 `proxy.ts` convention (replacing deprecated `middleware.ts`) to refresh sessions and protect `/dashboard`, `/profile`, `/find-jobs`, and `/find-jobs/[id]`, while redirecting authenticated users from `/login` to `/dashboard`.
- **02 Auth:** Wrapped dynamic `cookies()` and `searchParams` reads on `/login` and `/callback` inside `<Suspense>` boundaries to support Next.js 16 `cacheComponents: true`.
- **03 PostHog Initialization:** Initialized PostHog client SDK in `lib/posthog-client.ts` with strict TypeScript event types (`PostHogEventName`), and server SDK in `lib/posthog-server.ts` with `posthog-node` (`flushAt: 1`, `flushInterval: 0`). Configured `PostHogProvider` client component wrapping root layout (`app/layout.tsx`) with a `<Suspense>`-protected pageview listener (`$pageview`). Wired client event tracking for `oauth_sign_in_started`, `user_signed_in`, `user_signed_out`, `dashboard_viewed`, and `cta_clicked` across the existing application.
- **04 Database Schema:** Migration in `db/migrations/001_schema.sql` (applied via InsForge `run-raw-sql`). `profiles.id` = `auth.users.id`; a trigger on `auth.users` auto-creates a minimal profile (id, email) at signup, and existing users were backfilled. `agent_runs`/`jobs`/`agent_logs` reference `profiles` with cascade; `jobs.run_id` and `agent_logs.job_id` use `ON DELETE SET NULL`. CHECK constraints on all enum-like columns (incl. `jobs.source IN ('search','url')`, `match_score` 0–100). Partial unique index on `jobs (user_id, source_url)` prevents duplicate jobs on re-search. Owner-only RLS (select/insert/update/delete via `auth.uid()`) on all four tables — agent writes must use the user-session server client.
- **04 Database Schema:** `resumes` bucket is private (`isPublic: false`). InsForge's built-in `storage.objects` RLS already restricts access to the uploader, so no custom storage policies were added. `profiles.resume_pdf_url` stores the object key (`{user_id}/resume.pdf`), not a public URL — read via authenticated download. Completion percentage/missing fields are computed in code (Feature 06); only `is_complete` is persisted.

---

## Notes

- Note: The terminal screenshot in `public/images/` is named `agnet-log.png` (referenced as `/images/agnet-log.png`).
