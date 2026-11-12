import posthog from "posthog-js";

export function initPostHog(): typeof posthog {
  if (typeof window !== "undefined") {
    const apiKey =
      process.env.NEXT_PUBLIC_POSTHOG_KEY ||
      process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
    const host =
      process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

    if (apiKey && !posthog.__loaded) {
      posthog.init(apiKey, {
        api_host: host,
        capture_pageview: false, // Manual pageview tracking handled in PostHogProvider
        person_profiles: "identified_only",
        defaults: "2026-08-30",
        capture_exceptions: true,
      });
    }
  }

  return posthog;
}

export type PostHogEventName =
  | "job_search_started"
  | "job_found"
  | "profile_completed"
  | "company_researched"
  | "oauth_sign_in_started"
  | "user_signed_in"
  | "user_signed_out"
  | "cta_clicked"
  | "dashboard_viewed";

export type PostHogEventProperties = {
  job_search_started: { userId: string; jobTitle: string; location?: string };
  job_found: { userId: string; source: string; matchScore: number };
  profile_completed: { userId: string };
  company_researched: { userId: string; jobId: string; company: string };
  oauth_sign_in_started: { provider: "google" | "github" };
  user_signed_in: { userId: string; email?: string; provider?: string };
  user_signed_out: { userId?: string };
  cta_clicked: { cta: string; href?: string; location?: string };
  dashboard_viewed: { userId: string };
};

export function captureClientEvent<T extends PostHogEventName>(
  event: T,
  properties?: PostHogEventProperties[T],
): void {
  if (typeof window !== "undefined") {
    initPostHog();
    posthog.capture(event, properties);
  }
}

export function identifyUser(
  userId: string,
  userProperties?: Record<string, unknown>,
): void {
  if (typeof window !== "undefined") {
    initPostHog();
    posthog.identify(userId, userProperties);
  }
}

export function resetUser(): void {
  if (typeof window !== "undefined") {
    posthog.reset();
  }
}

export { posthog };
