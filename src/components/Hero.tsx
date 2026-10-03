'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  ArrowRight,
} from 'lucide-react';

export interface BenefitBadge {
  id: string;
  text: string;
  // Pozicija u procentima u odnosu na centralni kontejner oko zdjelice
  desktopStyle: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
}

export interface HeroSlide {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  accentColor: string;
  bowlImage: string; // Izrezana zdjelica bez pozadine
  benefits: BenefitBadge[];
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'schwarze-johannisbeere',
    badge: '100% SCHWEIZER QUALITÄT',
    title: 'Purer Geschmack. Volle Vitaminkraft.',
    subtitle:
      'Schonend gefriergetrocknet für maximalen Knusperspass und pure Nährstoffe – ganz ohne Zusätze.',
    ctaText: 'Jetzt Entdecken',
    ctaLink: '/shop?frucht=johannisbeere',
    accentColor: '#7e22ce',
    bowlImage: '/images/spotlight/erdbeeren-bowl.png',
    benefits: [
      { id: 'b1', text: 'Stärkt das Immunsystem', desktopStyle: { top: '-15%', left: '-12%' } },
      { id: 'b2', text: 'Intensiver Geschmack', desktopStyle: { top: '-12%', right: '-15%' } },
      { id: 'b3', text: 'Zuckerarm', desktopStyle: { top: '45%', left: '-26%' } },
      { id: 'b4', text: 'Reich an Antioxidantien', desktopStyle: { bottom: '-12%', left: '-10%' } },
      { id: 'b5', text: 'Hoher Vitamin-C-Gehalt', desktopStyle: { bottom: '-15%', right: '-10%' } },
    ],
  },
  {
    id: 'himbeeren',
    badge: 'SCHWEIZER HIMBEEREN',
    title: 'Herrlich knusprig. Natürlich süss.',
    subtitle:
      'Feinste aromatische Himbeeren, perfekt für dein Müsli, Porridge oder als gesunder Snack für zwischendurch.',
    ctaText: 'Himbeeren Probieren',
    ctaLink: '/shop?frucht=himbeer',
    accentColor: '#e11d48',
    bowlImage: '/images/spotlight/erdbeeren-bowl.png',
    benefits: [
      { id: 'h1', text: 'Hoher Ballaststoffgehalt', desktopStyle: { top: '-16%', left: '-8%' } },
      { id: 'h2', text: 'Fruchtig & Kross', desktopStyle: { top: '-12%', right: '-16%' } },
      { id: 'h3', text: 'Ohne Zuckerzusatz', desktopStyle: { top: '45%', left: '-25%' } },
      { id: 'h4', text: '100% Pures Beerenaroma', desktopStyle: { bottom: '-14%', right: '-8%' } },
      { id: 'h5', text: 'Schonend liofilisiert', desktopStyle: { bottom: '-12%', left: '-12%' } },
    ],
  },
  {
    id: 'erdbeeren',
    badge: 'FRUCHTIG & SÜSS',
    title: 'Sommerfrische Erdbeeren das ganze Jahr.',
    subtitle:
      'Knusprig, intensiv aromatisch und herrlich süss – wie frisch vom Schweizer Erdbeerfeld gepflückt.',
    ctaText: 'Erdbeeren Geniessen',
    ctaLink: '/shop?frucht=erdbeer',
    accentColor: '#dc2626',
    bowlImage: '/images/spotlight/heidelbeeren-bowl.png',
    benefits: [
      { id: 'e1', text: 'Reich an Folsäure', desktopStyle: { top: '-15%', left: '-10%' } },
      { id: 'e2', text: 'Herrlich knusprig', desktopStyle: { top: '-13%', right: '-14%' } },
      { id: 'e3', text: '100% Fruchteigen', desktopStyle: { top: '45%', left: '-26%' } },
      { id: 'e4', text: 'Voller Vitamine', desktopStyle: { bottom: '-13%', left: '-10%' } },
      { id: 'e5', text: 'Schweizer Anbau', desktopStyle: { bottom: '-15%', right: '-11%' } },
    ],
  },
  {
    id: 'heidelbeeren',
    badge: 'WILDE NORDISCHE SUPERFRUCHT',
    title: 'Tiefblaues Beerenaroma der Extraklasse.',
    subtitle:
      'Echte handverlesene Waldheidelbeeren, vollgepackt mit zellschützenden Anthocyanen und feinem Crunch.',
    ctaText: 'Heidelbeeren Kaufen',
    ctaLink: '/shop?frucht=heidelbeer',
    accentColor: '#4338ca',
    bowlImage: '/images/spotlight/erdbeeren-bowl.png',
    benefits: [
      { id: 'w1', text: 'Zellschutz & Anti-Aging', desktopStyle: { top: '-16%', left: '-11%' } },
      { id: 'w2', text: 'Tiefblaues Aroma', desktopStyle: { top: '-12%', right: '-15%' } },
      { id: 'w3', text: '100% Superfood', desktopStyle: { top: '46%', left: '-26%' } },
      { id: 'w4', text: 'Wertvolle Anthocyane', desktopStyle: { bottom: '-14%', right: '-10%' } },
      { id: 'w5', text: 'Ideal für Porridge', desktopStyle: { bottom: '-12%', left: '-12%' } },
    ],
  },
  {
    id: 'mango',
    badge: 'EXOTISCHER GENUSS',
    title: 'Goldgelbe Süsse direkt aus den Tropen.',
    subtitle:
      'Herrlich aromatische Mangostücke mit unvergleichlichem Crunch – sonnengereift und schonend getrocknet.',
    ctaText: 'Mango Entdecken',
    ctaLink: '/shop?frucht=mango',
    accentColor: '#d97706',
    bowlImage: '/images/spotlight/heidelbeeren-bowl.png',
    benefits: [
      { id: 'm1', text: 'Reich an Vitamin A & C', desktopStyle: { top: '-14%', right: '-12%' } },
      { id: 'm2', text: 'Exotischer Crunch', desktopStyle: { top: '-15%', left: '-11%' } },
      { id: 'm3', text: 'Keine Zusatzstoffe', desktopStyle: { top: '45%', left: '-26%' } },
      { id: 'm4', text: 'Natürliche Fruchtsüsse', desktopStyle: { bottom: '-13%', left: '-10%' } },
      { id: 'm5', text: 'Perfekt als Snack', desktopStyle: { bottom: '-15%', right: '-12%' } },
    ],
  },
];

