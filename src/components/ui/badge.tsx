import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type Variant = "orange" | "green" | "muted" | "success" | "warn";

const variants: Record<Variant, string> = {
  orange: "bg-orange-light text-ink",
  green: "bg-green text-on-dark",
  muted: "bg-sand text-ink-soft",
  success: "bg-success/20 text-success",
  warn: "bg-warn/20 text-warn",
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: Variant;
}

export function Badge({ variant = "muted", className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
