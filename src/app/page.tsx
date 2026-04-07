import { DisclaimerBanner } from "@/components/disclaimer-banner";
import { Footer } from "@/components/footer";
import { BadgeCheck, FileCheck, ShieldCheck, Truck } from "lucide-react";
import Link from "next/link";

const BASE_PATH = process.env.NODE_ENV === "production" ? "/teragenix" : "";

const trustItems = [
  { icon: BadgeCheck, title: "99%+ Purity", text: "Premium-grade research compounds with clean positioning." },
  { icon: FileCheck, title: "COA Ready", text: "Documentation-forward framing that builds trust fast." },
  { icon: Truck, title: "Discreet Shipping", text: "Fast domestic fulfillment with a premium health-brand feel." },
  { icon: ShieldCheck, title: "Complete Kits", text: "Everything bundled into one cleaner research experience." },
];

const spotlightSections = [
  {
    eyebrow: "Metabolic research",
    title: "Weight and metabolic support, presented with more trust and less noise",
    body:
      "This section should feel like a focused landing page, not just a product shelf. Cleaner copy, stronger hierarchy, and a calmer layout do most of the work.",
    cta: "Explore metabolic kits",
    href: "/shop?category=metabolic",
    image: "/images/product-tirzepatide.png",
  },
  {
    eyebrow: "Recovery and performance",
    title: "A more editorial frame for compounds tied to recovery and body composition goals",
    body:
      "Instead of pushing everything at once, this layout gives each category room to breathe with a hero image, a short value proposition, and a dedicated action.",
    cta: "View research catalog",
    href: "/shop",
    image: "/images/product-recovery-stack.png",
  },
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
                Research compounds, packaged more like a premium health brand
              </h1>
              <p className="max-w-xl text-lg leading-8 text-[#607487] sm:text-xl">
                We are reshaping Teragenix around cleaner layouts, stronger product presentation, and a more trusted medical-adjacent feel without losing the sharp edge of the brand.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center rounded-full bg-[#4A90D9] px-7 py-4 text-base font-semibold text-white shadow-[0_14px_34px_rgba(74,144,217,0.28)] transition hover:bg-[#3A7BC8]"
                >
                  Shop kits
                </Link>
                <Link
                  href="#category-spotlights"
                  className="inline-flex items-center justify-center rounded-full border border-[#d8e6f3] bg-white px-7 py-4 text-base font-semibold text-[#193042] shadow-sm transition hover:bg-[#f5f9fc]"
                >
                  See category highlights
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
              <img
                src={`${BASE_PATH}/images/hero-doctor.png`}
                alt="Medical research visual"
                className="h-[500px] w-full rounded-[28px] object-cover object-top"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-10">
        <div className="medvi-shell">
          <div className="medvi-card grid gap-6 px-6 py-8 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
            {trustItems.map((item) => (
              <div key={item.title} className="rounded-[24px] bg-[#f8fbff] p-5">
                <item.icon className="h-5 w-5 text-[#4A90D9]" />
                <h3 className="mt-4 text-base font-semibold text-[#193042]">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-[#607487]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="category-spotlights" className="py-20">
        <div className="medvi-shell space-y-10">
          {spotlightSections.map((section, index) => (
            <div
              key={section.title}
              className={`grid gap-8 lg:grid-cols-2 lg:items-center ${index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}
            >
              <div className="medvi-card overflow-hidden p-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${BASE_PATH}${section.image}`}
                  alt={section.title}
                  className="h-[420px] w-full rounded-[28px] object-cover"
                />
              </div>
              <div className="space-y-5 px-2 sm:px-4 lg:px-8">
                <span className="medvi-pill">{section.eyebrow}</span>
                <h2 className="max-w-xl text-3xl font-semibold tracking-[-0.04em] text-[#193042] sm:text-4xl lg:text-[3rem] lg:leading-[1.05]">
                  {section.title}
                </h2>
                <p className="max-w-xl text-lg leading-8 text-[#607487]">{section.body}</p>
                <Link
                  href={section.href}
                  className="inline-flex items-center justify-center rounded-full bg-[#193042] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#102230]"
                >
                  {section.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <DisclaimerBanner />
      <Footer />
    </main>
  );
}
