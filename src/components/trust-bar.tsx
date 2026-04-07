import { FileCheck, ShieldCheck, Truck, PackageCheck } from "lucide-react";

const trustItems = [
  {
    icon: ShieldCheck,
    title: "99%+ Purity",
  },
  {
    icon: FileCheck,
    title: "COA Verified",
  },
  {
    icon: Truck,
    title: "Fast USA Shipping",
  },
  {
    icon: PackageCheck,
    title: "Complete Kits",
  },
];

export function TrustBar() {
  return (
    <section className="border-y border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 pt-24 pb-4 sm:px-6 sm:pt-28 lg:px-8 lg:pb-5">
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-center sm:gap-x-8 lg:gap-x-10">
          {trustItems.map((item) => (
            <div key={item.title} className="flex items-center gap-3 text-sm font-medium text-slate-700">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#4A90D9]/10">
                <item.icon className="h-4.5 w-4.5 text-[#4A90D9]" />
              </div>
              <span>{item.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
