import type { Metadata } from "next";
import { Red_Hat_Text, Montserrat } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";

const redHat = Red_Hat_Text({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
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
        className={`${redHat.variable} ${montserrat.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
