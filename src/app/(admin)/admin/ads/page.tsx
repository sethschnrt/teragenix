import Link from "next/link";
import {
  Activity,
  BarChart3,
  Bot,
  Clapperboard,
  Database,
  FileText,
  Layers3,
  Megaphone,
  PenSquare,
  Sparkles,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const dynamic = "force-dynamic";

const topStats = [
  {
    label: "Visible workstreams",
    value: "6",
    detail: "campaigns, angles, scripts, creative, results, ops",
    tone: "bg-rose-50 text-rose-700 border-rose-200",
  },
  {
    label: "Live in admin",
    value: "Yes",
    detail: "inside Teragenix admin, not storefront",
    tone: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    label: "Build phase",
    value: "V1",
    detail: "UI shell first, database wiring next",
    tone: "bg-blue-50 text-blue-700 border-blue-200",
  },
  {
    label: "Next move",
    value: "Prisma",
    detail: "real records, forms, and run logging",
    tone: "bg-amber-50 text-amber-700 border-amber-200",
  },
] as const;

const visibilityCards = [
  {
    icon: Megaphone,
    title: "Campaigns",
    description: "See each ad project, product focus, objective, owner, and current stage from one place.",
    items: ["project name", "offer", "channel", "status"],
  },
  {
    icon: PenSquare,
    title: "Angles + scripts",
    description: "Track the hook backlog, what got turned into scripts, and what is ready for creative.",
    items: ["pain point", "hook", "script", "CTA"],
  },
  {
    icon: Clapperboard,
    title: "Creative runs",
    description: "Log prompt versions, reference assets, output links, thumbnails, and approval state.",
    items: ["provider", "prompt", "refs", "output"],
  },
  {
    icon: BarChart3,
    title: "Results",
    description: "Track what wins, what dies, and what gets duplicated without spreadsheet sprawl.",
    items: ["CTR", "hold rate", "CPA", "winner"],
  },
] as const;

const buildTracker = [
  {
    area: "Admin ads workspace",
    status: "LIVE",
    owner: "Rex",
    note: "Route exists at /admin/ads and matches the internal admin UI, not the storefront.",
  },
  {
    area: "System structure",
    status: "LIVE",
    owner: "Rex",
    note: "Campaigns, scripts, creatives, results, and ops are mapped into one screen.",
  },
  {
    area: "Prisma models",
    status: "NEXT",
    owner: "Rex",
    note: "Add ad_projects, ad_angles, ad_scripts, ad_creatives, ad_variants, ad_channels, performance snapshots.",
  },
  {
    area: "Input forms",
    status: "NEXT",
    owner: "Rex",
    note: "Need forms for angles, scripts, prompts, asset URLs, and winner flags.",
  },
  {
    area: "Automation logging",
    status: "PENDING",
    owner: "Rex",
    note: "Expose queue status, cron summaries, and creative run activity here instead of in chat only.",
  },
  {
    area: "Results ingest",
    status: "PENDING",
    owner: "Rex",
    note: "Manual import first, then connector work for channel metrics once the workflow is proven.",
  },
] as const;

const seededViews = [
  {
    name: "Campaign board",
    description: "Top-level projects with offer, objective, platform, stage, and owner.",
    icon: Layers3,
  },
  {
    name: "Creative queue",
    description: "What is at angle stage, script stage, creative generation, review, or live testing.",
    icon: Sparkles,
  },
  {
    name: "Ops log",
    description: "A running feed of what I changed, what is blocked, and what the next action is.",
    icon: Activity,
  },
  {
    name: "Asset registry",
    description: "Prompt text, references, output URLs, thumbnails, and version history tied to each creative.",
    icon: FileText,
  },
] as const;

const stackStatus = [
  {
    label: "Hooks + scripts",
    value: "Claude / OpenAI",
    status: "ready",
  },
  {
    label: "Creative generation",
    value: "Seedance / Runway",
    status: "ready",
  },
  {
    label: "App storage layer",
    value: "Prisma + Postgres",
    status: "next",
  },
  {
    label: "Ops automation",
    value: "OpenClaw cron + summaries",
    status: "next",
  },
  {
    label: "Result ingestion",
    value: "manual first",
    status: "pending",
  },
  {
    label: "Deployment",
    value: "Vercel",
    status: "live",
  },
] as const;

const recentWork = [
  "Moved the concept back into the admin workflow instead of treating it like a public marketing page.",
  "Built a dedicated ads workspace route inside the Teragenix admin shell.",
  "Mapped the system around campaigns, angles, scripts, creative, results, and operator visibility.",
  "Queued the next build step: real Prisma-backed records and forms so this stops being a shell and starts being a usable tool.",
] as const;

function statusTone(status: string) {
  switch (status) {
    case "LIVE":
    case "live":
    case "ready":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "NEXT":
    case "next":
      return "bg-blue-50 text-blue-700 border-blue-200";
    default:
      return "bg-amber-50 text-amber-700 border-amber-200";
  }
}

export default function AdminAdsPage() {
  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-[#dfe3e8] bg-white px-4 py-4 shadow-sm">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#c2185b]">Ads workspace</p>
            <h2 className="mt-1 text-2xl font-semibold tracking-[-0.02em] text-[#202223]">Teragenix growth operating system</h2>
            <p className="mt-2 max-w-3xl text-sm text-[#5c5f62]">
              This is the internal app layer for tracking what I am building across campaigns, hooks, scripts, creative,
              results, and ops. It belongs in admin and should behave like an operations tool, not a storefront section.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/admin" className="rounded-xl border border-[#dfe3e8] bg-white px-3 py-2 text-xs font-medium text-[#202223] hover:bg-[#f6f6f7]">
              Back to overview
            </Link>
            <Link href="/docs/teragenix-ad-ops-v1.md" className="rounded-xl border border-[#f8bfd5] bg-[#fff7fb] px-3 py-2 text-xs font-medium text-[#c2185b] hover:bg-[#fff0f6]">
              Open framework doc
            </Link>
          </div>
        </div>

        <div className="mt-4 grid gap-2 md:grid-cols-2 xl:grid-cols-4">
          {topStats.map((item) => (
            <div key={item.label} className={`rounded-xl border px-3 py-2 ${item.tone}`}>
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em]">{item.label}</p>
              <p className="mt-1 text-sm font-semibold">{item.value}</p>
              <p className="mt-1 text-[11px] opacity-80">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="border border-[#dfe3e8] bg-white py-3 shadow-sm">
          <CardHeader className="border-b border-[#eceef0] pb-3">
            <CardTitle className="text-base text-[#202223]">What you can see here</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="grid gap-3 md:grid-cols-2">
              {visibilityCards.map((card) => (
                <div key={card.title} className="rounded-xl border border-[#eceef0] bg-[#fafafa] p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff0f6] ring-1 ring-[#f8bfd5]">
                    <card.icon className="h-4.5 w-4.5 text-[#c2185b]" />
                  </div>
                  <h3 className="mt-4 text-sm font-semibold text-[#202223]">{card.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#5c5f62]">{card.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {card.items.map((item) => (
                      <span key={item} className="rounded-full border border-[#e4e7eb] bg-white px-2.5 py-1 text-[11px] font-medium text-[#414447]">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border border-[#dfe3e8] bg-white py-3 shadow-sm">
          <CardHeader className="border-b border-[#eceef0] pb-3">
            <CardTitle className="text-base text-[#202223]">Stack status</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-2">
              {stackStatus.map((item) => (
                <div key={item.label} className="rounded-xl border border-[#eceef0] bg-[#fafafa] px-3 py-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6d7175]">{item.label}</p>
                      <p className="mt-1 text-sm font-medium text-[#202223]">{item.value}</p>
                    </div>
                    <span className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${statusTone(item.status)}`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="border border-[#dfe3e8] bg-white py-3 shadow-sm">
          <CardHeader className="border-b border-[#eceef0] pb-3">
            <CardTitle className="text-base text-[#202223]">Execution tracker</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="overflow-hidden rounded-xl border border-[#e5e7eb]">
              <table className="min-w-full divide-y divide-[#e5e7eb] text-sm">
                <thead className="bg-[#f6f6f7] text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6d7175]">
                  <tr>
                    <th className="px-3 py-2.5">Area</th>
                    <th className="px-3 py-2.5">Status</th>
                    <th className="px-3 py-2.5">Owner</th>
                    <th className="px-3 py-2.5">Note</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#eceef0] bg-white">
                  {buildTracker.map((item) => (
                    <tr key={item.area} className="align-top hover:bg-[#f9fafb]">
                      <td className="px-3 py-3 font-medium text-[#202223]">{item.area}</td>
                      <td className="px-3 py-3">
                        <span className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${statusTone(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-[#5c5f62]">{item.owner}</td>
                      <td className="px-3 py-3 text-[#5c5f62]">{item.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-[#dfe3e8] bg-white py-3 shadow-sm">
          <CardHeader className="border-b border-[#eceef0] pb-3">
            <CardTitle className="text-base text-[#202223]">Recent work</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-2">
              {recentWork.map((item, index) => (
                <div key={item} className="flex gap-3 rounded-xl border border-[#eceef0] bg-[#fafafa] px-3 py-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#fff0f6] text-[11px] font-semibold text-[#c2185b] ring-1 ring-[#f8bfd5]">
                    {index + 1}
                  </div>
                  <p className="text-sm leading-6 text-[#202223]">{item}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <Card className="border border-[#dfe3e8] bg-white py-3 shadow-sm">
          <CardHeader className="border-b border-[#eceef0] pb-3">
            <CardTitle className="flex items-center gap-2 text-base text-[#202223]">
              <Database className="h-4 w-4 text-[#c2185b]" />
              Planned internal views
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="grid gap-3 sm:grid-cols-2">
              {seededViews.map((item) => (
                <div key={item.name} className="rounded-xl border border-[#eceef0] bg-[#fafafa] p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white ring-1 ring-[#eceef0]">
                    <item.icon className="h-4.5 w-4.5 text-[#c2185b]" />
                  </div>
                  <h3 className="mt-4 text-sm font-semibold text-[#202223]">{item.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#5c5f62]">{item.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border border-[#dfe3e8] bg-white py-3 shadow-sm">
          <CardHeader className="border-b border-[#eceef0] pb-3">
            <CardTitle className="flex items-center gap-2 text-base text-[#202223]">
              <Bot className="h-4 w-4 text-[#c2185b]" />
              What happens next
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-2">
              {[
                "Add Prisma tables so campaigns, scripts, creatives, and results become real records.",
                "Add forms to create angles, scripts, and creative runs from inside admin.",
                "Add an operator log so you can see what I changed and what is blocked without relying on chat history.",
                "Add basic result tracking first, then automation and channel connectors after the workflow is stable.",
              ].map((item) => (
                <div key={item} className="rounded-xl border border-[#eceef0] bg-[#fafafa] px-3 py-3 text-sm text-[#202223]">
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
