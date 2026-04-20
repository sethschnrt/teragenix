import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";
export const alt = "Teragenix — Research-Grade Peptides, Refined";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

async function imageData(relativePath: string) {
  const file = await readFile(path.join(process.cwd(), "public", relativePath));
  const mime = relativePath.endsWith(".webp") ? "image/webp" : "image/png";
  return `data:${mime};base64,${file.toString("base64")}`;
}

export default async function OpenGraphImage() {
  const [logoSrc, heroSrc] = await Promise.all([
    imageData("images/teragenix-logo-white-optimized.png"),
    imageData("images/generated/hero-cards-v2-cutout/recovery-man-31.png"),
  ]);

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(154deg, #1e4a9e 0%, #10366f 48%, #14375a 100%)",
        color: "white",
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 22% 18%, rgba(255,255,255,0.12), transparent 30%), radial-gradient(circle at 78% 26%, rgba(168,197,245,0.12), transparent 24%)",
        }}
      />

      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          padding: "56px 72px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: 560,
          }}
        >
          <img src={logoSrc} alt="Teragenix" width={290} height={82} />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 36,
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 0.94,
              letterSpacing: "-0.06em",
            }}
          >
            <span>Peptides for Real</span>
            <span style={{ color: "#d8e7ff", fontStyle: "italic" }}>Progress.</span>
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 26,
              width: 450,
              color: "rgba(255,255,255,0.84)",
              fontSize: 26,
              lineHeight: 1.35,
              letterSpacing: "-0.02em",
            }}
          >
            Research-use peptides with clearer specs, cleaner documentation, and a better storefront experience.
          </div>
        </div>

        <div
          style={{
            position: "relative",
            display: "flex",
            width: 430,
            height: 430,
            alignItems: "flex-end",
            justifyContent: "center",
            borderRadius: 34,
            background: "#e4f3f5",
            overflow: "hidden",
            boxShadow: "0 24px 70px rgba(4,14,32,0.22)",
          }}
        >
          <img
            src={heroSrc}
            alt="Teragenix hero visual"
            width={380}
            height={380}
            style={{
              objectFit: "contain",
              transform: "translateY(14px)",
            }}
          />
        </div>
      </div>
    </div>,
    size,
  );
}
