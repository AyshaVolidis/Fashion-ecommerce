'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useCartStore from '../../store/cartStore';
import { checkout } from '../../lib/api';
import Link from 'next/link';

export default function CheckoutPage() {
  const { items, getTotal, clearCart } = useCartStore();
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', address: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const cartItems = items.map(i => ({ productId: i._id, quantity: i.quantity }));
      const result = await checkout(cartItems, form);
      setSuccess(true);
      clearCart();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <div className="bg-white rounded-lg p-12 text-center space-y-6 max-w-md">
        <div className="text-6xl">✓</div>
        <h1 className="text-4xl font-light text-green-600">Order Placed!</h1>
        <p className="text-gray-600">Thank you for your purchase. You'll receive an email confirmation shortly.</p>
        <div className="space-y-3">
          <button
            onClick={() => router.push('/')}
            className="w-full btn-primary bg-black text-white py-3"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => router.push('/')}
            className="w-full btn-secondary py-3"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );

  if (items.length === 0) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <p className="text-xl mb-4 text-gray-600">Your cart is empty</p>
        <Link href="/" className="text-blue-600 hover:underline">Continue Shopping</Link>
      </div>
    </div>
  );

  const total = getTotal();
  const tax = total * 0.08;
  const finalTotal = total + tax;

  return (
    <main className="bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-light mb-12">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Shipping Information */}
              <div className="bg-white rounded-lg p-8 space-y-6">
                <h2 className="text-2xl font-light">Shipping Information</h2>

                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <input
                    required
                    type="text"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email Address</label>
                  <input
                    required
                    type="email"
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Shipping Address</label>
                  <textarea
                    required
                    placeholder="123 Main St, City, State 12345"
                    value={form.address}
                    onChange={e => setForm({ ...form, address: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black resize-none"
                    rows="4"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-lg p-8 space-y-6">
                <h2 className="text-2xl font-light">Payment Method</h2>

                <div className="space-y-3">
                  <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input type="radio" name="payment" defaultChecked className="w-4 h-4" />
                    <span className="ml-3">Credit Card</span>
                  </label>
                  <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input type="radio" name="payment" className="w-4 h-4" />
                    <span className="ml-3">PayPal</span>
                  </label>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
                  Demo: All payments will be simulated. No real charges will be made.
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary bg-black text-white py-4 text-base disabled:opacity-50"
              >
                {loading ? 'Processing...' : `Pay $${finalTotal.toFixed(2)}`}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-8 space-y-6 sticky top-24 h-fit">
              <h2 className="text-2xl font-light">Order Summary</h2>

              <div className="space-y-3 max-h-64 overflow-y-auto">
                {items.map(item => (
                  <div key={item._id} className="flex justify-between text-sm pb-3 border-b">
                    <span className="text-gray-600">{item.name} x {item.quantity}</span>
                    <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 py-6 border-t border-b">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>

              <Link href="/cart" className="text-center text-sm text-blue-600 hover:underline block">
                Edit Cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
