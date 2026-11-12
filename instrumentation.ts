import { OTLPLogExporter } from "@opentelemetry/exporter-logs-otlp-http";
import { resourceFromAttributes } from "@opentelemetry/resources";
import {
  BatchLogRecordProcessor,
  LoggerProvider,
} from "@opentelemetry/sdk-logs";

const token =
  process.env.NEXT_PUBLIC_POSTHOG_KEY ||
  process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;

const missingVariable = token
  ? "NEXT_PUBLIC_POSTHOG_HOST"
  : "NEXT_PUBLIC_POSTHOG_KEY";

if ((!token || !host) && process.env.NODE_ENV !== "production") {
  console.warn(
    `${missingVariable} variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once ${missingVariable} is configured`,
  );
}

export const posthogLogProvider =
  token && host
    ? new LoggerProvider({
        resource: resourceFromAttributes({ "service.name": "job-pilot" }),
        processors: [
          new BatchLogRecordProcessor({
            exporter: new OTLPLogExporter({
              url: `${host}/i/v1/logs`,
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }),
          }),
        ],
      })
    : undefined;

// This logger is intentionally isolated so only log records added by this integration are exported.
export const posthogLog = posthogLogProvider?.getLogger("job-pilot.posthog");

export function register() {
  // Next.js 15+ discovers instrumentation.ts automatically. The provider is used directly,
  // rather than as a global logger, to avoid exporting the app's existing logs.
}
