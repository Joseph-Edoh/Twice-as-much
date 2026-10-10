import React, { useState } from 'react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState<number>(0);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Checkout form
  const [checkoutName, setCheckoutName] = useState('');
  const [checkoutEmail, setCheckoutEmail] = useState('');
  const [checkoutAddress, setCheckoutAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'applepay' | 'fitting'>('card');
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState<string | null>(null);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = subtotal * promoDiscount;
  const grandTotal = Math.max(0, subtotal - discountAmount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError(null);
    if (promoCode.trim().toUpperCase() === 'HAUTE10' || promoCode.trim().toUpperCase() === 'ATELIER10') {
      setPromoDiscount(0.1);
    } else {
      setPromoError('Invalid promotion code. Try "HAUTE10" for 10% privilege.');
    }
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkoutName || !checkoutEmail) return;

    setIsProcessingOrder(true);
    setTimeout(() => {
      setIsProcessingOrder(false);
      const generatedId = `RTW-${Math.floor(20000 + Math.random() * 80000)}`;
      setConfirmedOrderId(generatedId);
      onClearCart();
    }, 700);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#070D24] border-l border-[rgba(213,168,72,0.25)] p-6 flex flex-col justify-between shadow-2xl relative">
          {/* Header */}
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[rgba(213,168,72,0.2)]">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-mono tracking-widest text-[#F3D17A] font-semibold">
                  TWICE AS MUCH · Shopping Bag
                </span>
                <span className="text-xs text-neutral-300 font-mono">
                  ({items.reduce((acc, i) => acc + i.quantity, 0)} items)
                </span>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/5 text-neutral-300 hover:text-white flex items-center justify-center transition-colors border border-[rgba(213,168,72,0.2)]"
              >
                ✕
              </button>
            </div>

            {/* Cart Items List */}
            {items.length === 0 ? (
              <div className="py-20 text-center">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-3 text-neutral-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <p className="text-neutral-300 text-sm">Your shopping bag is currently empty.</p>
                <button
                  onClick={onClose}
                  className="mt-4 text-xs font-bold text-[#F3D17A] hover:underline"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              <div className="divide-y divide-white/10 max-h-[50vh] overflow-y-auto my-4 pr-1">
                {items.map((item) => (
                  <div key={item.id} className="py-4 flex gap-3.5">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-20 object-cover rounded border border-[rgba(213,168,72,0.2)] shrink-0"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between">
                          <h4 className="text-xs font-serif text-white font-medium line-clamp-1">
                            {item.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="text-neutral-400 hover:text-red-400 text-xs ml-2"
                          >
                            ×
                          </button>
                        </div>
                        <div className="text-[11px] text-neutral-300 flex items-center gap-2 mt-1">
                          <span
                            className="w-2.5 h-2.5 rounded-full inline-block border border-white/20"
                            style={{ backgroundColor: item.color.hex }}
                          />
                          <span>{item.color.name}</span>
                          <span>·</span>
                          <span className="font-mono">{item.size}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-[rgba(213,168,72,0.25)] rounded bg-[#0B153D] text-xs">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="px-2 py-0.5 text-neutral-300 hover:text-white"
                          >
                            -
                          </button>
                          <span className="px-2 py-0.5 text-white font-mono">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="px-2 py-0.5 text-neutral-300 hover:text-white"
                          >
                            +
                          </button>
                        </div>
                        <span className="font-mono text-xs font-bold text-[#F3D17A]">
                          ${item.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer with Subtotal & Checkout */}
          {items.length > 0 && (
            <div className="pt-4 border-t border-[rgba(213,168,72,0.2)] space-y-3">
              {/* Promo input */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Code (try HAUTE10)"
                  className="flex-1 px-3 py-1.5 bg-[#0B153D] border border-[rgba(213,168,72,0.25)] rounded text-xs text-white placeholder-neutral-400 focus:outline-none focus:border-[#D5A848]"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-[#D5A848]/20 hover:bg-[#D5A848]/30 border border-[#D5A848]/40 text-xs text-[#F3D17A] rounded font-semibold"
                >
                  Apply
                </button>
              </form>
              {promoError && <p className="text-[11px] text-red-400">{promoError}</p>}
              {promoDiscount > 0 && (
                <p className="text-[11px] text-emerald-400">✓ 10% Maison privilege applied</p>
              )}

              {/* Price rows */}
              <div className="space-y-1.5 text-xs text-neutral-300 pt-2 border-t border-white/10">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-white">${subtotal}</span>
                </div>
                {promoDiscount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Privilege Discount</span>
                    <span className="font-mono">-${discountAmount.toFixed(0)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Insured Global Courier</span>
                  <span className="text-[#F3D17A] font-mono uppercase">Complimentary</span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-white pt-2 border-t border-[rgba(213,168,72,0.2)]">
                  <span>Total</span>
                  <span className="font-mono text-[#F3D17A] text-base font-bold">${grandTotal.toFixed(0)}</span>
                </div>
              </div>

              <button
                onClick={() => setIsCheckoutOpen(true)}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-[#D5A848] to-[#F3D17A] text-[#070D24] font-bold text-xs hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#D5A848]/20"
              >
                Proceed to Checkout · ${grandTotal.toFixed(0)}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* CHECKOUT MODAL */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#070D24] max-w-lg w-full rounded-2xl border border-[rgba(213,168,72,0.35)] p-6 sm:p-8 shadow-2xl relative">
            {confirmedOrderId ? (
              <div className="text-center py-6">
                <div className="w-14 h-14 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37] flex items-center justify-center mx-auto mb-4 text-[#D4AF37]">
                  ✓
                </div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
                  Order Confirmed
                </span>
                <h3 className="text-2xl font-serif text-white mt-1">
                  Thank You for Your Order
                </h3>
                <p className="text-xs text-neutral-400 mt-2 font-mono">
                  Order Reference: #{confirmedOrderId}
                </p>
                <p className="text-xs text-neutral-300 mt-3 leading-relaxed">
                  Your order confirmation and courier tracking will be dispatched to {checkoutEmail}. Our concierge will verify your garments prior to dispatch.
                </p>

                <button
                  onClick={() => {
                    setIsCheckoutOpen(false);
                    setConfirmedOrderId(null);
                    onClose();
                  }}
                  className="mt-6 w-full py-2.5 px-4 rounded-lg bg-[#D4AF37] text-[#0F1115] text-xs font-semibold hover:bg-[#E6CA65]"
                >
                  Back to Boutique
                </button>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                  <div>
                    <span className="text-xs uppercase font-mono tracking-widest text-[#D4AF37]">
                      Secure Checkout
                    </span>
                    <h3 className="text-xl font-serif text-white">Delivery & Payment</h3>
                  </div>
                  <button
                    onClick={() => setIsCheckoutOpen(false)}
                    className="text-neutral-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleCompleteOrder} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-neutral-400 uppercase mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={checkoutName}
                      onChange={(e) => setCheckoutName(e.target.value)}
                      placeholder="e.g. Genevieve Laurent"
                      className="w-full px-3 py-2 bg-[#0F1115] border border-white/15 rounded text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-400 uppercase mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={checkoutEmail}
                      onChange={(e) => setCheckoutEmail(e.target.value)}
                      placeholder="client@domain.com"
                      className="w-full px-3 py-2 bg-[#0F1115] border border-white/15 rounded text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-400 uppercase mb-1">
                      Shipping Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={checkoutAddress}
                      onChange={(e) => setCheckoutAddress(e.target.value)}
                      placeholder="Street, City, Postal Code, Country"
                      className="w-full px-3 py-2 bg-[#0F1115] border border-white/15 rounded text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  {/* Payment selection */}
                  <div>
                    <label className="block text-xs font-mono text-neutral-400 uppercase mb-2">
                      Payment Method
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`p-2.5 rounded border text-center text-xs transition-all ${
                          paymentMethod === 'card'
                            ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-white font-semibold'
                            : 'border-white/10 bg-[#0F1115] text-neutral-400'
                        }`}
                      >
                        Credit Card
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('applepay')}
                        className={`p-2.5 rounded border text-center text-xs transition-all ${
                          paymentMethod === 'applepay'
                            ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-white font-semibold'
                            : 'border-white/10 bg-[#0F1115] text-neutral-400'
                        }`}
                      >
                        Apple Pay
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('fitting')}
                        className={`p-2.5 rounded border text-center text-xs transition-all ${
                          paymentMethod === 'fitting'
                            ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-white font-semibold'
                            : 'border-white/10 bg-[#0F1115] text-neutral-400'
                        }`}
                      >
                        Atelier Fitting
                      </button>
                    </div>
                  </div>

                  {/* Summary row */}
                  <div className="bg-[#0F1115] p-3 rounded-lg border border-white/5 text-xs text-neutral-300 flex justify-between items-center">
                    <span>Grand Total Due:</span>
                    <span className="font-mono text-base text-[#D4AF37] font-bold">
                      ${grandTotal.toFixed(0)}
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessingOrder}
                    className="w-full py-3 rounded-lg bg-[#D4AF37] text-[#0F1115] font-semibold text-xs hover:bg-[#E6CA65] flex items-center justify-center gap-2"
                  >
                    {isProcessingOrder ? 'Authorizing Payment...' : `Confirm Order · $${grandTotal.toFixed(0)}`}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
