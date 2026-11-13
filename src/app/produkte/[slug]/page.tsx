import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { supabase } from '@/lib/supabase';
import type { ProductVariant } from '@/components/ProductPurchaseSection';
import type { MacroItem } from '@/components/ProductNutritionChart';
import type { FaqItem } from '@/components/ProductFaq';
import ProductPageClient, {
  type ProductPageEntry,
  type ProductRecordData,
} from '@/components/ProductPageClient';
import type { ProductReview } from '@/types/reviews';
import {
  PRODUCT_ORIGINS,
  getProductOrigin,
  type ProductOriginData,
} from '@/data/productOrigins';
import { getFruitFamilyInfo, expandProductsForCatalog } from '@/lib/productForms';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

interface RawProductRow extends ProductRecordData {
  variants?: ProductVariant[];
  product_variants?: ProductVariant[];
}

function getFormLabel(formName: string, overrideLabel?: string): string {
  if (overrideLabel) return overrideLabel;
  const fLower = formName.toLowerCase();
  if (fLower === 'ganz') return 'Ganze Früchte';
  if (fLower === 'granulat') return 'Granulat';
  if (fLower === 'pulver') return 'Fruchtpulver';
  return formName || 'Standard';
}

function getCategoryMeta(prod: RawProductRow): {
  categoryLabel: string;
  categoryHref: string;
} {
  const formValue = (prod.form || '').toLowerCase();
  const catValue = (prod.category || '').toLowerCase();
  const slugLower = (prod.slug || '').toLowerCase();

  if (catValue.includes('schokolade') || slugLower.includes('schokolade')) {
    return { categoryLabel: 'Schokolade', categoryHref: '/shop/schokolade' };
  }
  if (catValue.includes('geschenk') || catValue.includes('box') || slugLower.includes('box')) {
    return { categoryLabel: 'Geschenkboxen', categoryHref: '/shop/geschenkboxen' };
  }
  if (
    catValue.includes('snack') ||
    catValue.includes('mix') ||
    slugLower.includes('snack') ||
    slugLower.includes('probier') ||
    slugLower.includes('booster')
  ) {
    return { categoryLabel: 'Snacks & Mixes', categoryHref: '/shop/mixes' };
  }
  if (formValue === 'pulver' || slugLower.includes('pulver') || catValue.includes('pulver')) {
    return { categoryLabel: 'Fruchtpulver', categoryHref: '/shop/fruchtpulver' };
  }
  if (
    formValue === 'granulat' ||
    slugLower.includes('granulat') ||
    catValue.includes('granulat') ||
    catValue.includes('crunch')
  ) {
    return { categoryLabel: 'Granulat & Crunch', categoryHref: '/shop/granulat' };
  }
  return { categoryLabel: 'Ganze Früchte', categoryHref: '/shop/beeren' };
}

