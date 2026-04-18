export interface User {
  id: string;
  name: string;
  email: string;
  phone_number?: string | null;
  institute?: string | null;
  avatar_url?: string | null;
  facebook_link?: string | null;
  discord_username?: string | null;
  vjudge_username?: string | null;
  codeforces_username?: string | null;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export interface SignInPayload {
  email: string;
  password: string;
}

export interface SignUpPayload extends SignInPayload {
  name: string;
}

export interface UpdateProfilePayload {
  name?: string;
  phone_number?: string | null;
  institute?: string | null;
  avatar_url?: string | null;
  facebook_link?: string | null;
  discord_username?: string | null;
  vjudge_username?: string | null;
  codeforces_username?: string | null;
}
