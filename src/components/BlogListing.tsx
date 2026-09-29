'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, ArrowRight, BookOpen, ChefHat, Sparkles, User } from 'lucide-react';

export interface BlogPostItem {
  id: string;
  slug: string;
  title_de: string;
  summary_de?: string | null;
  excerpt_de?: string | null;
  content_de?: string;
  category: string;
  author?: string | null;
  reading_time_minutes?: number | null;
  published_at?: string | null;
  created_at?: string | null;
  image_url?: string | null;
  cover_image_url?: string | null;
  recipe_data?: any;
}

interface BlogListingProps {
  posts: BlogPostItem[];
}

const CATEGORY_TABS = ['Alle', 'Rezepte', 'Healthy Food', 'Wissen'] as const;
type CategoryTab = (typeof CATEGORY_TABS)[number];

function formatDate(dateStr?: string | null): string {
  if (!dateStr) return '';
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

export default function BlogListing({ posts }: BlogListingProps) {
  const [activeTab, setActiveTab] = useState<CategoryTab>('Alle');

  const filteredPosts = useMemo(() => {
    if (activeTab === 'Alle') return posts;
    if (activeTab === 'Rezepte') {
      return posts.filter(
        (p) =>
          p.category?.toLowerCase().includes('rezept') ||
          p.recipe_data !== null && p.recipe_data !== undefined
      );
    }
    return posts.filter(
      (p) => p.category?.toLowerCase() === activeTab.toLowerCase()
    );
  }, [posts, activeTab]);

  // Count items per category
  const counts = useMemo(() => {
    return {
      Alle: posts.length,
      Rezepte: posts.filter(
        (p) =>
          p.category?.toLowerCase().includes('rezept') ||
          p.recipe_data !== null && p.recipe_data !== undefined
      ).length,
      'Healthy Food': posts.filter(
        (p) => p.category?.toLowerCase() === 'healthy food'
      ).length,
      Wissen: posts.filter((p) => p.category?.toLowerCase() === 'wissen').length,
    };
  }, [posts]);

  return (
    <div className="space-y-10">
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-stone-200/80 pb-4">
        {CATEGORY_TABS.map((tab) => {
          const isActive = activeTab === tab;
          const count = counts[tab] || 0;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              type="button"
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
                isActive
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-white hover:bg-stone-100 text-stone-600 border border-stone-200/80'
              }`}
            >
              <span>{tab}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isActive
                    ? 'bg-stone-700 text-stone-200'
                    : 'bg-stone-100 text-stone-500'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid of Articles */}
      {filteredPosts.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-stone-200/80 space-y-3">
          <BookOpen className="w-10 h-10 text-stone-300 mx-auto" />
          <p className="text-base font-bold text-stone-800">
            Keine Artikel in dieser Kategorie gefunden.
          </p>
          <button
            onClick={() => setActiveTab('Alle')}
            type="button"
            className="text-xs font-bold text-rose-700 hover:underline"
          >
            Alle Artikel anzeigen
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => {
            const imageSrc =
              post.image_url ||
              post.cover_image_url ||
              'https://images.unsplash.com/photo-1543528176-61b239494933?q=80&w=800&auto=format&fit=crop';
            const excerpt =
              post.summary_de ||
              post.excerpt_de ||
              'Erfahren Sie mehr in unserem ausführlichen Ratgeber über Schweizer Trockenfrüchte.';
            const isRecipe =
              post.category?.toLowerCase().includes('rezept') ||
              (post.recipe_data !== null && post.recipe_data !== undefined);
            const dateFormatted = formatDate(post.published_at || post.created_at);

            return (
              <article
                key={post.id}
                className="group bg-white border border-stone-200/80 rounded-3xl overflow-hidden shadow-xs hover:shadow-lg hover:border-stone-300 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Thumbnail */}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="relative aspect-16/10 w-full overflow-hidden bg-stone-100 block"
                  >
                    <Image
                      src={imageSrc}
                      alt={post.title_de}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    {/* Category Badge */}
                    <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5">
                      <span
                        className={`px-3 py-1 rounded-full text-[11px] font-bold backdrop-blur-md shadow-2xs ${
                          isRecipe
                            ? 'bg-rose-600/90 text-white'
                            : post.category === 'Healthy Food'
                            ? 'bg-emerald-700/90 text-white'
                            : 'bg-stone-900/80 text-white'
                        }`}
                      >
                        {isRecipe ? 'Rezept' : post.category}
                      </span>
                      {isRecipe && (
                        <span className="w-6 h-6 rounded-full bg-white/90 text-rose-700 flex items-center justify-center shadow-2xs">
                          <ChefHat className="w-3.5 h-3.5 stroke-[2.2]" />
                        </span>
                      )}
                    </div>
                  </Link>

                  {/* Card Content */}
                  <div className="p-6 sm:p-7 space-y-3">
                    {/* Meta Info */}
                    <div className="flex items-center gap-3 text-xs text-stone-400">
                      {post.reading_time_minutes && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-stone-400" />
                          <span>{post.reading_time_minutes} Min. Lesezeit</span>
                        </span>
                      )}
                      {dateFormatted && (
                        <>
                          <span className="text-stone-300">•</span>
                          <span>{dateFormatted}</span>
                        </>
                      )}
                    </div>

                    {/* Title */}
                    <h2 className="text-lg sm:text-xl font-black text-stone-900 leading-snug group-hover:text-rose-700 transition">
                      <Link href={`/blog/${post.slug}`}>{post.title_de}</Link>
                    </h2>

                    {/* Excerpt */}
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed line-clamp-3">
                      {excerpt}
                    </p>
                  </div>
                </div>

                {/* Footer with Author & Read More */}
                <div className="px-6 pb-6 pt-3 sm:px-7 sm:pb-7 flex items-center justify-between border-t border-stone-100 text-xs mt-auto">
                  <div className="flex items-center gap-2 text-stone-500 font-medium">
                    <div className="w-6 h-6 rounded-full bg-stone-100 border border-stone-200 text-stone-600 flex items-center justify-center font-bold text-[10px]">
                      {post.author ? post.author[0] : 'F'}
                    </div>
                    <span>Von {post.author || 'Fruit Comestible'}</span>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 font-bold text-rose-700 hover:text-rose-800 transition group-hover:translate-x-0.5"
                  >
                    <span>Weiterlesen</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
