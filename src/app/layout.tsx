import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";

const poppins = Poppins({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Teragenix — Research-Grade Peptide Kits, Redefined",
  description:
    "Premium 99%+ purity peptide research kits bundled with bacteriostatic water, syringes, and alcohol swabs. Shipped fast, discreet, complete.",
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
        <Navbar />
        {children}
      </body>
    </html>
  );
}
