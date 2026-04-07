import { DisclaimerBanner } from "@/components/disclaimer-banner";
import { Footer } from "@/components/footer";
import {
  ArrowRight,
  BadgeCheck,
  ClipboardCheck,
  FileCheck,
  FlaskConical,
  HeartPulse,
  Microscope,
  ShieldCheck,
  Sparkles,
  Star,
  Stethoscope,
  Truck,
} from "lucide-react";
import Link from "next/link";

const BASE_PATH = process.env.NODE_ENV === "production" ? "/teragenix" : "";

const categoryPills = [
  "Metabolic Kits",
  "Recovery Peptides",
  "Glow Protocols",
  "Longevity Research",
  "Lab Essentials",
  "Bundle Savings",
];

const valueStrip = [
  { icon: BadgeCheck, title: "99%+ purity", text: "Research-grade sourcing" },
  { icon: FileCheck, title: "COA backed", text: "Documentation ready" },
  { icon: Truck, title: "Fast domestic ship", text: "Discreet fulfillment" },
  { icon: ShieldCheck, title: "Complete kits", text: "Everything bundled" },
];

const categorySections = [
  {
    id: "metabolic",
    eyebrow: "Metabolic support",
    title: "Weight-management research kits laid out like a dedicated destination page",
    body:
      "Instead of one generic storefront block, this section sells the category on its own with a bold promise, a big image, supporting proof cards, and a single CTA.",
    href: "/shop?category=metabolic",
    cta: "Shop metabolic kits",
    image: "/images/vials/tirzepatide.png",
    stats: ["Semaglutide", "Tirzepatide", "Retatrutide"],
    cards: [
      {
        icon: HeartPulse,
        title: "Structured category story",
        text: "Clear positioning for appetite, glucose, and metabolic-support research lines.",
      },
      {
        icon: ClipboardCheck,
        title: "Protocol-ready bundles",
        text: "Kits grouped so shoppers understand what belongs together faster.",
      },
      {
        icon: FlaskConical,
        title: "Flagship compounds up front",
        text: "High-interest metabolic products featured above the fold of the section.",
      },
    ],
  },
  {
    id: "recovery",
    eyebrow: "Recovery and repair",
    title: "Repair-focused peptides get their own large-format section instead of being buried in the grid",
    body:
      "This repeats the same rhythm on purpose. Big image, strong copy, one CTA, and supporting cards. That repetition is what makes the homepage feel intentionally built.",
    href: "/shop?category=recovery",
    cta: "Explore recovery kits",
    image: "/images/vials/recovery-stack.png",
    stats: ["BPC-157", "TB-500", "Tesamorelin"],
    cards: [
      {
        icon: BadgeCheck,
        title: "High-trust pacing",
        text: "Less clutter, more room to explain why recovery stacks matter.",
      },
      {
        icon: Microscope,
        title: "Research-first framing",
        text: "Language stays in the lab lane while still feeling premium and polished.",
      },
      {
        icon: Truck,
        title: "Quick path to purchase",
        text: "One focused action keeps attention on the category instead of scattering it.",
      },
    ],
  },
  {
    id: "beauty",
    eyebrow: "Glow and longevity",
    title: "A softer editorial-style block for beauty, skin, and longevity research categories",
    body:
      "The third stacked mini-landing section makes the page feel unmistakably different from the old homepage. It slows the pace down and gives the catalog a premium health-brand feel.",
    href: "/shop?category=beauty",
    cta: "See glow protocols",
    image: "/images/vials/glow-70.png",
    stats: ["GHK-Cu", "Glutathione", "Epithalon"],
    cards: [
      {
        icon: Sparkles,
        title: "Editorial category treatment",
        text: "Beauty and longevity products feel like a real destination, not leftovers.",
      },
      {
        icon: FileCheck,
        title: "Proof built into layout",
        text: "Supporting claims sit directly under the hero content for the section.",
      },
      {
        icon: Stethoscope,
        title: "Premium med-brand tone",
        text: "Closer to a polished health homepage than a basic supplement storefront.",
      },
    ],
  },
];

