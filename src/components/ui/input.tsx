import { cn } from "@/lib/utils";
import { forwardRef, type InputHTMLAttributes } from "react";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-11 w-full rounded-lg border border-border bg-cream-card px-3 text-sm text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-green",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";
