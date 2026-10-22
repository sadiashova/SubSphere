'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  Star,
  Check,
  Repeat,
  ShoppingBag,
  ShieldCheck,
  Truck,
  ArrowLeft,
  Share2,
  Heart,
  Send,
  MessageSquare
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [purchaseType, setPurchaseType] = useState<'subscription' | 'one-time'>('subscription');
  const [selectedPlan, setSelectedPlan] = useState<'MONTHLY' | 'BI_MONTHLY' | 'QUARTERLY'>('MONTHLY');

  // Review Form state
  const [reviewerName, setReviewerName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/products/${id}`);
      const data = await res.json();
      if (data.success) {
        setProduct(data.product);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product || !reviewerName || !reviewComment) return;

    try {
      setSubmittingReview(true);
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          authorName: reviewerName,
          rating: reviewRating,
          comment: reviewComment,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setReviewSuccess(true);
        setReviewerName('');
        setReviewComment('');
        fetchProduct(); // refresh reviews
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 flex justify-center">
        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Product Not Found</h2>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Catalog
        </Link>
      </div>
    );
  }

  let featuresList: string[] = [];
  let benefitsList: string[] = [];
  try {
    featuresList = JSON.parse(product.features);
    benefitsList = JSON.parse(product.subscriptionBenefits);
  } catch {
    // fallback
  }

  const savings = product.price - product.subscriptionPrice;
  const savingsPercent = Math.round((savings / product.price) * 100);

  const handleAddToCart = () => {
    addToCart(product, purchaseType === 'subscription', selectedPlan);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-indigo-600">Home</Link>
        <span>/</span>
        <span className="text-slate-400">{product.category}</span>
        <span>/</span>
        <span className="text-slate-800 font-semibold truncate">{product.name}</span>
      </div>

      {/* Main Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Image */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative h-[420px] sm:h-[500px] w-full rounded-3xl overflow-hidden bg-slate-100 border border-slate-200/80 shadow-md">
            <Image
              src={product.banner || product.thumbnail}
              alt={product.name}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-bold text-slate-800 uppercase tracking-wider shadow-sm">
              {product.category}
            </div>
            <div className="absolute top-4 right-4 bg-emerald-600 text-white px-3 py-1.5 rounded-xl text-xs font-extrabold shadow-md flex items-center gap-1.5">
              <Repeat className="w-4 h-4" />
              Save {savingsPercent}% with Subscription
            </div>
          </div>
        </div>

        {/* Right: Info & Pricing */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? 'fill-amber-400'
                        : 'fill-slate-200 text-slate-200'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-bold text-slate-800">{product.rating}</span>
              <span className="text-xs text-slate-400">({product.reviewCount} customer reviews)</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
              {product.name}
            </h1>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Pricing Options Selector */}
          <div className="space-y-3 pt-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Select Purchase Model
            </span>

            {/* Option 1: Subscription */}
            <div
              onClick={() => setPurchaseType('subscription')}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                purchaseType === 'subscription'
                  ? 'border-indigo-600 bg-indigo-50/50 shadow-md shadow-indigo-100'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <input
                    type="radio"
                    checked={purchaseType === 'subscription'}
                    onChange={() => setPurchaseType('subscription')}
                    className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">Subscribe & Save</span>
                      <span className="px-2 py-0.5 text-[10px] font-extrabold bg-emerald-100 text-emerald-800 rounded-md">
                        Save ${savings.toFixed(2)}/box
                      </span>
                    </div>
                    <span className="text-xs text-slate-500">Cancel or skip deliveries anytime</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-lg font-black text-indigo-600">
                    ${product.subscriptionPrice.toFixed(2)}
                  </span>
                  <span className="text-xs text-slate-500 block">per box</span>
                </div>
              </div>

              {/* Delivery Frequency Picker */}
              {purchaseType === 'subscription' && (
                <div className="mt-3 pt-3 border-t border-indigo-100 flex items-center justify-between text-xs">
                  <span className="font-semibold text-indigo-900">Delivery Cadence:</span>
                  <div className="flex gap-1.5">
                    {(['MONTHLY', 'BI_MONTHLY', 'QUARTERLY'] as const).map((plan) => (
                      <button
                        key={plan}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPlan(plan);
                        }}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase transition-all ${
                          selectedPlan === plan
                            ? 'bg-indigo-600 text-white'
                            : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {plan.replace('_', '-')}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Option 2: One-time buy */}
            <div
              onClick={() => setPurchaseType('one-time')}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                purchaseType === 'one-time'
                  ? 'border-indigo-600 bg-indigo-50/50 shadow-md shadow-indigo-100'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <input
                    type="radio"
                    checked={purchaseType === 'one-time'}
                    onChange={() => setPurchaseType('one-time')}
                    className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                  />
                  <div>
                    <span className="font-bold text-slate-900 text-sm">One-Time Purchase</span>
                    <span className="text-xs text-slate-500 block">Single trial box delivery</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-slate-800">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="space-y-3 pt-2">
            <button
              onClick={handleAddToCart}
              className="w-full py-4 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm shadow-xl shadow-indigo-200 transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
            >
              {purchaseType === 'subscription' ? (
                <>
                  <Repeat className="w-5 h-5" />
                  Subscribe For ${product.subscriptionPrice.toFixed(2)}
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5" />
                  Add To Cart (${product.price.toFixed(2)})
                </>
              )}
            </button>

            <div className="grid grid-cols-2 gap-3 text-xs text-slate-500 pt-1">
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-indigo-600" />
                <span>Free Tracked Shipping</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>No Commitment, Cancel Anytime</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Box Contents & Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-200">
        {/* Features */}
        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            What&apos;s Inside Every Box
          </h3>
          <ul className="space-y-3 text-sm text-slate-700">
            {featuresList.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Subscription Benefits */}
        <div className="p-8 rounded-3xl bg-gradient-to-tr from-indigo-50/80 to-purple-50/50 border border-indigo-100 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-indigo-950 flex items-center gap-2">
            Subscriber Exclusives & Perks
          </h3>
          <ul className="space-y-3 text-sm text-indigo-900">
            {benefitsList.map((benefit, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Star className="w-3 h-3 fill-white" />
                </div>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <section className="pt-8 border-t border-slate-200 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold text-slate-900">Verified Unboxing Reviews</h3>
            <p className="text-xs text-slate-500 mt-1">
              Read real thoughts from subscribers who experienced this box.
            </p>
          </div>
          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-slate-200">
            <span className="text-2xl font-black text-slate-900">{product.rating}</span>
            <div>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <span className="text-[11px] text-slate-500">{product.reviewCount} total ratings</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Reviews List */}
          <div className="lg:col-span-7 space-y-4">
            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map((rev) => (
                <div key={rev.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900">{rev.authorName}</span>
                    <div className="flex text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500">No reviews yet. Be the first to review!</p>
            )}
          </div>

          {/* Write a Review Form */}
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-indigo-600" /> Write a Review
            </h4>

            {reviewSuccess && (
              <div className="p-3 bg-emerald-50 text-emerald-800 text-xs rounded-xl font-medium">
                Thank you! Your review has been added.
              </div>
            )}

            <form onSubmit={handleReviewSubmit} className="space-y-3.5">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  placeholder="e.g. Maya Khan"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Rating</label>
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewRating(star)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          star <= reviewRating
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Your Feedback</label>
                <textarea
                  required
                  rows={3}
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="What did you love about unboxing this product?"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <button
                type="submit"
                disabled={submittingReview}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                {submittingReview ? 'Submitting...' : 'Post Review'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