const reassuranceItems = [
  "Third-party verification cues and COA-forward language",
  "Discreet U.S. fulfillment with kit completeness emphasized",
  "Research-use disclaimers kept present without wrecking the premium feel",
  "Support and documentation repeated before the shopper reaches the footer",
];

const expertPoints = [
  "Category pages organized around how researchers actually shop",
  "Quality controls and sourcing language repeated across the homepage",
  "Medical-adjacent visual structure without making prohibited treatment claims",
  "Designed to feel more like a premium care platform than a commodity peptide grid",
];

const testimonials = [
  {
    quote: "The new homepage finally feels like a brand with category destinations instead of a plain storefront.",
    name: "Alex M.",
    label: "Metabolic shopper",
  },
  {
    quote: "Those stacked sections make the product catalog feel much more premium before I ever click into a SKU.",
    name: "Jordan R.",
    label: "Repeat customer",
  },
  {
    quote: "Trust signals show up early and often now, which makes the page feel far more deliberate.",
    name: "Casey L.",
    label: "First-time buyer",
  },
];

export default function Home() {
  return (
    <main>
      <section className="relative overflow-hidden pb-10 pt-8 sm:pb-14 sm:pt-12">
        <div className="medvi-shell">
          <div className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
            <div className="space-y-7">
              <div className="space-y-4">
                <span className="medvi-pill">Premium peptide research kits</span>
                <h1 className="max-w-3xl text-4xl font-semibold tracking-[-0.06em] text-[#193042] sm:text-5xl lg:text-[4.35rem] lg:leading-[0.98]">
                  Research categories, rebuilt to feel like a premium care-style homepage.
                </h1>
                <p className="max-w-xl text-lg leading-8 text-[#607487] sm:text-xl">
                  Teragenix now opens with category-led browsing, stronger trust framing, and repeated image-heavy landing sections instead of one subtle hero and a few generic cards.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {categoryPills.map((pill) => (
                  <span
                    key={pill}
                    className="inline-flex items-center rounded-full border border-[#d8e6f3] bg-white px-4 py-2 text-sm font-medium text-[#193042] shadow-sm"
                  >
                    {pill}
                  </span>
                ))}
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center rounded-full bg-[#4A90D9] px-7 py-4 text-base font-semibold text-white shadow-[0_16px_34px_rgba(74,144,217,0.28)] transition hover:bg-[#3A7BC8]"
                >
                  Shop all kits
                </Link>
                <Link
                  href="#metabolic"
                  className="inline-flex items-center justify-center rounded-full border border-[#d8e6f3] bg-white px-7 py-4 text-base font-semibold text-[#193042] transition hover:bg-[#f5f9fc]"
                >
                  Browse categories
                </Link>
              </div>
            </div>

            <div className="medvi-card overflow-hidden p-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${BASE_PATH}/images/hero-doctor.png`}
                alt="Teragenix premium medical-style hero"
                className="h-[560px] w-full rounded-[30px] object-cover object-top"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="pb-8 sm:pb-12">
        <div className="medvi-shell">
          <div className="medvi-card grid gap-4 px-5 py-5 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:gap-5">
            {valueStrip.map((item) => (
              <div key={item.title} className="flex items-center gap-4 rounded-[24px] bg-[#f8fbff] px-4 py-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#4A90D9] shadow-sm">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-[#193042]">{item.title}</h2>
                  <p className="mt-1 text-sm text-[#607487]">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-16">
        <div className="medvi-shell space-y-16 sm:space-y-20">
          {categorySections.map((section, index) => (
            <div key={section.id} id={section.id} className="space-y-6 sm:space-y-8">
              <div
                className={`grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center ${
                  index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="medvi-card overflow-hidden p-3">
                  <div className="rounded-[30px] bg-[linear-gradient(180deg,#eef6ff_0%,#ffffff_100%)] p-8 sm:p-10">
                    <div className="mb-8 flex flex-wrap gap-3">
                      {section.stats.map((stat) => (
                        <span
                          key={stat}
                          className="rounded-full border border-[#d5e5f4] bg-white px-4 py-2 text-sm font-medium text-[#193042]"
                        >
                          {stat}
                        </span>
                      ))}
                    </div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`${BASE_PATH}${section.image}`}
                      alt={section.title}
                      className="mx-auto h-[320px] w-full max-w-[360px] object-contain sm:h-[380px] sm:max-w-[420px]"
                    />
                  </div>
                </div>

                <div className="space-y-5 px-1 sm:px-2 lg:px-4">
                  <span className="medvi-pill">{section.eyebrow}</span>
                  <h2 className="max-w-xl text-3xl font-semibold tracking-[-0.05em] text-[#193042] sm:text-4xl lg:text-[3.3rem] lg:leading-[1.02]">
                    {section.title}
                  </h2>
                  <p className="max-w-xl text-lg leading-8 text-[#607487]">{section.body}</p>
                  <Link
                    href={section.href}
                    className="inline-flex items-center gap-2 rounded-full bg-[#193042] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#102230]"
                  >
                    {section.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-3">
                {section.cards.map((card) => (
                  <div key={card.title} className="medvi-card p-6 sm:p-7">
                    <card.icon className="h-5 w-5 text-[#4A90D9]" />
                    <h3 className="mt-4 text-lg font-semibold text-[#193042]">{card.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-[#607487]">{card.text}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-10 sm:py-16">
        <div className="medvi-shell">
          <div className="medvi-card px-6 py-10 sm:px-10 sm:py-12">
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div>
                <span className="medvi-pill">Proof and reassurance</span>
                <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-[-0.04em] text-[#193042] sm:text-4xl lg:text-[3rem] lg:leading-[1.04]">
                  Trust language now has a whole section, not just a few scattered bullets.
                </h2>
                <p className="mt-4 max-w-xl text-lg leading-8 text-[#607487]">
                  This block is there to calm buyers down before they hit the deeper store pages. It repeats the quality, shipping, and documentation story in one obvious place.
                </p>
              </div>

              <div className="grid gap-4">
                {reassuranceItems.map((item) => (
                  <div key={item} className="flex gap-4 rounded-[24px] bg-[#f8fbff] px-5 py-5">
                    <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-[#4A90D9]" />
                    <p className="text-sm leading-7 text-[#193042]">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-16">
        <div className="medvi-shell">
          <div className="grid gap-6 lg:grid-cols-[0.88fr_1.12fr] lg:items-stretch">
            <div className="medvi-card overflow-hidden bg-[#17314a] p-8 text-white sm:p-10">
              <span className="inline-flex rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#b6d8ff]">
                Expert-led brand framing
              </span>
              <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl lg:text-[3rem] lg:leading-[1.04]">
                Designed to borrow the credibility rhythm of doctor-led landing pages.
              </h2>
              <p className="mt-4 text-lg leading-8 text-white/75">
                The point here is structural credibility: expert tone, calm pacing, repeated proof, and cleaner category education, while staying in Teragenix’s research-product lane.
              </p>
              <div className="mt-8 flex items-center gap-3 rounded-[22px] bg-white/8 px-5 py-4">
                <Stethoscope className="h-5 w-5 text-[#8ec5ff]" />
                <p className="text-sm font-medium text-white/80">Medical-style layout language without making medical claims.</p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {expertPoints.map((point) => (
                <div key={point} className="medvi-card p-6 sm:p-7">
                  <BadgeCheck className="h-5 w-5 text-[#4A90D9]" />
                  <p className="mt-4 text-base leading-7 text-[#193042]">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-16">
        <div className="medvi-shell">
          <div className="mb-8 max-w-2xl sm:mb-10">
            <span className="medvi-pill">Reviews and testimonials</span>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[#193042] sm:text-4xl lg:text-[3rem] lg:leading-[1.04]">
              A full testimonial section now sits above the footer instead of disappearing into the page chrome.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {testimonials.map((item) => (
              <div key={item.name} className="medvi-card p-6 sm:p-7">
                <div className="flex gap-1 text-[#4A90D9]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-5 text-base leading-8 text-[#193042]">“{item.quote}”</p>
                <div className="mt-6 border-t border-[#e6eef6] pt-5">
                  <p className="text-sm font-semibold text-[#193042]">{item.name}</p>
                  <p className="mt-1 text-sm text-[#607487]">{item.label}</p>
                </div>
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
