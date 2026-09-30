'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Star,
  Gift,
  Zap,
  Sparkles,
} from 'lucide-react';

interface SlideData {
  id: string;
  badge: string;
  title: string;
  titleHighlight?: string;
  description: string;
  buttonPrimary: {
    label: string;
    href: string;
  };
  buttonSecondary: {
    label: string;
    href: string;
  };
  image: string;
  imageAlt: string;
  highlightBadge: {
    type: 'percent' | 'icon';
    value?: string;
    icon?: typeof Gift;
    badgeBg?: string;
    badgeText?: string;
    title: string;
    subtitle: string;
  };
}

const SLIDES: SlideData[] = [
  {
    id: 'berries',
    badge: '🇨🇭 100% Natürlich & Knusprig',
    title: 'Reine Frucht. Null Zuckerzusatz.',
    titleHighlight: 'Maximaler Geschmack.',
    description:
      'Entdecken Sie unsere gefriergetrockneten Schweizer & europäischen Erdbeeren, Himbeeren und Waldheidelbeeren. Bis zu 95% der Vitamine bleiben erhalten.',
    buttonPrimary: {
      label: 'Sortiment entdecken',
      href: '/shop',
    },
    buttonSecondary: {
      label: 'Bestseller ansehen',
      href: '#bestseller',
    },
    image:
      'https://images.unsplash.com/photo-1543528176-61b239494933?q=80&w=1400&auto=format&fit=crop',
    imageAlt: 'Schale mit gefriergetrockneten Beeren und Früchten',
    highlightBadge: {
      type: 'percent',
      value: '95%',
      badgeBg: 'bg-emerald-100',
      badgeText: 'text-emerald-800',
      title: 'Bis zu 95% Vitamine erhalten',
      subtitle: 'Schonende Gefriertrocknung',
    },
  },
  {
    id: 'giftbox',
    badge: '🎁 Edle Geschenkideen',
    title: 'Geschenkboxen für besondere',
    titleHighlight: 'Genussmomente.',
    description:
      'Ob Geburtstag, Jubiläum oder Firmengeschenk – überraschen Sie mit unserer exklusiven Auswahl handverlesener Knusperfrüchte, stilvoll verpackt.',
    buttonPrimary: {
      label: 'Geschenkboxen entdecken',
      href: '/produkte/geschenkbox-large',
    },
    buttonSecondary: {
      label: 'Alle Produkte',
      href: '/shop',
    },
    image:
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1400&auto=format&fit=crop',
    imageAlt: 'Exklusive Geschenkbox für besondere Genussmomente',
    highlightBadge: {
      type: 'icon',
      icon: Gift,
      badgeBg: 'bg-rose-100',
      badgeText: 'text-rose-800',
      title: 'Inkl. persönlicher Grusskarte',
      subtitle: 'Liebevoll handverpackt',
    },
  },
  {
    id: 'snack',
    badge: '⚡ Energie für den Tag',
    title: 'Der gesunde Snack für Büro,',
    titleHighlight: 'Sport & Familie.',
    description:
      'Leicht, knusprig und voller natürlicher Nährstoffe. Die ideale Alternative zu Schokoriegeln und fettigen Snacks – für pure Energie ohne Reue.',
    buttonPrimary: {
      label: 'Snacks entdecken',
      href: '/produkte/mein-buero-snack',
    },
    buttonSecondary: {
      label: 'Probiersäckli ansehen',
      href: '/produkte/probiersaeckli',
    },
    image:
      'https://images.unsplash.com/photo-1511688878353-3a2f5be94cd7?q=80&w=1400&auto=format&fit=crop',
    imageAlt: 'Gesunde Knusperfrüchte und Snacks für unterwegs',
    highlightBadge: {
      type: 'icon',
      icon: Zap,
      badgeBg: 'bg-amber-100',
      badgeText: 'text-amber-800',
      title: 'Perfekt fürs Müsli & unterwegs',
      subtitle: '100% reine Frucht ohne Fett',
    },
  },
];

