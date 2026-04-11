"use client";

import { useState } from "react";
import Link from "next/link";

import { PageContainer } from "@/components/layout/page-container";

const lessons = [
  {
    id: "intro",
    title: "1. Intro",
    subtitle: "Why greedy matters",
    duration: "2m",
    contentTitle: "1.1 Intro",
    content: [
      "Welcome to Greedy Algorithms. It solves optimization problems by making locally optimal choices at each step, hoping they lead to a globally optimal solution. Greedy is often the first approach you should try. When it works, greedy solutions are simple and fast. When it fails, you will know to reach for dynamic programming instead.",
      "In this section, I will walk you through what makes an algorithm greedy, when greedy works, and how to recognize greedy problems. By the end, you will have a mental framework for deciding whether greedy applies.",
    ],
  },
  {
    id: "core-idea",
    title: "2. The Core Idea",
    subtitle: "Local choices, global optimum",
    duration: "3m",
    contentTitle: "1.2 The Core Idea",
    content: [
      "A greedy algorithm picks the best-looking move right now rather than exploring all future possibilities first.",
      "The real question is whether that local choice can always be extended into a globally optimal solution.",
    ],
  },
  {
    id: "greedy-choice",
    title: "3. Vocabulary - Greedy Choice",
    subtitle: "The first property",
    duration: "3m",
    contentTitle: "1.3 Greedy Choice Property",
    content: [
      "The greedy choice property means there exists an optimal solution that begins with the choice made by the greedy algorithm.",
      "If this property fails, greedy may still look intuitive but can break on hidden cases.",
    ],
  },
  {
    id: "optimal-substructure",
    title: "4. Vocabulary - Optimal Substructure",
    subtitle: "Subproblems stay optimal",
    duration: "3m",
    contentTitle: "1.4 Optimal Substructure",
    content: [
      "After taking a greedy step, the remaining smaller problem should still be solvable optimally.",
      "This is the bridge between one correct local move and the full global answer.",
    ],
  },
  {
    id: "quiz-properties",
    title: "5. Quiz: Two Properties",
    subtitle: "Test your understanding",
    duration: "1m",
    problems: 1,
    contentTitle: "1.5 Quiz: Two Properties",
    content: [
      "Use this quick quiz to separate greedy choice property from optimal substructure.",
      "Being precise with these definitions makes later proofs much easier.",
    ],
  },
  {
    id: "when-greedy-works",
    title: "6. When Greedy Works",
    subtitle: "Recognizing the pattern",
    duration: "3m",
    contentTitle: "1.6 When Greedy Works",
    content: [
      "Greedy tends to work when each step can be justified by an exchange argument or a stays-ahead argument.",
      "Scheduling, interval selection, and resource allocation are common examples.",
    ],
  },
  {
    id: "when-greedy-fails",
    title: "7. When Greedy Fails",
    subtitle: "The warning signs",
    duration: "3m",
    contentTitle: "1.7 When Greedy Fails",
    content: [
      "Greedy fails when a choice that looks best now blocks a better structure later.",
      "If the problem requires revisiting earlier choices, greedy is usually a weak fit.",
    ],
  },
  {
    id: "greedy-vs-brute-force",
    title: "8. Greedy vs Brute Force",
    subtitle: "Why greedy is faster",
    duration: "3m",
    contentTitle: "1.8 Greedy vs Brute Force",
    content: [
      "Brute force explores many possible futures. Greedy aggressively commits to one path.",
      "That speed comes with a proof requirement: you must show the commitment is safe.",
    ],
  },
  {
    id: "greedy-vs-dp",
    title: "9. Greedy vs Dynamic Programming",
    subtitle: "The key difference",
    duration: "3m",
    contentTitle: "1.9 Greedy vs Dynamic Programming",
    content: [
      "Dynamic programming delays commitment and compares many subproblem results.",
      "Greedy commits immediately, which is why it is simpler when valid and dangerous when not.",
    ],
  },
  {
    id: "quiz-greedy-vs-dp",
    title: "10. Quiz: Greedy vs DP",
    subtitle: "Know the difference",
    duration: "1m",
    problems: 1,
    contentTitle: "1.10 Quiz: Greedy vs DP",
    content: [
      "This checkpoint helps you decide whether a new problem should trigger greedy thinking or dynamic programming instead.",
      "Making that classification early saves time in contests.",
    ],
  },
  {
    id: "greedy-template",
    title: "11. The Greedy Template",
    subtitle: "Common structure",
    duration: "3m",
    contentTitle: "1.11 The Greedy Template",
    content: [
      "Many greedy solutions follow a standard rhythm: sort, pick the best valid option, and maintain an invariant.",
      "Once you see this pattern a few times, many problems become easier to spot.",
    ],
  },
  {
    id: "coin-change-example",
    title: "12. Example - Coin Change (Greedy Works)",
    subtitle: "Standard denominations",
    duration: "3m",
    contentTitle: "1.12 Coin Change Example",
    content: [
      "With standard denominations, taking the largest valid coin first can be proven optimal.",
      "This gives a clean first example of why some greedy rules are safe.",
    ],
  },
];

