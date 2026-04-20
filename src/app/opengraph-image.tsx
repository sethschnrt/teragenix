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
        background: "linear-gradient(154deg, #1e4a9e 0%, #10366f 46%, #0d262d 100%)",
        color: "white",
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 24% 22%, rgba(255,255,255,0.14), transparent 32%), radial-gradient(circle at 78% 34%, rgba(168,197,245,0.14), transparent 26%)",
        }}
      />

      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          padding: "58px 64px",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: 560,
          }}
        >
          <img
            src={logoSrc}
            alt="Teragenix"
            width={308}
            height={87}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 34,
              fontSize: 74,
              fontWeight: 700,
              lineHeight: 0.95,
              letterSpacing: "-0.06em",
            }}
          >
            <span>Peptides for Real</span>
            <span style={{ color: "#d8e7ff", fontStyle: "italic" }}>Progress.</span>
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 24,
              width: 520,
              color: "rgba(255,255,255,0.86)",
              fontSize: 27,
              lineHeight: 1.4,
              letterSpacing: "-0.02em",
            }}
          >
            Clear specs, batch documentation, and product details you can verify before you buy.
          </div>
        </div>

        <div
          style={{
            position: "relative",
            display: "flex",
            width: 450,
            height: 470,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: 400,
              height: 400,
              borderRadius: 999,
              background: "radial-gradient(circle, rgba(255,255,255,0.18) 0%, rgba(168,197,245,0.10) 38%, rgba(255,255,255,0) 72%)",
            }}
          />

          <img
            src={heroSrc}
            alt="Teragenix lifestyle image"
            width={390}
            height={390}
            style={{
              position: "relative",
              objectFit: "contain",
              transform: "translate(-10px, -8px)",
              filter: "drop-shadow(0 18px 40px rgba(5, 16, 34, 0.22))",
            }}
          />
        </div>
      </div>
    </div>,
    size,
  );
}
