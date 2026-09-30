import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import {
  ArrowLeft,
  Clock,
  Calendar,
  User,
  ShoppingBag,
  ArrowRight,
  BookOpen,
  ChefHat,
  Share2,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import RecipeBox, { RecipeData } from '@/components/RecipeBox';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-dynamic';

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

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { data: post } = await supabase
    .from('blog_posts')
    .select('title_de, summary_de')
    .eq('slug', slug)
    .single();

  if (!post) {
    return {
      title: 'Artikel nicht gefunden | Fruit Comestible',
    };
  }

  return {
    title: `${post.title_de} | Fruit Comestible Magazin`,
    description: post.summary_de || 'Fruit Comestible Suisse Magazin & Rezepte',
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  const { data: post, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !post) {
    notFound();
  }

  // Parse recipe_data if present
  let recipe: RecipeData | null = null;
  if (post.recipe_data) {
    try {
      recipe =
        typeof post.recipe_data === 'string'
          ? JSON.parse(post.recipe_data)
          : post.recipe_data;
    } catch (e) {
      console.error('Error parsing recipe_data:', e);
    }
  }

  const isRecipe =
    post.category?.toLowerCase().includes('rezept') || recipe !== null;
  const imageSrc =
    post.image_url ||
    post.cover_image_url ||
    'https://images.unsplash.com/photo-1543528176-61b239494933?q=80&w=1200&auto=format&fit=crop';
  const formattedDate = formatDate(post.published_at || post.created_at);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans antialiased pb-24">
      {/* Top Breadcrumb Header */}
      <div className="border-b border-stone-200/80 bg-white sticky top-16 z-20 backdrop-blur-md bg-white/90">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between text-xs">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 font-bold text-stone-600 hover:text-stone-900 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Zurück zum Magazin</span>
          </Link>
          <div className="flex items-center gap-2">
            <span
              className={`px-2.5 py-0.5 rounded-full font-bold text-[11px] ${
                isRecipe
                  ? 'bg-rose-100 text-rose-800'
                  : post.category === 'Healthy Food'
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-stone-200 text-stone-800'
              }`}
            >
              {isRecipe ? 'Rezept' : post.category}
            </span>
          </div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 space-y-10">
        {/* Article Header */}
        <header className="space-y-5 text-center max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-stone-200 shadow-2xs text-xs font-bold text-stone-800">
            {isRecipe ? (
              <>
                <ChefHat className="w-3.5 h-3.5 text-rose-600" />
                <span>Exklusives Frucht-Rezept</span>
              </>
            ) : (
              <>
                <BookOpen className="w-3.5 h-3.5 text-rose-600" />
                <span>{post.category || 'Ernährungswissen'}</span>
              </>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-stone-900 leading-[1.12]">
            {post.title_de}
          </h1>

          {/* Summary / Subtitle */}
          {post.summary_de && (
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-normal">
              {post.summary_de}
            </p>
          )}

          {/* Meta Bar */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-stone-500 pt-2 border-t border-stone-200/80">
            {post.author && (
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-full bg-stone-200 text-stone-700 flex items-center justify-center text-[10px] font-bold">
                  {post.author[0]}
                </div>
                <span>Von {post.author}</span>
              </div>
            )}

            {formattedDate && (
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-stone-400" />
                <span>{formattedDate}</span>
              </div>
            )}

            {post.reading_time_minutes && (
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-stone-400" />
                <span>{post.reading_time_minutes} Min. Lesezeit</span>
              </div>
            )}
          </div>
        </header>

        {/* Featured Image */}
        <div className="relative aspect-16/9 w-full rounded-3xl overflow-hidden bg-stone-100 border border-stone-200/90 shadow-md">
          <Image
            src={imageSrc}
            alt={post.title_de}
            fill
            priority
            unoptimized
            sizes="(max-width: 1024px) 100vw, 896px"
            className="object-cover"
          />
        </div>

        {/* Recipe Box (if article has recipe_data) */}
        {recipe && (
          <section aria-label="Rezept Box">
            <RecipeBox recipe={recipe} recipeTitle={post.title_de} />
          </section>
        )}

        {/* Markdown Content formatted in Tailwind Typography */}
        {post.content_de && (
          <div className="prose prose-stone prose-base sm:prose-lg max-w-3xl mx-auto py-4 prose-headings:font-black prose-headings:tracking-tight prose-headings:text-stone-900 prose-p:text-stone-700 prose-p:leading-relaxed prose-strong:text-stone-900 prose-li:text-stone-700 prose-ul:my-4 prose-a:text-rose-700 prose-a:font-bold hover:prose-a:underline">
            <ReactMarkdown>{post.content_de}</ReactMarkdown>
          </div>
        )}

        {/* Tags if available */}
        {post.tags && Array.isArray(post.tags) && post.tags.length > 0 && (
          <div className="pt-6 border-t border-stone-200/80 flex flex-wrap items-center gap-2 max-w-3xl mx-auto">
            <span className="text-xs font-bold text-stone-500 mr-2">Tags:</span>
            {post.tags.map((tag: string, idx: number) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-full bg-white border border-stone-200 text-stone-600 text-xs font-semibold shadow-2xs"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Bottom CTA: "Passende Produkte entdecken" */}
        <div className="mt-14 p-8 sm:p-10 rounded-3xl bg-white border border-stone-200/90 shadow-sm max-w-3xl mx-auto space-y-6 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-rose-700 block">
                🇨🇭 100% Reine Frucht – Ohne Zuckerzusatz
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
                Passende Produkte entdecken
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-md">
                Verleihen Sie Ihren Rezepten, Bowls oder Desserts den perfekten
                Crunch mit gefriergetrockneten Schweizer Sommerbeeren & Fruchtgranulat.
              </p>
            </div>

            <Link
              href="/shop"
              className="h-13 px-7 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-sm transition active:scale-[0.98] shrink-0"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Zum Shop</span>
            </Link>
          </div>
        </div>

        {/* Bottom Back Navigation */}
        <div className="pt-8 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-bold text-rose-700 hover:text-rose-800 transition group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Zurück zur Übersicht aller Rezepte & Magazinartikel</span>
          </Link>
        </div>
      </article>
    </div>
  );
}
