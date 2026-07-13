"use client";

import { useRef, useState, type ChangeEvent } from "react";
import { Plus, Upload, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { uploadImage } from "@/lib/actions/storage";

export function ImagesField({
  values,
  onChange,
  bucket = "product-images",
}: {
  values: string[];
  onChange: (values: string[]) => void;
  bucket?: "product-images" | "hamper-images";
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [urlInput, setUrlInput] = useState("");

  async function handleFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";

    setUploading(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const result = await uploadImage(fd, bucket);
      if ("error" in result) {
        setError(result.error);
      } else {
        onChange([...values, result.url]);
      }
    } catch {
      setError("Upload failed. The image may be too large — try one under 8MB.");
    } finally {
      setUploading(false);
    }
  }

  function addUrl() {
    const url = urlInput.trim();
    if (!url) return;
    onChange([...values, url]);
    setUrlInput("");
  }

  function remove(index: number) {
    onChange(values.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-3">
      {values.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {values.map((url, i) => (
            <div key={i} className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt={`Image ${i + 1}`} className="h-20 w-20 rounded-lg object-cover" />
              <button
                type="button"
                onClick={() => remove(i)}
                className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full border border-border bg-white text-ink-soft hover:text-orange-dark"
              >
                <X size={10} />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-2">
        <Input
          placeholder="Paste an image URL"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addUrl();
            }
          }}
        />
        <button
          type="button"
          onClick={addUrl}
          disabled={!urlInput.trim()}
          className="flex h-11 shrink-0 items-center gap-1 rounded-lg border border-border px-3 text-sm text-ink-soft hover:bg-sand disabled:opacity-50"
        >
          <Plus size={16} />
          Add
        </button>
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

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
