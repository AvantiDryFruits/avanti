"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ImageField } from "./image-field";
import { ContentsListInput } from "./contents-list-input";
import { createHamper, updateHamper } from "@/lib/data/hampers";
import { slugify } from "@/lib/utils";
import type { GiftHamper } from "@/lib/data/types";

const hamperSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().optional(),
  description: z.string().optional(),
  price: z.number().positive("Price must be greater than 0"),
  is_available: z.boolean(),
  is_featured: z.boolean(),
});

type HamperFormValues = z.infer<typeof hamperSchema>;

export function HamperForm({ hamper }: { hamper?: GiftHamper }) {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState<string | null>(hamper?.image_url ?? null);
  const [contents, setContents] = useState<string[]>(hamper?.contents ?? [""]);
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<HamperFormValues>({
    resolver: zodResolver(hamperSchema),
    defaultValues: hamper
      ? {
          name: hamper.name,
          slug: hamper.slug,
          description: hamper.description ?? "",
          price: hamper.price,
          is_available: hamper.is_available,
          is_featured: hamper.is_featured,
        }
      : {
          name: "",
          slug: "",
          description: "",
          price: 0,
          is_available: true,
          is_featured: false,
        },
  });

  function onSubmit(values: HamperFormValues) {
    setSubmitError("");
    const cleanContents = contents.map((c) => c.trim()).filter(Boolean);

    try {
      if (hamper) {
        updateHamper(hamper.id, {
          name: values.name,
          slug: values.slug?.trim() ? slugify(values.slug) : hamper.slug,
          description: values.description || null,
          price: values.price,
          contents: cleanContents,
          image_url: imageUrl,
          is_available: values.is_available,
          is_featured: values.is_featured,
        });
      } else {
        createHamper({
          name: values.name,
          slug: values.slug,
          description: values.description || null,
          price: values.price,
          contents: cleanContents,
          image_url: imageUrl,
          is_available: values.is_available,
          is_featured: values.is_featured,
        });
      }
      router.push("/admin/hampers");
      router.refresh();
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl space-y-5">
      <div>
        <label className="mb-1 block text-sm font-medium text-ink">Name</label>
        <Input {...register("name")} placeholder="e.g. Festive Delight" />
        {errors.name && <p className="mt-1 text-sm text-orange-dark">{errors.name.message}</p>}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-ink">
          Slug <span className="text-ink-soft">(leave blank to auto-generate from name)</span>
        </label>
        <Input {...register("slug")} placeholder="e.g. festive-delight" />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-ink">Description</label>
        <Textarea {...register("description")} placeholder="Short hamper description" />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-ink">Price (₹)</label>
        <Input type="number" step="1" {...register("price", { valueAsNumber: true })} />
        {errors.price && <p className="mt-1 text-sm text-orange-dark">{errors.price.message}</p>}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-ink">Contents</label>
        <ContentsListInput items={contents} onChange={setContents} />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-ink">Image</label>
        <ImageField value={imageUrl} onChange={setImageUrl} />
      </div>

      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm text-ink">
          <input type="checkbox" {...register("is_available")} className="h-4 w-4" />
          Available
        </label>
        <label className="flex items-center gap-2 text-sm text-ink">
          <input type="checkbox" {...register("is_featured")} className="h-4 w-4" />
          Featured
        </label>
      </div>

      {submitError && <p className="text-sm text-orange-dark">{submitError}</p>}

      <Button type="submit" disabled={isSubmitting}>
        {hamper ? "Save Changes" : "Create Hamper"}
      </Button>
    </form>
  );
}
