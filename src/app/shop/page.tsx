import { Suspense } from "react";

import { ShopPageClient } from "./shop-client";

export default function ShopPage() {
  return (
    <Suspense fallback={<main className="px-6 py-16 text-sm text-tera-body">Loading shop...</main>}>
      <ShopPageClient />
    </Suspense>
  );
}
