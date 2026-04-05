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

export const products: Product[] = [
  // ── Recovery ──
  {
    slug: "bpc-157",
    name: "BPC-157 Research Kit",
    category: "Recovery",
    price: 89.99,
    originalPrice: 119.99,
    description:
      "5mg BPC-157 + bacteriostatic water + syringes + alcohol swabs. Complete reconstitution kit.",
    longDescription:
      "BPC-157 (Body Protection Compound-157) is a synthetic pentadecapeptide derived from human gastric juice. This research kit provides everything needed for laboratory reconstitution and study. BPC-157 has been the subject of extensive in-vitro and in-vivo research for its potential role in tissue repair, wound healing, and gastrointestinal protection. Our kit ships with pharmaceutical-grade bacteriostatic water, precision syringes, and sterile alcohol swabs — no separate purchases required.",
    badge: "Best Seller",
    badgeColor: "bg-[#4A90D9]",
    image: "/images/product-bpc157.png",
    specifications: {
      purity: "99%+",
      quantity: "5mg per vial",
      form: "Lyophilized powder",
      storage: "Refrigerate after reconstitution (2-8°C)",
    },
    kitIncludes: [
      "1× BPC-157 (5mg lyophilized)",
      "1× Bacteriostatic water (30mL)",
      "5× Insulin syringes (1mL)",
      "10× Sterile alcohol swabs",
      "Reconstitution guide",
    ],
    relatedProductSlugs: ["tb-500", "recovery-stack", "ghk-cu"],
  },
  {
    slug: "tb-500",
    name: "TB-500 Research Kit",
    category: "Recovery",
    price: 84.99,
    originalPrice: 109.99,
    description:
      "5mg TB-500 + bacteriostatic water + syringes + alcohol swabs. Research-ready recovery peptide.",
    longDescription:
      "TB-500 (Thymosin Beta-4) is a naturally occurring peptide found in virtually all human and animal cells. It plays a critical role in tissue repair, cell migration, and inflammation regulation. This complete research kit includes pharmaceutical-grade TB-500 alongside all the supplies needed for reconstitution. Researchers studying wound healing, muscle repair, and cellular regeneration will find this kit provides a convenient all-in-one solution for laboratory investigation.",
    image: "/images/product-tb-500.png",
    specifications: {
      purity: "99%+",
      quantity: "5mg per vial",
      form: "Lyophilized powder",
      storage: "Refrigerate after reconstitution (2-8°C)",
    },
    kitIncludes: [
      "1× TB-500 (5mg lyophilized)",
      "1× Bacteriostatic water (30mL)",
      "5× Insulin syringes (1mL)",
      "10× Sterile alcohol swabs",
      "Reconstitution guide",
    ],
    relatedProductSlugs: ["bpc-157", "recovery-stack", "epithalon"],
  },
  {
    slug: "recovery-stack",
    name: "Recovery Stack",
    category: "Recovery",
    price: 199.99,
    originalPrice: 279.99,
    description:
      "BPC-157 + TB-500 combo kit with all supplies. The complete recovery research bundle.",
    longDescription:
      "The Recovery Stack combines two of the most researched recovery peptides — BPC-157 and TB-500 — in a single comprehensive kit. Researchers studying synergistic peptide interactions for tissue repair, inflammation modulation, and cellular recovery will appreciate the convenience and cost savings of this bundle. Both peptides arrive with their own bacteriostatic water, syringes, and swabs, allowing independent reconstitution and dosing protocols. Save 28% compared to purchasing each kit separately.",
    badge: "Save 28%",
    badgeColor: "bg-rose-600",
    image: "/images/product-recovery-stack.png",
    specifications: {
      purity: "99%+",
      quantity: "5mg BPC-157 + 5mg TB-500",
      form: "Lyophilized powder (2 vials)",
      storage: "Refrigerate after reconstitution (2-8°C)",
    },
    kitIncludes: [
      "1× BPC-157 (5mg lyophilized)",
      "1× TB-500 (5mg lyophilized)",
      "2× Bacteriostatic water (30mL each)",
      "10× Insulin syringes (1mL)",
      "20× Sterile alcohol swabs",
      "Reconstitution guide for each compound",
    ],
    relatedProductSlugs: ["bpc-157", "tb-500", "ghk-cu"],
  },

  // ── Metabolic ──
  {
    slug: "semaglutide",
    name: "Semaglutide Research Kit",
    category: "Metabolic",
    price: 129.99,
    originalPrice: 169.99,
    description:
      "5mg Semaglutide + bacteriostatic water + insulin syringes + alcohol swabs. Research-ready.",
    longDescription:
      "Semaglutide is a glucagon-like peptide-1 (GLP-1) receptor agonist that has generated significant research interest for its role in metabolic regulation, appetite modulation, and glucose homeostasis. This complete research kit provides pharmaceutical-grade semaglutide alongside precision insulin syringes optimized for accurate sub-milligram dosing. Whether studying incretin pathways, metabolic signaling, or receptor binding kinetics, this kit delivers everything needed for rigorous laboratory research.",
    badge: "Popular",
    badgeColor: "bg-emerald-600",
    image: "/images/product-semaglutide.png",
    specifications: {
      purity: "99%+",
      quantity: "5mg per vial",
      form: "Lyophilized powder",
      storage: "Refrigerate after reconstitution (2-8°C)",
    },
    kitIncludes: [
      "1× Semaglutide (5mg lyophilized)",
      "1× Bacteriostatic water (30mL)",
      "10× Insulin syringes (1mL)",
      "10× Sterile alcohol swabs",
      "Reconstitution guide",
    ],
    relatedProductSlugs: ["tirzepatide", "bpc-157", "pt-141"],
  },
  {
    slug: "tirzepatide",
    name: "Tirzepatide Research Kit",
    category: "Metabolic",
    price: 149.99,
    originalPrice: 199.99,
    description:
      "10mg Tirzepatide + bacteriostatic water + insulin syringes + alcohol swabs. Premium grade.",
    longDescription:
      "Tirzepatide is a dual glucose-dependent insulinotropic polypeptide (GIP) and GLP-1 receptor agonist representing the next generation of metabolic research compounds. With 10mg per vial — double the standard offering — this premium kit supports extended research protocols. The dual-agonist mechanism makes tirzepatide a compelling subject for studies examining synergistic incretin signaling, metabolic pathway modulation, and comparative efficacy research against single-agonist compounds.",
    badge: "Premium",
    badgeColor: "bg-amber-600",
    image: "/images/product-tirzepatide.png",
    specifications: {
      purity: "99%+",
      quantity: "10mg per vial",
      form: "Lyophilized powder",
      storage: "Refrigerate after reconstitution (2-8°C)",
    },
    kitIncludes: [
      "1× Tirzepatide (10mg lyophilized)",
      "1× Bacteriostatic water (30mL)",
      "10× Insulin syringes (1mL)",
      "10× Sterile alcohol swabs",
      "Reconstitution guide",
    ],
    relatedProductSlugs: ["semaglutide", "bpc-157", "epithalon"],
  },

  // ── Cognitive ──
  {
    slug: "semax",
    name: "Semax Research Kit",
    category: "Cognitive",
    price: 59.99,
    originalPrice: 79.99,
    description:
      "30mg Semax + bacteriostatic water + nasal spray bottle + alcohol swabs. Cognitive research peptide.",
    longDescription:
      "Semax is a synthetic peptide derived from a fragment of adrenocorticotropic hormone (ACTH 4-10). Originally developed for neurological research, Semax has become a subject of extensive study for its potential roles in cognitive function, neuroprotection, and neurotrophic factor modulation. This kit includes a nasal spray bottle optimized for intranasal delivery research, along with bacteriostatic water and sterile swabs. The 30mg quantity supports multi-week research protocols.",
    badge: "New",
    badgeColor: "bg-violet-600",
    image: "/images/product-semax.png",
    specifications: {
      purity: "99%+",
      quantity: "30mg per vial",
      form: "Lyophilized powder",
      storage: "Refrigerate after reconstitution (2-8°C)",
    },
    kitIncludes: [
      "1× Semax (30mg lyophilized)",
      "1× Bacteriostatic water (30mL)",
      "1× Nasal spray bottle (15mL)",
      "10× Sterile alcohol swabs",
      "Reconstitution guide",
    ],
    relatedProductSlugs: ["selank", "bpc-157", "epithalon"],
  },
  {
    slug: "selank",
    name: "Selank Research Kit",
    category: "Cognitive",
    price: 64.99,
    originalPrice: 84.99,
    description:
      "20mg Selank + bacteriostatic water + nasal spray bottle + alcohol swabs. Anxiolytic research peptide.",
    longDescription:
      "Selank is a synthetic analogue of the naturally occurring immunomodulatory peptide tuftsin. Developed as a companion to Semax, Selank has attracted research interest for its potential anxiolytic, nootropic, and immunomodulatory properties. Studies have explored its influence on GABA receptor expression, serotonin metabolism, and brain-derived neurotrophic factor (BDNF) levels. This kit provides a nasal spray bottle for intranasal delivery research alongside all reconstitution supplies.",
    image: "/images/product-selank.png",
    specifications: {
      purity: "99%+",
      quantity: "20mg per vial",
      form: "Lyophilized powder",
      storage: "Refrigerate after reconstitution (2-8°C)",
    },
    kitIncludes: [
      "1× Selank (20mg lyophilized)",
      "1× Bacteriostatic water (30mL)",
      "1× Nasal spray bottle (15mL)",
      "10× Sterile alcohol swabs",
      "Reconstitution guide",
    ],
    relatedProductSlugs: ["semax", "bpc-157", "ghk-cu"],
  },

  // ── Sexual Health ──
  {
    slug: "pt-141",
    name: "PT-141 Research Kit",
    category: "Sexual Health",
    price: 74.99,
    originalPrice: 99.99,
    description:
      "10mg PT-141 + bacteriostatic water + syringes + alcohol swabs. Melanocortin receptor research.",
    longDescription:
      "PT-141 (Bremelanotide) is a synthetic melanocortin receptor agonist derived from Melanotan II. It acts on MC3R and MC4R receptors in the central nervous system, making it a subject of significant research interest in melanocortin signaling, sexual function pathways, and neuroendocrine regulation. Unlike PDE5 inhibitors that act peripherally, PT-141 operates through central mechanisms, providing researchers with a unique tool for studying CNS-mediated physiological responses. This kit includes everything needed for laboratory reconstitution.",
    image: "/images/product-pt-141.png",
    specifications: {
      purity: "99%+",
      quantity: "10mg per vial",
      form: "Lyophilized powder",
      storage: "Refrigerate after reconstitution (2-8°C)",
    },
    kitIncludes: [
      "1× PT-141 (10mg lyophilized)",
      "1× Bacteriostatic water (30mL)",
      "5× Insulin syringes (1mL)",
      "10× Sterile alcohol swabs",
      "Reconstitution guide",
    ],
    relatedProductSlugs: ["bpc-157", "semaglutide", "ghk-cu"],
  },

  // ── Anti-Aging ──
  {
    slug: "ghk-cu",
    name: "GHK-Cu Research Kit",
    category: "Anti-Aging",
    price: 69.99,
    originalPrice: 94.99,
    description:
      "50mg GHK-Cu + bacteriostatic water + syringes + alcohol swabs. Copper peptide research kit.",
    longDescription:
      "GHK-Cu (Copper Peptide GHK-Cu) is a naturally occurring tripeptide with high affinity for copper(II) ions. Found in human plasma, saliva, and urine, GHK-Cu has been extensively studied for its roles in wound healing, collagen synthesis, fibroblast stimulation, and antioxidant enzyme regulation. Research suggests it may influence over 4,000 genes, with implications for tissue remodeling, anti-inflammatory signaling, and cellular regeneration. The 50mg quantity provides ample material for extended research protocols.",
    image: "/images/product-ghk-cu.png",
    specifications: {
      purity: "99%+",
      quantity: "50mg per vial",
      form: "Lyophilized powder",
      storage: "Refrigerate after reconstitution (2-8°C)",
    },
    kitIncludes: [
      "1× GHK-Cu (50mg lyophilized)",
      "1× Bacteriostatic water (30mL)",
      "5× Insulin syringes (1mL)",
      "10× Sterile alcohol swabs",
      "Reconstitution guide",
    ],
    relatedProductSlugs: ["epithalon", "bpc-157", "semax"],
  },
  {
    slug: "epithalon",
    name: "Epithalon Research Kit",
    category: "Anti-Aging",
    price: 79.99,
    originalPrice: 109.99,
    description:
      "50mg Epithalon + bacteriostatic water + syringes + alcohol swabs. Telomerase research peptide.",
    longDescription:
      "Epithalon (Epitalon) is a synthetic tetrapeptide based on the natural peptide epithalamin, produced by the pineal gland. It has attracted considerable research interest for its potential role in telomerase activation, telomere elongation, and circadian rhythm regulation. Studies have investigated its effects on melatonin production, antioxidant enzyme expression, and cellular senescence. The 50mg kit provides researchers with sufficient material for longitudinal studies examining aging-related biomarkers and telomere dynamics.",
    image: "/images/product-epithalon.png",
    specifications: {
      purity: "99%+",
      quantity: "50mg per vial",
      form: "Lyophilized powder",
      storage: "Refrigerate after reconstitution (2-8°C)",
    },
    kitIncludes: [
      "1× Epithalon (50mg lyophilized)",
      "1× Bacteriostatic water (30mL)",
      "5× Insulin syringes (1mL)",
      "10× Sterile alcohol swabs",
      "Reconstitution guide",
    ],
    relatedProductSlugs: ["ghk-cu", "bpc-157", "tirzepatide"],
  },
];

/** Products with badges — used on the homepage featured section */
export const featuredProducts = products.filter((p) => p.badge);

/** All unique categories */
export const categories = [
  "All",
  "Recovery",
  "Metabolic",
  "Cognitive",
  "Sexual Health",
  "Anti-Aging",
  "Bundles",
] as const;

export type Category = (typeof categories)[number];

/** Get a product by its slug */
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

/** Get products by category */
export function getProductsByCategory(category: Category): Product[] {
  if (category === "All") return products;
  if (category === "Bundles")
    return products.filter(
      (p) => p.slug === "recovery-stack" || p.name.toLowerCase().includes("stack")
    );
  return products.filter((p) => p.category === category);
}
