import {
  Activity,
  BarChart3,
  CircleAlert,
  Clapperboard,
  FileVideo,
  Flag,
  Layers3,
  Lightbulb,
  PenSquare,
  Sparkles,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const dynamic = "force-dynamic";

const summaryCards = [
  {
    label: "Screen type",
    value: "Hybrid dashboard",
    detail: "sprint tracker plus creation plus analytics",
    tone: "bg-blue-50 text-blue-700 border-blue-200",
  },
  {
    label: "Visible now",
    value: "/admin/ads",
    detail: "inside the Teragenix admin shell",
    tone: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    label: "Truth level",
    value: "Real UI, partial data",
    detail: "structure is live, ingestion is next",
    tone: "bg-amber-50 text-amber-700 border-amber-200",
  },
  {
    label: "Next build",
    value: "Prisma + forms",
    detail: "to make this fully trackable",
    tone: "bg-rose-50 text-rose-700 border-rose-200",
  },
] as const;

const sprintColumns = [
  {
    title: "Backlog",
    tone: "bg-[#f6f6f7] text-[#5c5f62] border-[#e1e3e5]",
    items: [
      {
        title: "Ad entity schema",
        meta: "Prisma",
        detail: "Persist campaigns, angles, scripts, creative runs, assets, and results snapshots.",
      },
      {
        title: "Result import flow",
        meta: "Analytics",
        detail: "Manual import first, then hook up channel connectors after the workflow is stable.",
      },
    ],
  },
  {
    title: "In Progress",
    tone: "bg-blue-50 text-blue-700 border-blue-200",
    items: [
      {
        title: "Dashboard direction",
        meta: "UX",
        detail: "Shifted from overview page to a single-screen tracker that shows creation plus performance.",
      },
    ],
  },
  {
    title: "Review",
    tone: "bg-violet-50 text-violet-700 border-violet-200",
    items: [
      {
        title: "Admin organization",
        meta: "Layout",
        detail: "Checking that the screen reads like an ops tool instead of a marketing page.",
      },
    ],
  },
  {
    title: "Live",
    tone: "bg-emerald-50 text-emerald-700 border-emerald-200",
    items: [
      {
        title: "Admin ads route",
        meta: "Deploy",
        detail: "The workspace lives in the admin now, not the storefront.",
      },
      {
        title: "Hybrid layout",
        meta: "UI",
        detail: "Command center, sprint board, video pipeline, and analytics areas now share one screen.",
      },
    ],
  },
  {
    title: "Blocked",
    tone: "bg-amber-50 text-amber-700 border-amber-200",
    items: [
      {
        title: "Real performance metrics",
        meta: "Data source",
        detail: "CTR, CPA, spend, and hold rate stay empty until we wire imports or platform connectors.",
      },
    ],
  },
] as const;

const pipelineStages = [
  {
    icon: Lightbulb,
    title: "Angle",
    status: "Awaiting tracked items",
    detail: "Each card should start with the pain point, hook, awareness level, and product focus.",
  },
  {
    icon: PenSquare,
    title: "Script",
    status: "Awaiting tracked items",
    detail: "Short scripts should carry the hook, main claim, CTA, narrator notes, and landing-page target.",
  },
  {
    icon: Sparkles,
    title: "Generate",
    status: "Awaiting tracked items",
    detail: "This stage should show provider, prompt version, reference assets, output links, and run status.",
  },
  {
    icon: Clapperboard,
    title: "Review",
    status: "Awaiting tracked items",
    detail: "Review is where we compare output quality, continuity, revisions, and approval notes.",
  },
  {
    icon: Layers3,
    title: "Landing Page",
    status: "Awaiting tracked items",
    detail: "Every creative should point to the page or offer it supports so message match stays visible.",
  },
  {
    icon: FileVideo,
    title: "Live",
    status: "Awaiting tracked items",
    detail: "Once live, the card should show channel, launch date, active spend, and winner or loser status.",
  },
] as const;

const kpiCards = [
  {
    label: "Spend",
    value: "—",
    detail: "waiting on first import",
  },
  {
    label: "CTR",
    value: "—",
    detail: "waiting on first import",
  },
  {
    label: "Hold rate",
    value: "—",
    detail: "waiting on first import",
  },
  {
    label: "CPC",
    value: "—",
    detail: "waiting on first import",
  },
  {
    label: "CPA",
    value: "—",
    detail: "waiting on first import",
  },
  {
    label: "Winners",
    value: "0",
    detail: "nothing tracked yet",
  },
] as const;

const operatorFeed = [
  {
    title: "Public content page removed from the main storefront flow",
    detail: "The app concept was moved back where it belongs, inside the admin workspace.",
  },
  {
    title: "Admin ads route reframed as a tracker",
    detail: "This screen now centers on work visibility instead of theory and system copy.",
  },
  {
    title: "Analytics are intentionally blank for now",
    detail: "I am not faking performance numbers. We need imports or connectors before those cards become real.",
  },
  {
    title: "Next technical step is persistence",
    detail: "The UI is ready for real cards, but Prisma entities and forms are what make it operational.",
  },
] as const;

const answerStrip = [
  "What is being made right now",
  "What is blocked or waiting",
  "What shipped already",
  "How each video moves through the pipeline",
  "How the ads are performing once data is wired",
] as const;

export default function AdminAdsPage() {
  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-[#dfe3e8] bg-white px-4 py-4 shadow-sm">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#c2185b]">Ads command center</p>
        <h2 className="mt-1 text-2xl font-semibold tracking-[-0.02em] text-[#202223]">
          One screen for sprint status, video creation, and performance.
        </h2>
        <p className="mt-2 max-w-3xl text-sm text-[#5c5f62]">
          This should work like an actual operator dashboard. Top tells you what is going on, middle shows how videos
          are moving, bottom shows how ads are performing. If data is not wired yet, the screen should say that plainly
          instead of pretending.
        </p>

        <div className="mt-4 grid gap-2 md:grid-cols-2 xl:grid-cols-4">
          {summaryCards.map((card) => (
            <div key={card.label} className={`rounded-xl border px-3 py-2 ${card.tone}`}>
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em]">{card.label}</p>
              <p className="mt-1 text-sm font-semibold">{card.value}</p>
              <p className="mt-1 text-[11px] opacity-80">{card.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.18fr_0.82fr]">
        <Card className="border border-[#dfe3e8] bg-white py-3 shadow-sm">
          <CardHeader className="border-b border-[#eceef0] pb-3">
            <CardTitle className="text-base text-[#202223]">Sprint board</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="grid gap-3 xl:grid-cols-5">
              {sprintColumns.map((column) => (
                <div key={column.title} className="rounded-xl border border-[#eceef0] bg-[#fafafa] p-3">
                  <div className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${column.tone}`}>
                    {column.title}
                  </div>
                  <div className="mt-3 space-y-2">
                    {column.items.map((item) => (
                      <div key={item.title} className="rounded-xl border border-[#e5e7eb] bg-white p-3 shadow-[0_1px_0_rgba(22,29,37,0.03)]">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-semibold text-[#202223]">{item.title}</p>
                          <span className="rounded-full bg-[#f6f6f7] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#6d7175]">
                            {item.meta}
                          </span>
                        </div>
                        <p className="mt-2 text-[13px] leading-5 text-[#5c5f62]">{item.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border border-[#dfe3e8] bg-white py-3 shadow-sm">
          <CardHeader className="border-b border-[#eceef0] pb-3">
            <CardTitle className="text-base text-[#202223]">What this page should answer</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-2">
              {answerStrip.map((item, index) => (
                <div key={item} className="flex gap-3 rounded-xl border border-[#eceef0] bg-[#fafafa] px-3 py-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#fff0f6] text-[11px] font-semibold text-[#c2185b] ring-1 ring-[#f8bfd5]">
                    {index + 1}
                  </div>
                  <p className="text-sm leading-6 text-[#202223]">{item}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-xl border border-[#f8d7da] bg-[#fff8f8] p-3 text-sm text-[#7a3a40]">
              The old version failed because it explained the system instead of tracking the work.
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <Card className="border border-[#dfe3e8] bg-white py-3 shadow-sm">
          <CardHeader className="border-b border-[#eceef0] pb-3">
            <CardTitle className="text-base text-[#202223]">Video creation pipeline</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {pipelineStages.map((stage) => (
                <div key={stage.title} className="rounded-xl border border-[#eceef0] bg-[#fafafa] p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eaf2ff] ring-1 ring-[#cfe0ff]">
                      <stage.icon className="h-4.5 w-4.5 text-[#0f62fe]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-[#202223]">{stage.title}</h3>
                      <p className="text-[11px] uppercase tracking-[0.14em] text-[#6d7175]">{stage.status}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-[#5c5f62]">{stage.detail}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border border-[#dfe3e8] bg-white py-3 shadow-sm">
          <CardHeader className="border-b border-[#eceef0] pb-3">
            <CardTitle className="text-base text-[#202223]">Pipeline notes</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-3">
              <div className="rounded-xl border border-[#eceef0] bg-[#fafafa] p-3">
                <div className="flex items-center gap-2">
                  <Flag className="h-4 w-4 text-[#c2185b]" />
                  <p className="text-sm font-semibold text-[#202223]">What each video card needs</p>
                </div>
                <p className="mt-2 text-sm leading-6 text-[#5c5f62]">
                  owner, priority, prompt version, asset links, latest output, blocker, and next action.
                </p>
              </div>
              <div className="rounded-xl border border-[#eceef0] bg-[#fafafa] p-3">
                <div className="flex items-center gap-2">
                  <CircleAlert className="h-4 w-4 text-[#b98900]" />
                  <p className="text-sm font-semibold text-[#202223]">Why the cards are empty</p>
                </div>
                <p className="mt-2 text-sm leading-6 text-[#5c5f62]">
                  I have not wired persistence yet, so I am showing the real structure without faking tracked jobs.
                </p>
              </div>
              <div className="rounded-xl border border-[#eceef0] bg-[#fafafa] p-3">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-[#0f62fe]" />
                  <p className="text-sm font-semibold text-[#202223]">Next step</p>
                </div>
                <p className="mt-2 text-sm leading-6 text-[#5c5f62]">
                  Add forms and entities so a new angle, script, or creative run appears here automatically.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.18fr_0.82fr]">
        <Card className="border border-[#dfe3e8] bg-white py-3 shadow-sm">
          <CardHeader className="border-b border-[#eceef0] pb-3">
            <CardTitle className="text-base text-[#202223]">Analytics command center</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="grid gap-2 md:grid-cols-3 xl:grid-cols-6">
              {kpiCards.map((card) => (
                <div key={card.label} className="rounded-xl border border-[#e5e7eb] bg-[#fafafa] px-3 py-3">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#6d7175]">{card.label}</p>
                  <p className="mt-2 text-lg font-semibold text-[#202223]">{card.value}</p>
                  <p className="mt-1 text-[11px] text-[#6d7175]">{card.detail}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 overflow-hidden rounded-xl border border-[#e5e7eb]">
              <table className="min-w-full divide-y divide-[#e5e7eb] text-sm">
                <thead className="bg-[#f6f6f7] text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6d7175]">
                  <tr>
                    <th className="px-3 py-2.5">Campaign</th>
                    <th className="px-3 py-2.5">Creative</th>
                    <th className="px-3 py-2.5">Spend</th>
                    <th className="px-3 py-2.5">CTR</th>
                    <th className="px-3 py-2.5">Hold</th>
                    <th className="px-3 py-2.5">CPA</th>
                    <th className="px-3 py-2.5">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  <tr>
                    <td colSpan={7} className="px-3 py-6 text-center text-sm text-[#6d7175]">
                      No tracked ad performance yet. This table becomes useful as soon as we add manual imports or source connectors.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-[#dfe3e8] bg-white py-3 shadow-sm">
          <CardHeader className="border-b border-[#eceef0] pb-3">
            <CardTitle className="text-base text-[#202223]">Operator feed</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-2">
              {operatorFeed.map((item) => (
                <div key={item.title} className="rounded-xl border border-[#eceef0] bg-[#fafafa] p-3">
                  <p className="text-sm font-semibold text-[#202223]">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-[#5c5f62]">{item.detail}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
