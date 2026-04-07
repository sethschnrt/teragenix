import { DisclaimerBanner } from "@/components/disclaimer-banner";
import { Footer } from "@/components/footer";
import { BadgeCheck, FileCheck, Headset, ShieldCheck, Truck } from "lucide-react";
import Link from "next/link";

const BASE_PATH = process.env.NODE_ENV === "production" ? "/teragenix" : "";

const heroPills = ["Metabolic", "Recovery", "Beauty", "Research"];

const valueStrip = [
  { icon: BadgeCheck, title: "99%+ Purity", text: "Clean research-grade presentation" },
  { icon: FileCheck, title: "COA Ready", text: "Documentation-forward positioning" },
  { icon: Truck, title: "Fast Shipping", text: "Discreet domestic fulfillment" },
  { icon: ShieldCheck, title: "Complete Kits", text: "Everything bundled in one order" },
];

const sections = [
  {
    eyebrow: "Metabolic support",
    title: "Structured for weight and metabolic research",
    text: "Use a dedicated landing-style section with a clean image, focused copy, and supporting benefit cards underneath. The goal is to make each category feel intentional instead of dumped into a grid.",
    href: "/shop?category=metabolic",
    cta: "Explore metabolic kits",
    image: "/images/product-tirzepatide.png",
    cards: [
      { title: "Cleaner category framing", text: "Feels closer to premium health than generic supplement ecommerce." },
      { title: "Sharper trust cues", text: "Purity, kits, and documentation are easy to scan fast." },
      { title: "Focused CTA", text: "One clear action tied to one category section." },
    ],
  },
  {
    eyebrow: "Recovery and performance",
    title: "Category storytelling that feels more like a landing page than a shelf",
    text: "This is where the Medvi rhythm really matters. Big image, strong headline, simple support copy, then a short set of reinforcing cards below.",
    href: "/shop",
    cta: "Browse the catalog",
    image: "/images/product-recovery-stack.png",
    cards: [
      { title: "Image-led", text: "The page should breathe instead of throwing products at people immediately." },
      { title: "Trust-first", text: "A calmer brand frame makes the store feel higher quality." },
      { title: "More premium pacing", text: "Section rhythm does a huge amount of heavy lifting." },
    ],
  },
  {
    eyebrow: "Beauty and longevity",
    title: "A softer editorial section for glow and longevity categories",
    text: "This section should mirror the same structure again so the site feels deliberate and consistent: image, copy, CTA, then a row of supporting cards.",
    href: "/shop?category=beauty",
    cta: "See beauty-focused kits",
    image: "/images/hero-vial.png",
    cards: [
      { title: "Better section types", text: "Visitors understand the categories before they ever hit the grid." },
      { title: "Less storefront energy", text: "The brand feels more designed and less transactional." },
      { title: "Reusable pattern", text: "Once one section works, the rest of the homepage follows naturally." },
    ],
  },
];

const proofItems = [
  { icon: ShieldCheck, title: "Purity-forward positioning", text: "Prominent quality framing across the page." },
  { icon: FileCheck, title: "Documentation language", text: "COA and verification cues layered throughout." },
  { icon: Truck, title: "Discreet shipping", text: "Clean domestic fulfillment messaging without clutter." },
  { icon: Headset, title: "Support framing", text: "A more premium, guided customer journey overall." },
];

export default function Home() {
  return (
    <main>
      <section className="relative overflow-hidden py-8 sm:py-12">
        <div className="medvi-shell">
          <div className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
            <div className="space-y-6">
              <span className="medvi-pill">Premium peptide research kits</span>
              <h1 className="max-w-2xl text-4xl font-semibold tracking-[-0.05em] text-[#193042] sm:text-5xl lg:text-[4.3rem] lg:leading-[1.0]">
                Research compounds presented with a cleaner, more trusted flow
              </h1>
              <p className="max-w-xl text-lg leading-8 text-[#607487] sm:text-xl">
                Bigger image-led sections, softer premium layout rhythm, and a category-first homepage structure that feels closer to premium healthcare than generic peptide ecommerce.
              </p>
              <div className="flex flex-wrap gap-3">
                {heroPills.map((pill) => (
                  <span key={pill} className="rounded-full border border-[#d8e6f3] bg-white px-4 py-2 text-sm font-medium text-[#193042] shadow-sm">
                    {pill}
                  </span>
                ))}
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link href="/shop" className="inline-flex items-center justify-center rounded-full bg-[#4A90D9] px-7 py-4 text-base font-semibold text-white shadow-[0_14px_34px_rgba(74,144,217,0.28)] transition hover:bg-[#3A7BC8]">
                  Shop kits
                </Link>
                <Link href="#value-strip" className="inline-flex items-center justify-center rounded-full border border-[#d8e6f3] bg-white px-7 py-4 text-base font-semibold text-[#193042] shadow-sm transition hover:bg-[#f5f9fc]">
                  See why it works
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
              <img src={`${BASE_PATH}/images/hero-doctor.png`} alt="Medical research visual" className="h-[500px] w-full rounded-[28px] object-cover object-top" />
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
        <div className="medvi-shell space-y-18">
          {sections.map((section, index) => (
            <div key={section.title} className="space-y-6">
              <div className={`grid gap-8 lg:grid-cols-2 lg:items-center ${index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                <div className="medvi-card overflow-hidden p-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`${BASE_PATH}${section.image}`} alt={section.title} className="h-[420px] w-full rounded-[28px] object-cover" />
                </div>
                <div className="space-y-5 px-2 sm:px-4 lg:px-8">
                  <span className="medvi-pill">{section.eyebrow}</span>
                  <h2 className="max-w-xl text-3xl font-semibold tracking-[-0.04em] text-[#193042] sm:text-4xl lg:text-[3rem] lg:leading-[1.05]">
                    {section.title}
                  </h2>
                  <p className="max-w-xl text-lg leading-8 text-[#607487]">{section.text}</p>
                  <Link href={section.href} className="inline-flex items-center justify-center rounded-full bg-[#193042] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#102230]">
                    {section.cta}
                  </Link>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-3">
                {section.cards.map((card) => (
                  <div key={card.title} className="medvi-card p-6">
                    <h3 className="text-lg font-semibold text-[#193042]">{card.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-[#607487]">{card.text}</p>
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
              <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[#193042] sm:text-4xl">A dedicated reassurance section before the store takes over</h2>
              <p className="mt-4 text-lg leading-8 text-[#607487]">This is where trust language, quality framing, shipping reassurance, and support cues all stack together before people drop into a product-heavy experience.</p>
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
