import { createContext, useContext, useState, type ReactNode } from "react";
import type Gear from "../interfaces/Gear";

interface CartContextType {
  showShoppingCart: boolean;
  cartItems: Gear[];
  totalPrice: number;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (item: Omit<Gear, 'rowSum'>) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState<Gear[]>([]);

  const totalPrice = 42; // todo

  const openCart = () => setShowCart(true);
  const closeCart = () => setShowCart(false);

  const addToCart = (item: Omit<Gear, 'rowSum'>) => {
    setCartItems(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === item.id);

      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.id === item.id
            ? {
              ...cartItem
            }
            : cartItem
        );
      }
      return [...prev, { ...item, rowSum: item.dailyPrice }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{
      showShoppingCart: showCart,
      cartItems,
      totalPrice,
      openCart: openCart,
      closeCart: closeCart,
      addToCart,
      removeFromCart,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}