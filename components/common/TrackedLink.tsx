"use client";

import Link from "next/link";
import { captureClientEvent } from "@/lib/posthog-client";

type Props = React.ComponentProps<typeof Link> & {
  ctaName?: string;
};

export function TrackedLink({
  href,
  ctaName,
  onClick,
  children,
  ...props
}: Props) {
  return (
    <Link
      href={href}
      onClick={(e) => {
        const name =
          ctaName || (typeof children === "string" ? children : String(href));
        captureClientEvent("cta_clicked", {
          cta: name,
          href: String(href),
        });
        onClick?.(e);
      }}
      {...props}
    >
      {children}
    </Link>
  );
}
