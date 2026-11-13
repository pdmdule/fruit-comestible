'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ProductDetails from '@/components/ProductDetails';
import type { ProductVariant, FormLink } from '@/components/ProductPurchaseSection';
import ProductNutritionChart, {
  type MacroItem,
} from '@/components/ProductNutritionChart';
import ProductFaq, { type FaqItem } from '@/components/ProductFaq';
import ProductOriginMap from '@/components/ProductOriginMap';
import SuggestedProducts from '@/components/SuggestedProducts';
import ProductReviewsSection from '@/components/ProductReviewsSection';
import Breadcrumbs from '@/components/Breadcrumbs';
import type { ProductOriginData } from '@/data/productOrigins';
import type { ProductReview, ProductReviewsSummary } from '@/types/reviews';

export interface ProductRecordData {
  id: string;
  slug: string;
  name?: string;
  name_de: string;
  subtitle_de?: string;
  short_description_de?: string;
  description_de?: string;
  origin_country?: string;
  ingredients_de?: string;
  images?: string[];
  image_url?: string | null;
  bowl_image_url?: string | null;
  form?: string;
  category?: string;
  macro_distribution?: MacroItem[];
  nutritional_values?: MacroItem[];
  faq?: FaqItem[];
}

export interface ProductPageEntry {
  product: ProductRecordData;
  variants: ProductVariant[];
  originData: ProductOriginData;
  categoryLabel: string;
  categoryHref: string;
  formName: string;
  formLabel: string;
}

interface ProductPageClientProps {
  initialProductSlug: string;
  siblingProducts: ProductPageEntry[];
  initialReviewsByProductId: Record<string, ProductReview[]>;
  catalogProducts: any[];
  initialForm?: string;
  initialVariantId?: string;
}

function computeReviewsSummary(reviews: ProductReview[]): ProductReviewsSummary {
  const totalReviews = reviews.length;
  const averageRating =
    totalReviews > 0
      ? Number(
          (
            reviews.reduce((acc, r) => acc + (Number(r.rating) || 0), 0) /
            totalReviews
          ).toFixed(1)
        )
      : 0;
  return { averageRating, totalReviews };
}

