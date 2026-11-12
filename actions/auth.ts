"use server";

import { SeverityNumber } from "@opentelemetry/api-logs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { posthogLog } from "@/instrumentation";
import { createInsforgeAuthActions } from "@/lib/insforge-server";

export type OAuthProvider = "google" | "github";

const PKCE_VERIFIER_COOKIE = "insforge_pkce_verifier";

export async function startOAuthSignIn(
  provider: OAuthProvider,
  redirectTo: string,
): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    if (provider !== "google" && provider !== "github") {
      return { success: false, error: "Unsupported authentication provider." };
    }

    if (!redirectTo) {
      return { success: false, error: "Missing redirect destination." };
    }

    const authActions = await createInsforgeAuthActions();
    const { data, error } = await authActions.signInWithOAuth(provider, {
      redirectTo,
      skipBrowserRedirect: true,
      ...(provider === "google"
        ? { additionalParams: { prompt: "select_account" } }
        : {}),
    });

    if (error || !data?.url || !data?.codeVerifier) {
      console.error("[actions/auth]", error);
      return {
        success: false,
        error: "Unable to start sign in. Please try again.",
      };
    }

    const cookieStore = await cookies();
    cookieStore.set(PKCE_VERIFIER_COOKIE, data.codeVerifier, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 600,
      secure: process.env.NODE_ENV === "production",
    });

    posthogLog?.emit({
      body: "OAuth sign-in redirect prepared",
      severityNumber: SeverityNumber.INFO,
      attributes: { authentication_provider: provider },
    });

    return { success: true, url: data.url };
  } catch (error) {
    console.error("[actions/auth]", error);
    return {
      success: false,
      error: "Unable to start sign in. Please try again.",
    };
  }
}

export async function completeOAuthSignIn(
  code: string,
  fallbackVerifier?: string,
): Promise<{
  success: boolean;
  userId?: string;
  email?: string;
  error?: string;
}> {
  try {
    if (!code) {
      return {
        success: false,
        error: "Missing authorization code. Please sign in again.",
      };
    }

    const cookieStore = await cookies();
    const verifier =
      cookieStore.get(PKCE_VERIFIER_COOKIE)?.value ?? fallbackVerifier;

    if (!verifier) {
      return {
        success: false,
        error: "Your sign-in session expired. Please try signing in again.",
      };
    }

    const authActions = await createInsforgeAuthActions();
    const { data, error } = await authActions.exchangeOAuthCode(code, verifier);

    cookieStore.delete(PKCE_VERIFIER_COOKIE);

    if (error || !data) {
      console.error("[actions/auth]", error);
      return {
        success: false,
        error: "Could not complete sign in. Please try again.",
      };
    }

    revalidatePath("/");
    revalidatePath("/dashboard");

    posthogLog?.emit({
      body: "OAuth sign-in completed",
      severityNumber: SeverityNumber.INFO,
    });

    return {
      success: true,
      userId: data.user?.id,
      email: data.user?.email,
    };
  } catch (error) {
    console.error("[actions/auth]", error);
    return {
      success: false,
      error: "Could not complete sign in. Please try again.",
    };
  }
}

export async function signOutUser(): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    const authActions = await createInsforgeAuthActions();
    const { error } = await authActions.signOut();

    if (error) {
      console.error("[actions/auth]", error);
      return { success: false, error: "Failed to sign out." };
    }

    revalidatePath("/");
    revalidatePath("/dashboard");

    posthogLog?.emit({
      body: "Authenticated user signed out",
      severityNumber: SeverityNumber.INFO,
    });

    return { success: true };
  } catch (error) {
    console.error("[actions/auth]", error);
    return { success: false, error: "Failed to sign out." };
  }
}
