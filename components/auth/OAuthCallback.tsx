"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { completeOAuthSignIn } from "@/actions/auth";
import { captureClientEvent, identifyUser } from "@/lib/posthog-client";

type Props = {
  code?: string;
  errorParam?: string;
};

export function OAuthCallback({ code, errorParam }: Props) {
  const router = useRouter();
  const hasStartedRef = useRef(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(() => {
    if (errorParam) {
      return "Authentication was cancelled or declined by the provider.";
    }
    if (!code) {
      return "Missing authorization code. Please sign in again.";
    }
    return null;
  });

  useEffect(() => {
    if (hasStartedRef.current || errorParam || !code) {
      return;
    }
    hasStartedRef.current = true;

    async function verifyCode(oauthCode: string): Promise<void> {
      try {
        const fallbackVerifier =
          typeof window !== "undefined"
            ? (window.sessionStorage.getItem("insforge_pkce_verifier") ??
              undefined)
            : undefined;

        const result = await completeOAuthSignIn(oauthCode, fallbackVerifier);

        if (!result.success) {
          setErrorMessage(
            result.error ?? "Unable to complete sign in. Please try again.",
          );
          return;
        }

        if (typeof window !== "undefined") {
          window.sessionStorage.removeItem("insforge_pkce_verifier");
        }

        if (result.userId) {
          identifyUser(result.userId, {
            ...(result.email ? { email: result.email } : {}),
          });
          captureClientEvent("user_signed_in", {
            userId: result.userId,
            email: result.email,
          });
        }

        router.replace("/dashboard");
        router.refresh();
      } catch (error) {
        console.error("[OAuthCallback/verifyCode]", error);
        setErrorMessage("Something went wrong while completing sign in.");
      }
    }

    void verifyCode(code);
  }, [code, errorParam, router]);

  if (errorMessage) {
    return (
      <div className="w-full max-w-md bg-surface border border-border rounded-2xl p-8 shadow-xs text-center">
        <div className="w-10 h-10 rounded-full bg-surface-secondary border border-border flex items-center justify-center mx-auto">
          <span className="text-sm font-semibold text-error">!</span>
        </div>

        <h1 className="mt-4 text-base font-semibold text-text-primary">
          Unable to sign in
        </h1>

        <p className="mt-2 text-sm text-text-secondary leading-relaxed">
          {errorMessage}
        </p>

        <Link
          href="/login"
          className="mt-6 inline-flex items-center justify-center bg-accent text-accent-foreground text-sm font-medium px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
        >
          Back to Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md bg-surface border border-border rounded-2xl p-8 shadow-xs text-center">
      <div
        aria-hidden="true"
        className="w-8 h-8 rounded-full border-2 border-border border-t-accent animate-spin mx-auto"
      />

      <h1 className="mt-4 text-base font-semibold text-text-primary">
        Completing sign in...
      </h1>

      <p className="mt-1 text-xs text-text-muted">
        Setting up your session and redirecting to your dashboard.
      </p>
    </div>
  );
}
