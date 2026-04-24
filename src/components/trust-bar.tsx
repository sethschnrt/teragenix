const tickerItems = [
  "PRODUCT DETAILS UP FRONT",
  "SPECS UP FRONT",
  "LESS GUESSWORK",
  "BATCH + COA STATUS",
] as const;

function TrustItem({ label }: { label: (typeof tickerItems)[number] }) {
  return (
    <div className="flex shrink-0 items-center gap-4 px-5 text-[12px] font-semibold tracking-[0.18em] text-[#0d262d] uppercase lg:px-6 lg:text-[11px]">
      <span className="h-1.5 w-1.5 rounded-full bg-[#3b6ed6] shadow-[0_0_0_4px_#edf4ff]" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}

function TrustTickerGroup({ copy }: { copy: "a" | "b" }) {
  const repeatedItems = Array.from({ length: 6 }, (_, setIndex) =>
    tickerItems.map((label) => ({ label, key: `${copy}-${setIndex}-${label}` })),
  ).flat();

  return (
    <div className="flex shrink-0 items-center" aria-hidden={copy === "b"}>
      {repeatedItems.map(({ label, key }) => (
        <TrustItem key={key} label={label} />
      ))}
    </div>
  );
}

export function TrustBar() {
  return (
    <section className="relative overflow-hidden bg-white pb-4 pt-9 lg:pb-3 lg:pt-7">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-linear-to-r from-white to-transparent lg:w-16" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-linear-to-l from-white to-transparent lg:w-16" />

      <div className="tg-marquee flex w-max whitespace-nowrap">
        <TrustTickerGroup copy="a" />
        <TrustTickerGroup copy="b" />
      </div>
    </section>
  );
}
