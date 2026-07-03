"use client";

import { useState, useRef, type ChangeEvent } from "react";
import { Upload, X } from "lucide-react";
import { Input } from "@/components/ui/input";

export function ImageField({
  value,
  onChange,
  bucket = "product-images",
}: {
  value: string | null;
  onChange: (value: string | null) => void;
  bucket?: "product-images" | "hamper-images";
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function handleFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      setUploading(true);
      try {
        const { createBrowserClient } = await import("@supabase/ssr");
        const supabase = createBrowserClient(supabaseUrl, supabaseKey);
        const path = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "-")}`;
        const { data, error } = await supabase.storage
          .from(bucket)
          .upload(path, file, { upsert: true });
        if (!error && data) {
          const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(data.path);
          onChange(urlData.publicUrl);
        }
      } finally {
        setUploading(false);
      }
    } else {
      const reader = new FileReader();
      reader.onload = () => onChange(reader.result as string);
      reader.readAsDataURL(file);
    }
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
          disabled={uploading}
          className="flex h-11 shrink-0 items-center gap-1 rounded-lg border border-border px-3 text-sm text-ink-soft hover:bg-sand disabled:opacity-50"
        >
          <Upload size={16} />
          {uploading ? "Uploading…" : "Upload"}
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
