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
  Sparkles,
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
      className="relative min-h-[90vh] w-full overflow-hidden flex items-center justify-center bg-stone-50 transition-colors duration-700"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* 
        Subtle Ambient Radial Gradient around the central image 
        (fades gently into bg-stone-50)
      */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] rounded-full blur-3xl opacity-25 pointer-events-none transition-all duration-1000"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${currentSlide.accentColor} 0%, transparent 68%)`,
        }}
      />

      {/* ========================================================
          1. GORNJI LIJEVI UGAO (Desktop Content: Naslov i Podnaslov)
          ======================================================== */}
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

        {/* Glavni H1 Naslov (Usklađen sa svetlom pozadinom websajta: moderan, dubok kamen/crna) */}
        <h1 className="text-stone-900 font-extrabold text-4xl md:text-5xl xl:text-6xl tracking-tight leading-[1.08]">
          {currentSlide.title}
        </h1>

        {/* Kratak opis / podnaslov (Usklađen ton, čist i izuzetno čitljiv) */}
        <p className="text-stone-600 text-base md:text-lg lg:text-xl font-normal mt-3 max-w-lg leading-relaxed">
          {currentSlide.subtitle}
        </p>
      </div>

      {/* ========================================================
          2. TAČNI CENTAR EKRANA (Povećana Zdjelica Bez Okvira)
          ======================================================== */}
      <div className="relative z-10 flex items-center justify-center my-6 lg:my-0">
        <div className="relative w-80 h-80 sm:w-96 sm:h-96 md:w-[480px] md:h-[480px] lg:w-[520px] lg:h-[520px] xl:w-[560px] xl:h-[560px] flex items-center justify-center">
          {/* Lebdeća animacija zdjelice (CSS floating) */}
          <div className="relative w-full h-full rounded-full animate-hero-float flex items-center justify-center">
            {/* Blagi obrubni sjaj u boji ploda tik iza zdjelice */}
            <div
              className="absolute inset-4 rounded-full blur-3xl opacity-35 transition-all duration-1000"
              style={{ backgroundColor: currentSlide.accentColor }}
            />

            {/* Velika okrugla zdjelica (shadow-2xl, bez ikakvog okvira ili prstena) */}
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

            {/* Mobilne strelice za prebacivanje na stranama zdjelice */}
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Vorheriger Slajd"
              className="lg:hidden absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 w-10 h-10 rounded-full bg-white/95 text-stone-800 shadow-md border border-stone-200 flex items-center justify-center cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Nächster Slajd"
              className="lg:hidden absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-10 h-10 rounded-full bg-white/95 text-stone-800 shadow-md border border-stone-200 flex items-center justify-center cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Floating Glassmorphism Badges (DESKTOP: Stroga Sigurnosna Zona bez preklapanja!) */}
          <div
            key={`hero-badges-${currentSlide.id}`}
            className="hidden lg:block absolute inset-0 pointer-events-none z-30"
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

      {/* ========================================================
          3. DONJI DESNI UGAO (CTA Dugmad "Jetzt Entdecken" & "Alle Früchte")
          ======================================================== */}
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

      {/* ========================================================
          4. DESNA VERTIKALNA SREDINA (Vertikalna Navigacija Carousela)
          ======================================================== */}
      <div className="hidden lg:flex absolute right-8 md:right-12 top-1/2 -translate-y-1/2 z-20 flex-col items-center gap-4 bg-white/90 backdrop-blur-md px-2.5 py-4 rounded-full border border-stone-200/90 shadow-md text-stone-800">
        {/* Strelice gore [▲] */}
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Vorheriger Slajd"
          className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition hover:scale-105 active:scale-95 cursor-pointer"
        >
          <ChevronUp className="w-4 h-4" />
        </button>

        {/* Vertikalni brojač slajdova (npr. "01" / "05") */}
        <div className="flex flex-col items-center font-mono text-xs my-0.5 select-none">
          <span className="font-black text-xs text-stone-900">
            {String(activeIndex + 1).padStart(2, '0')}
          </span>
          <span className="w-3 h-px bg-stone-300 my-1" />
          <span className="font-semibold text-stone-400 text-[10px]">
            {String(HERO_SLIDES.length).padStart(2, '0')}
          </span>
        </div>

        {/* Vertikalne tačkice (pagination indicators) */}
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
          aria-label="Nächster Slajd"
          className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition hover:scale-105 active:scale-95 cursor-pointer"
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* ========================================================
          5. MOBILNI PRIKAZ (RESPONSIVE: Čisti vertikalni redoslijed u stilu websajta)
          ======================================================== */}
      <div className="lg:hidden flex flex-col items-center text-center space-y-6 px-4 py-12 z-20 w-full max-w-lg mx-auto">
        {/* Naslov i opis na vrhu */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white border border-stone-200/90 shadow-2xs text-stone-800">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: currentSlide.accentColor }}
            />
            <span>🇨🇭 {currentSlide.badge}</span>
          </div>

          <h1 className="text-stone-900 font-extrabold text-3xl sm:text-4xl tracking-tight leading-tight">
            {currentSlide.title}
          </h1>

          <p className="text-stone-600 text-sm sm:text-base font-normal max-w-md mx-auto leading-relaxed">
            {currentSlide.subtitle}
          </p>
        </div>

        {/* Bedževi sa opisima ispod zdjelice (Kompaktna mreža) */}
        <div className="w-full grid grid-cols-2 gap-2 pt-2">
          {currentSlide.benefits.map((benefit) => (
            <div
              key={benefit.id}
              className="bg-white px-3 py-2 rounded-xl border border-stone-200/90 shadow-2xs text-xs font-semibold flex items-center gap-2 text-stone-900"
            >
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: currentSlide.accentColor }}
              />
              <span className="truncate">{benefit.text}</span>
            </div>
          ))}
        </div>

        {/* Dugmad i navigacija na dnu ekrana */}
        <div className="w-full space-y-4 pt-2">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5">
            <Link
              href={currentSlide.ctaLink}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-stone-900 text-white font-extrabold text-sm shadow-md cursor-pointer"
            >
              <span>{currentSlide.ctaText}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white text-stone-800 font-bold text-sm border border-stone-200 shadow-2xs cursor-pointer"
            >
              <span>Alle Früchte</span>
            </Link>
          </div>

          {/* Mobilni indikatori i brojač */}
          <div className="flex items-center justify-center gap-4 pt-2">
            <div className="flex items-center gap-1.5">
              {HERO_SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(idx)}
                  aria-label={`Gehe zu Slajd ${idx + 1}`}
                  className={`rounded-full transition-all duration-300 cursor-pointer ${
                    idx === activeIndex ? 'w-6 h-2 bg-stone-900' : 'w-2 h-2 bg-stone-300'
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
