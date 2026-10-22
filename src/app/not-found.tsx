'use client';

import Link from 'next/link';
import { Box, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center space-y-4 max-w-md mx-auto">
        <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
          <Box className="w-8 h-8" />
        </div>
        <h1 className="text-5xl font-black text-slate-900">404</h1>
        <h2 className="text-xl font-bold text-slate-800">Page Not Found</h2>
        <p className="text-xs text-slate-500">
          The subscription box or page you are looking for doesn&apos;t exist or has moved.
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Catalog
          </Link>
        </div>
      </div>
    </div>
  );
}
