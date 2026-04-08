const tickerItems = [
  {
    label: "LICENSED MEDICAL PROVIDERS",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <path d="M12 3l7 3v5c0 4.5-2.9 8.6-7 10-4.1-1.4-7-5.5-7-10V6l7-3Z" />
        <path d="M9.5 12h5" />
        <path d="M12 9.5v5" />
      </svg>
    ),
  },
  {
    label: "100% ONLINE",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <rect x="4" y="5" width="16" height="11" rx="2" />
        <path d="M8 19h8" />
        <path d="M12 16v3" />
      </svg>
    ),
  },
  {
    label: "CLEAR PRICING",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <path d="M12 3v18" />
        <path d="M16 7.5c0-1.9-1.8-3.5-4-3.5s-4 1.6-4 3.5 1.4 2.8 4 3.5 4 1.6 4 3.5-1.8 3.5-4 3.5-4-1.6-4-3.5" />
      </svg>
    ),
  },
  {
    label: "SHIPPED TO YOUR DOOR",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <path d="M3 7h11v8H3z" />
        <path d="M14 10h3l4 3v2h-7z" />
        <circle cx="8" cy="18" r="1.5" />
        <circle cx="18" cy="18" r="1.5" />
      </svg>
    ),
  },
] as const;

function TrustItem({ label, icon }: (typeof tickerItems)[number]) {
  return (
    <div className="flex shrink-0 items-center gap-3 px-5 text-[12px] font-semibold tracking-[0.18em] text-[#0d262d] uppercase lg:px-6 lg:text-[11px]">
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#eef4fc] text-[#3b6ed6] ring-1 ring-[#d9e6f7]">
        {icon}
      </span>
      <span>{label}</span>
    </div>
  );
}

export function TrustBar() {
  return (
    <section className="relative overflow-hidden bg-white pb-4 pt-9 lg:pb-3 lg:pt-7">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-linear-to-r from-white to-transparent lg:w-16" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-linear-to-l from-white to-transparent lg:w-16" />

      <div className="tg-marquee flex w-max whitespace-nowrap">
        <div className="flex shrink-0 items-center">
          {tickerItems.map((item) => (
            <TrustItem key={`a-${item.label}`} {...item} />
          ))}
        </div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {tickerItems.map((item) => (
            <TrustItem key={`b-${item.label}`} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
