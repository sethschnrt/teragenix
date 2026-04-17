import { Hero } from "@/components/hero";
import { TrustBar } from "@/components/trust-bar";
import { EditorialSection } from "@/components/editorial-section";
import { FeaturedProducts } from "@/components/featured-products";
import { HowItWorks } from "@/components/how-it-works";
import { Guarantee } from "@/components/guarantee";
import { DisclaimerBanner } from "@/components/disclaimer-banner";
import { Footer } from "@/components/footer";

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

      <EditorialSection
        eyebrow="BODY COMPOSITION"
        headline="For buyers chasing visible progress, not more guesswork."
        accentPhrase="visible progress"
        accentColor={BLUE_PRIMARY}
        haloColor={HALO_SKY}
        bodyText="Retatrutide and tesamorelin fit the buyer who wants to see movement, stay consistent, and compare options without piecing together ten different sources."
        subheading="What matters here"
        subbody="When product details, specs, and documentation are visible up front, it is easier to decide and easier to keep moving."
        features={[
          "Peptides organized around body-composition goals",
          "Product details shown up front",
          "Format + quantity easy to compare",
          "Storage guidance on-page",
          "Documentation status visible",
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

      <EditorialSection
        eyebrow="PROOF BEFORE PURCHASE"
        headline="Less vendor fluff. More you can check for yourself."
        accentPhrase="More you can check for yourself"
        accentColor={BLUE_SKY}
        haloColor={HALO_STEEL}
        bodyText="The buyer does not want another vague peptide page. Teragenix works best when the specs, batch-linked documentation, and product details are close to the product and easy to verify."
        subheading="Why this converts"
        subbody="Clear proof reduces hesitation. It helps the cautious buyer compare faster, trust more, and hit checkout with fewer question marks."
        features={[
          "Batch-linked documentation status",
          "Product details shown upfront",
          "Storage notes close to the product",
          "Format and quantity visible",
          "Support + policy pages easy to reach",
          "Research-use positioning kept clear",
        ]}
        cardTitle="What reduces hesitation:"
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
