import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { supabase } from '@/lib/supabase';
import HomeReviews from '@/components/HomeReviews';
import HomeBlogPreview from '@/components/HomeBlogPreview';
import NewsletterSection from '@/components/NewsletterSection';
import Hero from '@/components/Hero';
import VisualCategoryGuide from '@/components/VisualCategoryGuide';
import ValuesSection from '@/components/ValuesSection';
import SeoContentSection from '@/components/SeoContentSection';
import BenefitSpotlightCarousel from '@/components/BenefitSpotlightCarousel';
import SnackFinder from '@/components/SnackFinder';
import DailyRecipeCard from '@/components/DailyRecipeCard';
import { getDailyRecipe, type DailyRecipe } from '@/lib/dailyRecipes';
import { FRUIT_FAMILIES } from '@/lib/productForms';
import { getProductDisplayOrigin } from '@/lib/productOrigins';
import { getProductDisplayImage } from '@/lib/utils';
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
  title: 'Gefriergetrocknete Früchte Schweiz | Fruit-Comestible',
  description:
    'Premium gefriergetrocknete Früchte aus der Schweiz. 100% Naturprodukt ohne Zuckerzusatz & ultimativer Crunch. Entdecke gesunde Snacks für deinen Alltag!',
  openGraph: {
    title: 'Gefriergetrocknete Früchte Schweiz | Fruit-Comestible',
    description:
      'Premium gefriergetrocknete Früchte aus der Schweiz. 100% Naturprodukt ohne Zuckerzusatz & ultimativer Crunch.',
    type: 'website',
    locale: 'de_CH',
  },
};

interface ProductVariant {
  id: string;
  weight_grams?: number;
  label_de?: string;
  title?: string;
  form_de?: string;
  form?: string;
  price_chf: number;
  compare_at_price_chf?: number | null;
  sku?: string;
  stock_quantity?: number;
  image_url?: string | null;
  images?: string[] | null;
}

interface ProductItem {
  id: string;
  slug: string;
  name?: string;
  name_de: string;
  subtitle_de?: string;
  description_de?: string;
  origin_country?: string;
  images?: string[];
  image_url?: string | null;
  price_chf?: number | null;
  is_featured?: boolean;
  form?: string;
  category?: string;
  variants?: ProductVariant[];
  product_variants?: ProductVariant[];
}

