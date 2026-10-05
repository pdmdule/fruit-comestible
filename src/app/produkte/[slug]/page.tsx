import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { supabase } from '@/lib/supabase';
import ProductImageGallery from '@/components/ProductImageGallery';
import ProductPurchaseSection, {
  type ProductVariant,
} from '@/components/ProductPurchaseSection';
import ProductNutritionChart, {
  type MacroItem,
} from '@/components/ProductNutritionChart';
import ProductFaq, { type FaqItem } from '@/components/ProductFaq';
import ProductOriginMap from '@/components/ProductOriginMap';
import {
  PRODUCT_ORIGINS,
  getProductOrigin,
  getProductDisplayOrigin,
  type ProductOriginData,
} from '@/data/productOrigins';
import { getFruitFamilyInfo } from '@/lib/productForms';
import Breadcrumbs from '@/components/Breadcrumbs';
import {
  ArrowLeft,
  Check,
  ShieldCheck,
  Utensils,
  Leaf,
  Clock,
  Sparkles,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ slug: string }>;
}

interface ProductRecord {
  id: string;
  slug: string;
  name_de: string;
  subtitle_de?: string;
  description_de?: string;
  origin_country?: string;
  ingredients_de?: string;
  images?: string[];
  form?: string;
  category?: string;
  macro_distribution?: MacroItem[];
  faq?: FaqItem[];
  product_variants?: ProductVariant[];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const familyInfo = getFruitFamilyInfo(slug);

  let { data: product } = await supabase
    .from('products')
    .select('name_de, subtitle_de, description_de, form, images, product_variants(*)')
    .eq('slug', slug)
    .maybeSingle();

  if (!product && familyInfo?.dbSlugToFetch) {
    const fallback = await supabase
      .from('products')
      .select('name_de, subtitle_de, description_de, form, images, product_variants(*)')
      .eq('slug', familyInfo.dbSlugToFetch)
      .maybeSingle();
    product = fallback.data;
  }

  if (!product && !familyInfo) {
    return {
      title: 'Produkt nicht gefunden | fruit-Comestible',
    };
  }

  // Determine fruit name (prioritize DB name_de, e.g. "Gefriergetrocknetes Erdbeerpulver")
  let productName = product?.name_de || familyInfo?.activeForm?.name || 'Gefriergetrocknete Früchte';
  if (!productName.toLowerCase().startsWith('gefriergetrocknet')) {
    productName = `Gefriergetrocknetes ${productName}`;
  }

  // Weight packaging string from variants (e.g. "100g / 200g")
  const variants = (product?.product_variants || []).filter(
    (v: any) => v.weight_grams === 100 || v.weight_grams === 200
  );
  const weights = Array.from(new Set(variants.map((v: any) => v.weight_grams))).sort(
    (a: any, b: any) => a - b
  );
  const weightString = weights.length > 0 ? weights.map((w) => `${w}g`).join(' / ') : '100g / 200g';

  // Target SEO Title: e.g. "Gefriergetrocknetes Erdbeerpulver 100g / 200g kaufen | fruit-Comestible"
  const metaTitle = `${productName} ${weightString} kaufen | fruit-Comestible`;

  // Specific Description tailored to the form
  const formType = product?.form || familyInfo?.activeForm?.form;
  let metaDescription = '';

  if (formType === 'Pulver' || slug.includes('pulver')) {
    metaDescription = `100% reines ${productName} ohne jegliche Zusatzstoffe oder Zuckerzusatz. Reich an natürlichen Vitaminen – ideal für Smoothies, Shakes, Müsli-Bowls und feine Backkreationen. Jetzt in ${weightString} online bestellen.`;
  } else if (formType === 'Granulat' || slug.includes('granulat')) {
    metaDescription = `Herrlich knuspriges ${productName} aus schonend gefriergetrockneten Früchten. Der aromatische Knusper-Crunch für dein tägliches Müsli, Porridge & Desserts. Jetzt in ${weightString} probieren.`;
  } else {
    metaDescription = `${productName} in kompromissloser Schweizer Spitzenqualität. Schonend gefriergetrocknet, intensiv im Geschmack und reich an Vitaminen. Erhältlich in ${weightString}. Schneller Schweizer Post Versand.`;
  }

  if (product?.subtitle_de && !metaDescription) {
    metaDescription = product.subtitle_de;
  }

  const canonicalUrl = `https://fruit-comestible.ch/produkte/${slug}`;
  const ogImage =
    product?.images?.[0] ||
    'https://images.unsplash.com/photo-1543528176-61b239494933?q=80&w=1200&auto=format&fit=crop';

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: canonicalUrl,
      siteName: 'fruit-Comestible Schweiz',
      locale: 'de_CH',
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 800,
          alt: metaTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: [ogImage],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const familyInfo = getFruitFamilyInfo(slug);

  let { data, error } = await supabase
    .from('products')
    .select('*, product_variants(*)')
    .eq('slug', slug)
    .maybeSingle();

