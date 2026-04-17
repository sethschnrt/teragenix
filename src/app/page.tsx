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
        headline="For people trying to finally see movement."
        accentPhrase="finally see movement"
        accentColor={BLUE_PRIMARY}
        haloColor={HALO_SKY}
        bodyText="Retatrutide and tesamorelin stand out for people chasing body-comp progress and trying to stop spinning their wheels."
        subheading="What matters here"
        subbody="You should be able to see the format, quantity, storage notes, and docs without opening ten tabs."
        features={[
          "Body-comp peptides grouped together",
          "Product details shown up front",
          "Clear storage guidance",
          "Visible format + quantity",
          "Supporting documentation status",
        ]}
        cardTitle="What helps you decide faster:"
        ctaLabel="Browse fat loss peptides"
        ctaHref="/shop?category=fat-loss"
        image1="/images/generated/refresh-v1/metabolic-hero-tight.webp"
        image2="/images/generated/lifestyle-v1/metabolic-2-couple-walking.webp"
        image3="/images/generated/lifestyle-v1/metabolic-3-family-dinner.webp"
        heroMode="framed"
        background="white"
      />

      {/* Section 2 — Quality standards */}
      <EditorialSection
        eyebrow="PROOF BEFORE PURCHASE"
        headline="Less vague marketing. More you can actually check."
        accentPhrase="More you can actually check"
        accentColor={BLUE_SKY}
        haloColor={HALO_STEEL}
        bodyText="Nobody wants to dig through fluff just to figure out what they are buying. Put the specs, batch status, and storage notes next to the product and let people verify it fast."
        subheading="Why this converts"
        subbody="When the details are obvious, it is easier to trust what you are looking at and easier to move forward."
        features={[
          "Batch-linked documentation status",
          "Product details shown up front",
          "Storage notes close to the product",
          "Format and quantity visible",
          "Support + policy pages easy to reach",
          "Research-use positioning kept clear",
        ]}
        cardTitle="What people look for first:"
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
