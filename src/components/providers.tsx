"use client";

import { SessionProvider } from "next-auth/react";

import { CartProvider } from "@/components/cart-provider";
import { Navbar } from "@/components/navbar";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <CartProvider>
        <Navbar />
        {children}
      </CartProvider>
    </SessionProvider>
  );
}

