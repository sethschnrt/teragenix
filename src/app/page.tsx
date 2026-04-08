import { Hero } from "@/components/hero";
import { TrustBar } from "@/components/trust-bar";
import { EditorialSection } from "@/components/editorial-section";
import { Guarantee } from "@/components/guarantee";
import { DisclaimerBanner } from "@/components/disclaimer-banner";
import { Footer } from "@/components/footer";

// Brand blue accents (all sections stay within Teragenix blue family)
const BLUE_PRIMARY = "#3b6ed6";
const BLUE_DEEP = "#1e4a9e";
const BLUE_STEEL = "#2d5bbf";
const BLUE_SKY = "#4a8dd9";

const HALO_SKY = "#dbeafe";
const HALO_ICE = "#e6f2fb";
const HALO_CLOUD = "#eef4fc";
const HALO_STEEL = "#dde5f0";

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustBar />

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
        ctaHref="/shop?category=metabolic"
        image1="/images/generated/lifestyle-v1-cutout/metabolic-1-hero.png"
        image2="/images/generated/lifestyle-v1/metabolic-2-couple-walking.png"
        image3="/images/generated/lifestyle-v1/metabolic-3-family-dinner.png"
        badgeLabel="BEST SELLER"
        background="white"
      />

      {/* Section 2 — Peptides & Recovery */}
      <EditorialSection
        eyebrow="PEPTIDES & RECOVERY"
        headline="Targeted support for recovery and performance."
        accentPhrase="Targeted support"
        accentColor={BLUE_DEEP}
        haloColor={HALO_ICE}
        bodyText="From recovery-focused BPC-157 and TB-500 to growth-pathway workhorses like Sermorelin and Ipamorelin — every kit is laboratory-ready from the moment it arrives."
        subheading="Support that works below the surface"
        subbody="Peptide therapy is studied for how the body recovers, performs, and repairs over time. Teragenix pairs pharmaceutical-grade compounds with the prep tools your research protocol demands."
        features={[
          "Recovery (BPC-157, TB-500)",
          "Performance (CJC-1295, Ipamorelin)",
          "Growth pathway (Sermorelin, MK-677)",
          "Strength (Tesamorelin)",
          "COA verified 99%+ purity",
        ]}
        cardTitle="Targeted compounds for every protocol:"
        ctaLabel="Shop peptides"
        ctaHref="/shop?category=longevity"
        image1="/images/generated/lifestyle-v1-cutout/recovery-1-hero.png"
        image2="/images/generated/lifestyle-v1/recovery-2-trail-run.png"
        image3="/images/generated/lifestyle-v1/recovery-3-foam-roll.png"
        reverse
        background="cream"
      />

      {/* Section 3 — Complete Kits */}
      <EditorialSection
        eyebrow="COMPLETE RESEARCH KITS"
        headline="One box. Everything your lab needs."
        accentPhrase="Everything"
        accentColor={BLUE_STEEL}
        haloColor={HALO_CLOUD}
        bodyText="Every Teragenix kit ships with the compound, bacteriostatic water, precision syringes, and alcohol swabs — inspected and bundled before it leaves the lab. No scavenger hunt across five vendors, no missing supplies."
        subheading="Lab-ready from the moment it arrives"
        subbody="Every kit is inspected, sealed, and tracked. When your box lands, you open it and run your protocol — no delays, no half-finished setups, no waiting on bac water from a second supplier."
        features={[
          "Compound vial (99%+ purity)",
          "Bacteriostatic water",
          "Precision insulin syringes",
          "Alcohol prep pads",
          "Reconstitution reference card",
        ]}
        cardTitle="Inside every Teragenix kit:"
        ctaLabel="Browse all kits"
        ctaHref="/shop"
        image1="/images/generated/lifestyle-v1-cutout/kits-1-hero.png"
        image2="/images/generated/lifestyle-v1/kits-2-pipette.png"
        image3="/images/generated/lifestyle-v1/kits-3-coa-paper.png"
        background="white"
      />

      {/* Section 4 — Quality standards */}
      <EditorialSection
        eyebrow="QUALITY STANDARDS"
        headline="Lab-verified. Independently tested."
        accentPhrase="Independently tested"
        accentColor={BLUE_SKY}
        haloColor={HALO_STEEL}
        bodyText="Every batch is HPLC-verified, third-party COA documented, and traced from audited manufacturer to sealed delivery. The standards your research deserves."
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

      <Guarantee />
      <DisclaimerBanner />
      <Footer />
    </main>
  );
}
