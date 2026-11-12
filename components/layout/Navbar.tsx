import Image from "next/image";
import Link from "next/link";
import { TrackedLink } from "@/components/common/TrackedLink";

type Props = {
  activePath?: string;
  startHref?: string;
};

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Find Jobs", href: "/find-jobs" },
  { label: "Profile", href: "/profile" },
] as const;

export function Navbar({ activePath = "", startHref = "/login" }: Props) {
  return (
    <header className="w-full bg-surface border-b border-border-light">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="inline-flex items-center">
          <Image
            src="/logo.png"
            alt="JobPilot"
            width={114}
            height={38}
            className="h-9 w-auto"
            priority
          />
        </Link>

        <nav className="hidden sm:flex items-center gap-8">
          {NAV_ITEMS.map((item) => {
            const isActive = activePath === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  isActive
                    ? "text-sm font-medium text-accent transition-colors"
                    : "text-sm font-medium text-text-dark hover:text-accent transition-colors"
                }
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <TrackedLink
          href={startHref}
          ctaName="Start for free (Navbar)"
          className="bg-overlay-dark text-accent-foreground text-xs font-medium px-4 py-2.5 rounded-lg shadow-xs hover:opacity-90 transition-opacity"
        >
          Start for free
        </TrackedLink>
      </div>
    </header>
  );
}
