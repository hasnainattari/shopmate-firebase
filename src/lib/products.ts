export type Product = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  image: string;
  category: string;
};

export const products: Product[] = [
  {
    id: "linen-shirt",
    name: "Sand Linen Shirt",
    tagline: "Breathable, slow-spun European linen",
    description:
      "Cut from heavyweight European linen and finished by hand. A relaxed silhouette that softens with every wash, designed to live in season after season.",
    price: 148,
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1200&q=80",
    category: "Apparel",
  },
  {
    id: "ceramic-vase",
    name: "Hand-thrown Vase",
    tagline: "Wheel-thrown stoneware, matte glaze",
    description:
      "Each vase is wheel-thrown in a small Lisbon studio and finished in a soft chalk glaze. No two are identical — small variations are the signature.",
    price: 96,
    image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=1200&q=80",
    category: "Home",
  },
  {
    id: "leather-tote",
    name: "Everyday Leather Tote",
    tagline: "Vegetable-tanned, unlined Italian leather",
    description:
      "An unlined tote in vegetable-tanned leather that develops a personal patina over time. Roomy enough for a laptop, a notebook, and the day ahead.",
    price: 320,
    image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=1200&q=80",
    category: "Accessories",
  },
  {
    id: "wool-throw",
    name: "Highland Wool Throw",
    tagline: "Woven on antique looms in the Scottish borders",
    description:
      "A generously sized throw woven from undyed Highland wool. Substantial, warm, and built to be passed down.",
    price: 184,
    image: "https://images.unsplash.com/photo-1616627781229-bb1c726a4385?auto=format&fit=crop&w=1200&q=80",
    category: "Home",
  },
  {
    id: "olive-soap",
    name: "Cold-pressed Olive Soap",
    tagline: "Three-month cured, single estate olive oil",
    description:
      "A gentle, long-curing bar made from a single Andalusian olive harvest. Unscented, biodegradable, kind to skin.",
    price: 18,
    image: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=1200&q=80",
    category: "Apothecary",
  },
  {
    id: "brass-lamp",
    name: "Solid Brass Table Lamp",
    tagline: "Spun and polished by hand",
    description:
      "A weighty, hand-spun brass lamp with a warm linen shade. Designed to age gracefully and live on any surface that needs a quieter light.",
    price: 268,
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&q=80",
    category: "Home",
  },
];

export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}
