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
        eyebrow="METABOLIC RESEARCH"
        headline="Metabolic kits, organized for faster selection."
        accentPhrase="faster selection"
        accentColor={BLUE_PRIMARY}
        haloColor={HALO_SKY}
        bodyText="Compare retatrutide, tesamorelin, and adjacent metabolic kits with visible format, included supplies, and pricing in one cleaner category."
        subheading="Everything easier to verify"
        subbody="Each listing makes it easier to confirm what is in the box, how the kit is formatted, and whether it fits your lab workflow before you go deeper."
        features={[
          "Price + format in one view",
          "Included prep essentials",
          "Clear storage guidance",
          "Category-first browsing",
          "Research-use-only framing",
        ]}
        cardTitle="What you can verify fast:"
        ctaLabel="Browse metabolic kits"
        ctaHref="/shop?category=fat-loss"
        image1="/images/generated/refresh-v1/metabolic-hero-tight.webp"
        image2="/images/generated/lifestyle-v1/metabolic-2-couple-walking.webp"
        image3="/images/generated/lifestyle-v1/metabolic-3-family-dinner.webp"
        heroMode="framed"
        background="white"
      />

      {/* Section 2 — Quality standards */}
      <EditorialSection
        eyebrow="QUALITY STANDARDS"
        headline="Documentation, closer to the product."
        accentPhrase="closer to the product"
        accentColor={BLUE_SKY}
        haloColor={HALO_STEEL}
        bodyText="Serious buyers want specs, batch context, and kit contents where they can actually use them, not buried under hype."
        subheading="Why that matters before checkout"
        subbody="When documentation, storage notes, and included supplies are visible early, comparison gets easier and support questions shrink."
        features={[
          "Purity and format shown clearly",
          "Batch-linked documentation status",
          "Storage notes on-page",
          "Support pages easy to reach",
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
