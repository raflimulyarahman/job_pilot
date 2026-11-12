import { Suspense } from "react";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { LoginCard } from "@/components/auth/LoginCard";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { createInsforgeServer } from "@/lib/insforge-server";

type Props = {
  searchParams: Promise<{ error?: string }>;
};

async function LoginContent({ searchParams }: Props) {
  await connection();
  const insforge = await createInsforgeServer();
  const {
    data: { user },
  } = await insforge.auth.getCurrentUser();

  if (user) {
    redirect("/dashboard");
  }

  const params = await searchParams;
  const initialError = params.error
    ? "Authentication failed. Please try signing in again."
    : undefined;

  return <LoginCard initialError={initialError} />;
}

export default function LoginPage({ searchParams }: Props) {
  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto border-x border-border-light bg-hero-gradient flex items-center justify-center px-6 py-16">
        <Suspense fallback={<LoginCard />}>
          <LoginContent searchParams={searchParams} />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