  if (!data && familyInfo?.dbSlugToFetch) {
    const fallbackRes = await supabase
      .from('products')
      .select('*, product_variants(*)')
      .eq('slug', familyInfo.dbSlugToFetch)
      .maybeSingle();
    data = fallbackRes.data;
    error = fallbackRes.error;
  }

  if (error || !data) {
    notFound();
  }

  const rawProduct = data as ProductRecord;

  // Sibling forms cross-linking:
  let availableForms = familyInfo?.siblingLinks
    ? familyInfo.siblingLinks.map((link) => ({
        ...link,
        label: link.form === 'Granulat' ? 'Granulat' : link.label,
        isActive: Boolean(
          link.href === `/produkte/${slug}` ||
            (rawProduct.form &&
              link.form.toLowerCase() === rawProduct.form.toLowerCase())
        ),
      }))
    : [];

  // Weight variants: 100g and 200g
  let variants = (rawProduct.product_variants || []).slice();

  // If variants have multiple forms from legacy db rows, filter only those matching this product's form
  if (rawProduct.form) {
    const matched = variants.filter(
      (v) => !v.form_de || v.form_de.toLowerCase() === rawProduct.form?.toLowerCase()
    );
    if (matched.length > 0) {
      variants = matched;
    }
  } else if (familyInfo) {
    const formMatched = variants.filter((v) =>
      familyInfo.activeForm.variantMatch(v.form_de, v.label_de)
    );
    if (formMatched.length > 0) {
      variants = formMatched;
    }
  }

  // Sort weight variants: 100g first, then 200g
  variants.sort((a, b) => (a.weight_grams || 0) - (b.weight_grams || 0));

  // Authentic product origin strictly mapped per product slug (no category generalization)
  const currentOrigin: ProductOriginData =
    PRODUCT_ORIGINS[slug] ||
    PRODUCT_ORIGINS[rawProduct.slug] ||
    getProductOrigin(slug, rawProduct.origin_country);

  const displayOrigin = getProductDisplayOrigin({
    slug,
    name_de: rawProduct.name_de,
    origin_country: currentOrigin.country,
  });

  const product = {
    ...rawProduct,
    slug,
    origin_country: currentOrigin.country,
    name_de: rawProduct.name_de || familyInfo?.activeForm.name || 'Gefriergetrocknete Früchte',
    subtitle_de: rawProduct.subtitle_de || familyInfo?.activeForm.subtitle || '',
  };

  const primaryImage = product.images?.[0];

  // Dynamic category and form mapping for breadcrumbs
  const formValue = (rawProduct.form || familyInfo?.activeForm?.form || '').toLowerCase();
  const catValue = (rawProduct.category || '').toLowerCase();
  const slugLower = slug.toLowerCase();

  let categoryLabel = 'Früchte & Beeren';
  let categoryHref = '/shop/beeren';

  if (catValue.includes('schokolade') || slugLower.includes('schokolade')) {
    categoryLabel = 'Schokolade';
    categoryHref = '/shop/schokolade';
  } else if (catValue.includes('geschenk') || catValue.includes('box') || slugLower.includes('box')) {
    categoryLabel = 'Geschenkboxen';
    categoryHref = '/shop/geschenkboxen';
  } else if (
    catValue.includes('snack') ||
    catValue.includes('mix') ||
    slugLower.includes('snack') ||
    slugLower.includes('probier') ||
    slugLower.includes('booster')
  ) {
    categoryLabel = 'Snacks & Mixes';
    categoryHref = '/shop/mixes';
  } else if (formValue === 'pulver' || slugLower.includes('pulver') || catValue.includes('pulver')) {
    categoryLabel = 'Fruchtpulver';
    categoryHref = '/shop/fruchtpulver';
  } else if (formValue === 'granulat' || slugLower.includes('granulat') || catValue.includes('granulat') || catValue.includes('crunch')) {
    categoryLabel = 'Granulat & Crunch';
    categoryHref = '/shop/granulat';
  } else {
    categoryLabel = 'Ganze Früchte';
    categoryHref = '/shop/beeren';
  }

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans antialiased">
      {/* Top minimal breadcrumb / back bar */}
      <nav className="border-b border-stone-200/80 bg-white/95 backdrop-blur-md sticky top-18 sm:top-20 z-20">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-3.5 flex items-center justify-between gap-4 text-xs">
          <div className="flex-1 min-w-0">
            <Breadcrumbs
              customItems={[
                { label: 'Shop', href: '/shop' },
                { label: categoryLabel, href: categoryHref },
                { label: product.name_de },
              ]}
            />
          </div>
          <Link
            href={categoryHref || '/shop'}
            className="hidden md:inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-500 hover:text-stone-900 transition shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Zurück zur Übersicht</span>
          </Link>
        </div>
      </nav>

      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-10 sm:py-16 space-y-20">
        {/* Main 2-Column Product Layout with Generous Whitespace */}
        <div className="flex flex-col w-full items-stretch lg:grid lg:grid-cols-12 gap-8 lg:gap-16 lg:items-start">
          {/* Left Column: Image Gallery & Rich Product Story */}
          <div className="contents lg:block lg:col-span-7 lg:space-y-10">
            {/* 1. Gallery with Zoom & Thumbnails (order-1 on mobile) */}
            <div className="order-1 lg:order-none w-full">
              <ProductImageGallery
                images={product.images}
                title={product.name_de}
                originCountry={product.origin_country}
              />
            </div>

