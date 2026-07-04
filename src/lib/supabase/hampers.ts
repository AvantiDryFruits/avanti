import { createClient } from "./server";
import { createAdminClient } from "./admin";
import { slugify } from "@/lib/utils";
import type { GiftHamper } from "@/lib/data/types";

export async function getHampers(): Promise<GiftHamper[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("gift_hampers").select("*").order("name");
  if (error) throw error;
  return data ?? [];
}

export async function getHamperById(id: string): Promise<GiftHamper | null> {
  const supabase = createAdminClient();
  const { data, error } = await supabase.from("gift_hampers").select("*").eq("id", id).single();
  if (error) return null;
  return data;
}

export async function getHamperBySlug(slug: string): Promise<GiftHamper | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("gift_hampers")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error) return null;
  return data;
}

export async function getFeaturedHampers(): Promise<GiftHamper[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("gift_hampers")
    .select("*")
    .eq("is_featured", true)
    .order("name");
  if (error) throw error;
  return data ?? [];
}

export async function createHamper(
  input: Omit<GiftHamper, "id" | "slug" | "created_at" | "updated_at"> & { slug?: string }
): Promise<GiftHamper> {
  const supabase = createAdminClient();
  const now = new Date().toISOString();
  const hamper: GiftHamper = {
    ...input,
    id: `hamper-${crypto.randomUUID()}`,
    slug: input.slug?.trim() ? slugify(input.slug) : slugify(input.name),
    created_at: now,
    updated_at: now,
  };
  const { data, error } = await supabase.from("gift_hampers").insert(hamper).select().single();
  if (error) throw error;
  return data;
}

export async function updateHamper(
  id: string,
  updates: Partial<Omit<GiftHamper, "id" | "created_at">>
): Promise<GiftHamper | null> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("gift_hampers")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();
  if (error) return null;
  return data;
}

export async function deleteHamper(id: string): Promise<void> {
  const supabase = createAdminClient();
  const { error } = await supabase.from("gift_hampers").delete().eq("id", id);
  if (error) throw error;
}

export async function toggleHamperAvailability(id: string): Promise<GiftHamper | null> {
  const supabase = createAdminClient();
  const { data: current } = await supabase
    .from("gift_hampers")
    .select("is_available")
    .eq("id", id)
    .single();
  if (!current) return null;
  return updateHamper(id, { is_available: !current.is_available });
}