function buildProductEntry(
  rawProd: RawProductRow,
  formLabelOverride?: string
): ProductPageEntry {
  const prodOrigin: ProductOriginData =
    PRODUCT_ORIGINS[rawProd.slug] ||
    PRODUCT_ORIGINS[rawProd.slug.toLowerCase()] ||
    getProductOrigin(rawProd.slug, rawProd.origin_country);

  const rawVariants = rawProd.variants || rawProd.product_variants || [];
  const formName = rawProd.form || rawVariants[0]?.form || rawVariants[0]?.form_de || 'Ganz';

  const normalizedVariants: ProductVariant[] = rawVariants
    .map((v: any) => {
      const vForm = v.form || v.form_de || formName;
      return {
        ...v,
        product_id: v.product_id || rawProd.id,
        form: vForm,
        form_de: v.form_de || vForm,
        title: v.title || rawProd.name_de,
        name_de: rawProd.name_de,
        name: rawProd.name_de,
        subtitle: v.subtitle || rawProd.subtitle_de || rawProd.short_description_de,
        subtitle_de: v.subtitle_de || rawProd.subtitle_de || rawProd.short_description_de,
        description: v.description || rawProd.description_de,
        description_de: v.description_de || rawProd.description_de,
        ingredients_de: rawProd.ingredients_de,
        bowl_image_url: v.bowl_image_url || rawProd.bowl_image_url || null,
      };
    })
    .sort((a, b) => (a.weight_grams || 0) - (b.weight_grams || 0));

  const { categoryLabel, categoryHref } = getCategoryMeta(rawProd);

  return {
    product: {
      id: rawProd.id,
      slug: rawProd.slug,
      name: rawProd.name,
      name_de: rawProd.name_de || 'Gefriergetrocknete Früchte',
      subtitle_de: rawProd.subtitle_de || '',
      short_description_de: rawProd.short_description_de || '',
      description_de: rawProd.description_de || '',
      origin_country: prodOrigin.country,
      ingredients_de: rawProd.ingredients_de,
      images: rawProd.images || [],
      image_url: rawProd.image_url || null,
      bowl_image_url: rawProd.bowl_image_url || null,
      form: formName,
      category: rawProd.category,
      macro_distribution: rawProd.macro_distribution as MacroItem[] | undefined,
      nutritional_values: rawProd.nutritional_values as MacroItem[] | undefined,
      faq: rawProd.faq as FaqItem[] | undefined,
    },
    variants: normalizedVariants,
    originData: prodOrigin,
    categoryLabel,
    categoryHref,
    formName,
    formLabel: getFormLabel(formName, formLabelOverride),
  };
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

  if (!product && familyInfo?.activeForm?.slug) {
    const byFormSlug = await supabase
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
      .ilike('slug', familyInfo.activeForm.slug)
      .maybeSingle();
    product = byFormSlug.data;
  }

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

  let productName = product?.name_de || familyInfo?.activeForm?.name || 'Gefriergetrocknete Früchte';
  if (!productName.toLowerCase().startsWith('gefriergetrocknet')) {
    productName = `Gefriergetrocknetes ${productName}`;
  }

  const rawMetadataVariants = (product as any)?.variants || (product as any)?.product_variants || [];
  const variants = rawMetadataVariants.filter(
    (v: any) => v.weight_grams === 100 || v.weight_grams === 200
  );
  const weights = Array.from(new Set(variants.map((v: any) => v.weight_grams))).sort(
    (a: any, b: any) => a - b
  );
  const weightString = weights.length > 0 ? weights.map((w) => `${w}g`).join(' / ') : '100g / 200g';

  const metaTitle = `${productName} ${weightString} kaufen | fruit-Comestible`;

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
          product_id,
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
          product_id,
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

  const allProducts = ((allProductsRes.data || []) as RawProductRow[]).map((p) => {
    const vars = p.variants || p.product_variants || [];
    return {
      ...p,
      variants: vars,
      product_variants: vars,
    };
  });

  let data = productRes.data as RawProductRow | null;
  const error = productRes.error;

  // Fallback: case-insensitive slug match or matching legacy alias in FRUIT_FAMILIES
  if (!data) {
    const cleanSlug = slug.toLowerCase().trim();
    data =
      allProducts.find((p) => p.slug?.toLowerCase() === cleanSlug) ||
      (familyInfo?.activeForm
        ? allProducts.find(
            (p) =>
              p.slug?.toLowerCase() === familyInfo.activeForm.slug.toLowerCase() ||
              familyInfo.activeForm.aliases.some(
                (a) => a.toLowerCase() === p.slug?.toLowerCase()
              )
          )
        : undefined) ||
      (familyInfo?.dbSlugToFetch
        ? allProducts.find(
            (p) => p.slug?.toLowerCase() === familyInfo.dbSlugToFetch.toLowerCase()
          )
        : undefined) ||
      null;
  }

  if (error || !data) {
    notFound();
  }

  const rawProduct: RawProductRow = {
    ...data,
    variants: data.variants || data.product_variants || [],
    product_variants: data.variants || data.product_variants || [],
  };

  const catalogProducts = expandProductsForCatalog(allProducts);

  // Resolve all sibling forms for this fruit family from real database products
  const siblingProducts: ProductPageEntry[] = [];
  const seenIds = new Set<string>();

  if (familyInfo?.family?.forms) {
    for (const formDef of familyInfo.family.forms) {
      const candidateSlugs = [
        formDef.slug.toLowerCase(),
        ...formDef.aliases.map((a) => a.toLowerCase()),
      ];
      const matchedDbProduct =
        rawProduct.slug && candidateSlugs.includes(rawProduct.slug.toLowerCase())
          ? rawProduct
          : allProducts.find((p) =>
              candidateSlugs.includes((p.slug || '').toLowerCase())
            );

      if (matchedDbProduct && !seenIds.has(matchedDbProduct.id)) {
        seenIds.add(matchedDbProduct.id);
        siblingProducts.push(buildProductEntry(matchedDbProduct, formDef.label));
      }
    }
  }

  // Ensure the active product itself is always in siblingProducts
  if (!seenIds.has(rawProduct.id)) {
    seenIds.add(rawProduct.id);
    siblingProducts.unshift(buildProductEntry(rawProduct));
  }

  // Prefetch approved reviews for the active product AND all sibling forms in one query
  const siblingIds = siblingProducts.map((entry) => entry.product.id);
  const { data: reviewsData } = await supabase
    .from('product_reviews')
    .select('*')
    .in('product_id', siblingIds)
    .eq('is_approved', true)
    .order('created_at', { ascending: false });

  const initialReviewsByProductId: Record<string, ProductReview[]> = {};
  siblingIds.forEach((id) => {
    initialReviewsByProductId[id] = [];
  });

  ((reviewsData || []) as ProductReview[]).forEach((review) => {
    if (!initialReviewsByProductId[review.product_id]) {
      initialReviewsByProductId[review.product_id] = [];
    }
    initialReviewsByProductId[review.product_id].push(review);
  });

  return (
    <ProductPageClient
      initialProductSlug={rawProduct.slug}
      siblingProducts={siblingProducts}
      initialReviewsByProductId={initialReviewsByProductId}
      catalogProducts={catalogProducts}
      initialForm={initialForm}
      initialVariantId={initialVariantId}
    />
  );
}
