import Link from "next/link";
import { Shield, Truck, FlaskConical, Mail } from "lucide-react";

const promises = [
  {
    icon: Truck,
    title: "No digging for basics",
    body: "See the peptide, format, quantity, and documentation status up front instead of piecing things together after the click.",
  },
  {
    icon: FlaskConical,
    title: "Grouped by what you want",
    body: "Fat loss, recovery, longevity, and aesthetics are organized around the result you care about, not random catalog sprawl.",
  },
  {
    icon: Shield,
    title: "Proof stays close",
    body: "Purity, storage notes, and documentation status stay close to the product, so trust is built by what you can actually check.",
  },
  {
    icon: Mail,
    title: "Clarity before commitment",
    body: "Support, shipping, refund, and research-use details stay easy to reach before you buy.",
  },
];

export function Guarantee() {
  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-28 lg:py-[120px]">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-[160px]">
        <div className="mb-16 text-center">
          <p className="tg-eyebrow mb-6" style={{ color: "#3b6ed6" }}>
            WHY PEOPLE TRUST TERAGENIX
          </p>
          <h2 className="tg-h2 mx-auto max-w-3xl" style={{ color: "#0d262d" }}>
            Less guesswork, <span style={{ color: "#3b6ed6" }}>more to verify</span>.
          </h2>
          <p
            className="mx-auto mt-6 max-w-xl"
            style={{
              fontSize: "16px",
              lineHeight: "25px",
              color: "#0d262d",
              fontWeight: 400,
            }}
          >
            People are tired of vague peptide pages. Show the specs, show the docs, and make it easy to check what matters.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {promises.map((p) => (
            <div
              key={p.title}
              className="relative flex flex-col rounded-[30px] bg-[#f4f8ff] p-8"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#dbeafe] text-[#3b6ed6]">
                <p.icon className="h-6 w-6" strokeWidth={1.75} />
              </div>
              <h3
                style={{
                  fontSize: "20px",
                  lineHeight: "26px",
                  fontWeight: 600,
                  color: "#0d262d",
                  letterSpacing: "-0.4px",
                }}
              >
                {p.title}
              </h3>
              <p
                className="mt-3"
                style={{
                  fontSize: "14px",
                  lineHeight: "22px",
                  color: "#0d262d",
                  fontWeight: 400,
                }}
              >
                {p.body}
              </p>
            </div>
          ))}
        </div>

        {/* CTA band */}
        <div className="mt-20 flex flex-col items-center justify-between gap-6 rounded-[40px] bg-[linear-gradient(166deg,_#3b6ed6_0%,_#0d262d_100%)] px-10 py-14 sm:flex-row sm:px-16 sm:py-16 lg:px-20">
          <div className="text-center sm:text-left">
            <p
              className="tg-eyebrow mb-4"
              style={{ color: "#4a8dd9" }}
            >
              READY TO SHOP
            </p>
            <h3
              className="max-w-xl"
              style={{
                fontSize: "38px",
                lineHeight: "44px",
                fontWeight: 600,
                color: "#ffffff",
                letterSpacing: "-0.76px",
              }}
            >
              Pick the goal. Check the proof.
            </h3>
          </div>
          <Link
            href="/shop"
            className="tg-link-pill inline-flex h-14 shrink-0 items-center rounded-full bg-white px-8 text-[#0d262d] hover:bg-[#eef4fc]"
            style={{
              fontSize: "15px",
              fontWeight: 600,
              letterSpacing: "-0.3px",
            }}
            >
              Shop peptides
              <svg
              className="tg-link-pill-icon ml-2.5 h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
