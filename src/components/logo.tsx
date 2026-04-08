import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  theme?: "default" | "light";
}

const sizeMap: Record<NonNullable<LogoProps["size"]>, { word: number; sup: number }> = {
  sm: { word: 22, sup: 9 },
  md: { word: 30, sup: 12 },
  lg: { word: 44, sup: 17 },
};

export function Logo({ className, size = "md", theme = "default" }: LogoProps) {
  const { word, sup } = sizeMap[size];
  const genixColor = theme === "light" ? "#ffffff" : "#0d262d";

  return (
    <span
      aria-label="Teragenix"
      className={cn("inline-flex select-none items-start font-semibold leading-none tracking-[-0.06em]", className)}
      style={{ fontSize: `${word}px` }}
    >
      <span style={{ color: "#3b6ed6" }}>tera</span>
      <span style={{ color: genixColor }}>genix</span>
      <span
        aria-hidden="true"
        className="ml-[0.08em] inline-block align-top font-semibold tracking-[-0.04em]"
        style={{
          color: genixColor,
          fontSize: `${sup}px`,
          transform: "translateY(-0.38em)",
        }}
      >
        12
      </span>
    </span>
  );
}
