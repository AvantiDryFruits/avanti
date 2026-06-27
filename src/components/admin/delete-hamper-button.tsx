"use client";

import { Trash2 } from "lucide-react";
import { deleteHamper } from "@/lib/data/hampers";

export function DeleteHamperButton({
  hamperId,
  onDeleted,
}: {
  hamperId: string;
  onDeleted: () => void;
}) {
  function handleDelete() {
    if (!confirm("Delete this hamper? This cannot be undone.")) return;
    deleteHamper(hamperId);
    onDeleted();
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      aria-label="Delete hamper"
      className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-soft hover:bg-orange-light hover:text-orange-dark"
    >
      <Trash2 size={16} />
    </button>
  );
}
