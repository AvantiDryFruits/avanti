import Link from "next/link";
import { Gift, LayoutDashboard, Package } from "lucide-react";
import { SITE_NAME } from "@/lib/constants";
import { LogoutButton } from "./logout-button";

const LINKS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/products", label: "Products", icon: Package },
  { href: "/dashboard/hampers", label: "Hampers", icon: Gift },
];

export function Sidebar() {
  return (
    <aside className="flex h-screen w-56 shrink-0 flex-col border-r border-border bg-cream-card">
      <div className="border-b border-border px-5 py-5">
        <p className="font-display text-lg text-green-dark">{SITE_NAME}</p>
        <p className="text-xs text-ink-soft">Admin</p>
      </div>

      <nav className="flex-1 px-3 py-4">
        {LINKS.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-ink-soft hover:bg-sand hover:text-ink"
            >
              <Icon size={18} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border px-3 py-4">
        <LogoutButton />
      </div>
    </aside>
  );
}
