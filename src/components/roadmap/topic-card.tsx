import Link from "next/link";

import type { Topic } from "@/lib/types/topic";

type TopicCardProps = {
  topic: Topic;
};

const difficultyStyles: Record<Topic["difficulty"], string> = {
  Beginner: "border-emerald-200 bg-emerald-100 text-emerald-700",
  Intermediate: "border-amber-200 bg-amber-100 text-amber-700",
  Advanced: "border-rose-200 bg-rose-100 text-rose-700",
};

export function TopicCard({ topic }: TopicCardProps) {
  const learners = topic.resources.length * 320 + topic.practiceProblems.length * 145;
  const isGreedyTopic = topic.slug === "greedy-algorithms";

  return (
    <article className="flex h-full flex-col rounded-[1.35rem] border border-slate-200 bg-white p-4 shadow-sm transition-colors duration-200 hover:border-slate-300">
      <div className="flex items-start justify-between gap-4">
        <h2 className="max-w-[72%] text-lg font-semibold tracking-tight text-slate-950 sm:text-xl">
          {topic.title}
        </h2>

        <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          {learners}
        </div>
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-600">{topic.description}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        <span
          className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${difficultyStyles[topic.difficulty]}`}
        >
          {topic.difficulty}
        </span>
        <span className="inline-flex rounded-full border border-cyan-200 bg-cyan-100 px-2.5 py-1 text-xs font-semibold text-cyan-700">
          Resources {topic.resources.length}
        </span>
        <span className="inline-flex rounded-full border border-orange-200 bg-orange-100 px-2.5 py-1 text-xs font-semibold text-orange-700">
          Practice {topic.practiceProblems.length}
        </span>
      </div>

      <div className="mt-5 pt-1">
        {isGreedyTopic ? (
          <Link
            href="/roadmap/greedy-algorithms"
            className="inline-flex w-full items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-100"
          >
            Start Roadmap
          </Link>
        ) : (
          <button
            type="button"
            disabled
            className="inline-flex w-full cursor-not-allowed items-center justify-center rounded-full border border-slate-200 bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-400"
          >
            Start Roadmap
          </button>
        )}
      </div>
    </article>
  );
}
