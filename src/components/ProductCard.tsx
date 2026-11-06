'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getProductDisplayOrigin } from '@/lib/productOrigins';
import { getProductDisplayImage } from '@/lib/utils';

export interface ProductVariant {
  id: string;
  weight_grams?: number;
  label_de?: string;
  title?: string;
  form_de?: string;
  form?: string;
  price_chf: number;
  compare_at_price_chf?: number | null;
  sku?: string;
  stock_quantity?: number;
  image_url?: string | null;
  images?: string[] | null;
}

export interface ProductItem {
  id: string;
  slug: string;
  name?: string;
  name_de: string;
  subtitle_de?: string;
  description_de?: string;
  origin_country?: string;
  images?: string[];
  image_url?: string | null;
  price_chf?: number | null;
  is_featured?: boolean;
  category?: string;
  form?: string;
  variants?: ProductVariant[];
  product_variants?: ProductVariant[];
}

export interface ProductCardProps {
  product: ProductItem;
  className?: string;
}

export default function ProductCard({ product, className = '' }: ProductCardProps) {
  const variants = product.variants || product.product_variants || [];
  const prices = variants
    .map((v) => Number(v.price_chf))
    .filter((p) => !isNaN(p) && p > 0);
  const minPrice =
    prices.length > 0
      ? Math.min(...prices)
      : product.price_chf && !isNaN(Number(product.price_chf))
      ? Number(product.price_chf)
      : 9.9;

  const displayImage = getProductDisplayImage(product);

  // Available pack sizes
  const weights = Array.from(
    new Set(
      variants
        .map((v) => v.weight_grams)
        .filter((w): w is number => Boolean(w))
    )
  ).sort((a, b) => a - b);

  const packSizesText =
    weights.length > 0 ? weights.map((w) => `${w}g`).join(' & ') : '100g & 200g';

  const { country: displayCountry, flag: displayFlag } = getProductDisplayOrigin(product);

  // Determine variant & form for target link
  const cardForm = product.form || variants[0]?.form || variants[0]?.form_de;
  const cardVariant =
    variants.find(
      (v) =>
        cardForm &&
        (v.form || v.form_de)?.toLowerCase() === cardForm.toLowerCase()
    ) || variants[0];

  const queryParams = new URLSearchParams();
  if (cardForm) {
    queryParams.set('form', cardForm);
  }
  if (cardVariant?.id) {
    queryParams.set('variant', cardVariant.id);
  }
  const queryString = queryParams.toString();
  const productHref = queryString
    ? `/produkte/${product.slug}?${queryString}`
    : `/produkte/${product.slug}`;

  return (
    <Link
      href={productHref}
      className={`group flex flex-col bg-white border border-stone-200/90 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xs hover:shadow-md hover:border-stone-300 transition-all duration-300 h-full ${className}`}
    >
      {/* Image Container with Smooth Zoom */}
      <div className="relative aspect-square w-full overflow-hidden bg-stone-100">
        <Image
          src={displayImage}
          alt={product.name_de || product.name || 'Produkt'}
          fill
          unoptimized
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 flex flex-wrap items-center gap-1 sm:gap-1.5 pointer-events-none">
          <span className="inline-flex items-center justify-center gap-1 h-5 px-2 rounded-full text-[10px] font-bold leading-none bg-white/95 text-stone-800 backdrop-blur-md border border-stone-200/80 shadow-2xs">
            <span className="leading-none">{displayFlag}</span>
            <span className="leading-none">{displayCountry}</span>
          </span>
          {(cardForm || product.form) && (cardForm || product.form) !== 'Mix' && (cardForm || product.form) !== 'Box' && (
            <span className="inline-flex items-center justify-center h-5 px-2 rounded-full text-[10px] font-semibold leading-none bg-stone-900/90 text-white backdrop-blur-md shadow-2xs">
              <span className="leading-none">{cardForm || product.form}</span>
            </span>
          )}
          {product.is_featured && (
            <span className="inline-flex items-center justify-center h-5 px-2 rounded-full text-[10px] font-extrabold leading-none bg-rose-700 text-white shadow-2xs">
              <span className="leading-none">Bestseller</span>
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-3.5 sm:p-5 flex flex-col justify-between h-full space-y-3 sm:space-y-4">
        <div className="space-y-1 sm:space-y-1.5">
          <span className="text-[10px] sm:text-[11px] font-bold text-emerald-700 uppercase tracking-wider block">
            100% Natur
          </span>
          <h3 className="text-sm sm:text-base md:text-lg font-semibold text-stone-900 leading-snug line-clamp-2 min-h-[2.5rem] sm:min-h-[2.75rem] md:min-h-[3rem] group-hover:text-rose-700 transition">
            {product.name_de}
          </h3>
          <p className="text-xs sm:text-sm text-stone-700 line-clamp-2 min-h-[2rem] sm:min-h-[2.5rem] leading-relaxed">
            {product.subtitle_de || product.description_de || 'Schonend gefriergetrocknete Schweizer Früchte.'}
          </p>
        </div>

        <div className="pt-2.5 sm:pt-3 border-t border-stone-100 space-y-2 sm:space-y-3 mt-auto">
          {/* Sizes and Price */}
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm text-stone-700 font-medium truncate">
              {packSizesText}
            </span>
            <div className="flex items-baseline gap-1 sm:gap-1.5 mt-0.5">
              <span className="text-sm sm:text-base font-bold text-stone-900 font-sans">
                Ab CHF {minPrice.toFixed(2)}
              </span>
              <span className="text-[9px] sm:text-[10px] text-stone-500 font-medium">
                (inkl. 2.6% MwSt.)
              </span>
            </div>
          </div>

          {/* View Details Button */}
          <div className="w-full h-8 sm:h-10 rounded-xl sm:rounded-2xl bg-stone-50 group-hover:bg-stone-900 group-hover:text-white border border-stone-200/80 group-hover:border-stone-900 font-bold text-[11px] sm:text-xs text-stone-800 flex items-center justify-center gap-1.5 transition-all duration-200">
            <span>Details ansehen</span>
            <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}
