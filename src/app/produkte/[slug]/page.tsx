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
import { getFruitFamilyInfo } from '@/lib/productForms';
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
  macro_distribution?: MacroItem[];
  faq?: FaqItem[];
  product_variants?: ProductVariant[];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const familyInfo = getFruitFamilyInfo(slug);
  const targetSlug = familyInfo?.dbSlugToFetch || slug;

  let { data: product } = await supabase
    .from('products')
    .select('name_de, subtitle_de, description_de')
    .eq('slug', slug)
    .maybeSingle();

  if (!product && familyInfo?.dbSlugToFetch) {
    const fallback = await supabase
      .from('products')
      .select('name_de, subtitle_de, description_de')
      .eq('slug', familyInfo.dbSlugToFetch)
      .maybeSingle();
    product = fallback.data;
  }

  if (!product && !familyInfo) {
    return {
      title: 'Produkt nicht gefunden | fruit-Comestible Schweiz',
    };
  }

  const productName = familyInfo?.activeForm?.name || product?.name_de || 'Produkt';
  const productDesc =
    familyInfo?.activeForm?.subtitle ||
    product?.subtitle_de ||
    (product?.description_de ? product.description_de.slice(0, 155) : '');

  return {
    title: `${productName} kaufen | fruit-Comestible Schweiz`,
    description: productDesc,
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
  let variants = rawProduct.product_variants || [];

  let displayName = rawProduct.name_de;
  let displaySubtitle = rawProduct.subtitle_de;

  if (familyInfo) {
    displayName = familyInfo.activeForm.name;
    displaySubtitle = familyInfo.activeForm.subtitle || rawProduct.subtitle_de;

    const formMatched = variants.filter((v) =>
      familyInfo.activeForm.variantMatch(v.form_de, v.label_de)
    );
    if (formMatched.length > 0) {
      variants = formMatched;
    }
  }

  const product = {
    ...rawProduct,
    name_de: displayName,
    subtitle_de: displaySubtitle,
  };

  const primaryImage = product.images?.[0];

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans antialiased">
      {/* Top minimal breadcrumb / back bar */}
      <nav className="border-b border-stone-200/80 bg-white/90 backdrop-blur-md sticky top-18 z-20">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-500 hover:text-stone-900 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Zurück zur Übersicht</span>
          </Link>
          <div className="flex items-center gap-2 text-xs font-medium text-stone-400">
            <span>Shop</span>
            <span>/</span>
            <span className="text-stone-800 font-semibold">{product.name_de}</span>
          </div>
        </div>
      </nav>

      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-10 sm:py-16 space-y-20">
        {/* Main 2-Column Product Layout with Generous Whitespace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Image Gallery & Rich Product Story */}
          <div className="lg:col-span-7 space-y-10">
            {/* Gallery with Zoom & Thumbnails */}
            <ProductImageGallery
              images={product.images}
              title={product.name_de}
              originCountry={product.origin_country}
            />

            {/* Product Title, Subtitle and Description in Anthracite Stone */}
            <div className="space-y-4 pt-2">
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

            {/* Premium Quality Highlights in Stone & Natural Hues */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
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

            {/* Ingredients & Specification Details Box */}
            <div className="p-7 rounded-3xl bg-stone-50/70 border border-stone-200/90 space-y-4">
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

          {/* Right Column: Sticky Purchase Selector with Swiss Trust Badges */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <ProductPurchaseSection
              variants={variants}
              productName={product.name_de}
              productId={product.id}
              image={primaryImage}
              availableForms={familyInfo?.siblingLinks || []}
            />
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
            originCountry={product.origin_country}
            productName={product.name_de}
          />
        </section>
      </main>
    </div>
  );
}
