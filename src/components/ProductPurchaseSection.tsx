'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import {
  ShoppingBag,
  Minus,
  Plus,
  Truck,
  Check,
  Leaf,
  Lock,
  AlertCircle,
  Scale,
  Sparkles,
} from 'lucide-react';

export interface ProductVariant {
  id: string;
  product_id?: string;
  weight_grams?: number;
  label_de?: string;
  form_de?: string;
  price_chf: number;
  compare_at_price_chf?: number | null;
  sku?: string;
  stock_quantity?: number;
}

export interface FormLink {
  form: string;
  label: string;
  href: string;
  isActive: boolean;
}

interface ProductPurchaseSectionProps {
  variants: ProductVariant[];
  productName?: string;
  productId?: string;
  image?: string;
  availableForms?: FormLink[];
}

export default function ProductPurchaseSection({
  variants,
  productName,
  productId,
  image,
  availableForms = [],
}: ProductPurchaseSectionProps) {
  const { addItem, openCart } = useCart();

  // Selected Variant State
  const [selectedVariantId, setSelectedVariantId] = useState<string>(() => {
    const inStock = variants.find((v) => (v.stock_quantity ?? 0) > 0);
    return inStock?.id || variants[0]?.id || '';
  });

  // Sync selected variant when variants prop changes
  useEffect(() => {
    if (!variants.some((v) => v.id === selectedVariantId)) {
      const inStock = variants.find((v) => (v.stock_quantity ?? 0) > 0);
      setSelectedVariantId(inStock?.id || variants[0]?.id || '');
    }
  }, [variants, selectedVariantId]);

  const [quantity, setQuantity] = useState<number>(1);
  const [isAdded, setIsAdded] = useState<boolean>(false);

  // Ref and state for the mobile sticky add-to-cart bar
  const mainCtaRef = useRef<HTMLDivElement>(null);
  const [showStickyBar, setShowStickyBar] = useState<boolean>(false);

  useEffect(() => {
    const el = mainCtaRef.current;
    if (!el) return;

    const checkVisibility = () => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setShowStickyBar(rect.bottom < 80);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isPast = !entry.isIntersecting && entry.boundingClientRect.top < 0;
        setShowStickyBar(isPast);
      },
      { root: null, threshold: 0 }
    );

    observer.observe(el);
    window.addEventListener('scroll', checkVisibility, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', checkVisibility);
    };
  }, []);

  // Current active variant
  const currentVariant =
    variants.find((v) => v.id === selectedVariantId) || variants[0];

  // Dynamic Fresh Fruit Calculator ("Frische-Frucht-Rechner")
  // Ratio 1:10 (Liofilisation removes ~90% water)
  const weightGrams =
    currentVariant?.weight_grams ||
    (currentVariant?.label_de
      ? parseInt(currentVariant.label_de.match(/(\d+)\s*g/i)?.[1] || '0', 10)
      : 0);

  const formatFreshAmount = (grams: number) => {
    const freshGrams = grams * 10;
    if (freshGrams >= 1000) {
      const kg = freshGrams / 1000;
      return `${kg.toFixed(1)} kg`;
    }
    return `${freshGrams}g`;
  };

  const variantSummary =
    currentVariant?.label_de ||
    (currentVariant?.weight_grams ? `${currentVariant.weight_grams}g` : 'Standard');

  const handleDecrement = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleIncrement = () => {
    const maxStock = currentVariant?.stock_quantity ?? 99;
    setQuantity((prev) => Math.min(maxStock, prev + 1));
  };

  const isOutOfStock = (currentVariant?.stock_quantity ?? 0) <= 0;

  const handleAddToCart = () => {
    if (!currentVariant || isOutOfStock) return;

    const baseName = productName || 'Gefriergetrocknete Früchte';

    addItem({
      productId: currentVariant.product_id || productId || 'fruit-prod',
      variantId: currentVariant.id,
      name: baseName,
      label:
        currentVariant.label_de ||
        (currentVariant.weight_grams ? `${currentVariant.weight_grams}g` : 'Standard'),
      weight_grams: currentVariant.weight_grams,
      price: Number(currentVariant.price_chf),
      quantity,
      image,
      sku: currentVariant.sku,
    });

    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1500);

    openCart();
  };

  if (!variants || variants.length === 0) {
    return (
      <div className="p-6 rounded-3xl border border-stone-200 bg-white text-stone-500 text-sm">
        Derzeit sind keine Varianten für dieses Produkt verfügbar.
      </div>
    );
  }

  const unitPrice = Number(currentVariant?.price_chf || 0);
  const totalPrice = unitPrice * quantity;
  const pricePer100g =
    currentVariant?.weight_grams && currentVariant.weight_grams > 0
      ? ((unitPrice / currentVariant.weight_grams) * 100).toFixed(2)
      : null;

  return (
    <>
      <div className="bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-7">
      {/* Price Header */}
      <div className="space-y-1.5 pb-4 border-b border-stone-100">
        <div className="flex items-baseline justify-between gap-4">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 font-sans">
              CHF {totalPrice.toFixed(2)}
            </span>
            <span className="text-xs font-medium text-stone-500">
              (inkl. 2.6% MwSt.)
            </span>
          </div>
          {pricePer100g && (
            <span className="text-xs font-mono font-medium text-stone-500 bg-stone-100 px-2.5 py-1 rounded-full">
              CHF {pricePer100g} / 100g
            </span>
          )}
        </div>
        <p className="text-xs text-stone-500">
          Kostenloser Versand mit Schweizer Post ab CHF 60.– Bestellwert.
        </p>
      </div>

      {/* Swiss Trust Badges below price */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
        <div className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-stone-50 border border-stone-200/60">
          <span className="text-lg leading-none shrink-0">🇨🇭</span>
          <div className="min-w-0">
            <p className="text-xs font-bold text-stone-900 truncate">
              Schweizer Kleinunternehmen
            </p>
            <p className="text-[10px] text-stone-500 truncate">
              Regional & mit Herz geführt
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-stone-50 border border-stone-200/60">
          <div className="w-6 h-6 rounded-lg bg-red-100 text-red-600 flex items-center justify-center shrink-0">
            <Truck className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-stone-900 truncate">
              Versand per Schweizer Post
            </p>
            <p className="text-[10px] text-stone-500 truncate">
              A-Post / B-Post klimaneutral
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/60">
          <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <Leaf className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-emerald-950 truncate">
              100% Frucht – Ohne Zuckerzusatz
            </p>
            <p className="text-[10px] text-emerald-700 truncate">
              Rein natürlich & 100% vegan
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-stone-50 border border-stone-200/60">
          <div className="w-6 h-6 rounded-lg bg-stone-200 text-stone-700 flex items-center justify-center shrink-0">
            <Lock className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-stone-900 truncate">
              Sichere Bezahlung
            </p>
            <p className="text-[10px] text-stone-500 truncate">
              TWINT, Karte & QR-Rechnung
            </p>
          </div>
        </div>
      </div>

      {/* Forms & Size Selection */}
      <div className="space-y-6 pt-2">
        {/* Cross-linking block: "Form / Konsistenz" */}
        {availableForms && availableForms.length > 1 && (
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs font-semibold tracking-wider uppercase text-stone-500">
              <span className="text-stone-900 font-bold">Form / Konsistenz:</span>
              <span className="text-rose-600 font-bold normal-case">
                {availableForms.find((f) => f.isActive)?.label || ''}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {availableForms.map((item) => {
                if (item.isActive) {
                  return (
                    <span
                      key={item.form}
                      className="px-4 py-2.5 rounded-2xl bg-stone-900 text-white font-medium text-sm shadow-xs select-none inline-flex items-center cursor-default"
                    >
                      {item.label}
                    </span>
                  );
                }
                return (
                  <Link
                    key={item.form}
                    href={item.href}
                    className="px-4 py-2.5 rounded-2xl border border-stone-200 bg-white text-stone-700 hover:border-stone-900 hover:text-stone-900 hover:bg-stone-50 font-medium text-sm transition-all duration-200 inline-flex items-center cursor-pointer"
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Size / Weight Selection: "Grösse / Packung" */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-xs font-semibold tracking-wider uppercase text-stone-500">
            <span className="text-stone-900 font-bold">Grösse / Packung:</span>
            <span className="text-stone-700 font-medium normal-case">
              {currentVariant?.label_de || (currentVariant?.weight_grams ? `${currentVariant.weight_grams}g` : '')}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {variants
              .filter((v) => v.weight_grams === 100 || v.weight_grams === 200 || !v.weight_grams)
              .sort((a, b) => (a.weight_grams || 0) - (b.weight_grams || 0))
              .map((v) => {
              const isSelected = v.id === currentVariant?.id;
              const isVariantOutOfStock = (v.stock_quantity ?? 0) <= 0;
              const weightLabel = v.label_de || (v.weight_grams ? `${v.weight_grams}g` : 'Standard');

              return (
                <button
                  key={v.id}
                  type="button"
                  disabled={isVariantOutOfStock}
                  onClick={() => {
                    setSelectedVariantId(v.id);
                    setQuantity(1);
                  }}
                  className={`relative flex flex-col p-4 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? 'border-stone-900 bg-stone-50/80 text-stone-900 ring-2 ring-stone-900 shadow-2xs'
                      : 'border-stone-200 bg-white text-stone-800 hover:border-stone-300 hover:bg-stone-50/50'
                  } ${
                    isVariantOutOfStock
                      ? 'opacity-40 cursor-not-allowed bg-stone-100 border-stone-200'
                      : 'cursor-pointer'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-sm text-stone-900">
                      {weightLabel}
                    </span>
                    {isSelected && !isVariantOutOfStock && (
                      <span className="w-2.5 h-2.5 rounded-full bg-stone-900" />
                    )}
                  </div>

                  <div className="flex items-baseline justify-between mt-1.5">
                    <span
                      className={`text-xs font-semibold ${
                        isSelected ? 'text-stone-900 font-bold' : 'text-stone-600'
                      }`}
                    >
                      CHF {Number(v.price_chf).toFixed(2)}
                    </span>
                    {isVariantOutOfStock && (
                      <span className="text-[10px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded-md">
                        Ausverkauft
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Fresh Fruit Calculator ("Frische-Frucht-Rechner") */}
      {weightGrams > 0 && (
        <div className="bg-amber-50/60 border border-amber-200/60 rounded-2xl p-4 my-4 space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <Scale className="w-3.5 h-3.5 stroke-[2.2]" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-900">
              Die Kraft von frischen Früchten
            </span>
          </div>
          <p className="text-sm font-medium text-amber-950 leading-snug">
            Für diesen <strong className="font-extrabold text-amber-900">{weightGrams}g</strong> Beutel wurden ca.{' '}
            <strong className="font-extrabold text-amber-900 underline decoration-amber-400 decoration-2 underline-offset-2">
              {formatFreshAmount(weightGrams)}
            </strong>{' '}
            erntefrische Früchte schonend gefriergetrocknet.
          </p>
          <p className="text-[11px] text-amber-800/85 flex items-center gap-1.5 pt-0.5">
            <Sparkles className="w-3 h-3 text-amber-600 shrink-0" />
            <span>Bis zu 95% der Vitamine und das volle Naturaroma bleiben erhalten.</span>
          </p>
        </div>
      )}

      {/* Stock Availability indicator */}
      <div className="pt-1">
        {isOutOfStock ? (
          <div className="flex items-center gap-2 text-xs font-semibold text-red-800 bg-red-50 border border-red-200/80 px-3.5 py-2.5 rounded-2xl">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>Derzeit ausverkauft – Bald wieder verfügbar</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-3.5 py-2.5 rounded-2xl">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse shrink-0" />
            <span>
              Auf Lager ({currentVariant?.stock_quantity ?? 'Mehrere'} Stk.) –
              Sofort lieferbar (1–2 Werktage)
            </span>
          </div>
        )}
      </div>

      {/* Quantity & In den Warenkorb Button */}
      <div ref={mainCtaRef} className="space-y-3 pt-1">
        <div className="flex items-center gap-3">
          {/* Quantity stepper */}
          <div className="flex items-center rounded-2xl border border-stone-200 bg-stone-50 p-1 shrink-0">
            <button
              type="button"
              onClick={handleDecrement}
              disabled={quantity <= 1 || isOutOfStock}
              aria-label="Menge verringern"
              className="w-10 h-10 flex items-center justify-center rounded-xl text-stone-600 hover:bg-white transition disabled:opacity-30 disabled:pointer-events-none"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-10 text-center font-mono font-bold text-sm text-stone-900 select-none">
              {quantity}
            </span>
            <button
              type="button"
              onClick={handleIncrement}
              disabled={
                quantity >= (currentVariant?.stock_quantity ?? 99) || isOutOfStock
              }
              aria-label="Menge erhöhen"
              className="w-10 h-10 flex items-center justify-center rounded-xl text-stone-600 hover:bg-white transition disabled:opacity-30 disabled:pointer-events-none"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Cart CTA */}
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`flex-1 h-13 px-6 rounded-2xl font-bold text-sm flex items-center justify-center gap-2.5 shadow-sm transition-all duration-200 ${
              isOutOfStock
                ? 'bg-stone-200 text-stone-400 cursor-not-allowed shadow-none'
                : isAdded
                ? 'bg-emerald-700 text-white'
                : 'bg-rose-600 text-white hover:bg-rose-700 active:scale-[0.98]'
            }`}
          >
            {isOutOfStock ? (
              <span>Ausverkauft</span>
            ) : isAdded ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>In den Warenkorb gelegt!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>In den Warenkorb • CHF {totalPrice.toFixed(2)}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>

    {/* Mobile Sticky Add-to-Cart Bar */}
    <div
      className={`md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 p-3 shadow-lg transition-transform duration-300 ${
        showStickyBar ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{
        paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))',
      }}
    >
      <div className="flex items-center justify-between gap-3 max-w-[1600px] mx-auto">
        {/* Left Side: Thumbnail, Title in 1 line, Variant and Price */}
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-stone-100 border border-stone-200/80 shrink-0">
            <Image
              src={image || '/logo.webp'}
              alt={productName || 'Produkt'}
              fill
              unoptimized
              sizes="44px"
              className="object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate font-medium text-sm text-stone-900 leading-tight">
              {productName}
            </p>
            <p className="text-xs text-stone-500 font-semibold truncate mt-0.5">
              {variantSummary} – CHF {unitPrice.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Right Side: Compact CTA */}
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={`h-11 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all duration-200 shrink-0 cursor-pointer ${
            isOutOfStock
              ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
              : isAdded
              ? 'bg-emerald-700 text-white'
              : 'bg-rose-600 hover:bg-rose-700 text-white active:scale-95'
          }`}
        >
          {isOutOfStock ? (
            <span>Ausverkauft</span>
          ) : isAdded ? (
            <>
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              <span>Im Warenkorb!</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>In den Warenkorb</span>
            </>
          )}
        </button>
      </div>
    </div>
  </>
  );
}
