import React, { useState } from 'react';
import { Product } from '../types/bakery';
import { useCart } from '../context/CartContext';
import { X, Star, ShoppingBag, Clock, Sparkles, Check, Flame } from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const handleAdd = () => {
    addToCart(product, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#39251F]/60 backdrop-blur-xs animate-fade-in">
      <div 
        className="relative bg-[#FFF5E8] border border-[#39251F]/15 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-sm shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-[#39251F]/10 hover:bg-[#39251F] text-[#39251F] hover:text-[#FFF5E8] flex items-center justify-center transition-colors"
          aria-label="Close product details"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="relative h-64 md:h-full min-h-[280px] bg-[#39251F]/5 overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 bg-[#39251F] text-[#FFF5E8] text-xs font-semibold px-2.5 py-1 tracking-wider uppercase">
                {product.badge}
              </span>
            )}
          </div>

          {/* Details */}
          <div className="p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#76584C] mb-2">
                <span className="uppercase tracking-widest font-medium">{product.category}</span>
                <span aria-hidden="true">·</span>
                <span>{product.weightOrSize}</span>
                {product.isEggless && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#89977A] font-semibold">100% Eggless</span>
                  </>
                )}
              </div>

              <h3 className="font-serif text-2xl font-bold text-[#39251F] leading-tight">
                {product.name}
              </h3>

              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center text-[#C58B52]">
                  <Star className="w-4 h-4 fill-[#C58B52]" />
                  <span className="text-sm font-semibold ml-1 text-[#39251F]">
                    {product.rating.toFixed(1)}
                  </span>
                </div>
                <span className="text-xs text-[#76584C]">
                  ({product.reviewCount} customer reviews)
                </span>
              </div>

              <div className="flex items-baseline gap-2 mt-3">
                <span className="text-2xl font-bold text-[#39251F]">
                  ₹{product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-[#76584C] line-through">
                    ₹{product.originalPrice}
                  </span>
                )}
              </div>

              <p className="text-sm text-[#76584C] mt-4 leading-relaxed">
                {product.longDescription}
              </p>

              {/* Baking Info */}
              <div className="mt-4 p-3 bg-[#39251F]/5 rounded-sm border border-[#39251F]/10 space-y-1.5 text-xs text-[#39251F]">
                <div className="flex items-center gap-2 font-medium">
                  <Flame className="w-3.5 h-3.5 text-[#C58B52]" />
                  <span>{product.bakingSchedule}</span>
                </div>
                <div className="flex items-center gap-2 text-[#76584C]">
                  <Sparkles className="w-3.5 h-3.5 text-[#89977A]" />
                  <span>Made in small batches without artificial preservatives</span>
                </div>
              </div>

              {/* Ingredients */}
              <div className="mt-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#39251F] mb-1.5">
                  Artisan Ingredients:
                </p>
                <div className="flex flex-wrap gap-1.5 text-xs text-[#76584C]">
                  {product.ingredients.map((ing, idx) => (
                    <span key={idx} className="bg-white/60 border border-[#39251F]/10 px-2 py-0.5 rounded-xs">
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Quantity and Add Button */}
            <div className="pt-6 mt-6 border-t border-[#39251F]/10 flex items-center gap-3">
              <div className="flex items-center border border-[#39251F]/20 rounded-sm bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 text-sm text-[#39251F] hover:bg-[#39251F]/5 transition-colors"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-3 py-2 text-sm font-semibold text-[#39251F] min-w-[2rem] text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-2 text-sm text-[#39251F] hover:bg-[#39251F]/5 transition-colors"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className="flex-1 bg-[#C58B52] hover:bg-[#B27941] text-[#FFF5E8] font-semibold text-sm py-2.5 px-4 rounded-sm transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Basket · ₹{product.price * quantity}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
