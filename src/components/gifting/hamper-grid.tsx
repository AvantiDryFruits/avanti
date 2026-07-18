import type { GiftHamper } from "@/lib/data/types";
import { HamperCard } from "./hamper-card";

export function HamperGrid({ hampers }: { hampers: GiftHamper[] }) {
  if (hampers.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {hampers.map((hamper) => (
        <HamperCard key={hamper.id} hamper={hamper} />
      ))}
    </div>
  );
}
