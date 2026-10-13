import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, PromoCode } from '../types/bakery';

const CART_STORAGE_KEY = 'crumb_co_cart_v1';
const FREE_DELIVERY_THRESHOLD = 500;
const STANDARD_DELIVERY_FEE = 50;

const VALID_PROMOS: Record<string, PromoCode> = {
  CRUMB10: {
    code: 'CRUMB10',
    discountPercent: 10,
    description: '10% off your entire artisan bakery order',
  },
  FIRSTBITE: {
    code: 'FIRSTBITE',
    discountPercent: 15,
    description: '15% welcome discount for your first sweet morning',
  },
  SWEET20: {
    code: 'SWEET20',
    discountPercent: 20,
    description: '20% special celebration voucher',
  },
};

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  appliedPromo: PromoCode | null;
  applyPromo: (code: string) => { success: boolean; message: string };
  removePromo: () => void;
  subtotal: number;
  deliveryFee: number;
  discountAmount: number;
  finalTotal: number;
  totalQuantity: number;
  freeDeliveryThreshold: number;
  amountNeededForFreeDelivery: number;
  toastMessage: string | null;
  clearToast: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return [];
  });

  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignore write errors
    }
  }, [items]);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const showToast = (message: string) => {
    setToastMessage(message);
  };

  const clearToast = () => {
    setToastMessage(null);
  };

  const addToCart = (product: Product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added ${quantity}x "${product.name}" to your basket.`);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setItems((prev) => {
      const target = prev.find((item) => item.product.id === productId);
      if (target) {
        showToast(`Removed "${target.product.name}" from your basket.`);
      }
      return prev.filter((item) => item.product.id !== productId);
    });
  };

  const clearCart = () => {
    setItems([]);
    setAppliedPromo(null);
  };

  const applyPromo = (rawCode: string) => {
    const code = rawCode.trim().toUpperCase();
    if (!code) {
      return { success: false, message: 'Please enter a coupon code.' };
    }
    const found = VALID_PROMOS[code];
    if (found) {
      setAppliedPromo(found);
      showToast(`Promo code "${found.code}" applied! (${found.discountPercent}% OFF)`);
      return { success: true, message: `Promo "${code}" applied: ${found.description}` };
    }
    return { success: false, message: 'Invalid code. Try "CRUMB10" or "FIRSTBITE".' };
  };

  const removePromo = () => {
    setAppliedPromo(null);
    showToast('Promo code removed.');
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  const discountAmount = appliedPromo
    ? Math.round((subtotal * appliedPromo.discountPercent) / 100)
    : 0;

  const deliveryFee =
    subtotal === 0 || subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : STANDARD_DELIVERY_FEE;

  const amountNeededForFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);

  const finalTotal = Math.max(0, subtotal - discountAmount + deliveryFee);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        appliedPromo,
        applyPromo,
        removePromo,
        subtotal,
        deliveryFee,
        discountAmount,
        finalTotal,
        totalQuantity,
        freeDeliveryThreshold: FREE_DELIVERY_THRESHOLD,
        amountNeededForFreeDelivery,
        toastMessage,
        clearToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
