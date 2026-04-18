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
    name: "Retatrutide Research Kit",
    shortName: "Retatrutide",
    category: "Metabolic",
    heroCategory: "Metabolic",
    price: 189.99,
    originalPrice: 239.99,
    description:
      "10mg Retatrutide kit for metabolic and body-composition research, with prep essentials included.",
    longDescription:
      "This Retatrutide research kit is positioned for metabolic and body-composition focused workflows, with the compound, prep essentials, and storage notes kept together in one place. Each kit includes a 10mg lyophilized vial plus the supporting prep supplies needed for a cleaner lab routine.",
    badge: "Popular",
    badgeColor: "bg-[#4A90D9]",
    image: "/images/vials/front/retatrutide.png",
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
      "1× Retatrutide (10mg lyophilized)",
      "1× Bacteriostatic water (30mL)",
      "10× Insulin syringes (1mL)",
      "10× Sterile alcohol swabs",
      "Reconstitution guide",
    ],
    relatedProductSlugs: ["tesamorelin", "bpc-157", "glutathione"],
  },
  {
    slug: "tesamorelin",
    name: "Tesamorelin Research Kit",
    shortName: "Tesamorelin",
    category: "Melanocortin",
    heroCategory: "Melanocortin",
    price: 159.99,
    originalPrice: 199.99,
    description:
      "10mg Tesamorelin kit for longevity and body-composition research, with prep essentials included.",
    longDescription:
      "This Tesamorelin research kit is framed around longevity and body-composition focused protocols, with the compound, prep essentials, and storage guidance kept together in one place. Each kit includes a 10mg lyophilized vial and the supporting supplies needed for a cleaner prep workflow.",
    badge: "Best Seller",
    badgeColor: "bg-emerald-600",
    image: "/images/vials/front/tesamorelin.png",
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
      "1× Tesamorelin (10mg lyophilized)",
      "1× Bacteriostatic water (30mL)",
      "10× Insulin syringes (1mL)",
      "10× Sterile alcohol swabs",
      "Reconstitution guide",
    ],
    relatedProductSlugs: ["retatrutide", "semax", "selank"],
  },
  {
    slug: "bpc-157",
    name: "BPC-157 Research Kit",
    shortName: "BPC-157",
    category: "Antioxidant",
    heroCategory: "Antioxidant",
    price: 79.99,
    originalPrice: 99.99,
    description:
      "5mg BPC-157 kit for recovery-focused research, with prep essentials included.",
    longDescription:
      "This BPC-157 research kit is positioned for recovery-focused workflows, with the compound, prep essentials, and storage guidance kept together for easier evaluation. Each kit includes a 5mg lyophilized vial plus the supporting prep supplies needed for consistent lab prep.",
    badge: "New",
    badgeColor: "bg-teal-600",
    image: "/images/vials/front/bpc-157.png",
    specifications: {
      purity: "99%+",
      quantity: "5mg per vial",
      form: "Lyophilized powder",
      storage: "Store sealed and frozen. Refrigerate after reconstitution (2-8°C)",
    },
    documentation: {
      sku: "TGX-BPC-5",
      batchCode: "BPC-ORDER-01",
      coaStatus: "COA publishing with first production intake",
      hplcStatus: "HPLC summary publishing with first production intake",
      msStatus: "MS summary publishing with first production intake",
      releaseWindow: "Current ordered batch",
    },
    kitIncludes: [
      "1× BPC-157 (5mg lyophilized)",
      "1× Bacteriostatic water (30mL)",
      "10× Insulin syringes (1mL)",
      "10× Sterile alcohol swabs",
      "Reconstitution guide",
    ],
    relatedProductSlugs: ["glutathione", "retatrutide", "glow-70"],
  },
  {
    slug: "glutathione",
    name: "Glutathione Research Kit",
    shortName: "Glutathione",
    category: "Antioxidant",
    heroCategory: "Antioxidant",
    price: 79.99,
    originalPrice: 99.99,
    description:
      "600mg Glutathione kit for recovery-focused research, with prep essentials included.",
    longDescription:
      "This Glutathione research kit is positioned for recovery-focused protocols, with the compound, prep essentials, and storage guidance kept together for easier evaluation. Each kit includes a 600mg lyophilized vial plus the supporting prep supplies needed for a clean lab workflow.",
    image: "/images/vials/front/glutathione.png",
    specifications: {
      purity: "99%+",
      quantity: "600mg per vial",
      form: "Lyophilized powder",
      storage: "Store sealed and frozen. Refrigerate after reconstitution (2-8°C)",
    },
    documentation: {
      sku: "TGX-GLUT-600",
      batchCode: "GLT-ORDER-01",
      coaStatus: "COA publishing with first production intake",
      hplcStatus: "HPLC summary publishing with first production intake",
      msStatus: "MS summary publishing with first production intake",
      releaseWindow: "Current ordered batch",
    },
    kitIncludes: [
      "1× Glutathione (600mg lyophilized)",
      "1× Bacteriostatic water (30mL)",
      "10× Insulin syringes (1mL)",
      "10× Sterile alcohol swabs",
      "Reconstitution guide",
    ],
    relatedProductSlugs: ["bpc-157", "retatrutide", "glow-70"],
  },
  {
    slug: "semax",
    name: "Semax Research Kit",
    shortName: "Semax",
    category: "Melanocortin",
    heroCategory: "Melanocortin",
    price: 89.99,
    originalPrice: 109.99,
    description:
      "30mg Semax kit for focus and resilience research, with prep essentials included.",
    longDescription:
      "This Semax research kit is framed around focus and resilience oriented workflows, with the compound, prep essentials, and storage notes kept together for easier review. Each kit includes a 30mg lyophilized vial plus the supporting supplies needed for consistent lab prep.",
    image: "/images/vials/front/semax.png",
    specifications: {
      purity: "99%+",
      quantity: "30mg per vial",
      form: "Lyophilized powder",
      storage: "Store sealed and frozen. Refrigerate after reconstitution (2-8°C)",
    },
    documentation: {
      sku: "TGX-SEMAX-30",
      batchCode: "SEM-ORDER-01",
      coaStatus: "COA publishing with first production intake",
      hplcStatus: "HPLC summary publishing with first production intake",
      msStatus: "MS summary publishing with first production intake",
      releaseWindow: "Current ordered batch",
    },
    kitIncludes: [
      "1× Semax (30mg lyophilized)",
      "1× Bacteriostatic water (30mL)",
      "10× Insulin syringes (1mL)",
      "10× Sterile alcohol swabs",
      "Reconstitution guide",
    ],
    relatedProductSlugs: ["selank", "tesamorelin", "retatrutide"],
  },
  {
    slug: "selank",
    name: "Selank Research Kit",
    shortName: "Selank",
    category: "Melanocortin",
    heroCategory: "Melanocortin",
    price: 89.99,
    originalPrice: 109.99,
    description:
      "5mg Selank kit for calm and clarity research, with prep essentials included.",
    longDescription:
      "This Selank research kit is positioned for calm and clarity focused workflows, with the compound, prep essentials, and storage notes kept together in one place. Each kit includes a 5mg lyophilized vial plus the supporting supplies needed for a cleaner prep routine.",
    image: "/images/vials/front/selank.png",
    specifications: {
      purity: "99%+",
      quantity: "5mg per vial",
      form: "Lyophilized powder",
      storage: "Store sealed and frozen. Refrigerate after reconstitution (2-8°C)",
    },
    documentation: {
      sku: "TGX-SELANK-5",
      batchCode: "SEL-ORDER-01",
      coaStatus: "COA publishing with first production intake",
      hplcStatus: "HPLC summary publishing with first production intake",
      msStatus: "MS summary publishing with first production intake",
      releaseWindow: "Current ordered batch",
    },
    kitIncludes: [
      "1× Selank (5mg lyophilized)",
      "1× Bacteriostatic water (30mL)",
      "10× Insulin syringes (1mL)",
      "10× Sterile alcohol swabs",
      "Reconstitution guide",
    ],
    relatedProductSlugs: ["semax", "tesamorelin", "glutathione"],
  },
  {
    slug: "glow-70",
    name: "Glow-70 Stack Research Kit",
    shortName: "Glow-70 Stack",
    category: "Cosmetic",
    heroCategory: "Cosmetic",
    price: 149.99,
    originalPrice: 179.99,
    description:
      "Glow-70 Stack kit for aesthetics-focused research, with prep essentials included.",
    longDescription:
      "This Glow-70 Stack research kit is framed around aesthetics-focused protocols, with the blend, prep essentials, and storage notes kept together in one box. Each kit includes the branded stack kit presentation plus the supporting prep supplies needed for consistent lab prep.",
    badge: "Trending",
    badgeColor: "bg-rose-600",
    image: "/images/vials/front/glow-70.png",
    specifications: {
      purity: "99%+",
      quantity: "Stack kit",
      form: "Lyophilized powder",
      storage: "Store sealed and frozen. Refrigerate after reconstitution (2-8°C)",
    },
    documentation: {
      sku: "TGX-GLOW70-KIT",
      batchCode: "GLW-ORDER-01",
      coaStatus: "COA publishing with first production intake",
      hplcStatus: "HPLC summary publishing with first production intake",
      msStatus: "MS summary publishing with first production intake",
      releaseWindow: "Current ordered batch",
    },
    kitIncludes: [
      "1× Glow-70 Stack branded kit",
      "1× Bacteriostatic water (30mL)",
      "10× Insulin syringes (1mL)",
      "10× Sterile alcohol swabs",
      "Reconstitution guide",
    ],
    relatedProductSlugs: ["glutathione", "mt-2", "bpc-157"],
  },
  {
    slug: "mt-2",
    name: "Melanotan II (MT-2) Research Kit",
    shortName: "MT-2",
    category: "Cosmetic",
    heroCategory: "Cosmetic",
    price: 69.99,
    originalPrice: 89.99,
    description:
      "10mg Melanotan II / MT-2 kit for pigmentation-focused research, with prep essentials included.",
    longDescription:
      "This Melanotan II / MT-2 research kit is positioned for pigmentation-focused workflows, with the compound, prep essentials, and handling context kept together in one box. Each kit includes a 10mg lyophilized vial plus the supporting prep supplies needed for a cleaner lab routine.",
    image: "/images/vials/front/mt-2.png",
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
      "1× Melanotan II / MT-2 (10mg lyophilized)",
      "1× Bacteriostatic water (30mL)",
      "10× Insulin syringes (1mL)",
      "10× Sterile alcohol swabs",
      "Reconstitution guide",
    ],
    relatedProductSlugs: ["glow-70", "selank", "semax"],
  },
];

/** Products with badges — used on the homepage featured section */
export const featuredProducts = products.filter((p) => p.badge);

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

export function getHeroCategoryLabel(category: HeroCategory): string {
  return heroCategoryLabelMap[category];
}

export function getShopCategoryLabel(category: ShopCategory): string {
  return shopCategoryLabelMap[category];
}
