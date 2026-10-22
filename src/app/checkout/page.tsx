'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  CreditCard,
  Truck,
  CheckCircle2,
  ShieldCheck,
  ShoppingBag,
  ArrowLeft,
  Smartphone,
  Banknote,
  Repeat,
  User as UserIcon
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const couponQuery = searchParams.get('coupon');
  const discountRate = couponQuery === '10' ? 0.1 : 0;

  const { cart, subtotal, clearCart } = useCart();
  const { user } = useAuth();

  // Form states
  const [formData, setFormData] = useState({
    name: 'Rahim Chowdhury',
    email: 'rahim.chowdhury@example.com',
    phone: '+880 1712-345678',
    address: 'House 42, Road 11, Banani',
    city: 'Dhaka',
    postalCode: '1213',
    paymentMethod: 'card',
  });

  // Auto-fill from logged-in user if available
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email,
        phone: user.phone || prev.phone,
        address: user.address || prev.address,
        city: user.city || prev.city,
      }));
    }
  }, [user]);

  const [loading, setLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState<any>(null);

  const discountAmount = subtotal * discountRate;
  const finalTotal = subtotal - discountAmount;
  const hasSubscriptions = cart.some((item) => item.isSubscription);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    try {
      setLoading(true);
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id || null,
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          shippingAddress: formData.address,
          city: formData.city,
          paymentMethod: formData.paymentMethod,
          discountAmount,
          items: cart.map((item) => ({
            product: item.product,
            quantity: item.quantity,
            isSubscribed: item.isSubscription,
            selectedPlan: item.selectedPlan,
          })),
        }),
      });

      const data = await res.json();
      if (data.success) {
        setOrderComplete(data.order);
        clearCart();
      } else {
        alert(data.error || 'Failed to place order.');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred during checkout.');
    } finally {
      setLoading(false);
    }
  };

  if (orderComplete) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 bg-emerald-100 rounded-full mx-auto flex items-center justify-center text-emerald-600 shadow-lg shadow-emerald-100">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
            Order Confirmed
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900">
            Thank You, {orderComplete.customerName}!
          </h1>
          <p className="text-sm text-slate-600">
            Your box is being prepped. Order tracking ID:{' '}
            <strong className="text-indigo-600 font-mono">{orderComplete.orderNumber}</strong>
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 text-left space-y-4 shadow-sm">
          <div className="flex justify-between text-xs text-slate-500 pb-3 border-b border-slate-100">
            <span>Delivering To:</span>
            <span className="font-semibold text-slate-800">{orderComplete.shippingAddress}, {orderComplete.city}</span>
          </div>
          <div className="flex justify-between text-xs text-slate-500 pb-3 border-b border-slate-100">
            <span>Payment Status:</span>
            <span className="font-semibold text-emerald-600 uppercase">{orderComplete.paymentStatus} ({orderComplete.paymentMethod})</span>
          </div>
          <div className="flex justify-between text-sm font-bold text-slate-900">
            <span>Total Paid:</span>
            <span className="text-indigo-600">${orderComplete.totalAmount.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            href="/orders"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold shadow-md transition-all"
          >
            Track Order Details
          </Link>
          {hasSubscriptions && (
            <Link
              href="/subscriptions"
              className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-bold transition-all flex items-center gap-2"
            >
              <Repeat className="w-4 h-4 text-emerald-400" />
              Manage Subscriptions
            </Link>
          )}
          <Link
            href="/"
            className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-semibold transition-all"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
        <h2 className="text-xl font-bold text-slate-800">Your cart is empty</h2>
        <Link href="/" className="inline-block px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold">
          Explore Boxes
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex items-center gap-3">
        <Link href="/cart" className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Secure Checkout</h1>
      </div>

      {!user && (
        <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-between text-xs text-indigo-900">
          <span>Already have an account? Sign in for saved addresses and fast 1-click checkout.</span>
          <Link href="/login" className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-colors">
            Sign In
          </Link>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Customer & Shipping Information */}
          <div className="lg:col-span-7 space-y-6">
            {/* Contact Details */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-base font-bold text-slate-900">1. Contact & Customer Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-base font-bold text-slate-900">2. Shipping Destination</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Street Address / House / Flat</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">City / Region</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Postal Code</label>
                  <input
                    type="text"
                    required
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-base font-bold text-slate-900">3. Select Payment Method</h2>
              <div className="space-y-3">
                <label className={`flex items-center justify-between p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                  formData.paymentMethod === 'card' ? 'border-indigo-600 bg-indigo-50/40' : 'border-slate-200 hover:border-slate-300'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={formData.paymentMethod === 'card'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'card' })}
                      className="w-4 h-4 text-indigo-600"
                    />
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-indigo-600" />
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">Credit / Debit Card</span>
                        <span className="text-[11px] text-slate-500">Visa, Mastercard, Amex (Instant test checkout)</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Instant</span>
                </label>

                <label className={`flex items-center justify-between p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                  formData.paymentMethod === 'bkash' ? 'border-indigo-600 bg-indigo-50/40' : 'border-slate-200 hover:border-slate-300'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={formData.paymentMethod === 'bkash'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'bkash' })}
                      className="w-4 h-4 text-indigo-600"
                    />
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-5 h-5 text-pink-600" />
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">bKash / Nagad MFS</span>
                        <span className="text-[11px] text-slate-500">Fast mobile wallet payment</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-pink-600 bg-pink-50 px-2 py-0.5 rounded">MFS</span>
                </label>

                <label className={`flex items-center justify-between p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                  formData.paymentMethod === 'cash_on_delivery' ? 'border-indigo-600 bg-indigo-50/40' : 'border-slate-200 hover:border-slate-300'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={formData.paymentMethod === 'cash_on_delivery'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'cash_on_delivery' })}
                      className="w-4 h-4 text-indigo-600"
                    />
                    <div className="flex items-center gap-2">
                      <Banknote className="w-5 h-5 text-emerald-600" />
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">Cash on Delivery</span>
                        <span className="text-[11px] text-slate-500">Pay when your box arrives</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">COD</span>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Order Review */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-5 sticky top-24">
              <h2 className="text-base font-bold text-slate-900">Order Summary ({cart.length} items)</h2>

              {/* Items List */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {cart.map((item) => {
                  const price = item.isSubscription
                    ? item.product.subscriptionPrice
                    : item.product.price;
                  return (
                    <div key={item.product.id} className="flex justify-between items-center text-xs">
                      <div className="flex-1 pr-2 truncate">
                        <span className="font-bold text-slate-800">{item.quantity}x</span>{' '}
                        <span className="text-slate-700">{item.product.name}</span>
                        {item.isSubscription && (
                          <span className="ml-1 text-[10px] text-emerald-600 font-bold">
                            ({item.selectedPlan})
                          </span>
                        )}
                      </div>
                      <span className="font-bold text-slate-900">
                        ${(price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Totals */}
              <div className="space-y-2 pt-3 border-t border-slate-100 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-800">${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Discount (10%)</span>
                    <span className="font-bold">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Tracked Express Shipping</span>
                  <span className="font-semibold text-emerald-600">FREE</span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-slate-900 pt-3 border-t border-slate-200">
                  <span>Total Due Today</span>
                  <span className="text-indigo-600 text-lg">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm rounded-2xl shadow-xl shadow-indigo-200 transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <ShieldCheck className="w-5 h-5" />
                    Place Order (${finalTotal.toFixed(2)})
                  </>
                )}
              </button>

              <p className="text-[11px] text-center text-slate-400">
                By placing this order you agree to SubSphere subscription terms. You can cancel recurring plans anytime.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-500">Loading checkout...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
