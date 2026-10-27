'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import ProductCard, { type ProductItem } from '@/components/ProductCard';

interface SuggestedProductsProps {
  currentSlug: string;
  allProducts: ProductItem[];
}

export default function SuggestedProducts({
  currentSlug,
  allProducts,
}: SuggestedProductsProps) {
  // Exclude current product from suggested pool
  const others = useMemo(() => {
    return allProducts.filter((p) => p.slug !== currentSlug);
  }, [allProducts, currentSlug]);

  // Deterministic initial slice of 5 to guarantee SSR matches client initial render (prevents hydration mismatch)
  const [suggestedProducts, setSuggestedProducts] = useState<ProductItem[]>(() => {
    return others.slice(0, 5);
  });

  // Client-side Fisher-Yates random shuffle on mount or when product slug changes
  useEffect(() => {
    if (others.length <= 1) return;
    const shuffled = [...others];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = shuffled[i];
      shuffled[i] = shuffled[j];
      shuffled[j] = temp;
    }
    setSuggestedProducts(shuffled.slice(0, 5));
  }, [others]);

  if (suggestedProducts.length === 0) {
    return null;
  }

  return (
    <section className="pt-16 border-t border-stone-200">
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="text-xs font-extrabold tracking-widest uppercase text-stone-400">
            Empfehlungen
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-stone-900 mt-1">
            Das könnte dir auch gefallen
          </h2>
        </div>
        <Link
          href="/shop"
          className="text-sm font-semibold text-rose-700 hover:text-rose-800 transition flex items-center gap-1 group"
        >
          <span>Alle ansehen</span>
          <span className="group-hover:translate-x-0.5 transition-transform">→</span>
        </Link>
      </div>

      {/* Responsive Grid: 2 columns on mobile, 3 on tablet, 5 on desktop */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-5">
        {suggestedProducts.map((product, index) => {
          // Dynamic visibility according to index:
          // index 0 and 1: always visible (mobile, tablet, desktop)
          // index 2: hidden on mobile, visible from tablet up (hidden md:block)
          // index 3 and 4: hidden on mobile and tablet, visible on desktop (hidden lg:block)
          let visibilityClass = 'block';
          if (index === 2) visibilityClass = 'hidden md:block';
          if (index >= 3) visibilityClass = 'hidden lg:block';

          return (
            <div key={product.id || product.slug} className={`${visibilityClass} h-full`}>
              <ProductCard product={product} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
