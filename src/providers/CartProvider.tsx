"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: string;
  name: string;
  category: string;
  stock: number;
  location: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // 1. Load cart items from localStorage on mount
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("nu-robot-cart");
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error("Failed to load cart from localStorage:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // 2. Persist cart items to localStorage on change
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("nu-robot-cart", JSON.stringify(cartItems));
    } catch (error) {
      console.error("Failed to save cart to localStorage:", error);
    }
  }, [cartItems, isLoaded]);

  // 3. Add item to cart (increase quantity if exists)
  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        // Clamp quantity to stock limits
        const newQty = Math.min(existingItem.quantity + 1, item.stock);
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: newQty } : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  // 4. Remove item from cart
  const removeFromCart = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((i) => i.id !== id));
  };

  // 5. Update quantity of specific item
  const updateQuantity = (id: string, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((i) =>
        i.id === id ? { ...i, quantity: Math.max(1, Math.min(quantity, i.stock)) } : i
      )
    );
  };

  // 6. Clear all cart items
  const clearCart = () => {
    setCartItems([]);
  };

  // 7. Calculate total count of items in the cart
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
