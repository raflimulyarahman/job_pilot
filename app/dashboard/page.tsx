import { Suspense } from "react";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { SignOutButton } from "@/components/auth/SignOutButton";
import { DashboardTracker } from "@/components/dashboard/DashboardTracker";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { createInsforgeServer } from "@/lib/insforge-server";

async function DashboardSessionCard() {
  await connection();
  const insforge = await createInsforgeServer();
  const {
    data: { user },
  } = await insforge.auth.getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const userName =
    typeof user.profile?.name === "string" && user.profile.name.trim()
      ? user.profile.name
      : undefined;
  const displayName = userName ?? user.email;

  return (
    <div className="bg-surface border border-border rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <DashboardTracker userId={user.id} email={user.email} name={userName} />
      <div>
        <div className="inline-flex items-center gap-2">
          <span className="bg-success-lightest text-success-foreground rounded-full px-2.5 py-0.5 text-xs font-medium">
            Authenticated
          </span>
          <span className="text-xs text-text-muted">Dashboard</span>
        </div>

        <h1 className="mt-2 text-base font-semibold text-text-primary">
          Welcome back, {displayName}
        </h1>

        <p className="mt-1 text-xs text-text-muted">
          Signed in as {user.email}
        </p>
      </div>

      <SignOutButton userId={user.id} email={user.email} name={userName} />
    </div>
  );
}

function DashboardSessionFallback() {
  return (
    <div className="bg-surface border border-border rounded-2xl p-6 shadow-xs">
      <p className="text-sm font-medium text-text-primary">
        Loading your dashboard...
      </p>
      <p className="mt-1 text-xs text-text-muted">
        Verifying your active session.
      </p>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar activePath="/dashboard" startHref="/dashboard" />

      <main className="flex-1 w-full max-w-7xl mx-auto p-8 flex flex-col gap-6">
        <Suspense fallback={<DashboardSessionFallback />}>
          <DashboardSessionCard />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
