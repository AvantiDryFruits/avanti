"use server";

import { createAdminClient } from "@/lib/supabase/admin";

export async function uploadImage(
  formData: FormData,
  bucket: "product-images" | "hamper-images"
): Promise<{ url: string } | { error: string }> {
  const file = formData.get("file") as File;
  if (!file) return { error: "No file provided" };

  const supabase = createAdminClient();
  const path = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "-")}`;
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, { upsert: true });

  if (error) return { error: error.message };
  const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(data.path);
  return { url: urlData.publicUrl };
}
