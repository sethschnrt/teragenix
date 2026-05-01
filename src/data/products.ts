export interface Product {
  slug: string;
  name: string;
  shortName: string;
  category: string;
  heroCategory: "Metabolic" | "Antioxidant" | "Cosmetic" | "Melanocortin";
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
  documentation: {
    sku: string;
    batchCode: string;
    coaStatus: string;
    hplcStatus: string;
    msStatus: string;
    releaseWindow: string;
  };
  kitIncludes: string[];
  relatedProductSlugs: string[];
}

export const shopCategories = ["All", "Metabolic", "Antioxidant", "Cosmetic", "Melanocortin"] as const;

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
  Metabolic: {
    accent: "#2e6c49",
    accentDeep: "#214d37",
    soft: "#cfe8d7",
    softAlt: "#e8f3ec",
    heroTone: "#e7f3ea",
    tagClass: "bg-[#cfe8d7] text-[#2e6c49]",
  },
  Antioxidant: {
    accent: "#2f6b78",
    accentDeep: "#204f5a",
    soft: "#dceff3",
    softAlt: "#e9f6f8",
    heroTone: "#e4f3f5",
    tagClass: "bg-[#dceff3] text-[#2f6b78]",
  },
  Cosmetic: {
    accent: "#86572a",
    accentDeep: "#69431f",
    soft: "#f3e4d3",
    softAlt: "#f8efe6",
    heroTone: "#f7eee2",
    tagClass: "bg-[#f3e4d3] text-[#86572a]",
  },
  Melanocortin: {
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
    name: "Retatrutide",
    shortName: "Retatrutide",
    category: "Metabolic",
    heroCategory: "Metabolic",
    price: 129,
    originalPrice: 149,
    description:
      "Metabolic research for appetite signaling, glucose pathways, and body composition.",
    longDescription:
      "Retatrutide is presented for metabolic and body-composition research, with visible specs, storage guidance, and documentation context kept easy to review.",
    badge: "Popular",
    badgeColor: "bg-[#4A90D9]",
    image: "/images/vials/approved/retatrutide.png",
    specifications: {
      purity: "99%+",
      quantity: "10mg per vial",
      form: "Lyophilized powder",
      storage: "Store sealed and frozen. Refrigerate after reconstitution (2-8°C)",
    },
    documentation: {
      sku: "TGX-RETA-10",
      batchCode: "RTA-ORDER-01",
      coaStatus: "COA publishing with first production intake",
      hplcStatus: "HPLC summary publishing with first production intake",
      msStatus: "MS summary publishing with first production intake",
      releaseWindow: "Current ordered batch",
    },
    kitIncludes: [
      "1× Retatrutide vial (10mg lyophilized)"
    ],
    relatedProductSlugs: ["tesamorelin", "bpc-157", "glutathione"],
  },
  {
    slug: "tesamorelin",
    name: "Tesamorelin",
    shortName: "Tesamorelin",
    category: "Melanocortin",
    heroCategory: "Melanocortin",
    price: 89,
    originalPrice: 109,
    description:
      "GH-axis research for body composition, recovery markers, and lean-mass models.",
    longDescription:
      "Tesamorelin is presented for longevity and body-composition research, with visible specs, storage guidance, and documentation context kept easy to review.",
    badge: "Best Seller",
    badgeColor: "bg-emerald-600",
    image: "/images/vials/approved/tesamorelin.png",
    specifications: {
      purity: "99%+",
      quantity: "10mg per vial",
      form: "Lyophilized powder",
      storage: "Store sealed and frozen. Refrigerate after reconstitution (2-8°C)",
    },
    documentation: {
      sku: "TGX-TESA-10",
      batchCode: "TES-ORDER-01",
      coaStatus: "COA publishing with first production intake",
      hplcStatus: "HPLC summary publishing with first production intake",
      msStatus: "MS summary publishing with first production intake",
      releaseWindow: "Current ordered batch",
    },
    kitIncludes: [
      "1× Tesamorelin vial (10mg lyophilized)"
    ],
    relatedProductSlugs: ["retatrutide", "semax", "selank"],
  },
  {
    slug: "bpc-157",
    name: "BPC-157",
    shortName: "BPC-157",
    category: "Antioxidant",
    heroCategory: "Antioxidant",
    price: 65,
    originalPrice: 79,
    description:
      "Recovery research for soft-tissue models, inflammation response, and gut integrity.",
    longDescription:
      "BPC-157 is presented for recovery-focused research, with visible specs, storage guidance, and documentation context kept easy to review.",
    badge: "New",
    badgeColor: "bg-teal-600",
    image: "/images/vials/approved/bpc-157.png",
    specifications: {
      purity: "99%+",
      quantity: "10mg per vial",
      form: "Lyophilized powder",
      storage: "Store sealed and frozen. Refrigerate after reconstitution (2-8°C)",
    },
    documentation: {
      sku: "TGX-BPC-10",
      batchCode: "BPC-ORDER-01",
      coaStatus: "COA publishing with first production intake",
      hplcStatus: "HPLC summary publishing with first production intake",
      msStatus: "MS summary publishing with first production intake",
      releaseWindow: "Current ordered batch",
    },
    kitIncludes: [
      "1× BPC-157 vial (10mg lyophilized)"
    ],
    relatedProductSlugs: ["glutathione", "nad-plus", "cjc-ipamorelin"],
  },
  {
    slug: "cjc-ipamorelin",
    name: "CJC / Ipamorelin",
    shortName: "CJC / Ipamorelin",
    category: "Melanocortin",
    heroCategory: "Melanocortin",
    price: 109,
    originalPrice: 129,
    description:
      "GH-pulse blend for recovery, sleep-quality markers, and lean-mass research.",
    longDescription:
      "CJC / Ipamorelin is presented for recovery and longevity research, with visible specs, storage guidance, and documentation context kept easy to review.",
    badge: "Trending",
    badgeColor: "bg-violet-600",
    image: "/images/vials/approved/cjc-ipamorelin.png",
    specifications: {
      purity: "99%+",
      quantity: "10mg per vial",
      form: "Lyophilized powder",
      storage: "Store sealed and frozen. Refrigerate after reconstitution (2-8°C)",
    },
    documentation: {
      sku: "TGX-CJCI-10",
      batchCode: "CJC-ORDER-01",
      coaStatus: "COA publishing with first production intake",
      hplcStatus: "HPLC summary publishing with first production intake",
      msStatus: "MS summary publishing with first production intake",
      releaseWindow: "Current ordered batch",
    },
    kitIncludes: [
      "1× CJC / Ipamorelin blend vial (10mg lyophilized)"
    ],
    relatedProductSlugs: ["tesamorelin", "semax", "retatrutide"],
  },
  {
    slug: "nad-plus",
    name: "NAD+",
    shortName: "NAD+",
    category: "Antioxidant",
    heroCategory: "Antioxidant",
    price: 129,
    originalPrice: 149,
    description:
      "Cellular-energy research for mitochondrial function, repair pathways, and aging models.",
    longDescription:
      "NAD+ is presented for energy and resilience research, with visible specs, storage guidance, and documentation context kept easy to review.",
    image: "/images/vials/approved/nad-plus.png",
    specifications: {
      purity: "99%+",
      quantity: "1000mg per vial",
      form: "Lyophilized powder",
      storage: "Store sealed and frozen. Refrigerate after reconstitution (2-8°C)",
    },
    documentation: {
      sku: "TGX-NAD-1000",
      batchCode: "NAD-ORDER-01",
      coaStatus: "COA publishing with first production intake",
      hplcStatus: "HPLC summary publishing with first production intake",
      msStatus: "MS summary publishing with first production intake",
      releaseWindow: "Current ordered batch",
    },
    kitIncludes: [
      "1× NAD+ vial (1000mg lyophilized)"
    ],
    relatedProductSlugs: ["glutathione", "bpc-157", "tesamorelin"],
  },
  {
    slug: "glutathione",
    name: "Glutathione",
    shortName: "Glutathione",
    category: "Antioxidant",
    heroCategory: "Antioxidant",
    price: 89,
    originalPrice: 109,
    description:
      "Antioxidant research for oxidative stress, detox pathways, and cellular defense.",
    longDescription:
      "Glutathione is presented for recovery-focused research, with visible specs, storage guidance, and documentation context kept easy to review.",
    image: "/images/vials/approved/glutathione.png",
    specifications: {
      purity: "99%+",
      quantity: "1500mg per vial",
      form: "Lyophilized powder",
      storage: "Store sealed and frozen. Refrigerate after reconstitution (2-8°C)",
    },
    documentation: {
      sku: "TGX-GLUT-1500",
      batchCode: "GLT-ORDER-01",
      coaStatus: "COA publishing with first production intake",
      hplcStatus: "HPLC summary publishing with first production intake",
      msStatus: "MS summary publishing with first production intake",
      releaseWindow: "Current ordered batch",
    },
    kitIncludes: [
      "1× Glutathione vial (1500mg lyophilized)"
    ],
    relatedProductSlugs: ["bpc-157", "retatrutide", "glow-70"],
  },
  {
    slug: "semax",
    name: "Semax",
    shortName: "Semax",
    category: "Melanocortin",
    heroCategory: "Melanocortin",
    price: 79,
    originalPrice: 89,
    description:
      "Cognitive research for focus, stress resilience, and neuro-signaling models.",
    longDescription:
      "Semax is presented for focus and resilience research, with visible specs, storage guidance, and documentation context kept easy to review.",
    image: "/images/vials/approved/semax.png",
    specifications: {
      purity: "99%+",
      quantity: "10mg per vial",
      form: "Lyophilized powder",
      storage: "Store sealed and frozen. Refrigerate after reconstitution (2-8°C)",
    },
    documentation: {
      sku: "TGX-SEMAX-10",
      batchCode: "SEM-ORDER-01",
      coaStatus: "COA publishing with first production intake",
      hplcStatus: "HPLC summary publishing with first production intake",
      msStatus: "MS summary publishing with first production intake",
      releaseWindow: "Current ordered batch",
    },
    kitIncludes: [
      "1× Semax vial (10mg lyophilized)"
    ],
    relatedProductSlugs: ["selank", "tesamorelin", "retatrutide"],
  },
  {
    slug: "selank",
    name: "Selank",
    shortName: "Selank",
    category: "Melanocortin",
    heroCategory: "Melanocortin",
    price: 79,
    originalPrice: 89,
    description:
      "Calm-and-clarity research for stress response, mood markers, and cognition.",
    longDescription:
      "Selank is presented for calm and clarity research, with visible specs, storage guidance, and documentation context kept easy to review.",
    image: "/images/vials/approved/selank.png",
    specifications: {
      purity: "99%+",
      quantity: "10mg per vial",
      form: "Lyophilized powder",
      storage: "Store sealed and frozen. Refrigerate after reconstitution (2-8°C)",
    },
    documentation: {
      sku: "TGX-SELANK-10",
      batchCode: "SEL-ORDER-01",
      coaStatus: "COA publishing with first production intake",
      hplcStatus: "HPLC summary publishing with first production intake",
      msStatus: "MS summary publishing with first production intake",
      releaseWindow: "Current ordered batch",
    },
    kitIncludes: [
      "1× Selank vial (10mg lyophilized)"
    ],
    relatedProductSlugs: ["semax", "tesamorelin", "glutathione"],
  },
  {
    slug: "glow-70",
    name: "Glow-70 Stack",
    shortName: "Glow-70 Stack",
    category: "Cosmetic",
    heroCategory: "Cosmetic",
    price: 129,
    originalPrice: 149,
    description:
      "Aesthetic research blend for skin quality, collagen, hair, and glow-focused models.",
    longDescription:
      "Glow-70 Stack is presented for aesthetics-focused research, with visible specs, storage guidance, and documentation context kept easy to review.",
    badge: "Trending",
    badgeColor: "bg-rose-600",
    image: "/images/vials/approved/glow-70.png",
    specifications: {
      purity: "99%+",
      quantity: "70mg per vial",
      form: "Lyophilized powder",
      storage: "Store sealed and frozen. Refrigerate after reconstitution (2-8°C)",
    },
    documentation: {
      sku: "TGX-GLOW70-70",
      batchCode: "GLW-ORDER-01",
      coaStatus: "COA publishing with first production intake",
      hplcStatus: "HPLC summary publishing with first production intake",
      msStatus: "MS summary publishing with first production intake",
      releaseWindow: "Current ordered batch",
    },
    kitIncludes: [
      "1× Glow-70 Stack vial (70mg lyophilized)"
    ],
    relatedProductSlugs: ["glutathione", "mt-2", "bpc-157"],
  },
  {
    slug: "mt-2",
    name: "Melanotan II (MT-2)",
    shortName: "MT-2",
    category: "Cosmetic",
    heroCategory: "Cosmetic",
    price: 55,
    originalPrice: 69,
    description:
      "Pigmentation research for melanocortin pathways, tanning response, and skin-tone models.",
    longDescription:
      "Melanotan II (MT-2) is presented for pigmentation-focused research, with visible specs, storage guidance, and documentation context kept easy to review.",
    image: "/images/vials/approved/mt-2.png",
    specifications: {
      purity: "99%+",
      quantity: "10mg per vial",
      form: "Lyophilized powder",
      storage: "Store sealed and frozen. Refrigerate after reconstitution (2-8°C)",
    },
    documentation: {
      sku: "TGX-MT2-10",
      batchCode: "MT2-ORDER-01",
      coaStatus: "COA publishing with first production intake",
      hplcStatus: "HPLC summary publishing with first production intake",
      msStatus: "MS summary publishing with first production intake",
      releaseWindow: "Current ordered batch",
    },
    kitIncludes: [
      "1× Melanotan II (MT-2) vial (10mg lyophilized)"
    ],
    relatedProductSlugs: ["glow-70", "selank", "semax"],
  },
];