            {/* 2. Product Title, Subtitle and Description (order-2 on mobile) */}
            <div className="order-2 lg:order-none w-full space-y-4 pt-2">
              <span className="text-xs font-extrabold tracking-widest uppercase text-rose-600">
                100% Natürliche Beeren & Früchte
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-stone-900 leading-tight">
                {product.name_de}
              </h1>
              {product.subtitle_de && (
                <p className="text-lg sm:text-xl text-stone-600 font-medium leading-snug">
                  {product.subtitle_de}
                </p>
              )}

              {product.description_de && (
                <div className="pt-3 text-stone-600 text-base leading-relaxed space-y-3">
                  <p>{product.description_de}</p>
                </div>
              )}
            </div>

            {/* 4. Premium Quality Highlights (order-4 on mobile) */}
            <div className="order-4 lg:order-none w-full grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
              <div className="p-4 rounded-3xl bg-stone-50 border border-stone-200/80 space-y-1.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-1">
                  <Leaf className="w-4 h-4 stroke-[2.5]" />
                </div>
                <h3 className="text-sm font-bold text-stone-900">
                  100% Frucht & Vegan
                </h3>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Frei von Industriezucker, künstlichen Aromen und Zusätzen.
                </p>
              </div>

              <div className="p-4 rounded-3xl bg-stone-50 border border-stone-200/80 space-y-1.5">
                <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center mb-1">
                  <Sparkles className="w-4 h-4 stroke-[2.5]" />
                </div>
                <h3 className="text-sm font-bold text-stone-900">
                  Schonendes Vakuum
                </h3>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Liofilisation bewahrt bis zu 95% der Vitamine & Struktur.
                </p>
              </div>

              <div className="p-4 rounded-3xl bg-stone-50 border border-stone-200/80 space-y-1.5">
                <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-1">
                  <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
                </div>
                <h3 className="text-sm font-bold text-stone-900">
                  Schweizer Standard
                </h3>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Streng kontrollierte Rohstoffe und höchste Reinheit.
                </p>
              </div>
            </div>

            {/* 5. Ingredients & Specification Details Box (order-5 on mobile) */}
            <div className="order-5 lg:order-none w-full p-7 rounded-3xl bg-stone-50/70 border border-stone-200/90 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400">
                Produktspezifikation
              </h3>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
                <div>
                  <dt className="text-xs font-medium text-stone-500">Zutaten</dt>
                  <dd className="font-bold text-stone-900 mt-1">
                    {product.ingredients_de || '100% gefriergetrocknete Früchte'}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-stone-500">Herkunftsland</dt>
                  <dd className="font-bold text-stone-900 mt-1">
                    {product.origin_country || 'Schweiz / Europa'}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-stone-500">Lagerung</dt>
                  <dd className="font-bold text-stone-900 mt-1">
                    Kühl, trocken und lichtgeschützt
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-stone-500">Besonderheit</dt>
                  <dd className="font-bold text-stone-900 mt-1">
                    Ohne Gentechnik (GVO-frei) & glutenfrei
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Right Column: Sticky Purchase Selector (order-3 on mobile) */}
          <div className="contents lg:block lg:col-span-5 lg:sticky lg:top-28">
            <div className="order-3 lg:order-none w-full">
              <ProductPurchaseSection
                variants={variants}
                productName={product.name_de}
                productId={product.id}
                image={primaryImage}
                availableForms={availableForms}
              />
            </div>
          </div>
        </div>

        {/* Lower Section: Nutrition Donut Chart & FAQ Accordion */}
        <div className="pt-16 border-t border-stone-200 space-y-12">
          <div className="space-y-1.5">
            <span className="text-xs font-extrabold tracking-widest uppercase text-stone-400">
              Transparenz & Qualität
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-stone-900">
              Nährwerte & Häufige Fragen
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Recharts Macronutrient Breakdown */}
            <div className="lg:col-span-6">
              <ProductNutritionChart
                macroDistribution={product.macro_distribution}
              />
            </div>

            {/* Accessible FAQ Accordion */}
            <div className="lg:col-span-6">
              <ProductFaq
                faq={product.faq}
                productName={product.name_de}
              />
            </div>
          </div>
        </div>

        {/* Origin Map Section: Woher kommt deine Frucht? */}
        <section className="pt-16 border-t border-stone-200 space-y-6">
          <div className="space-y-1.5">
            <span className="text-xs font-extrabold tracking-widest uppercase text-rose-600">
              Herkunft & Anbau
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-stone-900">
              Woher kommt deine Frucht?
            </h2>
            <p className="text-base text-stone-600">
              Transparenz vom Feld bis in den Aromabeutel.
            </p>
          </div>

          <ProductOriginMap
            slug={product.slug}
            originCountry={currentOrigin.country}
            productName={product.name_de}
            originData={currentOrigin}
          />
        </section>
      </main>
    </div>
  );
}
