import { createClient } from "./server";
import { createAdminClient } from "./admin";
import { slugify } from "@/lib/utils";
import type { Product, ProductCategory } from "@/lib/data/types";

export async function getProducts(): Promise<Product[]> {
  const supabase = createClient();
  const { data, error } = await supabase.from("products").select("*").order("name");
  if (error) throw error;
  return data ?? [];
}

export async function getProductById(id: string): Promise<Product | null> {
  const supabase = createAdminClient();
  const { data, error } = await supabase.from("products").select("*").eq("id", id).single();
  if (error) return null;
  return data;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = createClient();
  const { data, error } = await supabase.from("products").select("*").eq("slug", slug).single();
  if (error) return null;
  return data;
}

export async function getProductsByCategory(category: ProductCategory): Promise<Product[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category", category)
    .order("name");
  if (error) throw error;
  return data ?? [];
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_featured", true)
    .order("name");
  if (error) throw error;
  return data ?? [];
}

export async function createProduct(
  input: Omit<Product, "id" | "slug" | "created_at" | "updated_at"> & { slug?: string }
): Promise<Product> {
  const supabase = createAdminClient();
  const now = new Date().toISOString();
  const product: Product = {
    ...input,
    id: `prod-${crypto.randomUUID()}`,
    slug: input.slug?.trim() ? slugify(input.slug) : slugify(input.name),
    created_at: now,
    updated_at: now,
  };
  const { data, error } = await supabase.from("products").insert(product).select().single();
  if (error) throw error;
  return data;
}

export async function updateProduct(
  id: string,
  updates: Partial<Omit<Product, "id" | "created_at">>
): Promise<Product | null> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("products")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();
  if (error) return null;
  return data;
}

export async function deleteProduct(id: string): Promise<void> {
  const supabase = createAdminClient();
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw error;
}

export async function toggleProductAvailability(id: string): Promise<Product | null> {
  const supabase = createAdminClient();
  const { data: current } = await supabase.from("products").select("is_available").eq("id", id).single();
  if (!current) return null;
  return updateProduct(id, { is_available: !current.is_available });
}
