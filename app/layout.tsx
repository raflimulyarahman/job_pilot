import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { PostHogProvider } from "@/components/providers/PostHogProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "JobPilot — AI-Powered Job Hunting Assistant",
  description:
    "Stop applying blind. JobPilot finds the jobs, researches the companies, and gives you everything you need to stand out.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-background text-text-primary font-sans"
      >
        <PostHogProvider>{children}</PostHogProvider>
      </body>
    </html>
  );
}
