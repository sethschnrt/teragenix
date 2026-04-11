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
        eyebrow="METABOLIC CATEGORY"
        headline="Metabolic research, organized for faster comparison."
        accentPhrase="faster comparison"
        accentColor={BLUE_PRIMARY}
        haloColor={HALO_SKY}
        bodyText="Retatrutide, tesamorelin, and adjacent peptide kits are grouped into a cleaner metabolic category with visible specs, prep essentials, and a faster comparison flow."
        subheading="Built to reduce guesswork"
        subbody="Instead of making visitors piece together basics across multiple listings, Teragenix presents each kit in a more structured format with clearer documentation and easier category scanning."
        features={[
          "Visible purity + quantity specs",
          "Full kit contents on-page",
          "Clear storage guidance",
          "Category-first browsing",
          "Research-use framing",
        ]}
        cardTitle="What you see up front:"
        ctaLabel="Shop metabolic kits"
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
        headline="Proof-first. Cleaner standards."
        accentPhrase="Cleaner standards"
        accentColor={BLUE_SKY}
        haloColor={HALO_STEEL}
        bodyText="Trust should come from batch context, handling guidance, and product pages that show exactly what is included, not inflated outcome language."
        subheading="What serious buyers actually look for"
        subbody="The strongest quality signal is simple: clear specs, visible kit contents, consistent research-use language, and documentation positioned close to the product."
        features={[
          "Purity targets shown on-page",
          "Batch and handling context",
          "Complete kit breakdowns",
          "Support pages linked clearly",
          "Credible language over hype",
        ]}
        cardTitle="Standards that matter:"
        ctaLabel="Read quality standards"
        ctaHref="/about"
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
