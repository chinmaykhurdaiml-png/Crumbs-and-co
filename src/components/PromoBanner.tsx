import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Copy, Check, ArrowRight, Clock } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const PromoBanner: React.FC = () => {
  const { applyPromo } = useCart();
  const [copied, setCopied] = useState(false);
  const code = 'CRUMB10';

  const handleCopyAndApply = () => {
    navigator.clipboard.writeText(code);
    applyPromo(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-[#39251F] via-[#4A332B] to-[#39251F] text-[#FFF5E8] border-y border-[#C58B52]/30 py-10 px-4 sm:px-6 lg:px-8">
      {/* Decorative subtle texture watermark */}
      <div className="absolute right-0 top-0 bottom-0 opacity-10 pointer-events-none flex items-center pr-10">
        <span className="font-serif text-[120px] font-bold leading-none select-none text-[#FFF5E8]">
          CRUMB
        </span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#D9A6A0] mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C58B52]" />
            <span>Limited Seasonal Harvest Offer</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1 text-[#FFF5E8]/70">
              <Clock className="w-3 h-3" /> This Week Only
            </span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#FFF5E8]">
            The Weekend Oven Special: Enjoy 10% Off Everything
          </h3>
          <p className="text-sm text-[#FFF5E8]/80 mt-1.5 max-w-2xl">
            Savour freshly baked sourdough loaves, slow-laminated French croissants, and handcrafted Belgian truffle cakes delivered warm to your doorstep.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
          {/* Coupon Code badge */}
          <div className="flex items-center bg-[#2A1A15] border border-[#C58B52]/50 rounded-sm px-3.5 py-2 gap-3 shadow-inner">
            <div className="text-left">
              <span className="text-[10px] uppercase tracking-wider text-[#C58B52] block font-semibold">
                Promo Code
              </span>
              <span className="font-mono text-base font-bold text-[#FFF5E8] tracking-widest">
                {code}
              </span>
            </div>
            <button
              type="button"
              onClick={handleCopyAndApply}
              className="bg-[#C58B52] hover:bg-[#B27941] text-[#FFF5E8] text-xs font-semibold px-3 py-1.5 rounded-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              aria-label="Apply coupon code CRUMB10"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>Applied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Apply Code</span>
                </>
              )}
            </button>
          </div>

          <Link
            to="/menu"
            className="bg-[#FFF5E8] text-[#39251F] hover:bg-white text-xs uppercase tracking-wider font-bold px-5 py-3 rounded-sm transition-colors flex items-center gap-2 shadow-sm"
          >
            <span>Explore Menu</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