const AUTOPLAY_INTERVAL = 5500; // 5.5 seconds per slide

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Autoplay with pause on hover
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      nextSlide();
    }, AUTOPLAY_INTERVAL);

    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
    touchStartX.current = null;
  };

  return (
    <section
      className="relative pt-6 sm:pt-10 lg:pt-14 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Fruit Comestible Hero Slider"
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative">
        {/* Navigation Arrows for Desktop */}
        <button
          onClick={prevSlide}
          type="button"
          aria-label="Vorheriger Slide"
          className="hidden md:flex absolute -left-2 lg:-left-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/95 hover:bg-stone-900 text-stone-700 hover:text-white border border-stone-200/90 shadow-md items-center justify-center transition-all duration-200 active:scale-90 hover:scale-105"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.2]" />
        </button>

        <button
          onClick={nextSlide}
          type="button"
          aria-label="Nächster Slide"
          className="hidden md:flex absolute -right-2 lg:-right-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/95 hover:bg-stone-900 text-stone-700 hover:text-white border border-stone-200/90 shadow-md items-center justify-center transition-all duration-200 active:scale-90 hover:scale-105"
        >
          <ChevronRight className="w-5 h-5 stroke-[2.2]" />
        </button>

        {/* Stacked Slides Container using CSS Grid Stacking (prevents layout shifts) */}
        <div className="grid grid-cols-1 grid-rows-1">
          {SLIDES.map((slide, index) => {
            const isActive = index === currentSlide;
            const HighlightIcon = slide.highlightBadge.icon;

            return (
              <div
                key={slide.id}
                aria-hidden={!isActive}
                className={`col-start-1 row-start-1 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center transition-all duration-700 ease-out ${
                  isActive
                    ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto z-10'
                    : 'opacity-0 translate-y-3 scale-[0.99] pointer-events-none z-0'
                }`}
              >
                {/* Left Column: Text & CTAs */}
                <div className="lg:col-span-6 space-y-6 sm:space-y-8">
                  {/* Discrete Top Badge */}
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-stone-200/90 shadow-2xs text-xs font-bold text-stone-800">
                    <span>{slide.badge}</span>
                  </div>

                  {/* Main Heading */}
                  <div className="space-y-3 sm:space-y-4">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-stone-900 leading-[1.08]">
                      {slide.title}{' '}
                      {slide.titleHighlight && (
                        <span className="text-rose-700 block sm:inline">
                          {slide.titleHighlight}
                        </span>
                      )}
                    </h1>
                    <p className="text-base sm:text-lg lg:text-xl text-stone-600 leading-relaxed font-normal max-w-xl">
                      {slide.description}
                    </p>
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
                    <Link
                      href={slide.buttonPrimary.href}
                      className="h-14 px-8 rounded-2xl bg-stone-900 hover:bg-stone-800 active:scale-[0.98] text-white font-extrabold text-sm flex items-center justify-center gap-2.5 shadow-sm transition"
                    >
                      <span>{slide.buttonPrimary.label}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    {slide.buttonSecondary.href.startsWith('#') ? (
                      <a
                        href={slide.buttonSecondary.href}
                        className="h-14 px-8 rounded-2xl bg-white hover:bg-stone-100 border border-stone-200 text-stone-800 font-bold text-sm flex items-center justify-center gap-2 shadow-2xs transition"
                      >
                        <span>{slide.buttonSecondary.label}</span>
                      </a>
                    ) : (
                      <Link
                        href={slide.buttonSecondary.href}
                        className="h-14 px-8 rounded-2xl bg-white hover:bg-stone-100 border border-stone-200 text-stone-800 font-bold text-sm flex items-center justify-center gap-2 shadow-2xs transition"
                      >
                        <span>{slide.buttonSecondary.label}</span>
                      </Link>
                    )}
                  </div>

                  {/* Social Proof Block */}
                  <div className="pt-4 border-t border-stone-200/80 flex items-center gap-3">
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>
                    <div className="text-xs text-stone-600 font-medium">
                      <strong className="text-stone-900 font-bold">4.9/5</strong>{' '}
                      von über 1&apos;200 Kunden in der Schweiz geschätzt
                    </div>
                  </div>
                </div>

                {/* Right Column: Hero Image with Floating Badge */}
                <div className="lg:col-span-6 relative">
                  <div className="relative aspect-4/3 sm:aspect-square lg:aspect-4/3 xl:aspect-square rounded-3xl overflow-hidden bg-white border border-stone-200 shadow-xl group">
                    <Image
                      src={slide.image}
                      alt={slide.imageAlt}
                      fill
                      priority={index === 0}
                      unoptimized
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                    />

                    {/* Gradient Overlay for subtle text contrast if needed */}
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/20 via-transparent to-transparent pointer-events-none" />

                    {/* Floating Mini-Badge */}
                    <div className="absolute bottom-5 right-5 sm:bottom-6 sm:right-6 p-3.5 sm:p-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-stone-200/90 flex items-center gap-3 max-w-[90%]">
                      {slide.highlightBadge.type === 'percent' ? (
                        <div
                          className={`w-11 h-11 rounded-xl ${slide.highlightBadge.badgeBg} ${slide.highlightBadge.badgeText} flex items-center justify-center font-black text-sm shrink-0`}
                        >
                          {slide.highlightBadge.value}
                        </div>
                      ) : (
                        HighlightIcon && (
                          <div
                            className={`w-11 h-11 rounded-xl ${slide.highlightBadge.badgeBg} ${slide.highlightBadge.badgeText} flex items-center justify-center shrink-0`}
                          >
                            <HighlightIcon className="w-5 h-5 stroke-[2.2]" />
                          </div>
                        )
                      )}
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-stone-900 leading-snug">
                          {slide.highlightBadge.title}
                        </p>
                        <p className="text-[11px] text-stone-500 font-medium">
                          {slide.highlightBadge.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Pagination & Mobile Navigation Bar */}
        <div className="flex items-center justify-between sm:justify-center gap-4 pt-8 sm:pt-10">
          {/* Mobile Prev Button */}
          <button
            onClick={prevSlide}
            type="button"
            aria-label="Vorheriger Slide"
            className="md:hidden w-9 h-9 rounded-full bg-white hover:bg-stone-100 text-stone-700 border border-stone-200 shadow-2xs flex items-center justify-center transition active:scale-95"
          >
            <ChevronLeft className="w-4 h-4 stroke-[2.2]" />
          </button>

          {/* Indicators / Progress Dots */}
          <div className="flex items-center gap-2.5">
            {SLIDES.map((slide, idx) => {
              const isActive = idx === currentSlide;
              return (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(idx)}
                  type="button"
                  aria-label={`Slide ${idx + 1}: ${slide.title}`}
                  className={`relative h-2.5 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 ${
                    isActive
                      ? 'w-8 sm:w-10 bg-stone-900'
                      : 'w-2.5 bg-stone-300 hover:bg-stone-400'
                  }`}
                />
              );
            })}
            <span className="ml-2 text-xs font-semibold text-stone-400 tabular-nums">
              0{currentSlide + 1} / 0{SLIDES.length}
            </span>
          </div>

          {/* Mobile Next Button */}
          <button
            onClick={nextSlide}
            type="button"
            aria-label="Nächster Slide"
            className="md:hidden w-9 h-9 rounded-full bg-white hover:bg-stone-100 text-stone-700 border border-stone-200 shadow-2xs flex items-center justify-center transition active:scale-95"
          >
            <ChevronRight className="w-4 h-4 stroke-[2.2]" />
          </button>
        </div>
      </div>
    </section>
  );
}
