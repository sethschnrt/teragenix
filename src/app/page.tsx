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
        eyebrow="RESEARCH-GRADE GLP-1 COMPOUNDS"
        headline="Metabolic research, made easier."
        accentPhrase="made easier"
        accentColor={BLUE_PRIMARY}
        haloColor={HALO_SKY}
        bodyText="Teragenix's metabolic kits are being presented as a cleaner, easier-to-compare storefront category with stronger product framing and less clutter."
        subheading="A smarter way to run your metabolic workflow"
        subbody="Retatrutide, tirzepatide, and semaglutide are positioned here as a focused category with clearer product hierarchy and more readable kit presentation."
        features={[
          "Clear category framing",
          "Documentation-led trust",
          "Complete kit positioning",
          "Stronger product hierarchy",
          "Cleaner storefront flow",
        ]}
        cardTitle="Everything you need — included:"
        ctaLabel="Shop metabolic kits"
        ctaHref="/shop?category=fat-loss"
        image1="/images/generated/refresh-v1/metabolic-hero-tight.png"
        image2="/images/generated/lifestyle-v1/metabolic-2-couple-walking.png"
        image3="/images/generated/lifestyle-v1/metabolic-3-family-dinner.png"
        heroMode="framed"
        background="white"
      />

      {/* Section 2 — Quality standards */}
      <EditorialSection
        eyebrow="QUALITY STANDARDS"
        headline="Lab-verified. Independently tested."
        accentPhrase="Independently tested"
        accentColor={BLUE_SKY}
        haloColor={HALO_STEEL}
        bodyText="The quality story should feel clear, documented, and visually consistent across the storefront instead of relying on inflated trust language."
        subheading="Serious compounds, serious standards"
        subbody="This section is meant to communicate standards through cleaner structure, clearer documentation language, and better merchandising discipline."
        features={[
          "Quality-first framing",
          "Clearer documentation language",
          "More credible trust signals",
          "Tighter visual hierarchy",
          "Less cluttered messaging",
        ]}
        cardTitle="Our quality promise:"
        ctaLabel="Read quality standards"
        ctaHref="/about"
        image1="/images/generated/lifestyle-v1-cutout/quality-1-hero.png"
        image2="/images/generated/lifestyle-v1/quality-2-glassware.png"
        image3="/images/generated/lifestyle-v1/quality-3-yoga-couple.png"
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
