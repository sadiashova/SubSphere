'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Repeat,
  Calendar,
  CheckCircle2,
  PauseCircle,
  XCircle,
  PlayCircle,
  MapPin,
  Box,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { Subscription } from '@/types';

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/subscriptions');
      const data = await res.json();
      if (data.success) {
        setSubscriptions(data.subscriptions);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: 'ACTIVE' | 'PAUSED' | 'CANCELLED') => {
    try {
      setActionLoading(id);
      const res = await fetch(`/api/subscriptions/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setFeedback(`Subscription has been ${newStatus.toLowerCase()} successfully.`);
        fetchSubscriptions();
        setTimeout(() => setFeedback(null), 4000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold mb-2">
            <Repeat className="w-3.5 h-3.5" />
            Recurring Management Hub
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">My Active Subscriptions</h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage your recurring delivery plans, pause when traveling, or cancel anytime.
          </p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-100 transition-all self-start sm:self-auto"
        >
          Add Another Box <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {feedback && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 shadow-sm">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          {feedback}
        </div>
      )}

      {loading ? (
        <div className="py-20 flex justify-center">
          <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
        </div>
      ) : subscriptions.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4 max-w-md mx-auto p-6">
          <div className="w-16 h-16 mx-auto bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
            <Box className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">No active subscriptions yet</h3>
          <p className="text-xs text-slate-500">
            Subscribe to any box in our catalog to receive discounts, free gifts, and automated periodic deliveries!
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-md transition-all"
          >
            Explore Subscription Boxes
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {subscriptions.map((sub) => {
            const isPaused = sub.status === 'PAUSED';
            const isCancelled = sub.status === 'CANCELLED';
            const isActive = sub.status === 'ACTIVE';

            return (
              <div
                key={sub.id}
                className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-5 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                      <Image
                        src={sub.product.thumbnail}
                        alt={sub.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                        {sub.plan} Plan
                      </span>
                      <h3 className="text-base font-bold text-slate-900 mt-1">
                        {sub.product.name}
                      </h3>
                      <span className="text-sm font-extrabold text-indigo-600">
                        ${sub.price.toFixed(2)}{' '}
                        <span className="text-xs text-slate-400 font-normal">/ billing cycle</span>
                      </span>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <span
                    className={`px-3 py-1 text-xs font-bold rounded-full ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : isPaused
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}
                  >
                    {sub.status}
                  </span>
                </div>

                {/* Details */}
                <div className="p-4 rounded-2xl bg-slate-50 space-y-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-indigo-500" />
                    <span>
                      Next Scheduled Drop:{' '}
                      <strong className="text-slate-800">
                        {new Date(sub.nextBilling).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span className="truncate">Shipping to: {sub.address}</span>
                  </div>
                </div>

                {/* Action Controls */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                  <div className="flex items-center gap-2">
                    {isActive && (
                      <button
                        onClick={() => handleUpdateStatus(sub.id, 'PAUSED')}
                        disabled={actionLoading === sub.id}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-amber-200 text-amber-700 hover:bg-amber-50 font-semibold transition-colors"
                      >
                        <PauseCircle className="w-3.5 h-3.5" />
                        Pause Drop
                      </button>
                    )}
                    {isPaused && (
                      <button
                        onClick={() => handleUpdateStatus(sub.id, 'ACTIVE')}
                        disabled={actionLoading === sub.id}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors"
                      >
                        <PlayCircle className="w-3.5 h-3.5" />
                        Resume Subscription
                      </button>
                    )}
                    {!isCancelled && (
                      <button
                        onClick={() => handleUpdateStatus(sub.id, 'CANCELLED')}
                        disabled={actionLoading === sub.id}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 font-semibold transition-colors"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        Cancel
                      </button>
                    )}
                  </div>

                  <Link
                    href={`/products/${sub.product.id}`}
                    className="font-bold text-indigo-600 hover:underline"
                  >
                    View Box
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

