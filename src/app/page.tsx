import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { supabase } from '@/lib/supabase';
import HomeReviews from '@/components/HomeReviews';
import HomeBlogPreview from '@/components/HomeBlogPreview';
import NewsletterSection from '@/components/NewsletterSection';
import HeroSlider from '@/components/HeroSlider';
import VisualCategoryGuide from '@/components/VisualCategoryGuide';
import SnackFinder from '@/components/SnackFinder';
import {
  ArrowRight,
  Leaf,
  Microscope,
  Truck,
  Zap,
  CheckCircle2,
  XCircle,
  Star,
  Sparkles,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Fruit Comestible Suisse | 100% Pure Frucht. Knusprig. Intensiv.',
  description:
    'Schonend gefriergetrocknete Beeren und Früchte voller Vitamine und Aroma – ohne Zuckerzusatz, ohne Konservierungsstoffe. Schneller Schweizer Post Versand.',
};

interface ProductVariant {
  id: string;
  weight_grams?: number;
  label_de?: string;
  form_de?: string;
  price_chf: number;
}

interface ProductItem {
  id: string;
  slug: string;
  name_de: string;
  subtitle_de?: string;
  description_de?: string;
  origin_country?: string;
  images?: string[];
  is_featured?: boolean;
  product_variants?: ProductVariant[];
}

