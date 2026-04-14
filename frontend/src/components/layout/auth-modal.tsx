"use client";

import { useEffect, useState } from "react";

import { useAuth } from "@/components/providers/auth-provider";
import { ApiError } from "@/lib/api";
import { cn } from "@/lib/utils";

type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type AuthTab = "sign-in" | "sign-up";

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<AuthTab>("sign-in");
  const [signInForm, setSignInForm] = useState({ email: "", password: "" });
  const [signUpForm, setSignUpForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signIn, signUp } = useAuth();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const handleSignInSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      await signIn(signInForm);
      onClose();
    } catch (error) {
      setErrorMessage(
        error instanceof ApiError ? error.message : "Unable to sign in right now.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignUpSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);

    if (signUpForm.password !== signUpForm.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      await signUp({
        name: signUpForm.name,
        email: signUpForm.email,
        password: signUpForm.password,
      });
      onClose();
    } catch (error) {
      setErrorMessage(
        error instanceof ApiError ? error.message : "Unable to create account right now.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/45 px-4 py-10 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-2xl sm:p-7"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
              Sign in to AlgoAssist
            </h2>
            <p className="text-sm text-slate-500">
              Choose your preferred authentication method
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-950"
            aria-label="Close sign in dialog"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M6 6 18 18" />
              <path d="m6 18 12-12" />
            </svg>
          </button>
        </div>

        <div className="mt-6 flex items-center gap-6 border-b border-slate-200">
          <button
            type="button"
            onClick={() => setActiveTab("sign-in")}
            className={cn(
              "border-b-2 pb-3 text-base font-semibold transition-colors",
              activeTab === "sign-in"
                ? "border-slate-950 text-slate-950"
                : "border-transparent text-slate-400 hover:text-slate-700",
            )}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("sign-up")}
            className={cn(
              "border-b-2 pb-3 text-base font-semibold transition-colors",
              activeTab === "sign-up"
                ? "border-slate-950 text-slate-950"
                : "border-transparent text-slate-400 hover:text-slate-700",
            )}
          >
            Sign Up
          </button>
        </div>

        {activeTab === "sign-in" ? (
          <form className="mt-6 space-y-5" onSubmit={handleSignInSubmit}>
            <div className="space-y-2">
              <label htmlFor="signin-email" className="text-sm font-semibold text-slate-900">
                Email
              </label>
              <input
                id="signin-email"
                type="email"
                value={signInForm.email}
                onChange={(event) =>
                  setSignInForm((current) => ({ ...current, email: event.target.value }))
                }
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-slate-300"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between gap-4">
                <label
                  htmlFor="signin-password"
                  className="text-sm font-semibold text-slate-900"
                >
                  Password
                </label>
                <button
                  type="button"
                  className="text-sm font-medium text-slate-500 transition-colors hover:text-slate-900"
                >
                  Forgot password?
                </button>
              </div>
              <input
                id="signin-password"
                type="password"
                value={signInForm.password}
                onChange={(event) =>
                  setSignInForm((current) => ({ ...current, password: event.target.value }))
                }
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-slate-300"
              />
            </div>

            {errorMessage ? <p className="text-sm text-rose-600">{errorMessage}</p> : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-slate-950 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
            </button>
          </form>
        ) : (
          <form className="mt-6 space-y-5" onSubmit={handleSignUpSubmit}>
            <div className="space-y-2">
              <label htmlFor="signup-name" className="text-sm font-semibold text-slate-900">
                Full Name
              </label>
              <input
                id="signup-name"
                type="text"
                value={signUpForm.name}
                onChange={(event) =>
                  setSignUpForm((current) => ({ ...current, name: event.target.value }))
                }
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-slate-300"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="signup-email" className="text-sm font-semibold text-slate-900">
                Email
              </label>
              <input
                id="signup-email"
                type="email"
                value={signUpForm.email}
                onChange={(event) =>
                  setSignUpForm((current) => ({ ...current, email: event.target.value }))
                }
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-slate-300"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="signup-password" className="text-sm font-semibold text-slate-900">
                Password
              </label>
              <input
                id="signup-password"
                type="password"
                value={signUpForm.password}
                onChange={(event) =>
                  setSignUpForm((current) => ({ ...current, password: event.target.value }))
                }
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-slate-300"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="signup-confirm-password"
                className="text-sm font-semibold text-slate-900"
              >
                Confirm Password
              </label>
              <input
                id="signup-confirm-password"
                type="password"
                value={signUpForm.confirmPassword}
                onChange={(event) =>
                  setSignUpForm((current) => ({
                    ...current,
                    confirmPassword: event.target.value,
                  }))
                }
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-slate-300"
              />
            </div>

            {errorMessage ? <p className="text-sm text-rose-600">{errorMessage}</p> : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-slate-950 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
            >
              {isSubmitting ? "Creating account..." : "Create account"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
