import { DisclaimerBanner } from "@/components/disclaimer-banner";
import { Footer } from "@/components/footer";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  ClipboardCheck,
  FileCheck,
  FlaskConical,
  HeartPulse,
  Microscope,
  ShieldCheck,
  Sparkles,
  Star,
  Stethoscope,
  Truck,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

const BASE_PATH = process.env.NODE_ENV === "production" ? "/teragenix" : "";

const heroTabs = [
  { label: "Metabolic Kits", href: "#metabolic" },
  { label: "Recovery & Repair", href: "#recovery" },
  { label: "Beauty & Glow", href: "#beauty" },
  { label: "Longevity Research", href: "#longevity" },
];

const heroChecklist = [
  "99%+ purity across flagship kits",
  "COA-ready documentation language",
  "Discreet U.S. fulfillment and bundled supplies",
  "Built around category shopping, not random SKU clutter",
];

const includedItems = [
  {
    icon: FlaskConical,
    title: "Compound included",
    text: "Flagship metabolic, beauty, and longevity kits with product-first presentation.",
  },
  {
    icon: ClipboardCheck,
    title: "Prep essentials included",
    text: "Bacteriostatic water, syringes, swabs, and reconstitution guidance.",
  },
  {
    icon: FileCheck,
    title: "Documentation repeated",
    text: "Trust and sourcing cues appear early, not buried after the fold.",
  },
  {
    icon: Truck,
    title: "Fast discrete ship",
    text: "Operational clarity and delivery reassurance across the homepage rhythm.",
  },
];

type CategorySection = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  supporting: string;
  href: string;
  cta: string;
  image: string;
  companionImage: string;
  chips: string[];
  statLabel: string;
  statValue: string;
  supportTitle: string;
  supportText: string;
  cards: {
    icon: LucideIcon;
    title: string;
    text: string;
  }[];
};

