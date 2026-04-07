import { Hero } from "@/components/hero";
import { TrustBar } from "@/components/trust-bar";
import { FeaturedProducts } from "@/components/featured-products";
import { HowItWorks } from "@/components/how-it-works";
import { DisclaimerBanner } from "@/components/disclaimer-banner";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustBar />
      <FeaturedProducts />
      <HowItWorks />
      <DisclaimerBanner />
      <Footer />
    </main>
  );
}
