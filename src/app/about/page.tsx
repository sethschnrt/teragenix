import { Footer } from "@/components/footer";
import { DisclaimerBanner } from "@/components/disclaimer-banner";
import { PageHero } from "@/components/page-hero";
import {
  Shield,
  Microscope,
  Award,
  Package,
  Users,
  FlaskConical,
  CheckCircle2,
  Beaker,
} from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Uncompromising Quality",
    description:
      "Quality should be communicated clearly, with product pages and batch documentation that feel serious and easy to evaluate.",
  },
  {
    icon: Package,
    title: "Complete Kits",
    description:
      "The storefront is built around complete kit presentation, so included components are easy to understand at a glance.",
  },
  {
    icon: Award,
    title: "Third-Party Verified",
    description:
      "Documentation, quality framing, and product clarity should work together instead of relying on exaggerated trust language.",
  },
  {
    icon: Users,
    title: "Researcher Support",
    description:
      "Important product information should be surfaced clearly across the storefront, not buried behind vague or inconsistent copy.",
  },
];

const stats = [
  { value: "4", label: "Storefront Categories" },
  { value: "Kit", label: "Bundled Format" },
  { value: "COA", label: "Documentation-Led" },
  { value: "RUO", label: "Research Use Only" },
];

export default function AboutPage() {
  return (
    <main>
      <PageHero
        icon={FlaskConical}
        eyebrow="ABOUT TERAGENIX"
        title="Built for researchers who want a cleaner storefront and clearer standards."
        description="Teragenix is being shaped into a tighter storefront where category structure, kit presentation, and quality positioning all feel more coherent."
        variant="about"
        highlights={[
          { label: "Our mission", href: "#mission" },
          { label: "Core principles", href: "#principles" },
          { label: "Quality promise", href: "#quality-promise" },
        ]}
        panelEyebrow="AT A GLANCE"
        panelTitle="The standards behind every Teragenix kit."
        panelItems={stats.map((stat) => ({ label: stat.label, value: stat.value }))}
      />

      {/* Mission */}
      <section id="mission" className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <p className="text-sm font-semibold text-[#4A90D9] uppercase tracking-wider mb-2">
                Our Mission
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
                Making Research Accessible
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Teragenix is being built around a simple idea: the storefront
                  should make it easier to compare compounds, understand the kit
                  format, and move through the catalog without friction.
                </p>
                <p>
                  Instead of leaning on noisy claims or cluttered product
                  pages, the goal is a cleaner system built around category
                  clarity, stronger product presentation, and documentation-led
                  trust.
                </p>
                <p>
                  This phase is focused on making the storefront feel polished,
                  coherent, and easier to navigate from first impression to
                  product detail.
                </p>
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border bg-card p-6 text-center"
                >
                  <p className="text-3xl sm:text-4xl font-bold text-[#4A90D9]">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section id="principles" className="py-16 sm:py-20 bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-[#4A90D9] uppercase tracking-wider mb-2">
              Why Teragenix
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Built on Principles That Matter
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-xl border bg-card p-6 flex flex-col"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#4A90D9]/10 mb-4">
                  <v.icon className="h-6 w-6 text-[#4A90D9]" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {v.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Promise */}
      <section id="quality-promise" className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-[#1a2a3a] text-white p-8 sm:p-12">
            <div className="grid gap-8 lg:grid-cols-2 items-center">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Microscope className="h-6 w-6 text-[#4A90D9]" />
                  <p className="text-sm font-semibold text-[#4A90D9] uppercase tracking-wider">
                    Our Quality Promise
                  </p>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
                  Every Vial Tells a Story
                </h2>
                <p className="text-white/70 leading-relaxed">
                  The quality story should feel clean and credible. That means
                  clearer documentation language, better product framing, and a
                  storefront that signals standards without relying on inflated
                  promises.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  "Documentation-led quality positioning",
                  "Cleaner product page hierarchy",
                  "Clearer kit format communication",
                  "Less cluttered trust language",
                  "Stronger category-to-product flow",
                  "A more coherent storefront system",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#4A90D9] shrink-0" />
                    <span className="text-sm text-white/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <Beaker className="h-10 w-10 text-[#4A90D9] mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
            Browse the Storefront
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-8">
            Explore the current catalog and review the product pages that are
            already in progress.
          </p>
          <a
            href="/shop"
            className="tg-link-pill inline-flex items-center justify-center rounded-lg bg-[#4A90D9] px-8 py-3 text-sm font-semibold text-white hover:bg-[#3A7BC8]"
          >
            Browse Research Kits
          </a>
        </div>
      </section>

      <DisclaimerBanner />
      <Footer />
    </main>
  );
}
