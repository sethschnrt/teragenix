import { Hero } from "@/components/hero";
import { TrustBar } from "@/components/trust-bar";
import { EditorialSection } from "@/components/editorial-section";
import { FeaturedProducts } from "@/components/featured-products";
import { HowItWorks } from "@/components/how-it-works";
import { Guarantee } from "@/components/guarantee";
import { DisclaimerBanner } from "@/components/disclaimer-banner";
import { Footer } from "@/components/footer";

// Brand blue accents (all sections stay within Teragenix blue family)
const BLUE_PRIMARY = "#3b6ed6";
const BLUE_SKY = "#4a8dd9";

const HALO_SKY = "#dbeafe";
const HALO_STEEL = "#dde5f0";

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustBar />
      <FeaturedProducts />

      {/* Section 1 — Metabolic */}
      <EditorialSection
        eyebrow="FAT LOSS RESEARCH"
        headline="Metabolic and body-composition research, built into complete kits."
        accentPhrase="complete kits"
        accentColor={BLUE_PRIMARY}
        haloColor={HALO_SKY}
        bodyText="Retatrutide and tesamorelin kits are positioned for metabolic and body-composition research, with the compound, prep essentials, and key specs kept together in one box."
        subheading="Built for cleaner prep"
        subbody="Instead of chasing down supplies separately, each kit keeps the essentials together so the product benefit stays front and center from the first glance."
        features={[
          "Metabolic research focus",
          "Included prep essentials",
          "Clear storage guidance",
          "Visible format + quantity",
          "Research-use-only framing",
        ]}
        cardTitle="Why these kits stand out:"
        ctaLabel="Browse fat loss kits"
        ctaHref="/shop?category=fat-loss"
        image1="/images/generated/refresh-v1/metabolic-hero-tight.webp"
        image2="/images/generated/lifestyle-v1/metabolic-2-couple-walking.webp"
        image3="/images/generated/lifestyle-v1/metabolic-3-family-dinner.webp"
        heroMode="framed"
        background="white"
      />

      {/* Section 2 — Quality standards */}
      <EditorialSection
        eyebrow="PRODUCT CONFIDENCE"
        headline="Purity, storage, and batch visibility where they matter."
        accentPhrase="where they matter"
        accentColor={BLUE_SKY}
        haloColor={HALO_STEEL}
        bodyText="The strongest product story is simple: visible specs, batch-linked documentation status, and clear handling guidance tied directly to the kit."
        subheading="Why buyers care"
        subbody="When purity, storage, and documentation stay close to the product, confidence comes from what the kit actually offers, not from inflated marketing language."
        features={[
          "Purity and format shown clearly",
          "Batch-linked documentation status",
          "Storage notes on-page",
          "Kit contents shown upfront",
          "Calm, specific product language",
        ]}
        cardTitle="What builds confidence:"
        ctaLabel="View batch docs"
        ctaHref="/coa"
        image1="/images/generated/lifestyle-v1-cutout/quality-1-hero.webp"
        image2="/images/generated/lifestyle-v1/quality-2-glassware.webp"
        image3="/images/generated/lifestyle-v1/quality-3-yoga-couple.webp"
        reverse
        background="cream"
      />

      <HowItWorks />
      <Guarantee />
      <DisclaimerBanner />
      <Footer />
    </main>
  );
}
