const tickerItems = [
  "LAB-TESTED PURITY ≥ 99%",
  "COA WITH EVERY BATCH",
  "COMPLETE RESEARCH KITS",
  "DISCREET DOMESTIC SHIPPING",
  "SHIPPED WITHIN 24 HOURS",
  "FREE SHIPPING OVER $150",
];

export function TrustBar() {
  // Duplicate for seamless loop
  const loop = [...tickerItems, ...tickerItems];
  return (
    <section className="relative overflow-hidden border-y border-[#ebe5dc] bg-[#faf9f7] py-5">
      <div className="cg-ticker flex whitespace-nowrap">
        {loop.map((item, i) => (
          <div
            key={`${item}-${i}`}
            className="flex shrink-0 items-center gap-10 px-5 font-display text-[11px] font-medium tracking-[0.22em] text-[#171a18]"
          >
            <span>{item}</span>
            <span className="flex h-1.5 w-1.5 rounded-full bg-[#779d7c]" />
          </div>
        ))}
      </div>
    </section>
  );
}
