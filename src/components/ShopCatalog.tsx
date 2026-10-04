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
  ChevronDown,
} from 'lucide-react';
import { expandProductsForCatalog } from '@/lib/productForms';
import { SHOP_NAV_TABS, getCategoryConfig } from '@/lib/categoryConfig';
import {
  CATEGORY_DESCRIPTIONS,
  getCategoryDescription,
} from '@/data/categoryDescriptions';
import { getProductDisplayOrigin } from '@/lib/productOrigins';

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

export const SORT_OPTIONS = [
  { id: 'bestseller', label: 'Bestseller' },
  { id: 'price_asc', label: 'Preis aufsteigend' },
  { id: 'price_desc', label: 'Preis absteigend' },
];

export interface FruitFilterItem {
  label: string;
  value?: string;
  values?: string[];
  icon: string;
}

export const FRUCHT_FILTER: FruitFilterItem[] = [
  { label: 'Alle Früchte', value: 'all', icon: '🍓' },
  { label: 'Erdbeeren', value: 'erdbeer', icon: '🍓' },
  { label: 'Himbeeren', value: 'himbeer', icon: '🫐' },
  { label: 'Heidelbeeren', value: 'heidelbeer', icon: '🫐' },
  { label: 'Aprikosen', value: 'aprikose', icon: '🍑' },
  { label: 'Sauerkirschen', value: 'sauerkirsche', icon: '🍒' },
  { label: 'Zwetschgen', value: 'zwetschgen', icon: '🍑' },
  { label: 'Brombeeren', value: 'brombeere', icon: '🫐' },
  { label: 'Johannisbeeren', value: 'johannisbeere', icon: '🫐' },
  { label: 'Bananen', value: 'banane', icon: '🍌' },
  { label: 'Äpfel', value: 'apfel', icon: '🍏' },
  { label: 'Mango', value: 'mango', icon: '🥭' },
  { label: 'Ananas & Maracuja', values: ['ananas', 'maracuja'], icon: '🍍' },
];

export function getFruitFilterKey(filter: FruitFilterItem): string {
  return filter.value || (filter.values ? filter.values.join('-') : 'all');
}

export function findFilterByKey(key: string): FruitFilterItem | undefined {
  const clean = key.toLowerCase().trim();
  return FRUCHT_FILTER.find((f) => {
    const k = getFruitFilterKey(f);
    if (k === clean) return true;
    if (f.value && f.value === clean) return true;
    if (f.values && f.values.includes(clean)) return true;
    if (clean === 'erdbeeren' && f.value === 'erdbeer') return true;
    if (clean === 'himbeeren' && f.value === 'himbeer') return true;
    if ((clean === 'blaubeeren' || clean === 'blaubeer') && f.value === 'heidelbeer') return true;
    return false;
  });
}

export function matchesFruitFilter(item: FruitFilterItem, product: ProductItem): boolean {
  if (item.value === 'all') return true;

  const slug = product.slug.toLowerCase();
  const name = product.name_de.toLowerCase();

  if (item.values && item.values.length > 0) {
    return item.values.some(
      (v) => slug.includes(v.toLowerCase()) || name.includes(v.toLowerCase())
    );
  }

  if (item.value) {
    const val = item.value.toLowerCase();
    return slug.includes(val) || name.includes(val);
  }

  return true;
}

