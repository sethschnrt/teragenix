import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";
export const alt = "Teragenix — Peptides for real progress";
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
  const logoSrc = await imageData("images/teragenix-logo-dark-optimized.png");

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        background: "#ffffff",
        color: "#0d262d",
        fontFamily: "Inter, Arial, sans-serif",
        padding: "0 110px",
      }}
    >
      <img src={logoSrc} alt="Teragenix" width={330} height={94} />

      <div
        style={{
          marginTop: 34,
          fontSize: 64,
          lineHeight: 1.02,
          letterSpacing: "-0.055em",
          fontWeight: 600,
          color: "#0d262d",
          maxWidth: 720,
        }}
      >
        Peptides for real progress
      </div>
    </div>,
    size,
  );
}
