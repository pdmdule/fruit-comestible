'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Leaf,
  Heart,
  Zap,
  Check,
  ArrowRight,
} from 'lucide-react';

export interface BenefitItem {
  text: string;
  position: 'top-left' | 'top-right' | 'left' | 'bottom-left' | 'bottom-right';
}

export interface SpotlightSlide {
  id: string;
  name: string;
  badge: string; // Npr. "SCHWARZE JOHANNISBEERE GEFRIERGETROCKNET"
  imageUrl: string; // Putanja do slike zdjelice
  emoji: string;
  shopHref: string;
  accent: {
    pillBg: string;
    pillText: string;
    pillBorder: string;
    glow: string;
    stroke: string;
  };
  benefits: {
    topLeft: string; // npr. "Stärkt das Immunsystem"
    topRight: string; // npr. "Intensiver Geschmack"
    left: string; // npr. "Zuckerarm"
    bottomLeft: string; // npr. "Reich an Antioxidantien"
    bottomRight: string; // npr. "Hoher Vitamin-C-Gehalt"
  };
}

export const SPOTLIGHT_DATA: SpotlightSlide[] = [
  {
    id: 'schwarze-johannisbeere',
    name: 'Schwarze Johannisbeere',
    badge: '100% NATURBELASSEN',
    imageUrl: '/images/spotlight/schwarze-johannisbeere-bowl.png',
    emoji: '🫐',
    shopHref: '/shop?frucht=johannisbeere',
    accent: {
      pillBg: 'bg-purple-100',
      pillText: 'text-purple-800',
      pillBorder: 'border-purple-200',
      glow: 'from-purple-500/20 via-purple-600/10 to-transparent',
      stroke: '#7e22ce',
    },
    benefits: {
      topLeft: 'Stärkt das Immunsystem',
      topRight: 'Intensiver Geschmack',
      left: 'Zuckerarm',
      bottomLeft: 'Reich an Antioxidantien',
      bottomRight: 'Hoher Vitamin-C-Gehalt',
    },
  },
  {
    id: 'erdbeeren',
    name: 'Erdbeeren',
    badge: 'SCHWEIZER ERDBEEREN',
    imageUrl: '/images/spotlight/erdbeeren-bowl.png',
    emoji: '🍓',
    shopHref: '/shop?frucht=erdbeer',
    accent: {
      pillBg: 'bg-rose-100',
      pillText: 'text-rose-800',
      pillBorder: 'border-rose-200',
      glow: 'from-rose-500/20 via-red-600/10 to-transparent',
      stroke: '#e11d48',
    },
    benefits: {
      topLeft: 'Reich an Folsäure',
      topRight: 'Herrlich knusprig & süss',
      left: 'Ohne Zuckerzusatz',
      bottomLeft: 'Voller natürlicher Vitamine',
      bottomRight: 'Schonend liofilisiert',
    },
  },
  {
    id: 'himbeeren',
    name: 'Himbeeren',
    badge: 'AROMATISCH & FEIN',
    imageUrl: '/images/spotlight/himbeeren-bowl.png',
    emoji: '🫐',
    shopHref: '/shop?frucht=himbeer',
    accent: {
      pillBg: 'bg-pink-100',
      pillText: 'text-pink-800',
      pillBorder: 'border-pink-200',
      glow: 'from-pink-500/20 via-rose-600/10 to-transparent',
      stroke: '#db2777',
    },
    benefits: {
      topLeft: 'Hoher Ballaststoffgehalt',
      topRight: 'Intensiv fruchtiges Aroma',
      left: 'Wenig Kalorien',
      bottomLeft: 'Natürliche Vitalstoffe',
      bottomRight: 'Perfekt für Müsli & Snacks',
    },
  },
  {
    id: 'heidelbeeren',
    name: 'Echte Waldheidelbeeren',
    badge: 'WILDE HEIDELBEERE',
    imageUrl: '/images/spotlight/heidelbeeren-bowl.png',
    emoji: '🫐',
    shopHref: '/shop?frucht=heidelbeer',
    accent: {
      pillBg: 'bg-indigo-100',
      pillText: 'text-indigo-800',
      pillBorder: 'border-indigo-200',
      glow: 'from-blue-500/20 via-indigo-600/10 to-transparent',
      stroke: '#4338ca',
    },
    benefits: {
      topLeft: 'Zellschutz & Anti-Aging',
      topRight: 'Tiefblaues Beerenaroma',
      left: '100% Pures Superfood',
      bottomLeft: 'Wertvolle Anthocyane',
      bottomRight: 'Ideal für Porridge & Shakes',
    },
  },
  {
    id: 'mango',
    name: 'Sonnengereifte Mango',
    badge: 'EXOTISCHER GENUSS',
    imageUrl: '/images/spotlight/mango-bowl.png',
    emoji: '🥭',
    shopHref: '/shop?frucht=mango',
    accent: {
      pillBg: 'bg-amber-100',
      pillText: 'text-amber-800',
      pillBorder: 'border-amber-200',
      glow: 'from-amber-400/25 via-orange-500/10 to-transparent',
      stroke: '#d97706',
    },
    benefits: {
      topLeft: 'Reich an Vitamin A & C',
      topRight: 'Exotisch-süsser Crunch',
      left: 'Keine Zusatzstoffe',
      bottomLeft: 'Natürliche Fruchtsüsse',
      bottomRight: 'Schonend getrocknet',
    },
  },
];

