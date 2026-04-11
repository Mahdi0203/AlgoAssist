import { TopicCard } from "@/components/roadmap/topic-card";
import type { Topic } from "@/lib/types/topic";

type TopicGridProps = {
  topics: Topic[];
};

export function TopicGrid({ topics }: TopicGridProps) {
  return (
    <div className="grid gap-4 xl:grid-cols-3">
      {topics.map((topic) => (
        <TopicCard key={topic.id} topic={topic} />
      ))}
    </div>
  );
}
