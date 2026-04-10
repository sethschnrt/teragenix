import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { PageHero } from "@/components/page-hero";
import { DisclaimerBanner } from "@/components/disclaimer-banner";
import { Footer } from "@/components/footer";
import { getHeroCategoryTagClasses, getHeroCategoryTheme, products } from "@/data/products";
import {
  ArrowUpRight,
  FileCheck2,
  FlaskConical,
  Microscope,
  ScanSearch,
  ShieldCheck,
} from "lucide-react";

const standards = [
  {
    icon: ScanSearch,
    title: "Batch-linked references",
    body: "Each product now carries a SKU and batch code so support, documentation, and the product page all point to the same reference line.",
  },
  {
    icon: FileCheck2,
    title: "COA-first structure",
    body: "This page is designed to hold COA, HPLC, and MS visibility in one place instead of scattering trust details across checkout copy.",
  },
  {
    icon: ShieldCheck,
    title: "Honest status states",
    body: "Launch-batch documentation is shown with real upload states. No fake PDFs, no pretending files exist when they do not.",
  },
];

export default function CoaPage() {
  return (
    <main>
      <PageHero
        icon={Microscope}
        eyebrow="COA + BATCH DOCS"
        detail="Product-linked documentation, batch references, and upload status"
        title="Documentation should be easy to find."
        description="This hub keeps SKU references, batch codes, and documentation status tied to each Teragenix product so the quality layer feels visible before checkout goes live."
        variant="subpage"
        highlights={[
          { label: "Browse research kits", href: "/shop" },
          { label: "Read support FAQ", href: "/faq" },
        ]}
        panelEyebrow="DOCUMENTATION SYSTEM"
        panelTitle="The trust layer now has a real home."
        panelItems={[
          { label: "Products tracked", value: String(products.length) },
          { label: "Docs surfaced", value: "COA, HPLC, MS" },
          { label: "Current stage", value: "Launch batch setup" },
          { label: "Support path", value: "FAQ + policy pages", href: "/faq" },
        ]}
      />

      <section className="py-14 sm:py-18 lg:py-20">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-4 sm:grid-cols-3">
            {standards.map((card) => (
              <div
                key={card.title}
                className="rounded-[1.75rem] bg-white p-6 ring-1 ring-[#e3e8ef]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] bg-[#e9f0fc]">
                  <card.icon className="h-5 w-5 text-[#3b6ed6]" />
                </div>
                <h2 className="mt-5 text-[1.1rem] font-semibold text-[#0d262d]">{card.title}</h2>
                <p className="mt-3 text-sm leading-6 text-[#475967]">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fafbfc] py-14 sm:py-18 lg:py-20">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-12">
          <div className="mb-8 max-w-2xl">
            <p className="tg-eyebrow">TRACKED PRODUCTS</p>
            <h2 className="mt-3 text-[2rem] font-semibold leading-tight tracking-[-0.03em] text-[#0d262d] sm:text-[2.45rem]">
              Batch visibility for the current catalog.
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-[#475967] sm:text-[16px]">
              Successful research-kit stores make documentation visible close to the product. This page mirrors that structure while keeping upload states honest during the launch phase.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div className="grid gap-4 sm:grid-cols-2">
              {products.map((product) => {
                const theme = getHeroCategoryTheme(product.heroCategory);

                return (
                  <div
                    key={product.slug}
                    className="rounded-[1.8rem] bg-white p-6 ring-1 ring-[#e3e8ef]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <Badge
                          className={`border-0 px-3 py-1.5 text-[10px] font-semibold tracking-[0.16em] ${getHeroCategoryTagClasses(product.heroCategory)}`}
                        >
                          {product.heroCategory.toUpperCase()}
                        </Badge>
                        <h3 className="mt-4 text-[1.2rem] font-semibold leading-snug text-[#0d262d]">
                          {product.name}
                        </h3>
                      </div>
                      <div
                        className="rounded-full px-3 py-1 text-[11px] font-medium"
                        style={{ backgroundColor: theme.softAlt, color: theme.accent }}
                      >
                        {product.documentation.releaseWindow}
                      </div>
                    </div>

                    <div className="mt-5 grid gap-3">
                      {[
                        { label: "SKU", value: product.documentation.sku, icon: FileCheck2 },
                        { label: "Batch code", value: product.documentation.batchCode, icon: ScanSearch },
                        { label: "COA", value: product.documentation.coaStatus, icon: FileCheck2 },
                        { label: "HPLC + MS", value: `${product.documentation.hplcStatus}. ${product.documentation.msStatus}.`, icon: FlaskConical },
                      ].map((item) => (
                        <div
                          key={`${product.slug}-${item.label}`}
                          className="rounded-[1.2rem] border px-4 py-4"
                          style={{ borderColor: theme.soft, backgroundColor: theme.softAlt }}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                              style={{ backgroundColor: "#ffffff", color: theme.accent }}
                            >
                              <item.icon className="h-4 w-4" />
                            </div>
                            <div>
                              <p
                                className="text-[11px] font-medium uppercase tracking-[0.18em]"
                                style={{ color: theme.accent }}
                              >
                                {item.label}
                              </p>
                              <p className="mt-2 text-[14px] leading-6 text-[#0d262d]/70">{item.value}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2.5">
                      <Link
                        href={`/shop/${product.slug}`}
                        className="tg-link-pill inline-flex items-center rounded-full border px-4 py-2 text-[12px] font-semibold text-[#0d262d]"
                        style={{ borderColor: theme.soft, backgroundColor: theme.softAlt }}
                      >
                        View product page
                        <ArrowUpRight className="tg-link-pill-icon ml-2 h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="rounded-[2rem] bg-white p-7 ring-1 ring-[#e3e8ef] sm:p-8">
              <p className="tg-eyebrow">HOW THIS PAGE WORKS</p>
              <h2 className="mt-3 text-[1.9rem] font-semibold leading-tight tracking-[-0.03em] text-[#0d262d] sm:text-[2.3rem]">
                Launch batches get visible status before full file hosting.
              </h2>
              <div className="mt-5 space-y-4 text-[15px] leading-7 text-[#475967]">
                <p>
                  Right now the page establishes the structure serious stores use: product-linked SKU references, batch codes, and documentation states tied to the exact item.
                </p>
                <p>
                  As batch files are uploaded, this hub can expand into direct COA, HPLC, and MS downloads without redesigning the product system again.
                </p>
              </div>

              <div className="mt-7 space-y-3">
                {[
                  "COA / HPLC / MS visibility tied to the product, not buried in footer copy.",
                  "Batch code and SKU reference visible before support questions start.",
                  "Honest upload-state language until final launch files are ready.",
                ].map((item) => (
                  <div key={item} className="rounded-[1.25rem] bg-[#f4f8ff] p-4 ring-1 ring-[#dbe6f5]">
                    <p className="text-sm leading-6 text-[#475967]">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <DisclaimerBanner />
      <Footer />
    </main>
  );
}
