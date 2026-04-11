import Link from "next/link";

import { PageContainer } from "@/components/layout/page-container";

const platformPoints = [
  "Curated topic-by-topic learning path",
  "Prerequisite guidance before jumping ahead",
  "External resources and practice problems in one place",
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-white via-slate-50 to-slate-100/70">
      <div className="absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.18),_transparent_55%)]" />

      <PageContainer className="relative flex min-h-[38rem] items-center py-28 sm:min-h-[42rem] sm:py-32 lg:min-h-[48rem] lg:py-36">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center">
          <div className="max-w-3xl space-y-8">
            <div className="space-y-5">
              <span className="inline-flex rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Structured Competitive Programming Learning
              </span>
              <div className="space-y-4">
                <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                  Stop solving random problems. Start learning with direction.
                </h1>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/roadmap"
                className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
              >
                Explore Roadmap
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:text-slate-950"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
