"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { signOutUser } from "@/actions/auth";
import {
  captureClientEvent,
  identifyUser,
  resetUser,
} from "@/lib/posthog-client";

type Props = {
  userId: string;
  email: string;
  name?: string;
};

export function SignOutButton({ userId, email, name }: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const identifiedUserId = useRef<string | null>(null);

  useEffect(() => {
    if (identifiedUserId.current === userId) {
      return;
    }

    identifyUser(userId, {
      email,
      ...(name ? { name } : {}),
    });
    identifiedUserId.current = userId;
  }, [email, name, userId]);

  async function handleSignOut(): Promise<void> {
    if (isLoading) {
      return;
    }

    setIsLoading(true);

    try {
      const result = await signOutUser();
      if (result.success) {
        captureClientEvent("user_signed_out", { userId });
        resetUser();
        router.replace("/login");
        router.refresh();
        return;
      }
      setIsLoading(false);
    } catch (error) {
      console.error("[SignOutButton/handleSignOut]", error);
      setIsLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={() => void handleSignOut()}
      disabled={isLoading}
      className="bg-surface border border-border text-text-primary text-sm font-medium px-4 py-2 rounded-lg hover:bg-surface-secondary transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? "Signing out..." : "Sign Out"}
    </button>
  );
}
