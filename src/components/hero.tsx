import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Microscope } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pt-28 sm:pb-32">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <Badge
            variant="secondary"
            className="mb-6 px-4 py-1.5 text-xs font-medium tracking-wide uppercase"
          >
            <Microscope className="mr-1.5 h-3 w-3" />
            Research-Grade Peptides
          </Badge>

          {/* Headline */}
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-[#1a2a3a] dark:text-white sm:text-5xl lg:text-6xl">
            Precision compounds for{" "}
            <span className="text-[#4A90D9]">serious research</span>
          </h1>

          {/* Subheadline */}
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl leading-relaxed">
            99%+ purity peptides, bundled with everything you need.
            Bacteriostatic water, syringes, and alcohol swabs — all in one kit.
            No sourcing. No guesswork.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link href="/shop">
              <Button
                size="lg"
                className="bg-[#4A90D9] hover:bg-[#3A7BC8] text-white px-8 text-base font-semibold"
              >
                Shop Peptides
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="#how-it-works">
              <Button
                variant="outline"
                size="lg"
                className="px-8 text-base font-semibold"
              >
                How It Works
              </Button>
            </Link>
          </div>

          {/* Micro trust signals under CTA */}
          <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
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
      </div>
    </section>
  );
}
