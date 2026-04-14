"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import Link from "next/link";

import { PageContainer } from "@/components/layout/page-container";
import { useAuth } from "@/components/providers/auth-provider";
import { ApiError } from "@/lib/api";
import { userProfile } from "@/lib/mock-data/profile";
import { cn } from "@/lib/utils";

function InfoIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 10v6" />
      <path d="M12 7h.01" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M12 20h9" />
      <path d="m16.5 3.5 4 4L8 20l-5 1 1-5Z" />
    </svg>
  );
}

function ArrowUpRightIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="m5 12 5 5L20 7" />
    </svg>
  );
}

export default function ProfilePage() {
  const { user, isLoading, updateProfile } = useAuth();
  const [editingField, setEditingField] = useState<string | null>(null);
  const [draftValue, setDraftValue] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const profileFields = useMemo(() => {
    if (!user) {
      return [];
    }

    return [
      { label: "Email", value: user.email, editable: false, external: false, key: "email" },
      { label: "Name", value: user.name, editable: true, external: false, key: "name" },
      {
        label: "Phone Number",
        value: user.phone_number ?? "",
        editable: true,
        external: false,
        key: "phone_number",
      },
      {
        label: "Institute",
        value: user.institute ?? "",
        editable: true,
        external: false,
        key: "institute",
      },
      {
        label: "Facebook Link",
        value: user.facebook_link ?? "",
        editable: true,
        external: true,
        key: "facebook_link",
      },
      {
        label: "Discord Username",
        value: user.discord_username ?? "",
        editable: true,
        external: true,
        key: "discord_username",
      },
      {
        label: "Vjudge Username",
        value: user.vjudge_username ?? "",
        editable: true,
        external: true,
        key: "vjudge_username",
      },
      {
        label: "Codeforces Username",
        value: user.codeforces_username ?? "",
        editable: true,
        external: true,
        key: "codeforces_username",
      },
    ] as const;
  }, [user]);

  const startEditing = (label: string, value: string) => {
    setEditingField(label);
    setDraftValue(value);
    setErrorMessage(null);
  };

  const cancelEditing = () => {
    setEditingField(null);
    setDraftValue("");
  };

  const saveEditing = async (fieldKey: string) => {
    setIsSaving(true);
    setErrorMessage(null);

    try {
      await updateProfile({
        [fieldKey]: draftValue.trim() === "" ? null : draftValue,
      });
      setEditingField(null);
      setDraftValue("");
    } catch (error) {
      setErrorMessage(
        error instanceof ApiError ? error.message : "Unable to save your profile right now.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <PageContainer className="py-16">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-sm">
          <p className="text-sm font-medium text-slate-500">Loading profile...</p>
        </div>
      </PageContainer>
    );
  }

  if (!user) {
    return (
      <PageContainer className="py-16">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-sm">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-950">
            Sign in to view your profile
          </h1>
          <p className="mt-3 text-sm text-slate-600">
            Use the sign-in button from the navigation bar, then come back here.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
          >
            Go Home
          </Link>
        </div>
      </PageContainer>
    );
  }

  return (
    <div className="relative overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.12),_transparent_32%),linear-gradient(180deg,_#ffffff_0%,_#f8fbff_45%,_#f5f7fb_100%)]">
      <div className="absolute inset-x-0 top-0 -z-0 h-72 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.12),_transparent_58%)]" />

      <PageContainer className="relative z-10 py-10 sm:py-14">
        <section className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/85 shadow-[0_24px_80px_rgba(148,163,184,0.18)] backdrop-blur">
            <div className="relative px-6 pb-8 pt-10 sm:px-10 sm:pt-12">
              <div className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(135deg,_rgba(14,165,233,0.14),_rgba(96,165,250,0.04)_45%,_rgba(255,255,255,0.8)_100%)]" />

              <div className="relative flex flex-col items-center text-center">
                <div className="relative h-28 w-28 overflow-hidden rounded-full border-[6px] border-white bg-slate-100 shadow-lg shadow-sky-100/80">
                  <Image
                    src={userProfile.avatarUrl}
                    alt={userProfile.name}
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                </div>

                <div className="mt-5 space-y-2">
                  <span className="inline-flex rounded-full border border-sky-100 bg-sky-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">
                    {userProfile.title}
                  </span>
                  <div>
                    <h1 className="bg-gradient-to-r from-slate-950 via-sky-700 to-cyan-600 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent sm:text-5xl">
                      {user.name}
                    </h1>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                      {userProfile.bio}
                    </p>
                  </div>
                </div>

                <div className="mt-8 grid w-full gap-4 sm:grid-cols-3">
                  {userProfile.stats.map((stat) => (
                    <article
                      key={stat.label}
                      className="rounded-[1.5rem] border border-slate-200/80 bg-white/90 p-5 text-left shadow-[0_12px_30px_rgba(148,163,184,0.12)]"
                    >
                      <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                      <p className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
                        {stat.value}
                      </p>
                      <p className="mt-2 text-sm text-sky-700">{stat.note}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            {errorMessage ? (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {errorMessage}
              </div>
            ) : null}

            {profileFields.map((field) => {
              const isEditing = editingField === field.label;
              const fieldValue = field.value;

              return (
                <article
                  key={field.label}
                  className="flex flex-col gap-4 rounded-[1.5rem] border border-slate-200/80 bg-white/90 px-5 py-5 shadow-[0_16px_40px_rgba(148,163,184,0.12)] sm:flex-row sm:items-center sm:px-6"
                >
                  <div className="flex min-w-0 flex-1 items-center gap-3 sm:max-w-[240px]">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                      <InfoIcon />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{field.label}</p>
                    </div>
                  </div>

                  <div className="min-w-0 flex-1 text-sm font-medium text-slate-600 sm:text-base">
                    {isEditing ? (
                      <input
                        type="text"
                        value={draftValue}
                        autoFocus
                        onChange={(event) => setDraftValue(event.target.value)}
                        onBlur={cancelEditing}
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            void saveEditing(field.key);
                          }

                          if (event.key === "Escape") {
                            cancelEditing();
                          }
                        }}
                        className="w-full rounded-2xl border border-sky-200 bg-sky-50/60 px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-sky-400 focus:bg-white sm:text-base"
                        aria-label={`Edit ${field.label}`}
                      />
                    ) : (
                      <p className="truncate">{fieldValue}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    {field.editable ? (
                      <button
                        type="button"
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() =>
                          isEditing
                            ? void saveEditing(field.key)
                            : startEditing(field.label, fieldValue)
                        }
                        disabled={isSaving}
                        className={cn(
                          "inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-600 transition-colors hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700",
                          isEditing &&
                            "border-sky-200 bg-sky-50 text-sky-700",
                          isSaving && "cursor-not-allowed opacity-70",
                        )}
                        aria-label={isEditing ? `Save ${field.label}` : `Edit ${field.label}`}
                      >
                        {isEditing ? <CheckIcon /> : <EditIcon />}
                      </button>
                    ) : null}

                    {field.external ? (
                      <button
                        type="button"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-600 transition-colors hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700"
                        aria-label={`Open ${field.label}`}
                      >
                        <ArrowUpRightIcon />
                      </button>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </PageContainer>
    </div>
  );
}
