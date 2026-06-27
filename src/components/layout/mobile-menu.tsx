"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 w-10 items-center justify-center rounded-lg text-green-dark"
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div
        className={cn(
          "fixed inset-x-0 top-[64px] z-40 origin-top border-t border-border bg-cream shadow-lg transition-transform",
          open ? "scale-y-100" : "pointer-events-none scale-y-0"
        )}
      >
        <nav className="flex flex-col px-4 py-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="border-b border-border py-3 text-base font-medium text-ink last:border-b-0"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
