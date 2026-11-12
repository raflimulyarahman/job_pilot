import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/homepage/Hero";
import { HowItWorks } from "@/components/homepage/HowItWorks";
import { Features } from "@/components/homepage/Features";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto border-x border-border-light bg-surface">
        <div className="h-15 bg-surface" aria-hidden="true" />
        <Hero />
        <HowItWorks />
        <Features />
      </main>

      <Footer />
    </div>
  );
}
