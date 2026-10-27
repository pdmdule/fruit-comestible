'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export interface HeroSlideData {
  id: string;
  kicker: string;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  image: string;
  imageAlt: string;
}

export const HERO_SLIDES: HeroSlideData[] = [
  {
    id: 'premium-fruits',
    kicker: 'PREMIUM QUALITÄT FÜR FEINSCHMECKER',
    title: 'Gefriergetrocknete Schweizer Früchte',
    description:
      'Schonend gefriergetrocknete Beeren und Früchte in Spitzenqualität. Intensives Aroma, 100 % Naturprodukt ohne Zuckerzusatz – ideal für Müsli, Bowls und feine Rezepte.',
    ctaText: 'JETZT ENTDECKEN',
    ctaLink: '/shop',
    image:
      'https://loinzvvygklupiomoisu.supabase.co/storage/v1/object/public/hero/IMG_9625.webp',
    imageAlt: 'Schale mit gefriergetrockneten Früchten und Beeren auf einem Holztisch',
  },
  {
    id: 'pure-crunch',
    kicker: '100% NATURPRODUKT',
    title: 'Pure Frucht. Intensiver Crunch.',
    description:
      'Bis zu 95 % aller Vitamine und das volle Naturaroma bleiben erhalten. Natürlich süss, knackig und reich an wertvollen Antioxidantien.',
    ctaText: 'SORTIMENT ERKUNDEN',
    ctaLink: '/shop',
    image:
      'https://images.unsplash.com/photo-1517673400267-0251440c45dc?q=85&w=1600&auto=format&fit=crop',
    imageAlt: 'Gesunde Frühstücks-Bowl garniert mit gefriergetrockneten Beeren',
  },
  {
    id: 'swiss-variety',
    kicker: 'SCHWEIZER MANUFAKTUR SEIT 2019',
    title: 'Edle Beeren für höchste Ansprüche',
    description:
      'Handverlesene Erdbeeren, Himbeeren und wilde Waldheidelbeeren. Höchste Reinheit ohne künstliche Aromen oder Konservierungsstoffe.',
    ctaText: 'BESTSELLER PROBIEREN',
    ctaLink: '/shop',
    image:
      'https://images.unsplash.com/photo-1553530666-ba11a7da3888?q=85&w=1600&auto=format&fit=crop',
    imageAlt: 'Köstliche Auswahl an gefriergetrocknetem Frucht-Granulat und ganzen Beeren',
  },
];

export function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Optional automatic slide progression every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const currentSlide = HERO_SLIDES[activeIndex];

  return (
    <section className="w-full lg:h-[75vh] lg:min-h-[580px] lg:max-h-[780px] grid grid-cols-1 lg:grid-cols-2 overflow-hidden mb-0">
      {/* 1. LIJEVA STRANA (TEKST I CTA) */}
      <div className="order-2 lg:order-1 bg-[#F4EFE6] dark:bg-[#1E1B18] flex items-center justify-center p-8 sm:p-12 lg:p-16">
        <div className="max-w-xl mx-auto lg:mx-0 text-left w-full">
          {/* Nadnaslov (Kicker) */}
          <span className="text-xs font-bold tracking-widest text-stone-700 dark:text-stone-300 uppercase mb-3 sm:mb-4 block">
            {currentSlide.kicker}
          </span>

          {/* Glavni naslov (H1) */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight leading-tight mb-4">
            {currentSlide.title}
          </h1>

          {/* Opisni tekst */}
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 leading-relaxed mb-6 sm:mb-8 max-w-md">
            {currentSlide.description}
          </p>

          {/* CTA dugme */}
          <div>
            <Link
              href={currentSlide.ctaLink}
              className="inline-block px-7 py-3.5 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-md hover:bg-stone-800 dark:hover:bg-white transition-all shadow-sm"
            >
              {currentSlide.ctaText}
            </Link>
          </div>

          {/* Slider indikatori (Pagination Dots) */}
          <div className="flex items-center gap-2 mt-8">
            {HERO_SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => setActiveIndex(idx)}
                aria-label={`Gehe zu Folie ${idx + 1}`}
                className={`transition-all duration-300 cursor-pointer ${
                  activeIndex === idx
                    ? 'w-6 h-2 rounded-full bg-stone-900 dark:bg-stone-100'
                    : 'w-2 h-2 rounded-full border border-stone-500/80 bg-transparent hover:bg-stone-500/40 dark:border-stone-400 dark:hover:bg-stone-400/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 2. DESNA STRANA (FOTOGRAFIJA) */}
      <div className="order-1 lg:order-2 relative w-full h-[360px] sm:h-[450px] lg:h-full overflow-hidden bg-stone-200">
        <Image
          src={currentSlide.image}
          alt={currentSlide.imageAlt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover object-center transition-opacity duration-700"
        />
      </div>
    </section>
  );
}

export default Hero;
