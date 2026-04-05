import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "text-xl",
  md: "text-2xl",
  lg: "text-4xl",
};

export function Logo({ className, size = "md" }: LogoProps) {
  return (
    <span
      className={cn(
        "font-bold tracking-tight select-none",
        sizeClasses[size],
        className
      )}
    >
      <span className="text-[#4A90D9]">TERA</span>
      <span className="text-[#1a2a3a] dark:text-white">GENIX</span>
      <sup className="text-[0.45em] text-[#4A90D9] font-semibold ml-[1px] -top-[0.9em]">
        12
      </sup>
    </span>
  );
}
