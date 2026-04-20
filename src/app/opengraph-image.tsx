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
  const [logoSrc, vialSrc] = await Promise.all([
    imageData("images/teragenix-logo-white-optimized.png"),
    imageData("images/hero-vial.png"),
  ]);

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(154deg, #1e4a9e 0%, #10366f 42%, #0d262d 100%)",
        color: "white",
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 28% 22%, rgba(255,255,255,0.18), transparent 34%), radial-gradient(circle at 78% 20%, rgba(168,197,245,0.16), transparent 24%)",
        }}
      />

      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          padding: "48px 54px",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: 640,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 250,
              height: 44,
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.18)",
              background: "rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,0.9)",
              fontSize: 17,
              fontWeight: 700,
              letterSpacing: "0.08em",
            }}
          >
            RESEARCH-GRADE PEPTIDES
          </div>

          <img
            src={logoSrc}
            alt="Teragenix"
            width={300}
            height={85}
            style={{ marginTop: 28 }}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 26,
              fontSize: 68,
              fontWeight: 700,
              lineHeight: 0.97,
              letterSpacing: "-0.055em",
            }}
          >
            <span>Peptides for Real</span>
            <span style={{ color: "#d4e4ff", fontStyle: "italic" }}>Progress.</span>
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 22,
              width: 560,
              color: "rgba(255,255,255,0.8)",
              fontSize: 24,
              lineHeight: 1.45,
              letterSpacing: "-0.02em",
            }}
          >
            Clear specs, batch documentation, and product details you can check without digging.
          </div>

          <div style={{ display: "flex", gap: 12, marginTop: 30, flexWrap: "wrap" }}>
            {[
              "Visible purity standards",
              "Batch-linked docs",
              "Storage guidance",
            ].map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: 44,
                  padding: "0 18px",
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "rgba(255,255,255,0.92)",
                  fontSize: 20,
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            position: "relative",
            display: "flex",
            width: 458,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: "34px 10px 56px 34px",
              borderRadius: 36,
              background: "radial-gradient(circle at 50% 38%, rgba(212,228,255,0.22), rgba(255,255,255,0.14) 42%, rgba(255,255,255,0.08) 100%)",
              border: "1px solid rgba(255,255,255,0.18)",
              boxShadow: "0 30px 80px rgba(4,14,32,0.34)",
            }}
          />

          <img
            src={vialSrc}
            alt="Teragenix vial"
            width={410}
            height={410}
            style={{ position: "relative", marginTop: 6 }}
          />

        </div>
      </div>
    </div>,
    size,
  );
}
