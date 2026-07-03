/**
 * One-time migration: seeds Supabase with local product + hamper data.
 * Run: npx tsx scripts/seed-supabase.ts
 */
import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { PRODUCTS_SEED } from "../src/data/products.seed";
import { HAMPERS_SEED } from "../src/data/hampers.seed";

config({ path: ".env.local" });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(url, key);

async function seed() {
  console.log(`Seeding ${PRODUCTS_SEED.length} products…`);
  const { error: pe } = await supabase
    .from("products")
    .upsert(PRODUCTS_SEED, { onConflict: "id" });
  if (pe) { console.error("Products error:", pe.message); process.exit(1); }

  console.log(`Seeding ${HAMPERS_SEED.length} hampers…`);
  const { error: he } = await supabase
    .from("gift_hampers")
    .upsert(HAMPERS_SEED, { onConflict: "id" });
  if (he) { console.error("Hampers error:", he.message); process.exit(1); }

  console.log("Done.");
}

seed();
