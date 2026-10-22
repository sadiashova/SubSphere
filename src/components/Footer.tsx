import React from 'react';
import Link from 'next/link';
import { Box, ShieldCheck, Truck, RefreshCw, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      {/* Trust Badges */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 px-6 rounded-2xl bg-slate-800/60 border border-slate-700/60">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white">Free Doorstep Delivery</h4>
              <p className="text-xs text-slate-400">On all monthly subscriptions & orders over $40</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white">Skip or Cancel Anytime</h4>
              <p className="text-xs text-slate-400">Zero lock-in contracts. You are in total control</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white">100% Delight Guarantee</h4>
              <p className="text-xs text-slate-400">Curated with premium certified authentic goods</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <Box className="w-4 h-4" />
              </div>
              <span className="text-xl font-extrabold text-white">SubSphere</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Premium subscription boxes delivering joyful unboxing moments, discovery, and exclusive savings directly to your home every month.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Categories</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/?category=Beauty" className="hover:text-white transition-colors">Beauty & Skincare</Link></li>
              <li><Link href="/?category=Tech" className="hover:text-white transition-colors">Tech & Gadgets</Link></li>
              <li><Link href="/?category=Gourmet" className="hover:text-white transition-colors">Artisan Coffee & Snacks</Link></li>
              <li><Link href="/?category=Wellness" className="hover:text-white transition-colors">Wellness & Spa</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Customer Care</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/subscriptions" className="hover:text-white transition-colors">Manage Subscription</Link></li>
              <li><Link href="/orders" className="hover:text-white transition-colors">Track Your Package</Link></li>
              <li><Link href="/cart" className="hover:text-white transition-colors">Shopping Cart</Link></li>
              <li><span className="text-slate-400 cursor-pointer hover:text-white">Shipping FAQ</span></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Get $10 Off First Box</h3>
            <p className="text-xs text-slate-400 mb-3">Subscribe to our newsletter for exclusive insider unboxing previews and secret discount codes.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3.5 py-2 text-sm rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm rounded-lg transition-colors whitespace-nowrap">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} SubSphere Inc. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> using Next.js, TypeScript & Prisma
          </p>
        </div>
      </div>
    </footer>
  );
}

