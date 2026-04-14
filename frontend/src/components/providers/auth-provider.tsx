"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { apiRequest, ApiError } from "@/lib/api";
import type {
  AuthResponse,
  SignInPayload,
  SignUpPayload,
  UpdateProfilePayload,
  User,
} from "@/lib/types/user";

type AuthContextValue = {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  signIn: (payload: SignInPayload) => Promise<void>;
  signUp: (payload: SignUpPayload) => Promise<void>;
  signOut: () => void;
  refreshProfile: () => Promise<void>;
  updateProfile: (payload: UpdateProfilePayload) => Promise<User>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const AUTH_TOKEN_KEY = "algoassist-auth-token";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = window.localStorage.getItem(AUTH_TOKEN_KEY);
    if (!storedToken) {
      setIsLoading(false);
      return;
    }

    setToken(storedToken);
    void apiRequest<User>("/profile/me", { token: storedToken })
      .then((profile) => {
        setUser(profile);
      })
      .catch(() => {
        window.localStorage.removeItem(AUTH_TOKEN_KEY);
        setToken(null);
        setUser(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const storeSession = (data: AuthResponse) => {
    window.localStorage.setItem(AUTH_TOKEN_KEY, data.access_token);
    setToken(data.access_token);
    setUser(data.user);
  };

  const signIn = async (payload: SignInPayload) => {
    const data = await apiRequest<AuthResponse>("/auth/signin", {
      method: "POST",
      body: payload,
    });
    storeSession(data);
  };

  const signUp = async (payload: SignUpPayload) => {
    const data = await apiRequest<AuthResponse>("/auth/signup", {
      method: "POST",
      body: payload,
    });
    storeSession(data);
  };

  const signOut = () => {
    window.localStorage.removeItem(AUTH_TOKEN_KEY);
    setToken(null);
    setUser(null);
  };

  const refreshProfile = async () => {
    if (!token) {
      throw new ApiError("You are not signed in", 401);
    }

    const profile = await apiRequest<User>("/profile/me", { token });
    setUser(profile);
  };

  const updateProfile = async (payload: UpdateProfilePayload) => {
    if (!token) {
      throw new ApiError("You are not signed in", 401);
    }

    const profile = await apiRequest<User>("/profile/me", {
      method: "PATCH",
      token,
      body: payload,
    });
    setUser(profile);
    return profile;
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      isLoading,
      signIn,
      signUp,
      signOut,
      refreshProfile,
      updateProfile,
    }),
    [isLoading, token, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
