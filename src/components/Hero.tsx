'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface HeroSlideData {
  id: string | number;
  kicker: string;
  title: string;
  description: string;
  ctaText?: string;
  buttonText?: string;
  ctaLink?: string;
  href?: string;
  image: string;
  imageAlt: string;
  // Boja pozadine lijeve strane sa sadržajem:
  bgClass: string;
  // HEX kod za 100% siguran inline stil:
  bgColor: string;
}

export type HeroSlide = HeroSlideData;

export const HERO_SLIDES: HeroSlideData[] = [
  {
    id: 'premium-fruits',
    kicker: 'PREMIUM QUALITÄT AUS DER SCHWEIZ',
    title: 'Gefriergetrocknete Früchte aus der Schweiz',
    description:
      'Schonend gefriergetrocknete Beeren und Früchte in Premium-Qualität. Intensives Aroma, 100 % Naturprodukt ohne Zuckerzusatz – dein perfekter Begleiter für einen bewussten Lebensstil.',
    ctaText: 'Jetzt entdecken',
    ctaLink: '/shop',
    image:
      'https://loinzvvygklupiomoisu.supabase.co/storage/v1/object/public/hero/glavni%20hero.webp',
    imageAlt: 'Schale mit gefriergetrockneten Früchten und Beeren auf einem Holztisch',
    // 1. Topla prirodna krem/bež nijansa
    bgClass: 'bg-[#F4EFE6]',
    bgColor: '#F4EFE6',
  },
  {
    id: 'erdbeeren-bestseller',
    kicker: 'DER BESTSELLER',
    title: 'Gefriergetrocknete Erdbeeren',
    description:
      'Knusprige Erdbeerhälften voller Geschmack. 100 % pure Frucht, ideal als gesunder Snack für zwischendurch oder für dein perfektes Frühstück.',
    ctaText: 'Erdbeeren entdecken',
    ctaLink: '/shop?category=erdbeeren',
    image:
      'https://loinzvvygklupiomoisu.supabase.co/storage/v1/object/public/hero/NOVE%20HERO%201.webp',
    imageAlt: 'Gesunde Frühstücks-Bowl garniert mit gefriergetrockneten Beeren',
    // 2. Nježna bobičasta / jagoda roze nijansa (jasno uočljiva razlika)
    bgClass: 'bg-[#FCE7E7]',
    bgColor: '#FCE7E7',
  },
  {
    id: 'muesli-crunch',
    kicker: 'FRUCHTIGER CRUNCH',
    title: 'Fruchtiger Crunch für dein Schweizer Müesli',
    description:
      'Starte voller Energie in den Tag. Unser beliebter Müslimix und feines Fruchtgranulat ohne Zuckerzusatz machen jede Bowl zu einem echten Erlebnis.',
    ctaText: 'Müslimix shoppen',
    ctaLink: '/shop?category=mixes',
    image:
      'https://loinzvvygklupiomoisu.supabase.co/storage/v1/object/public/hero/Musli%20mix%20hero-new.webp',
    imageAlt: 'Köstliche Auswahl an gefriergetrocknetem Frucht-Granulat und ganzen Beeren',
    // 3. Topla zlatno-zobena / medena nijansa za müesli (jasno uočljiva razlika)
    bgClass: 'bg-[#F6EEDB]',
    bgColor: '#F6EEDB',
  },
];

const headingClasses =
  'text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight leading-tight mb-4';

export function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Automatska rotacija slajdova svakih 7 sekundi (pauzirana kada je miš iznad Hero sekcije)
  useEffect(() => {
    if (isHovered) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);

    return () => clearInterval(timer);
  }, [isHovered]);

  const currentSlide = HERO_SLIDES[activeIndex];
  const isFirstSlide = activeIndex === 0;

  return (
    <section
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-full lg:h-[75vh] lg:min-h-[580px] lg:max-h-[780px] grid grid-cols-1 lg:grid-cols-2 overflow-hidden mb-0 relative"
    >
      {/* 1. LIJEVA STRANA (TEKST I CTA S DINAMIČKOM POZADINSKOM BOJOM) */}
      <div
        style={{
          backgroundColor: currentSlide.bgColor,
          transition: 'background-color 700ms ease-in-out',
        }}
        className={`order-2 lg:order-1 flex items-center justify-center p-8 sm:p-12 lg:p-16 transition-colors duration-700 ease-in-out ${currentSlide.bgClass}`}
      >
        <div className="max-w-xl mx-auto lg:mx-0 text-left w-full">
          {/* Nadnaslov (Kicker) */}
          <span className="text-xs font-bold tracking-widest text-stone-800 uppercase mb-3 sm:mb-4 block">
            {currentSlide.kicker}
          </span>

          {/* Dinamički tag prema SEO pravilu: prvi je H1, ostali su H2 */}
          {isFirstSlide ? (
            <h1 className={headingClasses}>
              {currentSlide.title}
            </h1>
          ) : (
            <h2 className={headingClasses}>
              {currentSlide.title}
            </h2>
          )}

          {/* Opisni tekst */}
          <p className="text-sm sm:text-base text-stone-700 leading-relaxed mb-6 sm:mb-8 max-w-md font-medium">
            {currentSlide.description}
          </p>

          {/* CTA dugme */}
          <div>
            <Link
              href={currentSlide.ctaLink || currentSlide.href || '/shop'}
              className="inline-block px-7 py-3.5 bg-stone-900 text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-md hover:bg-stone-800 transition-all shadow-sm"
            >
              {currentSlide.ctaText || currentSlide.buttonText || 'Jetzt entdecken'}
            </Link>
          </div>

          {/* Slider indikatori (Pagination Dots & Navigacija) */}
          <div className="flex items-center gap-3 mt-8">
            <button
              type="button"
              onClick={() =>
                setActiveIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)
              }
              aria-label="Vorherige Folie"
              className="p-1.5 rounded-full text-stone-600 hover:text-stone-900 hover:bg-black/5 transition cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-1.5">
              {HERO_SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Gehe zu Folie ${idx + 1}`}
                  className="p-1.5 cursor-pointer flex items-center justify-center"
                >
                  <span
                    className={`block transition-all duration-300 ${
                      activeIndex === idx
                        ? 'w-6 h-2 rounded-full bg-stone-900'
                        : 'w-2 h-2 rounded-full border border-stone-500/80 bg-transparent hover:bg-stone-500/40'
                    }`}
                  />
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setActiveIndex((prev) => (prev + 1) % HERO_SLIDES.length)}
              aria-label="Nächste Folie"
              className="p-1.5 rounded-full text-stone-600 hover:text-stone-900 hover:bg-black/5 transition cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. DESNA STRANA (FOTOGRAFIJA - LCP optimizacija) */}
      <div className="order-1 lg:order-2 relative w-full h-[360px] sm:h-[450px] lg:h-full overflow-hidden bg-stone-200">
        {HERO_SLIDES.map((slide, idx) => {
          const isActive = activeIndex === idx;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <Image
                src={slide.image}
                alt={slide.imageAlt || slide.title}
                fill
                priority={idx === 0 || isActive}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Hero;
