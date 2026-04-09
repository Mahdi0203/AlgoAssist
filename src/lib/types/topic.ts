export type TopicDifficulty = "Beginner" | "Intermediate" | "Advanced";

export type ResourceType = "article" | "video" | "blog" | "course";

export type PracticePlatform =
  | "Codeforces"
  | "AtCoder"
  | "CSES"
  | "CodeChef"
  | "LeetCode"
  | "Other";

export interface TopicResource {
  id: string;
  title: string;
  url: string;
  resourceType: ResourceType;
}

export interface PracticeProblem {
  id: string;
  title: string;
  platform: PracticePlatform;
  url: string;
  difficulty: TopicDifficulty;
}

export interface Topic {
  id: string;
  title: string;
  slug: string;
  description: string;
  difficulty: TopicDifficulty;
  prerequisiteText: string;
  resources: TopicResource[];
  practiceProblems: PracticeProblem[];
}
