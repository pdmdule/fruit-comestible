import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ChefHat,
  Clock,
  Sparkles,
  ArrowRight,
  BookOpen,
  Calendar,
} from 'lucide-react';

import type { DailyRecipe } from '@/lib/dailyRecipes';

export type { DailyRecipe };

interface DailyRecipeCardProps {
  recipe?: DailyRecipe | null;
}

export default function DailyRecipeCard({ recipe }: DailyRecipeCardProps) {
  if (!recipe) {
    return null;
  }

  const recipeHref = `/rezepte/${recipe.slug}`;

  return (
    <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm p-6 sm:p-7 flex flex-col justify-between hover:shadow-md transition-all duration-300 relative overflow-hidden group h-auto">
      {/* Decorative subtle corner glow */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-rose-100/50 via-amber-50/20 to-transparent rounded-bl-full pointer-events-none" />

      {/* Top Header & Daily Indicators */}
      <div>
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-rose-50 text-rose-700 border border-rose-200/80 shadow-2xs">
              <ChefHat className="w-3.5 h-3.5 text-rose-600 stroke-[2.2]" />
              <span>Rezept des Tages</span>
            </span>

            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 rounded-full">
              <Sparkles className="w-3 h-3 text-emerald-600" />
              <span>Täglich neu</span>
            </span>
          </div>

          <div className="flex items-center gap-1 text-[11px] font-bold text-stone-500 bg-stone-100/80 px-2.5 py-1 rounded-full border border-stone-200/60">
            <Calendar className="w-3 h-3 text-stone-500" />
            <span>Heute</span>
          </div>
        </div>

        {/* Recipe Image with Overlaid Badges (Fixed Compact Aspect Ratio) */}
        <div className="relative w-full aspect-[16/10] shrink-0 rounded-2xl overflow-hidden bg-stone-100 mb-5 group/img isolate transform-gpu backface-hidden">
          {recipe.imageUrl && (
            <Image
              src={recipe.imageUrl}
              alt={recipe.title || 'Rezeptbild'}
              fill
              unoptimized
              sizes="(max-width: 1024px) 100vw, 400px"
              className="object-cover group-hover/img:scale-105 transition-transform duration-500 ease-out transform-gpu backface-hidden will-change-transform"
            />
          )}

          {/* Gradient Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-black/20 pointer-events-none" />

          {/* Top-left Badges (Prep Time & Difficulty) */}
          <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 pointer-events-none">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/95 text-stone-900 backdrop-blur-md shadow-xs border border-white/60 flex items-center gap-1">
              <Clock className="w-3 h-3 text-rose-600 stroke-[2.2]" />
              <span>{recipe.prepTime}</span>
            </span>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/95 text-stone-900 backdrop-blur-md shadow-xs border border-white/60 flex items-center gap-1">
              <ChefHat className="w-3 h-3 text-emerald-600 stroke-[2.2]" />
              <span>{recipe.difficulty}</span>
            </span>
          </div>

          {/* Category Tag (Bottom-Right) */}
          <div className="absolute bottom-3 right-3 pointer-events-none">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-stone-900/85 text-white backdrop-blur-md border border-white/20 shadow-xs">
              {recipe.category}
            </span>
          </div>

          {recipe.servings && (
            <div className="absolute bottom-3 left-3 pointer-events-none">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold text-white/90 bg-black/40 backdrop-blur-md">
                {recipe.servings}
              </span>
            </div>
          )}
        </div>

        {/* Title & Description */}
        <div className="space-y-2 mb-5">
          <h3 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight leading-snug group-hover:text-rose-700 transition-colors">
            <Link href={recipeHref}>{recipe.title}</Link>
          </h3>
          {recipe.description && (
            <p className="text-xs sm:text-sm text-stone-700 line-clamp-3 leading-relaxed">
              {recipe.description}
            </p>
          )}
        </div>
      </div>

      {/* Bottom Section: Matching Product + CTA Button */}
      <div className="pt-2 border-t border-stone-100 space-y-4">
        {recipe.featuredProductSlug && recipe.featuredProductName && (
          <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200/80 flex items-center justify-between gap-3 hover:bg-stone-100/80 transition-colors">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative w-12 h-12 rounded-xl bg-white border border-stone-200/80 overflow-hidden shrink-0 flex items-center justify-center p-1 shadow-2xs">
                <Image
                  src={recipe.featuredProductImage || '/logo.webp'}
                  alt={recipe.featuredProductName || 'Passendes Produkt'}
                  width={44}
                  height={44}
                  unoptimized
                  className="object-contain"
                />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-700 block">
                  Passend dazu:
                </span>
                <h4 className="text-xs font-bold text-stone-900 truncate">
                  {recipe.featuredProductName}
                </h4>
              </div>
            </div>

            <Link
              href={`/produkte/${recipe.featuredProductSlug}`}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 hover:text-rose-800 shrink-0 px-2.5 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100/70 border border-rose-200/60 transition-colors"
            >
              <span>Zum Produkt</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        )}

        {/* Full Recipe CTA Button */}
        <Link
          href={recipeHref}
          className="w-full py-3 px-5 rounded-xl font-bold text-xs bg-stone-900 hover:bg-rose-700 text-white shadow-xs hover:shadow-md flex items-center justify-center gap-2 transition-all duration-200 group/btn"
        >
          <BookOpen className="w-4 h-4" />
          <span>Zum Rezept</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
