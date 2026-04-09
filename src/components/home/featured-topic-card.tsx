import Link from "next/link";

import type { Topic } from "@/lib/types/topic";

type FeaturedTopicCardProps = {
  topic: Topic;
};

export function FeaturedTopicCard({ topic }: FeaturedTopicCardProps) {
  return (
    <article className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-transform duration-200 hover:-translate-y-1">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-3">
          <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
            {topic.difficulty}
          </span>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold tracking-tight text-slate-950">
              {topic.title}
            </h3>
            <p className="text-sm leading-6 text-slate-600">{topic.description}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            Resources
          </p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
            {topic.resources.length}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            Problems
          </p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
            {topic.practiceProblems.length}
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <p className="text-sm leading-6 text-slate-600">
          <span className="font-medium text-slate-800">Prerequisite:</span>{" "}
          {topic.prerequisiteText}
        </p>
        <Link
          href={`/roadmap/${topic.slug}`}
          className="inline-flex items-center text-sm font-semibold text-slate-950 transition-colors hover:text-slate-700"
        >
          View topic details
          <span className="ml-2">→</span>
        </Link>
      </div>
    </article>
  );
}