const categorySections: CategorySection[] = [
  {
    id: "metabolic",
    eyebrow: "Flagship metabolic category",
    title: "GLP-1 and body-composition kits presented like a primary service line",
    description:
      "This is the clearest Medvi-style translation for Teragenix. The section is not a small card row anymore. It is a full landing block with a product visual, tight supporting copy, a direct CTA, and repeated trust framing.",
    supporting:
      "Use it to steer buyers straight into the highest-intent part of the catalog without making them decode the storefront first.",
    href: "/shop/retatrutide",
    cta: "Shop metabolic kits",
    image: "/images/vials/tirzepatide.png",
    companionImage: "/images/vials/semaglutide.png",
    chips: ["Retatrutide", "Semaglutide", "Tesamorelin"],
    statLabel: "Most shopped together",
    statValue: "Metabolic kits, body-composition support, complete prep supplies",
    supportTitle: "Everything needed to start the workflow is already in the box",
    supportText:
      "The layout now says complete system, not bare vial. That is much closer to the reference site’s conversion structure.",
    cards: [
      {
        icon: HeartPulse,
        title: "Category-first entry point",
        text: "Buyers land on the biggest demand cluster immediately instead of skimming a generic hero.",
      },
      {
        icon: ShieldCheck,
        title: "Credibility built in",
        text: "Purity, documentation, and shipping signals sit beside the offer instead of below it.",
      },
      {
        icon: BadgeCheck,
        title: "Bundle logic up front",
        text: "The page clarifies why Teragenix kits feel complete before a shopper ever opens a PDP.",
      },
      {
        icon: Truck,
        title: "Shorter path to checkout",
        text: "Each section pushes one obvious next action so the homepage behaves like a sales funnel.",
      },
    ],
  },
  {
    id: "recovery",
    eyebrow: "Recovery and repair research",
    title: "Repair-focused peptides given their own full-width destination section",
    description:
      "Instead of leaving recovery compounds to feel like leftovers in a store grid, this block gives them the same large-format treatment as the hero category. That repetition is what creates the stacked service-page rhythm.",
    supporting:
      "The visual balance is intentionally similar from section to section so the homepage feels composed, not improvised.",
    href: "/shop",
    cta: "Browse recovery stacks",
    image: "/images/vials/recovery-stack.png",
    companionImage: "/images/vials/tb-500.png",
    chips: ["BPC-157", "TB-500", "Recovery stacks"],
    statLabel: "Why this section matters",
    statValue: "Large visual, one message, one CTA, supporting proof cards",
    supportTitle: "A dedicated home for repair, recovery, and resilience-focused research",
    supportText:
      "That is far closer to the reference composition than a few teaser cards scattered around the homepage.",
    cards: [
      {
        icon: Microscope,
        title: "Research framing stays clear",
        text: "The copy stays disciplined while still selling the category like a premium destination.",
      },
      {
        icon: ClipboardCheck,
        title: "Stack-ready merchandising",
        text: "Recovery products are described as cohesive systems instead of unrelated bottles and vials.",
      },
      {
        icon: FileCheck,
        title: "Evidence cues repeated",
        text: "Quality language shows up again so confidence keeps building as buyers scroll.",
      },
      {
        icon: Stethoscope,
        title: "Care-site rhythm, research-site language",
        text: "It borrows the structure of telehealth landing pages without crossing into medical claims.",
      },
    ],
  },
  {
    id: "beauty",
    eyebrow: "Glow and cosmetic-adjacent research",
    title: "Beauty and radiance kits slowed down into a softer editorial-style section",
    description:
      "The reference site repeatedly shifts tone between categories while keeping the same layout skeleton. This section does that for Teragenix with a softer visual palette and more elevated product styling.",
    supporting:
      "It makes Glow 70 and glutathione feel like a real category destination instead of filler below the fold.",
    href: "/shop/glow-70",
    cta: "Explore glow protocols",
    image: "/images/vials/glow-70.png",
    companionImage: "/images/vials/glutathione.png",
    chips: ["Glow 70", "Glutathione", "Beauty blends"],
    statLabel: "Visual tone shift",
    statValue: "Softer cream cards, premium spacing, editorial copy pacing",
    supportTitle: "A calmer section for cosmetic, skin, and radiance-oriented research",
    supportText:
      "That tonal shift is part of what makes the new homepage visibly more like stacked service landers instead of the old storefront.",
    cards: [
      {
        icon: Sparkles,
        title: "Premium category treatment",
        text: "The layout finally gives aesthetic research lines the same amount of real estate as metabolic kits.",
      },
      {
        icon: BadgeCheck,
        title: "Sharper segmentation",
        text: "Each shopper can self-sort into the right interest area without digging through everything else.",
      },
      {
        icon: ShieldCheck,
        title: "Trust without clutter",
        text: "The section still carries sourcing, prep, and delivery cues without turning into a spec sheet.",
      },
      {
        icon: ArrowRight,
        title: "Conversion-oriented CTA",
        text: "One product-led action keeps the section moving instead of opening too many parallel paths.",
      },
    ],
  },
  {
    id: "longevity",
    eyebrow: "Longevity and optimization",
    title: "Advanced peptide categories now read like specialized service lines, not miscellaneous products",
    description:
      "This section pushes the site even closer to the reference rhythm by giving longevity compounds their own big promise, companion product callout, and supporting benefit grid.",
    supporting:
      "It helps the homepage feel intentionally sequenced from broad demand to more specialized research interests.",
    href: "/shop/tesamorelin",
    cta: "View longevity kits",
    image: "/images/vials/tesamorelin.png",
    companionImage: "/images/vials/epithalon.png",
    chips: ["Tesamorelin", "Epithalon", "Longevity"],
    statLabel: "Positioning move",
    statValue: "Specialized compounds framed as a destination for optimization-minded buyers",
    supportTitle: "For buyers who already know what category they want, the homepage now respects that intent",
    supportText:
      "That is the big structural change here. The site behaves more like a portfolio of category landers than one long product teaser page.",
    cards: [
      {
        icon: Microscope,
        title: "Higher-intent segmentation",
        text: "Specialist shoppers can jump directly into their area without reading everything else first.",
      },
      {
        icon: FlaskConical,
        title: "Premium lab styling",
        text: "Large product framing and neutral palettes keep the category polished and clinical-adjacent.",
      },
      {
        icon: FileCheck,
        title: "Documentation story continues",
        text: "COA and kit completeness cues stay present all the way through the long-scroll experience.",
      },
      {
        icon: HeartPulse,
        title: "Clear supporting narrative",
        text: "The copy explains why the category exists on the homepage instead of only naming products.",
      },
    ],
  },
];

