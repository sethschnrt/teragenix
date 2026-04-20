"use client";

import { useMemo, useState } from "react";
import { BarChart3, Clapperboard, Layers3, PenSquare, Sparkles } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const dynamic = "force-dynamic";

type Stage = "angle" | "script" | "generate" | "review" | "live";
type StageFilter = Stage | "all";

type BoardItem = {
  id: string;
  title: string;
  meta: string;
  stage: Stage;
};

type BoardColumn = {
  title: string;
  tone: string;
  items: BoardItem[];
};

type AnalyticsRow = {
  id: string;
  campaign: string;
  creative: string;
  spend: string;
  ctr: string;
  hold: string;
  cpa: string;
  status: string;
  stage: Stage;
};

const stageConfig: { id: Stage; title: string; icon: typeof Sparkles }[] = [
  { id: "angle", title: "Angle", icon: Sparkles },
  { id: "script", title: "Script", icon: PenSquare },
  { id: "generate", title: "Generate", icon: Clapperboard },
  { id: "review", title: "Review", icon: Layers3 },
  { id: "live", title: "Live", icon: BarChart3 },
];

const boardColumns: BoardColumn[] = [
  {
    title: "Backlog",
    tone: "bg-[#f6f6f7] text-[#5c5f62] border-[#e1e3e5]",
    items: [],
  },
  {
    title: "In Progress",
    tone: "bg-blue-50 text-blue-700 border-blue-200",
    items: [],
  },
  {
    title: "Review",
    tone: "bg-violet-50 text-violet-700 border-violet-200",
    items: [],
  },
  {
    title: "Live",
    tone: "bg-emerald-50 text-emerald-700 border-emerald-200",
    items: [],
  },
  {
    title: "Blocked",
    tone: "bg-amber-50 text-amber-700 border-amber-200",
    items: [],
  },
];

const analyticsRows: AnalyticsRow[] = [];

const allBoardItems = boardColumns.flatMap((column) => column.items);

export default function AdminAdsPage() {
  const [selectedStage, setSelectedStage] = useState<StageFilter>("all");
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const stageCounts = useMemo(() => {
    return stageConfig.reduce<Record<Stage, number>>((acc, stage) => {
      acc[stage.id] = allBoardItems.filter((item) => item.stage === stage.id).length;
      return acc;
    }, { angle: 0, script: 0, generate: 0, review: 0, live: 0 });
  }, []);

  const filteredColumns = useMemo(() => {
    return boardColumns.map((column) => ({
      ...column,
      items: selectedStage === "all" ? column.items : column.items.filter((item) => item.stage === selectedStage),
    }));
  }, [selectedStage]);

  const filteredAnalytics = useMemo(() => {
    return selectedStage === "all" ? analyticsRows : analyticsRows.filter((row) => row.stage === selectedStage);
  }, [selectedStage]);

  const activeCount = filteredColumns
    .filter((column) => column.title === "In Progress" || column.title === "Review")
    .reduce((sum, column) => sum + column.items.length, 0);
  const blockedCount = filteredColumns.find((column) => column.title === "Blocked")?.items.length ?? 0;
  const liveCount = filteredColumns.find((column) => column.title === "Live")?.items.length ?? 0;
  const selectedCount = selectedStage === "all" ? allBoardItems.length : stageCounts[selectedStage];

  function activateStage(stage: StageFilter) {
    setSelectedStage(stage);
    if (stage === "all") {
      setSelectedItemId(null);
    }
  }

  function handleSelectItem(item: BoardItem) {
    setSelectedItemId(item.id);
    setSelectedStage(item.stage);
  }

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
          {[
            { label: "Active", value: String(activeCount) },
            { label: "Blocked", value: String(blockedCount) },
            { label: "Live", value: String(liveCount) },
            { label: "Showing", value: String(selectedCount) },
          ].map((card) => (
            <div key={card.label} className="rounded-xl border border-[#e5e7eb] bg-[#fafafa] px-3 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#6d7175]">{card.label}</p>
              <p className="mt-2 text-xl font-semibold text-[#202223]">{card.value}</p>
            </div>
          ))}
        </div>
      </section>

      <Card className="border border-[#dfe3e8] bg-white py-3 shadow-sm">
        <CardHeader className="border-b border-[#eceef0] pb-3">
          <CardTitle className="text-base text-[#202223]">Pipeline</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => activateStage("all")}
              className={`rounded-xl border px-3 py-2 text-sm font-semibold transition ${
                selectedStage === "all"
                  ? "border-[#0f62fe] bg-[#eaf2ff] text-[#0f62fe]"
                  : "border-[#e5e7eb] bg-[#fafafa] text-[#202223] hover:bg-[#f4f8ff]"
              }`}
            >
              All
            </button>
            {stageConfig.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => activateStage(item.id)}
                className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold transition ${
                  selectedStage === item.id
                    ? "border-[#0f62fe] bg-[#eaf2ff] text-[#0f62fe]"
                    : "border-[#e5e7eb] bg-[#fafafa] text-[#202223] hover:bg-[#f4f8ff]"
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
                <span className="rounded-full bg-white/80 px-2 py-0.5 text-[10px] font-semibold leading-5 ring-1 ring-inset ring-[#dfe3e8]">
                  {stageCounts[item.id]}
                </span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border border-[#dfe3e8] bg-white py-3 shadow-sm">
        <CardHeader className="border-b border-[#eceef0] pb-3">
          <CardTitle className="text-base text-[#202223]">Sprint Board</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid gap-3 xl:grid-cols-5">
            {filteredColumns.map((column) => (
              <div key={column.title} className="rounded-xl border border-[#eceef0] bg-[#fafafa] p-3">
                <div className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${column.tone}`}>
                  {column.title}
                </div>
                <div className="mt-3 space-y-2">
                  {column.items.length > 0 ? (
                    column.items.map((item) => {
                      const active = selectedItemId === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleSelectItem(item)}
                          className={`block w-full rounded-xl border bg-white p-3 text-left transition ${
                            active
                              ? "border-[#0f62fe] ring-2 ring-[#cfe0ff]"
                              : "border-[#e5e7eb] hover:border-[#cfe0ff] hover:bg-[#fbfdff]"
                          }`}
                        >
                          <p className="text-sm font-semibold text-[#202223]">{item.title}</p>
                          <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6d7175]">{item.meta}</p>
                        </button>
                      );
                    })
                  ) : (
                    <div className="rounded-xl border border-dashed border-[#d8dadd] bg-white px-3 py-6 text-center text-xs font-medium text-[#9ca3af]">
                      empty
                    </div>
                  )}
                </div>
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
                {filteredAnalytics.length > 0 ? (
                  filteredAnalytics.map((row) => (
                    <tr key={row.id} className={`hover:bg-[#f9fafb] ${selectedItemId === row.id ? "bg-[#f4f8ff]" : ""}`}>
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
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-3 py-6 text-center text-sm text-[#9ca3af]">
                      empty
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
