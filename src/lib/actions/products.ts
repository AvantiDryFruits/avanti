'use server'

import type { Product } from '@/lib/data/types'
import * as db from '@/lib/supabase/products'

export async function getProductById(id: string): Promise<Product | null> {
  return db.getProductById(id)
}

export async function createProduct(
  input: Omit<Product, 'id' | 'slug' | 'created_at' | 'updated_at'> & { slug?: string }
): Promise<Product> {
  return db.createProduct(input)
}

export async function updateProduct(
  id: string,
  updates: Partial<Omit<Product, 'id' | 'created_at'>>
): Promise<Product | null> {
  return db.updateProduct(id, updates)
}

export async function deleteProduct(id: string): Promise<void> {
  return db.deleteProduct(id)
}

export async function toggleProductAvailability(id: string): Promise<Product | null> {
  return db.toggleProductAvailability(id)
}
