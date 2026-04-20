import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const dynamic = "force-dynamic";

const pipelineSteps = [
  {
    title: "Angles",
    description: "Pain points, transformations, objections, curiosity hooks, creator concepts.",
  },
  {
    title: "Scripts",
    description: "Short ad scripts tied to one angle, one promise, one CTA, one format.",
  },
  {
    title: "Creative",
    description: "Seedance / Runway outputs, hooks, thumbnails, references, final exports.",
  },
  {
    title: "Distribution",
    description: "Owned surfaces first, then organic and creator distribution, not random posting.",
  },
  {
    title: "Results",
    description: "CTR, hold rate, landing-page clicks, CPA, winner status, next iteration.",
  },
] as const;

const coreTables = [
  "ad_projects",
  "ad_angles",
  "ad_scripts",
  "ad_creatives",
  "ad_variants",
  "ad_channels",
  "ad_performance_snapshots",
] as const;

const operatingLoop = [
  "pick one product or offer",
  "generate 10 to 20 angles",
  "turn the best 5 to 10 into scripts",
  "create 2 to 4 variants per script",
  "ship to owned surfaces and test channels",
  "log metrics daily and kill weak creatives fast",
  "duplicate winners, not mediocre ideas",
] as const;

const starterBacklog = [
  "Create the Prisma tables above and seed one Teragenix ad project",
  "Add upload slots for references, prompt text, and final asset URLs",
  "Add a results table for hold rate, CTR, CPC, CPA, spend, and winner status",
  "Add one daily summary job through OpenClaw cron",
] as const;

export default function AdminAdsPage() {
  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-[#f4d5e2] bg-[linear-gradient(135deg,#fff7fb_0%,#fff_60%)] px-4 py-4 shadow-sm">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#ad1457]">Ads system</p>
        <h2 className="mt-1 text-2xl font-semibold text-[#202223]">Teragenix ad testing pipeline</h2>
        <p className="mt-2 max-w-3xl text-sm text-[#5c5f62]">
          This is the internal growth layer for Teragenix. The point is not making one nice video. The point is turning
          angles, scripts, creative, and performance into one repeatable system.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full border border-[#f8bfd5] bg-white px-3 py-1 text-xs font-medium text-[#c2185b]">Claude / OpenAI for hooks + scripts</span>
          <span className="rounded-full border border-[#f8bfd5] bg-white px-3 py-1 text-xs font-medium text-[#c2185b]">Seedance / Runway for creative</span>
          <span className="rounded-full border border-[#f8bfd5] bg-white px-3 py-1 text-xs font-medium text-[#c2185b]">OpenClaw for ops + summaries</span>
          <span className="rounded-full border border-[#f8bfd5] bg-white px-3 py-1 text-xs font-medium text-[#c2185b]">Owned media first</span>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="border border-[#dfe3e8] bg-white py-3 shadow-sm">
          <CardHeader className="border-b border-[#eceef0] pb-3">
            <CardTitle className="text-base text-[#202223]">V1 flow</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {pipelineSteps.map((step, index) => (
                <div key={step.title} className="rounded-xl border border-[#eceef0] bg-[#fafafa] p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#ad1457]">Step {index + 1}</p>
                  <h3 className="mt-1 text-sm font-semibold text-[#202223]">{step.title}</h3>
                  <p className="mt-1 text-sm text-[#5c5f62]">{step.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border border-[#dfe3e8] bg-white py-3 shadow-sm">
          <CardHeader className="border-b border-[#eceef0] pb-3">
            <CardTitle className="text-base text-[#202223]">Operating rule</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-sm text-[#5c5f62]">
              Treat this like a testing machine. Volume, learning speed, and structured iteration matter more than trying
              to make a single perfect ad in one shot.
            </p>
            <div className="mt-4 space-y-2">
              {operatingLoop.map((item) => (
                <div key={item} className="rounded-xl border border-[#eceef0] bg-[#fafafa] px-3 py-2 text-sm text-[#202223]">
                  {item}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <Card className="border border-[#dfe3e8] bg-white py-3 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between border-b border-[#eceef0] pb-3">
            <CardTitle className="text-base text-[#202223]">Recommended core tables</CardTitle>
            <Link href="/docs/teragenix-ad-ops-v1.md" className="text-xs font-medium text-[#0f62fe]">Project doc</Link>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex flex-wrap gap-2">
              {coreTables.map((table) => (
                <span key={table} className="rounded-full border border-[#dfe3e8] bg-[#fafafa] px-3 py-1 text-xs font-medium text-[#202223]">
                  {table}
                </span>
              ))}
            </div>
            <p className="mt-4 text-sm text-[#5c5f62]">
              These sit next to orders, CRM, and expenses so creative performance becomes part of the same business system,
              not a separate spreadsheet graveyard.
            </p>
          </CardContent>
        </Card>

        <Card className="border border-[#dfe3e8] bg-white py-3 shadow-sm">
          <CardHeader className="border-b border-[#eceef0] pb-3">
            <CardTitle className="text-base text-[#202223]">Starter backlog</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-2">
              {starterBacklog.map((item) => (
                <div key={item} className="rounded-xl border border-[#eceef0] bg-[#fafafa] px-3 py-2 text-sm text-[#202223]">
                  {item}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
