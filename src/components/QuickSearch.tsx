'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  X,
  ArrowRight,
  Sparkles,
  ChefHat,
  ShoppingBag,
  BookOpen,
  Loader2,
} from 'lucide-react';

interface ProductResult {
  id: string;
  slug: string;
  name_de: string;
  subtitle_de?: string;
  min_price?: number | null;
  image: string;
}

interface BlogResult {
  id: string;
  slug: string;
  title_de: string;
  category: string;
  is_recipe: boolean;
  image: string;
}

interface QuickSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

const POPULAR_SEARCHES = [
  'Erdbeeren',
  'Himbeeren',
  'Zwetschgen',
  'Geschenkbox',
  'Müsli',
  'Tiramisu',
];

export default function QuickSearch({ isOpen, onClose }: QuickSearchProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState<ProductResult[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setQuery('');
      setProducts([]);
      setBlogPosts([]);
    }
  }, [isOpen]);

  // Debounced search query
  useEffect(() => {
    if (!isOpen) return;

    const trimmed = query.trim();
    if (!trimmed) {
      setProducts([]);
      setBlogPosts([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(trimmed)}`);
        if (!res.ok) throw new Error('Search failed');
        const data = await res.json();
        setProducts(data.products || []);
        setBlogPosts(data.blogPosts || []);
      } catch (err) {
        console.error('Error during search fetch:', err);
      } finally {
        setIsLoading(false);
      }
    }, 180);

    return () => clearTimeout(timer);
  }, [query, isOpen]);

  // Handle ESC key and Enter key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onClose();
      if (query.trim()) {
        router.push(`/shop?q=${encodeURIComponent(query.trim())}`);
      } else {
        router.push('/shop');
      }
    }
  };

  const handleSelectProduct = (slug: string) => {
    onClose();
    router.push(`/produkte/${slug}`);
  };

  const handleSelectBlog = (slug: string) => {
    onClose();
    router.push(`/blog/${slug}`);
  };

  const handleViewAllInShop = () => {
    onClose();
    if (query.trim()) {
      router.push(`/shop?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push('/shop');
    }
  };

  if (!isOpen) return null;

  const hasQuery = query.trim().length > 0;
  const hasProducts = products.length > 0;
  const hasBlog = blogPosts.length > 0;
  const hasResults = hasProducts || hasBlog;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Schnellsuche"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-stone-950/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[82vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center gap-3 bg-stone-50/70">
          {isLoading ? (
            <Loader2 className="w-5 h-5 text-rose-600 animate-spin shrink-0" />
          ) : (
            <Search className="w-5 h-5 text-stone-400 shrink-0" />
          )}

          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="Produkte, Beeren oder Rezepte suchen (z.B. Erdbeeren, Snack)..."
            className="flex-1 bg-transparent border-none text-stone-900 text-sm sm:text-base placeholder:text-stone-400 focus:outline-none"
          />

          {query && (
            <button
              onClick={() => setQuery('')}
              type="button"
              className="p-1 rounded-full text-stone-400 hover:text-stone-600 hover:bg-stone-200/60 transition cursor-pointer"
              aria-label="Eingabe löschen"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={onClose}
            type="button"
            className="px-2.5 py-1 rounded-xl text-xs font-bold text-stone-500 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 transition cursor-pointer"
          >
            ESC
          </button>
        </div>

        {/* Results Container */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6 flex-1 divide-y divide-stone-100">
          {/* Suggestions when query is empty */}
          {!hasQuery && (
            <div className="space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-stone-400">
                Beliebte Suchbegriffe
              </div>
              <div className="flex flex-wrap gap-2">
                {POPULAR_SEARCHES.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => setQuery(term)}
                    className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-stone-100 text-stone-700 hover:bg-stone-900 hover:text-white transition cursor-pointer"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* No results state */}
          {hasQuery && !isLoading && !hasResults && (
            <div className="py-12 text-center space-y-3">
              <p className="text-base font-bold text-stone-900">
                Keine Ergebnisse gefunden für &quot;{query}&quot;
              </p>
              <p className="text-xs sm:text-sm text-stone-500 max-w-sm mx-auto">
                Probieren Sie einen anderen Suchbegriff oder stöbern Sie in unserem
                gesamten Fruchtsortiment.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleViewAllInShop}
                  className="px-5 py-2.5 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs transition cursor-pointer inline-flex items-center gap-1.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Gesamtes Sortiment im Shop ansehen</span>
                </button>
              </div>
            </div>
          )}

          {/* Section 1: Produkte (Always on top if found) */}
          {hasProducts && (
            <div className="space-y-3 pt-2 first:pt-0">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-stone-400">
                <span className="flex items-center gap-1.5">
                  <ShoppingBag className="w-3.5 h-3.5 text-stone-500" />
                  Produkte ({products.length})
                </span>
                <span className="text-[11px] font-medium text-stone-400 lowercase">
                  im Shop
                </span>
              </div>

              <div className="divide-y divide-stone-100">
                {products.map((p) => (
                  <button
                    key={`prod-${p.id}`}
                    type="button"
                    onClick={() => handleSelectProduct(p.slug)}
                    className="w-full text-left py-3 px-3 rounded-2xl hover:bg-stone-50 transition flex items-center justify-between gap-4 group cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-stone-100 shrink-0 border border-stone-200/80">
                        <Image
                          src={p.image}
                          alt={p.name_de}
                          fill
                          sizes="48px"
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="min-w-0">
                        <span className="font-bold text-sm sm:text-base text-stone-900 group-hover:text-rose-700 transition block truncate">
                          {p.name_de}
                        </span>
                        {p.subtitle_de && (
                          <span className="text-xs text-stone-400 block truncate">
                            {p.subtitle_de}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      {p.min_price !== null && p.min_price !== undefined && (
                        <span className="font-extrabold text-sm text-stone-900 bg-stone-100 px-2.5 py-1 rounded-lg">
                          ab CHF {p.min_price.toFixed(2)}
                        </span>
                      )}
                      <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-stone-900 group-hover:translate-x-0.5 transition" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Section 2: Rezepte & Magazin */}
          {hasBlog && (
            <div className="space-y-3 pt-4">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-stone-400">
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-stone-500" />
                  Rezepte & Magazin ({blogPosts.length})
                </span>
                <span className="text-[11px] font-medium text-stone-400 lowercase">
                  im Ratgeber
                </span>
              </div>

              <div className="divide-y divide-stone-100">
                {blogPosts.map((b) => (
                  <button
                    key={`blog-${b.id}`}
                    type="button"
                    onClick={() => handleSelectBlog(b.slug)}
                    className="w-full text-left py-3 px-3 rounded-2xl hover:bg-stone-50 transition flex items-center justify-between gap-4 group cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-stone-100 shrink-0 border border-stone-200/80">
                        <Image
                          src={b.image}
                          alt={b.title_de}
                          fill
                          sizes="48px"
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm sm:text-base text-stone-900 group-hover:text-rose-700 transition block truncate">
                            {b.title_de}
                          </span>
                        </div>
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-700 mt-0.5">
                          {b.is_recipe ? (
                            <>
                              <ChefHat className="w-3 h-3 stroke-[2.2]" />
                              <span>Rezept</span>
                            </>
                          ) : (
                            <span>{b.category}</span>
                          )}
                        </span>
                      </div>
                    </div>

                    <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-stone-900 group-hover:translate-x-0.5 transition shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Bar: "Alle Produkte im Shop anzeigen" + Hint */}
        <div className="p-3.5 sm:p-4 bg-stone-50 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="text-stone-400 font-medium text-center sm:text-left">
            Drücken Sie <kbd className="px-1.5 py-0.5 rounded bg-stone-200 text-stone-700 font-mono text-[10px] font-bold">Enter ↵</kbd> für alle Suchtreffer im Shop
          </div>

          <button
            type="button"
            onClick={handleViewAllInShop}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs shrink-0"
          >
            <span>Alle Produkte im Shop anzeigen</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
