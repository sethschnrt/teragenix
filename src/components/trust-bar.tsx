import { Shield, FileCheck, Truck, Package } from "lucide-react";

const trustItems = [
  {
    icon: Shield,
    title: "99%+ Purity",
    description: "Third-party tested and verified",
  },
  {
    icon: FileCheck,
    title: "COA Verified",
    description: "Certificate of analysis with every order",
  },
  {
    icon: Truck,
    title: "USA Shipping",
    description: "Fast, discreet domestic delivery",
  },
  {
    icon: Package,
    title: "Complete Kits",
    description: "Everything bundled and ready to go",
  },
];

export function TrustBar() {
  return (
    <section className="py-6 sm:py-8">
      <div className="medvi-shell">
        <div className="medvi-card grid grid-cols-2 gap-6 px-6 py-8 sm:px-8 md:grid-cols-4">
          {trustItems.map((item) => (
            <div key={item.title} className="flex flex-col items-center text-center gap-3 rounded-[24px] px-2 py-2">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eef5fb] shadow-inner">
                <item.icon className="h-6 w-6 text-[#4A90D9]" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#193042]">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs text-[#6c8194]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
