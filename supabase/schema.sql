-- Avanti Dry Fruits — Supabase Schema
-- Run this in the Supabase SQL editor to set up the database.

-- Products table
CREATE TABLE products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('dry-fruits','premium','sweets','farsan','namkeen','masala')),
  price_per_gram NUMERIC NOT NULL,
  image_url TEXT,
  is_available BOOLEAN NOT NULL DEFAULT true,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Gift hampers table
CREATE TABLE gift_hampers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL,
  contents TEXT[] NOT NULL DEFAULT '{}',
  image_url TEXT,
  is_available BOOLEAN NOT NULL DEFAULT true,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Auto-update updated_at on row change
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER gift_hampers_updated_at
  BEFORE UPDATE ON gift_hampers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Row-Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE gift_hampers ENABLE ROW LEVEL SECURITY;

-- Public: read available rows only (shop/gifting pages)
CREATE POLICY "public_read_products"
  ON products FOR SELECT
  USING (is_available = true);

CREATE POLICY "public_read_gift_hampers"
  ON gift_hampers FOR SELECT
  USING (is_available = true);

-- Authenticated (admin): full CRUD
CREATE POLICY "admin_all_products"
  ON products FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "admin_all_gift_hampers"
  ON gift_hampers FOR ALL
  USING (auth.role() = 'authenticated');

-- Storage buckets (run these via the Supabase dashboard or CLI)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('hamper-images', 'hamper-images', true);
