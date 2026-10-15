import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { UpiPaymentQr } from '../components/UpiPaymentQr';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Sparkles,
  Check,
  ShieldCheck,
  Clock,
  Truck,
  CheckCircle2,
  Receipt,
  X,
  QrCode,
  CreditCard,
} from 'lucide-react';

export const CartPage: React.FC = () => {
  const {
    items,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    deliveryFee,
    discountAmount,
    finalTotal,
    appliedPromo,
    applyPromo,
    removePromo,
    freeDeliveryThreshold,
    amountNeededForFreeDelivery,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);

  // Checkout modal state
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [activePaymentTab, setActivePaymentTab] = useState<'upi' | 'cod'>('upi');

  const [orderDetails, setOrderDetails] = useState({
    name: 'Priya Sharma',
    phone: '+91 98201 55660',
    address: 'Flat 402, Magnolia Residency, Bandra West',
    deliverySlot: 'Tomorrow Morning (7:30 AM – 9:30 AM)',
    notes: 'Please ring the doorbell and leave with security if unavailable.',
    paymentMode: 'PhonePe / UPI QR (Paid Online)',
    paymentReference: '',
    orderNumber: 'CRUMB-84920',
  });

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    const res = applyPromo(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponInput('');
    }
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedOrderNum = `CRUMB-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderDetails((prev) => ({
      ...prev,
      orderNumber: generatedOrderNum,
      paymentMode: activePaymentTab === 'upi' ? 'PhonePe / UPI QR' : 'Cash on Artisan Delivery',
    }));
    setOrderSuccess(true);
  };

  const handleUpiPaymentCompleted = (ref?: string) => {
    const generatedOrderNum = `CRUMB-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderDetails((prev) => ({
      ...prev,
      orderNumber: generatedOrderNum,
      paymentMode: 'PhonePe / UPI QR (Verified)',
      paymentReference: ref || `UPI-TXN-${Date.now().toString().slice(-6)}`,
    }));
    setCheckoutModalOpen(true);
    setOrderSuccess(true);
  };

  const handleFinishAndClear = () => {
    clearCart();
    setCheckoutModalOpen(false);
    setOrderSuccess(false);
  };

  const progressPercent = Math.min(
    100,
    Math.round((subtotal / freeDeliveryThreshold) * 100)
  );

  if (items.length === 0 && !orderSuccess) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="bg-white border border-[#39251F]/15 rounded-sm p-12 sm:p-16 max-w-lg mx-auto shadow-sm space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#FFF5E8] border border-[#39251F]/10 flex items-center justify-center text-[#C58B52] mx-auto">
            <ShoppingBag className="w-8 h-8" />
          </div>

          <div>
            <h1 className="font-serif text-3xl font-bold text-[#39251F]">
              Your Basket is Empty
            </h1>
            <p className="text-sm text-[#76584C] mt-2 leading-relaxed">
              The scent of warm butter croissants and freshly baked artisan sourdough is calling. Treat yourself or someone you cherish.
            </p>
          </div>

          <div className="pt-2">
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 bg-[#C58B52] hover:bg-[#B27941] text-[#FFF5E8] font-semibold text-sm px-7 py-3 rounded-sm transition-all shadow-sm"
            >
              <span>Discover Our Treats</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="pt-6 border-t border-[#39251F]/10 text-xs text-[#76584C] flex items-center justify-center gap-4">
            <span className="flex items-center gap-1">
              <Truck className="w-3.5 h-3.5 text-[#89977A]" />
              Free delivery above ₹500
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#C58B52]" />
              Baked fresh daily
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="border-b border-[#39251F]/15 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C58B52]">
            Artisan Checkout
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#39251F] mt-1">
            Your Bakery Basket
          </h1>
        </div>
        <Link
          to="/menu"
          className="text-xs font-semibold uppercase tracking-wider text-[#76584C] hover:text-[#39251F] flex items-center gap-1 self-start sm:self-auto transition-colors"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Free Delivery Incentive Progress Bar */}
      <div className="bg-white border border-[#39251F]/15 p-4 rounded-sm shadow-xs">
        <div className="flex items-center justify-between text-xs font-medium mb-2">
          <div className="flex items-center gap-2 text-[#39251F]">
            <Truck className="w-4 h-4 text-[#89977A]" />
            {amountNeededForFreeDelivery === 0 ? (
              <span className="text-[#89977A] font-bold">
                🎉 Congratulations! You have unlocked Free Artisan Delivery!
              </span>
            ) : (
              <span>
                Add <strong className="text-[#39251F]">₹{amountNeededForFreeDelivery}</strong> more to qualify for Free Delivery
              </span>
            )}
          </div>
          <span className="text-[#76584C]">{progressPercent}%</span>
        </div>
        <div className="w-full bg-[#FFF5E8] h-2 rounded-full overflow-hidden border border-[#39251F]/10">
          <div
            className="bg-[#89977A] h-full transition-all duration-500 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Cart Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Items List Column */}
        <div className="lg:col-span-7 xl:col-span-7 space-y-6">
          <div className="bg-white border border-[#39251F]/15 rounded-sm overflow-hidden shadow-xs">
            <div className="px-6 py-4 border-b border-[#39251F]/10 bg-[#FFF5E8]/40 flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#76584C]">
                Baked Treats ({items.length})
              </span>
              <button
                type="button"
                onClick={clearCart}
                className="text-xs text-[#76584C] hover:text-red-700 underline cursor-pointer"
              >
                Clear basket
              </button>
            </div>

            <div className="divide-y divide-[#39251F]/10">
              {items.map(({ product, quantity }) => {
                const itemSubtotal = product.price * quantity;
                return (
                  <div
                    key={product.id}
                    className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    {/* Thumbnail and name */}
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-sm overflow-hidden bg-[#39251F]/5 shrink-0 border border-[#39251F]/10">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-[11px] text-[#76584C]">
                          <span className="uppercase tracking-widest">{product.category}</span>
                          <span aria-hidden="true">·</span>
                          <span>{product.weightOrSize}</span>
                        </div>
                        <h3 className="font-serif text-base sm:text-lg font-bold text-[#39251F] leading-snug">
                          {product.name}
                        </h3>
                        <p className="text-xs text-[#76584C]">₹{product.price} each</p>
                      </div>
                    </div>

                    {/* Quantity controls and subtotal */}
                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-[#39251F]/5">
                      {/* Quantity buttons */}
                      <div className="flex items-center border border-[#39251F]/20 rounded-sm bg-[#FFF5E8]">
                        <button
                          type="button"
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="p-1.5 text-[#39251F] hover:bg-[#39251F]/10 transition-colors"
                          aria-label={`Decrease ${product.name} quantity`}
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 py-1 text-xs font-bold text-[#39251F] min-w-[2rem] text-center">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="p-1.5 text-[#39251F] hover:bg-[#39251F]/10 transition-colors"
                          aria-label={`Increase ${product.name} quantity`}
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Subtotal */}
                      <div className="text-right min-w-[80px]">
                        <span className="font-serif text-base font-bold text-[#39251F] block">
                          ₹{itemSubtotal}
                        </span>
                      </div>

                      {/* Remove */}
                      <button
                        type="button"
                        onClick={() => removeFromCart(product.id)}
                        className="text-[#76584C] hover:text-red-700 p-1.5 transition-colors"
                        aria-label={`Remove ${product.name} from basket`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Delivery Note */}
          <div className="p-4 bg-[#FFF5E8] border border-[#39251F]/10 rounded-sm text-xs text-[#76584C] flex items-center gap-3">
            <Clock className="w-4 h-4 text-[#C58B52] shrink-0" />
            <span>
              Orders placed now are scheduled for our morning wood-fired baking cycle. Packaged in unbleached biodegradable boxes.
            </span>
          </div>

          {/* Feature Highlight: Dynamic PhonePe QR in Cart */}
          <div className="hidden lg:block">
            <div className="flex items-center gap-2 mb-3">
              <QrCode className="w-4 h-4 text-[#C58B52]" />
              <h3 className="font-serif text-base font-bold text-[#39251F]">
                Quick Payment via PhonePe & UPI
              </h3>
            </div>
            <UpiPaymentQr
              amount={finalTotal}
              onPaymentSuccess={handleUpiPaymentCompleted}
            />
          </div>
        </div>

        {/* Order Summary & Right Column */}
        <div className="lg:col-span-5 xl:col-span-5 space-y-6">
          <div className="bg-white border border-[#39251F]/15 rounded-sm p-6 shadow-xs space-y-6">
            <h2 className="font-serif text-xl font-bold text-[#39251F] pb-3 border-b border-[#39251F]/10">
              Order Summary
            </h2>

            {/* Calculations breakdown */}
            <div className="space-y-3 text-xs text-[#76584C]">
              <div className="flex items-center justify-between">
                <span>Items Subtotal</span>
                <span className="font-semibold text-[#39251F]">₹{subtotal}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1">
                  Artisan Delivery
                  {subtotal >= freeDeliveryThreshold && (
                    <span className="text-[#89977A] text-[10px] font-bold uppercase">
                      (Complimentary)
                    </span>
                  )}
                </span>
                <span className="font-semibold text-[#39251F]">
                  {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                </span>
              </div>

              {appliedPromo && (
                <div className="flex items-center justify-between text-[#89977A]">
                  <span className="flex items-center gap-1 font-medium">
                    Promo ({appliedPromo.code} - {appliedPromo.discountPercent}%)
                  </span>
                  <span className="font-bold">-₹{discountAmount}</span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span>Eco-Friendly Packaging</span>
                <span className="text-[#89977A] font-semibold">Included</span>
              </div>

              {/* Total Row */}
              <div className="pt-3 border-t border-[#39251F]/10 flex items-baseline justify-between text-base">
                <span className="font-serif font-bold text-[#39251F]">Total Amount</span>
                <span className="font-serif text-2xl font-bold text-[#39251F]">
                  ₹{finalTotal}
                </span>
              </div>
            </div>

            {/* Promo Code section */}
            <div className="pt-4 border-t border-[#39251F]/10">
              {appliedPromo ? (
                <div className="bg-[#FFF5E8] border border-[#89977A]/30 p-3 rounded-sm flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-[#39251F]">
                      Code {appliedPromo.code} Active
                    </span>
                    <p className="text-[11px] text-[#76584C]">{appliedPromo.description}</p>
                  </div>
                  <button
                    type="button"
                    onClick={removePromo}
                    className="text-xs text-red-700 hover:underline font-semibold cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="space-y-1.5">
                  <label htmlFor="coupon" className="block text-xs font-semibold text-[#39251F]">
                    Have a promo voucher?
                  </label>
                  <div className="flex gap-2">
                    <input
                      id="coupon"
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="e.g. CRUMB10 or FIRSTBITE"
                      className="flex-1 bg-[#FFF5E8] border border-[#39251F]/15 text-[#39251F] text-xs px-3 py-2 rounded-sm focus:outline-none focus:border-[#C58B52] uppercase placeholder:normal-case"
                    />
                    <button
                      type="submit"
                      className="bg-[#39251F] hover:bg-[#2A1A15] text-[#FFF5E8] text-xs font-semibold px-4 py-2 rounded-sm transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && (
                    <p className="text-[11px] text-red-600 font-medium">{couponError}</p>
                  )}
                  <p className="text-[11px] text-[#76584C]">
                    Try code <strong className="text-[#39251F]">CRUMB10</strong> for 10% off.
                  </p>
                </form>
              )}
            </div>

            {/* Proceed to Checkout Button */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setCheckoutModalOpen(true)}
                className="w-full bg-[#C58B52] hover:bg-[#B27941] text-[#FFF5E8] font-bold text-sm py-3.5 px-4 rounded-sm transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Proceed to Checkout (₹{finalTotal})</span>
              </button>

              <div className="text-[11px] text-[#76584C] text-center flex items-center justify-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#89977A]" />
                <span>Instant dynamic UPI QR code with auto-fetched amount</span>
              </div>
            </div>
          </div>

          {/* Mobile Display of QR component */}
          <div className="block lg:hidden">
            <UpiPaymentQr
              amount={finalTotal}
              onPaymentSuccess={handleUpiPaymentCompleted}
            />
          </div>
        </div>
      </div>

      {/* Checkout Modal / Order Confirmation Flow */}
      {checkoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#39251F]/60 backdrop-blur-xs animate-fade-in">
          <div
            className="bg-[#FFF5E8] border border-[#39251F]/20 rounded-sm w-full max-w-2xl max-h-[92vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setCheckoutModalOpen(false)}
              className="absolute top-4 right-4 text-[#76584C] hover:text-[#39251F] p-1.5"
              aria-label="Close checkout modal"
            >
              <X className="w-5 h-5" />
            </button>

            {!orderSuccess ? (
              /* Checkout Form */
              <form onSubmit={handleCompleteOrder} className="space-y-6">
                <div>
                  <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C58B52]">
                    Boutique Delivery
                  </span>
                  <h2 className="font-serif text-2xl font-bold text-[#39251F] mt-1">
                    Complete Your Bakery Order
                  </h2>
                  <p className="text-xs text-[#76584C] mt-1">
                    Confirm your address and select your payment method for fresh morning dispatch.
                  </p>
                </div>

                {/* Delivery Information */}
                <div className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-[#39251F] mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={orderDetails.name}
                        onChange={(e) =>
                          setOrderDetails({ ...orderDetails, name: e.target.value })
                        }
                        className="w-full bg-white border border-[#39251F]/20 px-3 py-2 rounded-sm text-[#39251F] focus:outline-none focus:border-[#C58B52]"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-[#39251F] mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={orderDetails.phone}
                        onChange={(e) =>
                          setOrderDetails({ ...orderDetails, phone: e.target.value })
                        }
                        className="w-full bg-white border border-[#39251F]/20 px-3 py-2 rounded-sm text-[#39251F] focus:outline-none focus:border-[#C58B52]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-[#39251F] mb-1">
                      Delivery Address *
                    </label>
                    <textarea
                      required
                      rows={2}
                      value={orderDetails.address}
                      onChange={(e) =>
                        setOrderDetails({ ...orderDetails, address: e.target.value })
                      }
                      className="w-full bg-white border border-[#39251F]/20 px-3 py-2 rounded-sm text-[#39251F] focus:outline-none focus:border-[#C58B52]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-[#39251F] mb-1">
                        Preferred Dispatch Slot
                      </label>
                      <select
                        value={orderDetails.deliverySlot}
                        onChange={(e) =>
                          setOrderDetails({ ...orderDetails, deliverySlot: e.target.value })
                        }
                        className="w-full bg-white border border-[#39251F]/20 px-3 py-2 rounded-sm text-[#39251F] focus:outline-none focus:border-[#C58B52]"
                      >
                        <option>Tomorrow Morning (7:30 AM – 9:30 AM)</option>
                        <option>Tomorrow Midday (11:30 AM – 1:30 PM)</option>
                        <option>Tomorrow Afternoon Tea (3:30 PM – 5:30 PM)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-[#39251F] mb-1">
                        Baker's Note / Door Instructions
                      </label>
                      <input
                        type="text"
                        value={orderDetails.notes}
                        onChange={(e) =>
                          setOrderDetails({ ...orderDetails, notes: e.target.value })
                        }
                        placeholder="e.g. Sourdough sliced, gate code 402"
                        className="w-full bg-white border border-[#39251F]/20 px-3 py-2 rounded-sm text-[#39251F] focus:outline-none focus:border-[#C58B52]"
                      />
                    </div>
                  </div>

                  {/* Payment Mode Selector */}
                  <div className="pt-2">
                    <label className="block font-semibold text-[#39251F] mb-2">
                      Select Payment Mode:
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setActivePaymentTab('upi')}
                        className={`p-3 rounded-sm border text-left flex items-start gap-2.5 transition-all cursor-pointer ${
                          activePaymentTab === 'upi'
                            ? 'bg-[#1E2024] text-white border-[#5f259f] shadow-md'
                            : 'bg-white text-[#39251F] border-[#39251F]/15 hover:border-[#39251F]/30'
                        }`}
                      >
                        <div className="w-5 h-5 rounded-full bg-[#5f259f] text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                          पे
                        </div>
                        <div>
                          <p className="font-bold text-xs">PhonePe / UPI QR</p>
                          <p className={`text-[10px] ${activePaymentTab === 'upi' ? 'text-white/70' : 'text-[#76584C]'}`}>
                            Dynamic QR for ₹{finalTotal}
                          </p>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setActivePaymentTab('cod')}
                        className={`p-3 rounded-sm border text-left flex items-start gap-2.5 transition-all cursor-pointer ${
                          activePaymentTab === 'cod'
                            ? 'bg-[#39251F] text-white border-[#C58B52] shadow-md'
                            : 'bg-white text-[#39251F] border-[#39251F]/15 hover:border-[#39251F]/30'
                        }`}
                      >
                        <CreditCard className="w-5 h-5 text-[#C58B52] shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-xs">Cash on Delivery</p>
                          <p className={`text-[10px] ${activePaymentTab === 'cod' ? 'text-white/70' : 'text-[#76584C]'}`}>
                            Pay ₹{finalTotal} on doorstep
                          </p>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* If UPI is selected, embed the dynamic QR inside the checkout modal */}
                  {activePaymentTab === 'upi' && (
                    <div className="pt-2 animate-fade-in">
                      <UpiPaymentQr
                        amount={finalTotal}
                        onPaymentSuccess={handleUpiPaymentCompleted}
                        compact={true}
                      />
                    </div>
                  )}
                </div>

                <div className="p-4 bg-[#39251F]/5 rounded-sm border border-[#39251F]/10 text-xs text-[#39251F] flex items-center justify-between">
                  <div>
                    <span className="font-semibold block">Total Amount to Pay:</span>
                    <span className="text-[#76584C]">{items.length} artisan treats included</span>
                  </div>
                  <span className="font-serif text-2xl font-bold text-[#39251F]">
                    ₹{finalTotal}
                  </span>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setCheckoutModalOpen(false)}
                    className="flex-1 border border-[#39251F]/30 hover:border-[#39251F] text-[#39251F] text-xs font-semibold py-3 rounded-sm transition-colors"
                  >
                    Back to Basket
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-[#C58B52] hover:bg-[#B27941] text-[#FFF5E8] text-xs font-bold py-3 rounded-sm transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    <span>Confirm Order (₹{finalTotal})</span>
                  </button>
                </div>
              </form>
            ) : (
              /* Order Success Ticket */
              <div className="space-y-6 text-center py-4">
                <div className="w-16 h-16 rounded-full bg-[#89977A]/20 text-[#89977A] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <div>
                  <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#89977A]">
                    Order Reserved & Confirmed
                  </span>
                  <h2 className="font-serif text-3xl font-bold text-[#39251F] mt-1">
                    Thank You, {orderDetails.name}!
                  </h2>
                  <p className="text-xs text-[#76584C] mt-2 max-w-sm mx-auto">
                    Your fresh bake order has been queued in our bakery kitchen schedule.
                  </p>
                </div>

                {/* Simulated Bakery Ticket */}
                <div className="bg-white border border-[#39251F]/15 p-6 rounded-sm text-left text-xs text-[#39251F] space-y-3 relative shadow-xs">
                  <div className="flex items-center justify-between border-b border-[#39251F]/10 pb-3">
                    <div>
                      <span className="text-[10px] uppercase text-[#76584C] font-semibold">
                        Order Reference
                      </span>
                      <p className="font-mono font-bold text-sm text-[#39251F]">
                        {orderDetails.orderNumber}
                      </p>
                    </div>
                    <Receipt className="w-5 h-5 text-[#C58B52]" />
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div>
                      <span className="text-[#76584C]">Delivery Window:</span>
                      <p className="font-semibold">{orderDetails.deliverySlot}</p>
                    </div>
                    <div>
                      <span className="text-[#76584C]">Payment Status:</span>
                      <p className="font-semibold text-emerald-700">{orderDetails.paymentMode}</p>
                    </div>
                  </div>

                  {orderDetails.paymentReference && (
                    <div className="text-[11px] bg-[#FFF5E8] p-2 rounded-xs border border-[#39251F]/10">
                      <span className="text-[#76584C]">UPI UTR / Reference: </span>
                      <span className="font-mono font-bold text-[#39251F]">{orderDetails.paymentReference}</span>
                    </div>
                  )}

                  <div className="text-[11px]">
                    <span className="text-[#76584C]">Destination:</span>
                    <p className="font-semibold">{orderDetails.address}</p>
                  </div>

                  <div className="border-t border-[#39251F]/10 pt-3 flex items-center justify-between font-serif text-sm">
                    <span className="font-bold">Total Confirmed:</span>
                    <span className="text-base font-bold text-[#39251F]">₹{finalTotal}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleFinishAndClear}
                    className="w-full bg-[#39251F] hover:bg-[#2A1A15] text-[#FFF5E8] font-bold text-xs py-3.5 rounded-sm transition-colors shadow-sm cursor-pointer"
                  >
                    Return to Bakery Storefront
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
