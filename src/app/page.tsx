import { Hero } from "@/components/hero";
import { TrustBar } from "@/components/trust-bar";
import { EditorialSection } from "@/components/editorial-section";
import { Guarantee } from "@/components/guarantee";
import { DisclaimerBanner } from "@/components/disclaimer-banner";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustBar />

      {/* Section 1 — Weight Loss (Metabolic) */}
      <EditorialSection
        eyebrow="RESEARCH-GRADE GLP-1 COMPOUNDS"
        headline="Metabolic research, made easier."
        accentPhrase="made easier"
        accentColor="#2e936f"
        haloColor="#d6f2da"
        bodyText="Teragenix's metabolic kits bring together the highest-purity GLP-1 peptides with every prep essential your lab needs. No piecing supplies together — order once, work immediately."
        subheading="A smarter way to run your metabolic lab workflow"
        subbody="Every retatrutide, tirzepatide, and tesamorelin kit arrives with bacteriostatic water, precision syringes, alcohol swabs, and a reconstitution card. Ready the moment it lands on the bench."
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
        image1="/images/vials/tg/retatrutide.png"
        image2="/images/vials/tg/tesamorelin.png"
        image3="/images/vials/tg/tirzepatide.png"
        badgeLabel="BEST SELLER"
        background="white"
      />

      {/* Section 2 — Peptides & Longevity */}
      <EditorialSection
        eyebrow="PEPTIDES & LONGEVITY"
        headline="Targeted support for recovery and performance."
        accentPhrase="Targeted support"
        accentColor="#7aa5c9"
        haloColor="#e5f2f2"
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
        image1="/images/vials/tg/bpc-157.png"
        image2="/images/vials/tg/tb-500.png"
        image3="/images/vials/tg/recovery-stack.png"
        reverse
        background="cream"
      />

      {/* Section 3 — Beauty & Skin */}
      <EditorialSection
        eyebrow="BEAUTY & SKIN"
        headline="Radiant research, backed by the lab."
        accentPhrase="Radiant research"
        accentColor="#c27ba0"
        haloColor="#f2e6ec"
        bodyText="Glutathione, GHK-Cu, and the Teragenix Glow-70 stack — the beauty and skin peptides pharmaceutical research teams reach for, bundled clean and ready for the bench."
        subheading="Studied for luminous, lasting results"
        subbody="Teragenix's beauty kits include high-purity compounds for skin-tone research, oxidative stress studies, and longevity-focused protocols. All sourced from audited facilities."
        features={[
          "Glutathione (antioxidant pathways)",
          "GHK-Cu (collagen research)",
          "Melanotan II (pigmentation studies)",
          "Glow-70 complete stack",
          "Sealed, batch-tested delivery",
        ]}
        cardTitle="Beauty protocol kits, ready to run:"
        ctaLabel="Shop beauty & skin"
        ctaHref="/shop?category=beauty"
        image1="/images/vials/tg/glutathione.png"
        image2="/images/vials/tg/ghk-cu.png"
        image3="/images/vials/tg/melanotan-ii.png"
        background="white"
      />

      {/* Section 4 — Research Specialty */}
      <EditorialSection
        eyebrow="RESEARCH SPECIALTY"
        headline="Specialty compounds, lab-ready from day one."
        accentPhrase="lab-ready"
        accentColor="#c6a673"
        haloColor="#f2ebe1"
        bodyText="Epithalon, Semax, Selank, PT-141 — the specialty compounds your lab needs for nootropic, neuropeptide, and exploratory protocols, all delivered complete."
        subheading="Small, focused batches — serious standards"
        subbody="Every Teragenix specialty kit ships with third-party COA documentation, HPLC-verified purity, and the prep supplies your team expects — so research time isn't lost to logistics."
        features={[
          "Epithalon (longevity studies)",
          "PT-141 (exploratory research)",
          "Semax & Selank (nootropic research)",
          "HPLC-verified batches",
          "Third-party COA with every kit",
        ]}
        cardTitle="Specialty kits for focused research:"
        ctaLabel="Shop research compounds"
        ctaHref="/shop?category=research"
        image1="/images/vials/tg/epithalon.png"
        image2="/images/vials/tg/pt-141.png"
        image3="/images/vials/tg/semax.png"
        reverse
        background="cream"
      />

      <Guarantee />
      <DisclaimerBanner />
      <Footer />
    </main>
  );
}