export default async function HomePage() {
  const { data: productsData } = await supabase
    .from('products')
    .select('*, product_variants(*)')
    .order('created_at', { ascending: true });

  const { data: blogPostsData } = await supabase
    .from('blog_posts')
    .select(
      'id, slug, title_de, summary_de, category, reading_time_minutes, image_url, cover_image_url, published_at'
    )
    .order('published_at', { ascending: false })
    .limit(3);

  const products = (productsData || []) as ProductItem[];

  // Bestsellers: exactly 5 items
  const featuredProducts = products.filter((p) => p.is_featured);
  const bestsellerList = (
    featuredProducts.length >= 5
      ? featuredProducts
      : [...featuredProducts, ...products.filter((p) => !p.is_featured)]
  ).slice(0, 5);

  const homeBlogPosts = (blogPostsData || []).map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title_de,
    excerpt: p.summary_de || '',
    category: p.category,
    read_time: p.reading_time_minutes
      ? `${p.reading_time_minutes} Min. Lesezeit`
      : undefined,
    image: p.image_url || p.cover_image_url,
    created_at: p.published_at,
  }));

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans antialiased space-y-24 sm:space-y-32 pb-24">
      {/* 1. Interactive Hero Slider */}
      <HeroSlider />

      {/* 2. Visual Category Guide (Nach Verwendung wählen) */}
      <VisualCategoryGuide />

      {/* 3. USPs (4 Icons in a row) */}
      <section className="border-y border-stone-200/80 bg-white py-12 sm:py-16">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {/* USP 1 */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <Leaf className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div className="space-y-1">
                <h2 className="font-extrabold text-stone-900 text-base">
                  100% Natürlich
                </h2>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Ohne Zuckerzusatz, rein pflanzlich, vegan und von Natur aus
                  glutenfrei.
                </p>
              </div>
            </div>

            {/* USP 2 */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                <Microscope className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div className="space-y-1">
                <h2 className="font-extrabold text-stone-900 text-base">
                  Schonend gefriergetrocknet
                </h2>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Bis zu 95% der Vitamine & Mineralstoffe bleiben erhalten.
                </p>
              </div>
            </div>

            {/* USP 3 */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-700 flex items-center justify-center shrink-0">
                <Truck className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div className="space-y-1">
                <h2 className="font-extrabold text-stone-900 text-base">
                  Schweizer Standard
                </h2>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Schneller, klimaneutraler Versand mit der Schweizer Post.
                </p>
              </div>
            </div>

            {/* USP 4 */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                <Zap className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div className="space-y-1">
                <h2 className="font-extrabold text-stone-900 text-base">
                  Vielseitig geniessbar
                </h2>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Perfekt für Müsli, Porridge, Smoothies oder einfach pur als Snack.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Beliebte Bestseller Section */}
      <section id="bestseller" className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-10 scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-extrabold tracking-widest uppercase text-rose-700">
              Von Kunden geschätzt
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-stone-900">
              Beliebte Bestseller
            </h2>
            <p className="text-sm sm:text-base text-stone-600 max-w-xl">
              Entdecken Sie unsere gefragtesten gefriergetrockneten Früchte für den
              perfekten Schweizer Frühstückstisch.
            </p>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm font-bold text-rose-700 hover:text-rose-800 transition"
          >
            <span>Gesamtes Sortiment (25+ Sorten)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Product Cards: 5 in a single row on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {bestsellerList.map((product) => {
            const variants = product.product_variants || [];
            const prices = variants.map((v) => Number(v.price_chf)).filter(Boolean);
            const minPrice = prices.length > 0 ? Math.min(...prices) : 15.9;
            const primaryImage =
              product.images?.[0] ||
              'https://images.unsplash.com/photo-1543528176-61b239494933?q=80&w=800&auto=format&fit=crop';

            // Available pack sizes
            const weights = Array.from(
              new Set(
                variants
                  .map((v) => v.weight_grams)
                  .filter(Boolean)
              )
            ).sort((a, b) => Number(a) - Number(b));
            const packSizesText =
              weights.length > 0
                ? `Erhältlich in ${weights.map((w) => `${w}g`).join(' & ')}`
                : '100% reine Frucht';

            return (
              <Link
                key={product.id}
                href={`/produkte/${product.slug}`}
                className="group flex flex-col bg-white border border-stone-200/90 rounded-3xl overflow-hidden shadow-2xs hover:shadow-md hover:border-stone-300 transition-all duration-300 h-full"
              >
                <div className="relative aspect-square w-full overflow-hidden bg-stone-100">
                  <Image
                    src={primaryImage}
                    alt={product.name_de}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 pointer-events-none">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/95 text-stone-800 backdrop-blur-md border border-stone-200/80 shadow-2xs">
                      🇨🇭 {product.origin_country || 'Schweiz'}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-700 text-white shadow-2xs">
                      Bestseller
                    </span>
                  </div>
                </div>

                <div className="flex-1 p-5 flex flex-col justify-between h-full space-y-4">
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block">
                      100% Frucht
                    </span>
                    <h3 className="text-base md:text-lg font-semibold text-stone-900 leading-snug line-clamp-2 min-h-[2.75rem] md:min-h-[3rem] group-hover:text-rose-700 transition">
                      {product.name_de}
                    </h3>
                    <p className="text-sm text-stone-600 line-clamp-2 min-h-[2.5rem] leading-relaxed">
                      {product.subtitle_de || product.description_de || 'Schonend gefriergetrocknete Schweizer Früchte.'}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-stone-100 space-y-3 mt-auto">
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
      </section>

      {/* 4. Interactive Frucht & Snack Finder */}
      <section id="snack-finder" className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 scroll-mt-24 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-extrabold tracking-widest uppercase text-rose-700">
            Persönliche Empfehlung
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-stone-900">
            Nicht sicher, was am besten passt?
          </h2>
          <p className="text-sm sm:text-base text-stone-600">
            Finde in 3 kurzen Fragen deine perfekten Knusperfrüchte.
          </p>
        </div>

        <SnackFinder products={products} />
      </section>

      {/* 5. Customer Reviews Section */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <HomeReviews />
      </section>

      {/* 5. Educational Block: Was ist Gefriertrocknung? */}
      <section
        id="gefriertrocknung"
        className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 scroll-mt-24 space-y-12"
      >
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-extrabold tracking-widest uppercase text-rose-700">
            Wissenschaft & Natur
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-stone-900">
            Was ist Gefriertrocknung (Liofilisation)?
          </h2>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
            Die Gefriertrocknung ist die schonendste Methode zur Haltbarmachung von
            Lebensmitteln. Dabei wird den Früchten das Wasser im Vakuum durch
            direkte Sublimation entzogen – von Eis direkt zu Dampf, ohne flüssige
            Zwischenphase.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Superior: Gefriertrocknung */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white border-2 border-rose-600/30 shadow-sm space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-700 text-white text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Fruit Comestible Verfahren</span>
              </div>
              <h3 className="text-2xl font-extrabold text-stone-900">
                Schonende Vakuum-Gefriertrocknung
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Tiefgefroren bei minus 40 Grad wird das Wasser im Hochvakuum sanft
                abgesaugt. Zellstruktur, Vitamine und Aromastoffe bleiben
                vollständig unbeschädigt.
              </p>

              <ul className="space-y-3 pt-2 text-sm">
                <li className="flex items-center gap-2.5 text-stone-800">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span><strong>Bis zu 95% Nährstoffe:</strong> Vitamine & Antioxidantien intakt</span>
                </li>
                <li className="flex items-center gap-2.5 text-stone-800">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span><strong>Herrlich knusprig:</strong> Schmilzt aromatisch auf der Zunge</span>
                </li>
                <li className="flex items-center gap-2.5 text-stone-800">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span><strong>Natürliche Farbe:</strong> Kein Nachdunkeln, leuchtend rot</span>
                </li>
                <li className="flex items-center gap-2.5 text-stone-800">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span><strong>100% Rein:</strong> Ohne Zucker, Schwefel oder Konservierungsstoffe</span>
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-200 text-xs text-rose-950 font-medium">
              Ergebnis: Eine ultraleichte, knusprige Beere mit dem intensiven Geschmack frischer Sommererdbeeren.
            </div>
          </div>

          {/* Inferior: Konventionell */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-stone-200/80 shadow-xs space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 text-stone-700 text-xs font-bold">
                <span>Herkömmliches Verfahren</span>
              </div>
              <h3 className="text-2xl font-extrabold text-stone-700">
                Konventionelle Heisslufttrocknung
              </h3>
              <p className="text-sm text-stone-500 leading-relaxed">
                Früchte werden über Stunden mit heisser Luft (60–80°C) dehydriert.
                Hitze und Sauerstoff zerstören empfindliche Nährstoffe und Aromen.
              </p>

              <ul className="space-y-3 pt-2 text-sm text-stone-600">
                <li className="flex items-center gap-2.5">
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                  <span><strong>Hoher Vitaminverlust:</strong> Hitzeempfindliche Vitamine zerstört</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                  <span><strong>Zähe Konsistenz:</strong> Schrumpelig, ledrig und schwer kaubar</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                  <span><strong>Häufig Zusätze:</strong> Oft mit Zucker, Öl oder Schwefeldioxid versetzt</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                  <span><strong>Dunkle Farbe:</strong> Durch Oxidation verblasst das natürliche Fruchtbild</span>
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-stone-100 text-xs text-stone-600 font-medium">
              Herkömmliche Trockenfrüchte kleben oft an den Zähnen und enthalten meist versteckte Zuckerzusätze.
            </div>
          </div>
        </div>
      </section>

      {/* 6. Blog Magazine Preview */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <HomeBlogPreview posts={homeBlogPosts} />
      </section>

      {/* 7. Newsletter Discount Section */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <NewsletterSection />
      </section>
    </div>
  );
}
