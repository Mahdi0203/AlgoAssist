import Link from "next/link";

import { FeaturedTopicCard } from "@/components/home/featured-topic-card";
import { SectionHeading } from "@/components/home/section-heading";
import { PageContainer } from "@/components/layout/page-container";
import type { Topic } from "@/lib/types/topic";

type FeaturedTopicsSectionProps = {
  topics: Topic[];
};

export function FeaturedTopicsSection({ topics }: FeaturedTopicsSectionProps) {
  return (
    <section className="bg-slate-50 py-20 sm:py-24">
      <PageContainer className="space-y-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Featured Topics"
            title="Start with practical fundamentals"
            description="These featured topics show how AlgoAssist organizes concept learning, prerequisite guidance, resources, and external practice together."
          />

          <Link
            href="/roadmap"
            className="inline-flex items-center text-sm font-semibold text-slate-950 transition-colors hover:text-slate-700"
          >
            Browse full roadmap
            <span className="ml-2">→</span>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {topics.map((topic) => (
            <FeaturedTopicCard key={topic.id} topic={topic} />
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
