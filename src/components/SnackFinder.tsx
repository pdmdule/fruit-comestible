'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import {
  Coffee,
  Briefcase,
  Cake,
  GlassWater,
  Sun,
  Sparkles,
  Palmtree,
  Heart,
  Layers,
  Grid,
  Wind,
  Boxes,
  RotateCcw,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Check,
  Star,
} from 'lucide-react';

export interface ProductVariant {
  id: string;
  weight_grams?: number;
  label_de?: string;
  form_de?: string;
  price_chf: number;
}

export interface ProductItem {
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

interface SnackFinderProps {
  products?: ProductItem[];
}

type PurposeType = 'muesli' | 'snack' | 'baking' | 'smoothie';
type FlavorType = 'sweet' | 'tart' | 'exotic' | 'chocolate';
type TextureType = 'pieces' | 'granulat' | 'pulver' | 'mix';

interface QuizOption<T> {
  id: T;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
}

const PURPOSE_OPTIONS: QuizOption<PurposeType>[] = [
  {
    id: 'muesli',
    title: 'Müsli, Porridge & Frühstück',
    description: 'Knuspriges Topping für einen gesunden und aromatischen Start in den Tag.',
    icon: Coffee,
    tag: 'Frühstücks-Power',
  },
  {
    id: 'snack',
    title: 'Gesunder Snack für Büro & Unterwegs',
    description: 'Leicht, handlich und sofort verzehrbereit – ohne klebrige Finger.',
    icon: Briefcase,
    tag: 'Für Unterwegs',
  },
  {
    id: 'baking',
    title: 'Backen, Desserts & Patisserie',
    description: 'Konzentriertes Fruchtaroma und intensive Farben für Kuchen, Cremes & Eis.',
    icon: Cake,
    tag: 'Kreative Küche',
  },
  {
    id: 'smoothie',
    title: 'Smoothies & Vitaminkick',
    description: 'Reine Fruchtpower und wertvolle Nährstoffe zum schnellen Einrühren.',
    icon: GlassWater,
    tag: '100% Vitamine',
  },
];

const FLAVOR_OPTIONS: QuizOption<FlavorType>[] = [
  {
    id: 'sweet',
    title: 'Fruchtig & Süss',
    description: 'Von Natur aus süss, sonnengereift und angenehm mild ohne Säurespitzen.',
    icon: Sun,
    tag: 'Natürlich Süss',
  },
  {
    id: 'tart',
    title: 'Angenehm Säuerlich & Beerenfrisch',
    description: 'Kräftig-frischer Beerencharakter mit feiner, belebender Fruchtsäure.',
    icon: Sparkles,
    tag: 'Beeren-Aroma',
  },
  {
    id: 'exotic',
    title: 'Exotisch & Belebend',
    description: 'Tropische Früchte voller Frische, intensiv sonnig und unverfälscht.',
    icon: Palmtree,
    tag: 'Tropen-Feeling',
  },
  {
    id: 'chocolate',
    title: 'Süss & Verwöhnend (mit Schokolade)',
    description: 'Knusprige Schweizer Früchte in zartschmelzender Schweizer Vollmilchschokolade.',
    icon: Heart,
    tag: 'Genussmoment',
  },
];

const TEXTURE_OPTIONS: QuizOption<TextureType>[] = [
  {
    id: 'pieces',
    title: 'Knusprige Stücke & Ganze Früchte',
    description: 'Ganze Früchte, Hälften oder Scheiben mit vollem, luftigem Knuspereffekt.',
    icon: Layers,
    tag: 'Ganze Früchte / Scheiben',
  },
  {
    id: 'granulat',
    title: 'Feines Granulat für Toppings',
    description: 'Gleichmässig zerkleinerte Fruchtstückchen – ideal zum Löffeln & Streuen.',
    icon: Grid,
    tag: 'Knusper-Granulat',
  },
  {
    id: 'pulver',
    title: '100% lösliches Fruchtpulver',
    description: 'Fein gemahlen, löst sich sofort in Shakes, Porridge, Joghurt oder Teigen.',
    icon: Wind,
    tag: 'Reines Pulver',
  },
  {
    id: 'mix',
    title: 'Bunter Mix & Abwechslung',
    description: 'Vielfältige Mischungen, Probiersäckli oder Probier-Sets zum Durchkosten.',
    icon: Boxes,
    tag: 'Frucht-Mischung',
  },
];

export default function SnackFinder({ products = [] }: SnackFinderProps) {
  const { addItem, openCart } = useCart();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [purpose, setPurpose] = useState<PurposeType | null>(null);
  const [flavor, setFlavor] = useState<FlavorType | null>(null);
  const [texture, setTexture] = useState<TextureType | null>(null);
  const [addedVariantId, setAddedVariantId] = useState<string | null>(null);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});

  const handleSelectPurpose = (val: PurposeType) => {
    setPurpose(val);
    setStep(2);
  };

  const handleSelectFlavor = (val: FlavorType) => {
    setFlavor(val);
    setStep(3);
  };

  const handleSelectTexture = (val: TextureType) => {
    setTexture(val);
    setStep(4);
  };

  const resetQuiz = () => {
    setPurpose(null);
    setFlavor(null);
    setTexture(null);
    setStep(1);
    setSelectedVariants({});
  };

  // Compute recommendations
  const matchedRecommendations = useMemo(() => {
    if (!purpose || !flavor || !texture || products.length === 0) return [];

    const scored = products.map((prod) => {
      let score = 0;
      const slug = prod.slug.toLowerCase();
      const name = prod.name_de.toLowerCase();
      const desc = (prod.description_de || '').toLowerCase();
      const variants = prod.product_variants || [];

      // Step 1: Purpose Scoring
      if (purpose === 'muesli') {
        if (slug.includes('muesli') || slug.includes('mueslimix')) score += 12;
        if (slug.includes('erdbeere') || slug.includes('himbeere')) score += 7;
        if (slug.includes('apfel') || slug.includes('heidelbeere')) score += 5;
        if (variants.some((v) => v.form_de?.toLowerCase().includes('granulat'))) score += 5;
      } else if (purpose === 'snack') {
        if (slug.includes('mein-buero-snack') || slug.includes('probiersaeckli')) score += 12;
        if (slug.includes('banane') || slug.includes('milchschokolade')) score += 8;
        if (slug.includes('erdbeere') || slug.includes('aprikose') || slug.includes('ananas')) score += 6;
        if (variants.some((v) => ['hälften', 'scheiben', 'schnitze', 'ganz'].includes(v.form_de?.toLowerCase() || ''))) score += 4;
      } else if (purpose === 'baking') {
        if (slug.includes('zwetschgen') || slug.includes('sauerkirsche') || slug.includes('aprikose')) score += 12;
        if (slug.includes('apfel') || slug.includes('himbeeren')) score += 7;
        if (variants.some((v) => v.form_de?.toLowerCase().includes('pulver'))) score += 5;
      } else if (purpose === 'smoothie') {
        if (slug.includes('immun-booster') || slug.includes('johannisbeere') || slug.includes('heidelbeere')) score += 12;
        if (slug.includes('zitrone') || slug.includes('orange') || slug.includes('maracuja')) score += 8;
        if (variants.some((v) => v.form_de?.toLowerCase().includes('pulver'))) score += 6;
      }

      // Step 2: Flavor Scoring
      if (flavor === 'sweet') {
        if (slug.includes('erdbeere') || slug.includes('mango') || slug.includes('banane') || slug.includes('apfel')) score += 9;
        if (slug.includes('muesli')) score += 4;
      } else if (flavor === 'tart') {
        if (slug.includes('himbeeren') || slug.includes('sauerkirsche') || slug.includes('heidelbeere') || slug.includes('johannisbeere') || slug.includes('brombeere')) score += 9;
        if (desc.includes('säuerlich') || desc.includes('beere')) score += 4;
      } else if (flavor === 'exotic') {
        if (slug.includes('mango') || slug.includes('maracuja') || slug.includes('ananas') || slug.includes('zitrone') || slug.includes('orange')) score += 11;
      } else if (flavor === 'chocolate') {
        if (slug.includes('milchschokolade')) score += 16;
        if (slug.includes('geschenkbox')) score += 6;
      }

      // Step 3: Texture Scoring
      if (texture === 'pieces') {
        if (variants.some((v) => ['hälften', 'scheiben', 'schnitze', 'ganz', 'gewürfelt'].includes(v.form_de?.toLowerCase() || ''))) score += 7;
        if (slug.includes('milchschokolade') || slug.includes('banane')) score += 3;
      } else if (texture === 'granulat') {
        if (variants.some((v) => v.form_de?.toLowerCase().includes('granulat'))) score += 8;
        if (slug.includes('muesli')) score += 4;
      } else if (texture === 'pulver') {
        if (variants.some((v) => v.form_de?.toLowerCase().includes('pulver'))) score += 8;
        if (slug.includes('immun-booster')) score += 5;
      } else if (texture === 'mix') {
        if (slug.includes('probiersaeckli') || slug.includes('mueslimix') || slug.includes('geschenkbox') || slug.includes('mein-buero-snack') || slug.includes('detox')) score += 10;
      }

      // Find the best variant for this texture preference
      let preferredVariant = variants[0];
      if (texture === 'granulat') {
        const found = variants.find((v) => v.form_de?.toLowerCase().includes('granulat'));
        if (found) preferredVariant = found;
      } else if (texture === 'pulver') {
        const found = variants.find((v) => v.form_de?.toLowerCase().includes('pulver'));
        if (found) preferredVariant = found;
      } else if (texture === 'pieces') {
        const found = variants.find((v) => ['hälften', 'scheiben', 'schnitze', 'ganz', 'gewürfelt'].includes(v.form_de?.toLowerCase() || ''));
        if (found) preferredVariant = found;
      }

      return {
        product: prod,
        score,
        preferredVariant,
      };
    });

    // Sort descending by score
    scored.sort((a, b) => b.score - a.score);

    // Pick top 3 unique products
    const top3 = scored.slice(0, 3);
    const matchPercentages = ['98%', '95%', '91%'];

    return top3.map((item, index) => ({
      ...item,
      matchPercentage: matchPercentages[index] || '90%',
    }));
  }, [purpose, flavor, texture, products]);

  const handleAddToCart = (product: ProductItem, variant: ProductVariant) => {
    if (!variant) return;

    addItem({
      productId: product.id,
      variantId: variant.id,
      name: product.name_de,
      label: variant.label_de || `${variant.form_de || ''} ${variant.weight_grams ? `(${variant.weight_grams}g)` : ''}`.trim(),
      weight_grams: variant.weight_grams,
      price: Number(variant.price_chf),
      quantity: 1,
      image: product.images?.[0] || '/logo.webp',
    });

    setAddedVariantId(variant.id);
    setTimeout(() => {
      setAddedVariantId(null);
    }, 1500);

    openCart();
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-12 border border-stone-200/90 shadow-sm max-w-4xl mx-auto transition-all">
      {/* Top Header & Progress */}
      <div className="space-y-4 mb-8">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200/80">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Frucht & Snack Finder</span>
            </span>
            <span className="text-xs font-medium text-stone-500">
              {step <= 3 ? `Schritt ${step} von 3` : 'Ergebnis'}
            </span>
          </div>

          {step > 1 && (
            <button
              onClick={() => (step === 4 ? resetQuiz() : setStep((prev) => (prev - 1) as any))}
              className="inline-flex items-center gap-1 text-xs font-bold text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
            >
              {step === 4 ? (
                <>
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Neu starten</span>
                </>
              ) : (
                <>
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Zurück</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-rose-600 to-rose-700 transition-all duration-500 ease-out"
            style={{
              width: step === 1 ? '33%' : step === 2 ? '66%' : '100%',
            }}
          />
        </div>
      </div>

      {/* STEP 1: VERWENDUNGSZWECK */}
      {step === 1 && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
              Wofür suchst du deine Früchte?
            </h3>
            <p className="text-sm sm:text-base text-stone-600">
              Wähle den primären Verwendungszweck, damit wir die passende Konsistenz und Sorte für dich abstimmen.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {PURPOSE_OPTIONS.map((opt) => {
              const Icon = opt.icon;
              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectPurpose(opt.id)}
                  className="group text-left p-5 sm:p-6 rounded-2xl border-2 border-stone-200/90 bg-stone-50/50 hover:bg-white hover:border-rose-600 hover:shadow-md transition-all duration-200 flex items-start gap-4 cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl bg-white border border-stone-200 flex items-center justify-center shrink-0 text-stone-700 group-hover:text-rose-700 group-hover:border-rose-300 group-hover:bg-rose-50 transition-colors shadow-2xs">
                    <Icon className="w-6 h-6 stroke-[2]" />
                  </div>
                  <div className="space-y-1 flex-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-700 block">
                      {opt.tag}
                    </span>
                    <h4 className="font-bold text-stone-900 text-base group-hover:text-rose-700 transition-colors">
                      {opt.title}
                    </h4>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {opt.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP 2: GESCHMACKSPROFIL */}
      {step === 2 && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
              Welches Geschmacksprofil liebst du?
            </h3>
            <p className="text-sm sm:text-base text-stone-600">
              Ob mild-süß, herb-frisch oder tropisch-belebend – was trifft deinen Gaumen am besten?
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {FLAVOR_OPTIONS.map((opt) => {
              const Icon = opt.icon;
              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectFlavor(opt.id)}
                  className="group text-left p-5 sm:p-6 rounded-2xl border-2 border-stone-200/90 bg-stone-50/50 hover:bg-white hover:border-rose-600 hover:shadow-md transition-all duration-200 flex items-start gap-4 cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl bg-white border border-stone-200 flex items-center justify-center shrink-0 text-stone-700 group-hover:text-rose-700 group-hover:border-rose-300 group-hover:bg-rose-50 transition-colors shadow-2xs">
                    <Icon className="w-6 h-6 stroke-[2]" />
                  </div>
                  <div className="space-y-1 flex-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-700 block">
                      {opt.tag}
                    </span>
                    <h4 className="font-bold text-stone-900 text-base group-hover:text-rose-700 transition-colors">
                      {opt.title}
                    </h4>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {opt.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP 3: TEXTUR & FORM */}
      {step === 3 && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
              Welche Textur bevorzugst du?
            </h3>
            <p className="text-sm sm:text-base text-stone-600">
              Entscheide, wie du deine schonend gefriergetrockneten Früchte am liebsten portionierst.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {TEXTURE_OPTIONS.map((opt) => {
              const Icon = opt.icon;
              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectTexture(opt.id)}
                  className="group text-left p-5 sm:p-6 rounded-2xl border-2 border-stone-200/90 bg-stone-50/50 hover:bg-white hover:border-rose-600 hover:shadow-md transition-all duration-200 flex items-start gap-4 cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl bg-white border border-stone-200 flex items-center justify-center shrink-0 text-stone-700 group-hover:text-rose-700 group-hover:border-rose-300 group-hover:bg-rose-50 transition-colors shadow-2xs">
                    <Icon className="w-6 h-6 stroke-[2]" />
                  </div>
                  <div className="space-y-1 flex-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-700 block">
                      {opt.tag}
                    </span>
                    <h4 className="font-bold text-stone-900 text-base group-hover:text-rose-700 transition-colors">
                      {opt.title}
                    </h4>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {opt.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP 4: ERGEBNIS & EMPFEHLUNG */}
      {step === 4 && (
        <div className="space-y-8 animate-in fade-in duration-400">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Geschmacksprofil erfolgreich analysiert</span>
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
              Deine idealen Knusper-Matches
            </h3>
            <p className="text-sm text-stone-600">
              Basierend auf deinen Antworten sind das unsere 3 besten Empfehlungen für dich:
            </p>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {matchedRecommendations.map((item) => {
              const product = item.product;
              const variants = product.product_variants || [];
              const activeVariantId = selectedVariants[product.id] || item.preferredVariant?.id || variants[0]?.id;
              const currentVariant = variants.find((v) => v.id === activeVariantId) || item.preferredVariant || variants[0];
              const isAdded = addedVariantId === currentVariant?.id;

              const primaryImage =
                product.images?.[0] ||
                'https://images.unsplash.com/photo-1543528176-61b239494933?q=80&w=800&auto=format&fit=crop';

              return (
                <div
                  key={product.id}
                  className="flex flex-col bg-stone-50/70 border border-stone-200/90 rounded-3xl overflow-hidden hover:shadow-md hover:border-stone-300 transition-all duration-300"
                >
                  {/* Image & Match Badge */}
                  <div className="relative aspect-4/3 w-full overflow-hidden bg-stone-100">
                    <Image
                      src={primaryImage}
                      alt={product.name_de}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-rose-700 text-white shadow-xs flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        <span>{item.matchPercentage} Match</span>
                      </span>
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/95 text-stone-800 backdrop-blur-md border border-stone-200/80 shadow-2xs">
                        🇨🇭 {product.origin_country || 'Schweiz'}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h4 className="text-base font-bold text-stone-900 leading-snug line-clamp-2">
                        {product.name_de}
                      </h4>
                      <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                        {product.subtitle_de || product.description_de || 'Schonend gefriergetrocknete Schweizer Früchte.'}
                      </p>

                      {/* Variant Selector if multiple exist */}
                      {variants.length > 1 ? (
                        <div className="pt-2">
                          <label className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-1.5">
                            Variante wählen:
                          </label>
                          <select
                            value={currentVariant?.id}
                            onChange={(e) =>
                              setSelectedVariants((prev) => ({
                                ...prev,
                                [product.id]: e.target.value,
                              }))
                            }
                            className="w-full text-xs font-semibold py-1.5 px-2.5 rounded-xl border border-stone-200 bg-white text-stone-800 focus:outline-none focus:ring-2 focus:ring-rose-600/20 focus:border-rose-600"
                          >
                            {variants.map((v) => (
                              <option key={v.id} value={v.id}>
                                {v.label_de || `${v.form_de || 'Variante'} (${v.weight_grams}g)`} – CHF {Number(v.price_chf).toFixed(2)}
                              </option>
                            ))}
                          </select>
                        </div>
                      ) : (
                        currentVariant && (
                          <div className="pt-1">
                            <span className="inline-block text-xs font-medium text-stone-600 bg-stone-200/60 px-2.5 py-0.5 rounded-md">
                              {currentVariant.label_de || `${currentVariant.form_de || 'Standard'} (${currentVariant.weight_grams}g)`}
                            </span>
                          </div>
                        )
                      )}
                    </div>

                    {/* Price and Cart Action */}
                    <div className="pt-3 border-t border-stone-200/70 space-y-3">
                      <div className="flex items-baseline justify-between">
                        <span className="text-xs text-stone-500">Preis:</span>
                        <span className="text-base font-bold text-stone-900">
                          CHF {currentVariant ? Number(currentVariant.price_chf).toFixed(2) : '15.90'}
                        </span>
                      </div>

                      {currentVariant && (
                        <button
                          onClick={() => handleAddToCart(product, currentVariant)}
                          disabled={isAdded}
                          className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${
                            isAdded
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'bg-stone-900 hover:bg-stone-800 text-white shadow-xs hover:shadow-md'
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <Check className="w-4 h-4" />
                              <span>Im Warenkorb!</span>
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="w-4 h-4" />
                              <span>Direkt in den Warenkorb</span>
                            </>
                          )}
                        </button>
                      )}

                      <Link
                        href={`/produkte/${product.slug}`}
                        className="inline-flex items-center justify-center gap-1 text-[11px] font-bold text-rose-700 hover:text-rose-800 transition-colors w-full text-center"
                      >
                        <span>Produktdetails ansehen</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Reset / Shop Link */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
            <button
              onClick={resetQuiz}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-stone-300 bg-white hover:bg-stone-50 text-stone-800 text-xs font-bold transition shadow-2xs cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Finder neu starten ↺</span>
            </button>
            <Link
              href="/shop"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-stone-900 transition"
            >
              <span>Oder das gesamte Sortiment im Shop entdecken</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
