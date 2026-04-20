import { BarChart3, Clapperboard, Layers3, PenSquare, Sparkles } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const dynamic = "force-dynamic";

const summaryCards = [
  { label: "Active", value: "2" },
  { label: "Blocked", value: "1" },
  { label: "Live", value: "2" },
  { label: "Winners", value: "0" },
] as const;

const boardColumns = [
  {
    title: "Backlog",
    tone: "bg-[#f6f6f7] text-[#5c5f62] border-[#e1e3e5]",
    items: [
      { title: "Ad schema", meta: "Prisma" },
      { title: "Results import", meta: "Analytics" },
    ],
  },
  {
    title: "In Progress",
    tone: "bg-blue-50 text-blue-700 border-blue-200",
    items: [{ title: "Ads dashboard cleanup", meta: "UI" }],
  },
  {
    title: "Review",
    tone: "bg-violet-50 text-violet-700 border-violet-200",
    items: [{ title: "Admin layout pass", meta: "UX" }],
  },
  {
    title: "Live",
    tone: "bg-emerald-50 text-emerald-700 border-emerald-200",
    items: [
      { title: "Admin ads route", meta: "Deploy" },
      { title: "Hybrid tracker", meta: "UI" },
    ],
  },
  {
    title: "Blocked",
    tone: "bg-amber-50 text-amber-700 border-amber-200",
    items: [{ title: "Performance data", meta: "Source" }],
  },
] as const;

const pipeline = [
  { icon: Sparkles, title: "Angle" },
  { icon: PenSquare, title: "Script" },
  { icon: Clapperboard, title: "Generate" },
  { icon: Layers3, title: "Review" },
  { icon: BarChart3, title: "Live" },
] as const;

const analyticsRows = [
  { campaign: "Fat loss angle test", creative: "Waiting", spend: "—", ctr: "—", hold: "—", cpa: "—", status: "No data" },
  { campaign: "Retatrutide offer", creative: "Waiting", spend: "—", ctr: "—", hold: "—", cpa: "—", status: "No data" },
] as const;

export default function AdminAdsPage() {
  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-[#dfe3e8] bg-white px-4 py-4 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-2xl font-semibold tracking-[-0.02em] text-[#202223]">Ads</h2>
          <div className="rounded-full border border-[#f8bfd5] bg-[#fff7fb] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#c2185b]">
            admin workspace
          </div>
        </div>
        <div className="mt-4 grid gap-2 md:grid-cols-4">
          {summaryCards.map((card) => (
            <div key={card.label} className="rounded-xl border border-[#e5e7eb] bg-[#fafafa] px-3 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#6d7175]">{card.label}</p>
              <p className="mt-2 text-xl font-semibold text-[#202223]">{card.value}</p>
            </div>
          ))}
        </div>
      </section>

      <Card className="border border-[#dfe3e8] bg-white py-3 shadow-sm">
        <CardHeader className="border-b border-[#eceef0] pb-3">
          <CardTitle className="text-base text-[#202223]">Sprint Board</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid gap-3 xl:grid-cols-5">
            {boardColumns.map((column) => (
              <div key={column.title} className="rounded-xl border border-[#eceef0] bg-[#fafafa] p-3">
                <div className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${column.tone}`}>
                  {column.title}
                </div>
                <div className="mt-3 space-y-2">
                  {column.items.map((item) => (
                    <div key={item.title} className="rounded-xl border border-[#e5e7eb] bg-white p-3">
                      <p className="text-sm font-semibold text-[#202223]">{item.title}</p>
                      <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6d7175]">{item.meta}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <Card className="border border-[#dfe3e8] bg-white py-3 shadow-sm">
          <CardHeader className="border-b border-[#eceef0] pb-3">
            <CardTitle className="text-base text-[#202223]">Pipeline</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
              {pipeline.map((item) => (
                <div key={item.title} className="flex items-center gap-3 rounded-xl border border-[#e5e7eb] bg-[#fafafa] px-3 py-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eaf2ff] ring-1 ring-[#cfe0ff]">
                    <item.icon className="h-4.5 w-4.5 text-[#0f62fe]" />
                  </div>
                  <p className="text-sm font-semibold text-[#202223]">{item.title}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border border-[#dfe3e8] bg-white py-3 shadow-sm">
          <CardHeader className="border-b border-[#eceef0] pb-3">
            <CardTitle className="text-base text-[#202223]">Analytics</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="overflow-hidden rounded-xl border border-[#e5e7eb]">
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
                <tbody className="divide-y divide-[#eceef0] bg-white">
                  {analyticsRows.map((row) => (
                    <tr key={row.campaign} className="hover:bg-[#f9fafb]">
                      <td className="px-3 py-3 font-medium text-[#202223]">{row.campaign}</td>
                      <td className="px-3 py-3 text-[#5c5f62]">{row.creative}</td>
                      <td className="px-3 py-3 text-[#5c5f62]">{row.spend}</td>
                      <td className="px-3 py-3 text-[#5c5f62]">{row.ctr}</td>
                      <td className="px-3 py-3 text-[#5c5f62]">{row.hold}</td>
                      <td className="px-3 py-3 text-[#5c5f62]">{row.cpa}</td>
                      <td className="px-3 py-3">
                        <span className="rounded-full border border-[#e1e3e5] bg-[#f6f6f7] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#6d7175]">
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
