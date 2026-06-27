"use client";

import { cn } from "@/lib/utils";

export function AvailabilityToggle({
  isAvailable,
  onToggle,
}: {
  isAvailable: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        "rounded-full px-3 py-1 text-xs font-medium",
        isAvailable ? "bg-success/20 text-success" : "bg-sand text-ink-soft"
      )}
    >
      {isAvailable ? "Available" : "Unavailable"}
    </button>
  );
}
