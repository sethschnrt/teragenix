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
      </div>
    </section>
  );
}