const AUTOPLAY_DURATION = 7000;

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentSlide = HERO_SLIDES[activeIndex];

  const goToSlide = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  // Autoplay rotation every 7 seconds (paused on hover)
  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      nextSlide();
    }, AUTOPLAY_DURATION);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, nextSlide]);

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
      className="relative min-h-fit md:min-h-[85vh] lg:min-h-[90vh] w-full overflow-hidden flex items-center justify-center bg-stone-50 transition-colors duration-700"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* 
        Subtle Ambient Radial Gradient around the central image 
        (gently lights up the background with the fruit color)
      */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] rounded-full blur-3xl opacity-35 lg:opacity-25 pointer-events-none transition-all duration-1000"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${currentSlide.accentColor} 0%, transparent 68%)`,
        }}
      />

      {/* ========================================================
          DESKTOP LAYOUT (lg: ekrani - netaknuto prema dizajnu)
          ======================================================== */}

      {/* 1. GORNJI LIJEVI UGAO (Desktop: Naslov i Podnaslov) */}
      <div
        key={`hero-text-${currentSlide.id}`}
        className="hidden lg:block absolute top-12 left-8 md:top-16 md:left-16 z-20 max-w-lg text-left space-y-4"
      >
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-white border border-stone-200/90 shadow-2xs text-stone-800">
          <span
            className="w-2 h-2 rounded-full shadow-2xs"
            style={{ backgroundColor: currentSlide.accentColor }}
          />
          <span>🇨🇭 {currentSlide.badge}</span>
        </div>

        {/* Glavni H1 Naslov */}
        <h1 className="text-stone-900 font-extrabold text-4xl md:text-5xl xl:text-6xl tracking-tight leading-[1.08]">
          {currentSlide.title}
        </h1>

        {/* Kratak opis / podnaslov */}
        <p className="text-stone-600 text-base md:text-lg lg:text-xl font-normal mt-3 max-w-lg leading-relaxed">
          {currentSlide.subtitle}
        </p>
      </div>

      {/* 2. TAČNI CENTAR EKRANA (Desktop: Povećana Zdjelica i Plutajući Bedževi) */}
      <div className="hidden lg:flex relative z-10 items-center justify-center">
        <div className="relative lg:w-[520px] lg:h-[520px] xl:w-[560px] xl:h-[560px] flex items-center justify-center">
          {/* Lebdeća animacija zdjelice (CSS floating) */}
          <div className="relative w-full h-full rounded-full animate-hero-float flex items-center justify-center">
            {/* Blagi obrubni sjaj u boji ploda tik iza zdjelice */}
            <div
              className="absolute inset-4 rounded-full blur-3xl opacity-35 transition-all duration-1000"
              style={{ backgroundColor: currentSlide.accentColor }}
            />

            {/* Velika okrugla zdjelica (shadow-2xl, bez okvira) */}
            <div
              key={`hero-bowl-${currentSlide.id}`}
              className="relative w-full h-full rounded-full overflow-hidden shadow-2xl"
            >
              <Image
                src={currentSlide.bowlImage}
                alt={currentSlide.title}
                fill
                unoptimized
                priority
                className="object-cover rounded-full"
              />
            </div>
          </div>

          {/* Floating Glassmorphism Badges (DESKTOP: Stroga Sigurnosna Zona) */}
          <div
            key={`hero-badges-${currentSlide.id}`}
            className="absolute inset-0 pointer-events-none z-30"
          >
            {currentSlide.benefits.map((benefit, idx) => {
              const animClass = `animate-badge-enter-${idx + 1}`;
              return (
                <div
                  key={`${currentSlide.id}-${benefit.id}`}
                  style={benefit.desktopStyle}
                  className={`absolute pointer-events-auto whitespace-nowrap ${animClass}`}
                >
                  <div className="bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-md border border-stone-200/90 text-sm font-semibold flex items-center gap-2.5 text-stone-900 hover:scale-105 hover:shadow-lg hover:border-stone-300 transition-all duration-200 cursor-default">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0 shadow-2xs"
                      style={{ backgroundColor: currentSlide.accentColor }}
                    />
                    <span>{benefit.text}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. DONJI DESNI UGAO (Desktop: CTA Dugmad) */}
      <div className="hidden lg:flex absolute bottom-10 right-8 md:right-16 z-20 items-center gap-3.5">
        <Link
          href={currentSlide.ctaLink}
          className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-extrabold text-sm shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
        >
          <span>{currentSlide.ctaText}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>

        <Link
          href="/shop"
          className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white hover:bg-stone-100 text-stone-800 font-bold text-sm border border-stone-200/90 shadow-2xs hover:shadow-sm transition-all cursor-pointer"
        >
          <span>Alle Früchte</span>
        </Link>
      </div>

      {/* 4. DESNA VERTIKALNA SREDINA (Desktop: Vertikalna Navigacija) */}
      <div className="hidden lg:flex absolute right-8 md:right-12 top-1/2 -translate-y-1/2 z-20 flex-col items-center gap-4 bg-white/90 backdrop-blur-md px-2.5 py-4 rounded-full border border-stone-200/90 shadow-md text-stone-800">
        {/* Strelice gore [▲] */}
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Vorheriger Slide"
          className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition hover:scale-105 active:scale-95 cursor-pointer"
        >
          <ChevronUp className="w-4 h-4" />
        </button>

        {/* Vertikalni brojač slajdova */}
        <div className="flex flex-col items-center font-mono text-xs my-0.5 select-none">
          <span className="font-black text-xs text-stone-900">
            {String(activeIndex + 1).padStart(2, '0')}
          </span>
          <span className="w-3 h-px bg-stone-300 my-1" />
          <span className="font-semibold text-stone-400 text-[10px]">
            {String(HERO_SLIDES.length).padStart(2, '0')}
          </span>
        </div>

        {/* Vertikalne tačkice */}
        <div className="flex flex-col items-center gap-1.5 my-1">
          {HERO_SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => goToSlide(idx)}
              aria-label={`Gehe zu ${slide.badge}`}
              className={`rounded-full transition-all duration-300 cursor-pointer ${
                idx === activeIndex
                  ? 'w-1.5 h-5 bg-stone-900'
                  : 'w-1.5 h-1.5 bg-stone-300 hover:bg-stone-400'
              }`}
            />
          ))}
        </div>

        {/* Strelice dole [▼] */}
        <button
          type="button"
          onClick={nextSlide}
          aria-label="Nächster Slide"
          className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition hover:scale-105 active:scale-95 cursor-pointer"
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* ========================================================
          MOBILNI I TABLET RASPORED (< lg breakpoint)
          ======================================================== */}
      <div className="lg:hidden flex flex-col justify-between items-center text-center px-4 pt-6 pb-4 md:py-6 min-h-fit md:min-h-[85vh] max-w-lg md:max-w-2xl mx-auto relative z-10 w-full">
        {/* 1. VRH (Naslov i Bedž) */}
        <div className="w-full flex flex-col items-center pt-2 sm:pt-4">
          {/* Bedž slajda */}
          <div className="inline-flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-2 bg-white border border-stone-200/90 shadow-2xs text-stone-800">
            <span
              className="w-2 h-2 rounded-full shrink-0 shadow-2xs"
              style={{ backgroundColor: currentSlide.accentColor }}
            />
            <span>🇨🇭 {currentSlide.badge}</span>
          </div>

          {/* Glavni H1 naslov */}
          <h1 className="text-stone-900 font-extrabold text-3xl sm:text-4xl md:text-5xl leading-tight text-center tracking-tight">
            {currentSlide.title}
          </h1>

          {/* Kratak podnaslov */}
          <p className="text-stone-600 text-sm sm:text-base mt-2 max-w-md mx-auto line-clamp-2 leading-relaxed">
            {currentSlide.subtitle}
          </p>
        </div>

        {/* 2. CENTAR (Činija sa navigacijom levo/desno) */}
        <div className="relative flex items-center justify-center my-auto w-full py-4">
          {/* Levo dugme za prethodni slajd */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Vorheriger Slide"
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/95 backdrop-blur-md border border-stone-200/90 text-stone-800 shadow-md flex items-center justify-center active:scale-95 cursor-pointer hover:bg-stone-50 transition-all"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Činija u sredini sa blagom lebdećom animacijom */}
          <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 mx-auto flex items-center justify-center animate-hero-float">
            {/* Blagi obrubni sjaj u boji ploda iza zdjelice */}
            <div
              className="absolute inset-2 rounded-full blur-2xl opacity-35 transition-all duration-1000"
              style={{ backgroundColor: currentSlide.accentColor }}
            />

            <div
              key={`mobile-bowl-${currentSlide.id}`}
              className="relative w-full h-full rounded-full overflow-hidden shadow-2xl"
            >
              <Image
                src={currentSlide.bowlImage}
                alt={currentSlide.title}
                fill
                unoptimized
                priority
                className="object-cover rounded-full"
              />
            </div>
          </div>

          {/* Desno dugme za sledeći slajd */}
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Nächster Slide"
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/95 backdrop-blur-md border border-stone-200/90 text-stone-800 shadow-md flex items-center justify-center active:scale-95 cursor-pointer hover:bg-stone-50 transition-all"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* 3. DNO (Bedževi o voću + CTA dugmad) */}
        <div className="w-full flex flex-col items-center">
          {/* Bedževi o voću */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-2 md:mb-3 w-full">
            {currentSlide.benefits.map((benefit) => (
              <div
                key={`mobile-${currentSlide.id}-${benefit.id}`}
                className="bg-white/90 backdrop-blur-md border border-stone-200/90 px-3 py-1.5 rounded-xl text-xs sm:text-sm text-stone-900 font-medium shadow-2xs flex items-center gap-2"
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0 shadow-2xs"
                  style={{ backgroundColor: currentSlide.accentColor }}
                />
                <span>{benefit.text}</span>
              </div>
            ))}
          </div>

          {/* Dugmad za akciju (CTA) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
            <Link
              href={currentSlide.ctaLink}
              className="w-full sm:w-auto px-6 py-3 rounded-full text-sm font-extrabold shadow-md hover:shadow-lg bg-stone-900 hover:bg-stone-800 text-white flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>{currentSlide.ctaText}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/shop"
              className="w-full sm:w-auto px-6 py-3 rounded-full text-sm font-bold shadow-2xs hover:shadow-sm bg-white hover:bg-stone-100 border border-stone-200/90 text-stone-800 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Alle Früchte</span>
            </Link>
          </div>

          {/* Mobilni indikatori i brojač */}
          <div className="flex items-center justify-center gap-3 pt-2 md:pt-4">
            <div className="flex items-center gap-1.5">
              {HERO_SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(idx)}
                  aria-label={`Gehe zu Slide ${idx + 1}`}
                  className={`rounded-full transition-all duration-300 cursor-pointer ${
                    idx === activeIndex ? 'w-6 h-1.5 bg-stone-900' : 'w-1.5 h-1.5 bg-stone-300 hover:bg-stone-400'
                  }`}
                />
              ))}
            </div>
            <span className="font-mono text-xs text-stone-600 font-bold">
              {String(activeIndex + 1).padStart(2, '0')} / {String(HERO_SLIDES.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
