import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import type { ReactNode } from "react";

import "./globals.css";

import { AuthProvider } from "@/components/providers/auth-provider";
import { AppShell } from "@/components/layout/app-shell";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "AlgoAssist",
    template: "%s | AlgoAssist",
  },
  description:
    "AlgoAssist is a structured learning platform for competitive programming roadmaps, curated resources, and guided practice.",
  applicationName: "AlgoAssist",
  keywords: [
    "competitive programming",
    "cp roadmap",
    "algorithms",
    "data structures",
    "learning platform",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${manrope.variable} min-h-screen bg-slate-50 font-sans text-slate-950 antialiased`}>
        <AuthProvider>
          <AppShell>{children}</AppShell>
        </AuthProvider>
      </body>
    </html>
  );
}
