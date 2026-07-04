import type { Product, ProductCategory } from "@/lib/data/types";
import { slugify } from "@/lib/utils";

const BASE_TIME = new Date("2026-05-01T09:00:00.000Z").getTime();
const ONE_DAY = 24 * 60 * 60 * 1000;

interface SeedRow {
  name: string;
  category: ProductCategory;
  pricePerGram: number;
  description: string;
  featured?: boolean;
}

const ROWS: SeedRow[] = [
  // Dry Fruits (10)
  { name: "Almonds", category: "dry-fruits", pricePerGram: 1.2, description: "Handpicked premium almonds, rich and crunchy.", featured: true },
  { name: "Cashews", category: "dry-fruits", pricePerGram: 1.4, description: "Whole jumbo cashews, creamy and lightly sweet.", featured: true },
  { name: "Walnuts", category: "dry-fruits", pricePerGram: 1.6, description: "Fresh shelled walnut kernels, rich in omega-3." },
  { name: "Raisins", category: "dry-fruits", pricePerGram: 0.65, description: "Naturally sweet seedless raisins." },
  { name: "Dates", category: "dry-fruits", pricePerGram: 0.7, description: "Soft, naturally sweet dates." },
  { name: "Figs", category: "dry-fruits", pricePerGram: 1.8, description: "Sun-dried figs (anjeer), soft and chewy." },
  { name: "Apricots", category: "dry-fruits", pricePerGram: 1.5, description: "Dried apricots, tangy-sweet and soft." },
  { name: "Black Currants", category: "dry-fruits", pricePerGram: 1.1, description: "Dried black currants, tart and antioxidant-rich." },
  { name: "Pine Nuts", category: "dry-fruits", pricePerGram: 2.0, description: "Chilgoza pine nuts, buttery and rare." },
  { name: "Mulberries", category: "dry-fruits", pricePerGram: 1.3, description: "Dried mulberries, naturally sweet and chewy." },

  // Dry Fruits & Premium (9)
  { name: "Iranian Pistachios", category: "dry-fruits", pricePerGram: 3.5, description: "Premium Iranian pistachios, roasted and salted.", featured: true },
  { name: "Mamra Almonds", category: "dry-fruits", pricePerGram: 5.5, description: "Rare Mamra almonds, prized for taste and nutrition." },
  { name: "Kashmiri Saffron", category: "dry-fruits", pricePerGram: 6.0, description: "Pure Kashmiri Mongra saffron threads." },
  { name: "Royal Mixed Nuts", category: "dry-fruits", pricePerGram: 3.2, description: "Curated mix of premium nuts for gifting." },
  { name: "Persian Walnuts", category: "dry-fruits", pricePerGram: 4.0, description: "Light-shelled Persian walnut halves." },
  { name: "Honey Roasted Almonds", category: "dry-fruits", pricePerGram: 2.8, description: "Almonds roasted in a delicate honey glaze." },
  { name: "Chocolate Coated Almonds", category: "dry-fruits", pricePerGram: 3.0, description: "Roasted almonds coated in rich chocolate." },
  { name: "Jumbo Cashews Premium", category: "dry-fruits", pricePerGram: 2.6, description: "Extra-large grade jumbo cashews." },
  { name: "Premium Dried Berries Mix", category: "dry-fruits", pricePerGram: 4.5, description: "Mixed dried berries: cranberry, blueberry, golden berry." },

  // Sweets (8)
  { name: "Kaju Katli", category: "sweets", pricePerGram: 0.95, description: "Classic cashew fudge with a silver-leaf finish.", featured: true },
  { name: "Motichoor Ladoo", category: "sweets", pricePerGram: 0.55, description: "Soft gram-flour pearl ladoos." },
  { name: "Soan Papdi", category: "sweets", pricePerGram: 0.5, description: "Flaky, melt-in-mouth soan papdi." },
  { name: "Anjeer Roll", category: "sweets", pricePerGram: 0.9, description: "Fig and nut rolls, no added sugar." },
  { name: "Mysore Pak", category: "sweets", pricePerGram: 0.65, description: "Rich ghee-based gram flour sweet." },
  { name: "Besan Ladoo", category: "sweets", pricePerGram: 0.6, description: "Traditional roasted gram-flour ladoo." },
  { name: "Dry Fruit Barfi", category: "sweets", pricePerGram: 0.85, description: "Barfi loaded with chopped dry fruits." },
  { name: "Coconut Barfi", category: "sweets", pricePerGram: 0.7, description: "Fresh coconut barfi, mildly sweet." },

  // Farsan (8)
  { name: "Khakhra", category: "farsan", pricePerGram: 0.3, description: "Thin, crisp wheat khakhra." },
  { name: "Chorafali", category: "farsan", pricePerGram: 0.45, description: "Crispy gram-flour chorafali strips." },
  { name: "Gathiya", category: "farsan", pricePerGram: 0.35, description: "Classic Gujarati gathiya, lightly spiced." },
  { name: "Methi Puri", category: "farsan", pricePerGram: 0.4, description: "Crisp fenugreek-flavoured puri." },
  { name: "Sev", category: "farsan", pricePerGram: 0.28, description: "Fine gram-flour sev, lightly salted." },
  { name: "Chakri", category: "farsan", pricePerGram: 0.32, description: "Spiral-shaped spiced rice flour chakri." },
  { name: "Bhakarwadi", category: "farsan", pricePerGram: 0.5, description: "Sweet-spicy rolled bhakarwadi.", featured: true },
  { name: "Papdi", category: "farsan", pricePerGram: 0.3, description: "Crisp, lightly salted papdi." },

  // Farsan & Namkeen (8)
  { name: "Bombay Mixture", category: "farsan", pricePerGram: 0.25, description: "Classic spiced Bombay mixture." },
  { name: "Bikaneri Mixture", category: "farsan", pricePerGram: 0.28, description: "Rajasthani-style spiced mixture." },
  { name: "Aloo Bhujia", category: "farsan", pricePerGram: 0.3, description: "Crispy spiced potato bhujia." },
  { name: "Spicy Peanuts", category: "farsan", pricePerGram: 0.22, description: "Roasted peanuts in an extra spicy masala coat." },
  { name: "Ratlami Sev", category: "farsan", pricePerGram: 0.35, description: "Bold, spicy Ratlami-style sev.", featured: true },
  { name: "Navratan Mixture", category: "farsan", pricePerGram: 0.4, description: "Nine-ingredient festive mixture." },
  { name: "Corn Flakes Chivda", category: "farsan", pricePerGram: 0.24, description: "Light, crunchy corn flakes chivda." },
  { name: "Masala Peanuts", category: "farsan", pricePerGram: 0.26, description: "Crunchy peanuts in a spiced gram-flour coat." },

  // Masala (7)
  { name: "Garam Masala", category: "masala", pricePerGram: 1.2, description: "House-blend garam masala, freshly ground.", featured: true },
  { name: "Chai Masala", category: "masala", pricePerGram: 0.8, description: "Aromatic spice blend for tea." },
  { name: "Pav Bhaji Masala", category: "masala", pricePerGram: 0.9, description: "Authentic Mumbai-style pav bhaji masala." },
  { name: "Chaat Masala", category: "masala", pricePerGram: 0.7, description: "Tangy chaat masala for snacks and fruit." },
  { name: "Kitchen King Masala", category: "masala", pricePerGram: 1.0, description: "All-purpose kitchen king masala blend." },
  { name: "Sambhar Masala", category: "masala", pricePerGram: 0.85, description: "South Indian style sambhar masala." },
  { name: "Biryani Masala", category: "masala", pricePerGram: 1.5, description: "Rich, aromatic biryani masala blend." },
];

function pad(n: number): string {
  return String(n).padStart(3, "0");
}

export const PRODUCTS_SEED: Product[] = ROWS.map((row, i) => {
  const created_at = new Date(BASE_TIME + i * ONE_DAY).toISOString();
  return {
    id: `prod-${pad(i + 1)}`,
    name: row.name,
    slug: slugify(row.name),
    description: row.description,
    category: row.category,
    price_per_gram: row.pricePerGram,
    image_urls: [],
    is_available: true,
    is_featured: row.featured ?? false,
    created_at,
    updated_at: created_at,
  };
});
