export type UserRole = "student" | "admin";

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  avatarUrl?: string;
  bio?: string;
  role: UserRole;
  joinedAt: string;
}
