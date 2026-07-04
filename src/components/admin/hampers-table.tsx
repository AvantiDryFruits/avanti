"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toggleHamperAvailability, deleteHamper } from "@/lib/actions/hampers";
import { formatPrice } from "@/lib/utils";
import type { GiftHamper } from "@/lib/data/types";
import { AvailabilityToggle } from "./availability-toggle";

export function HampersTable({ hampers }: { hampers: GiftHamper[] }) {
  const router = useRouter();

  async function handleToggle(id: string) {
    await toggleHamperAvailability(id);
    router.refresh();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this hamper? This cannot be undone.")) return;
    await deleteHamper(id);
    router.refresh();
  }

  if (hampers.length === 0) {
    return <p className="text-sm text-ink-soft">No hampers yet.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-card border border-border bg-cream-card">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-border text-xs uppercase text-ink-soft">
          <tr>
            <th className="px-4 py-3">Hamper</th>
            <th className="px-4 py-3">Contents</th>
            <th className="px-4 py-3">Price</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {hampers.map((hamper) => (
            <tr key={hamper.id} className="border-b border-border last:border-b-0">
              <td className="flex items-center gap-3 px-4 py-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-sand text-[9px] text-muted">
                  {(hamper.image_urls ?? [])[0] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={(hamper.image_urls ?? [])[0]}
                      alt={hamper.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    "No img"
                  )}
                </div>
                <span className="font-medium text-ink">{hamper.name}</span>
                {hamper.is_featured && <Badge variant="orange">Featured</Badge>}
              </td>
              <td className="px-4 py-3 text-ink-soft">{hamper.contents.length} items</td>
              <td className="px-4 py-3 text-ink-soft">{formatPrice(hamper.price)}</td>
              <td className="px-4 py-3">
                <AvailabilityToggle
                  isAvailable={hamper.is_available}
                  onToggle={() => handleToggle(hamper.id)}
                />
              </td>
              <td className="px-4 py-3 text-right">
                <div className="flex items-center justify-end gap-2">
                  <Link
                    href={`/dashboard/hampers/${hamper.id}`}
                    aria-label="Edit hamper"
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-soft hover:bg-sand hover:text-ink"
                  >
                    <Pencil size={16} />
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(hamper.id)}
                    aria-label="Delete hamper"
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-soft hover:bg-orange-light hover:text-orange-dark"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
