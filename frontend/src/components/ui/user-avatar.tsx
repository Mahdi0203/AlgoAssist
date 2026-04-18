"use client";

import { cn } from "@/lib/utils";

type UserAvatarProps = {
  name: string;
  avatarUrl?: string | null;
  className?: string;
  imageClassName?: string;
  fallbackClassName?: string;
};

function getFirstNameInitial(name: string) {
  const firstName = name.trim().split(/\s+/)[0] ?? "";
  return firstName.charAt(0).toUpperCase() || "A";
}

export function UserAvatar({
  name,
  avatarUrl,
  className,
  imageClassName,
  fallbackClassName,
}: UserAvatarProps) {
  if (avatarUrl) {
    return (
      <div className={cn("overflow-hidden rounded-full bg-slate-100", className)}>
        <img
          src={avatarUrl}
          alt={name}
          className={cn("h-full w-full object-cover", imageClassName)}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full bg-slate-950 font-semibold text-white",
        className,
        fallbackClassName,
      )}
      aria-label={`${name} avatar`}
    >
      {getFirstNameInitial(name)}
    </div>
  );
}
