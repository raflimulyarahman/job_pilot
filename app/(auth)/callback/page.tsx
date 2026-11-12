import { Suspense } from "react";
import { OAuthCallback } from "@/components/auth/OAuthCallback";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

type Props = {
  searchParams: Promise<{
    insforge_code?: string;
    error?: string;
  }>;
};

async function CallbackContent({ searchParams }: Props) {
  const params = await searchParams;

  return (
    <OAuthCallback
      code={params.insforge_code}
      errorParam={params.error}
    />
  );
}

function CallbackFallback() {
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

export default function CallbackPage({ searchParams }: Props) {
  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto border-x border-border-light bg-hero-gradient flex items-center justify-center px-6 py-16">
        <Suspense fallback={<CallbackFallback />}>
          <CallbackContent searchParams={searchParams} />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
