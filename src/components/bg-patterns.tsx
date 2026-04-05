/**
 * Teragenix Design Language — Background Patterns
 * 
 * Molecular grid, gradient blobs, and dot grid textures.
 * Use these as decorative layers behind content sections.
 */

export function MolecularGrid({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Hexagonal molecular pattern */}
        <pattern
          id="molecular-grid"
          x="0"
          y="0"
          width="60"
          height="52"
          patternUnits="userSpaceOnUse"
        >
          {/* Hexagon paths - molecular lattice */}
          <path
            d="M30 0 L60 15 L60 37 L30 52 L0 37 L0 15 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.08"
          />
          {/* Node dots at vertices */}
          <circle cx="30" cy="0" r="1.8" fill="currentColor" opacity="0.1" />
          <circle cx="60" cy="15" r="1.8" fill="currentColor" opacity="0.1" />
          <circle cx="60" cy="37" r="1.8" fill="currentColor" opacity="0.1" />
          <circle cx="30" cy="52" r="1.8" fill="currentColor" opacity="0.1" />
          <circle cx="0" cy="37" r="1.8" fill="currentColor" opacity="0.1" />
          <circle cx="0" cy="15" r="1.8" fill="currentColor" opacity="0.1" />
          {/* Center node */}
          <circle cx="30" cy="26" r="2.5" fill="currentColor" opacity="0.07" />
          {/* Internal bonds */}
          <line x1="30" y1="0" x2="30" y2="26" stroke="currentColor" strokeWidth="0.4" opacity="0.06" />
          <line x1="60" y1="15" x2="30" y2="26" stroke="currentColor" strokeWidth="0.4" opacity="0.06" />
          <line x1="0" y1="15" x2="30" y2="26" stroke="currentColor" strokeWidth="0.4" opacity="0.06" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#molecular-grid)" />
    </svg>
  );
}

export function DotGrid({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="dot-grid"
          x="0"
          y="0"
          width="24"
          height="24"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="12" cy="12" r="1" fill="currentColor" opacity="0.12" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dot-grid)" />
    </svg>
  );
}

export function GradientBlob({
  position = "top-right",
  color = "#4A90D9",
  size = "lg",
  className = "",
}: {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center";
  color?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}) {
  const positionClasses = {
    "top-left": "-top-32 -left-32",
    "top-right": "-top-32 -right-32",
    "bottom-left": "-bottom-32 -left-32",
    "bottom-right": "-bottom-32 -right-32",
    center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  };

  const sizeClasses = {
    sm: "w-64 h-64",
    md: "w-96 h-96",
    lg: "w-[32rem] h-[32rem]",
    xl: "w-[48rem] h-[48rem]",
  };

  return (
    <div
      className={`absolute ${positionClasses[position]} ${sizeClasses[size]} pointer-events-none ${className}`}
      style={{
        background: `radial-gradient(circle, ${color}20 0%, ${color}10 35%, transparent 70%)`,
        filter: "blur(50px)",
      }}
    />
  );
}

export function GlowLine({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full h-px relative ${className}`}>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #4A90D930 15%, #4A90D960 50%, #4A90D930 85%, transparent 100%)",
        }}
      />
    </div>
  );
}
