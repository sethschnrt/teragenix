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

const teragenixBuildId =
  process.env.VERCEL_DEPLOYMENT_ID ??
  process.env.VERCEL_GIT_COMMIT_SHA ??
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ??
  "dev";

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
    <html lang="en" data-build-id={teragenixBuildId}>
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
          id="teragenix-hover-fallback"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){var selector='.tg-link-pill,.tg-link-card,.tg-hero-card';function closestTarget(node){return node&&node.closest?node.closest(selector):null}function setActive(el,active){if(!el)return;el.classList.toggle('tg-hover-active',active)}document.addEventListener('mouseover',function(event){var el=closestTarget(event.target);if(!el)return;var related=closestTarget(event.relatedTarget);if(related===el)return;setActive(el,true)},true);document.addEventListener('mouseout',function(event){var el=closestTarget(event.target);if(!el)return;var related=closestTarget(event.relatedTarget);if(related===el)return;setActive(el,false)},true);document.addEventListener('focusin',function(event){var el=closestTarget(event.target);if(el)setActive(el,true)},true);document.addEventListener('focusout',function(event){var el=closestTarget(event.target);if(el)setActive(el,false)},true);window.addEventListener('blur',function(){document.querySelectorAll(selector+'.tg-hover-active').forEach(function(el){el.classList.remove('tg-hover-active')})});})();`,
          }}
        />
        <Script
          id="teragenix-deploy-sync"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var root=document.documentElement;var current=root&&root.dataset?root.dataset.buildId:'';if(!current)return;var key='teragenix-build-sync:'+current;var links=[].slice.call(document.querySelectorAll('link[rel="stylesheet"][href*="dpl="],script[src*="dpl="]'));var stale=links.some(function(node){var raw=node.getAttribute('href')||node.getAttribute('src')||'';var match=raw.match(/[?&]dpl=([^&]+)/);return match&&match[1]&&match[1]!==current});if(stale&&window.sessionStorage.getItem(key)!=='done'){window.sessionStorage.setItem(key,'done');window.location.reload();}}catch(e){}})();`,
          }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
