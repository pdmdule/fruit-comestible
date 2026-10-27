'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Sparkles } from 'lucide-react';

interface ProductImageGalleryProps {
  images?: string[];
  title: string;
  originCountry?: string;
}

export default function ProductImageGallery({
  images,
  title,
  originCountry,
}: ProductImageGalleryProps) {
  // Prikazuj isključivo slike iz trenutno učitanog proizvoda (product.images)
  const validImages = Array.isArray(images)
    ? images.filter((img): img is string => Boolean(img && typeof img === 'string' && img.trim()))
    : [];

  const galleryImages =
    validImages.length > 0
      ? validImages
      : ['https://images.unsplash.com/photo-1543528176-61b239494933?q=80&w=1200&auto=format&fit=crop'];

  const [activeIndex, setActiveIndex] = useState(0);

  // Touch Swipe & Animation State
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchCurrentX, setTouchCurrentX] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const minSwipeDistance = 45; // minimalna udaljenost u pikselima za registriranje swipe-a

  const onTouchStart = (e: React.TouchEvent) => {
    if (galleryImages.length <= 1) return;
    setTouchStartX(e.targetTouches[0].clientX);
    setTouchCurrentX(e.targetTouches[0].clientX);
    setIsDragging(true);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || touchStartX === null) return;
    setTouchCurrentX(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!isDragging || touchStartX === null || touchCurrentX === null) {
      setIsDragging(false);
      setTouchStartX(null);
      setTouchCurrentX(null);
      return;
    }

    const distance = touchStartX - touchCurrentX;
    if (distance > minSwipeDistance && activeIndex < galleryImages.length - 1) {
      setActiveIndex((prev) => prev + 1); // Sljedeća slika
    } else if (distance < -minSwipeDistance && activeIndex > 0) {
      setActiveIndex((prev) => prev - 1); // Prethodna slika
    }

    setIsDragging(false);
    setTouchStartX(null);
    setTouchCurrentX(null);
  };

  // Automatski resetuj na prvu sliku ako se promene slike (npr. pri prelasku na drugi oblik voća)
  useEffect(() => {
    setActiveIndex(0);
    setIsDragging(false);
    setTouchStartX(null);
    setTouchCurrentX(null);
  }, [images]);

  // Real-time touch drag offset za responzivnu swipe animaciju
  let dragOffset = 0;
  if (isDragging && touchStartX !== null && touchCurrentX !== null) {
    dragOffset = touchCurrentX - touchStartX;
    // Otpor na krajevima (boundary resistance)
    if (
      (activeIndex === 0 && dragOffset > 0) ||
      (activeIndex === galleryImages.length - 1 && dragOffset < 0)
    ) {
      dragOffset = dragOffset * 0.3;
    }
  }

  return (
    <div className="space-y-4 w-full">
      {/* Main Large Image with Smooth Swipe Animation Track */}
      <div
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        className="relative touch-pan-y select-none aspect-square sm:aspect-4/3 w-full rounded-3xl overflow-hidden bg-stone-100 border border-stone-200 shadow-xs group cursor-grab active:cursor-grabbing"
      >
        {/* Animated Carousel Slides Track */}
        <div
          className="flex h-full w-full will-change-transform"
          style={{
            transform:
              dragOffset !== 0
                ? `translateX(calc(-${activeIndex * 100}% + ${dragOffset}px))`
                : `translateX(-${activeIndex * 100}%)`,
            transition: isDragging
              ? 'none'
              : 'transform 320ms cubic-bezier(0.25, 1, 0.5, 1)',
          }}
        >
          {galleryImages.map((img, idx) => (
            <div
              key={idx}
              className="relative w-full h-full shrink-0 flex-none select-none overflow-hidden"
            >
              <Image
                src={img}
                alt={`${title} - Ansicht ${idx + 1}`}
                fill
                priority={idx === 0}
                unoptimized
                sizes="(max-width: 1024px) 100vw, 55vw"
                className={`object-cover transition-transform duration-700 ease-out pointer-events-none select-none ${
                  idx === activeIndex ? 'lg:group-hover:scale-105' : ''
                }`}
              />
            </div>
          ))}
        </div>

        {/* Overlay Badges */}
        {(() => {
          const isSerbia = originCountry?.toLowerCase().includes('serbi') || originCountry?.toLowerCase().includes('srbij');
          const countryFlag = isSerbia
            ? '🇷🇸'
            : originCountry?.toLowerCase().includes('peru')
            ? '🇵🇪'
            : originCountry?.toLowerCase().includes('ecuador')
            ? '🇪🇨'
            : originCountry?.toLowerCase().includes('span')
            ? '🇪🇸'
            : originCountry?.toLowerCase().includes('costa')
            ? '🇨🇷'
            : originCountry?.toLowerCase().includes('schweden')
            ? '🇸🇪'
            : '🇨🇭';
          return (
            <div className="absolute top-4 left-4 flex flex-wrap gap-2 pointer-events-none z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/95 text-stone-800 backdrop-blur-md shadow-xs border border-stone-200/80">
                <span className="text-sm">{countryFlag}</span>
                <span>Herkunft: {originCountry || 'Schweiz'}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/95 text-emerald-800 backdrop-blur-md shadow-xs border border-emerald-200/80">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Gefriergetrocknet</span>
              </span>
            </div>
          );
        })()}
      </div>

      {/* Dots Pagination na mobilnim uređajima */}
      {galleryImages.length > 1 && (
        <div className="flex justify-center items-center gap-1.5 mt-2 lg:hidden">
          {galleryImages.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              aria-label={`Zu Bild ${idx + 1} wechseln`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === idx
                  ? 'w-6 bg-stone-900 dark:bg-stone-100'
                  : 'w-1.5 bg-stone-300 dark:bg-stone-600 hover:bg-stone-400'
              }`}
            />
          ))}
        </div>
      )}

      {/* Thumbnail Switcher - vraćen na lijevu stranu sa 5px paddingom */}
      {galleryImages.length > 1 && (
        <div className="flex items-center justify-start gap-2.5 sm:gap-3 mt-3 pl-[5px] pr-2 overflow-x-auto scrollbar-none no-scrollbar w-full pb-1 pt-1">
          {galleryImages.map((img, idx) => {
            const isSelected = activeIndex === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIndex(idx)}
                aria-label={`Bild ${idx + 1} auswählen`}
                className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 transition-all duration-200 bg-stone-100 cursor-pointer ${
                  isSelected
                    ? 'ring-2 ring-stone-900 ring-offset-2 border-transparent scale-102 shadow-xs'
                    : 'border border-stone-200 opacity-60 hover:opacity-100 hover:border-stone-400'
                }`}
              >
                <Image
                  src={img}
                  alt={`${title} Thumbnail ${idx + 1}`}
                  fill
                  unoptimized
                  sizes="96px"
                  className="object-cover pointer-events-none"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export { ProductImageGallery, type ProductImageGalleryProps };
export const ProductGallery = ProductImageGallery;
export type ProductGalleryProps = ProductImageGalleryProps;
