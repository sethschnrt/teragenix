import { DisclaimerBanner } from "@/components/disclaimer-banner";
import { Footer } from "@/components/footer";
import { products } from "@/data/products";
import { ArrowRight, BadgeCheck, FlaskConical, ShieldCheck, Truck } from "lucide-react";
import Link from "next/link";

const BASE_PATH = process.env.NODE_ENV === "production" ? "/teragenix" : "";

const categoryCards = [
  {
    title: "Metabolic",
    text: "Precision kits for appetite, body-composition, and metabolic pathway research.",
    href: "/shop?category=metabolic",
  },
  {
    title: "Beauty",
    text: "Glow-focused compounds positioned with a cleaner, premium aesthetic.",
    href: "/shop?category=beauty",
  },
  {
    title: "Research",
    text: "Focused compounds for specialized receptor and performance-adjacent exploration.",
    href: "/shop?category=research",
  },
];

const trustPoints = [
  {
    icon: FlaskConical,
    title: "Research-first presentation",
    body: "Cleaner positioning, stronger hierarchy, and less generic peptide-store energy.",
  },
  {
    icon: ShieldCheck,
    title: "COA + purity framing",
    body: "Built to highlight verification, documentation, and premium kit confidence.",
  },
  {
    icon: Truck,
    title: "Discreet fulfillment",
    body: "Fast domestic shipping and bundled kits with a more polished health-brand feel.",
  },
];

const featured = products.slice(0, 3);

export default function Home() {
  return (
    <main className="pb-0">
      <section className="medvi-shell pt-8 sm:pt-12">
        <div className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div className="space-y-7">
            <span className="medvi-pill">Premium peptide research kits</span>
            <div className="space-y-5">
              <h1 className="max-w-2xl text-4xl font-semibold tracking-[-0.05em] text-[#193042] sm:text-5xl lg:text-[4.5rem] lg:leading-[0.98]">
                A more premium front door for modern peptide research
              </h1>
              <p className="max-w-xl text-lg leading-8 text-[#607487] sm:text-xl">
                Teragenix is being rebuilt around cleaner structure, stronger imagery, and a trust-first flow so the brand feels closer to premium healthcare than a generic supplement storefront.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center rounded-full bg-[#4A90D9] px-7 py-4 text-base font-semibold text-white shadow-[0_14px_34px_rgba(74,144,217,0.28)] transition hover:bg-[#3A7BC8]"
              >
                Shop research kits
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="#featured-categories"
                className="inline-flex items-center justify-center rounded-full border border-[#d8e6f3] bg-white px-7 py-4 text-base font-semibold text-[#193042] shadow-sm transition hover:bg-[#f5f9fc]"
              >
                Explore categories
              </Link>
            </div>
            <div className="flex flex-wrap gap-3 text-sm text-[#607487]">
              <span className="rounded-full border border-[#d8e6f3] bg-white px-4 py-2">COA-backed positioning</span>
              <span className="rounded-full border border-[#d8e6f3] bg-white px-4 py-2">Discreet shipping</span>
              <span className="rounded-full border border-[#d8e6f3] bg-white px-4 py-2">All-in-one kits</span>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="medvi-card overflow-hidden p-3 sm:col-span-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${BASE_PATH}/images/hero-doctor.png`}
                alt="Premium medical research visual"
                className="h-[420px] w-full rounded-[28px] object-cover object-top"
              />
            </div>
            <div className="medvi-card p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#4A90D9]">Brand direction</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[#193042]">Softer. Cleaner. More trusted.</h2>
              <p className="mt-3 text-sm leading-7 text-[#607487]">
                Bigger image-led sections, calmer whitespace, and more editorial pacing instead of jumping straight into a hard-sell store grid.
              </p>
            </div>
            <div className="medvi-card p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#4A90D9]">What changes next</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[#193042]">Homepage first, then shop</h2>
              <p className="mt-3 text-sm leading-7 text-[#607487]">
                Lock the homepage structure and imagery direction first, then carry that system into product listing and detail pages.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="featured-categories" className="medvi-shell py-20">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <span className="medvi-pill mb-4">Section types</span>
            <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[#193042] sm:text-4xl">
              Category-led structure, not just a storefront
            </h2>
          </div>
          <Link href="/shop" className="hidden text-sm font-semibold text-[#4A90D9] sm:inline-flex">
            View all products
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {categoryCards.map((card) => (
            <Link key={card.title} href={card.href} className="medvi-card p-8 transition hover:-translate-y-1 hover:shadow-[0_20px_55px_rgba(31,55,90,0.12)]">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#4A90D9]">{card.title}</p>
              <h3 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-[#193042]">{card.title} research kits</h3>
              <p className="mt-3 max-w-sm text-sm leading-7 text-[#607487]">{card.text}</p>
              <div className="mt-8 inline-flex items-center text-sm font-semibold text-[#193042]">
                Explore section
                <ArrowRight className="ml-2 h-4 w-4 text-[#4A90D9]" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="medvi-shell pb-20">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="medvi-card overflow-hidden p-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${BASE_PATH}/images/hero-vial.png`}
              alt="Premium peptide vial"
              className="h-[520px] w-full rounded-[28px] object-cover"
            />
          </div>
          <div className="medvi-card p-8 sm:p-10 lg:p-12">
            <span className="medvi-pill mb-5">Featured section style</span>
            <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[#193042] sm:text-4xl">
              A premium health-brand frame around your actual product lineup
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-[#607487]">
              This is the real shift. Lead with brand trust, premium imagery, and cleaner category storytelling. Let the product catalog support the brand instead of becoming the whole page.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {trustPoints.map((point) => (
                <div key={point.title} className="rounded-[26px] border border-[#e2edf7] bg-[#f8fbff] p-5">
                  <point.icon className="h-5 w-5 text-[#4A90D9]" />
                  <h3 className="mt-4 text-base font-semibold text-[#193042]">{point.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#607487]">{point.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="medvi-shell pb-20">
        <div className="mb-10 text-center">
          <span className="medvi-pill mb-4">Launch products</span>
          <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[#193042] sm:text-4xl">Your first batch, framed better</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-[#607487]">
            Products should sit lower on the page, inside a cleaner editorial flow, instead of being the first and only thing visitors see.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {featured.map((product) => (
            <Link key={product.slug} href={`/shop/${product.slug}`} className="medvi-card overflow-hidden p-5 transition hover:-translate-y-1 hover:shadow-[0_20px_55px_rgba(31,55,90,0.12)]">
              <div className="rounded-[28px] bg-[radial-gradient(circle_at_top,#162434,#06090f)] p-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${BASE_PATH}${product.image}`}
                  alt={product.name}
                  className="mx-auto h-[260px] w-auto object-contain"
                />
              </div>
              <div className="px-2 pb-1 pt-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#4A90D9]">{product.category}</p>
                <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[#193042]">{product.name}</h3>
                <p className="mt-3 text-sm leading-7 text-[#607487]">{product.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <DisclaimerBanner />
      <Footer />
    </main>
  );
}
