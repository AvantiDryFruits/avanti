import type { GiftHamper } from "@/lib/data/types";
import { slugify } from "@/lib/utils";

const BASE_TIME = new Date("2026-05-08T09:00:00.000Z").getTime();
const ONE_DAY = 24 * 60 * 60 * 1000;

interface SeedRow {
  name: string;
  price: number;
  description: string;
  contents: string[];
  featured?: boolean;
  available?: boolean;
}

const ROWS: SeedRow[] = [
  {
    name: "Festive Delight",
    price: 1499,
    description: "A balanced gifting box of nuts, dates and a signature sweet.",
    contents: ["250g Almonds", "250g Cashews", "200g Kaju Katli", "150g Dates"],
    featured: true,
  },
  {
    name: "Premium Nuts Trio",
    price: 1999,
    description: "Three of our finest premium nuts, boxed together.",
    contents: ["250g Iranian Pistachios", "250g Mamra Almonds", "250g Persian Walnuts"],
    featured: true,
  },
  {
    name: "Sweet & Savory Combo",
    price: 999,
    description: "A crowd-pleasing mix of sweet and savory favourites.",
    contents: ["200g Kaju Katli", "200g Bhakarwadi", "200g Bombay Mixture"],
  },
  {
    name: "Diwali Special Box",
    price: 2499,
    description: "Our most generous festive box, built for Diwali gifting season.",
    contents: ["300g Kaju Katli", "300g Soan Papdi", "250g Almonds", "250g Cashews", "200g Dry Fruit Barfi"],
    available: false,
  },
  {
    name: "Corporate Gift Box",
    price: 1799,
    description: "Clean, professional presentation — built for corporate gifting.",
    contents: ["300g Premium Mixed Nuts", "250g Dates", "200g Chocolate Coated Almonds"],
  },
  {
    name: "Mini Treats Hamper",
    price: 699,
    description: "A small-format hamper, perfect for a light gift.",
    contents: ["100g Cashews", "100g Almonds", "100g Raisins", "100g Kaju Katli"],
  },
  {
    name: "Family Pack Hamper",
    price: 3499,
    description: "Our largest hamper — a generous spread for the whole family.",
    contents: ["500g Almonds", "500g Cashews", "500g Walnuts", "500g Dates", "300g Kaju Katli"],
    featured: true,
  },
];

function pad(n: number): string {
  return String(n).padStart(3, "0");
}

export const HAMPERS_SEED: GiftHamper[] = ROWS.map((row, i) => {
  const created_at = new Date(BASE_TIME + i * ONE_DAY).toISOString();
  return {
    id: `hamper-${pad(i + 1)}`,
    name: row.name,
    slug: slugify(row.name),
    description: row.description,
    price: row.price,
    contents: row.contents,
    image_urls: [],
    is_available: row.available ?? true,
    is_featured: row.featured ?? false,
    created_at,
    updated_at: created_at,
  };
});
