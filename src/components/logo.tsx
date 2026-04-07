import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  theme?: "default" | "light";
}

// Use the actual Teragenix logo PNGs shipped with the repo.
// The same PNG works on both light and dark surfaces, but we keep the theme prop
// for API compatibility and for picking the right asset if we add an inverted variant.
const sizeHeight: Record<NonNullable<LogoProps["size"]>, number> = {
  sm: 22,
  md: 30,
  lg: 44,
};

const BASE_PATH = process.env.NODE_ENV === "production" ? "/teragenix" : "";

export function Logo({ className, size = "md", theme = "default" }: LogoProps) {
  const h = sizeHeight[size];
  // Logo PNG is 2619x742 → aspect 3.53
  const w = Math.round(h * 3.53);
  // Light variant (for dark backgrounds) uses white "genix". Default uses dark navy.
  // We only have the dark-variant PNG in the repo, so for light theme we swap to the raw/white render.
  const src =
    theme === "light"
      ? `${BASE_PATH}/images/teragenix-logo-light.png`
      : `${BASE_PATH}/images/teragenix-logo-dark.png`;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt="Teragenix"
      width={w}
      height={h}
      className={cn("select-none object-contain", className)}
      style={{ height: `${h}px`, width: "auto" }}
    />
  );
}
