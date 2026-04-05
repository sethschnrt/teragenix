import { Footer } from "@/components/footer";
import { DisclaimerBanner } from "@/components/disclaimer-banner";
import { HelpCircle } from "lucide-react";
import { FaqAccordion } from "./faq-accordion";

export default function FaqPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-[#1a2a3a] text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="flex items-center gap-3 mb-4">
            <HelpCircle className="h-8 w-8 text-[#4A90D9]" />
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Frequently Asked Questions
            </h1>
          </div>
          <p className="text-lg text-white/70 max-w-2xl">
            Everything you need to know about our research peptide kits,
            ordering, and shipping.
          </p>
        </div>
      </section>

      <FaqAccordion />

      <DisclaimerBanner />
      <Footer />
    </main>
  );
}
