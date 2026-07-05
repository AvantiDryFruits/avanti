"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ImagesField } from "./images-field";
import { createProduct, updateProduct } from "@/lib/actions/products";
import { PRODUCT_CATEGORIES } from "@/lib/data/types";
import { slugify } from "@/lib/utils";
import type { Product } from "@/lib/data/types";

const CATEGORY_VALUES = ["dry-fruits", "sweets", "farsan", "masala"] as const;

const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().optional(),
  description: z.string().optional(),
  category: z.enum(CATEGORY_VALUES),
  price_per_gram: z.number().positive("Price must be greater than 0"),
  is_available: z.boolean(),
  is_featured: z.boolean(),
});

type ProductFormValues = z.infer<typeof productSchema>;

export function ProductForm({ product }: { product?: Product }) {
  const router = useRouter();
  const [imageUrls, setImageUrls] = useState<string[]>(product?.image_urls ?? []);
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: product
      ? {
          name: product.name,
          slug: product.slug,
          description: product.description ?? "",
          category: product.category,
          price_per_gram: product.price_per_gram,
          is_available: product.is_available,
          is_featured: product.is_featured,
        }
      : {
          name: "",
          slug: "",
          description: "",
          category: "dry-fruits",
          price_per_gram: 0,
          is_available: true,
          is_featured: false,
        },
  });

  async function onSubmit(values: ProductFormValues) {
    setSubmitError("");
    try {
      if (product) {
        await updateProduct(product.id, {
          name: values.name,
          slug: values.slug?.trim() ? slugify(values.slug) : product.slug,
          description: values.description || null,
          category: values.category,
          price_per_gram: values.price_per_gram,
          image_urls: imageUrls,
          is_available: values.is_available,
          is_featured: values.is_featured,
        });
      } else {
        await createProduct({
          name: values.name,
          slug: values.slug,
          description: values.description || null,
          category: values.category,
          price_per_gram: values.price_per_gram,
          image_urls: imageUrls,
          is_available: values.is_available,
          is_featured: values.is_featured,
        });
      }
      router.push("/dashboard/products");
      router.refresh();
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl space-y-5">
      <div>
        <label className="mb-1 block text-sm font-medium text-ink">Name</label>
        <Input {...register("name")} placeholder="e.g. Almonds" />
        {errors.name && <p className="mt-1 text-sm text-orange-dark">{errors.name.message}</p>}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-ink">
          Slug <span className="text-ink-soft">(leave blank to auto-generate from name)</span>
        </label>
        <Input {...register("slug")} placeholder="e.g. almonds" />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-ink">Description</label>
        <Textarea {...register("description")} placeholder="Short product description" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-ink">Category</label>
          <Select {...register("category")}>
            {PRODUCT_CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-ink">Price per gram (₹)</label>
          <Input
            type="number"
            step="0.01"
            {...register("price_per_gram", { valueAsNumber: true })}
          />
          {errors.price_per_gram && (
            <p className="mt-1 text-sm text-orange-dark">{errors.price_per_gram.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-ink">Images</label>
        <ImagesField values={imageUrls} onChange={setImageUrls} bucket="product-images" />
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
        {product ? "Save Changes" : "Create Product"}
      </Button>
    </form>
  );
}