export const publicProducts = products;

/** Products with badges — used on the homepage featured section */
export const featuredProducts = publicProducts.filter((p) => p.badge);

const heroCategoryLabelMap: Record<HeroCategory, string> = {
  Metabolic: "Fat Loss",
  Antioxidant: "Recovery",
  Cosmetic: "Aesthetics",
  Melanocortin: "Longevity",
};

const shopCategoryLabelMap: Record<ShopCategory, string> = {
  All: "All",
  Metabolic: heroCategoryLabelMap.Metabolic,
  Antioxidant: heroCategoryLabelMap.Antioxidant,
  Cosmetic: heroCategoryLabelMap.Cosmetic,
  Melanocortin: heroCategoryLabelMap.Melanocortin,
};

const categoryParamMap: Record<string, ShopCategory> = {
  all: "All",
  metabolic: "Metabolic",
  research: "Melanocortin",
  beauty: "Cosmetic",
  bundles: "All",
  "fat-loss": "Metabolic",
  fatloss: "Metabolic",
  "weight-loss": "Metabolic",
  recovery: "Antioxidant",
  antioxidant: "Antioxidant",
  longevity: "Melanocortin",
  aesthetics: "Cosmetic",
  cosmetic: "Cosmetic",
  appearance: "Cosmetic",
  skin: "Cosmetic",
  glow: "Cosmetic",
  vitality: "Melanocortin",
  melanocortin: "Melanocortin",
  aging: "Melanocortin",
  performance: "Melanocortin",
  "beauty-skin": "Cosmetic",
};

const heroCategoryHrefMap: Record<HeroCategory, string> = {
  Metabolic: "fat-loss",
  Antioxidant: "recovery",
  Cosmetic: "aesthetics",
  Melanocortin: "longevity",
};

export function normalizeCategoryParam(category: string | null): ShopCategory | undefined {
  if (!category) return undefined;

  return categoryParamMap[category.trim().toLowerCase()];
}

/** Get a product by its slug */
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getPublicProductBySlug(slug: string): Product | undefined {
  return publicProducts.find((p) => p.slug === slug);
}

/** Get products by public-facing shop category */
export function getProductsByCategory(category: ShopCategory): Product[] {
  if (category === "All") return publicProducts;
  return publicProducts.filter((p) => p.heroCategory === category);
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

export function getHeroCategoryLabel(category: HeroCategory): string {
  return heroCategoryLabelMap[category];
}

export function getShopCategoryLabel(category: ShopCategory): string {
  return shopCategoryLabelMap[category];
}
