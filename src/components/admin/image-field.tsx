"use client";

import { useRef, type ChangeEvent } from "react";
import { Upload, X } from "lucide-react";
import { Input } from "@/components/ui/input";

export function ImageField({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (value: string | null) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result as string);
    reader.readAsDataURL(file);
  }

  const isDataUrl = value?.startsWith("data:") ?? false;

  return (
    <div>
      <div className="flex gap-2">
        <Input
          placeholder="Paste an image URL"
          value={isDataUrl ? "" : value ?? ""}
          onChange={(e) => onChange(e.target.value || null)}
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex h-11 shrink-0 items-center gap-1 rounded-lg border border-border px-3 text-sm text-ink-soft hover:bg-sand"
        >
          <Upload size={16} />
          Upload
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFile}
        />
      </div>

      {value && (
        <div className="mt-3 flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="Preview" className="h-16 w-16 rounded-lg object-cover" />
          <button
            type="button"
            onClick={() => onChange(null)}
            className="flex items-center gap-1 text-sm text-orange-dark"
          >
            <X size={14} />
            Remove
          </button>
        </div>
      )}
    </div>
  );
}
