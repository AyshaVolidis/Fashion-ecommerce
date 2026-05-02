'use client';

import { useRouter } from 'next/navigation';
import useCartStore from '../../store/cartStore';
import Link from 'next/link';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore();
  const router = useRouter();

  if (items.length === 0) return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <div className="text-center space-y-6">
        <div className="text-6xl text-gray-300">🛒</div>
        <h1 className="text-3xl font-light">Your cart is empty</h1>
        <p className="text-gray-600">Explore our collection and add some items</p>
        <Link href="/" className="inline-block btn-primary">
          Continue Shopping
        </Link>
      </div>
    </div>
  );

  return (
    <main className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-light mb-12">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(item => (
              <div key={item._id} className="bg-white rounded-lg p-6 flex gap-6">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-1 space-y-2">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-3 border border-gray-200 rounded-lg w-fit p-1">
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-100"
                      >
                        −
                      </button>
                      <span className="w-6 text-center text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-lg font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item._id)}
                  className="text-red-500 hover:text-red-700 transition text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-8 space-y-6 sticky top-24">
              <h2 className="text-2xl font-light">Order Summary</h2>

              <div className="space-y-3 py-6 border-t border-b">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${getTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span>${(getTotal() * 0.08).toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>${(getTotal() * 1.08).toFixed(2)}</span>
              </div>

              <button
                onClick={() => router.push('/checkout')}
                className="w-full btn-primary bg-black text-white py-3 text-base"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={() => router.push('/')}
                className="w-full btn-secondary py-3 text-base"
              >
                Continue Shopping
              </button>

              <button
                onClick={clearCart}
                className="w-full text-center text-sm text-red-500 hover:text-red-700 transition py-2"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
