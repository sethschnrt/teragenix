import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Providers } from "@/components/providers";

const poppins = Poppins({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://teragenix.vercel.app"),
  title: "Teragenix | Research Grade Peptides",
  description:
    "Shop research-use peptides with clear specs, batch documentation, and product details you can verify before you buy.",
  openGraph: {
    title: "Teragenix | Research Grade Peptides",
    description:
      "Shop research-use peptides with clear specs, batch documentation, and product details you can verify before you buy.",
    type: "website",
    siteName: "Teragenix",
  },
  twitter: {
    card: "summary_large_image",
    title: "Teragenix | Research Grade Peptides",
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
        <Script
          id="teragenix-chrome-state"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var root=document.documentElement;var now=Date.now();var ageRaw=window.localStorage.getItem('teragenix-age-gate-v1');var ageAcceptedAt=0;if(ageRaw){try{ageAcceptedAt=JSON.parse(ageRaw).acceptedAt||0}catch(e){ageAcceptedAt=0}}var ageAccepted=now-ageAcceptedAt<=1000*60*60*24*30;var cookieAccepted=window.localStorage.getItem('teragenix-cookie-consent-v1')==='accepted'||document.cookie.indexOf('teragenix_cookie_consent=accepted')!==-1;root.dataset.ageGateOpen=ageAccepted?'false':'true';root.dataset.cookieBannerVisible=ageAccepted&&!cookieAccepted?'true':'false';}catch(e){document.documentElement.dataset.ageGateOpen='true';document.documentElement.dataset.cookieBannerVisible='false';}})();`,
          }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
