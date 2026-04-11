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
  {
    id: "topic-greedy-algorithms",
    title: "Greedy Algorithms",
    slug: "greedy-algorithms",
    description:
      "Learn how to make locally optimal choices and recognize when greedy strategies produce globally correct answers.",
    difficulty: "Intermediate",
    prerequisiteText:
      "You should be comfortable with sorting, arrays, and basic proof intuition before starting greedy techniques.",
    resources: [
      {
        id: "resource-greedy-cp-algorithms",
        title: "Greedy Algorithms Overview",
        url: "https://cp-algorithms.com/schedules/schedule-with-completion-duration.html",
        resourceType: "article",
      },
      {
        id: "resource-greedy-video",
        title: "Greedy Technique Patterns",
        url: "https://www.youtube.com/watch?v=ARvQcqJ_-NY",
        resourceType: "video",
      },
    ],
    practiceProblems: [
      {
        id: "problem-cf-taxi",
        title: "Taxi",
        platform: "Codeforces",
        url: "https://codeforces.com/problemset/problem/158/B",
        difficulty: "Beginner",
      },
      {
        id: "problem-atcoder-coin",
        title: "Coins",
        platform: "AtCoder",
        url: "https://atcoder.jp/contests/abc087/tasks/arc090_a",
        difficulty: "Intermediate",
      },
    ],
  },
  {
    id: "topic-stl",
    title: "STL",
    slug: "stl",
    description:
      "Master the most useful C++ Standard Template Library containers, iterators, and algorithms for faster competitive programming workflows.",
    difficulty: "Beginner",
    prerequisiteText:
      "Basic C++ syntax, loops, functions, and familiarity with arrays will make STL much easier to learn.",
    resources: [
      {
        id: "resource-stl-guide",
        title: "STL Overview for Competitive Programming",
        url: "https://www.geeksforgeeks.org/the-c-standard-template-library-stl/",
        resourceType: "article",
      },
      {
        id: "resource-stl-video",
        title: "C++ STL Crash Course",
        url: "https://www.youtube.com/watch?v=RRVYpIET_RU",
        resourceType: "video",
      },
    ],
    practiceProblems: [
      {
        id: "problem-cf-helpful-maths",
        title: "Helpful Maths",
        platform: "Codeforces",
        url: "https://codeforces.com/problemset/problem/339/A",
        difficulty: "Beginner",
      },
      {
        id: "problem-cf-amusing-joke",
        title: "Amusing Joke",
        platform: "Codeforces",
        url: "https://codeforces.com/problemset/problem/141/A",
        difficulty: "Beginner",
      },
    ],
  },
  {
    id: "topic-cpp",
    title: "C++",
    slug: "cpp",
    description:
      "Build a strong foundation in modern C++ for competitive programming, including fast I/O, functions, references, and common language patterns.",
    difficulty: "Beginner",
    prerequisiteText:
      "You should already understand variables, conditions, loops, and basic programming problem solving.",
    resources: [
      {
        id: "resource-cpp-basics",
        title: "C++ for Competitive Programming",
        url: "https://usaco.guide/general/basic-cpp?lang=cpp",
        resourceType: "article",
      },
      {
        id: "resource-cpp-course",
        title: "C++ Programming Course",
        url: "https://www.youtube.com/watch?v=8jLOx1hD3_o",
        resourceType: "course",
      },
    ],
    practiceProblems: [
      {
        id: "problem-cf-word-capitalization",
        title: "Word Capitalization",
        platform: "Codeforces",
        url: "https://codeforces.com/problemset/problem/281/A",
        difficulty: "Beginner",
      },
      {
        id: "problem-cf-next-round",
        title: "Next Round",
        platform: "Codeforces",
        url: "https://codeforces.com/problemset/problem/158/A",
        difficulty: "Beginner",
      },
    ],
  },
  {
    id: "topic-c-language",
    title: "C",
    slug: "c-language",
    description:
      "Understand low-level programming fundamentals in C, including memory, pointers, arrays, and control flow that support algorithmic thinking.",
    difficulty: "Beginner",
    prerequisiteText:
      "A basic understanding of programming logic is enough to begin learning core C concepts.",
    resources: [
      {
        id: "resource-c-basics",
        title: "C Programming Basics",
        url: "https://www.programiz.com/c-programming",
        resourceType: "course",
      },
      {
        id: "resource-c-pointers",
        title: "Pointers in C",
        url: "https://www.geeksforgeeks.org/pointers-in-c-and-c-set-1-introduction-arithmetic-and-array/",
        resourceType: "article",
      },
    ],
    practiceProblems: [
      {
        id: "problem-cf-watermelon",
        title: "Watermelon",
        platform: "Codeforces",
        url: "https://codeforces.com/problemset/problem/4/A",
        difficulty: "Beginner",
      },
      {
        id: "problem-cf-team",
        title: "Team",
        platform: "Codeforces",
        url: "https://codeforces.com/problemset/problem/231/A",
        difficulty: "Beginner",
      },
    ],
  },
];
