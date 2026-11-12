# UI Registry

Living document. Updated after every component is built. Read this before building any new component — match existing patterns exactly before inventing new ones.

---

## How to Use

Before building any component:

1. Check if a similar component already exists here
2. If yes — match its exact classes
3. If no — build it following ui-rules.md and ui-tokens.md, then add it here

After building any component — update this file with the component name, file path, and exact classes used.

---

## Components

### Navbar

File: `components/layout/Navbar.tsx`
Last updated: 2026-11-12

| Property         | Class                                                                 |
| ---------------- | --------------------------------------------------------------------- |
| Background       | `bg-surface`                                                          |
| Border           | `border-b border-border-light`                                        |
| Border radius    | `rounded-lg` (CTA button)                                             |
| Text — primary   | `text-sm font-medium text-text-dark`                                  |
| Text — secondary | `text-xs font-medium text-accent-foreground` (CTA button)             |
| Spacing          | `max-w-7xl mx-auto px-6 h-20`, `gap-8` (nav items), `px-4 py-2.5`     |
| Hover state      | `hover:text-accent transition-colors`, `hover:opacity-90`             |
| Shadow           | `shadow-xs` (CTA button)                                              |
| Accent usage     | `text-accent` (active nav link), `bg-overlay-dark` (CTA button)       |

**Pattern notes:**
Full-width top navigation bar (`h-20` on marketing header) with centered `max-w-7xl` inner container, `/logo.png` brand image on left, 3 core route links (`Dashboard`, `Find Jobs`, `Profile`) in center, and dark primary CTA on right.

---

### Hero

File: `components/homepage/Hero.tsx`
Last updated: 2026-11-12

| Property         | Class                                                                 |
| ---------------- | --------------------------------------------------------------------- |
| Background       | `bg-hero-gradient` (top banner), `bg-surface-tertiary` (demo frame)   |
| Border           | `border-y border-border-light`, `border-b border-border-light`        |
| Border radius    | `rounded-lg` (CTA buttons), `rounded-2xl` (preview image)             |
| Text — primary   | `text-4xl sm:text-5xl md:text-[56px] font-bold text-text-black`       |
| Text — secondary | `text-sm sm:text-base text-text-slate-medium leading-relaxed`         |
| Spacing          | `py-24 px-6`, `p-6 sm:p-10 md:p-14`, `gap-3` (buttons), `px-5 py-2.5` |
| Hover state      | `hover:opacity-90 transition-opacity`, `hover:bg-surface-secondary`   |
| Shadow           | `shadow-xs` (primary CTA), `shadow-2xs` (secondary CTA)               |
| Accent usage     | `bg-overlay-dark text-accent-foreground` (primary CTA)                |

**Pattern notes:**
Pastel mesh gradient hero banner using CSS variables via `.bg-hero-gradient` paired with a secondary surface container showcasing `/images/dashboard-demo.png`.

---

### HowItWorks

File: `components/homepage/HowItWorks.tsx`
Last updated: 2026-11-12

| Property         | Class                                                                 |
| ---------------- | --------------------------------------------------------------------- |
| Background       | `bg-surface` (text column), `bg-background` (visual preview column)   |
| Border           | `border-border-light`, `border-r border-dashed border-border-light`   |
| Border radius    | `rounded-xl` (feature preview images)                                 |
| Text — primary   | `text-3xl sm:text-4xl font-semibold text-text-slate`, `text-base font-semibold text-text-slate` |
| Text — secondary | `text-sm text-text-slate-medium leading-relaxed`                      |
| Spacing          | `px-8 py-12` (section header), `px-8 py-8` (step rows), `p-8 lg:p-10` |
| Hover state      | none                                                                  |
| Shadow           | none                                                                  |
| Accent usage     | `border-r-2 border-accent` (step 1 active bar), `border-r-2 border-success-dark` (step 2 active bar) |

**Pattern notes:**
Two-column split grid separated by `h-18 bg-hatch-pattern` dividers. Text columns feature a `w-12` left gutter with a dashed vertical border that turns solid (`border-accent` or `border-success-dark`) on the highlighted step.

