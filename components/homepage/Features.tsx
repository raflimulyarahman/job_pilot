import Image from "next/image";
import { TrackedLink } from "@/components/common/TrackedLink";

type Props = {
  getStartedHref?: string;
  firstMatchHref?: string;
};

export function Features({
  getStartedHref = "/login",
  firstMatchHref = "/find-jobs",
}: Props) {
  return (
    <section className="w-full">
      <div
        className="h-18 bg-hatch-pattern border-b border-border-light"
        aria-hidden="true"
      />

      <div className="bg-surface border-b border-border-light py-20 px-6 text-center flex flex-col items-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-accent">
          SUCCESS STORIES
        </span>

        <blockquote className="mt-5 text-xl sm:text-2xl md:text-[26px] font-medium leading-[1.45] text-text-slate max-w-3xl">
          “I used to spend my evenings copy-pasting resumes. Now I open my
          dashboard to see interviews waiting. It feels like cheating. Had 3
          offers on the table simultaneously.”
        </blockquote>

        <div className="mt-7 inline-flex items-center gap-3 text-left">
          <Image
            src="/images/user-icon.png"
            alt="Tom Wilson"
            width={44}
            height={44}
            className="w-11 h-11 rounded-xl object-cover"
          />
          <div>
            <p className="text-sm font-semibold text-text-slate leading-tight">
              Tom Wilson
            </p>
            <p className="text-xs text-text-muted mt-0.5">Junior Developer</p>
          </div>
        </div>
      </div>

      <div
        className="h-18 bg-hatch-pattern border-b border-border-light"
        aria-hidden="true"
      />

      <div className="bg-hero-gradient border-b border-border-light py-24 px-6 text-center flex flex-col items-center">
        <h2 className="text-3xl sm:text-4xl md:text-[48px] font-bold tracking-tight leading-[1.15] text-text-slate max-w-2xl">
          Your next job search can feel a
          <br />
          lot less overwhelming
        </h2>

        <p className="mt-4 text-sm sm:text-base text-text-slate-medium max-w-lg">
          Set up your profile, upload your resume, and start finding matches in
          minutes.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <TrackedLink
            href={getStartedHref}
            ctaName="Get Started (Features CTA)"
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
            ctaName="Find Your First Match (Features CTA)"
            className="bg-surface text-text-black border border-border-muted text-sm font-medium px-5 py-2.5 rounded-lg shadow-2xs hover:bg-surface-secondary transition-colors"
          >
            Find Your First Match
          </TrackedLink>
        </div>
      </div>

      <div
        className="h-20 bg-hatch-pattern border-b border-border-light"
        aria-hidden="true"
      />
    </section>
  );
}
