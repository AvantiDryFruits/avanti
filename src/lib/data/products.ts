import { PRODUCTS_SEED } from "@/data/products.seed";
import { slugify } from "@/lib/utils";
import { readFromStorage, writeToStorage } from "./storage";
import type { Product, ProductCategory } from "./types";

const KEY = "products";

function loadAll(): Product[] {
  const raw = readFromStorage<(Product & { image_url?: string })[]>(KEY, PRODUCTS_SEED);
  return raw.map((p) => ({
    ...p,
    image_urls: p.image_urls ?? (p.image_url ? [p.image_url] : []),
    category: (p.category === ("premium" as string) ? "dry-fruits"
      : p.category === ("namkeen" as string) ? "farsan"
      : p.category) as Product["category"],
  }));
}

function saveAll(products: Product[]): void {
  writeToStorage(KEY, products);
}

export function getProducts(): Product[] {
  return loadAll();
}

export function getProductById(id: string): Product | undefined {
  return loadAll().find((p) => p.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return loadAll().find((p) => p.slug === slug);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return loadAll().filter((p) => p.category === category);
}

export function createProduct(
  input: Omit<Product, "id" | "slug" | "created_at" | "updated_at"> & { slug?: string }
): Product {
  const products = loadAll();
  const now = new Date().toISOString();
  const product: Product = {
    ...input,
    id: `prod-${crypto.randomUUID()}`,
    slug: input.slug?.trim() ? slugify(input.slug) : slugify(input.name),
    created_at: now,
    updated_at: now,
  };
  saveAll([...products, product]);
  return product;
}

export function updateProduct(
  id: string,
  updates: Partial<Omit<Product, "id" | "created_at">>
): Product | undefined {
  const products = loadAll();
  let updated: Product | undefined;
  const next = products.map((p) => {
    if (p.id !== id) return p;
    updated = { ...p, ...updates, updated_at: new Date().toISOString() };
    return updated;
  });
  if (updated) saveAll(next);
  return updated;
}

export function deleteProduct(id: string): void {
  saveAll(loadAll().filter((p) => p.id !== id));
}

export function toggleProductAvailability(id: string): Product | undefined {
  const product = getProductById(id);
  if (!product) return undefined;
  return updateProduct(id, { is_available: !product.is_available });
}
