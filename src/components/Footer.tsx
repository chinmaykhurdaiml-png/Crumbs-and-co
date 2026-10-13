import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Clock, ArrowRight, Heart, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#39251F] text-[#FFF5E8] border-t border-[#C58B52]/20">
      {/* Upper Newsletter & Philosophy strip */}
      <div className="border-b border-white/10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D9A6A0]">
              From Dawn to Oven
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#FFF5E8] mt-1">
              Join Our Morning Dispatch
            </h3>
            <p className="text-[#FFF5E8]/70 text-sm mt-2 max-w-xl">
              Receive secret seasonal drops, weekend bake schedules, and 10% off your first artisan pastry order.
            </p>
          </div>

          <div className="lg:col-span-5">
            {subscribed ? (
              <div className="bg-[#FFF5E8]/10 border border-[#C58B52]/40 rounded-sm p-3.5 flex items-center gap-3 text-sm text-[#FFF5E8]">
                <CheckCircle2 className="w-5 h-5 text-[#89977A] shrink-0" />
                <span>You're subscribed! Check your inbox for your 10% welcome treat.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="bg-[#2A1A15] border border-white/20 text-[#FFF5E8] placeholder:text-[#FFF5E8]/40 px-4 py-2.5 text-sm focus:outline-none focus:border-[#C58B52] rounded-sm flex-1"
                />
                <button
                  type="submit"
                  className="bg-[#C58B52] hover:bg-[#B27941] text-[#FFF5E8] font-medium text-sm px-5 py-2.5 rounded-sm transition-colors flex items-center justify-center gap-2 shrink-0"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Story Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <span className="font-serif text-3xl font-bold tracking-tight text-[#FFF5E8]">
                Crumb & Co.
              </span>
              <span className="block text-[10px] uppercase tracking-[0.25em] font-medium text-[#C58B52]">
                Artisan Bakery & Patisserie
              </span>
            </Link>
            <p className="text-sm text-[#FFF5E8]/70 leading-relaxed max-w-sm">
              Slow fermentation, stoneground heritage grains, and French Normandy butter. We wake at 3:30 AM every morning so your first morning crumb is warm, crackling, and memorable.
            </p>
            <div className="pt-2 text-xs text-[#D9A6A0] flex items-center gap-2">
              <span>Handcrafted daily in small batches</span>
              <span aria-hidden="true">·</span>
              <span>100% Sourdough starter</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.18em] font-semibold text-[#C58B52] mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm text-[#FFF5E8]/80">
              <li>
                <Link to="/" className="hover:text-[#FFF5E8] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-[#FFF5E8] transition-colors">
                  Full Bakery Menu
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#FFF5E8] transition-colors">
                  Our Story & Heritage
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-[#FFF5E8] transition-colors">
                  Shopping Basket
                </Link>
              </li>
            </ul>
          </div>

          {/* Bakery Specialties */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.18em] font-semibold text-[#C58B52] mb-4">
              Specialties
            </h4>
            <ul className="space-y-2.5 text-sm text-[#FFF5E8]/80">
              <li>
                <Link to="/menu?category=bread" className="hover:text-[#FFF5E8] transition-colors">
                  Wild Sourdough Loaves
                </Link>
              </li>
              <li>
                <Link to="/menu?category=croissants" className="hover:text-[#FFF5E8] transition-colors">
                  81-Layer Viennoiserie
                </Link>
              </li>
              <li>
                <Link to="/menu?category=cakes" className="hover:text-[#FFF5E8] transition-colors">
                  Celebration Ganache Cakes
                </Link>
              </li>
              <li>
                <Link to="/menu?category=cookies" className="hover:text-[#FFF5E8] transition-colors">
                  Brown Butter Cookies
                </Link>
              </li>
              <li>
                <Link to="/menu?category=pastries" className="hover:text-[#FFF5E8] transition-colors">
                  Parisian Macarons & Éclairs
                </Link>
              </li>
            </ul>
          </div>

          {/* Visit & Contact */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.18em] font-semibold text-[#C58B52] mb-4">
              Boutique Hours
            </h4>
            <div className="space-y-3 text-xs text-[#FFF5E8]/80">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#D9A6A0] shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-[#FFF5E8]">Monday – Sunday</p>
                  <p className="text-[#FFF5E8]/60">7:00 AM – 9:00 PM</p>
                  <p className="text-[#C58B52] text-[11px] mt-0.5">Warm bread drops at 7:30 AM & 3:00 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 pt-1">
                <MapPin className="w-4 h-4 text-[#89977A] shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-[#FFF5E8]">The Artisan Workshop</p>
                  <p className="text-[#FFF5E8]/60">14 Heritage Lane, Old Town Quarter</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <Phone className="w-4 h-4 text-[#C58B52] shrink-0" />
                <span>+91 98201 44520</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D9A6A0] shrink-0" />
                <span>orders@crumbandco.bakery</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#FFF5E8]/60 gap-4">
          <p>© {new Date().getFullYear()} Crumb & Co. Artisan Bakery. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-[#D9A6A0]">
              Baked with <Heart className="w-3.5 h-3.5 fill-[#D9A6A0]" /> in small batches daily
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
