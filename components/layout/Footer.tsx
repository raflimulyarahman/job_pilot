import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full max-w-7xl mx-auto border-x border-border-light bg-surface px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
      <Link href="/" className="inline-flex items-center">
        <Image
          src="/logo.png"
          alt="JobPilot"
          width={108}
          height={36}
          className="h-8 w-auto"
        />
      </Link>

      <nav className="flex items-center gap-7">
        <Link
          href="/dashboard"
          className="text-sm font-medium text-text-dark hover:text-accent transition-colors"
        >
          Dashboard
        </Link>
        <Link
          href="#"
          className="text-sm font-medium text-text-dark hover:text-accent transition-colors"
        >
          Privacy Policy
        </Link>
        <Link
          href="#"
          className="text-sm font-medium text-text-dark hover:text-accent transition-colors"
        >
          Terms &amp; Condition
        </Link>
      </nav>
    </footer>
  );
}
