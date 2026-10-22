'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Sparkles, Box, RefreshCw, Gift, Star, ArrowRight, ShieldCheck, CheckCircle2, SlidersHorizontal } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';

const CATEGORIES = [
  'All',
  'Beauty & Skincare',
  'Tech & Gadgets',
  'Gourmet & Beverage',
  'Wellness & Spa',
  'Eco & Lifestyle'
];

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, sortBy]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (selectedCategory !== 'All') params.set('category', selectedCategory);
      if (sortBy !== 'featured') params.set('sort', sortBy);

      const res = await fetch(`/api/products?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setProducts(data.products);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((prod) =>
    prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    prod.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-900 via-indigo-950 to-slate-900 text-white pt-20 pb-24 lg:pt-28 lg:pb-32">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-500/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-10 right-10 w-96 h-96 bg-purple-500/15 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Next-Gen Subscription Box Experience</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]">
                Curated Luxury & Tech Boxes.{' '}
                <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                  Delivered To You.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                Experience high-value unboxing every month. Discover authentic beauty, gadget upgrades, artisan roasts, and self-care essentials. Save up to 20% with flexible, cancel-anytime subscriptions.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <a
                  href="#explore-boxes"
                  className="px-7 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 hover:scale-[1.02] transition-all flex items-center gap-2"
                >
                  Explore All Boxes
                  <ArrowRight className="w-4 h-4" />
                </a>
                <Link
                  href="/subscriptions"
                  className="px-7 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-white font-semibold text-sm backdrop-blur-md transition-all flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4 text-emerald-400" />
                  Manage Existing Sub
                </Link>
              </div>

              {/* Social Proof */}
              <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-8 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="font-bold text-white">4.9/5</span> from 1,200+ reviews
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-indigo-400" />
                  <span>Free shipping included</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Pause/Cancel in 1 click</span>
                </div>
              </div>
            </div>

            {/* Hero Visual Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md bg-gradient-to-tr from-slate-800/80 to-slate-900/90 rounded-3xl p-6 border border-slate-700/80 shadow-2xl backdrop-blur-xl">
                <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden mb-6 bg-slate-800">
                  <img
                    src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80"
                    alt="Featured Unboxing Box"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-indigo-600/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full">
                    Most Popular Drop
                  </div>
                  <div className="absolute bottom-3 right-3 bg-emerald-500 text-white text-xs font-extrabold px-3 py-1 rounded-full shadow-lg">
                    Save $10 on Sub
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white">The Everyday Glow Crate</h3>
                    <span className="text-xl font-extrabold text-indigo-400">$28.99</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Hand-picked botanical skincare & daily cosmetics valued at over $70 in individual retail stores.
                  </p>
                  <div className="pt-2 flex items-center justify-between text-xs text-slate-300">
                    <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                      <Gift className="w-4 h-4" /> Bonus welcome gift included
                    </span>
                    <span className="text-slate-400">Next delivery: Oct 30</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Boxes / Catalog Section */}
      <section id="explore-boxes" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Curated Subscription Boxes
          </h2>
          <p className="text-base text-slate-600">
            Select your passion. Buy as a one-off treat or subscribe to save up to 20% with effortless recurring deliveries.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-sm space-y-4 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            {/* Search */}
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search boxes, gear, beauty..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <SlidersHorizontal className="w-4 h-4 text-slate-500" />
              <span className="text-xs font-semibold text-slate-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs font-medium py-2 px-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="featured">Featured First</option>
                <option value="rating">Top Rated</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-96 rounded-2xl bg-slate-200 animate-pulse" />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
            <Box className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-700">No boxes found</h3>
            <p className="text-xs text-slate-500 mt-1">
              Try searching with different keywords or choosing another category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* How It Works Section */}
      <section className="bg-white py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
              Seamless Process
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">How SubSphere Works</h2>
            <p className="text-sm text-slate-600">Three easy steps to recurring happiness at your door.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200/80 relative space-y-4">
              <span className="text-4xl font-black text-indigo-200">01</span>
              <h3 className="text-lg font-bold text-slate-900">Choose Your Box</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Browse our expert-curated beauty, tech, gourmet coffee, or wellness collections. Opt for a one-time purchase or subscriber pricing.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-indigo-50/60 border border-indigo-100 relative space-y-4">
              <span className="text-4xl font-black text-indigo-300">02</span>
              <h3 className="text-lg font-bold text-slate-900">Customize Frequency</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Choose monthly, bi-monthly, or quarterly delivery intervals. Modify, skip or pause anytime right from your user dashboard.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200/80 relative space-y-4">
              <span className="text-4xl font-black text-indigo-200">03</span>
              <h3 className="text-lg font-bold text-slate-900">Unbox Delight</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Receive carefully packaged, authentic full-size products with free doorstep shipping and exclusive surprise insider perks!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900">Loved by 12,000+ Subscribers</h2>
          <p className="text-sm text-slate-600">Here is what subscribers are saying about their unboxings.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-slate-700 italic leading-relaxed">
              &quot;The Everyday Glow Box has replaced all my guesswork with beauty shopping. Every single item feels premium and is actually useful.&quot;
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900">Nusrat Jahan</span>
              <span className="text-slate-400">Subscriber for 6 months</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-slate-700 italic leading-relaxed">
              &quot;The CyberTech Gadget crate is like Christmas every month. Fast Qi chargers, high-speed cables, and quirky desk accessories. Top tier!&quot;
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900">Fahim Chowdhury</span>
              <span className="text-slate-400">Subscriber for 1 year</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-slate-700 italic leading-relaxed">
              &quot;Fresh roasted single origin beans delivered right when my jar empties. Unmatched flavor and the origin cards are super informative.&quot;
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900">Ayesha Rahman</span>
              <span className="text-slate-400">Subscriber for 4 months</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

