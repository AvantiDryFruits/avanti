import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-cream px-4 text-center">
      <p className="font-display text-2xl text-green-dark">{SITE_NAME}</p>
      <p className="mt-4 font-display text-3xl text-ink">404</p>
      <p className="mt-2 text-ink-soft">We couldn&apos;t find that page.</p>
      <Link href="/" className="mt-6 text-sm font-medium text-green-dark underline">
        Back to Home
      </Link>
    </div>
  );
}
