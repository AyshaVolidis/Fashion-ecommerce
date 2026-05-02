'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '../../store/authStore';
import useFavoriteStore from '../../store/favoriteStore';
import Link from 'next/link';

export default function AccountPage() {
  const { user, isLoading } = useAuthStore();
  const { favorites, removeFavorite } = useFavoriteStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/signin');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 min-h-[70vh]">
      <h1 className="text-3xl font-light mb-8">My Account</h1>
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 max-w-lg">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-2xl font-light">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-xl font-medium">{user.name}</h2>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>
        
        <div className="pt-8 mt-8 border-t border-gray-100">
          <h3 className="text-xl font-light mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-red-500 fill-red-500" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            My Favorites
          </h3>
          
          {favorites.length === 0 ? (
            <p className="text-gray-500 text-sm">You haven't saved any items yet.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
              {favorites.map((item) => (
                <div key={item._id} className="relative group rounded-xl overflow-hidden bg-gray-50 border border-gray-100 p-2">
                  <div className="w-full aspect-square bg-white rounded-lg overflow-hidden mb-2 relative">
                    <Link href={`/product/${item._id}`}>
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </Link>
                    <button 
                      onClick={() => removeFavorite(item._id)}
                      className="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full text-red-500 transition-colors"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-xs font-medium line-clamp-1">{item.name}</p>
                  <p className="text-sm font-semibold">${item.price}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
