import React, { useState } from 'react';
import { Product } from '../types/bakery';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Eye, Star, Check } from 'lucide-react';
import { ProductModal } from './ProductModal';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, items } = useCart();
  const [modalOpen, setModalOpen] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const cartItem = items.find((it) => it.product.id === product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <>
      <div 
        className="group bg-white border border-[#39251F]/10 rounded-sm overflow-hidden flex flex-col justify-between hover:border-[#C58B52]/50 hover:shadow-md transition-all duration-300"
      >
        {/* Image Box */}
        <div 
          className="relative aspect-4/3 overflow-hidden bg-[#39251F]/5 cursor-pointer"
          onClick={() => setModalOpen(true)}
        >
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Badge */}
          {product.badge && (
            <div className="absolute top-3 left-3">
              <span className="bg-[#39251F] text-[#FFF5E8] text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-xs">
                {product.badge}
              </span>
            </div>
          )}

          {/* Dietary label if eggless */}
          {product.isEggless && (
            <div className="absolute top-3 right-3">
              <span className="bg-[#FFF5E8]/95 backdrop-blur-xs text-[#89977A] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 border border-[#89977A]/30 rounded-xs">
                Eggless
              </span>
            </div>
          )}

          {/* Quick view hover action */}
          <div className="absolute inset-0 bg-[#39251F]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setModalOpen(true);
              }}
              className="bg-[#FFF5E8] text-[#39251F] hover:bg-[#39251F] hover:text-[#FFF5E8] text-xs font-semibold px-3.5 py-2 rounded-xs shadow-sm flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              Quick View
            </button>
          </div>
        </div>

        {/* Content Box */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            {/* Meta kicker */}
            <div className="flex items-center justify-between text-[11px] text-[#76584C] mb-1.5">
              <span className="uppercase tracking-widest font-medium">
                {product.category}
              </span>
              <span>{product.weightOrSize}</span>
            </div>

            {/* Title */}
            <h3 
              onClick={() => setModalOpen(true)}
              className="font-serif text-lg font-bold text-[#39251F] group-hover:text-[#C58B52] transition-colors cursor-pointer leading-snug"
            >
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1.5 mt-1.5 text-xs text-[#76584C]">
              <div className="flex items-center text-[#C58B52]">
                <Star className="w-3.5 h-3.5 fill-[#C58B52]" />
                <span className="ml-1 font-semibold text-[#39251F]">{product.rating.toFixed(1)}</span>
              </div>
              <span aria-hidden="true">·</span>
              <span>({product.reviewCount})</span>
            </div>

            {/* Description */}
            <p className="text-xs text-[#76584C] mt-2.5 line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Price & Action Row */}
          <div className="pt-4 mt-4 border-t border-[#39251F]/10 flex items-center justify-between gap-2">
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold text-[#39251F]">
                ₹{product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-[#76584C] line-through">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={handleQuickAdd}
              className={`px-3.5 py-2 text-xs font-semibold rounded-xs transition-all flex items-center gap-1.5 cursor-pointer ${
                justAdded
                  ? 'bg-[#89977A] text-[#FFF5E8]'
                  : 'bg-[#C58B52] hover:bg-[#B27941] text-[#FFF5E8]'
              }`}
              aria-label={`Add ${product.name} to cart`}
            >
              {justAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>{cartItem ? `Add (${cartItem.quantity})` : 'Add to Cart'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {modalOpen && (
        <ProductModal product={product} onClose={() => setModalOpen(false)} />
      )}
    </>
  );
};