export default async function HomePage() {
  const { data: productsData } = await supabase
    .from('products')
    .select(`
      *,
      variants:product_variants (
        id,
        title:label_de,
        label_de,
        form:form_de,
        form_de,
        price_chf,
        image_url,
        images,
        weight_grams
      )
    `)
    .order('price_chf', { referencedTable: 'product_variants', ascending: true })
    .order('created_at', { ascending: true });

  const rawProducts = (productsData || []) as any[];
  rawProducts.forEach((p) => {
    p.product_variants = p.variants || p.product_variants || [];
    p.variants = p.variants || p.product_variants || [];
  });
  const products = rawProducts as ProductItem[];

  const { data: blogPostsData } = await supabase
    .from('blog_posts')
    .select(
      'id, slug, title_de, summary_de, category, reading_time_minutes, image_url, cover_image_url, published_at'
    )
    .order('published_at', { ascending: false })
    .limit(3);

  const { data: recipePostsData } = await supabase
    .from('blog_posts')
    .select(
      'id, slug, title_de, summary_de, excerpt_de, cover_image_url, image_url, reading_time_minutes, category, recipe_data, related_product_slugs, published_at'
    )
    .or('category.ilike.%rezept%,recipe_data.not.is.null')
    .order('published_at', { ascending: false });

  // Bestsellers: 6 items (5 on desktop, 6 on mobile/tablet)
  const featuredProducts = products.filter((p) => p.is_featured);
  const bestsellerList = (
    featuredProducts.length >= 6
      ? featuredProducts
      : [...featuredProducts, ...products.filter((p) => !p.is_featured)]
  ).slice(0, 6);

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

  const dbRecipes: DailyRecipe[] = (recipePostsData || []).map((post: any) => {
    let recipeMeta: { prep_time?: string; difficulty?: string; servings?: string } = {};
    if (post.recipe_data) {
      try {
        recipeMeta =
          typeof post.recipe_data === 'string'
            ? JSON.parse(post.recipe_data)
            : post.recipe_data;
      } catch {
        // ignore malformed JSON
      }
    }

    let rawRelatedSlugs: string[] = [];
    if (Array.isArray(post.related_product_slugs)) {
      rawRelatedSlugs = post.related_product_slugs;
    } else if (
      typeof post.related_product_slugs === 'string' &&
      post.related_product_slugs.trim().length > 0
    ) {
      try {
        const parsed = JSON.parse(post.related_product_slugs);
        rawRelatedSlugs = Array.isArray(parsed) ? parsed : [post.related_product_slugs.trim()];
      } catch {
        rawRelatedSlugs = post.related_product_slugs
          .split(',')
          .map((s: string) => s.trim())
          .filter(Boolean);
      }
    }

    let featuredProductSlug: string | undefined;
    let featuredProductName: string | undefined;
    let featuredProductImage: string | undefined;

    for (const rawSlug of rawRelatedSlugs) {
      const clean = String(rawSlug || '').trim().toLowerCase();
      if (!clean) continue;

      let matchedProduct = products.find((p) => p.slug?.toLowerCase() === clean);
      let resolvedName: string | undefined;
      let resolvedSlug: string | undefined;

      if (!matchedProduct) {
        for (const family of FRUIT_FAMILIES) {
          if (family.dbSlug.toLowerCase() === clean) {
            matchedProduct = products.find(
              (p) => p.slug?.toLowerCase() === family.dbSlug.toLowerCase()
            );
            if (matchedProduct) break;
          }
          const matchedForm = family.forms.find(
            (f) =>
              f.slug.toLowerCase() === clean ||
              f.aliases.some((a) => a.toLowerCase() === clean)
          );
          if (matchedForm) {
            matchedProduct = products.find(
              (p) => p.slug?.toLowerCase() === family.dbSlug.toLowerCase()
            );
            if (matchedProduct) {
              resolvedName = matchedForm.name;
              resolvedSlug = matchedForm.slug;
              break;
            }
          }
        }
      }

      if (matchedProduct) {
        featuredProductSlug = resolvedSlug || matchedProduct.slug;
        featuredProductName = resolvedName || matchedProduct.name_de || matchedProduct.name;
        featuredProductImage = getProductDisplayImage(matchedProduct);
        break;
      }
    }

    const cleanImageUrl = String(post.cover_image_url || post.image_url || '').trim();

    return {
      id: post.id,
      slug: post.slug,
      title: post.title_de,
      category: post.category || 'Rezepte',
      prepTime: recipeMeta.prep_time || '10 Min.',
      difficulty: recipeMeta.difficulty || 'Einfach',
      description: post.summary_de || post.excerpt_de || '',
      imageUrl: cleanImageUrl,
      featuredProductSlug,
      featuredProductName,
      featuredProductImage,
      servings: recipeMeta.servings,
    };
  });

  const initialDailyRecipe = getDailyRecipe(dbRecipes);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans antialiased space-y-24 sm:space-y-32 pb-24">
      {/* 1. Interactive Showcase Hero Slider */}
      <Hero />

      {/* 2. Beliebte Bestseller Section */}
      <section id="bestseller" className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-10 scroll-mt-24 !mt-6 sm:!mt-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-extrabold tracking-widest uppercase text-rose-700">
              Von Kunden geschätzt
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-stone-900">
              Unsere Bestseller: Beliebte Fruchtsnacks
            </h2>
            <p className="text-sm sm:text-base text-stone-700 max-w-xl">
              Entdecke unsere gefragtesten gefriergetrockneten Früchte für den
              perfekten Schweizer Frühstückstisch oder als natürliche Energiequelle.
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

        {/* Product Cards: 5 in a single row on desktop, 6 on mobile & tablet */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6 lg:gap-5 xl:gap-6">
          {bestsellerList.slice(0, 6).map((product, index) => {
            const variants = product.variants || product.product_variants || [];
            const prices = variants
              .map((v) => Number(v.price_chf))
              .filter((p) => !isNaN(p) && p > 0);
            const minPrice =
              prices.length > 0
                ? Math.min(...prices)
                : product.price_chf && !isNaN(Number(product.price_chf))
                ? Number(product.price_chf)
                : 15.9;
            const displayImage = getProductDisplayImage(product);

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

            // Form badge indicator
            const cardForm = product.form || variants[0]?.form || variants[0]?.form_de;
            const productHref = `/produkte/${product.slug}`;

            return (
              <Link
                key={product.id}
                href={productHref}
                className={`group flex flex-col bg-white border border-stone-200/90 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xs hover:shadow-md hover:border-stone-300 transition-[box-shadow,border-color] duration-300 h-full ${
                  index >= 5 ? 'lg:hidden' : ''
                }`}
              >
                <div className="relative aspect-square w-full overflow-hidden bg-stone-100 transform-gpu backface-hidden isolate">
                  <Image
                    src={displayImage}
                    alt={product.name_de || product.name || 'Produktbild'}
                    fill
                    unoptimized
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 transform-gpu backface-hidden will-change-transform"
                  />
                  {(() => {
                    const { country: displayCountry, flag: displayFlag } = getProductDisplayOrigin(product);
                    return (
                      <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 flex flex-wrap items-center gap-1 sm:gap-1.5 pointer-events-none">
                        <span className="inline-flex items-center justify-center gap-1 h-5 px-2 rounded-full text-[10px] font-bold leading-none bg-white/95 text-stone-800 backdrop-blur-md border border-stone-200/80 shadow-2xs">
                          <span className="leading-none">{displayFlag}</span>
                          <span className="leading-none">{displayCountry}</span>
                        </span>
                        {(cardForm || product.form) && (cardForm || product.form) !== 'Mix' && (cardForm || product.form) !== 'Box' && (
                          <span className="inline-flex items-center justify-center h-5 px-2 rounded-full text-[10px] font-semibold leading-none bg-stone-900/90 text-white backdrop-blur-md shadow-2xs">
                            <span className="leading-none">{cardForm || product.form}</span>
                          </span>
                        )}
                        <span className="inline-flex items-center justify-center h-5 px-2 rounded-full text-[10px] font-extrabold leading-none bg-rose-700 text-white shadow-2xs">
                          <span className="leading-none">Bestseller</span>
                        </span>
                      </div>
                    );
                  })()}
                </div>

                <div className="flex-1 p-3.5 sm:p-5 flex flex-col justify-between h-full space-y-3 sm:space-y-4">
                  <div className="space-y-1 sm:space-y-1.5">
                    <span className="text-[10px] sm:text-[11px] font-bold text-emerald-700 uppercase tracking-wider block">
                      100% Frucht
                    </span>
                    <h3 className="text-sm sm:text-base md:text-lg font-semibold text-stone-900 leading-snug line-clamp-2 min-h-[2.5rem] sm:min-h-[2.75rem] md:min-h-[3rem] group-hover:text-rose-700 transition">
                      {product.name_de}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-700 line-clamp-2 min-h-[2rem] sm:min-h-[2.5rem] leading-relaxed">
                      {product.subtitle_de || product.description_de || 'Schonend gefriergetrocknete Schweizer Früchte.'}
                    </p>
                  </div>

                  <div className="pt-2.5 sm:pt-3 border-t border-stone-100 space-y-2 sm:space-y-3 mt-auto">
                    <div className="flex flex-col">
                      <span className="text-xs sm:text-sm text-stone-700 font-medium truncate">
                        {packSizesText}
                      </span>
                      <div className="flex items-baseline gap-1 sm:gap-1.5 mt-0.5">
                        <span className="text-sm sm:text-base font-bold text-stone-900 font-sans">
                          Ab CHF {minPrice.toFixed(2)}
                        </span>
                        <span className="text-[9px] sm:text-[10px] text-stone-500 font-medium">
                          (inkl. 2.6% MwSt.)
                        </span>
                      </div>
                    </div>

                    <div className="w-full h-8 sm:h-10 rounded-xl sm:rounded-2xl bg-stone-50 group-hover:bg-stone-900 group-hover:text-white border border-stone-200/80 group-hover:border-stone-900 font-bold text-[11px] sm:text-xs text-stone-800 flex items-center justify-center gap-1.5 transition-all duration-200">
                      <span>Details ansehen</span>
                      <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. Values Section (Warum Fruit-Comestible? Schweizer Qualität & echter Geschmack) */}
      <ValuesSection />

      {/* 4. Visual Category Guide (Nach Verwendung wählen) */}
      <VisualCategoryGuide />

      {/* 4. Interactive Frucht & Snack Finder & Daily Recipe */}
      <section
        id="snack-finder"
        className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 scroll-mt-24 space-y-10"
      >
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-extrabold tracking-widest uppercase text-rose-700">
            Persönliche Empfehlung & Inspiration
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-stone-900">
            Nicht sicher, was am besten passt?
          </h2>
          <p className="text-sm sm:text-base text-stone-700">
            Finde in 3 kurzen Fragen deine perfekten Knusperfrüchte oder entdecke unser frisches Rezept des Tages.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className={initialDailyRecipe ? 'lg:col-span-7 xl:col-span-8 w-full' : 'lg:col-span-12 w-full'}>
            <SnackFinder products={products} />
          </div>
          {initialDailyRecipe && (
            <div className="lg:col-span-5 xl:col-span-4 w-full self-start">
              <DailyRecipeCard recipe={initialDailyRecipe} />
            </div>
          )}
        </div>
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
          <p className="text-base sm:text-lg text-stone-700 leading-relaxed">
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
              <p className="text-sm text-stone-700 leading-relaxed">
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
              <p className="text-sm text-stone-700 leading-relaxed">
                Früchte werden über Stunden mit heisser Luft (60–80°C) dehydriert.
                Hitze und Sauerstoff zerstören empfindliche Nährstoffe und Aromen.
              </p>

              <ul className="space-y-3 pt-2 text-sm text-stone-700">
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

            <div className="p-4 rounded-2xl bg-stone-100 text-xs text-stone-700 font-medium">
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

      {/* 8. SEO Content Section (Vor dem Footer) */}
      <SeoContentSection />
    </div>
  );
}
