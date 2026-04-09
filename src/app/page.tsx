import { FeaturedTopicsSection } from "@/components/home/featured-topics-section";
import { FinalCtaSection } from "@/components/home/final-cta-section";
import { HeroSection } from "@/components/home/hero-section";
import { topics } from "@/lib/mock-data/topics";

export default function HomePage() {
  const featuredTopics = topics.slice(0, 3);

  return (
    <>
      <HeroSection />
      <FeaturedTopicsSection topics={featuredTopics} />
      <FinalCtaSection />
    </>
  );
}
