import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  theme?: "default" | "light";
}

const sizeClasses = {
  sm: "text-[18px]",
  md: "text-[22px]",
  lg: "text-[34px]",
};

export function Logo({ className, size = "md", theme = "default" }: LogoProps) {
  const isLight = theme === "light";
  return (
    <span
      className={cn(
        "font-display font-semibold tracking-[-0.01em] select-none",
        sizeClasses[size],
        className
      )}
    >
      <span className={isLight ? "text-white" : "text-[#171a18]"}>tera</span>
      <span className={isLight ? "italic text-[#c9e3c5]" : "italic text-[#1b6549]"}>
        genix
      </span>
      <sup
        className={cn(
          "ml-0.5 align-top text-[0.42em] font-semibold",
          isLight ? "text-white/70" : "text-[#1b6549]"
        )}
      >
        12
      </sup>
    </span>
  );
}
