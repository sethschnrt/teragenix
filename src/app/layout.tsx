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
            __html: `(function(){function applyA11ySettings(root){try{var raw=window.localStorage.getItem('teragenix-accessibility-settings');var parsed=raw?JSON.parse(raw):{};var textSize=parsed&&typeof parsed.textSize==='string'?parsed.textSize:'default';if(textSize!=='default'&&textSize!=='large'&&textSize!=='xlarge'){textSize='default'}root.dataset.textSize=textSize;root.dataset.contrast=parsed&&parsed.contrast===true?'high':'default';root.dataset.reduceMotion=parsed&&parsed.reduceMotion===true?'true':'false';root.dataset.focusHighlight=parsed&&parsed.focusHighlight===true?'true':'false'}catch(e){root.dataset.textSize='default';root.dataset.contrast='default';root.dataset.reduceMotion='false';root.dataset.focusHighlight='false'}}try{var root=document.documentElement;applyA11ySettings(root);var now=Date.now();var ageRaw=window.localStorage.getItem('teragenix-age-gate-v1');var ageAcceptedAt=0;if(ageRaw){try{ageAcceptedAt=JSON.parse(ageRaw).acceptedAt||0}catch(e){ageAcceptedAt=0}}var ageAccepted=now-ageAcceptedAt<=1000*60*60*24*30;var cookieAccepted=window.localStorage.getItem('teragenix-cookie-consent-v1')==='accepted'||document.cookie.indexOf('teragenix_cookie_consent=accepted')!==-1;root.dataset.ageGateOpen=ageAccepted?'false':'true';root.dataset.cookieBannerVisible=ageAccepted&&!cookieAccepted?'true':'false';}catch(e){document.documentElement.dataset.ageGateOpen='true';document.documentElement.dataset.cookieBannerVisible='false';}})();`,
          }}
        />
        <Script
          id="teragenix-hover-runtime"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){var selector='.tg-link-pill,.tg-link-card,.tg-hero-card';function closestTarget(node){return node&&node.closest?node.closest(selector):null}function addHover(el){if(el)el.classList.add('tg-hover-active')}function removeHover(el){if(el)el.classList.remove('tg-hover-active')}document.addEventListener('mouseover',function(event){var el=closestTarget(event.target);if(!el)return;var related=closestTarget(event.relatedTarget);if(related===el)return;addHover(el)},true);document.addEventListener('mouseout',function(event){var el=closestTarget(event.target);if(!el)return;var related=closestTarget(event.relatedTarget);if(related===el)return;removeHover(el)},true);document.addEventListener('touchstart',function(){document.querySelectorAll('.tg-hover-active').forEach(function(el){el.classList.remove('tg-hover-active')})},{passive:true});window.addEventListener('blur',function(){document.querySelectorAll('.tg-hover-active').forEach(function(el){el.classList.remove('tg-hover-active')})});})();`,
          }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