---

### Features

File: `components/homepage/Features.tsx`
Last updated: 2026-11-12

| Property         | Class                                                                 |
| ---------------- | --------------------------------------------------------------------- |
| Background       | `bg-surface` (testimonial), `bg-hero-gradient` (bottom CTA)           |
| Border           | `border-b border-border-light`, `border-border-muted` (secondary CTA) |
| Border radius    | `rounded-xl` (avatar), `rounded-lg` (CTA buttons)                     |
| Text — primary   | `text-xl sm:text-2xl md:text-[26px] font-medium text-text-slate`, `text-3xl sm:text-4xl md:text-[48px] font-bold text-text-slate` |
| Text — secondary | `text-sm sm:text-base text-text-slate-medium`, `text-xs text-text-muted` |
| Spacing          | `py-20 px-6` (testimonial), `py-24 px-6` (bottom CTA), `gap-3`        |
| Hover state      | `hover:opacity-90 transition-opacity`, `hover:bg-surface-secondary`   |
| Shadow           | `shadow-xs`, `shadow-2xs`                                             |
| Accent usage     | `text-xs font-semibold uppercase tracking-widest text-accent`         |

**Pattern notes:**
Combines the centered customer testimonial card (`SUCCESS STORIES`) and the bottom conversion CTA banner, separated by `.bg-hatch-pattern` dividers.

---

### Footer

File: `components/layout/Footer.tsx`
Last updated: 2026-11-12

| Property         | Class                                                                 |
| ---------------- | --------------------------------------------------------------------- |
| Background       | `bg-surface`                                                          |
| Border           | `border-x border-border-light`                                        |
| Border radius    | none                                                                  |
| Text — primary   | `text-sm font-medium text-text-dark`                                  |
| Text — secondary | none                                                                  |
| Spacing          | `max-w-7xl mx-auto px-8 py-10`, `gap-7` (footer links)                |
| Hover state      | `hover:text-accent transition-colors`                                 |
| Shadow           | none                                                                  |
| Accent usage     | `hover:text-accent`                                                   |

**Pattern notes:**
Minimal framed footer matching the `max-w-7xl` central column with `/logo.png` on the left and utility links on the right.

---

### LoginCard

File: `components/auth/LoginCard.tsx`
Last updated: 2026-11-12

| Property         | Class                                                                 |
| ---------------- | --------------------------------------------------------------------- |
| Background       | `bg-surface` (card & Google button), `bg-overlay-dark` (GitHub button) |
| Border           | `border border-border` (card & Google button), `border border-error` (error banner) |
| Border radius    | `rounded-2xl` (card), `rounded-lg` (buttons & alert), `rounded-full` (badge) |
| Text — primary   | `text-2xl font-semibold text-text-primary`, `text-sm font-medium text-text-primary` |
| Text — secondary | `text-sm text-text-secondary`, `text-xs text-text-muted`              |
| Spacing          | `p-8` (card), `px-4 py-2.5` (buttons), `gap-3` (button stack & icons) |
| Hover state      | `hover:bg-surface-secondary transition-colors`, `hover:opacity-90 transition-opacity` |
| Shadow           | `shadow-xs` (card & GitHub button), `shadow-2xs` (Google button)      |
| Accent usage     | `bg-accent-light text-accent` (pill badge)                            |

**Pattern notes:**
Centered `max-w-md` authentication card placed inside the `.bg-hero-gradient` framed container, featuring Google and GitHub OAuth buttons with loading states and inline error alert banner.

---

### OAuthCallback

File: `components/auth/OAuthCallback.tsx`
Last updated: 2026-11-12

