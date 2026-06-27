# Avanti Dry Fruits — V1 Demo

E-commerce demo site for Avanti Dry Fruits (Mulund West, Mumbai). Mobile-first, WhatsApp-driven
ordering, no payment gateway. Built with Next.js 14 (App Router), TypeScript, Tailwind CSS.

## Running locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`. Admin panel: `http://localhost:3000/admin` (password in `.env.local`).

## What this v1 is

- **Public site**: Home, About Us, Shop, Gifting, FAQs, Cart — reads from static seed data
  (`src/data/products.seed.ts`, `src/data/hampers.seed.ts`: 50 products, 7 hampers).
- **Ordering**: cart-based, checkout builds one itemised message and opens WhatsApp
  (`https://wa.me/<number>`). No payment gateway.
- **Admin panel**: password-gated (`ADMIN_PASSWORD` env var + cookie, not real auth). Full CRUD
  for products and hampers, backed by `localStorage` (no real database yet).

## Key v1 simplification: admin edits don't touch the public site

Public pages (`/`, `/shop`, `/gifting`) import the seed arrays **directly**. Admin pages read and
write through a `localStorage`-backed repository (`src/lib/data/products.ts`, `hampers.ts`). This
means anything you add/edit/delete in `/admin` is sandboxed to your browser and **will not appear**
on the live storefront — intentional, so the demo's admin can be explored freely without risk.
This is the first thing that changes once a real database (Supabase) is wired up.

## Known v1 limitations

- No real database — `localStorage` stands in for it. Clearing browser storage resets admin data
  back to the seed.
- No real authentication on `/admin` — single shared password, not per-user accounts.
- Product/hamper images: paste a URL or upload (stored as base64 in `localStorage`, ~5–10MB
  practical ceiling). No image hosting yet.
- No order history — WhatsApp chat is the only record of an order today.
- One global set of weight options (100g/250g/500g/1kg) for every product.

## Recommended next steps for a production version

- Move products/hampers to Supabase (table shapes already match the `Product`/`GiftHamper`
  TypeScript interfaces — see `src/lib/data/types.ts`).
- Replace the shared-password gate with Supabase Auth + RLS.
- Move images to Supabase Storage.
- Log submitted orders to a database table for the owner's records.
- Real product photography, Instagram handle, and a proper logo.
- SEO structured data + sitemap, privacy-friendly analytics.
- Optional: Razorpay/UPI checkout alongside WhatsApp.
