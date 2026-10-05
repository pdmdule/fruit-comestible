import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Sparkles } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import BlogListing, { BlogPostItem } from '@/components/BlogListing';
import Breadcrumbs from '@/components/Breadcrumbs';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Magazin & Rezepte | Fruit Comestible Suisse',
  description:
    'Entdecken Sie kreative Rezepte, Clean Food Tipps und wissenswerte Fakten rund um die schonende Gefriertrocknung von Schweizer Sommerbeeren.',
};

export default async function BlogPage() {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching blog posts:', error);
  }

  const posts = (data || []) as BlogPostItem[];

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans antialiased pb-24">
      {/* Top Breadcrumb Navigation */}
      <div className="border-b border-stone-200/80 bg-white">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-3.5 flex items-center justify-between text-xs">
          <Breadcrumbs customItems={[{ label: 'Magazin & Rezepte' }]} />
        </div>
      </div>

      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-12 sm:py-16 space-y-12">
        {/* Header Block */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold border border-rose-200/60">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Fruit Comestible Magazin</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-stone-900">
            Wissenswertes & Rezepte
          </h1>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-normal">
            Erfahren Sie mehr über Clean Food, die ideale Lagerung für maximalen
            Crunch und lassen Sie sich von unseren Schweizer Rezeptideen mit 100%
            naturbelassenen gefriergetrockneten Früchten inspirieren.
          </p>
        </div>

        {/* Client-side Filtering & Responsive Grid */}
        <BlogListing posts={posts} />
      </main>
    </div>
  );
}