const processSteps = [
  {
    title: "Pick the category first",
    text: "The homepage now lets buyers enter through the category that matches their intent instead of dumping everyone into the same visual blob.",
  },
  {
    title: "See what is included",
    text: "Every major section repeats completeness, preparation, sourcing, and shipping cues before a user reaches the product grid.",
  },
  {
    title: "Move into the product page",
    text: "Each section has a single primary CTA so the homepage behaves like a staged funnel instead of a loose brochure.",
  },
];

const standards = [
  "Research-use disclaimers stay visible without breaking the premium layout",
  "Category-led browsing mirrors how high-intent buyers actually shop",
  "Image-heavy sections create a much stronger rhythm than the previous design",
  "Support, documentation, shipping, and kit completeness are repeated on purpose",
];

const experts = [
  {
    name: "Quality-controlled sourcing",
    role: "Purity, handling, and documentation language kept visible",
    image: "/images/hero-doctor.png",
  },
  {
    name: "Complete-kit merchandising",
    role: "Product pages feel supported by homepage education and prep visibility",
    image: "/images/hero-vial.png",
  },
];

const testimonials = [
  {
    quote:
      "This feels way more like a real brand site now. The categories finally have their own presence instead of just living in a grid.",
    name: "Alex M.",
    label: "Metabolic buyer",
  },
  {
    quote:
      "The page now sells the sections before it sells the SKUs, which makes the whole catalog feel more expensive and more trustworthy.",
    name: "Jordan R.",
    label: "Repeat customer",
  },
  {
    quote:
      "You can tell what Teragenix is about within a few seconds now. The old homepage never did that.",
    name: "Casey L.",
    label: "First-time shopper",
  },
];

function SectionPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-[#d7e4ef] bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#4A90D9]">
      {children}
    </span>
  );
}

