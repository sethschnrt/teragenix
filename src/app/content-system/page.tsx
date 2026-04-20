import Link from "next/link";
import { ArrowUpRight, BarChart3, Clapperboard, LineChart, Megaphone, PenSquare } from "lucide-react";

import { DisclaimerBanner } from "@/components/disclaimer-banner";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/page-hero";

const pipeline = [
  {
    icon: Megaphone,
    title: "Angles",
    body: "Start with pain points, objections, transformations, and curiosity hooks tied to one product or one offer.",
  },
  {
    icon: PenSquare,
    title: "Scripts",
    body: "Turn strong angles into short scripts with one job, one promise, and one clear call to action.",
  },
  {
    icon: Clapperboard,
    title: "Creative",
    body: "Create multiple variants for the same script so hooks, intros, endings, captions, and landing-page fit can be tested cleanly.",
  },
  {
    icon: BarChart3,
    title: "Results",
    body: "Track clicks, hold rate, conversions, and winner status so good ideas compound and weak ones get cut fast.",
  },
] as const;

const loop = [
  "Choose one product or one offer.",
  "Generate 10 to 20 angles.",
  "Write 5 to 10 scripts from the best angles.",
  "Create multiple creative variants for each script.",
  "Match the creative to the right page or offer.",
  "Review results daily and duplicate only what wins.",
] as const;

const stack = [
  "Claude / OpenAI for hooks, scripts, and CTAs",
  "Seedance / Runway for creative generation",
  "Teragenix admin for tracking, review, and status",
  "OpenClaw for summaries, queue support, and ops",
] as const;

export default function ContentSystemPage() {
  return (
    <main>
      <PageHero
        icon={LineChart}
        eyebrow="TERAGENIX CONTENT SYSTEM"
        detail="How the brand turns ideas into repeatable creative"
        title="A better system for hooks, scripts, creative, and winners."
        description="Teragenix is building a repeatable content engine so good ideas can scale across landing pages, owned media, organic content, and future testing channels."
        variant="subpage"
        highlights={[
          { label: "Read the framework", href: "/docs/teragenix-ad-ops-v1.md" },
          { label: "Browse the catalog", href: "/shop" },
        ]}
        panelEyebrow="OPERATING MODEL"
        panelTitle="The point is not one nice ad."
        panelItems={[
          { label: "Angles", value: "Many ideas up front" },
          { label: "Scripts", value: "One job per script" },
          { label: "Creative", value: "Multiple variants" },
          { label: "Results", value: "Winners decide" },
        ]}
      />

      <section className="py-10 sm:py-12 lg:py-14">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pipeline.map((item) => (
              <div key={item.title} className="rounded-[1.5rem] bg-white p-5 ring-1 ring-[#e3e8ef]">
                <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] bg-[#e9f0fc]">
                  <item.icon className="h-5 w-5 text-[#3b6ed6]" />
                </div>
                <h2 className="mt-5 text-[1.08rem] font-semibold text-[#0d262d]">{item.title}</h2>
                <p className="mt-3 text-sm leading-6 text-[#475967]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fafbfc] py-10 sm:py-12 lg:py-14">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-5 lg:grid-cols-[1.02fr_0.98fr]">
            <div className="rounded-[2rem] bg-white p-7 ring-1 ring-[#e3e8ef] sm:p-8">
              <p className="tg-eyebrow">DAILY LOOP</p>
              <h2 className="mt-3 text-[2rem] font-semibold leading-tight tracking-[-0.03em] text-[#0d262d] sm:text-[2.45rem]">
                How the system is supposed to run.
              </h2>
              <div className="mt-6 space-y-4">
                {loop.map((item, index) => (
                  <div key={item} className="flex gap-4 rounded-[1.25rem] bg-[#f4f8ff] p-4 ring-1 ring-[#dbe6f5]">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-sm font-semibold text-[#3b6ed6] ring-1 ring-[#dbe6f5]">
                      0{index + 1}
                    </div>
                    <p className="pt-1 text-sm leading-6 text-[#475967]">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] bg-[linear-gradient(160deg,_#173f85_0%,_#102e5d_42%,_#0d262d_100%)] p-7 text-white sm:p-8">
              <p className="tg-eyebrow text-[#a8c5f5]">STACK</p>
              <h2 className="mt-3 text-[2rem] font-semibold leading-tight tracking-[-0.03em] text-white sm:text-[2.35rem]">
                The tools behind it.
              </h2>
              <div className="mt-6 space-y-3">
                {stack.map((item) => (
                  <div key={item} className="rounded-[1.25rem] bg-white/8 px-4 py-3 text-sm text-white/82 ring-1 ring-white/12">
                    {item}
                  </div>
                ))}
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/docs/teragenix-ad-ops-v1.md"
                  className="tg-link-pill inline-flex h-12 items-center rounded-full bg-white px-5 text-sm font-semibold text-[#0d262d]"
                >
                  Open framework
                  <ArrowUpRight className="tg-link-pill-icon ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/about"
                  className="tg-link-pill inline-flex h-12 items-center rounded-full border border-white/18 px-5 text-sm font-semibold text-white hover:bg-white/10"
                >
                  About Teragenix
                  <ArrowUpRight className="tg-link-pill-icon ml-2 h-4 w-4" />
                </Link>
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
