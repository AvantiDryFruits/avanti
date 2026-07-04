'use server'

import type { GiftHamper } from '@/lib/data/types'
import * as db from '@/lib/supabase/hampers'

export async function getHamperById(id: string): Promise<GiftHamper | null> {
  return db.getHamperById(id)
}

export async function createHamper(
  input: Omit<GiftHamper, 'id' | 'slug' | 'created_at' | 'updated_at'> & { slug?: string }
): Promise<GiftHamper> {
  return db.createHamper(input)
}

export async function updateHamper(
  id: string,
  updates: Partial<Omit<GiftHamper, 'id' | 'created_at'>>
): Promise<GiftHamper | null> {
  return db.updateHamper(id, updates)
}

export async function deleteHamper(id: string): Promise<void> {
  return db.deleteHamper(id)
}

export async function toggleHamperAvailability(id: string): Promise<GiftHamper | null> {
  return db.toggleHamperAvailability(id)
}
