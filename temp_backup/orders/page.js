'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '../../store/authStore';
import { getUserOrders } from '../../lib/api';
import Link from 'next/link';

export default function OrdersPage() {
  const { user, isLoading: authLoading } = useAuthStore();
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/signin');
      return;
    }

    if (user) {
      getUserOrders()
        .then(data => setOrders(data.orders || []))
        .catch(err => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, [user, authLoading, router]);

  if (authLoading || (!user && loading) || loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 min-h-[70vh]">
      <h1 className="text-3xl font-light mb-8">My Orders</h1>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
          Error loading orders: {error}
        </div>
      )}

      {orders.length === 0 && !error ? (
        <div className="bg-white p-12 text-center rounded-2xl shadow-sm border border-gray-100">
          <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
          <Link href="/" className="btn-primary inline-block">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order._id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Order #{order._id}</p>
                  <p className="text-sm text-gray-500">
                    Placed on {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="mt-2 sm:mt-0">
                  <span className={`px-3 py-1 text-xs rounded-full font-medium capitalize ${
                    order.status === 'paid' ? 'bg-green-100 text-green-700' :
                    order.status === 'failed' ? 'bg-red-100 text-red-700' :
                    'bg-amber-100 text-amber-700'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
              
              <div className="space-y-4">
                {order.products.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 text-sm">
                    {item.product?.image ? (
                      <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-cover rounded-md" />
                    ) : (
                      <div className="w-16 h-16 bg-gray-100 rounded-md"></div>
                    )}
                    <div className="flex-1">
                      <p className="font-medium">{item.product?.name || `Product ID: ${item.product}`}</p>
                      <p className="text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-100 mt-4 pt-4 flex justify-between items-center">
                <span className="font-medium">Total</span>
                <span className="font-bold text-lg">${order.totalPrice.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
