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
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  const progressPercent = Math.min(
    100,
    (subtotal / freeShippingThreshold) * 100
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="fixed inset-0 bg-stone-950/40 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white text-stone-900 shadow-2xl flex flex-col border-l border-stone-200 animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-6 border-b border-stone-100 flex items-center justify-between">
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
              className="p-2 rounded-xl text-stone-400 hover:text-stone-900 hover:bg-stone-100 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="px-6 py-3.5 bg-stone-50 border-b border-stone-100">
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
                  Kostenloser Schweizer Post Versand freigeschaltet!
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
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
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
                    Entdecken Sie unsere 100% naturbelassenen Schweizer Beeren und Früchte.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeCart}
                  className="mt-2 px-6 py-2.5 rounded-2xl text-xs font-bold bg-stone-900 text-white hover:bg-stone-800 transition shadow-2xs"
                >
                  Jetzt Früchte entdecken
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.variantId}
                  className="flex gap-4 p-3.5 rounded-2xl border border-stone-200/80 bg-stone-50/60"
                >
                  {/* Thumbnail */}
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-white shrink-0 border border-stone-200">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-stone-400 text-xs">
                        Bild
                      </div>
                    )}
                  </div>

                  {/* Info & Quantity Stepper */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h4 className="text-sm font-bold text-stone-900 truncate">
                          {item.name}
                        </h4>
                        <p className="text-xs text-stone-500">
                          {item.label || `${item.weight_grams}g`}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.variantId)}
                        aria-label="Artikel entfernen"
                        className="text-stone-400 hover:text-red-600 transition p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity Stepper */}
                      <div className="flex items-center rounded-xl border border-stone-200 bg-white">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.variantId, item.quantity - 1)
                          }
                          aria-label="Menge verringern"
                          className="w-7 h-7 flex items-center justify-center text-stone-500 hover:text-stone-900"
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
                          className="w-7 h-7 flex items-center justify-center text-stone-500 hover:text-stone-900"
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
            <div className="p-6 border-t border-stone-100 bg-white space-y-4">
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