export default function ProductPageClient({
  initialProductSlug,
  siblingProducts,
  initialReviewsByProductId,
  catalogProducts,
  initialForm,
  initialVariantId,
}: ProductPageClientProps) {
  const [activeSlug, setActiveSlug] = useState<string>(initialProductSlug);
  const [preferredWeight, setPreferredWeight] = useState<number | undefined>(
    undefined
  );
  const [reviewsByProductId, setReviewsByProductId] = useState<
    Record<string, ProductReview[]>
  >(initialReviewsByProductId);

  const activeEntry = useMemo(() => {
    return (
      siblingProducts.find(
        (entry) =>
          entry.product.slug.toLowerCase() === activeSlug.toLowerCase()
      ) || siblingProducts[0]
    );
  }, [siblingProducts, activeSlug]);

  const activeProduct = activeEntry.product;

  // Keep state synchronized if user navigates with browser Back / Forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const pathMatch = window.location.pathname.match(/^\/produkte\/([^/?#]+)/);
      if (pathMatch && pathMatch[1]) {
        const slugFromUrl = decodeURIComponent(pathMatch[1]);
        const matched = siblingProducts.find(
          (e) => e.product.slug.toLowerCase() === slugFromUrl.toLowerCase()
        );
        if (matched) {
          setActiveSlug(matched.product.slug);
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [siblingProducts]);

  const handleFormSelect = useCallback(
    (targetSlug: string, _formName: string, currentWeightGrams?: number) => {
      const nextEntry = siblingProducts.find(
        (e) => e.product.slug.toLowerCase() === targetSlug.toLowerCase()
      );
      if (!nextEntry) return;

      setPreferredWeight(currentWeightGrams);
      setActiveSlug(nextEntry.product.slug);

      if (typeof window !== 'undefined') {
        window.history.pushState(
          { productSlug: nextEntry.product.slug },
          '',
          `/produkte/${nextEntry.product.slug}`
        );
        if (nextEntry.product.name_de) {
          document.title = `${nextEntry.product.name_de} | fruit-Comestible`;
        }
      }
    },
    [siblingProducts]
  );

  const handleReviewsChange = useCallback(
    (productId: string, loadedReviews: ProductReview[]) => {
      setReviewsByProductId((prev) => {
        const current = prev[productId];
        if (
          current &&
          current.length === loadedReviews.length &&
          current.every((r, idx) => r.id === loadedReviews[idx]?.id)
        ) {
          return prev;
        }
        return { ...prev, [productId]: loadedReviews };
      });
    },
    []
  );

  const availableForms: FormLink[] = useMemo(() => {
    if (siblingProducts.length <= 1) return [];
    return siblingProducts.map((entry) => ({
      form: entry.formName,
      label: entry.formLabel,
      href: `/produkte/${entry.product.slug}`,
      targetSlug: entry.product.slug,
      productId: entry.product.id,
      isActive: entry.product.id === activeProduct.id,
    }));
  }, [siblingProducts, activeProduct.id]);

  const activeReviews = reviewsByProductId[activeProduct.id] || [];
  const activeReviewsSummary = useMemo(
    () => computeReviewsSummary(activeReviews),
    [activeReviews]
  );

  const primaryImage =
    activeProduct.images?.[0] ||
    activeProduct.image_url ||
    activeProduct.bowl_image_url ||
    undefined;

  const isInitialSlug =
    activeProduct.slug.toLowerCase() === initialProductSlug.toLowerCase();

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans antialiased">
      {/* Top minimal breadcrumb / back bar */}
      <nav className="border-b border-stone-200/80 bg-white/95 backdrop-blur-md sticky top-18 sm:top-20 z-20">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-3.5 flex items-center justify-between gap-4 text-xs">
          <div className="flex-1 min-w-0">
            <Breadcrumbs
              customItems={[
                { label: 'Shop', href: '/shop' },
                { label: activeEntry.categoryLabel, href: activeEntry.categoryHref },
                { label: activeProduct.name_de },
              ]}
            />
          </div>
          <Link
            href={activeEntry.categoryHref || '/shop'}
            className="hidden md:inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-500 hover:text-stone-900 transition shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Zurück zur Übersicht</span>
          </Link>
        </div>
      </nav>

      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-10 sm:py-16 space-y-20">
        {/* Main 2-Column Product Layout with Dynamic Gallery & Purchase Section */}
        <React.Suspense fallback={<div className="min-h-[500px]" />}>
          <ProductDetails
            key={activeProduct.id}
            product={activeProduct}
            variants={activeEntry.variants}
            availableForms={availableForms}
            primaryImage={primaryImage}
            initialForm={isInitialSlug ? initialForm : undefined}
            initialVariantId={isInitialSlug ? initialVariantId : undefined}
            preferredWeight={preferredWeight}
            onFormSelect={handleFormSelect}
            reviewsSummary={activeReviewsSummary}
          />
        </React.Suspense>

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
                key={`nutrition-${activeProduct.id}`}
                macroDistribution={
                  activeProduct.macro_distribution ||
                  activeProduct.nutritional_values
                }
              />
            </div>

            {/* Accessible FAQ Accordion */}
            <div className="lg:col-span-6">
              <ProductFaq
                key={`faq-${activeProduct.id}`}
                faq={activeProduct.faq}
                productName={activeProduct.name_de}
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
            key={`origin-${activeProduct.id}`}
            slug={activeProduct.slug}
            originCountry={activeEntry.originData.country}
            productName={activeProduct.name_de}
            originData={activeEntry.originData}
          />
        </section>

        {/* Customer Reviews Section */}
        <ProductReviewsSection
          key={activeProduct.id}
          productId={activeProduct.id}
          productName={activeProduct.name_de}
          reviews={activeReviews}
          summary={activeReviewsSummary}
          onReviewsChange={handleReviewsChange}
        />

        {/* Suggested Products Section: Das könnte dir auch gefallen */}
        <SuggestedProducts
          key={`suggested-${activeProduct.id}`}
          currentSlug={activeProduct.slug}
          allProducts={catalogProducts}
        />
      </main>
    </div>
  );
}
