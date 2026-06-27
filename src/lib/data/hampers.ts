import { HAMPERS_SEED } from "@/data/hampers.seed";
import { slugify } from "@/lib/utils";
import { readFromStorage, writeToStorage } from "./storage";
import type { GiftHamper } from "./types";

const KEY = "hampers";

function loadAll(): GiftHamper[] {
  return readFromStorage<GiftHamper[]>(KEY, HAMPERS_SEED);
}

function saveAll(hampers: GiftHamper[]): void {
  writeToStorage(KEY, hampers);
}

export function getHampers(): GiftHamper[] {
  return loadAll();
}

export function getHamperById(id: string): GiftHamper | undefined {
  return loadAll().find((h) => h.id === id);
}

export function getHamperBySlug(slug: string): GiftHamper | undefined {
  return loadAll().find((h) => h.slug === slug);
}

export function createHamper(
  input: Omit<GiftHamper, "id" | "slug" | "created_at" | "updated_at"> & { slug?: string }
): GiftHamper {
  const hampers = loadAll();
  const now = new Date().toISOString();
  const hamper: GiftHamper = {
    ...input,
    id: `hamper-${crypto.randomUUID()}`,
    slug: input.slug?.trim() ? slugify(input.slug) : slugify(input.name),
    created_at: now,
    updated_at: now,
  };
  saveAll([...hampers, hamper]);
  return hamper;
}

export function updateHamper(
  id: string,
  updates: Partial<Omit<GiftHamper, "id" | "created_at">>
): GiftHamper | undefined {
  const hampers = loadAll();
  let updated: GiftHamper | undefined;
  const next = hampers.map((h) => {
    if (h.id !== id) return h;
    updated = { ...h, ...updates, updated_at: new Date().toISOString() };
    return updated;
  });
  if (updated) saveAll(next);
  return updated;
}

export function deleteHamper(id: string): void {
  saveAll(loadAll().filter((h) => h.id !== id));
}

export function toggleHamperAvailability(id: string): GiftHamper | undefined {
  const hamper = getHamperById(id);
  if (!hamper) return undefined;
  return updateHamper(id, { is_available: !hamper.is_available });
}
