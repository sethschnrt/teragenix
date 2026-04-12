"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "@/data/products";

const STORAGE_KEY = "teragenix-cart";

export type CartItem = {
  slug: string;
  name: string;
  shortName: string;
  image: string;
  price: number;
  originalPrice: number;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (product: Product, quantity?: number) => void;
  buyNow: (product: Product, quantity?: number) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  removeItem: (slug: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function toCartItem(product: Product, quantity: number): CartItem {
  return {
    slug: product.slug,
    name: product.name,
    shortName: product.shortName,
    image: product.image,
    price: product.price,
    originalPrice: product.originalPrice,
    quantity,
  };
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setItems(JSON.parse(raw) as CartItem[]);
      }
    } catch {
      // ignore malformed client storage
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const value = useMemo<CartContextValue>(() => {
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    function addItem(product: Product, quantity = 1) {
      const safeQuantity = Math.max(1, quantity);
      setItems((current) => {
        const existing = current.find((item) => item.slug === product.slug);
        if (existing) {
          return current.map((item) =>
            item.slug === product.slug
              ? { ...item, quantity: item.quantity + safeQuantity }
              : item,
          );
        }
        return [...current, toCartItem(product, safeQuantity)];
      });
    }

    function buyNow(product: Product, quantity = 1) {
      const safeQuantity = Math.max(1, quantity);
      setItems([toCartItem(product, safeQuantity)]);
    }

    function updateQuantity(slug: string, quantity: number) {
      if (quantity <= 0) {
        setItems((current) => current.filter((item) => item.slug !== slug));
        return;
      }

      setItems((current) =>
        current.map((item) =>
          item.slug === slug ? { ...item, quantity } : item,
        ),
      );
    }

    function removeItem(slug: string) {
      setItems((current) => current.filter((item) => item.slug !== slug));
    }

    function clearCart() {
      setItems([]);
    }

    return {
      items,
      itemCount,
      subtotal,
      addItem,
      buyNow,
      updateQuantity,
      removeItem,
      clearCart,
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
