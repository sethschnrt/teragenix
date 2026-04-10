import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  theme?: "default" | "light";
}

const sizeMap: Record<NonNullable<LogoProps["size"]>, { width: number; height: number }> = {
  sm: { width: 120, height: 34 },
  md: { width: 170, height: 48 },
  lg: { width: 240, height: 68 },
};

const srcMap: Record<NonNullable<LogoProps["theme"]>, string> = {
  default: "/images/teragenix-logo-dark.png",
  light: "/images/teragenix-logo-light.png",
};

export function Logo({ className, size = "md", theme = "default" }: LogoProps) {
  const { width, height } = sizeMap[size];

  return (
    <Image
      src={srcMap[theme]}
      alt="Teragenix"
      width={width}
      height={height}
      className={cn("h-auto w-auto max-w-full select-none", className)}
      priority
    />
  );
}
