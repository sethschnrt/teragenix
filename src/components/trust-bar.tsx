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
    <section className="border-y bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {trustItems.map((item) => (
            <div key={item.title} className="flex flex-col items-center text-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#4A90D9]/10">
                <item.icon className="h-6 w-6 text-[#4A90D9]" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
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
