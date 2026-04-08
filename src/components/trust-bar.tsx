const tickerItems = [
  "PREMIUM PEPTIDE FORMULAS",
  "DISCREET DOMESTIC SHIPPING",
  "FAST ORDER PROCESSING",
  "EASY REORDERING",
  "SECURE CHECKOUT",
  "PREMIUM CUSTOMER EXPERIENCE",
];

export function TrustBar() {
  // Duplicate for seamless loop
  const loop = [...tickerItems, ...tickerItems];
  return (
    <section className="relative overflow-hidden border-y border-[#e3e8ef] bg-[#f4f8ff] py-5 lg:py-3">
      <div className="cg-ticker flex whitespace-nowrap">
        {loop.map((item, i) => (
          <div
            key={`${item}-${i}`}
            className="flex shrink-0 items-center gap-10 px-5 font-sans text-[11px] font-medium tracking-[0.22em] text-[#0d262d] lg:text-[10px]"
          >
            <span>{item}</span>
            <span className="flex h-1.5 w-1.5 rounded-full bg-[#4a8dd9]" />
          </div>
        ))}
      </div>
    </section>
  );
}
