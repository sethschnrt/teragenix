import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Microscope } from "lucide-react";
import Link from "next/link";

const BASE_PATH = process.env.NODE_ENV === "production" ? "/teragenix" : "";

export function Hero() {
  return (
    <section className="relative overflow-hidden py-6 sm:py-10">
      <div className="medvi-shell">
        <div className="medvi-card grid gap-12 overflow-hidden px-6 py-10 sm:px-10 sm:py-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:px-14 lg:py-16 items-center">
          {/* Left — Text content */}
          <div className="flex flex-col items-start text-left">
            {/* Badge */}
            <Badge
              variant="secondary"
              className="mb-6 rounded-full border border-[#d9e7f5] bg-white px-5 py-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-[#4A90D9] shadow-sm"
            >
              <Microscope className="mr-1.5 h-3 w-3" />
              Research-Grade Peptides
            </Badge>

            {/* Headline */}
            <h1 className="max-w-2xl text-4xl font-semibold tracking-[-0.04em] text-[#193042] sm:text-5xl lg:text-[4.2rem] lg:leading-[1.02]">
              Premium peptide care for a <span className="text-[#4A90D9]">more intentional</span> research experience
            </h1>

            {/* Subheadline */}
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#607487] sm:text-xl">
              A softer, more trustworthy way to shop research compounds. Curated kits, clean presentation, and premium packaging designed to feel medical, modern, and discreet.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link href="/shop">
                <Button
                  size="lg"
                  className="rounded-full bg-[#4A90D9] px-8 text-base font-semibold text-white shadow-[0_12px_30px_rgba(74,144,217,0.28)] hover:bg-[#3A7BC8]"
                >
                  Shop Peptides
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="#how-it-works">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full border-[#d9e7f5] bg-white px-8 text-base font-semibold text-[#193042] shadow-sm"
                >
                  How It Works
                </Button>
              </Link>
            </div>

            {/* Micro trust signals */}
            <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-[#607487]">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                Free shipping over $150
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                Ships within 24h
              </span>
            </div>
          </div>

          {/* Right — Doctor image */}
          <div className="relative hidden lg:block">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] bg-[#eef5fb] p-3 shadow-[0_24px_60px_rgba(27,47,79,0.10)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${BASE_PATH}/images/hero-doctor.png`}
                alt="Research scientist in laboratory"
                className="h-full w-full rounded-[26px] object-cover object-top"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
