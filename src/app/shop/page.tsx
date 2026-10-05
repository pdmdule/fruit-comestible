import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import ShopCatalog, { type ProductItem } from '@/components/ShopCatalog';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getCategoryConfig } from '@/lib/categoryConfig';
import { Sparkles, Truck, ShieldCheck, ArrowLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Unser Fruchtsortiment | Fruit Comestible Suisse',
  description:
    'Entdecken Sie unsere 100% naturbelassenen, gefriergetrockneten Früchte. Ohne Zuckerzusatz, reich an Vitaminen, direkt aus der Schweiz versendet.',
  alternates: {
    canonical: 'https://fruit-comestible.ch/shop',
  },
  openGraph: {
    title: 'Unser Fruchtsortiment | Fruit Comestible Suisse',
    description:
      'Entdecken Sie unsere 100% naturbelassenen, gefriergetrockneten Früchte. Ohne Zuckerzusatz, reich an Vitaminen, direkt aus der Schweiz versendet.',
    url: 'https://fruit-comestible.ch/shop',
    siteName: 'fruit-Comestible Schweiz',
    locale: 'de_CH',
    type: 'website',
  },
};

interface ShopPageProps {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  // Support legacy query parameter redirects (e.g. /shop?kategorie=granulat -> /shop/granulat)
  if (searchParams) {
    const resolvedParams = await searchParams;
    const kategorie = resolvedParams?.kategorie;
    if (typeof kategorie === 'string' && kategorie.trim()) {
      const config = getCategoryConfig(kategorie.trim());
      if (config) {
        redirect(config.canonicalPath);
      }
    }
  }

  const { data, error } = await supabase
    .from('products')
    .select('*, product_variants(*)')
    .order('created_at', { ascending: false });

  const products = (data || []) as ProductItem[];

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans antialiased">
      {/* Top Banner / Breadcrumb */}
      <div className="border-b border-stone-200/80 bg-white">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <Breadcrumbs customItems={[{ label: 'Shop' }]} />
          <div className="flex items-center gap-2 text-emerald-800 font-medium shrink-0">
            <Truck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Kostenloser Schweizer Post Versand ab CHF 80.–</span>
          </div>
        </div>
      </div>

      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-10 sm:py-16 space-y-12">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-extrabold tracking-widest uppercase text-rose-600">
            Schweizer Naturprodukte
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-stone-900">
            Unser Fruchtsortiment
          </h1>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
            Schonend gefriergetrocknete Früchte in kompromissloser Schweizer
            Premium-Qualität. 100% naturbelassen, herrlich knusprig und intensiv im
            Aroma – frei von jeglichem Zuckerzusatz oder Konservierungsstoffen.
          </p>
        </div>

        {/* Catalog Grid with Category Filter */}
        <Suspense fallback={<div className="min-h-96 flex items-center justify-center text-stone-400 text-sm">Sortiment wird geladen...</div>}>
          <ShopCatalog products={products} activeCategorySlug="all" />
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
