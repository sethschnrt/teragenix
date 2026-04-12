interface RegulatoryDisclaimerProps {
  variant?: "light" | "dark";
  className?: string;
}

const disclaimerText = "These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease. Not for human consumption.";

export function RegulatoryDisclaimer({ variant = "light", className = "" }: RegulatoryDisclaimerProps) {
  const isDark = variant === "dark";

  return (
    <div
      className={`rounded-[1.5rem] border px-5 py-5 sm:px-6 sm:py-6 ${
        isDark
          ? "border-white/14 bg-white/8 text-white"
          : "border-[#dbe6f5] bg-[#f8fbff] text-[#0d262d]"
      } ${className}`.trim()}
    >
      <p
        className={`text-[11px] font-semibold uppercase tracking-[0.22em] ${
          isDark ? "text-[#a8c5f5]" : "text-[#3b6ed6]"
        }`}
      >
        Research use only
      </p>
      <p className={`mt-3 text-[13px] leading-6 sm:text-[14px] ${isDark ? "text-white/88" : "text-[#0d262d]/78"}`}>
        {disclaimerText}
      </p>
    </div>
  );
}