const practiceProblems = [
  { title: "Assign Cookies", platform: "Codeforces", difficulty: "Easy" },
  { title: "Lemonade Change", platform: "Codeforces", difficulty: "Easy" },
  { title: "Coin Change Pattern Check", platform: "Codeforces", difficulty: "Medium" },
];

function BookIcon() {
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
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
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

export default function IntroductionToGreedyPage() {
  const [selectedLessonId, setSelectedLessonId] = useState(lessons[0].id);
  const selectedLesson =
    lessons.find((lesson) => lesson.id === selectedLessonId) ?? lessons[0];

  return (
    <section className="min-h-screen bg-slate-50 py-6 text-slate-950">
      <PageContainer className="max-w-[1180px] space-y-6">
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 sm:text-sm">
          <Link href="/roadmap" className="transition-colors hover:text-slate-950">
            Roadmaps
          </Link>
          <span>&gt;</span>
          <Link
            href="/roadmap/greedy-algorithms"
            className="transition-colors hover:text-slate-950"
          >
            Greedy Algorithms
          </Link>
          <span>&gt;</span>
          <span className="font-semibold text-slate-950">Introduction to Greedy</span>
        </div>

        <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="space-y-4 border-b border-slate-200 pb-6">
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
              <span className="inline-flex items-center gap-1.5">
                <BookIcon />
                36 lessons
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ClockIcon />
                93 min
              </span>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                Introduction to Greedy
              </h1>
              <p className="max-w-3xl text-base leading-7 text-slate-600">
                What makes an algorithm greedy? Learn the greedy choice property and when
                greedy solutions work.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="inline-flex rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
                Codeforces: 800-1200
              </span>
              <span className="inline-flex rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
                LeetCode: 1200-1500
              </span>
            </div>
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-[380px_minmax(0,1fr)]">
            <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-4">
              <div className="space-y-2">
                <h2 className="text-xl font-semibold tracking-tight text-slate-950">
                  Lessons
                </h2>
                <p className="text-sm text-slate-500">
                  Follow the first part of the greedy roadmap from intuition to classic
                  beginner-friendly problems.
                </p>
              </div>

              <div className="mt-4 max-h-[760px] space-y-3 overflow-y-auto pr-2">
                {lessons.map((lesson) => {
                  const isActive = lesson.id === selectedLessonId;

                  return (
                    <button
                      key={lesson.id}
                      type="button"
                      onClick={() => setSelectedLessonId(lesson.id)}
                      className={`w-full rounded-[1.15rem] border px-4 py-4 text-left transition-colors ${
                        isActive
                          ? "border-slate-900 bg-white shadow-sm"
                          : "border-slate-200 bg-white hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <h3 className="text-base font-semibold text-slate-950">
                            {lesson.title}
                          </h3>
                          <p className="text-sm text-slate-600">{lesson.subtitle}</p>
                        </div>
                        <div className="shrink-0 text-right">
                          <p className="text-sm font-semibold text-slate-950">{lesson.duration}</p>
                          {lesson.problems ? (
                            <p className="text-xs text-slate-500">{lesson.problems} problem</p>
                          ) : null}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="rounded-[1.25rem] border border-slate-200 bg-white">
              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
                  {selectedLesson.contentTitle}
                </h2>
                <span className="inline-flex rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
                  {selectedLesson.duration}
                </span>
              </div>

              <div className="space-y-6 px-5 py-5">
                {selectedLesson.content.map((paragraph) => (
                  <p key={paragraph} className="text-base leading-8 text-slate-700">
                    {paragraph}
                  </p>
                ))}

                <div className="space-y-3">
                  <h3 className="text-xl font-semibold tracking-tight text-slate-950">
                    Tasks
                  </h3>
                  <label className="flex items-center gap-3 text-base text-slate-700">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-300"
                    />
                    Read Unit
                  </label>
                </div>
              </div>

              <div className="border-t border-slate-200 px-5 py-5">
                <h3 className="text-lg font-semibold tracking-tight text-slate-950">
                  Practice Problems
                </h3>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {practiceProblems.map((problem) => (
                    <div
                      key={problem.title}
                      className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3"
                    >
                      <p className="text-sm font-semibold text-slate-950">{problem.title}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        {problem.platform} · {problem.difficulty}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-sm text-slate-500">Previous: Greedy Algorithms</span>
            <Link
              href="/roadmap/greedy-algorithms"
              className="text-sm font-semibold text-slate-950 transition-colors hover:text-slate-700"
            >
              Next: Proving Greedy Correctness
            </Link>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
