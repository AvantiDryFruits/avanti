import Link from "next/link";
import { Mail, MapPin, MessageCircle } from "lucide-react";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  INSTAGRAM_URL,
  NAV_LINKS,
  SHOP_ADDRESS,
  SITE_NAME,
  TAGLINE,
  WHATSAPP_NUMBER,
} from "@/lib/constants";

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-green-dark text-on-dark">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-display text-xl">{SITE_NAME}</p>
            <p className="mt-1 text-sm text-on-dark/80">{TAGLINE}</p>
            <p className="mt-4 flex items-start gap-2 text-sm text-on-dark/80">
              <MapPin size={18} className="mt-0.5 shrink-0" />
              {SHOP_ADDRESS}
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-on-dark/60">
              Explore
            </p>
            <nav className="mt-3 flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-on-dark/80 hover:text-on-dark"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-on-dark/60">
              Get in touch
            </p>
            <div className="mt-3 flex flex-col gap-3 text-sm text-on-dark/80">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-on-dark"
              >
                <MessageCircle size={18} />
                {CONTACT_PHONE_DISPLAY}
              </a>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="flex items-center gap-2 hover:text-on-dark"
              >
                <Mail size={18} />
                {CONTACT_EMAIL}
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-on-dark"
              >
                <InstagramIcon size={18} />
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-on-dark/15 pt-6 text-center text-xs text-on-dark/60">
          © {year} {SITE_NAME}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
