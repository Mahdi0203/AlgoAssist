import Link from "next/link";

import { PageContainer } from "@/components/layout/page-container";

const roadmapSections = [
  {
    title: "1. Introduction to Greedy",
    ratingRange: "800 -> 1200",
    contestRange: "1200 -> 1500",
    description:
      "What makes an algorithm greedy? Learn the greedy choice property and when greedy solutions work.",
    units: 36,
  },
  {
    title: "2. Proving Greedy Correctness",
    ratingRange: "800 -> 1400",
    contestRange: "1200 -> 1700",
    description:
      "How do you know greedy works? Learn two proof techniques: the exchange argument and the stays-ahead argument to verify greedy strategies.",
    units: 43,
  },
  {
    title: "3. Activity Selection",
    ratingRange: "900 -> 1500",
    contestRange: "1400 -> 1700",
    description:
      "The classic greedy problem. Select the maximum number of non-overlapping activities by deadline.",
    units: 43,
  },
  {
    title: "4. Interval Problems",
    ratingRange: "1000 -> 1600",
    contestRange: "1400 -> 1700",
    description:
      "Intervals appear constantly in interviews. Merge overlapping intervals, insert intervals, and cover intervals with minimum points.",
    units: 44,
  },
  {
    title: "5. Array Greedy Problems",
    ratingRange: "1100 -> 1700",
    contestRange: "1400 -> 1800",
    description:
      "Apply greedy thinking to arrays. Solve jump games, gas station, and other array-based problems.",
    units: 41,
  },
  {
    title: "6. Greedy Optimization",
    ratingRange: "1200 -> 1800",
    contestRange: "1500 -> 1800",
    description:
      "Classic optimization problems where greedy shines: fractional knapsack, job scheduling, and task scheduling. Learn when greedy gives optimal answers.",
    units: 38,
  },
  {
    title: "7. Advanced Greedy",
    ratingRange: "1400 -> 2000",
    contestRange: "1500 -> 2000",
    description:
      "Huffman coding for compression, string rearrangement, and other advanced greedy applications.",
    units: 37,
  },
  {
    title: "8. Practice Problems",
    ratingRange: "800 -> 2000",
    contestRange: "1300 -> 1900",
    description:
      "Reinforce your greedy skills with curated problems. Mix of easy, medium, and hard challenges covering all the patterns you have learned.",
    units: 35,
  },
];

function BarChartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="h-4 w-4"
    >
      <rect x="3" y="10" width="4" height="10" rx="1.5" />
      <rect x="10" y="6" width="4" height="14" rx="1.5" />
      <rect x="17" y="2" width="4" height="18" rx="1.5" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-4 w-4"
    >
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4l3 2" />
    </svg>
  );
}

export default function GreedyAlgorithmsPage() {
  return (
    <section className="min-h-screen bg-slate-50 py-6 text-slate-950">
      <PageContainer className="max-w-[1080px]">
        <div className="mb-5 flex items-center gap-3 text-xs text-slate-500 sm:text-sm">
          <Link href="/roadmap" className="transition-colors hover:text-slate-950">
            Roadmaps
          </Link>
          <span>›</span>
          <span className="font-semibold text-slate-950">Greedy Algorithms</span>
        </div>

        <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="mb-7 space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-slate-500">
              Roadmap
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Greedy Algorithms
            </h1>
            <p className="text-base text-slate-500">Select a section to begin</p>
          </div>

          <div className="space-y-3">
            {roadmapSections.map((section) => (
              <article
                key={section.title}
                className="flex flex-col justify-between gap-4 rounded-[1.25rem] border border-slate-200 bg-slate-50 px-5 py-5 sm:flex-row sm:items-start"
              >
                <div className="min-w-0 flex-1">
                  <h2 className="text-xl font-semibold tracking-tight text-slate-950">
                    {section.title === "1. Introduction to Greedy" ? (
                      <Link
                        href="/roadmap/greedy-algorithms/introduction-to-greedy"
                        className="transition-colors hover:text-slate-700"
                      >
                        {section.title}
                      </Link>
                    ) : (
                      section.title
                    )}
                  </h2>

                  <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500 sm:text-sm">
                    <span className="inline-flex items-center gap-1.5">
                      <BarChartIcon />
                      {section.ratingRange}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <ClockIcon />
                      {section.contestRange}
                    </span>
                  </div>

                  <p className="mt-2 max-w-4xl text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
                    {section.description}
                  </p>
                </div>

                <div className="shrink-0 text-right sm:pt-0.5">
                  <p className="text-2xl font-semibold tracking-tight text-slate-950">
                    0/{section.units}
                  </p>
                  <p className="text-xs text-slate-500">units</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