| Property         | Class                                                                 |
| ---------------- | --------------------------------------------------------------------- |
| Background       | `bg-surface` (card), `bg-surface-secondary` (error icon circle)       |
| Border           | `border border-border` (card & spinner track), `border-t-accent` (spinner) |
| Border radius    | `rounded-2xl` (card), `rounded-full` (spinner & icon), `rounded-lg` (button) |
| Text — primary   | `text-base font-semibold text-text-primary`                           |
| Text — secondary | `text-sm text-text-secondary`, `text-xs text-text-muted`              |
| Spacing          | `p-8` (card), `px-4 py-2` (CTA button)                                |
| Hover state      | `hover:opacity-90 transition-opacity`                                 |
| Shadow           | `shadow-xs`                                                           |
| Accent usage     | `border-t-accent` (spinner), `bg-accent text-accent-foreground` (button) |

**Pattern notes:**
Centered `max-w-md` status card displayed during PKCE OAuth code exchange, transitioning automatically to `/dashboard` on success or presenting a recovery link to `/login` on failure.

---

### SignOutButton

File: `components/auth/SignOutButton.tsx`
Last updated: 2026-11-12

| Property         | Class                                                                 |
| ---------------- | --------------------------------------------------------------------- |
| Background       | `bg-surface`                                                          |
| Border           | `border border-border`                                                |
| Border radius    | `rounded-lg`                                                          |
| Text — primary   | `text-sm font-medium text-text-primary`                               |
| Text — secondary | none                                                                  |
| Spacing          | `px-4 py-2`                                                           |
| Hover state      | `hover:bg-surface-secondary transition-colors`                        |
| Shadow           | none                                                                  |
| Accent usage     | none                                                                  |

**Pattern notes:**
Secondary action button used to terminate the current InsForge session via `signOutUser` and redirect to `/login`.

---

### DashboardSessionCard

File: `app/dashboard/page.tsx`
Last updated: 2026-11-12

| Property         | Class                                                                 |
| ---------------- | --------------------------------------------------------------------- |
| Background       | `bg-surface` (card), `bg-success-lightest` (badge)                    |
| Border           | `border border-border`                                                |
| Border radius    | `rounded-2xl` (card), `rounded-full` (status badge)                   |
| Text — primary   | `text-base font-semibold text-text-primary`                           |
| Text — secondary | `text-xs text-text-muted`, `text-success-foreground` (badge)          |
| Spacing          | `p-6` (card), `gap-4` (content row), `gap-2` (badge row), `px-2.5 py-0.5` (badge) |
| Hover state      | none                                                                  |
| Shadow           | `shadow-xs`                                                           |
| Accent usage     | `bg-success-lightest text-success-foreground` (authenticated pill)     |

**Pattern notes:**
Full-width dashboard session banner rendering active authentication state, user identity, and sign-out controls. Adheres directly to card tokens in `ui-tokens.md` and `ui-rules.md`.

---

### PostHogProvider

File: `components/providers/PostHogProvider.tsx`
Last updated: 2026-11-12

| Property         | Class |
| ---------------- | ----- |
| Background       | none  |
| Border           | none  |
| Border radius    | none  |
| Text — primary   | none  |
| Text — secondary | none  |
| Spacing          | none  |
| Hover state      | none  |
| Shadow           | none  |
| Accent usage     | none  |

**Pattern notes:**
Client-side context wrapper initialized with `posthog-js`, wrapping all routes with `<PHProvider client={posthog}>` and an inner `<PostHogPageView>` under a `<Suspense>` boundary to capture route change pageviews.

---

### TrackedLink

File: `components/common/TrackedLink.tsx`
Last updated: 2026-11-12

| Property         | Class                                                |
| ---------------- | ---------------------------------------------------- |
| Background       | Inherited from caller props                          |
| Border           | Inherited from caller props                          |
| Border radius    | Inherited from caller props                          |
| Text — primary   | Inherited from caller props                          |
| Text — secondary | Inherited from caller props                          |
| Spacing          | Inherited from caller props                          |
| Hover state      | Inherited from caller props                          |
| Shadow           | Inherited from caller props                          |
| Accent usage     | Inherited from caller props                          |

**Pattern notes:**
Transparent client-side wrapper around Next.js `<Link>` that intercepts click interactions to dispatch `cta_clicked` analytics events before standard navigation.
