"use client";

import { useEffect, useRef } from "react";
import { captureClientEvent, identifyUser } from "@/lib/posthog-client";

type Props = {
  userId: string;
  email: string;
  name?: string;
};

export function DashboardTracker({ userId, email, name }: Props) {
  const hasTracked = useRef(false);

  useEffect(() => {
    if (hasTracked.current) {
      return;
    }
    hasTracked.current = true;

    identifyUser(userId, {
      email,
      ...(name ? { name } : {}),
    });

    captureClientEvent("dashboard_viewed", { userId });
  }, [userId, email, name]);

  return null;
}
