export interface Product {
  slug: string;
  name: string;
  shortName: string;
  category: string;
  heroCategory: "Fat Loss" | "Recovery" | "Longevity" | "Vitality";
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

export const shopCategories = ["All", "Fat Loss", "Recovery", "Longevity", "Vitality"] as const;

export type ShopCategory = (typeof shopCategories)[number];

export type HeroCategory = Product["heroCategory"];

export type CategoryTheme = {
  accent: string;
  accentDeep: string;
  soft: string;
  softAlt: string;
  heroTone: string;
  tagClass: string;
};

const heroCategoryThemes: Record<HeroCategory, CategoryTheme> = {
  "Fat Loss": {
    accent: "#2e6c49",
    accentDeep: "#214d37",
    soft: "#cfe8d7",
    softAlt: "#e8f3ec",
    heroTone: "#e7f3ea",
    tagClass: "bg-[#cfe8d7] text-[#2e6c49]",
  },
  Recovery: {
    accent: "#2f6b78",
    accentDeep: "#204f5a",
    soft: "#dceff3",
    softAlt: "#e9f6f8",
    heroTone: "#e4f3f5",
    tagClass: "bg-[#dceff3] text-[#2f6b78]",
  },
  Longevity: {
    accent: "#86572a",
    accentDeep: "#69431f",
    soft: "#f3e4d3",
    softAlt: "#f8efe6",
    heroTone: "#f7eee2",
    tagClass: "bg-[#f3e4d3] text-[#86572a]",
  },
  Vitality: {
    accent: "#5a46a3",
    accentDeep: "#433184",
    soft: "#e6e0fb",
    softAlt: "#f1edfd",
    heroTone: "#eee7fb",
    tagClass: "bg-[#e6e0fb] text-[#5a46a3]",
  },
};

const allCategoryTheme: CategoryTheme = {
  accent: "#3b6ed6",
  accentDeep: "#173f85",
  soft: "#dbeafe",
  softAlt: "#eef4fc",
  heroTone: "#e9f0fc",
  tagClass: "bg-[#dbeafe] text-[#3b6ed6]",
};

export const products: Product[] = [
  {
    slug: "retatrutide",
    name: "Retatrutide Research Kit",
    shortName: "Retatrutide",
    category: "Metabolic",
    heroCategory: "Fat Loss",
    price: 189.99,
    originalPrice: 239.99,
    description:
      "10mg Retatrutide + bacteriostatic water + insulin syringes + alcohol swabs. Triple-agonist research kit.",
    longDescription:
      "Retatrutide is a multi-receptor metabolic research peptide studied for its activity across incretin-related pathways. This complete kit includes 10mg lyophilized compound, bacteriostatic water, syringes, and swabs for laboratory handling and reconstitution workflows.",
    badge: "Popular",
    badgeColor: "bg-[#4A90D9]",
    image: "/images/vials/retatrutide.webp",
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
    shortName: "Tesamorelin",
    category: "Metabolic",
    heroCategory: "Fat Loss",
    price: 149.99,
    originalPrice: 189.99,
    description:
      "10mg Tesamorelin + bacteriostatic water + insulin syringes + alcohol swabs. Growth-hormone pathway research kit.",
    longDescription:
      "Tesamorelin is a GHRH analog widely discussed in metabolic and body composition research. This ready-to-study kit includes 10mg lyophilized peptide, bacteriostatic water, syringes, and swabs for clean lab preparation.",
    badge: "Best Seller",
    badgeColor: "bg-emerald-600",
    image: "/images/vials/tesamorelin.webp",
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
    shortName: "Melanotan II",
    category: "Research",
    heroCategory: "Vitality",
    price: 79.99,
    originalPrice: 99.99,
    description:
      "10mg Melanotan II + bacteriostatic water + insulin syringes + alcohol swabs. Melanocortin research kit.",
    longDescription:
      "Melanotan II is a melanocortin research peptide studied in pigmentation and receptor-signaling contexts. This complete kit includes 10mg lyophilized compound and the reconstitution essentials needed for research workflows.",
    badge: "New",
    badgeColor: "bg-violet-600",
    image: "/images/vials/melanotan-ii.webp",
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
    shortName: "Glow 70",
    category: "Beauty",
    heroCategory: "Longevity",
    price: 119.99,
    originalPrice: 149.99,
    description:
      "70mg Glow 70 blend + bacteriostatic water + syringes + alcohol swabs. Beauty-focused research kit.",
    longDescription:
      "Glow 70 is a beauty-focused research blend designed for customers interested in cosmetic peptide categories. This kit includes a 70mg lyophilized vial plus the reconstitution supplies needed for consistent lab prep.",
    badge: "Trending",
    badgeColor: "bg-rose-600",
    image: "/images/vials/glow-70.webp",
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
    shortName: "Glutathione",
    category: "Beauty",
    heroCategory: "Recovery",
    price: 69.99,
    originalPrice: 89.99,
    description:
      "600mg Glutathione + bacteriostatic water + syringes + alcohol swabs. Antioxidant research kit.",
    longDescription:
      "Glutathione is a widely known antioxidant compound that appears in recovery and cosmetic-adjacent research conversations. This kit includes a 600mg vial with core reconstitution supplies for convenient lab setup.",
    image: "/images/vials/glutathione.webp",
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

const categoryParamMap: Record<string, ShopCategory> = {
  all: "All",
  metabolic: "Fat Loss",
  research: "Vitality",
  beauty: "Longevity",
  bundles: "All",
  "fat-loss": "Fat Loss",
  fatloss: "Fat Loss",
  "weight-loss": "Fat Loss",
  recovery: "Recovery",
  longevity: "Longevity",
  vitality: "Vitality",
  "beauty-skin": "Longevity",
};

const heroCategoryHrefMap: Record<HeroCategory, string> = {
  "Fat Loss": "fat-loss",
  Recovery: "recovery",
  Longevity: "longevity",
  Vitality: "vitality",
};

export function normalizeCategoryParam(category: string | null): ShopCategory | undefined {
  if (!category) return undefined;

  return categoryParamMap[category.trim().toLowerCase()];
}

/** Get a product by its slug */
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

/** Get products by public-facing shop category */
export function getProductsByCategory(category: ShopCategory): Product[] {
  if (category === "All") return products;
  return products.filter((p) => p.heroCategory === category);
}

export function getHeroCategoryTheme(category: HeroCategory | ShopCategory): CategoryTheme {
  if (category === "All") return allCategoryTheme;
  return heroCategoryThemes[category];
}

export function getHeroCategoryTagClasses(category: HeroCategory): string {
  return getHeroCategoryTheme(category).tagClass;
}

export function getHeroCategoryHrefParam(category: HeroCategory): string {
  return heroCategoryHrefMap[category];
}
