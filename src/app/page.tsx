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
        eyebrow="BODY COMPOSITION"
        headline="Premium peptides for body-composition focused protocols."
        accentPhrase="body-composition focused protocols"
        accentColor={BLUE_PRIMARY}
        haloColor={HALO_SKY}
        bodyText="Retatrutide and tesamorelin are positioned for buyers chasing a sharper body-composition edge, with the compound, prep essentials, and key specs kept together in one premium kit."
        subheading="Why the kit matters"
        subbody="When the peptide, prep supplies, and specs all show up together, the product feels more serious, more complete, and easier to act on."
        features={[
          "Premium compounds for leaner protocols",
          "Included prep essentials",
          "Clear storage guidance",
          "Visible format + quantity",
          "Supporting documentation status",
        ]}
        cardTitle="What you get in one box:"
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
        eyebrow="PREMIUM STANDARD"
        headline="Better compounds. Better kits. Better supporting proof."
        accentPhrase="Better supporting proof"
        accentColor={BLUE_SKY}
        haloColor={HALO_STEEL}
        bodyText="Teragenix is strongest when the product itself does the selling: premium peptides, complete kits, visible specs, and batch-linked documentation that backs up the promise."
        subheading="The selling point, in one line"
        subbody="You are not buying a loose vial and a bunch of question marks. You are buying a more complete peptide kit with clearer proof behind it."
        features={[
          "Premium compounds for specific goals",
          "Complete kit format",
          "Batch-linked documentation status",
          "Storage notes on-page",
          "Kit contents shown upfront",
          "Visible purity + format",
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
