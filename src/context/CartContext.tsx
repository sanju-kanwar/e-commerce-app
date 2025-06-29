// src/context/CartContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import type { Product, CartItem } from "../types";
import { toast } from "react-toastify";

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const c = useContext(CartContext);
  if (!c) throw new Error("useCart must be used within CartProvider");
  return c;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id);
      toast.success("✅ Item added to cart!");
      if (exists) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => {
      const removed = prev.find(item => item.id === id);
      if (removed) toast.info("🗑️ Item removed from cart");
      return prev.filter(item => item.id !== id);
    });
  };

  const total = cart.reduce((s, item) => s + item.price * item.quantity, 0);
  const itemCount = cart.reduce((c, i) => c + i.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, total, itemCount }}>
      {children}
    </CartContext.Provider>
  );
};
