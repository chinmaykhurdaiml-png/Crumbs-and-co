import React from 'react';
import { useCart } from '../context/CartContext';
import { Check, X, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Toast: React.FC = () => {
  const { toastMessage, clearToast, totalQuantity } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md animate-fade-in shadow-xl">
      <div className="bg-[#39251F] text-[#FFF5E8] px-5 py-4 border border-[#C58B52]/40 rounded-sm flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#C58B52]/20 flex items-center justify-center text-[#C58B52] shrink-0">
            <Check className="w-4 h-4" />
          </div>
          <div>
            <p className="text-sm font-medium leading-snug">{toastMessage}</p>
            <p className="text-xs text-[#D9A6A0] mt-0.5">
              {totalQuantity} {totalQuantity === 1 ? 'item' : 'items'} in your basket
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/cart"
            onClick={clearToast}
            className="text-xs font-semibold text-[#FFF5E8] bg-[#C58B52] hover:bg-[#B27941] px-3 py-1.5 rounded-sm transition-colors flex items-center gap-1.5"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            View
          </Link>
          <button
            onClick={clearToast}
            className="text-[#FFF5E8]/60 hover:text-[#FFF5E8] p-1 transition-colors"
            aria-label="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
