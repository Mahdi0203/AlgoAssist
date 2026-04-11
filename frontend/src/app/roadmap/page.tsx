"use client";

import { useMemo, useState } from "react";

import { TopicGrid } from "@/components/roadmap/topic-grid";
import { PageContainer } from "@/components/layout/page-container";
import { topics } from "@/lib/mock-data/topics";
import type { TopicDifficulty } from "@/lib/types/topic";

const floatingLabels = [
  {
    label: "Dynamic Programming",
    className: "left-[3%] top-8 border-violet-200 bg-violet-100 text-violet-700",
    style: { animationDelay: "0s", animationDuration: "6.5s" },
  },
  {
    label: "Pattern-22",
    className: "left-[18%] top-16 border-blue-200 bg-blue-100 text-blue-700",
    style: { animationDelay: "1.1s", animationDuration: "7.2s" },
  },
  {
    label: "O(n)",
    className: "left-[30%] top-4 border-emerald-200 bg-emerald-100 text-emerald-700",
    style: { animationDelay: "0.6s", animationDuration: "5.8s" },
  },
  {
    label: "Binary Search",
    className: "left-[42%] top-10 border-cyan-200 bg-cyan-100 text-cyan-700",
    style: { animationDelay: "1.8s", animationDuration: "6.8s" },
  },
  {
    label: "Graph Theory",
    className: "right-[18%] top-8 border-teal-200 bg-teal-100 text-teal-700",
    style: { animationDelay: "0.9s", animationDuration: "6.2s" },
  },
  {
    label: "LeetCode",
    className: "right-[4%] top-10 border-amber-200 bg-amber-100 text-amber-700",
    style: { animationDelay: "1.5s", animationDuration: "7s" },
  },
  {
    label: "Greedy",
    className: "left-[4%] top-[9.2rem] border-lime-200 bg-lime-100 text-lime-700",
    style: { animationDelay: "2.2s", animationDuration: "6.6s" },
  },
  {
    label: "Data Structures",
    className: "left-[5%] bottom-10 border-emerald-200 bg-emerald-100 text-emerald-700",
    style: { animationDelay: "1.3s", animationDuration: "7.4s" },
  },
  {
    label: "Quant",
    className: "left-[32%] bottom-8 border-indigo-200 bg-indigo-100 text-indigo-700",
    style: { animationDelay: "0.4s", animationDuration: "5.9s" },
  },
  {
    label: "Divide and Conquer",
    className: "right-[34%] bottom-12 border-fuchsia-200 bg-fuchsia-100 text-fuchsia-700",
    style: { animationDelay: "1.7s", animationDuration: "6.9s" },
  },
  {
    label: "Backend",
    className: "right-[15%] bottom-10 border-slate-200 bg-slate-100 text-slate-700",
    style: { animationDelay: "2.4s", animationDuration: "6.3s" },
  },
  {
    label: "Codeforces",
    className: "right-[10%] top-[8rem] border-sky-200 bg-sky-100 text-sky-700",
    style: { animationDelay: "0.8s", animationDuration: "7.1s" },
  },
] as const;

export default function RoadmapPage() {
  const [selectedFilter, setSelectedFilter] = useState<"all" | TopicDifficulty>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const topicCount = topics.length;
  const beginnerCount = topics.filter((topic) => topic.difficulty === "Beginner").length;
  const intermediateCount = topics.filter(
    (topic) => topic.difficulty === "Intermediate",
  ).length;
  const advancedCount = topics.filter((topic) => topic.difficulty === "Advanced").length;
  const filteredTopics = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return topics.filter((topic) => {
      const matchesDifficulty =
        selectedFilter === "all" ? true : topic.difficulty === selectedFilter;

      const matchesSearch =
        normalizedQuery.length === 0
          ? true
          : [
              topic.title,
              topic.description,
              topic.slug,
              topic.prerequisiteText,
              topic.difficulty,
            ].some((value) => value.toLowerCase().includes(normalizedQuery));

      return matchesDifficulty && matchesSearch;
    });
  }, [searchQuery, selectedFilter]);

  const filterItems: Array<{
    label: string;
    value: "all" | TopicDifficulty;
    count: number;
  }> = [
    { label: "All Roadmaps", value: "all", count: topicCount },
    { label: "Beginner", value: "Beginner", count: beginnerCount },
    { label: "Intermediate", value: "Intermediate", count: intermediateCount },
    { label: "Advanced", value: "Advanced", count: advancedCount },
  ];

  return (
    <section className="bg-slate-50">
      <div className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.12)_1px,transparent_1px)] bg-[size:34px_34px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/75 to-slate-50" />

        {floatingLabels.map((item) => (
          <div
            key={item.label}
            style={item.style}
            className={`roadmap-chip absolute hidden rounded-full border px-3 py-1.5 text-xs font-semibold shadow-sm lg:block ${item.className}`}
          >
            {item.label}
          </div>
        ))}

        <PageContainer className="relative flex min-h-[17rem] max-w-[1500px] flex-col items-center justify-center py-10 text-center sm:min-h-[20rem] sm:py-12">
          <div className="max-w-4xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
              Structured Learning
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
              Level up your skills
            </h1>

            <div className="mx-auto flex w-full max-w-2xl items-center gap-3 rounded-full border border-slate-200 bg-white px-5 py-4 shadow-sm">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-slate-400"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              <label htmlFor="roadmap-search" className="sr-only">
                Search roadmaps
              </label>
              <input
                id="roadmap-search"
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search roadmaps..."
                className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400 sm:text-base"
              />
            </div>
          </div>
        </PageContainer>
      </div>

      <PageContainer className="max-w-[1500px] py-8 sm:py-10">
        <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-[1.35rem] border border-slate-200 bg-white p-3 shadow-sm">
              <div className="space-y-1">
                {filterItems.map((item) => {
                  const isActive = selectedFilter === item.value;

                  return (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => setSelectedFilter(item.value)}
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left transition-colors ${
                        isActive
                          ? "bg-slate-950 text-white"
                          : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                    >
                      <span className="text-sm font-medium">{item.label}</span>
                      <span className="text-xs">{item.count}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          <div className="space-y-5">
            <TopicGrid topics={filteredTopics} />
          </div>
        </div>
      </PageContainer>

      <style jsx>{`
        .roadmap-chip {
          animation-name: roadmap-float;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          will-change: transform;
        }

        @keyframes roadmap-float {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(0, -8px, 0);
          }
        }
      `}</style>
    </section>
  );
}
