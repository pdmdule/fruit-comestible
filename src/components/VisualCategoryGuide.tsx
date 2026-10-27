import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Compass } from 'lucide-react';

interface CategoryGuideCard {
  id: string;
  title: string;
  tag: string;
  targetName: string;
  href: string;
  image: string;
}

const CATEGORY_GUIDES: CategoryGuideCard[] = [
  {
    id: 'muesli-crunch',
    title: 'Müsli & Crunch',
    tag: 'Granulat',
    targetName: 'Granulat & Crunch',
    href: '/shop/granulat',
    image:
      'https://loinzvvygklupiomoisu.supabase.co/storage/v1/object/public/hero/IMG_9625.webp',
  },
  {
    id: 'smoothies-backen',
    title: 'Smoothies & Backen',
    tag: 'Fruchtpulver',
    targetName: 'Fruchtpulver',
    href: '/shop/fruchtpulver',
    image:
      'https://images.unsplash.com/photo-1553530666-ba11a7da3888?q=80&w=900&auto=format&fit=crop',
  },
  {
    id: 'buero-unterwegs',
    title: 'Büro & Unterwegs',
    tag: 'Ganze Früchte',
    targetName: 'Früchte & Beeren',
    href: '/shop/beeren',
    image:
      'https://images.unsplash.com/photo-1543528176-61b239494933?q=80&w=900&auto=format&fit=crop',
  },
  {
    id: 'snacks-probieren',
    title: 'Snacks & Probieren',
    tag: 'Snacks & Mixes',
    targetName: 'Snacks & Mixes',
    href: '/shop/mixes',
    image:
      'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?q=80&w=900&auto=format&fit=crop',
  },
];

export default function VisualCategoryGuide() {
  return (
    <section id="kategorien" className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-6 sm:space-y-8 lg:space-y-10 scroll-mt-24">
      {/* Header with Title and Link to Shop */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold tracking-widest uppercase text-rose-700">
            <Compass className="w-3.5 h-3.5" />
            <span>Nach Verwendung wählen</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-stone-900">
            Wofür suchst du deine Früchte?
          </h2>
          <p className="text-xs sm:text-sm lg:text-base text-stone-600 leading-relaxed">
            Ob knuspriges Frühstücks-Topping, feines Fruchtpulver zum Backen oder
            gesunder Snack für unterwegs – finde sofort die passende Form für deinen Moment.
          </p>
        </div>

        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-rose-700 hover:text-rose-800 transition shrink-0 group self-start sm:self-auto"
        >
          <span>Alle Kategorien im Shop</span>
          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* 4 Minimalist Category Cards: Split grid 2 cols on mobile, 4 cols on desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6 lg:gap-8">
        {CATEGORY_GUIDES.map((cat) => (
          <Link
            key={cat.href}
            href={cat.href}
            className="group relative flex flex-col justify-end overflow-hidden rounded-2xl sm:rounded-3xl h-72 sm:h-80 lg:h-96 p-4 sm:p-6 border border-stone-200/80 shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
          >
            {/* Pozadinska slika */}
            <Image
              src={cat.image}
              alt={cat.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Donji dio: Krupni naslov i link ka kategoriji sa strelicom */}
            <div className="relative z-10 space-y-1 sm:space-y-1.5">
              <h3 className="text-base sm:text-xl lg:text-2xl font-bold tracking-tight text-white drop-shadow-md group-hover:text-emerald-300 transition-colors">
                {cat.title}
              </h3>
              <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-white drop-shadow-md group-hover:text-emerald-300 transition-colors">
                <span>Zu {cat.targetName}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
