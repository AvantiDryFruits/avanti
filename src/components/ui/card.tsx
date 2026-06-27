import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "dark" | "outline";
}

const variants = {
  default: "bg-cream-card text-ink shadow-md",
  dark: "bg-green text-on-dark shadow-lg",
  outline: "bg-cream-card text-ink border border-border shadow-sm",
};

export function Card({ variant = "default", className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-card transition-shadow hover:shadow-lg",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
