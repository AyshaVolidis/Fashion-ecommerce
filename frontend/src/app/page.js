'use client';

import { useEffect, useState } from 'react';
import { fetchProducts } from '../lib/api';
import Link from 'next/link';
import heroImage from '../assets/amazed-young.jpg';

function StarRating({ rating = 4.5 }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(i => (
        <svg
          key={i}
          className={`w-4 h-4 ${i <= Math.floor(rating) ? 'fill-amber-400 text-amber-400' : 'fill-gray-300 text-gray-300'}`}
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      ))}
    </div>
  );
}

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="bg-gray-50">
      {/* Main Hero + Products Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-12">
          {/* Hero Section */}
          <div className="hero-circle relative h-96 lg:h-full rounded-3xl overflow-hidden bg-gradient-to-br from-amber-100 via-gray-100 to-gray-200 flex items-center justify-center">
            <img
              src={heroImage.src}
              alt="Fashion"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-black/20 flex flex-col justify-center items-center text-center z-10 p-8">
              <h1 className="text-white text-4xl md:text-5xl mb-4 max-w-md">
                We are digital meets fashions
              </h1>
              <p className="text-white/90 text-sm md:text-base max-w-md mb-8 font-light">
                Show your retro picks, get high-quality swing directly from the store foundation
              </p>
              <Link href="#featured" className="btn-primary bg-white text-black hover:bg-gray-100 inline-flex items-center gap-2">
                Start shopping
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Featured Products - Right Side */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-light">New arrival</h2>
              <Link href="#featured" className="text-sm text-gray-600 hover:text-black transition">
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {products.slice(0, 4).map((product, idx) => (
                <Link
                  key={product._id}
                  href={`/product/${product._id}`}
                  className="group"
                >
                  <div className="relative overflow-hidden rounded-xl bg-white">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 badge">
                      {product.stock > 0 ? 'In Stock' : 'Out'}
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="text-xs text-gray-500 mb-1">{product.name.split(' ').slice(0, 2).join(' ')}</p>
                    <p className="font-semibold text-sm mb-2">${product.price}</p>
                    <StarRating rating={4 + Math.random()} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section id="featured" className="max-w-7xl mx-auto px-4 py-16">
        <div className="mb-12">
          <h2 className="text-4xl font-light mb-2">Fashion and offers</h2>
          <p className="text-gray-600">for every body</p>
        </div>

        {loading && (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black" />
          </div>
        )}

        {error && (
          <div className="text-center text-red-600 py-12">
            <p className="text-lg">Error loading products: {error}</p>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {products.map(product => (
            <Link
              key={product._id}
              href={`/product/${product._id}`}
              className="group"
            >
              <div className="relative overflow-hidden rounded-2xl bg-white">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 badge">
                  {product.stock > 0 ? 'Stock' : 'Out'}
                </div>
              </div>
              <div className="mt-3">
                <h3 className="font-semibold text-sm line-clamp-1">{product.name}</h3>
                <p className="text-lg font-light mt-1">${product.price}</p>
                <StarRating rating={4 + Math.random()} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-black text-white py-16 md:py-24 mt-16">
        <div className="max-w-2xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-light">
            Exclusive fashion offers await
          </h2>
          <p className="text-gray-300 font-light">
            Get early access to new collections and exclusive offers
          </p>
          <div className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-6 py-3 text-black rounded-full focus:outline-none text-sm"
            />
            <button className="btn-primary bg-white text-black hover:bg-gray-100">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}


