import Image from "next/image";

const SEARCH_STEPS = [
  {
    title: "Find jobs that actually fit",
    description:
      "Search by title and location or paste a job link. Get matched roles you can quickly scan.",
    isActive: true,
  },
  {
    title: "Know the Company Before You Apply",
    description:
      "Stop guessing what a company is about. JobPilot browses their site and gives you everything you need to apply with confidence.",
    isActive: false,
  },
  {
    title: "Keep track of every application",
    description:
      "Keep a clear view of every job you’ve found, tailored. Your activity and progress all stay in one simple place.",
    isActive: false,
  },
] as const;

const CONFIDENCE_STEPS = [
  {
    title: "Understand your match score",
    description:
      "See how your profile lines up with each role before you apply. Get a clear breakdown of what fits and what’s missing.",
    isActive: false,
  },
  {
    title: "AI-Powered Job Matching",
    description:
      "Stop guessing which jobs are worth applying to. JobPilot scores every role against your actual skills so you focus on the ones that matter.",
    isActive: true,
  },
  {
    title: "Focus on the right roles",
    description:
      "Filter out low fit jobs and stay on the ones that actually matter. Spend less time sorting and more time applying.",
    isActive: false,
  },
] as const;

export function HowItWorks() {
  return (
    <section className="w-full">
      <div
        className="h-18 bg-hatch-pattern border-b border-border-light"
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 border-b border-border-light">
        <div className="bg-surface lg:border-r border-border-light flex flex-col">
          <div className="flex border-b border-border-light">
            <div
              className="w-12 shrink-0 border-r border-dashed border-border-light"
              aria-hidden="true"
            />
            <div className="px-8 py-12 flex items-center">
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight leading-[1.2] text-text-slate">
                Manage Your Job
                <br />
                Search With Ease
              </h2>
            </div>
          </div>

          {SEARCH_STEPS.map((step, index) => {
            const isLast = index === SEARCH_STEPS.length - 1;
            return (
              <div
                key={step.title}
                className={
                  isLast
                    ? "flex flex-1"
                    : "flex flex-1 border-b border-border-light"
                }
              >
                <div
                  className={
                    step.isActive
                      ? "w-12 shrink-0 border-r-2 border-accent"
                      : "w-12 shrink-0 border-r border-dashed border-border-light"
                  }
                  aria-hidden="true"
                />
                <div className="px-8 py-8 flex flex-col justify-center">
                  <h3 className="text-base font-semibold text-text-slate">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-text-slate-medium leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-background flex items-center justify-center p-8 lg:p-10 border-t lg:border-t-0 border-border-light">
          <Image
            src="/images/jobs-lists.png"
            alt="Matched jobs table with company, match score, salary estimate, and source"
            width={591}
            height={445}
            className="w-full max-w-[560px] h-auto rounded-xl"
          />
        </div>
      </div>

      <div
        className="h-18 bg-hatch-pattern border-b border-border-light"
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 border-b border-border-light">
        <div className="bg-background lg:border-r border-border-light flex items-center justify-center p-8 lg:p-12 order-2 lg:order-1 border-t lg:border-t-0">
          <Image
            src="/images/agnet-log.png"
            alt="JobPilot Agent log terminal output"
            width={536}
            height={414}
            className="w-full max-w-[520px] h-auto rounded-xl"
          />
        </div>

        <div className="bg-surface flex flex-col order-1 lg:order-2">
          <div className="flex border-b border-border-light">
            <div
              className="w-12 shrink-0 border-r border-dashed border-border-light"
              aria-hidden="true"
            />
            <div className="px-8 py-12 flex items-center">
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight leading-[1.2] text-text-slate">
                Apply With More
                <br />
                Confidence, Every Time
              </h2>
            </div>
          </div>

          {CONFIDENCE_STEPS.map((step, index) => {
            const isLast = index === CONFIDENCE_STEPS.length - 1;
            return (
              <div
                key={step.title}
                className={
                  isLast
                    ? "flex flex-1"
                    : "flex flex-1 border-b border-border-light"
                }
              >
                <div
                  className={
                    step.isActive
                      ? "w-12 shrink-0 border-r-2 border-success-dark"
                      : "w-12 shrink-0 border-r border-dashed border-border-light"
                  }
                  aria-hidden="true"
                />
                <div className="px-8 py-8 flex flex-col justify-center">
                  <h3 className="text-base font-semibold text-text-slate">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-text-slate-medium leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
