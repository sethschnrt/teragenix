import { DisclaimerBanner } from "@/components/disclaimer-banner";
import { Footer } from "@/components/footer";
import { BadgeCheck, FileCheck, Headset, ShieldCheck, Stethoscope, Truck } from "lucide-react";
import Link from "next/link";

const BASE_PATH = process.env.NODE_ENV === "production" ? "/teragenix" : "";

const valueStrip = [
  { icon: BadgeCheck, title: "99%+ purity", text: "Research-grade positioning" },
  { icon: FileCheck, title: "COA ready", text: "Verification-forward language" },
  { icon: Truck, title: "Fast shipping", text: "Discreet domestic delivery" },
  { icon: ShieldCheck, title: "Complete kits", text: "Everything bundled" },
];

const landingSections = [
  {
    eyebrow: "Metabolic support",
    title: "Weight and metabolic research, presented like a premium category page",
    body:
      "This block should read like a mini landing page: bold category promise, big image, concise support copy, and a single CTA that keeps attention narrow.",
    href: "/shop?category=metabolic",
    cta: "Explore metabolic kits",
    image: "/images/product-tirzepatide.png",
    cards: [
      "Clear category story",
      "Less storefront clutter",
      "Better trust framing",
    ],
  },
  {
    eyebrow: "Recovery and performance",
    title: "A dedicated homepage section for compounds tied to repair and performance goals",
    body:
      "This section repeats the same rhythm. That repetition is the point. Medvi feels polished because each category gets a real landing treatment, not because of the palette alone.",
    href: "/shop",
    cta: "Browse all research kits",
    image: "/images/product-recovery-stack.png",
    cards: [
      "Image-led layout",
      "Focused CTA",
      "Premium pacing",
    ],
  },
  {
    eyebrow: "Beauty and longevity",
    title: "A softer section for glow and longevity categories with the same structural rhythm",
    body:
      "Use the same modular pattern again so the homepage becomes a stack of category landing pages instead of one generic sales page with disconnected sections.",
    href: "/shop?category=beauty",
    cta: "See beauty-focused kits",
    image: "/images/hero-vial.png",
    cards: [
      "Editorial feel",
      "Category separation",
      "Reusable structure",
    ],
  },
];

const proofItems = [
  "Purity-first messaging",
  "COA and documentation cues",
  "Discreet shipping language",
  "Support-oriented reassurance",
];

const testimonialCards = [
  {
    quote: "The homepage should feel like a premium health brand first and a store second.",
    name: "Positioning target",
  },
  {
    quote: "Big visual sections with calmer pacing make the products feel more premium before anyone even clicks a listing.",
    name: "Layout goal",
  },
  {
    quote: "The category sections should do the selling, not just the product cards.",
    name: "Conversion principle",
  },
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
                A homepage built like stacked category landing pages
              </h1>
              <p className="max-w-xl text-lg leading-8 text-[#607487] sm:text-xl">
                Bigger image-led sections, clearer trust framing, and repeated mini-landing-page blocks so Teragenix feels deliberate, premium, and medically adjacent.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link href="/shop" className="inline-flex items-center justify-center rounded-full bg-[#4A90D9] px-7 py-4 text-base font-semibold text-white shadow-[0_14px_34px_rgba(74,144,217,0.28)] transition hover:bg-[#3A7BC8]">
                  Shop kits
                </Link>
                <Link href="#value-strip" className="inline-flex items-center justify-center rounded-full border border-[#d8e6f3] bg-white px-7 py-4 text-base font-semibold text-[#193042] shadow-sm transition hover:bg-[#f5f9fc]">
                  See the structure
                </Link>
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
        <div className="medvi-shell space-y-16">
          {landingSections.map((section, index) => (
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
                  <p className="max-w-xl text-lg leading-8 text-[#607487]">{section.body}</p>
                  <Link href={section.href} className="inline-flex items-center justify-center rounded-full bg-[#193042] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#102230]">
                    {section.cta}
                  </Link>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-3">
                {section.cards.map((card) => (
                  <div key={card} className="medvi-card p-6">
                    <h3 className="text-lg font-semibold text-[#193042]">{card}</h3>
                    <p className="mt-3 text-sm leading-7 text-[#607487]">
                      Supporting mini-card directly under the category section, matching the stacked landing-page rhythm more closely.
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
            <span className="medvi-pill mb-4">Proof and reassurance</span>
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[#193042] sm:text-4xl">
                  A dedicated reassurance block before the page gets store-heavy
                </h2>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-[#607487]">
                  This is where purity, documentation, delivery, and support all stack together so trust shows up repeatedly throughout the homepage instead of getting buried at the bottom.
                </p>
              </div>
              <div className="grid gap-4">
                {proofItems.map((item) => (
                  <div key={item} className="rounded-[22px] bg-[#f8fbff] px-5 py-4 text-sm font-medium text-[#193042]">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="medvi-shell">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="medvi-card p-8 sm:p-10">
              <span className="medvi-pill mb-4">Expert credibility style section</span>
              <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[#193042] sm:text-4xl">
                Another stacked section before the catalog takes over
              </h2>
              <p className="mt-4 text-lg leading-8 text-[#607487]">
                Medvi keeps stacking structured sections, and that repetition is what makes the page feel built rather than assembled. Teragenix should do the same with trust, quality, and support language adapted to the brand.
              </p>
            </div>
            <div className="medvi-card p-6 sm:p-8">
              <div className="flex items-center gap-3 text-[#4A90D9]">
                <Stethoscope className="h-5 w-5" />
                <span className="text-sm font-semibold uppercase tracking-[0.18em]">Guided brand frame</span>
              </div>
              <p className="mt-5 text-lg leading-8 text-[#607487]">
                This slot can later become a stronger authority / process / expert-style section once the structure is locked.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="medvi-shell">
          <div className="mb-8 max-w-2xl">
            <span className="medvi-pill mb-4">Social proof section</span>
            <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[#193042] sm:text-4xl">One more full-width section before the footer</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {testimonialCards.map((card) => (
              <div key={card.name} className="medvi-card p-6">
                <p className="text-base leading-8 text-[#193042]">“{card.quote}”</p>
                <p className="mt-5 text-sm font-semibold text-[#4A90D9]">{card.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <DisclaimerBanner />
      <Footer />
    </main>
  );
}
