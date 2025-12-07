import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type CartItem = {
  slug: string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (slug: string) => void;
  updateItemQuantity: (slug: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  totalCount: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem("ns_cart");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("ns_cart", JSON.stringify(items));
  }, [items]);

  const addItem = (item: Omit<CartItem, "quantity">, quantity: number = 1) => {
    setItems((prev) => {
      const idx = prev.findIndex((it) => it.slug === item.slug);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + quantity };
        return next;
      }
      return [...prev, { ...item, quantity }];
    });
  };

  const removeItem = (slug: string) => {
    setItems((prev) => prev.filter((it) => it.slug !== slug));
  };

  const updateItemQuantity = (slug: string, quantity: number) => {
    setItems((prev) => prev.map((it) => (it.slug === slug ? { ...it, quantity } : it)));
  };

  const clearCart = () => setItems([]);

  const subtotal = useMemo(() => items.reduce((sum, it) => sum + it.price * it.quantity, 0), [items]);
  const totalCount = useMemo(() => items.reduce((sum, it) => sum + it.quantity, 0), [items]);

  const value: CartContextType = {
    items,
    addItem,
    removeItem,
    updateItemQuantity,
    clearCart,
    subtotal,
    totalCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}