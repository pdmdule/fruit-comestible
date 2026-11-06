import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { supabase } from '@/lib/supabase';
import ProductDetails from '@/components/ProductDetails';
import { type ProductVariant } from '@/components/ProductPurchaseSection';
import ProductNutritionChart, {
  type MacroItem,
} from '@/components/ProductNutritionChart';
import ProductFaq, { type FaqItem } from '@/components/ProductFaq';
import ProductOriginMap from '@/components/ProductOriginMap';
import SuggestedProducts from '@/components/SuggestedProducts';
import {
  PRODUCT_ORIGINS,
  getProductOrigin,
  getProductDisplayOrigin,
  type ProductOriginData,
} from '@/data/productOrigins';
import { getFruitFamilyInfo, expandProductsForCatalog } from '@/lib/productForms';
import Breadcrumbs from '@/components/Breadcrumbs';
import { ArrowLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

interface ProductRecord {
  id: string;
  slug: string;
  name?: string;
  name_de: string;
  subtitle_de?: string;
  description_de?: string;
  origin_country?: string;
  ingredients_de?: string;
  images?: string[];
  image_url?: string | null;
  form?: string;
  category?: string;
  macro_distribution?: MacroItem[];
  nutritional_values?: MacroItem[];
  faq?: FaqItem[];
  variants?: ProductVariant[];
  product_variants?: ProductVariant[];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const familyInfo = getFruitFamilyInfo(slug);

  let { data: product } = await supabase
    .from('products')
    .select(`
      name_de,
      subtitle_de,
      description_de,
      form,
      images,
      variants:product_variants (
        id,
        weight_grams,
        price_chf,
        stock_quantity,
        form:form_de,
        form_de,
        label_de,
        sku,
        image_url,
        images
      )
    `)
    .eq('slug', slug)
    .maybeSingle();

  if (!product && familyInfo?.dbSlugToFetch) {
    const fallback = await supabase
      .from('products')
      .select(`
        name_de,
        subtitle_de,
        description_de,
        form,
        images,
        variants:product_variants (
          id,
          weight_grams,
          price_chf,
          stock_quantity,
          form:form_de,
          form_de,
          label_de,
          sku,
          image_url,
          images
        )
      `)
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
  const rawMetadataVariants = ((product as any)?.variants || (product as any)?.product_variants || []);
  const variants = rawMetadataVariants.filter(
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

export default async function ProductDetailPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const initialForm =
    typeof resolvedSearchParams.form === 'string'
      ? resolvedSearchParams.form
      : undefined;
  const initialVariantId =
    typeof resolvedSearchParams.variant === 'string'
      ? resolvedSearchParams.variant
      : undefined;

  const familyInfo = getFruitFamilyInfo(slug);

  const [productRes, allProductsRes] = await Promise.all([
    supabase
      .from('products')
      .select(`
        *,
        variants:product_variants (
          id,
          weight_grams,
          price_chf,
          stock_quantity,
          form:form_de,
          form_de,
          label_de,
          sku,
          image_url,
          images
        )
      `)
      .eq('slug', slug)
      .maybeSingle(),
    supabase
      .from('products')
      .select(`
        *,
        variants:product_variants (
          id,
          weight_grams,
          price_chf,
          stock_quantity,
          form:form_de,
          form_de,
          label_de,
          sku,
          image_url,
          images
        )
      `)
      .order('created_at', { ascending: false }),
  ]);

  let data = productRes.data;
  let error = productRes.error;

  if (!data && familyInfo?.dbSlugToFetch) {
    const fallbackRes = await supabase
      .from('products')
      .select(`
        *,
        variants:product_variants (
          id,
          weight_grams,
          price_chf,
          stock_quantity,
          form:form_de,
          form_de,
          label_de,
          sku,
          image_url,
          images
        )
      `)
      .eq('slug', familyInfo.dbSlugToFetch)
      .maybeSingle();
    data = fallbackRes.data;
    error = fallbackRes.error;
  }

  if (error || !data) {
    notFound();
  }

  const rawProduct = data as ProductRecord;
  rawProduct.product_variants = rawProduct.variants || rawProduct.product_variants || [];
  rawProduct.variants = rawProduct.variants || rawProduct.product_variants || [];

  (allProductsRes.data || []).forEach((p: any) => {
    p.product_variants = p.variants || p.product_variants || [];
    p.variants = p.variants || p.product_variants || [];
  });

  const catalogProducts = expandProductsForCatalog(allProductsRes.data || []);

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

  // Weight & Form variants: include all variants from this product
  let rawVariants: ProductVariant[] = (rawProduct.variants || []).map((v: any) => {
    const vForm = v.form || v.form_de || rawProduct.form || 'Ganz';
    const formDef = familyInfo?.family?.forms.find(
      (f) => f.form.toLowerCase() === vForm.toLowerCase()
    );
    return {
      ...v,
      form: vForm,
      form_de: v.form_de || vForm,
      title: v.title || formDef?.name || rawProduct.name_de,
      name_de: formDef?.name || rawProduct.name_de,
      name: formDef?.name || rawProduct.name_de,
      subtitle: v.subtitle || formDef?.subtitle || rawProduct.subtitle_de,
      subtitle_de: v.subtitle_de || formDef?.subtitle || rawProduct.subtitle_de,
      description: v.description || rawProduct.description_de,
      description_de: v.description_de || rawProduct.description_de,
      ingredients_de: rawProduct.ingredients_de,
    };
  });

  // If the product belongs to a fruit family with sibling forms, augment with sibling variants for instant switching
  const distinctProductForms = new Set(
    rawVariants.map((v) => (v.form || v.form_de)?.toLowerCase()).filter(Boolean)
  );
  if (distinctProductForms.size <= 1 && familyInfo?.siblingLinks) {
    familyInfo.siblingLinks.forEach((siblingLink) => {
      const siblingSlug = siblingLink.href.replace('/produkte/', '');
      if (siblingSlug !== slug) {
        const siblingProduct = (allProductsRes.data || []).find(
          (p: any) => p.slug === siblingSlug
        );
        const siblingDef = familyInfo?.family?.forms.find(
          (f) => f.slug === siblingSlug || f.form.toLowerCase() === siblingLink.form.toLowerCase()
        );
        if (siblingProduct?.variants && siblingProduct.variants.length > 0) {
          siblingProduct.variants.forEach((sv: any) => {
            const exists = rawVariants.some((v) => v.id === sv.id);
            if (!exists) {
              const vForm = sv.form || sv.form_de || siblingLink.form;
              rawVariants.push({
                ...sv,
                form: vForm,
                form_de: sv.form_de || vForm,
                image_url: sv.image_url || siblingProduct.images?.[0] || null,
                images:
                  sv.images && sv.images.length > 0
                    ? sv.images
                    : (siblingProduct.images || []),
                title: sv.title || siblingProduct.name_de || siblingDef?.name,
                name_de: siblingProduct.name_de || siblingDef?.name,
                name: siblingProduct.name_de || siblingDef?.name,
                subtitle: sv.subtitle || siblingProduct.subtitle_de || siblingDef?.subtitle,
                subtitle_de: sv.subtitle_de || siblingProduct.subtitle_de || siblingDef?.subtitle,
                description: sv.description || siblingProduct.description_de || rawProduct.description_de,
                description_de: sv.description_de || siblingProduct.description_de || rawProduct.description_de,
                ingredients_de: siblingProduct.ingredients_de || rawProduct.ingredients_de,
              });
            }
          });
        }
      }
    });
  }

  let variants = rawVariants;
  const targetFormName = (
    initialForm ||
    rawProduct.form ||
    familyInfo?.activeForm?.form ||
    'Ganz'
  ).toLowerCase();

  // Sort variants: matching target form first, then by weight_grams ascending
  variants.sort((a, b) => {
    const aForm = (a.form || a.form_de || '').toLowerCase();
    const bForm = (b.form || b.form_de || '').toLowerCase();
    const aMatches = aForm === targetFormName;
    const bMatches = bForm === targetFormName;

    if (aMatches && !bMatches) return -1;
    if (!aMatches && bMatches) return 1;

    return (a.weight_grams || 0) - (b.weight_grams || 0);
  });

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
        {/* Main 2-Column Product Layout with Dynamic Gallery & Purchase Section */}
        <React.Suspense fallback={<div className="min-h-[500px]" />}>
          <ProductDetails
            product={product}
            variants={variants}
            availableForms={availableForms}
            primaryImage={primaryImage}
            initialForm={initialForm}
            initialVariantId={initialVariantId}
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
                macroDistribution={product.macro_distribution || product.nutritional_values}
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

        {/* Suggested Products Section: Das könnte dir auch gefallen */}
        <SuggestedProducts
          currentSlug={slug}
          allProducts={catalogProducts}
        />
      </main>
    </div>
  );
}
