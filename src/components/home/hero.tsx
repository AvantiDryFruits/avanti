import Link from "next/link";
import { SITE_NAME, TAGLINE } from "@/lib/constants";
import { buttonClasses } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="bg-green-dark">
      <div className="mx-auto max-w-6xl px-4 py-16 text-center md:px-6 md:py-24">
        <p className="text-sm font-semibold uppercase tracking-wide text-on-dark/70">
          Mulund West, Mumbai
        </p>
        <h1 className="mt-3 font-display text-4xl text-on-dark md:text-5xl">{SITE_NAME}</h1>
        <p className="mt-3 text-lg text-on-dark/85">{TAGLINE}</p>
        <p className="mx-auto mt-4 max-w-xl text-on-dark/70">
          Premium dry fruits, masala, sweets and farsan — order on WhatsApp, no app or account
          needed.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/shop" className={buttonClasses({ variant: "primary", size: "lg" })}>
            Shop Now
          </Link>
          <Link
            href="/gifting"
            className={buttonClasses({
              variant: "outline",
              size: "lg",
              className: "border-on-dark/30 text-on-dark hover:bg-on-dark/10",
            })}
          >
            Explore Gifting
          </Link>
        </div>
      </div>
    </section>
  );
}
