import { Footer } from "@/components/footer";
import { DisclaimerBanner } from "@/components/disclaimer-banner";
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
      "Every batch undergoes rigorous HPLC testing to verify 99%+ purity. We publish Certificates of Analysis for full transparency.",
  },
  {
    icon: Package,
    title: "Complete Kits",
    description:
      "No hunting for supplies. Each kit includes bacteriostatic water, precision syringes, and alcohol swabs — research-ready out of the box.",
  },
  {
    icon: Award,
    title: "Third-Party Verified",
    description:
      "Independent labs validate every product. We never self-certify. If it doesn't pass, it doesn't ship.",
  },
  {
    icon: Users,
    title: "Researcher Support",
    description:
      "Questions about reconstitution, storage, or protocols? Our team has the expertise to help you get it right.",
  },
];

const stats = [
  { value: "99%+", label: "Purity Guaranteed" },
  { value: "10+", label: "Research Compounds" },
  { value: "48hr", label: "Average Ship Time" },
  { value: "100%", label: "COA Documented" },
];

export default function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-[#1a2a3a] text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="flex items-center gap-3 mb-4">
            <FlaskConical className="h-8 w-8 text-[#4A90D9]" />
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              About Teragenix
            </h1>
          </div>
          <p className="text-lg text-white/70 max-w-2xl">
            Founded by researchers, for researchers. We believe access to
            high-quality peptides shouldn&apos;t require a procurement department.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 sm:py-20">
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
                  Teragenix was born from a simple frustration: sourcing
                  research-grade peptides shouldn&apos;t mean juggling multiple
                  vendors for vials, solvents, and supplies.
                </p>
                <p>
                  We started as a small team of biochemistry researchers who
                  spent too many hours tracking down bacteriostatic water and
                  the right gauge syringes. So we built the solution we wished
                  existed — complete, ready-to-use research kits with
                  everything in one box.
                </p>
                <p>
                  Every compound we offer is synthesized to pharmaceutical-grade
                  standards, independently tested, and shipped with full
                  documentation. No guesswork. No compromises.
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
      <section className="py-16 sm:py-20 bg-muted/30">
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
      <section className="py-16 sm:py-20">
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
                  We don&apos;t cut corners. Every product ships with a
                  Certificate of Analysis documenting exact purity levels,
                  molecular weight confirmation, and endotoxin testing results.
                  If a batch doesn&apos;t meet our standards, it gets destroyed
                  — not discounted.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  "HPLC purity testing on every batch",
                  "Mass spectrometry molecular verification",
                  "Endotoxin screening (LAL method)",
                  "Independent third-party lab validation",
                  "Full COA included with every order",
                  "Proper cold-chain shipping when required",
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
            Ready to Start Your Research?
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-8">
            Browse our complete catalog of research-grade peptide kits.
            Everything you need, nothing you don&apos;t.
          </p>
          <a
            href="/shop"
            className="inline-flex items-center justify-center rounded-lg bg-[#4A90D9] px-8 py-3 text-sm font-semibold text-white hover:bg-[#3A7BC8] transition-colors"
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
