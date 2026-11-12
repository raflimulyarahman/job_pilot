import Image from "next/image";
import { TrackedLink } from "@/components/common/TrackedLink";

type Props = {
  getStartedHref?: string;
  firstMatchHref?: string;
};

export function Hero({
  getStartedHref = "/login",
  firstMatchHref = "/find-jobs",
}: Props) {
  return (
    <section className="w-full">
      <div className="bg-hero-gradient border-y border-border-light py-24 px-6 text-center flex flex-col items-center">
        <h1 className="text-4xl sm:text-5xl md:text-[56px] font-bold tracking-tight leading-[1.12] text-text-black max-w-3xl">
          Job hunting is hard.
          <br />
          Your tools shouldn’t be.
        </h1>

        <p className="mt-5 text-sm sm:text-base text-text-slate-medium max-w-lg leading-relaxed">
          Stop applying blind. JobPilot finds the jobs, researches the
          companies, and gives you everything you need to stand out.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <TrackedLink
            href={getStartedHref}
            ctaName="Get Started (Hero)"
            className="bg-overlay-dark text-accent-foreground text-sm font-medium px-5 py-2.5 rounded-lg inline-flex items-center gap-2 shadow-xs hover:opacity-90 transition-opacity"
          >
            <span>Get Started</span>
            <svg
              viewBox="0 0 10 12"
              aria-hidden="true"
              className="w-2.5 h-2.5 fill-current"
            >
              <path d="M1.5 1.2L8.8 6L1.5 10.8V1.2Z" />
            </svg>
          </TrackedLink>

          <TrackedLink
            href={firstMatchHref}
            ctaName="Find Your First Match (Hero)"
            className="bg-surface text-text-black border border-border-muted text-sm font-medium px-5 py-2.5 rounded-lg shadow-2xs hover:bg-surface-secondary transition-colors"
          >
            Find Your First Match
          </TrackedLink>
        </div>
      </div>

      <div className="bg-surface-tertiary border-b border-border-light p-6 sm:p-10 md:p-14 flex items-center justify-center">
        <Image
          src="/images/dashboard-demo.png"
          alt="JobPilot Dashboard Preview"
          width={1197}
          height={604}
          className="w-full h-auto rounded-2xl"
          priority
        />
      </div>
    </section>
  );
}
