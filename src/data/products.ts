export interface Product {
  slug: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  description: string;
  longDescription: string;
  badge?: string;
  badgeColor?: string;
  image: string;
  specifications: {
    purity: string;
    quantity: string;
    form: string;
    storage: string;
  };
  kitIncludes: string[];
  relatedProductSlugs: string[];
}

const heroCategoryLabels: Record<string, string> = {
  Metabolic: "Fat Loss",
  Longevity: "Recovery",
  Beauty: "Longevity",
  Research: "Vitality",
};

export const products: Product[] = [
  {
    slug: "retatrutide",
    name: "Retatrutide Research Kit",
    category: "Metabolic",
    price: 189.99,
    originalPrice: 239.99,
    description:
      "10mg Retatrutide + bacteriostatic water + insulin syringes + alcohol swabs. Triple-agonist research kit.",
    longDescription:
      "Retatrutide is a multi-receptor metabolic research peptide studied for its activity across incretin-related pathways. This complete kit includes 10mg lyophilized compound, bacteriostatic water, syringes, and swabs for laboratory handling and reconstitution workflows.",
    badge: "Popular",
    badgeColor: "bg-[#4A90D9]",
    image: "/images/vials/retatrutide.png",
    specifications: {
      purity: "99%+",
      quantity: "10mg per vial",
      form: "Lyophilized powder",
      storage: "Refrigerate after reconstitution (2-8°C)",
    },
    kitIncludes: [
      "1× Retatrutide (10mg lyophilized)",
      "1× Bacteriostatic water (30mL)",
      "10× Insulin syringes (1mL)",
      "10× Sterile alcohol swabs",
      "Reconstitution guide",
    ],
    relatedProductSlugs: ["tesamorelin", "glutathione", "glow-70"],
  },
  {
    slug: "tesamorelin",
    name: "Tesamorelin Research Kit",
    category: "Metabolic",
    price: 149.99,
    originalPrice: 189.99,
    description:
      "10mg Tesamorelin + bacteriostatic water + insulin syringes + alcohol swabs. Growth-hormone pathway research kit.",
    longDescription:
      "Tesamorelin is a GHRH analog widely discussed in metabolic and body composition research. This ready-to-study kit includes 10mg lyophilized peptide, bacteriostatic water, syringes, and swabs for clean lab preparation.",
    badge: "Best Seller",
    badgeColor: "bg-emerald-600",
    image: "/images/vials/tesamorelin.png",
    specifications: {
      purity: "99%+",
      quantity: "10mg per vial",
      form: "Lyophilized powder",
      storage: "Refrigerate after reconstitution (2-8°C)",
    },
    kitIncludes: [
      "1× Tesamorelin (10mg lyophilized)",
      "1× Bacteriostatic water (30mL)",
      "10× Insulin syringes (1mL)",
      "10× Sterile alcohol swabs",
      "Reconstitution guide",
    ],
    relatedProductSlugs: ["retatrutide", "melanotan-ii", "glow-70"],
  },
  {
    slug: "melanotan-ii",
    name: "Melanotan II Research Kit",
    category: "Research",
    price: 79.99,
    originalPrice: 99.99,
    description:
      "10mg Melanotan II + bacteriostatic water + insulin syringes + alcohol swabs. Melanocortin research kit.",
    longDescription:
      "Melanotan II is a melanocortin research peptide studied in pigmentation and receptor-signaling contexts. This complete kit includes 10mg lyophilized compound and the reconstitution essentials needed for research workflows.",
    badge: "New",
    badgeColor: "bg-violet-600",
    image: "/images/vials/melanotan-ii.png",
    specifications: {
      purity: "99%+",
      quantity: "10mg per vial",
      form: "Lyophilized powder",
      storage: "Refrigerate after reconstitution (2-8°C)",
    },
    kitIncludes: [
      "1× Melanotan II (10mg lyophilized)",
      "1× Bacteriostatic water (30mL)",
      "10× Insulin syringes (1mL)",
      "10× Sterile alcohol swabs",
      "Reconstitution guide",
    ],
    relatedProductSlugs: ["tesamorelin", "glow-70", "glutathione"],
  },
  {
    slug: "glow-70",
    name: "Glow 70 Research Kit",
    category: "Beauty",
    price: 119.99,
    originalPrice: 149.99,
    description:
      "70mg Glow 70 blend + bacteriostatic water + syringes + alcohol swabs. Beauty-focused research kit.",
    longDescription:
      "Glow 70 is a beauty-focused research blend designed for customers interested in cosmetic peptide categories. This kit includes a 70mg lyophilized vial plus the reconstitution supplies needed for consistent lab prep.",
    badge: "Trending",
    badgeColor: "bg-rose-600",
    image: "/images/vials/glow-70.png",
    specifications: {
      purity: "99%+",
      quantity: "70mg per vial",
      form: "Lyophilized powder",
      storage: "Refrigerate after reconstitution (2-8°C)",
    },
    kitIncludes: [
      "1× Glow 70 (70mg lyophilized)",
      "1× Bacteriostatic water (30mL)",
      "10× Insulin syringes (1mL)",
      "10× Sterile alcohol swabs",
      "Reconstitution guide",
    ],
    relatedProductSlugs: ["glutathione", "melanotan-ii", "retatrutide"],
  },
  {
    slug: "glutathione",
    name: "Glutathione Research Kit",
    category: "Beauty",
    price: 69.99,
    originalPrice: 89.99,
    description:
      "600mg Glutathione + bacteriostatic water + syringes + alcohol swabs. Antioxidant research kit.",
    longDescription:
      "Glutathione is a widely known antioxidant compound that appears in recovery and cosmetic-adjacent research conversations. This kit includes a 600mg vial with core reconstitution supplies for convenient lab setup.",
    image: "/images/vials/glutathione.png",
    specifications: {
      purity: "99%+",
      quantity: "600mg per vial",
      form: "Lyophilized powder",
      storage: "Refrigerate after reconstitution (2-8°C)",
    },
    kitIncludes: [
      "1× Glutathione (600mg lyophilized)",
      "1× Bacteriostatic water (30mL)",
      "10× Insulin syringes (1mL)",
      "10× Sterile alcohol swabs",
      "Reconstitution guide",
    ],
    relatedProductSlugs: ["glow-70", "retatrutide", "melanotan-ii"],
  },
];

/** Products with badges — used on the homepage featured section */
export const featuredProducts = products.filter((p) => p.badge);

/** All unique categories */
export const categories = ["All", "Metabolic", "Research", "Beauty", "Bundles"] as const;

export type Category = (typeof categories)[number];

export function getHeroCategoryLabel(category: string): string {
  return heroCategoryLabels[category] ?? category;
}

/** Get a product by its slug */
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

/** Get products by category */
export function getProductsByCategory(category: Category): Product[] {
  if (category === "All") return products;
  if (category === "Bundles") return products.filter((p) => p.name.toLowerCase().includes("stack") || p.name.toLowerCase().includes("bundle"));
  return products.filter((p) => p.category === category);
}
