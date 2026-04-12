import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  theme?: "default" | "light";
}

const BASE_PATH = process.env.NODE_ENV === "production" ? "/teragenix" : "";

const sizeMap: Record<NonNullable<LogoProps["size"]>, { width: number; height: number }> = {
  sm: { width: 72, height: 20 },
  md: { width: 104, height: 29 },
  lg: { width: 156, height: 44 },
};

const srcMap: Record<NonNullable<LogoProps["theme"]>, string> = {
  default: `${BASE_PATH}/images/teragenix-logo-dark-optimized.png`,
  light: `${BASE_PATH}/images/teragenix-logo-white-optimized.png`,
};

export function Logo({ className, size = "md", theme = "default" }: LogoProps) {
  const { width, height } = sizeMap[size];

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={srcMap[theme]}
      alt="Teragenix"
      width={width}
      height={height}
      className={cn("block h-auto w-auto max-w-full select-none", className)}
      draggable={false}
    />
  );
}
