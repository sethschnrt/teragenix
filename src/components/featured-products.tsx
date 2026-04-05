import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Beaker } from "lucide-react";

const products = [
  {
    name: "BPC-157 Research Kit",
    category: "Recovery",
    price: 89.99,
    originalPrice: 119.99,
    description:
      "5mg BPC-157 + bacteriostatic water + syringes + alcohol swabs. Complete reconstitution kit.",
    badge: "Best Seller",
    badgeColor: "bg-[#4A90D9]",
  },
  {
    name: "Semaglutide Research Kit",
    category: "Metabolic",
    price: 129.99,
    originalPrice: 169.99,
    description:
      "5mg Semaglutide + bacteriostatic water + insulin syringes + alcohol swabs. Research-ready.",
    badge: "Popular",
    badgeColor: "bg-emerald-600",
  },
  {
    name: "Tirzepatide Research Kit",
    category: "Metabolic",
    price: 149.99,
    originalPrice: 199.99,
    description:
      "10mg Tirzepatide + bacteriostatic water + insulin syringes + alcohol swabs. Premium grade.",
    badge: "Premium",
    badgeColor: "bg-amber-600",
  },
  {
    name: "Recovery Stack",
    category: "Bundle",
    price: 199.99,
    originalPrice: 279.99,
    description:
      "BPC-157 + TB-500 combo kit with all supplies. The complete recovery research bundle.",
    badge: "Save 28%",
    badgeColor: "bg-rose-600",
  },
];

export function FeaturedProducts() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-[#1a2a3a] dark:text-white sm:text-4xl">
            Featured Research Kits
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need in one box. No separate purchases, no missing supplies.
          </p>
        </div>

        {/* Product grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <Card
              key={product.name}
              className="group relative overflow-hidden border transition-all hover:shadow-lg hover:border-[#4A90D9]/30"
            >
              {/* Product image placeholder */}
              <div className="relative aspect-square bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                <Beaker className="h-16 w-16 text-muted-foreground/30 group-hover:text-[#4A90D9]/40 transition-colors" />
                <Badge
                  className={`absolute top-3 left-3 ${product.badgeColor} text-white text-[10px] font-semibold border-0`}
                >
                  {product.badge}
                </Badge>
              </div>

              <CardHeader className="pb-2">
                <p className="text-xs font-medium text-[#4A90D9] uppercase tracking-wider">
                  {product.category}
                </p>
                <h3 className="text-base font-semibold text-foreground leading-tight">
                  {product.name}
                </h3>
              </CardHeader>

              <CardContent className="pb-3">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </CardContent>

              <CardFooter className="flex items-center justify-between pt-0">
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-bold text-foreground">
                    ${product.price}
                  </span>
                  <span className="text-sm text-muted-foreground line-through">
                    ${product.originalPrice}
                  </span>
                </div>
                <Button
                  size="sm"
                  className="bg-[#4A90D9] hover:bg-[#3A7BC8] text-white"
                >
                  <ShoppingCart className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
