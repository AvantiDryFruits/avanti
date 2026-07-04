"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { HamperForm } from "@/components/admin/hamper-form";
import { getHamperById } from "@/lib/actions/hampers";
import type { GiftHamper } from "@/lib/data/types";

export default function EditHamperPage() {
  const params = useParams<{ id: string }>();
  const [hamper, setHamper] = useState<GiftHamper | null | undefined>(undefined);

  useEffect(() => {
    getHamperById(params.id).then((h) => setHamper(h ?? null));
  }, [params.id]);

  if (hamper === undefined) {
    return <p className="text-sm text-ink-soft">Loading...</p>;
  }

  if (hamper === null) {
    return <p className="text-sm text-ink-soft">Hamper not found.</p>;
  }

  return (
    <div>
      <h1 className="font-display text-2xl text-ink">Edit Hamper</h1>
      <div className="mt-6">
        <HamperForm hamper={hamper} />
      </div>
    </div>
  );
}
