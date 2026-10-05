import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import ShopCatalog, { type ProductItem } from '@/components/ShopCatalog';
import Breadcrumbs from '@/components/Breadcrumbs';
import {
  CATEGORIES_CONFIG,
  getCategoryConfig,
} from '@/lib/categoryConfig';
import { Truck, ArrowLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return CATEGORIES_CONFIG.map((cat) => ({
    category: cat.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const config = getCategoryConfig(category);

  if (!config) {
    return {
      title: 'Kategorie nicht gefunden | fruit-Comestible Schweiz',
    };
  }

  const canonicalUrl = `https://fruit-comestible.ch${config.canonicalPath}`;

  return {
    title: config.metaTitle,
    description: config.metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: config.metaTitle,
      description: config.metaDescription,
      url: canonicalUrl,
      siteName: 'fruit-Comestible Schweiz',
      locale: 'de_CH',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: config.metaTitle,
      description: config.metaDescription,
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const config = getCategoryConfig(category);

  if (!config) {
    notFound();
  }

  const { data } = await supabase
    .from('products')
    .select('*, product_variants(*)')
    .order('created_at', { ascending: false });

  const products = (data || []) as ProductItem[];

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans antialiased">
      {/* Top Banner / Breadcrumb */}
      <div className="border-b border-stone-200/80 bg-white">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <Breadcrumbs
            customItems={[
              { label: 'Shop', href: '/shop' },
              { label: config.name },
            ]}
          />

          <div className="flex items-center gap-2 text-emerald-800 font-medium shrink-0">
            <Truck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Kostenloser Schweizer Post Versand ab CHF 80.–</span>
          </div>
        </div>
      </div>

      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-10 sm:py-16 space-y-12">
        {/* Dynamic Category SEO Header */}
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-extrabold tracking-widest uppercase text-rose-600">
            {config.badgeText}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-stone-900">
            {config.h1}
          </h1>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
            {config.subtitle}
          </p>
        </div>

        {/* Catalog Grid Pre-Filtered to this Category with Tabs leading to clean URLs */}
        <Suspense
          fallback={
            <div className="min-h-96 flex items-center justify-center text-stone-400 text-sm">
              Kategorie wird geladen...
            </div>
          }
        >
          <ShopCatalog products={products} activeCategorySlug={config.slug} />
        </Suspense>

        {/* Swiss Trust Feature Banner */}
        <div className="pt-10 border-t border-stone-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 rounded-3xl bg-stone-50 border border-stone-200/80">
            <div className="space-y-1.5">
              <span className="text-xl">🇨🇭</span>
              <h4 className="font-bold text-stone-900 text-sm">
                Schweizer Qualität & Versand
              </h4>
              <p className="text-xs text-stone-500 leading-relaxed">
                Schneller A-Post & B-Post Versand direkt aus unserem Schweizer Lager.
              </p>
            </div>

            <div className="space-y-1.5">
              <span className="text-xl">🌿</span>
              <h4 className="font-bold text-stone-900 text-sm">
                100% Frucht – Nichts sonst
              </h4>
              <p className="text-xs text-stone-500 leading-relaxed">
                Kein raffinierter Zucker, keine Schwefelung, 100% vegan und glutenfrei.
              </p>
            </div>

            <div className="space-y-1.5">
              <span className="text-xl">🔒</span>
              <h4 className="font-bold text-stone-900 text-sm">
                Bequeme & sichere Bezahlung
              </h4>
              <p className="text-xs text-stone-500 leading-relaxed">
                TWINT, Kreditkarten und Schweizer QR-Rechnung mit 30 Tagen Zahlungsziel.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
