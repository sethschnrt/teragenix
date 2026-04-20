import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const poppins = Poppins({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://teragenix.vercel.app"),
  title: "Teragenix — Research-Grade Peptides, Refined",
  description:
    "Shop research-use peptides with clear specs, batch documentation, and product details you can verify before you buy.",
  openGraph: {
    title: "Teragenix — Research-Grade Peptides, Refined",
    description:
      "Shop research-use peptides with clear specs, batch documentation, and product details you can verify before you buy.",
    type: "website",
    siteName: "Teragenix",
  },
  twitter: {
    card: "summary_large_image",
    title: "Teragenix — Research-Grade Peptides, Refined",
    description:
      "Shop research-use peptides with clear specs, batch documentation, and product details you can verify before you buy.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased`}
        style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
