import { DisclaimerBanner } from "@/components/disclaimer-banner";
import { Footer } from "@/components/footer";
import { BadgeCheck, FileCheck, Headset, ShieldCheck, Truck } from "lucide-react";
import Link from "next/link";

const BASE_PATH = process.env.NODE_ENV === "production" ? "/teragenix" : "";

const valueStrip = [
  { icon: BadgeCheck, title: "99%+ Purity", text: "Research-grade product positioning" },
  { icon: FileCheck, title: "COA Ready", text: "Documentation-forward trust cues" },
  { icon: Truck, title: "Discreet Shipping", text: "Fast domestic fulfillment" },
  { icon: ShieldCheck, title: "Complete Kits", text: "Everything bundled in one order" },
];

const stackedSections = [
  {
    eyebrow: "Metabolic support",
    title: "Research kits structured for appetite and metabolic goals",
    text: "This section acts like a mini landing page inside the homepage. A large image, focused category copy, one CTA, and a short row of supporting value cards beneath it.",
    href: "/shop?category=metabolic",
    cta: "Explore metabolic kits",
    image: "/images/product-tirzepatide.png",
    features: [
      "Category-first presentation",
      "Clear trust framing",
      "Cleaner visual hierarchy",
    ],
  },
  {
    eyebrow: "Recovery and performance",
    title: "A calmer way to present recovery-focused compounds and bundles",
    text: "Instead of throwing visitors straight into a product wall, this section gives recovery compounds their own narrative block, image, and CTA, with supporting cards directly underneath.",
    href: "/shop",
    cta: "Browse recovery-ready kits",
    image: "/images/product-recovery-stack.png",
    features: [
      "Image-led storytelling",
      "Premium health-brand pacing",
      "More room for trust cues",
    ],
  },
  {
    eyebrow: "Beauty and longevity",
    title: "Glow and longevity categories framed like premium care offerings",
    text: "This should feel softer and more editorial. Same structure again: big image, category headline, short explanation, CTA, then a small row of cards to reinforce the offer.",
    href: "/shop?category=beauty",
    cta: "See beauty-focused kits",
    image: "/images/hero-vial.png",
    features: [
      "Softer visual tone",
      "Stronger category separation",
      "Reusable homepage pattern",
    ],
  },
];

const proofItems = [
  { icon: ShieldCheck, title: "Purity-first brand frame", text: "Quality language should show up before the storefront feel does." },
  { icon: FileCheck, title: "Documentation cues", text: "COA and verification language should be layered throughout." },
  { icon: Truck, title: "Discreet delivery", text: "Shipping language should feel premium and reassuring." },
  { icon: Headset, title: "Support and trust", text: "The site should feel guided and deliberate, not improvised." },
];

export default function Home() {
  return (
    <main>
      <section className="relative overflow-hidden py-8 sm:py-12">
        <div className="medvi-shell">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div className="space-y-6">
              <span className="medvi-pill">Premium peptide research kits</span>
              <h1 className="max-w-2xl text-4xl font-semibold tracking-[-0.05em] text-[#193042] sm:text-5xl lg:text-[4.1rem] lg:leading-[1.0]">
                Research compounds presented in a cleaner, more trusted format
              </h1>
              <p className="max-w-xl text-lg leading-8 text-[#607487] sm:text-xl">
                The homepage should feel like stacked category landing pages, not just a shop. That means stronger image-led sections, cleaner trust framing, and far less storefront energy at the top.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link href="/shop" className="inline-flex items-center justify-center rounded-full bg-[#4A90D9] px-7 py-4 text-base font-semibold text-white shadow-[0_14px_34px_rgba(74,144,217,0.28)] transition hover:bg-[#3A7BC8]">
                  Shop kits
                </Link>
                <Link href="#value-strip" className="inline-flex items-center justify-center rounded-full border border-[#d8e6f3] bg-white px-7 py-4 text-base font-semibold text-[#193042] shadow-sm transition hover:bg-[#f5f9fc]">
                  See how it works
                </Link>
              </div>
              <div className="flex flex-wrap gap-3 text-sm text-[#607487]">
                <span className="rounded-full border border-[#d8e6f3] bg-white px-4 py-2">COA-backed positioning</span>
                <span className="rounded-full border border-[#d8e6f3] bg-white px-4 py-2">Discreet shipping</span>
                <span className="rounded-full border border-[#d8e6f3] bg-white px-4 py-2">All-in-one kits</span>
              </div>
            </div>

            <div className="medvi-card overflow-hidden p-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${BASE_PATH}/images/hero-doctor.png`} alt="Medical research visual" className="h-[520px] w-full rounded-[28px] object-cover object-top" />
            </div>
          </div>
        </div>
      </section>

      <section id="value-strip" className="py-8 sm:py-10">
        <div className="medvi-shell">
          <div className="medvi-card grid gap-6 px-6 py-8 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
            {valueStrip.map((item) => (
              <div key={item.title} className="rounded-[24px] bg-[#f8fbff] p-5">
                <item.icon className="h-5 w-5 text-[#4A90D9]" />
                <h3 className="mt-4 text-base font-semibold text-[#193042]">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-[#607487]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="medvi-shell space-y-14">
          {stackedSections.map((section, index) => (
            <div key={section.title} className="space-y-6">
              <div className={`grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center ${index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                <div className="medvi-card overflow-hidden p-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`${BASE_PATH}${section.image}`} alt={section.title} className="h-[460px] w-full rounded-[28px] object-cover" />
                </div>
                <div className="space-y-5 px-2 sm:px-4 lg:px-6">
                  <span className="medvi-pill">{section.eyebrow}</span>
                  <h2 className="max-w-xl text-3xl font-semibold tracking-[-0.04em] text-[#193042] sm:text-4xl lg:text-[3.1rem] lg:leading-[1.04]">
                    {section.title}
                  </h2>
                  <p className="max-w-xl text-lg leading-8 text-[#607487]">{section.text}</p>
                  <Link href={section.href} className="inline-flex items-center justify-center rounded-full bg-[#193042] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#102230]">
                    {section.cta}
                  </Link>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-3">
                {section.features.map((feature) => (
                  <div key={feature} className="medvi-card p-6">
                    <h3 className="text-lg font-semibold text-[#193042]">{feature}</h3>
                    <p className="mt-3 text-sm leading-7 text-[#607487]">
                      Supporting micro-benefit card placed directly beneath the section to match the stacked landing-page rhythm more closely.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20">
        <div className="medvi-shell">
          <div className="medvi-card px-6 py-10 sm:px-10">
            <div className="mb-8 max-w-2xl">
              <span className="medvi-pill mb-4">Proof and reassurance</span>
              <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[#193042] sm:text-4xl">
                Proof should come before the hard storefront energy
              </h2>
              <p className="mt-4 text-lg leading-8 text-[#607487]">
                Before visitors hit dense product shopping, the page should reinforce purity, documentation, shipping, and support with a dedicated reassurance block.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {proofItems.map((item) => (
                <div key={item.title} className="rounded-[24px] bg-[#f8fbff] p-5">
                  <item.icon className="h-5 w-5 text-[#4A90D9]" />
                  <h3 className="mt-4 text-base font-semibold text-[#193042]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#607487]">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <DisclaimerBanner />
      <Footer />
    </main>
  );
}
