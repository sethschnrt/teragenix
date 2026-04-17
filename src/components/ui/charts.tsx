type ChartPoint = {
  label: string;
  value: number;
};

function formatValue(value: number, formatter?: (value: number) => string) {
  return formatter ? formatter(value) : value.toString();
}

export function MiniBarChart({
  data,
  formatter,
  colorClassName = "bg-[#173f85]",
}: {
  data: ChartPoint[];
  formatter?: (value: number) => string;
  colorClassName?: string;
}) {
  const max = Math.max(...data.map((point) => point.value), 0);

  if (data.length === 0 || max === 0) {
    return <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">No chart data yet.</div>;
  }

  return (
    <div className="grid grid-cols-6 gap-3">
      {data.map((point) => {
        const height = Math.max((point.value / max) * 140, 10);

        return (
          <div key={point.label} className="flex min-w-0 flex-col items-center gap-2">
            <span className="text-[11px] font-medium text-slate-500">{formatValue(point.value, formatter)}</span>
            <div className="flex h-36 w-full items-end justify-center rounded-xl bg-slate-50 px-2 py-2">
              <div className={`w-full rounded-lg ${colorClassName}`} style={{ height }} />
            </div>
            <span className="truncate text-[11px] text-slate-500">{point.label}</span>
          </div>
        );
      })}
    </div>
  );
}

export function MiniLineChart({
  data,
  formatter,
  stroke = "#173f85",
  fill = "rgba(23,63,133,0.10)",
}: {
  data: ChartPoint[];
  formatter?: (value: number) => string;
  stroke?: string;
  fill?: string;
}) {
  const width = 480;
  const height = 180;
  const padding = 18;
  const max = Math.max(...data.map((point) => point.value), 0);

  if (data.length === 0 || max === 0) {
    return <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">No chart data yet.</div>;
  }

  const points = data.map((point, index) => {
    const x = padding + (index * (width - padding * 2)) / Math.max(data.length - 1, 1);
    const y = height - padding - (point.value / max) * (height - padding * 2);
    return { ...point, x, y };
  });

  const linePoints = points.map((point) => `${point.x},${point.y}`).join(" ");
  const areaPoints = `0,${height - padding} ${points.map((point) => `${point.x},${point.y}`).join(" ")} ${width},${height - padding}`;

  return (
    <div className="space-y-3">
      <svg viewBox={`0 0 ${width} ${height}`} className="h-44 w-full overflow-visible">
        <path d={`M ${areaPoints.replace(/ /g, " L ")} Z`} fill={fill} />
        <polyline fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" points={linePoints} />
        {points.map((point) => (
          <circle key={point.label} cx={point.x} cy={point.y} r="4" fill={stroke} />
        ))}
      </svg>
      <div className="grid grid-cols-6 gap-3">
        {data.map((point) => (
          <div key={point.label} className="min-w-0 text-center">
            <p className="truncate text-[11px] text-slate-500">{point.label}</p>
            <p className="mt-1 text-[11px] font-medium text-slate-700">{formatValue(point.value, formatter)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MiniProgressChart({
  data,
  formatter,
}: {
  data: ChartPoint[];
  formatter?: (value: number) => string;
}) {
  const total = data.reduce((sum, point) => sum + point.value, 0);

  if (data.length === 0 || total === 0) {
    return <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">No chart data yet.</div>;
  }

  return (
    <div className="space-y-4">
      {data.map((point, index) => {
        const width = `${Math.max((point.value / total) * 100, 6)}%`;
        const colors = ["bg-[#173f85]", "bg-[#2f6ad8]", "bg-[#6ea4ff]", "bg-[#9dbfff]", "bg-[#c7dcff]"];

        return (
          <div key={point.label} className="space-y-2">
            <div className="flex items-center justify-between gap-3 text-sm">
              <span className="font-medium text-slate-700">{point.label}</span>
              <span className="text-slate-500">{formatValue(point.value, formatter)}</span>
            </div>
            <div className="h-2.5 rounded-full bg-slate-100">
              <div className={`h-2.5 rounded-full ${colors[index % colors.length]}`} style={{ width }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
