import Link from "next/link";
import { NAV_LINKS, SITE_NAME } from "@/lib/constants";
import { MobileMenu } from "./mobile-menu";
import { CartIcon } from "@/components/cart/cart-icon";

export function Header() {
  return (
    <header className="sticky top-0 z-50 h-16 border-b border-border bg-cream">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="font-display text-xl text-green-dark md:text-2xl">
          {SITE_NAME}
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink-soft transition-colors hover:text-green-dark"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <CartIcon />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
