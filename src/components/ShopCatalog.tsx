'use client';

import React, { useState, useEffect, useMemo, useTransition } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import {
  ArrowRight,
  ArrowUpDown,
  RotateCcw,
  Sparkles,
  PackageSearch,
} from 'lucide-react';
import { expandProductsForCatalog } from '@/lib/productForms';
import { SHOP_NAV_TABS, getCategoryConfig } from '@/lib/categoryConfig';

export interface ProductVariant {
  id: string;
  weight_grams?: number;
  label_de?: string;
  form_de?: string;
  price_chf: number;
  compare_at_price_chf?: number | null;
  sku?: string;
  stock_quantity?: number;
}

export interface ProductItem {
  id: string;
  slug: string;
  name_de: string;
  subtitle_de?: string;
  description_de?: string;
  origin_country?: string;
  images?: string[];
  is_featured?: boolean;
  category?: string;
  form?: string;
  product_variants?: ProductVariant[];
}

const SORT_OPTIONS = [
  { id: 'bestseller', label: 'Bestseller' },
  { id: 'price_asc', label: 'Preis aufsteigend' },
  { id: 'price_desc', label: 'Preis absteigend' },
];

export interface ShopCatalogProps {
  products: ProductItem[];
  activeCategorySlug?: string;
}

export default function ShopCatalog({
  products,
  activeCategorySlug,
}: ShopCatalogProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const currentCategorySlug = activeCategorySlug || 'all';

  const initialSort = useMemo(() => {
    const raw = searchParams.get('sort')?.toLowerCase() || 'bestseller';
    if (SORT_OPTIONS.some((s) => s.id === raw)) return raw;
    return 'bestseller';
  }, [searchParams]);

  const searchQuery = searchParams.get('q')?.trim() || '';
  const [selectedSort, setSelectedSort] = useState(initialSort);

  useEffect(() => {
    setSelectedSort(initialSort);
  }, [initialSort]);

  const updateSortParams = (newSort: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newSort === 'bestseller') {
      params.delete('sort');
    } else {
      params.set('sort', newSort);
    }
    const queryString = params.toString();
    startTransition(() => {
      router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
        scroll: false,
      });
    });
  };

  const handleSortChange = (sortId: string) => {
    setSelectedSort(sortId);
    updateSortParams(sortId);
  };

  const handleResetFilters = () => {
    setSelectedSort('bestseller');
    startTransition(() => {
      router.replace(pathname, { scroll: false });
    });
  };

  const isFiltered = selectedSort !== 'bestseller' || Boolean(searchQuery);

  const catalogProducts = useMemo(() => {
    return expandProductsForCatalog(products) as ProductItem[];
  }, [products]);

  // Filter & Sort Products
  const filteredProducts = useMemo(() => {
    return catalogProducts
      .filter((p) => {
        // 1. Text Search Filter (q)
        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          const matchesQ =
            p.name_de.toLowerCase().includes(q) ||
            (p.subtitle_de && p.subtitle_de.toLowerCase().includes(q)) ||
            (p.description_de && p.description_de.toLowerCase().includes(q));
          if (!matchesQ) return false;
        }

        // 2. Active Category Filter
        if (currentCategorySlug !== 'all') {
          const catConfig = getCategoryConfig(currentCategorySlug);
          if (catConfig) {
            return catConfig.matches(p);
          }
        }

        return true;
      })
      .sort((a, b) => {
        const getMinPrice = (p: ProductItem) => {
          const prices = (p.product_variants || [])
            .map((v) => Number(v.price_chf))
            .filter(Boolean);
          const variant100g = p.product_variants?.find((v) => v.weight_grams === 100);
          if (variant100g) return Number(variant100g.price_chf);
          return prices.length > 0 ? Math.min(...prices) : 9.9;
        };

        if (selectedSort === 'price_asc') {
          return getMinPrice(a) - getMinPrice(b);
        }
        if (selectedSort === 'price_desc') {
          return getMinPrice(b) - getMinPrice(a);
        }

        // Default 'bestseller': featured items first, otherwise maintain original order
        if (a.is_featured && !b.is_featured) return -1;
        if (!a.is_featured && b.is_featured) return 1;
        return 0;
      });
  }, [catalogProducts, searchQuery, currentCategorySlug, selectedSort]);

  return (
    <div className="space-y-8">
      {/* 1. Active Search Filter Notice Banner */}
      {searchQuery && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-white border border-stone-200/90 shadow-2xs">
          <div className="text-xs sm:text-sm font-medium text-stone-700">
            Suchergebnisse für:{' '}
            <strong className="text-rose-700 font-black">&quot;{searchQuery}&quot;</strong>
            <span className="text-stone-400 ml-2">
              ({filteredProducts.length} Treffer)
            </span>
          </div>
          <button
            type="button"
            onClick={handleResetFilters}
            className="self-start sm:self-auto text-xs font-bold text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 px-3 py-1.5 rounded-xl transition cursor-pointer"
          >
            Suche zurücksetzen ✕
          </button>
        </div>
      )}

      {/* 2. Horizontal Category Navigation Tabs Bar (Direct Static URLs for SEO) */}
      <div className="relative">
        <div
          className="flex items-center gap-2 overflow-x-auto no-scrollbar flex-nowrap pb-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {SHOP_NAV_TABS.map((tab) => {
            const isActive = currentCategorySlug === tab.slug;
            return (
              <Link
                key={tab.id}
                href={tab.href}
                className={`px-5 py-2.5 rounded-full text-xs font-medium shrink-0 transition-colors duration-150 inline-flex items-center ${
                  isActive
                    ? 'bg-stone-900 text-white font-medium shadow-sm'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* 3. Controls Bar: Counter (Left) + Sorting (Right) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-3.5 border-y border-stone-200/80 bg-stone-50/50 rounded-2xl px-4 sm:px-5">
        {/* Left: Product Counter */}
        <div className="flex items-center gap-3">
          <p className="text-xs sm:text-sm text-stone-600">
            {currentCategorySlug === 'all' && !searchQuery ? (
              <>
                Zeigt alle{' '}
                <span className="font-bold text-stone-900">
                  {catalogProducts.length}
                </span>{' '}
                Produkte
              </>
            ) : (
              <>
                Zeigt{' '}
                <span className="font-bold text-stone-900">
                  {filteredProducts.length}
                </span>{' '}
                von{' '}
                <span className="font-bold text-stone-900">
                  {catalogProducts.length}
                </span>{' '}
                Produkten
              </>
            )}
          </p>

          {isFiltered && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1 text-xs font-semibold text-rose-700 hover:text-rose-800 transition cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Filter zurücksetzen</span>
            </button>
          )}
        </div>

        {/* Right: Sorting Dropdown only */}
        <div className="flex items-center gap-1.5 self-end sm:self-auto">
          <span className="text-xs font-medium text-stone-500 hidden sm:inline">
            Sortierung:
          </span>
          <div className="relative">
            <select
              value={selectedSort}
              onChange={(e) => handleSortChange(e.target.value)}
              aria-label="Produktsortierung"
              className="text-xs font-semibold py-2 pl-3 pr-8 rounded-xl border border-stone-200 bg-white text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-900 shadow-2xs appearance-none cursor-pointer"
            >
              {SORT_OPTIONS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-stone-400">
              <ArrowUpDown className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>

      {/* 4. Product Grid or Friendly Empty State */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 px-6 border-2 border-dashed border-stone-200 rounded-3xl bg-white space-y-4 max-w-xl mx-auto shadow-2xs">
          <div className="w-14 h-14 rounded-2xl bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
            <PackageSearch className="w-7 h-7 stroke-[1.8]" />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-lg font-bold text-stone-900">
              Keine Produkte in dieser Kategorie gefunden
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto leading-relaxed">
              Für die gewählte Kategorie gibt es aktuell keine passenden Früchte.
            </p>
          </div>
          <div className="pt-2">
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold transition shadow-xs cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Filter zurücksetzen</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {filteredProducts.map((product) => {
            const variants = product.product_variants || [];
            const prices = variants.map((v) => Number(v.price_chf)).filter(Boolean);
            const variant100g = variants.find((v) => v.weight_grams === 100);
            const minPrice = variant100g
              ? Number(variant100g.price_chf)
              : prices.length > 0
              ? Math.min(...prices)
              : 9.9;
            const primaryImage =
              product.images?.[0] ||
              'https://images.unsplash.com/photo-1543528176-61b239494933?q=80&w=800&auto=format&fit=crop';

            // Available pack sizes
            const weights = Array.from(
              new Set(
                variants
                  .map((v) => v.weight_grams)
                  .filter((w): w is number => Boolean(w))
              )
            ).sort((a, b) => a - b);
            const packSizesText =
              weights.length > 0
                ? weights.map((w) => `${w}g`).join(' & ')
                : '100g & 200g';

            return (
              <Link
                key={product.id}
                href={`/produkte/${product.slug}`}
                className="group flex flex-col bg-white border border-stone-200/90 rounded-3xl overflow-hidden shadow-2xs hover:shadow-md hover:border-stone-300 transition-all duration-300 h-full"
              >
                {/* Image Container with Smooth Zoom */}
                <div className="relative aspect-square w-full overflow-hidden bg-stone-100">
                  <Image
                    src={primaryImage}
                    alt={product.name_de}
                    fill
                    unoptimized
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                  />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 pointer-events-none">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/95 text-stone-800 backdrop-blur-md border border-stone-200/80 shadow-2xs">
                      🇨🇭 {product.origin_country || 'Schweiz'}
                    </span>
                    {product.form && product.form !== 'Mix' && product.form !== 'Box' && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-stone-900/90 text-white backdrop-blur-md shadow-2xs">
                        {product.form}
                      </span>
                    )}
                    {product.is_featured && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-700 text-white shadow-2xs">
                        Bestseller
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-5 flex flex-col justify-between h-full space-y-4">
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider block">
                      100% Natur
                    </span>
                    <h3 className="text-base md:text-lg font-semibold text-stone-900 leading-snug line-clamp-2 min-h-[2.75rem] md:min-h-[3rem] group-hover:text-rose-700 transition">
                      {product.name_de}
                    </h3>
                    <p className="text-sm text-stone-600 line-clamp-2 min-h-[2.5rem] leading-relaxed">
                      {product.subtitle_de || product.description_de || 'Schonend gefriergetrocknete Schweizer Früchte.'}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-stone-100 space-y-3 mt-auto">
                    {/* Sizes and Price */}
                    <div className="flex flex-col">
                      <span className="text-xs md:text-sm text-stone-500 font-medium truncate">
                        {packSizesText}
                      </span>
                      <div className="flex items-baseline gap-1.5 mt-0.5">
                        <span className="text-base font-bold text-stone-900 font-sans">
                          Ab CHF {minPrice.toFixed(2)}
                        </span>
                        <span className="text-[10px] text-stone-400">
                          (inkl. 2.6% MwSt.)
                        </span>
                      </div>
                    </div>

                    {/* View Details Button */}
                    <div className="w-full h-10 rounded-2xl bg-stone-50 group-hover:bg-stone-900 group-hover:text-white border border-stone-200/80 group-hover:border-stone-900 font-bold text-xs text-stone-800 flex items-center justify-center gap-1.5 transition-all duration-200">
                      <span>Details ansehen</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