export default function BenefitSpotlightCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentSlide = SPOTLIGHT_DATA[activeIndex];

  const goToSlide = useCallback((index: number) => {
    setIsAnimating(true);
    setActiveIndex(index);
    const timeout = setTimeout(() => setIsAnimating(false), 500);
    return () => clearTimeout(timeout);
  }, []);

  const nextSlide = useCallback(() => {
    goToSlide((activeIndex + 1) % SPOTLIGHT_DATA.length);
  }, [activeIndex, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((activeIndex - 1 + SPOTLIGHT_DATA.length) % SPOTLIGHT_DATA.length);
  }, [activeIndex, goToSlide]);

  // Autoplay rotation (every 6.5 seconds, paused on hover)
  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      nextSlide();
    }, 6500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, nextSlide]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
    setTouchStart(null);
    setIsPaused(false);
  };

  return (
    <section
      className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-8 sm:space-y-12"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* 1. Header with Eyebrow, Title and Subtitle */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold tracking-widest uppercase text-rose-700">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Nährstoff-Power im Fokus</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-stone-900">
            Was steckt in deiner Frucht?
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            100% reine Frucht, vollgepackt mit bioverfügbaren Vitaminen, Antioxidantien und
            intensivem Knusper-Aroma – komplett ohne Zusätze.
          </p>
        </div>

        {/* Fruit Quick-Select Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {SPOTLIGHT_DATA.map((fruit, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={fruit.id}
                type="button"
                onClick={() => goToSlide(idx)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 inline-flex items-center gap-1.5 cursor-pointer shrink-0 border ${
                  isActive
                    ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                    : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50 hover:border-stone-300'
                }`}
              >
                <span>{fruit.emoji}</span>
                <span>{fruit.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Spotlight Arena */}
      <div className="relative rounded-3xl sm:rounded-4xl bg-stone-100/70 border border-stone-200/90 p-6 sm:p-10 lg:p-14 overflow-hidden shadow-2xs">
        {/* Ambient Fruit Aura Glow */}
        <div
          className={`absolute inset-0 bg-radial transition-all duration-1000 pointer-events-none opacity-40 blur-3xl ${currentSlide.accent.glow}`}
        />

        {/* ========================================================
            DESKTOP RADIAL LAYOUT (Visible md and above)
            ======================================================== */}
        <div className="hidden md:flex relative min-h-[580px] lg:min-h-[640px] items-center justify-center">
          {/* Animated SVG Curved Arrows Overlay */}
          <svg
            key={`svg-${currentSlide.id}`}
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
            viewBox="0 0 1000 650"
            fill="none"
          >
            <defs>
              <marker
                id={`arrow-${currentSlide.id}`}
                viewBox="0 0 10 10"
                refX="6"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto"
              >
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill={currentSlide.accent.stroke} />
              </marker>
            </defs>

            {/* 1. Arrow: Top-Left to Bowl */}
            <path
              d="M 270 120 Q 360 140 395 215"
              stroke={currentSlide.accent.stroke}
              strokeWidth="2.2"
              strokeDasharray="5 5"
              markerEnd={`url(#arrow-${currentSlide.id})`}
              className="animate-spotlight-arrow transition-all duration-700"
            />

            {/* 2. Arrow: Top-Right to Bowl */}
            <path
              d="M 730 120 Q 640 140 605 215"
              stroke={currentSlide.accent.stroke}
              strokeWidth="2.2"
              strokeDasharray="5 5"
              markerEnd={`url(#arrow-${currentSlide.id})`}
              className="animate-spotlight-arrow transition-all duration-700"
            />

            {/* 3. Arrow: Left to Bowl */}
            <path
              d="M 230 325 Q 285 315 340 325"
              stroke={currentSlide.accent.stroke}
              strokeWidth="2.2"
              strokeDasharray="5 5"
              markerEnd={`url(#arrow-${currentSlide.id})`}
              className="animate-spotlight-arrow transition-all duration-700"
            />

            {/* 4. Arrow: Bottom-Left to Bowl */}
            <path
              d="M 270 530 Q 360 510 395 435"
              stroke={currentSlide.accent.stroke}
              strokeWidth="2.2"
              strokeDasharray="5 5"
              markerEnd={`url(#arrow-${currentSlide.id})`}
              className="animate-spotlight-arrow transition-all duration-700"
            />

            {/* 5. Arrow: Bottom-Right to Bowl */}
            <path
              d="M 730 530 Q 640 510 605 435"
              stroke={currentSlide.accent.stroke}
              strokeWidth="2.2"
              strokeDasharray="5 5"
              markerEnd={`url(#arrow-${currentSlide.id})`}
              className="animate-spotlight-arrow transition-all duration-700"
            />
          </svg>

          {/* 5 Radial Benefit Cards (Around the Central Bowl) */}
          <div key={`benefits-${currentSlide.id}`} className="absolute inset-0 z-20 pointer-events-none">
            {/* 1. Top-Left Benefit */}
            <div className="absolute top-8 left-4 lg:top-10 lg:left-8 pointer-events-auto max-w-[240px] animate-spotlight-fade">
              <div className="flex items-center gap-3 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl border border-stone-200/90 shadow-sm hover:shadow-md transition-all duration-200 group">
                <div
                  className={`w-9 h-9 rounded-xl ${currentSlide.accent.pillBg} ${currentSlide.accent.pillText} flex items-center justify-center shrink-0 shadow-2xs`}
                >
                  <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div className="text-xs lg:text-sm font-bold text-stone-900 leading-snug">
                  {currentSlide.benefits.topLeft}
                </div>
              </div>
            </div>

            {/* 2. Top-Right Benefit */}
            <div className="absolute top-8 right-4 lg:top-10 lg:right-8 pointer-events-auto max-w-[240px] animate-spotlight-fade">
              <div className="flex items-center gap-3 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl border border-stone-200/90 shadow-sm hover:shadow-md transition-all duration-200 group">
                <div
                  className={`w-9 h-9 rounded-xl ${currentSlide.accent.pillBg} ${currentSlide.accent.pillText} flex items-center justify-center shrink-0 shadow-2xs`}
                >
                  <Sparkles className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div className="text-xs lg:text-sm font-bold text-stone-900 leading-snug">
                  {currentSlide.benefits.topRight}
                </div>
              </div>
            </div>

            {/* 3. Left Benefit */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 lg:left-4 pointer-events-auto max-w-[230px] animate-spotlight-fade">
              <div className="flex items-center gap-3 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl border border-stone-200/90 shadow-sm hover:shadow-md transition-all duration-200 group">
                <div
                  className={`w-9 h-9 rounded-xl ${currentSlide.accent.pillBg} ${currentSlide.accent.pillText} flex items-center justify-center shrink-0 shadow-2xs`}
                >
                  <Leaf className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div className="text-xs lg:text-sm font-bold text-stone-900 leading-snug">
                  {currentSlide.benefits.left}
                </div>
              </div>
            </div>

            {/* 4. Bottom-Left Benefit */}
            <div className="absolute bottom-10 left-4 lg:bottom-12 lg:left-8 pointer-events-auto max-w-[240px] animate-spotlight-fade">
              <div className="flex items-center gap-3 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl border border-stone-200/90 shadow-sm hover:shadow-md transition-all duration-200 group">
                <div
                  className={`w-9 h-9 rounded-xl ${currentSlide.accent.pillBg} ${currentSlide.accent.pillText} flex items-center justify-center shrink-0 shadow-2xs`}
                >
                  <Heart className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div className="text-xs lg:text-sm font-bold text-stone-900 leading-snug">
                  {currentSlide.benefits.bottomLeft}
                </div>
              </div>
            </div>

            {/* 5. Bottom-Right Benefit */}
            <div className="absolute bottom-10 right-4 lg:bottom-12 lg:right-8 pointer-events-auto max-w-[240px] animate-spotlight-fade">
              <div className="flex items-center gap-3 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl border border-stone-200/90 shadow-sm hover:shadow-md transition-all duration-200 group">
                <div
                  className={`w-9 h-9 rounded-xl ${currentSlide.accent.pillBg} ${currentSlide.accent.pillText} flex items-center justify-center shrink-0 shadow-2xs`}
                >
                  <Zap className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div className="text-xs lg:text-sm font-bold text-stone-900 leading-snug">
                  {currentSlide.benefits.bottomRight}
                </div>
              </div>
            </div>
          </div>

          {/* Central Bowl Element (Circular Container) */}
          <div className="relative z-20 flex flex-col items-center">
            {/* Outer Subtle Aura Glow */}
            <div
              className={`absolute -inset-8 rounded-full blur-2xl opacity-75 transition-all duration-1000 ${currentSlide.accent.glow}`}
            />

            {/* Circular Bowl Image Frame */}
            <div
              key={`bowl-${currentSlide.id}`}
              className="relative w-72 h-72 lg:w-84 lg:h-84 xl:w-92 xl:h-92 rounded-full p-3 bg-white shadow-2xl border-4 border-white ring-8 ring-stone-200/60 overflow-hidden transition-transform duration-700 ease-out hover:scale-102"
            >
              <div className="relative w-full h-full rounded-full overflow-hidden bg-stone-100">
                <Image
                  src={currentSlide.imageUrl}
                  alt={`${currentSlide.name} Zdjelica`}
                  fill
                  unoptimized
                  priority
                  className={`object-cover rounded-full transition-all duration-700 ease-out ${
                    isAnimating ? 'opacity-70 scale-95 rotate-3' : 'opacity-100 scale-100 rotate-0'
                  }`}
                />
                {/* Subtle vignette inner ring */}
                <div className="absolute inset-0 rounded-full ring-1 ring-black/10 pointer-events-none" />
              </div>
            </div>

            {/* Fruit Caption & Badge below Bowl */}
            <div className="mt-5 text-center space-y-1.5 z-20">
              <span className="inline-block px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-stone-900 text-white shadow-2xs">
                {currentSlide.badge}
              </span>
              <h3 className="text-2xl font-black text-stone-900 tracking-tight">
                {currentSlide.name}
              </h3>
              <div className="pt-1">
                <Link
                  href={currentSlide.shopHref}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-700 hover:text-rose-800 transition group"
                >
                  <span>Jetzt im Shop entdecken</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            MOBILE VERTICAL LAYOUT (Visible on smaller screens < md)
            ======================================================== */}
        <div className="md:hidden flex flex-col items-center space-y-6">
          {/* Badge & Name */}
          <div className="text-center space-y-1.5">
            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-stone-900 text-white">
              {currentSlide.badge}
            </span>
            <h3 className="text-2xl font-black text-stone-900 tracking-tight">
              {currentSlide.name}
            </h3>
          </div>

          {/* Central Bowl on Mobile */}
          <div className="relative">
            <div
              className={`absolute -inset-4 rounded-full blur-xl opacity-60 transition-all duration-700 ${currentSlide.accent.glow}`}
            />
            <div className="relative w-56 h-56 rounded-full p-2.5 bg-white shadow-xl border-4 border-white ring-6 ring-stone-200/60 overflow-hidden mx-auto">
              <div className="relative w-full h-full rounded-full overflow-hidden bg-stone-100">
                <Image
                  src={currentSlide.imageUrl}
                  alt={`${currentSlide.name} Zdjelica`}
                  fill
                  unoptimized
                  priority
                  className="object-cover rounded-full transition-transform duration-500 ease-out"
                />
              </div>
            </div>

            {/* Quick Mobile Navigation Buttons on Sides of Bowl */}
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Vorherige Frucht"
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-10 h-10 rounded-full bg-white/95 backdrop-blur-md shadow-md border border-stone-200 text-stone-700 flex items-center justify-center hover:bg-stone-50 transition cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Nächste Frucht"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-10 h-10 rounded-full bg-white/95 backdrop-blur-md shadow-md border border-stone-200 text-stone-700 flex items-center justify-center hover:bg-stone-50 transition cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* 5 Benefits Grid for Mobile */}
          <div className="w-full max-w-md space-y-2 pt-2">
            {[
              { text: currentSlide.benefits.topLeft, icon: ShieldCheck },
              { text: currentSlide.benefits.topRight, icon: Sparkles },
              { text: currentSlide.benefits.left, icon: Leaf },
              { text: currentSlide.benefits.bottomLeft, icon: Heart },
              { text: currentSlide.benefits.bottomRight, icon: Zap },
            ].map((b, bIdx) => {
              const IconComp = b.icon;
              return (
                <div
                  key={bIdx}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-stone-200/90 shadow-2xs"
                >
                  <div
                    className={`w-7 h-7 rounded-xl ${currentSlide.accent.pillBg} ${currentSlide.accent.pillText} flex items-center justify-center shrink-0`}
                  >
                    <IconComp className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <span className="text-xs font-bold text-stone-800 leading-snug">
                    {b.text}
                  </span>
                </div>
              );
            })}

            {/* Mobile CTA */}
            <div className="pt-2">
              <Link
                href={currentSlide.shopHref}
                className="w-full py-3 px-5 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition"
              >
                <span>{currentSlide.name} im Shop ansehen</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* ========================================================
            CAROUSEL CONTROLS & PAGINATION
            ======================================================== */}
        {/* Desktop Prev/Next Floating Controls */}
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Vorherige Frucht"
          className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-md border border-stone-200/90 text-stone-700 hover:text-stone-900 hover:bg-stone-50 items-center justify-center transition-all z-30 cursor-pointer"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          type="button"
          onClick={nextSlide}
          aria-label="Nächste Frucht"
          className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-md border border-stone-200/90 text-stone-700 hover:text-stone-900 hover:bg-stone-50 items-center justify-center transition-all z-30 cursor-pointer"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Bottom Pagination Dots */}
        <div className="flex items-center justify-center gap-2 pt-6 sm:pt-8 z-20 relative">
          {SPOTLIGHT_DATA.map((slide, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => goToSlide(idx)}
                aria-label={`Gehe zu Frucht: ${slide.name}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  isActive
                    ? 'w-8 sm:w-10 h-2.5 bg-stone-900'
                    : 'w-2.5 h-2.5 bg-stone-300 hover:bg-stone-400'
                }`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
