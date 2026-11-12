'use client';

import React, { useState, useEffect } from 'react';
import {
  Star,
  CheckCircle2,
  PenLine,
  AlertCircle,
  Sparkles,
  ShieldCheck,
  MessageSquareHeart,
  X,
} from 'lucide-react';
import type { ProductReview, ProductReviewsSummary } from '@/types/reviews';
import ProductRatingStars from '@/components/ProductRatingStars';

interface ProductReviewsSectionProps {
  productId: string;
  productName: string;
  reviews: ProductReview[];
  summary: ProductReviewsSummary;
}

const USAGE_PRESETS = [
  'Für Müesli & Bowls',
  'Als gesunder Snack',
  'Zum Backen & Desserts',
  'Für Smoothies',
];

const INITIAL_VISIBLE_REVIEWS = 6;

const RATING_LABELS: Record<number, string> = {
  5: 'Hervorragend – Begeistert!',
  4: 'Sehr gut – Schmeckt lecker',
  3: 'Gut – Erwartungen erfüllt',
  2: 'Mässig – Nicht ganz überzeugt',
  1: 'Nicht zufrieden',
};

function formatReviewDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString('de-CH', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

export default function ProductReviewsSection({
  productId,
  productName,
  reviews,
  summary,
}: ProductReviewsSectionProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_VISIBLE_REVIEWS);
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [authorLocation, setAuthorLocation] = useState('');
  const [usageTag, setUsageTag] = useState<string>('Für Müesli & Bowls');
  const [comment, setComment] = useState('');
  const [honeypot, setHoneypot] = useState(''); // Anti-spam hidden field

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const visibleReviews = reviews.slice(0, visibleCount);
  const hasMoreReviews = visibleCount < reviews.length;

  // Handle ESC key and lock body scroll when modal is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsFormOpen(false);
      }
    };

    if (isFormOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isFormOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!rating || rating < 1 || rating > 5) {
      setErrorMessage('Bitte wähle eine Bewertung zwischen 1 und 5 Sternen.');
      return;
    }
    if (!orderNumber.trim()) {
      setErrorMessage('Bitte gib deine Bestellnummer ein (z. B. 1111).');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Bitte gib eine gültige E-Mail-Adresse ein.');
      return;
    }
    if (!authorName.trim() || authorName.trim().length < 2) {
      setErrorMessage('Bitte gib deinen Namen ein (mindestens 2 Zeichen).');
      return;
    }
    if (!comment.trim() || comment.trim().length < 5) {
      setErrorMessage('Bitte teile uns deine Erfahrung in mindestens 5 Zeichen mit.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId,
          authorName: authorName.trim(),
          authorLocation: authorLocation.trim() || undefined,
          email: email.trim(),
          orderNumber: orderNumber.trim(),
          rating,
          comment: comment.trim(),
          usageTag: usageTag.trim() || undefined,
          website_url: honeypot, // Honeypot field
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(
          data.error ||
            'Die Kombination aus Bestellnummer und E-Mail-Adresse konnte nicht gefunden werden. Bitte überprüfe deine Angaben.'
        );
        setIsSubmitting(false);
        return;
      }

      setSuccessMessage(
        data.message ||
          'Vielen Dank für deine Bewertung! Nach kurzer Prüfung wird dein Beitrag veröffentlicht.'
      );
      // Reset form
      setOrderNumber('');
      setEmail('');
      setAuthorName('');
      setAuthorLocation('');
      setComment('');
      setHoneypot('');

      // Auto close modal after 2 seconds
      setTimeout(() => {
        setIsFormOpen(false);
        setSuccessMessage(null);
      }, 2000);
    } catch (err) {
      console.error('Error submitting review:', err);
      setErrorMessage(
        'Beim Absenden ist ein Netzwerkfehler aufgetreten. Bitte prüfe deine Internetverbindung.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate star distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map((stars) => {
    const count = reviews.filter((r) => Math.round(Number(r.rating)) === stars).length;
    const percentage = summary.totalReviews > 0 ? (count / summary.totalReviews) * 100 : 0;
    return { stars, count, percentage };
  });

  return (
    <section
      id="kundenbewertungen"
      className="pt-16 border-t border-stone-200 space-y-10 scroll-mt-24"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 text-stone-800 text-xs font-bold border border-stone-200">
            <MessageSquareHeart className="w-3.5 h-3.5 text-rose-600" />
            <span>Echte Erfahrungen & Feedback</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-stone-900">
            Kundenbewertungen
          </h2>
          <p className="text-sm sm:text-base text-stone-600 max-w-xl">
            Verifizierte Rückmeldungen von Geniesserinnen und Geniessern in der Schweiz.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setIsFormOpen(true);
            setErrorMessage(null);
          }}
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-sm shadow-sm transition active:scale-[0.98] shrink-0 cursor-pointer"
        >
          <PenLine className="w-4 h-4 text-rose-300" />
          <span>Bewertung schreiben</span>
        </button>
      </div>

      {/* Summary Scorecard (Beige natural tone card) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#F9F6F0] border border-stone-200/90 shadow-2xs">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left Column: Big Average Score */}
          <div className="md:col-span-4 text-center md:text-left space-y-2 border-b md:border-b-0 md:border-r border-stone-200/80 pb-6 md:pb-0 md:pr-8">
            <div className="flex items-baseline justify-center md:justify-start gap-2">
              <span className="text-4xl sm:text-5xl font-black text-stone-900 tracking-tight">
                {summary.totalReviews > 0 ? summary.averageRating.toFixed(1) : '–'}
              </span>
              <span className="text-stone-500 font-semibold text-lg">/ 5.0</span>
            </div>
            <div>
              <ProductRatingStars
                rating={summary.averageRating}
                size="md"
                className="justify-center md:justify-start"
              />
            </div>
            <p className="text-xs sm:text-sm font-medium text-stone-600">
              {summary.totalReviews > 0
                ? `Basierend auf ${summary.totalReviews} verifizierten ${
                    summary.totalReviews === 1 ? 'Bewertung' : 'Bewertungen'
                  }`
                : 'Noch keine Bewertungen vorhanden'}
            </p>
          </div>

          {/* Middle Column: Star Breakdown Bars */}
          <div className="md:col-span-5 space-y-2">
            {ratingDistribution.map((item) => (
              <div key={item.stars} className="flex items-center gap-3 text-xs">
                <span className="w-12 font-semibold text-stone-700 flex items-center gap-1">
                  <span>{item.stars}</span>
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                </span>
                <div className="flex-1 h-2 rounded-full bg-stone-200 overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full transition-all duration-500"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <span className="w-8 text-right font-mono text-stone-500 text-[11px]">
                  {item.count}
                </span>
              </div>
            ))}
          </div>

          {/* Right Column: Swiss Verified Quality Guarantee */}
          <div className="md:col-span-3 bg-white/80 backdrop-blur-xs p-4 sm:p-5 rounded-2xl border border-stone-200/70 space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-1.5 text-xs font-bold text-emerald-800">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Verifizierte Käufe</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Jede Bewertung wird mit einer echten Bestellnummer abgeglichen, um maximale Ehrlichkeit und Echtheit zu garantieren.
            </p>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <div className="p-8 sm:p-12 rounded-3xl bg-white border border-stone-200/80 text-center space-y-4 max-w-2xl mx-auto shadow-2xs">
            <div className="w-12 h-12 rounded-2xl bg-[#F4EFE6] text-stone-700 flex items-center justify-center mx-auto">
              <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg sm:text-xl font-bold text-stone-900">
                Noch keine Bewertungen vorhanden
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                Sei die erste Person, die ihre Geschmackserfahrung mit diesem Produkt teilt und hilf anderen Feinschmeckern bei der Auswahl.
              </p>
            </div>
            <div>
              <button
                type="button"
                onClick={() => setIsFormOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold transition shadow-xs cursor-pointer"
              >
                <PenLine className="w-3.5 h-3.5" />
                <span>Erste Bewertung schreiben</span>
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {visibleReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="flex flex-col justify-between bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-7 shadow-2xs space-y-4 hover:border-stone-300 transition-colors"
                >
                  <div className="space-y-3">
                    {/* Rating Stars & Usage Tag */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <ProductRatingStars rating={rev.rating} size="sm" />
                      {rev.usage_tag && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#F4EFE6] text-stone-800 border border-stone-300/80">
                          {rev.usage_tag}
                        </span>
                      )}
                    </div>

                    {/* Comment */}
                    <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-normal">
                      {rev.comment}
                    </p>
                  </div>

                  {/* Author footer */}
                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-4 text-xs">
                    <div className="space-y-0.5 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-bold text-stone-900 truncate">
                          {rev.author_name}
                        </span>
                        {rev.author_location && (
                          <span className="text-stone-500 truncate">
                            ({rev.author_location})
                          </span>
                        )}
                      </div>
                      {rev.is_verified_purchase && (
                        <div className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                          <span>Verifizierter Kauf</span>
                        </div>
                      )}
                    </div>

                    <span className="text-[11px] text-stone-400 font-medium shrink-0">
                      {formatReviewDate(rev.created_at)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination / Load more reviews button */}
            {hasMoreReviews && (
              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={() => setVisibleCount((prev) => prev + 6)}
                  className="px-6 py-2.5 rounded-full text-sm font-medium bg-[#F4EFE6] text-stone-800 border border-stone-300 hover:bg-[#e8e0d2] transition-colors cursor-pointer"
                >
                  Weitere Bewertungen anzeigen ({reviews.length - visibleCount} weitere)
                </button>
              </div>
            )}

            {/* Optional: Weniger anzeigen when expanded */}
            {!hasMoreReviews && reviews.length > INITIAL_VISIBLE_REVIEWS && (
              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={() => {
                    setVisibleCount(INITIAL_VISIBLE_REVIEWS);
                    const el = document.getElementById('kundenbewertungen');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-5 py-2 rounded-full text-xs font-medium text-stone-600 bg-stone-100 hover:bg-stone-200 border border-stone-200 transition-colors cursor-pointer"
                >
                  Weniger anzeigen
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Centered Review Modal Dialog */}
      {isFormOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="review-modal-title"
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsFormOpen(false);
            }
          }}
        >
          <div className="max-w-lg w-full rounded-2xl bg-[#FAF8F5] border border-stone-200 p-6 sm:p-8 shadow-xl relative max-h-[90vh] overflow-y-auto space-y-6">
            {/* Modal Header */}
            <div className="border-b border-stone-200/80 pb-4 pr-10 space-y-1">
              <span className="text-xs font-bold tracking-wider text-rose-700 uppercase">
                Deine Meinung zählt
              </span>
              <h3 id="review-modal-title" className="text-xl sm:text-2xl font-black text-stone-900">
                Bewertung schreiben
              </h3>
              <p className="text-xs sm:text-sm text-stone-600">
                Erfahrung für &ldquo;{productName}&rdquo; teilen.
              </p>
            </div>

            {/* Close Button X */}
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-stone-400 hover:text-stone-800 hover:bg-stone-200/60 transition cursor-pointer"
              aria-label="Modal schliessen"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Error Message */}
            {errorMessage && (
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Success Message */}
            {successMessage ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-3 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 text-emerald-700 font-extrabold text-base">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Bewertung erfolgreich übermittelt!</span>
                </div>
                <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed">
                  {successMessage}
                </p>
                <p className="text-xs text-stone-500 italic">
                  Dieses Fenster schliesst sich in Kürze automatisch...
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* 1. Rating Stars Picker */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-800">
                    Deine Gesamtnote <span className="text-rose-600">*</span>
                  </label>
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-1.5" onMouseLeave={() => setHoverRating(null)}>
                      {[1, 2, 3, 4, 5].map((starVal) => {
                        const activeVal = hoverRating !== null ? hoverRating : rating;
                        const isFilled = activeVal >= starVal;
                        return (
                          <button
                            key={starVal}
                            type="button"
                            onClick={() => setRating(starVal)}
                            onMouseEnter={() => setHoverRating(starVal)}
                            className="p-1 rounded-lg hover:scale-110 transition-transform cursor-pointer focus:outline-none focus:ring-2 focus:ring-rose-500"
                            aria-label={`${starVal} Sterne`}
                          >
                            <Star
                              className={`w-7 h-7 sm:w-8 sm:h-8 transition-colors ${
                                isFilled
                                  ? 'text-amber-400 fill-amber-400'
                                  : 'text-stone-300 fill-stone-100 hover:text-amber-300'
                              }`}
                            />
                          </button>
                        );
                      })}
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-stone-700 bg-white px-3 py-1 rounded-full border border-stone-200">
                      {RATING_LABELS[hoverRating !== null ? hoverRating : rating]}
                    </span>
                  </div>
                </div>

                {/* 2. Verification Block: Order Number & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div className="space-y-1.5">
                    <label htmlFor="modal-order-number" className="block text-xs font-bold uppercase tracking-wider text-stone-800">
                      Bestellnummer <span className="text-rose-600">*</span>
                    </label>
                    <input
                      id="modal-order-number"
                      type="text"
                      required
                      value={orderNumber}
                      onChange={(e) => setOrderNumber(e.target.value)}
                      placeholder="z. B. 1111"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stone-200 focus:border-stone-900 focus:ring-1 focus:ring-stone-900 text-sm font-medium text-stone-900 transition outline-none"
                    />
                    <p className="text-[11px] text-stone-500">
                      Aus der Bestellbestätigung per E-Mail (z. B. 1111).
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="modal-email" className="block text-xs font-bold uppercase tracking-wider text-stone-800">
                      E-Mail-Adresse <span className="text-rose-600">*</span>
                    </label>
                    <input
                      id="modal-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@beispiel.ch"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stone-200 focus:border-stone-900 focus:ring-1 focus:ring-stone-900 text-sm font-medium text-stone-900 transition outline-none"
                    />
                    <p className="text-[11px] text-stone-500">
                      Wird nicht öffentlich angezeigt.
                    </p>
                  </div>
                </div>

                {/* 3. Author Name & Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="modal-author-name" className="block text-xs font-bold uppercase tracking-wider text-stone-800">
                      Dein Name <span className="text-rose-600">*</span>
                    </label>
                    <input
                      id="modal-author-name"
                      type="text"
                      required
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      placeholder="z. B. Anna K."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stone-200 focus:border-stone-900 focus:ring-1 focus:ring-stone-900 text-sm font-medium text-stone-900 transition outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="modal-author-location" className="block text-xs font-bold uppercase tracking-wider text-stone-800">
                      Ort (optional)
                    </label>
                    <input
                      id="modal-author-location"
                      type="text"
                      value={authorLocation}
                      onChange={(e) => setAuthorLocation(e.target.value)}
                      placeholder="z. B. Bern oder Zürich"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stone-200 focus:border-stone-900 focus:ring-1 focus:ring-stone-900 text-sm font-medium text-stone-900 transition outline-none"
                    />
                  </div>
                </div>

                {/* 4. Quick Usage Chips */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-800">
                    Wofür verwendest du das Produkt? (optional)
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {USAGE_PRESETS.map((preset) => {
                      const isSelected = usageTag === preset;
                      return (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => setUsageTag(isSelected ? '' : preset)}
                          className={`px-3 py-1 rounded-full text-xs font-semibold border transition cursor-pointer ${
                            isSelected
                              ? 'bg-stone-900 text-white border-stone-900 shadow-2xs'
                              : 'bg-white hover:bg-stone-100 text-stone-800 border-stone-200'
                          }`}
                        >
                          {preset}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 5. Comment Textarea */}
                <div className="space-y-1.5">
                  <label htmlFor="modal-comment" className="block text-xs font-bold uppercase tracking-wider text-stone-800">
                    Deine Bewertung <span className="text-rose-600">*</span>
                  </label>
                  <textarea
                    id="modal-comment"
                    required
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Wie schmeckt dir die Frucht? Wie ist der Crunch und das Aroma im Vergleich zu frischen Früchten?"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stone-200 focus:border-stone-900 focus:ring-1 focus:ring-stone-900 text-sm font-medium text-stone-900 transition outline-none leading-relaxed"
                  />
                </div>

                {/* 6. Honeypot Field */}
                <div className="hidden absolute opacity-0 pointer-events-none -z-50" aria-hidden="true">
                  <label htmlFor="modal_website_url">Website URL</label>
                  <input
                    id="modal_website_url"
                    type="text"
                    name="website_url"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {/* 7. Modal Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-stone-200/80">
                  <p className="text-[11px] text-stone-500">
                    <span className="text-rose-600 font-bold">*</span> Pflichtfelder für den echten Käuferschutz.
                  </p>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => setIsFormOpen(false)}
                      className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs transition cursor-pointer"
                    >
                      Abbrechen
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-extrabold text-xs shadow-xs transition active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {isSubmitting ? 'Wird überprüft...' : 'Bewertung absenden'}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
