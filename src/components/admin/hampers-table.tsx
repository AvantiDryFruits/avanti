"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getHampers, toggleHamperAvailability } from "@/lib/data/hampers";
import { formatPrice } from "@/lib/utils";
import type { GiftHamper } from "@/lib/data/types";
import { AvailabilityToggle } from "./availability-toggle";
import { DeleteHamperButton } from "./delete-hamper-button";

export function HampersTable() {
  const [hampers, setHampers] = useState<GiftHamper[] | null>(null);

  function refresh() {
    setHampers(getHampers());
  }

  useEffect(() => {
    refresh();
  }, []);

  if (hampers === null) {
    return <p className="text-sm text-ink-soft">Loading...</p>;
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
                  {hamper.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={hamper.image_url}
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
                  onToggle={() => {
                    toggleHamperAvailability(hamper.id);
                    refresh();
                  }}
                />
              </td>
              <td className="px-4 py-3 text-right">
                <div className="flex items-center justify-end gap-2">
                  <Link
                    href={`/admin/hampers/${hamper.id}`}
                    aria-label="Edit hamper"
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-soft hover:bg-sand hover:text-ink"
                  >
                    <Pencil size={16} />
                  </Link>
                  <DeleteHamperButton hamperId={hamper.id} onDeleted={refresh} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
