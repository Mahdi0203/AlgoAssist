import Link from "next/link";

import { PageContainer } from "@/components/layout/page-container";

export function FinalCtaSection() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <PageContainer>
        <div className="rounded-[2rem] border border-slate-200 bg-slate-950 px-6 py-12 text-white sm:px-10 sm:py-14 lg:px-14">
          <div className="mx-auto flex max-w-3xl flex-col items-start gap-6">
            <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-200">
              Start Learning With Direction
            </span>
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Build your competitive programming foundation with a clear roadmap
              </h2>
              <p className="text-base leading-7 text-slate-300 sm:text-lg">
                Explore structured topics, learn the right concepts in order, and practice on
                external platforms with more confidence.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/roadmap"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-slate-100"
              >
                Explore Roadmap
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-transparent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Register Now
              </Link>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
