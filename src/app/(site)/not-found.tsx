import Link from "next/link";
import { buttonClasses } from "@/components/ui/button";

export default function SiteNotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <p className="font-display text-3xl text-ink">404</p>
      <p className="mt-2 text-ink-soft">We couldn&apos;t find that page.</p>
      <Link href="/" className={buttonClasses({ variant: "primary", className: "mt-6" })}>
        Back to Home
      </Link>
    </div>
  );
}
