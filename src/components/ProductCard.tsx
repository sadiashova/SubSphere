'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, Repeat, ShoppingBag, Check } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const savingsPercent = Math.round(
    ((product.price - product.subscriptionPrice) / product.price) * 100
  );

  let featuresList: string[] = [];
  try {
    featuresList = JSON.parse(product.features);
  } catch {
    featuresList = [];
  }

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
      {/* Image Banner */}
      <div className="relative w-full h-56 bg-slate-100 overflow-hidden">
        <Image
          src={product.thumbnail}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Category Badge */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          <span className="px-2.5 py-1 text-xs font-bold uppercase tracking-wider bg-white/90 backdrop-blur-md text-slate-800 rounded-lg shadow-sm">
            {product.category}
          </span>
          {product.isFeatured && (
            <span className="px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-md shadow-sm">
              Featured Box
            </span>
          )}
        </div>

        {/* Subscription Discount Badge */}
        <div className="absolute top-3 right-3 bg-emerald-600 text-white px-2.5 py-1 rounded-lg text-xs font-bold shadow-md flex items-center gap-1">
          <Repeat className="w-3 h-3" />
          Save {savingsPercent}% Sub
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating & Frequency */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="font-bold text-slate-800">{product.rating}</span>
              <span>({product.reviewCount})</span>
            </div>
            <span className="font-medium px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full">
              Delivered {product.frequency}
            </span>
          </div>

          {/* Title */}
          <Link href={`/products/${product.id}`}>
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          <p className="mt-1.5 text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Mini Features */}
          {featuresList.length > 0 && (
            <div className="mt-3 space-y-1">
              {featuresList.slice(0, 2).map((feat, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-600 truncate">
                  <Check className="w-3 h-3 text-indigo-500 flex-shrink-0" />
                  <span className="truncate">{feat}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pricing & Actions */}
        <div className="mt-5 pt-4 border-t border-slate-100">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-xs text-slate-400 block font-medium">Subscribe & Save</span>
              <span className="text-xl font-extrabold text-indigo-600">
                ${product.subscriptionPrice.toFixed(2)}
              </span>
              <span className="text-xs text-slate-500 font-medium">/box</span>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 block font-medium">One-Time Buy</span>
              <span className="text-sm font-semibold text-slate-600 line-through">
                ${product.price.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => addToCart(product, false)}
              className="w-full py-2 px-2 rounded-xl text-xs font-bold border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-center gap-1"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Buy Once
            </button>
            <button
              onClick={() => addToCart(product, true)}
              className="w-full py-2 px-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200 transition-all flex items-center justify-center gap-1"
            >
              <Repeat className="w-3.5 h-3.5" />
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

