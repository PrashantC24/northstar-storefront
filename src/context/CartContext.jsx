import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    const stored = window.localStorage.getItem('northstar-cart');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    window.localStorage.setItem('northstar-cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product) => {
    setItems((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
      }
      return [...current, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setItems((current) => current.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setItems((current) => current.map((item) => (item.id === productId ? { ...item, quantity } : item)));
  };

  const clearCart = () => setItems([]);

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

  const value = useMemo(
    () => ({ items, addToCart, removeFromCart, updateQuantity, clearCart, itemCount, subtotal }),
    [items, itemCount, subtotal],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
