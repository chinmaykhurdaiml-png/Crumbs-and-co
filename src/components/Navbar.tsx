import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu as MenuIcon, X, Sparkles, Clock, Phone } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalQuantity } = useCart();
  const location = useLocation();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Menu', path: '/menu' },
    { label: 'Our Story', path: '/about' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FFF5E8]/95 backdrop-blur-md border-b border-[#39251F]/10 transition-all">
      {/* Top micro-bar */}
      <div className="bg-[#39251F] text-[#FFF5E8] text-xs py-1.5 px-4 tracking-wide font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C58B52]" />
            <span className="truncate">Fresh morning bake out of the oven at 6:30 AM · Sourdough & Viennoiserie</span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-[#FFF5E8]/80 text-[11px]">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#D9A6A0]" />
              Open Daily: 7:00 AM – 9:00 PM
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3 text-[#C58B52]" />
              +91 98201 44520
            </span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link
            to="/"
            className="group flex flex-col items-start focus:outline-none"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#39251F] group-hover:text-[#C58B52] transition-colors">
                Crumb & Co.
              </span>
            </div>
            <span className="text-[10px] uppercase tracking-[0.25em] font-medium text-[#76584C] -mt-0.5">
              Artisan Bakery & Patisserie
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium tracking-wide transition-colors relative py-1 ${
                    active
                      ? 'text-[#39251F] font-semibold'
                      : 'text-[#76584C] hover:text-[#39251F]'
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C58B52] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Cart & Actions */}
          <div className="flex items-center gap-4 sm:gap-6">
            <Link
              to="/menu"
              className="hidden lg:inline-flex items-center text-xs font-semibold uppercase tracking-wider text-[#39251F] border border-[#39251F]/30 hover:border-[#39251F] px-4 py-2 rounded-sm transition-colors"
            >
              Order Online
            </Link>

            <Link
              to="/cart"
              className={`relative flex items-center gap-2 px-3 py-2 rounded-sm transition-colors ${
                location.pathname === '/cart'
                  ? 'bg-[#39251F] text-[#FFF5E8]'
                  : 'text-[#39251F] hover:bg-[#39251F]/5'
              }`}
              aria-label={`Shopping cart with ${totalQuantity} items`}
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5" />
                {totalQuantity > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[#C58B52] text-[#FFF5E8] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                    {totalQuantity}
                  </span>
                )}
              </div>
              <span className="text-sm font-semibold hidden sm:inline">
                Basket
              </span>
            </Link>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#39251F] hover:text-[#C58B52] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FFF5E8] border-b border-[#39251F]/15 px-4 pt-3 pb-6 animate-fade-in shadow-lg">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-medium px-3 py-2 rounded-sm transition-colors ${
                    active
                      ? 'bg-[#39251F] text-[#FFF5E8]'
                      : 'text-[#39251F] hover:bg-[#39251F]/5'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              to="/cart"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-base font-medium px-3 py-2 rounded-sm flex items-center justify-between ${
                location.pathname === '/cart'
                  ? 'bg-[#39251F] text-[#FFF5E8]'
                  : 'text-[#39251F] hover:bg-[#39251F]/5'
              }`}
            >
              <span className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4" />
                Shopping Basket
              </span>
              <span className="text-xs bg-[#C58B52] text-[#FFF5E8] px-2 py-0.5 rounded-full font-bold">
                {totalQuantity}
              </span>
            </Link>
          </div>
          <div className="mt-4 pt-4 border-t border-[#39251F]/10 text-xs text-[#76584C] space-y-1">
            <p>Boutique hours: 7:00 AM – 9:00 PM</p>
            <p>Hotline: +91 98201 44520</p>
          </div>
        </div>
      )}
    </header>
  );
};
