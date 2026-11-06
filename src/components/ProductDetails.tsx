'use client';

import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductGallery from '@/components/ProductGallery';
import ProductPurchaseSection, {
  type ProductVariant,
  type FormLink,
} from '@/components/ProductPurchaseSection';
import { Leaf, Sparkles, ShieldCheck } from 'lucide-react';

export interface ProductDetailsProps {
  product: {
    id: string;
    slug: string;
    name?: string;
    name_de: string;
    subtitle?: string;
    subtitle_de?: string;
    description?: string;
    description_de?: string;
    origin_country?: string;
    ingredients_de?: string;
    images?: string[];
    image_url?: string | null;
    form?: string;
    category?: string;
    variants?: ProductVariant[];
    product_variants?: ProductVariant[];
  };
  variants: ProductVariant[];
  availableForms?: FormLink[];
  primaryImage?: string;
  initialForm?: string;
  initialVariantId?: string;
}

export default function ProductDetails({
  product,
  variants,
  availableForms = [],
  primaryImage,
  initialForm,
  initialVariantId,
}: ProductDetailsProps) {
  const searchParams = useSearchParams();
  const formParam = searchParams?.get('form')?.toLowerCase() || initialForm?.toLowerCase();
  const variantParam = searchParams?.get('variant') || initialVariantId;

  // 1. Inicijalno traženje varijante prema URL parametru (ako postoji)
  const getInitialVariant = useCallback(() => {
    if (!variants || variants.length === 0) return undefined;

    if (variantParam) {
      const byId = variants.find((v) => String(v.id) === variantParam);
      if (byId) return byId;
    }

    if (formParam) {
      const byForm = variants.find((v) => {
        const vf = (v.form || v.form_de || '').toLowerCase();
        const vt = (v.title || v.name_de || v.label_de || '').toLowerCase();
        return vf === formParam || vt.includes(formParam);
      });
      if (byForm) return byForm;
    }

    const prodForm = (product.form || '').toLowerCase();
    if (prodForm) {
      const byProdForm = variants.find(
        (v) => (v.form || v.form_de || '').toLowerCase() === prodForm
      );
      if (byProdForm) return byProdForm;
    }

    const inStock = variants.find((v) => (v.stock_quantity ?? 0) > 0);
    return inStock || variants[0];
  }, [variants, variantParam, formParam, product.form]);

  // JEDAN izvor istine za celu stranicu proizvoda
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(getInitialVariant);

  // Ref za sprečavanje neželjenog resetovanja stanja ako korisnik sam menja varijantu
  const lastSyncedParamsRef = useRef({ formParam, variantParam });

  // Ako se promeni URL (npr. browser Back/Forward), sinhronizuj stanje
  useEffect(() => {
    if (
      lastSyncedParamsRef.current.formParam !== formParam ||
      lastSyncedParamsRef.current.variantParam !== variantParam
    ) {
      lastSyncedParamsRef.current = { formParam, variantParam };
      const matched = getInitialVariant();
      if (matched) setSelectedVariant(matched);
    }
  }, [formParam, variantParam, getInitialVariant]);

  // Handler za promenu varijante kada korisnik klikne dugme
  const handleSelectVariant = (variant: ProductVariant) => {
    if (!variant) return;
    const vForm = (variant.form || variant.form_de || 'Ganz').toLowerCase();
    lastSyncedParamsRef.current = {
      formParam: vForm,
      variantParam: variant.id,
    };
    setSelectedVariant(variant);

    // Nežno ažuriraj URL u adresnoj traci
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (variant.form || variant.form_de) {
        url.searchParams.set('form', variant.form || variant.form_de || 'Ganz');
      }
      url.searchParams.set('variant', variant.id);
      window.history.replaceState(null, '', url.toString());
    }
  };

  // Form of currently selected variant
  const currentForm = (
    selectedVariant?.form ||
    selectedVariant?.form_de ||
    product.form ||
    'Ganz'
  ).trim();
  const formLower = currentForm.toLowerCase();

  // Active form label for tags and specs
  const activeFormDisplayLabel = useMemo(() => {
    if (formLower === 'granulat') return 'Knusper-Granulat';
    if (formLower === 'pulver') return 'Fruchtpulver';
    if (formLower === 'ganz') return 'Ganze Früchte';
    return currentForm;
  }, [currentForm, formLower]);

  // 1. Dinamički naslov proizvoda (Title)
  const displayTitle = useMemo(() => {
    if (selectedVariant?.title && selectedVariant.title !== selectedVariant.label_de) {
      return selectedVariant.title;
    }
    if (selectedVariant?.name_de) {
      return selectedVariant.name_de;
    }
    if (selectedVariant?.name) {
      return selectedVariant.name;
    }

    const baseName = product.name_de || product.name || 'Gefriergetrocknete Früchte';
    const baseLower = baseName.toLowerCase();

    if (currentForm === 'Mix' || currentForm === 'Box') {
      return baseName;
    }

    if (baseLower.includes(formLower)) {
      return baseName;
    }

    if (baseName.includes('(') && baseName.includes(')')) {
      return baseName.replace(/\([^)]*\)/, `(${currentForm})`);
    }

    return `${baseName} (${currentForm})`;
  }, [selectedVariant, product.name_de, product.name, currentForm, formLower]);

  // 2. Dinamički podnaslov (Subtitle)
  const displaySubtitle = useMemo(() => {
    if (selectedVariant?.subtitle) return selectedVariant.subtitle;
    if (selectedVariant?.subtitle_de) return selectedVariant.subtitle_de;

    if (formLower === 'granulat') {
      return 'Fruchtiger Knusper-Crunch – ideal für Bowls, Müsli und feine Rezepte.';
    }
    if (formLower === 'pulver') {
      return '100% reines Fruchtpulver – perfekt für Smoothies, Shakes & Backkreationen.';
    }
    if (formLower === 'ganz') {
      return product.subtitle_de || 'Schonend gefriergetrocknete Schweizer Früchte voller Aroma und Crunch.';
    }

    return product.subtitle_de || product.subtitle || '';
  }, [selectedVariant, product.subtitle_de, product.subtitle, formLower]);

  // 3. Dinamički opis (Description)
  const displayDescription = useMemo(() => {
    if (selectedVariant?.description) return selectedVariant.description;
    if (selectedVariant?.description_de) return selectedVariant.description_de;

    if (formLower === 'granulat') {
      return 'Schonend gefriergetrocknetes Knusper-Granulat aus 100% reinen Früchten. Intensives natürliches Aroma und herrlicher Crunch für Porridge, Bowls, Joghurt und Backdekorationen – ganz ohne Zuckerzusatz.';
    }
    if (formLower === 'pulver') {
      return 'Feinst vermahlenes, naturreines Fruchtpulver aus schonend vakuumgetrockneten Früchten. Löst sich samtig und klumpenfrei in Flüssigkeiten auf – ideal für Proteinshakes, Smoothies, Teige und feine Cremes.';
    }

    return (
      product.description_de ||
      product.description ||
      'Schonend gefriergetrocknete Schweizer Früchte in Spitzenqualität. 100% Naturprodukt ohne künstliche Zusätze oder Zuckerzusatz.'
    );
  }, [selectedVariant, product.description_de, product.description, formLower]);

  // 4. Specifičnosti i način upotrebe (Usage / Primjena)
  const displayUsage = useMemo(() => {
    if (selectedVariant?.usage) return selectedVariant.usage;
    if (formLower === 'granulat') {
      return 'Ideal für Porridge, Müsli-Crunch & Bowls';
    }
    if (formLower === 'pulver') {
      return 'Perfekt für Smoothies, Shakes & Backkreationen';
    }
    return 'Pur als knackiger Snack & optisches Highlight';
  }, [selectedVariant, formLower]);

  const usageTips = useMemo(() => {
    if (selectedVariant?.usage_tips && selectedVariant.usage_tips.length > 0) {
      return selectedVariant.usage_tips;
    }
    if (selectedVariant?.features && selectedVariant.features.length > 0) {
      return selectedVariant.features;
    }
    if (formLower === 'granulat') {
      return [
        'Knuspriges Topping auf Açaí-Bowls, Joghurt & Quark',
        'Fruchtiger Crunch im Müsli oder warmem Porridge',
        'Edles Dekor für Pralinen, Kuchen & feine Desserts',
      ];
    }
    if (formLower === 'pulver') {
      return [
        'Intensive natürliche Fruchtfarbe in Smoothies & Shakes',
        'Perfekt zum Einrühren in Teige, Cremes & Glasuren',
        '100% rein – löst sich samtig und ohne Klumpen auf',
      ];
    }
    return [
      'Purer Knuspersnack direkt aus der Packung für unterwegs',
      'Optisches Highlight auf Torten, Waffeln & Frühstückstellern',
      'Herrlich aromatisch und im Nu in Flüssigkeiten rehydrierbar',
    ];
  }, [selectedVariant, formLower]);

  // 5. Dinamički sastojci (Ingredients)
  const displayIngredients = useMemo(() => {
    return (
      selectedVariant?.ingredients_de ||
      product.ingredients_de ||
      '100% gefriergetrocknete Früchte (ohne Zusätze)'
    );
  }, [selectedVariant, product.ingredients_de]);

  // 6. Dinamički popis slika prema odabranoj varijanti (Pulver / Granulat / Ganz / pakovanje)
  const activeImages = useMemo(() => {
    if (selectedVariant?.images && selectedVariant.images.length > 0) {
      return selectedVariant.images.filter(Boolean) as string[];
    }
    if (selectedVariant?.image_url) {
      return [
        selectedVariant.image_url,
        ...(product.images || []),
      ].filter(Boolean) as string[];
    }
    if (product.images && product.images.length > 0) {
      return product.images.filter(Boolean) as string[];
    }
    if (product.image_url) {
      return [product.image_url];
    }
    return product.images || (product.image_url ? [product.image_url] : []);
  }, [selectedVariant, product]);

  return (
    <div className="flex flex-col w-full items-stretch lg:grid lg:grid-cols-12 gap-8 lg:gap-16 lg:items-start">
      {/* Left Column: Image Gallery & Rich Product Story */}
      <div className="contents lg:block lg:col-span-7 lg:space-y-10">
        {/* 1. Gallery with Zoom & Thumbnails (order-1 on mobile) */}
        <div className="order-1 lg:order-none w-full">
          <ProductGallery
            images={activeImages}
            productName={displayTitle}
            originCountry={product.origin_country}
            variantId={selectedVariant?.id}
          />
        </div>

        {/* 2. Product Title, Subtitle, Description & Usage (order-2 on mobile) */}
        <div className="order-2 lg:order-none w-full space-y-4 pt-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-extrabold tracking-widest uppercase text-rose-600">
              100% Natürliche Beeren & Früchte
            </span>
            <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-full text-[11px] font-bold leading-none bg-stone-900 text-white shadow-2xs">
              <span className="leading-none">{activeFormDisplayLabel}</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-stone-900 leading-tight">
            {displayTitle}
          </h1>

          {displaySubtitle && (
            <p className="text-lg sm:text-xl text-stone-700 font-medium leading-snug">
              {displaySubtitle}
            </p>
          )}

          {displayDescription && (
            <div className="pt-2 text-stone-700 text-base leading-relaxed space-y-3">
              <p>{displayDescription}</p>
            </div>
          )}

          {/* 3. Empfohlene Anwendung / Usage Highlight Card */}
          <div className="mt-4 p-4.5 rounded-2xl bg-gradient-to-br from-amber-50/80 to-stone-50 border border-amber-200/70 shadow-2xs space-y-2.5">
            <div className="flex flex-wrap items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-amber-200/80 text-amber-900 flex items-center justify-center shrink-0">
                <Sparkles className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-950">
                Empfohlene Anwendung:
              </span>
              <span className="text-xs sm:text-sm font-extrabold text-stone-900">
                {displayUsage}
              </span>
            </div>
            {usageTips && usageTips.length > 0 && (
              <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-xs text-stone-700">
                {usageTips.map((tip, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-1.5 bg-white/70 backdrop-blur-xs p-2.5 rounded-xl border border-stone-200/50"
                  >
                    <span className="text-amber-600 font-bold shrink-0">✓</span>
                    <span className="leading-tight">{tip}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
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
            <p className="text-xs text-stone-700 leading-relaxed">
              Frei von Industriezucker, künstlichen Aromen und Zusätzen.
            </p>
          </div>

          <div className="p-4 rounded-3xl bg-stone-50 border border-stone-200/80 space-y-1.5">
            <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center mb-1">
              <Sparkles className="w-4 h-4 stroke-[2.5]" />
            </div>
            <h3 className="text-sm font-bold text-stone-900">
              {formLower === 'granulat'
                ? 'Knuspriger Crunch'
                : formLower === 'pulver'
                ? 'Feine Vermahlung'
                : 'Schonendes Vakuum'}
            </h3>
            <p className="text-xs text-stone-700 leading-relaxed">
              {formLower === 'granulat'
                ? 'Intensiver Biss für Bowls, Porridge und knusprige Desserts.'
                : formLower === 'pulver'
                ? 'Samtiger Mahlgrad – löst sich gleichmässig und ohne Klumpen.'
                : 'Liofilisation bewahrt bis zu 95% der Vitamine & Struktur.'}
            </p>
          </div>

          <div className="p-4 rounded-3xl bg-stone-50 border border-stone-200/80 space-y-1.5">
            <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-1">
              <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
            </div>
            <h3 className="text-sm font-bold text-stone-900">
              Schweizer Standard
            </h3>
            <p className="text-xs text-stone-700 leading-relaxed">
              Streng kontrollierte Rohstoffe und höchste Reinheit.
            </p>
          </div>
        </div>

        {/* 5. Ingredients & Specification Details Box (order-5 on mobile) */}
        <div className="order-5 lg:order-none w-full p-7 rounded-3xl bg-stone-50/70 border border-stone-200/90 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700">
            Produktspezifikation
          </h3>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
            <div>
              <dt className="text-xs font-medium text-stone-600">Zutaten</dt>
              <dd className="font-bold text-stone-900 mt-1">
                {displayIngredients}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-stone-600">Form / Konsistenz</dt>
              <dd className="font-bold text-stone-900 mt-1">
                {activeFormDisplayLabel}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-stone-600">Herkunftsland</dt>
              <dd className="font-bold text-stone-900 mt-1">
                {product.origin_country || 'Schweiz / Europa'}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-stone-600">Lagerung</dt>
              <dd className="font-bold text-stone-900 mt-1">
                Kühl, trocken und lichtgeschützt
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-stone-600">Besonderheit</dt>
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
            productName={displayTitle}
            productId={product.id}
            image={activeImages[0] || primaryImage}
            availableForms={availableForms}
            selectedVariant={selectedVariant}
            onVariantChange={handleSelectVariant}
          />
        </div>
      </div>
    </div>
  );
}

export { ProductDetails };
