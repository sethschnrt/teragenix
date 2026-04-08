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
        bodyText="Teragenix's metabolic kits bring together the highest-purity GLP-1 peptides with every prep essential your lab needs. No piecing supplies together — order once, work immediately."
        subheading="A smarter way to run your metabolic workflow"
        subbody="Every retatrutide, tirzepatide, and semaglutide kit arrives with bacteriostatic water, precision syringes, alcohol swabs, and a reconstitution card. Ready the moment it lands on the bench."
        features={[
          "99%+ purity lab-verified",
          "COA with every batch",
          "Bacteriostatic water included",
          "Precision insulin syringes",
          "Discreet, tracked shipping",
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
        bodyText="Every batch is HPLC-verified, third-party COA documented, and traced from audited manufacturer to sealed delivery. The standards your research deserve."
        subheading="Serious compounds, serious standards"
        subbody="Our suppliers are audited. Our batches are HPLC-tested. Every kit carries a certificate of analysis, so your research starts with documentation, not guesswork."
        features={[
          "HPLC-verified purity",
          "Third-party COA per batch",
          "Audited manufacturer network",
          "Chain-of-custody tracked",
          "Sealed, tamper-evident packaging",
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
