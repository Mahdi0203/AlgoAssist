import type { Topic } from "@/lib/types/topic";

export const topics: Topic[] = [
  {
    id: "topic-two-pointers",
    title: "Two Pointers",
    slug: "two-pointers",
    description:
      "Learn how to maintain two moving indices to optimize array and string problems with linear scans.",
    difficulty: "Beginner",
    prerequisiteText:
      "Comfort with arrays, loops, and basic time complexity analysis is recommended.",
    resources: [
      {
        id: "resource-two-pointers-cp",
        title: "Two Pointers Technique Overview",
        url: "https://cp-algorithms.com/others/two-pointers.html",
        resourceType: "article",
      },
      {
        id: "resource-two-pointers-video",
        title: "Two Pointers Pattern Explained",
        url: "https://www.youtube.com/watch?v=jM2dhDPYMQM",
        resourceType: "video",
      },
    ],
    practiceProblems: [
      {
        id: "problem-cf-edu-two-pointers",
        title: "Segment with Small Sum",
        platform: "Codeforces",
        url: "https://codeforces.com/edu/course/2/lesson/9/1/practice/contest/307092/problem/A",
        difficulty: "Beginner",
      },
      {
        id: "problem-atcoder-sum",
        title: "Snuke Festival",
        platform: "AtCoder",
        url: "https://atcoder.jp/contests/arc084/tasks/arc084_a",
        difficulty: "Intermediate",
      },
    ],
  },
  {
    id: "topic-binary-search",
    title: "Binary Search",
    slug: "binary-search",
    description:
      "Build intuition for searching over sorted data and monotonic answer spaces efficiently.",
    difficulty: "Beginner",
    prerequisiteText:
      "You should already understand sorted arrays, conditions, and basic loop invariants.",
    resources: [
      {
        id: "resource-binary-search-handbook",
        title: "Binary Search Essentials",
        url: "https://usaco.guide/silver/binary-search",
        resourceType: "article",
      },
      {
        id: "resource-binary-search-blog",
        title: "Binary Search on Answer",
        url: "https://codeforces.com/blog/entry/11080",
        resourceType: "blog",
      },
    ],
    practiceProblems: [
      {
        id: "problem-cf-closest",
        title: "Closest to the Left",
        platform: "Codeforces",
        url: "https://codeforces.com/edu/course/2/lesson/6/1/practice/contest/283911/problem/A",
        difficulty: "Beginner",
      },
      {
        id: "problem-atcoder-cutting-woods",
        title: "Cutting Woods",
        platform: "AtCoder",
        url: "https://atcoder.jp/contests/abc217/tasks/abc217_d",
        difficulty: "Intermediate",
      },
    ],
  },
];
