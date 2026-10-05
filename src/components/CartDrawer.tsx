'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Truck,
  CheckCircle2,
} from 'lucide-react';

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeItem,
    subtotal,
    shipping,
    total,
    vatIncluded,
    freeShippingThreshold,
    amountUntilFreeShipping,
  } = useCart();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartOpen) {
        closeCart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, closeCart]);

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen]);

  const progressPercent = Math.min(
    100,
    (subtotal / freeShippingThreshold) * 100
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Warenkorb"
      className={`fixed inset-0 z-50 overflow-hidden font-sans transition-all duration-300 ${
        isCartOpen ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
      }`}
    >
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isCartOpen ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      />

      {/* Drawer Container pinned to right */}
      <div
        className={`fixed inset-y-0 right-0 z-50 flex max-w-full pl-6 sm:pl-10 transition-transform duration-300 ease-in-out ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Inner Panel */}
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full border-l border-stone-200 overflow-hidden">
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-stone-100 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-stone-900" />
              <h2 className="text-lg font-black tracking-tight text-stone-900">
                Warenkorb
              </h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-stone-100 font-mono font-bold text-stone-700">
                {items.reduce((sum, i) => sum + i.quantity, 0)}
              </span>
            </div>
            <button
              type="button"
              onClick={closeCart}
              aria-label="Warenkorb schliessen"
              className="p-2 rounded-xl text-stone-400 hover:text-stone-900 hover:bg-stone-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="px-5 sm:px-6 py-3.5 bg-stone-50 border-b border-stone-100 shrink-0">
            <div className="flex items-center gap-2 text-xs font-medium mb-1.5">
              <Truck className="w-4 h-4 text-emerald-700 shrink-0" />
              {amountUntilFreeShipping > 0 ? (
                <span className="text-stone-600">
                  Noch{' '}
                  <strong className="text-stone-900 font-bold">
                    CHF {amountUntilFreeShipping.toFixed(2)}
                  </strong>{' '}
                  bis zum kostenlosen Versand!
                </span>
              ) : (
                <span className="text-emerald-800 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Gratis Versand erreicht! 🎉
                </span>
              )}
            </div>
            <div className="w-full bg-stone-200 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                  <ShoppingBag className="w-8 h-8 stroke-1" />
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-stone-900 text-base">
                    Ihr Warenkorb ist leer
                  </p>
                  <p className="text-xs text-stone-500 max-w-xs">
                    Entdecken Sie unsere knusprigen gefriergetrockneten Früchte und Beeren.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeCart}
                  className="px-5 py-2.5 rounded-xl bg-stone-900 text-white text-xs font-bold hover:bg-stone-800 transition"
                >
                  Jetzt stöbern
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.variantId}
                  className="flex gap-4 p-3.5 rounded-2xl bg-stone-50 border border-stone-200/60"
                >
                  {/* Thumbnail */}
                  <div className="w-18 h-18 rounded-xl bg-white border border-stone-200/80 overflow-hidden shrink-0 relative">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="72px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-stone-300">
                        <ShoppingBag className="w-6 h-6 stroke-1" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-bold text-sm text-stone-900 truncate leading-snug">
                          {item.name}
                        </h3>
                        <button
                          type="button"
                          onClick={() => removeItem(item.variantId)}
                          aria-label={`${item.name} entfernen`}
                          className="text-stone-400 hover:text-rose-600 transition p-0.5"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        {item.label && (
                          <span className="text-[11px] text-stone-500 font-medium">
                            {item.label}
                          </span>
                        )}
                        {item.weight_grams && (
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-stone-200/60 text-stone-600 font-semibold">
                            {item.weight_grams}g
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity Stepper */}
                      <div className="flex items-center rounded-lg border border-stone-200 bg-white">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.variantId, item.quantity - 1)
                          }
                          aria-label="Menge verringern"
                          className="w-7 h-7 flex items-center justify-center text-stone-500 hover:text-stone-900 transition"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center font-mono text-xs font-bold text-stone-900 select-none">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.variantId, item.quantity + 1)
                          }
                          aria-label="Menge erhöhen"
                          className="w-7 h-7 flex items-center justify-center text-stone-500 hover:text-stone-900 transition"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Price */}
                      <span className="font-mono font-bold text-sm text-stone-900">
                        CHF {(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout CTA */}
          {items.length > 0 && (
            <div className="p-5 sm:p-6 pb-6 sm:pb-8 border-t border-stone-100 bg-white space-y-4 shrink-0">
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>Zwischensumme</span>
                  <span className="font-mono font-bold text-stone-900">
                    CHF {subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Schweizer Post Versand</span>
                  <span className="font-mono font-bold text-stone-900">
                    {shipping === 0 ? (
                      <span className="text-emerald-700 font-bold">
                        Kostenlos
                      </span>
                    ) : (
                      `CHF ${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-stone-400 text-[11px]">
                  <span>Darin enthaltene 2.6% MwSt.</span>
                  <span className="font-mono">
                    CHF {vatIncluded.toFixed(2)}
                  </span>
                </div>
                <div className="pt-2 border-t border-stone-100 flex justify-between text-base font-extrabold text-stone-900">
                  <span>Gesamtsumme</span>
                  <span className="font-mono font-black">CHF {total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <Link
                href="/checkout"
                onClick={closeCart}
                className="w-full h-13 rounded-2xl bg-stone-900 text-white hover:bg-stone-800 active:scale-[0.98] font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition"
              >
                <span>Zur Kasse</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <p className="text-center text-[11px] text-stone-400">
                Sichere Schweizer Bezahlung mit TWINT, Karte oder QR-Rechnung.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
