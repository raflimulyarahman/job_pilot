import type { InsForgeClient } from "@insforge/sdk";
import {
  createAuthActions,
  createServerClient,
  type AuthActions,
} from "@insforge/sdk/ssr";
import { cookies } from "next/headers";

export const createInsforgeServer = async (): Promise<InsForgeClient> => {
  const cookieStore = await cookies();
  return createServerClient({
    baseUrl: process.env.NEXT_PUBLIC_INSFORGE_URL!,
    anonKey: process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY!,
    cookies: cookieStore,
  });
};

export const createInsforgeAuthActions = async (): Promise<AuthActions> => {
  const cookieStore = await cookies();
  return createAuthActions({
    baseUrl: process.env.NEXT_PUBLIC_INSFORGE_URL!,
    anonKey: process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY!,
    cookies: cookieStore,
  });
};
