"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FaqItem {
  question: string;
  answer: string;
}

export function Accordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-border rounded-card border border-border bg-cream-card">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="font-medium text-ink">{item.question}</span>
              <ChevronDown
                size={18}
                className={cn(
                  "shrink-0 text-ink-soft transition-transform",
                  isOpen && "rotate-180"
                )}
              />
            </button>
            {isOpen && <p className="px-5 pb-4 text-sm text-ink-soft">{item.answer}</p>}
          </div>
        );
      })}
    </div>
  );
}