// Backward compatibility aliases
export type FruitFilterOption = FruitFilterItem;
export const FRUIT_FILTER_OPTIONS = FRUCHT_FILTER;

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
  const currentCategoryDesc =
    CATEGORY_DESCRIPTIONS[currentCategorySlug] ||
    getCategoryDescription(currentCategorySlug);

  const initialSort = useMemo(() => {
    const raw = searchParams.get('sort')?.toLowerCase() || 'bestseller';
    if (SORT_OPTIONS.some((s) => s.id === raw)) return raw;
    return 'bestseller';
  }, [searchParams]);

  const initialFruit = useMemo(() => {
    const raw = searchParams.get('frucht')?.toLowerCase() || 'all';
    const match = findFilterByKey(raw);
    if (match) return getFruitFilterKey(match);
    return 'all';
  }, [searchParams]);

  const searchQuery = searchParams.get('q')?.trim() || '';
  const [selectedSort, setSelectedSort] = useState(initialSort);
  const [selectedFruit, setSelectedFruit] = useState(initialFruit);

  useEffect(() => {
    setSelectedSort(initialSort);
  }, [initialSort]);

  useEffect(() => {
    setSelectedFruit(initialFruit);
  }, [initialFruit]);

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

  const updateFruitParams = (newFruit: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newFruit === 'all') {
      params.delete('frucht');
    } else {
      params.set('frucht', newFruit);
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

  const handleFruitChange = (fruitId: string) => {
    setSelectedFruit(fruitId);
    updateFruitParams(fruitId);
  };

  const handleResetFilters = () => {
    setSelectedSort('bestseller');
    setSelectedFruit('all');
    const params = new URLSearchParams(searchParams.toString());
    params.delete('sort');
    params.delete('frucht');
    params.delete('q');
    const queryString = params.toString();
    startTransition(() => {
      router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
        scroll: false,
      });
    });
  };

  const isFiltered =
    selectedSort !== 'bestseller' ||
    selectedFruit !== 'all' ||
    Boolean(searchQuery);

  const isCountFiltered =
    currentCategorySlug !== 'all' ||
    selectedFruit !== 'all' ||
    Boolean(searchQuery);

  const catalogProducts = useMemo(() => {
    return expandProductsForCatalog(products) as ProductItem[];
  }, [products]);

  // Filter & Sort Products
  const filteredProducts = useMemo(() => {
    const activeFruitOption = findFilterByKey(selectedFruit);

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
            if (!catConfig.matches(p)) return false;
          }
        }

        // 3. Active Fruit Filter
        if (selectedFruit !== 'all') {
          if (activeFruitOption && !matchesFruitFilter(activeFruitOption, p)) {
            return false;
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
  }, [catalogProducts, searchQuery, currentCategorySlug, selectedFruit, selectedSort]);

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

      {/* 2. Navigation Tabs & Controls Bar (Sticky on Mobile) */}
      <div className="sticky top-[72px] sm:top-[80px] md:static z-30 -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0 bg-stone-50/95 md:bg-transparent backdrop-blur-md md:backdrop-blur-none pt-2 pb-2 md:pt-0 md:pb-0 border-b border-stone-200/80 md:border-b-0 space-y-2 md:space-y-3 transition-all">
        {/* Category Navigation Tabs */}
        <div className="relative">
          <div
            className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar flex-nowrap pb-0.5"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {SHOP_NAV_TABS.map((tab) => {
              const isActive = currentCategorySlug === tab.slug;
              const targetHref =
                selectedFruit !== 'all'
                  ? `${tab.href}?frucht=${selectedFruit}`
                  : tab.href;

              return (
                <Link
                  key={tab.id}
                  href={targetHref}
                  className={`px-3.5 py-1.5 sm:px-5 sm:py-2.5 rounded-full text-xs font-medium shrink-0 transition-colors duration-150 inline-flex items-center ${
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

        {/* Horizontal Fruit Filter Chips (Desktop/Tablet only: hidden on mobile, 2 rows on >= 1500px) */}
        <div className="hidden md:flex items-start gap-2.5">
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider shrink-0 mt-2">
            Frucht:
          </span>
          <div
            className="fruit-filter-2rows flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar flex-nowrap py-1"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {FRUCHT_FILTER.map((fruit, idx) => {
              const fruitKey = getFruitFilterKey(fruit);
              const isFruitActive = selectedFruit === fruitKey;
              return (
                <React.Fragment key={fruitKey}>
                  {idx === 7 && <div className="fruit-filter-break hidden" />}
                  <button
                    key={fruitKey}
                    type="button"
                    onClick={() => handleFruitChange(fruitKey)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-medium shrink-0 transition-all duration-150 inline-flex items-center gap-1.5 cursor-pointer border ${
                      isFruitActive
                        ? 'bg-rose-50 border-rose-300 text-rose-800 font-semibold shadow-2xs'
                        : 'bg-white border-stone-200/90 text-stone-700 hover:border-stone-300 hover:bg-stone-50'
                    }`}
                  >
                    <span>{fruit.icon}</span>
                    <span>{fruit.label}</span>
                    {isFruitActive && fruitKey !== 'all' && (
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFruitChange('all');
                        }}
                        className="ml-0.5 hover:text-rose-950 font-bold"
                        title="Filter aufheben"
                      >
                        ×
                      </span>
                    )}
                  </button>
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Controls Bar: Counter (Left) + Fruit & Sorting Selectors (Right) */}
        <div className="flex items-center justify-between gap-2 py-2 sm:py-3.5 border-y border-stone-200/80 bg-white/80 sm:bg-stone-50/50 rounded-xl sm:rounded-2xl px-3 sm:px-5">
          {/* Left: Product Counter & Active Badge */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap min-w-0">
            <p className="text-xs sm:text-sm text-stone-600 truncate">
              {!isCountFiltered ? (
                <>
                  <span className="hidden sm:inline">Zeigt alle </span>
                  <span className="font-bold text-stone-900">
                    {catalogProducts.length}
                  </span>{' '}
                  <span className="hidden sm:inline">Produkte</span>
                  <span className="sm:hidden font-medium text-stone-500">Prod.</span>
                </>
              ) : (
                <>
                  <span className="font-bold text-stone-900">
                    {filteredProducts.length}
                  </span>
                  <span className="text-stone-400">/</span>
                  <span className="font-bold text-stone-900">
                    {catalogProducts.length}
                  </span>
                  <span className="hidden sm:inline text-stone-500"> Prod.</span>
                </>
              )}
            </p>

            {selectedFruit !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] sm:text-xs font-medium bg-rose-100 text-rose-800 border border-rose-200 shrink-0">
                <span className="max-w-[70px] sm:max-w-none truncate">
                  {findFilterByKey(selectedFruit)?.label || selectedFruit}
                </span>
                <button
                  type="button"
                  onClick={() => handleFruitChange('all')}
                  className="hover:text-rose-950 font-bold leading-none cursor-pointer"
                  title="Fruchtfilter entfernen"
                >
                  ×
                </button>
              </span>
            )}

            {isFiltered && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-rose-700 hover:text-rose-800 transition cursor-pointer"
                title="Filter zurücksetzen"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Right: Fruit Dropdown + Sorting Dropdown */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Fruit Dropdown */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-medium text-stone-500 hidden md:inline">
                Frucht:
              </span>
              <div className="relative">
                <select
                  value={selectedFruit}
                  onChange={(e) => handleFruitChange(e.target.value)}
                  aria-label="Fruchtfilter"
                  className="text-xs font-semibold py-1.5 sm:py-2 pl-2.5 sm:pl-3 pr-6 sm:pr-7 rounded-lg sm:rounded-xl border border-stone-200 bg-white text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-900 shadow-2xs appearance-none cursor-pointer max-w-[125px] sm:max-w-none truncate"
                >
                  {FRUCHT_FILTER.map((f) => {
                    const fruitKey = getFruitFilterKey(f);
                    return (
                      <option key={fruitKey} value={fruitKey}>
                        {f.icon ? `${f.icon} ${f.label}` : f.label}
                      </option>
                    );
                  })}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1.5 sm:px-2 text-stone-400">
                  <ChevronDown className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </div>
              </div>
            </div>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-medium text-stone-500 hidden md:inline">
                Sortierung:
              </span>
              <div className="relative">
                <select
                  value={selectedSort}
                  onChange={(e) => handleSortChange(e.target.value)}
                  aria-label="Produktsortierung"
                  className="text-xs font-semibold py-1.5 sm:py-2 pl-2.5 sm:pl-3 pr-6 sm:pr-8 rounded-lg sm:rounded-xl border border-stone-200 bg-white text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-900 shadow-2xs appearance-none cursor-pointer max-w-[120px] sm:max-w-none truncate"
                >
                  {SORT_OPTIONS.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.label}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1.5 sm:px-2 text-stone-400">
                  <ArrowUpDown className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </div>
              </div>
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
              Keine Produkte gefunden
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto leading-relaxed">
              Für die gewählte Kombination aus Kategorie und Fruchtart gibt es aktuell keine passenden Früchte.
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

            const { country: displayCountry, flag: displayFlag } = getProductDisplayOrigin(product);

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
                      {displayFlag} {displayCountry}
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

      {/* Category Educational & SEO Description Section */}
      {currentCategorySlug && currentCategoryDesc && (
        <section className="mt-12 md:mt-16 pt-8 md:pt-10 border-t border-stone-200">
          <div className="p-6 sm:p-8 md:p-10 rounded-3xl bg-white border border-stone-200/90 shadow-2xs">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-stone-900 tracking-tight mb-3 sm:mb-4">
              {currentCategoryDesc.title}
            </h3>
            <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed max-w-4xl">
              {currentCategoryDesc.text}
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
