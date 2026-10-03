import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Compass } from 'lucide-react';

interface CategoryGuideCard {
  id: string;
  title: string;
  badge: string;
  description: string;
  href: string;
  targetName: string;
  image: string;
}

const CATEGORY_GUIDES: CategoryGuideCard[] = [
  {
    id: 'muesli-crunch',
    title: 'Müsli & Crunch',
    badge: 'Granulat',
    description:
      'Herrlich knuspriges Fruchtgranulat für den perfekten morgendlichen Crunch in Porridge, Müsli & Joghurt.',
    href: '/shop/granulat',
    targetName: 'Granulat & Crunch',
    image:
      'https://images.unsplash.com/photo-1517673400267-0251440c45dc?q=80&w=900&auto=format&fit=crop',
  },
  {
    id: 'smoothies-backen',
    title: 'Smoothies & Backen',
    badge: 'Fruchtpulver',
    description:
      '100% reines Fruchtpulver ohne Zusätze für intensive Vitaminkicks in Smoothies, Shakes, Bowls & feiner Pâtisserie.',
    href: '/shop/fruchtpulver',
    targetName: 'Fruchtpulver',
    image:
      'https://images.unsplash.com/photo-1553530666-ba11a7da3888?q=80&w=900&auto=format&fit=crop',
  },
  {
    id: 'buero-unterwegs',
    title: 'Büro & Unterwegs',
    badge: 'Ganze Früchte',
    description:
      'Ganze, sonnengereifte Beeren als sauberer Snack ohne klebrige Hände – pure natürliche Energie für Fokus und Alltag.',
    href: '/shop/beeren',
    targetName: 'Früchte & Beeren',
    image:
      'https://images.unsplash.com/photo-1543528176-61b239494933?q=80&w=900&auto=format&fit=crop',
  },
  {
    id: 'snacks-probieren',
    title: 'Snacks & Probieren',
    badge: 'Snacks & Mixes',
    description:
      'Bunte Fruchtmischungen, Booster-Mixes und Probiersäckli für maximale Abwechslung oder zum gemeinsamen Teilen.',
    href: '/shop/mixes',
    targetName: 'Snacks & Mixes',
    image:
      'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?q=80&w=900&auto=format&fit=crop',
  },
];

export default function VisualCategoryGuide() {
  return (
    <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-4 pb-8 sm:pt-6 sm:pb-12 lg:py-16 space-y-6 sm:space-y-8 lg:space-y-10 !mt-0 lg:!mt-24 xl:!mt-32">
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

      {/* 4 Visual Category Cards in 2x2 on Mobile/Tablet (< lg) and 4 columns on Desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
        {CATEGORY_GUIDES.map((card) => (
          <Link
            key={card.id}
            href={card.href}
            className="group relative flex flex-col justify-between h-full min-h-[230px] sm:min-h-[290px] lg:h-[460px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xs hover:shadow-xl border border-stone-200/60 p-3 sm:p-5 lg:p-7 transition-all duration-500 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-600"
          >
            {/* Background Image */}
            <Image
              src={card.image}
              alt={card.title}
              fill
              unoptimized
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
            />

            {/* Dark Gradient Overlay for contrast and readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/95 via-stone-950/50 to-stone-900/15 transition-opacity duration-300 group-hover:from-stone-950 group-hover:via-stone-950/60" />

            {/* Top Badge */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-bold tracking-wide uppercase bg-white/20 text-white backdrop-blur-md border border-white/25 shadow-xs">
                {card.badge}
              </span>
            </div>

            {/* Bottom Content Area */}
            <div className="relative z-10 space-y-2 sm:space-y-3">
              {/* Title & Arrow in Circle */}
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm sm:text-base lg:text-2xl font-semibold lg:font-black tracking-tight text-white group-hover:text-rose-200 transition-colors duration-200">
                  {card.title}
                </h3>
                <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full bg-white/20 group-hover:bg-white text-white group-hover:text-stone-950 backdrop-blur-md border border-white/30 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110 shadow-xs">
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </div>
              </div>

              {/* Short attractive description (2 lines max on mobile, up to 3 on desktop) */}
              <p className="text-xs sm:text-sm text-stone-200/90 leading-relaxed line-clamp-2 sm:line-clamp-3">
                {card.description}
              </p>

              {/* Sub-link cue */}
              <div className="pt-0.5 sm:pt-1 hidden sm:flex items-center gap-1.5 text-xs font-bold text-rose-300 group-hover:text-white transition-colors duration-200">
                <span>Zu {card.targetName}</span>
                <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
