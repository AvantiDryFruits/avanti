"use client";

import { useEffect } from "react";
import Link from "next/link";
import { buttonClasses } from "@/components/ui/button";

export default function SiteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <p className="font-display text-2xl text-ink">Something went wrong</p>
      <p className="mt-2 text-ink-soft">Please try again, or head back home.</p>
      <div className="mt-6 flex gap-3">
        <button type="button" onClick={reset} className={buttonClasses({ variant: "primary" })}>
          Try Again
        </button>
        <Link href="/" className={buttonClasses({ variant: "outline" })}>
          Go Home
        </Link>
      </div>
    </div>
  );
}