function CategoryLandingSection({
  section,
  reverse = false,
}: {
  section: CategorySection;
  reverse?: boolean;
}) {
  return (
    <section id={section.id} className="py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={`grid gap-8 rounded-[38px] border border-white/80 bg-white/72 p-5 shadow-[0_28px_90px_rgba(22,48,71,0.08)] backdrop-blur-sm sm:p-7 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10 lg:p-8 ${
            reverse ? "lg:[&>*:first-child]:order-2" : ""
          }`}
        >
          <div className="rounded-[34px] bg-[linear-gradient(180deg,#f6fafc_0%,#eef4f7_100%)] p-4 sm:p-5">
            <div className="flex flex-wrap gap-2">
              {section.chips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-[#d7e4ef] bg-white px-3 py-1.5 text-xs font-medium text-[#244156]"
                >
                  {chip}
                </span>
              ))}
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_190px] lg:items-end">
              <div className="rounded-[30px] bg-[linear-gradient(180deg,#ffffff_0%,#eff7fb_100%)] p-6 shadow-[0_18px_45px_rgba(33,64,93,0.09)] sm:p-8">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${BASE_PATH}${section.image}`}
                  alt={section.title}
                  className="mx-auto h-[250px] w-full max-w-[350px] object-contain sm:h-[320px]"
                />
              </div>

              <div className="grid gap-4">
                <div className="rounded-[26px] border border-white/90 bg-white p-4 shadow-[0_16px_36px_rgba(33,64,93,0.08)]">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#7a8d9f]">
                    Companion visual
                  </p>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${BASE_PATH}${section.companionImage}`}
                    alt={`${section.title} companion product`}
                    className="mx-auto mt-3 h-[120px] w-full object-contain"
                  />
                </div>

                <div className="rounded-[26px] bg-[#183243] p-5 text-white shadow-[0_20px_40px_rgba(24,50,67,0.18)]">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8fc6ff]">
                    {section.statLabel}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-white/85">{section.statValue}</p>
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-[28px] border border-white/90 bg-white/92 p-5 shadow-[0_14px_34px_rgba(33,64,93,0.05)]">
              <h3 className="text-base font-semibold text-[#183243]">{section.supportTitle}</h3>
              <p className="mt-2 text-sm leading-7 text-[#607487]">{section.supportText}</p>
            </div>
          </div>

          <div className="flex flex-col justify-center px-1 sm:px-2 lg:px-4">
            <SectionPill>{section.eyebrow}</SectionPill>
            <h2 className="mt-5 max-w-xl text-3xl font-semibold tracking-[-0.06em] text-[#183243] sm:text-4xl lg:text-[3.55rem] lg:leading-[1]">
              {section.title}
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-[#607487]">{section.description}</p>
            <p className="mt-4 max-w-xl text-base leading-8 text-[#7a8d9f]">{section.supporting}</p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href={section.href}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#4A90D9] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(74,144,217,0.28)] transition hover:bg-[#3A7BC8]"
              >
                {section.cta}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/shop"
                className="inline-flex items-center justify-center rounded-full border border-[#d7e4ef] bg-white px-6 py-3.5 text-sm font-semibold text-[#183243] transition hover:bg-[#f7fbfd]"
              >
                View all products
              </Link>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {section.cards.map((card) => (
                <div
                  key={card.title}
                  className="rounded-[26px] border border-[#e7eef4] bg-[#fbfdff] p-5 shadow-[0_12px_28px_rgba(33,64,93,0.04)]"
                >
                  <card.icon className="h-5 w-5 text-[#4A90D9]" />
                  <h3 className="mt-4 text-base font-semibold text-[#183243]">{card.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#607487]">{card.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="bg-[linear-gradient(180deg,#f6f2ea_0%,#f7fafc_16%,#fafcff_42%,#f5f8fb_100%)] text-[#183243]">
      <section className="pb-8 pt-8 sm:pb-12 sm:pt-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[40px] border border-white/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.92)_0%,rgba(247,250,252,0.94)_100%)] px-5 py-6 shadow-[0_30px_90px_rgba(22,48,71,0.09)] backdrop-blur-sm sm:px-8 sm:py-8 lg:px-10 lg:py-10">
            <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div className="max-w-2xl">
                <SectionPill>Research-grade peptide kits, rebuilt around categories</SectionPill>
                <p className="mt-5 text-sm font-medium uppercase tracking-[0.2em] text-[#7a8d9f]">
                  Premium peptide research storefront
                </p>
                <h1 className="mt-4 text-4xl font-semibold tracking-[-0.07em] text-[#183243] sm:text-5xl lg:text-[5.15rem] lg:leading-[0.94]">
                  Teragenix, restructured to feel like stacked service landers.
                </h1>
                <p className="mt-5 max-w-xl text-lg leading-8 text-[#607487] sm:text-xl">
                  The homepage now behaves much closer to Medvi’s composition: one dominant hero, repeated category destination blocks, softer premium pacing, and trust language carried across the entire scroll.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  {heroTabs.map((tab) => (
                    <Link
                      key={tab.label}
                      href={tab.href}
                      className="inline-flex items-center rounded-full border border-[#d7e4ef] bg-white px-4 py-2.5 text-sm font-medium text-[#244156] transition hover:border-[#4A90D9]/40 hover:text-[#183243]"
                    >
                      {tab.label}
                    </Link>
                  ))}
                </div>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/shop"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#183243] px-7 py-4 text-sm font-semibold text-white shadow-[0_18px_44px_rgba(24,50,67,0.24)] transition hover:bg-[#102230]"
                  >
                    Shop all research kits
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="#metabolic"
                    className="inline-flex items-center justify-center rounded-full border border-[#d7e4ef] bg-white px-7 py-4 text-sm font-semibold text-[#183243] transition hover:bg-[#f7fbfd]"
                  >
                    Browse category sections
                  </Link>
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {heroChecklist.map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-[22px] bg-white/88 px-4 py-4 shadow-[0_10px_24px_rgba(33,64,93,0.05)]">
                      <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#eaf4fc] text-[#4A90D9]">
                        <Check className="h-3.5 w-3.5" />
                      </div>
                      <p className="text-sm leading-6 text-[#244156]">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[32px] border border-white/80 bg-white p-3 shadow-[0_20px_55px_rgba(33,64,93,0.08)] sm:col-span-1">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${BASE_PATH}/images/hero-doctor.png`}
                    alt="Teragenix premium hero visual"
                    className="h-[280px] w-full rounded-[26px] object-cover object-top"
                  />
                </div>

                <div className="grid gap-4 sm:col-span-1">
                  <div className="rounded-[32px] border border-white/80 bg-[linear-gradient(180deg,#f6fbff_0%,#edf4fa_100%)] p-6 shadow-[0_20px_55px_rgba(33,64,93,0.08)]">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7a8d9f]">
                      Featured category visual
                    </p>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`${BASE_PATH}/images/vials/tirzepatide.png`}
                      alt="Tirzepatide product visual"
                      className="mx-auto mt-4 h-[180px] w-full object-contain"
                    />
                  </div>

                  <div className="rounded-[32px] bg-[#17314a] p-6 text-white shadow-[0_24px_65px_rgba(23,49,74,0.22)]">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9ccfff]">
                      Homepage promise
                    </p>
                    <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em]">
                      Category-first shopping, premium med-brand pacing.
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-white/78">
                      The old page felt like a store template. This version is built as a sequence of full category landers with repeated proof and image-heavy sections.
                    </p>
                  </div>
                </div>

                <div className="rounded-[34px] border border-[#d7e4ef] bg-[#f1f7fb] p-6 shadow-[0_18px_44px_rgba(33,64,93,0.05)] sm:col-span-2">
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7a8d9f]">
                        Everything you need, included
                      </p>
                      <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-[#183243] sm:text-[2rem]">
                        Kits, prep essentials, documentation cues, and clear next steps.
                      </h2>
                    </div>
                    <Link
                      href="/shop"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#183243]"
                    >
                      View the catalog
                      <ArrowRight className="h-4 w-4 text-[#4A90D9]" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-8 sm:pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[34px] bg-[#d7efe2] px-5 py-5 sm:px-6 lg:px-8">
            <div className="grid gap-4 lg:grid-cols-4">
              {includedItems.map((item) => (
                <div key={item.title} className="flex gap-4 rounded-[24px] bg-white/80 px-4 py-4 backdrop-blur-sm">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#eff6fb] text-[#4A90D9]">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold text-[#183243]">{item.title}</h2>
                    <p className="mt-1 text-sm leading-6 text-[#607487]">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {categorySections.map((section, index) => (
        <CategoryLandingSection
          key={section.id}
          section={section}
          reverse={index % 2 === 1}
        />
      ))}

      <section className="py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 rounded-[40px] border border-white/80 bg-white/78 p-5 shadow-[0_28px_90px_rgba(22,48,71,0.08)] sm:p-7 lg:grid-cols-[0.88fr_1.12fr] lg:p-8">
            <div className="rounded-[34px] bg-[#183243] p-7 text-white sm:p-8">
              <SectionPill>Built around the buyer journey</SectionPill>
              <h2 className="mt-5 text-3xl font-semibold tracking-[-0.05em] sm:text-4xl lg:text-[3.15rem] lg:leading-[1.02]">
                The structure now explains how Teragenix works before asking for the click.
              </h2>
              <p className="mt-5 text-lg leading-8 text-white/76">
                This mirrors one of the smartest moves on Medvi. Every major section teaches, reassures, and then routes the visitor into one focused action.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {processSteps.map((step, index) => (
                <div key={step.title} className="rounded-[28px] border border-[#e7eef4] bg-[#fbfdff] p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7a8d9f]">0{index + 1}</p>
                  <h3 className="mt-4 text-lg font-semibold text-[#183243]">{step.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#607487]">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[40px] border border-white/80 bg-[linear-gradient(180deg,#fdfefe_0%,#f5f9fc_100%)] p-5 shadow-[0_28px_90px_rgba(22,48,71,0.08)] sm:p-7 lg:p-8">
            <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
              <div>
                <SectionPill>Why the rebuild feels different</SectionPill>
                <h2 className="mt-5 max-w-xl text-3xl font-semibold tracking-[-0.05em] text-[#183243] sm:text-4xl lg:text-[3.1rem] lg:leading-[1.03]">
                  Big sections, repeated proof, and obvious category destinations replace the old subtle tweaks.
                </h2>
                <p className="mt-5 max-w-xl text-lg leading-8 text-[#607487]">
                  That was the whole point. The page needed a visible structural swing, not another round of tiny spacing edits and a slightly different hero.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {standards.map((item) => (
                  <div key={item} className="rounded-[28px] border border-[#e7eef4] bg-white p-6 shadow-[0_14px_32px_rgba(33,64,93,0.05)]">
                    <BadgeCheck className="h-5 w-5 text-[#4A90D9]" />
                    <p className="mt-4 text-base leading-7 text-[#244156]">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 max-w-2xl sm:mb-8">
            <SectionPill>Quality and support framing</SectionPill>
            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.05em] text-[#183243] sm:text-4xl lg:text-[3rem] lg:leading-[1.03]">
              Expert-style reassurance now has its own section instead of getting lost in the footer.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {experts.map((expert) => (
              <div key={expert.name} className="overflow-hidden rounded-[34px] border border-white/80 bg-white shadow-[0_22px_60px_rgba(22,48,71,0.08)]">
                <div className="p-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${BASE_PATH}${expert.image}`}
                    alt={expert.name}
                    className="h-[320px] w-full rounded-[28px] object-cover object-center"
                  />
                </div>
                <div className="px-6 pb-7 pt-2 sm:px-7">
                  <h3 className="text-xl font-semibold text-[#183243]">{expert.name}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#607487]">{expert.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 max-w-2xl sm:mb-8">
            <SectionPill>Testimonials</SectionPill>
            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.05em] text-[#183243] sm:text-4xl lg:text-[3rem] lg:leading-[1.03]">
              The page now earns the testimonial section because the layout actually builds trust first.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {testimonials.map((item) => (
              <div key={item.name} className="rounded-[32px] border border-white/80 bg-white p-6 shadow-[0_18px_48px_rgba(22,48,71,0.07)] sm:p-7">
                <div className="flex gap-1 text-[#4A90D9]">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-5 text-base leading-8 text-[#244156]">“{item.quote}”</p>
                <div className="mt-6 border-t border-[#e8eff5] pt-5">
                  <p className="text-sm font-semibold text-[#183243]">{item.name}</p>
                  <p className="mt-1 text-sm text-[#607487]">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-10 pt-8 sm:pb-14 sm:pt-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[38px] bg-[#183243] px-6 py-8 text-white shadow-[0_28px_80px_rgba(24,50,67,0.24)] sm:px-8 sm:py-10 lg:flex lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <SectionPill>Final CTA</SectionPill>
              <h2 className="mt-5 text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl lg:text-[3rem] lg:leading-[1.03]">
                Start with the category that matches the research goal, then go deeper from there.
              </h2>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:mt-0">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#4A90D9] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#3A7BC8]"
              >
                Shop Teragenix
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#metabolic"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/6 px-7 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Review sections again
              </Link>
            </div>
          </div>
        </div>
      </section>

      <DisclaimerBanner />
      <Footer />
    </main>
  );
}
