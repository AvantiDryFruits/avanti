-- Add "Hot & Fresh" and "Frozen" product categories.
-- Run this in the Supabase SQL editor (or via the CLI) against the live DB.
-- The category column is guarded by a CHECK constraint, so new category
-- values must be whitelisted here before the admin can create such products.

ALTER TABLE products DROP CONSTRAINT IF EXISTS products_category_check;

ALTER TABLE products
  ADD CONSTRAINT products_category_check
  CHECK (category IN (
    'dry-fruits','premium','sweets','farsan','namkeen','masala','hot-fresh','frozen'
  ));
