import { PostHog } from "posthog-node";

export const createPostHogServer = (): PostHog => {
  const apiKey =
    process.env.NEXT_PUBLIC_POSTHOG_KEY ||
    process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
  const host =
    process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

  if (!apiKey) {
    throw new Error(
      "[posthog-server] NEXT_PUBLIC_POSTHOG_KEY or NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN is not configured.",
    );
  }

  return new PostHog(apiKey, {
    host,
    flushAt: 1, // Send immediately
    flushInterval: 0, // No batching — Next.js functions are short-lived
  });
};

export async function captureServerEvent(
  distinctId: string,
  event: string,
  properties?: Record<string, unknown>,
): Promise<void> {
  let client: PostHog | null = null;
  try {
    client = createPostHogServer();
    client.capture({
      distinctId,
      event,
      properties: {
        userId: distinctId,
        ...properties,
      },
    });
    await client.shutdown();
  } catch (error) {
    console.error(`[posthog-server] Failed to capture "${event}":`, error);
  }
}
