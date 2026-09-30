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

  // Automatski resetuj na prvu sliku ako se promene slike (npr. pri prelasku na drugi oblik voća)
  useEffect(() => {
    setActiveIndex(0);
  }, [images]);

  const currentImage = galleryImages[activeIndex] || galleryImages[0];

  return (
    <div className="space-y-4">
      {/* Main Large Image with Subtle Hover Zoom */}
      <div className="relative aspect-square sm:aspect-4/3 rounded-3xl overflow-hidden bg-stone-100 border border-stone-200 shadow-xs group">
        <Image
          src={currentImage}
          alt={`${title} - Ansicht ${activeIndex + 1}`}
          fill
          priority
          unoptimized
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
        />

        {/* Overlay Badges */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/95 text-stone-800 backdrop-blur-md shadow-xs border border-stone-200/80">
            <span className="text-sm">🇨🇭</span>
            <span>Herkunft: {originCountry || 'Schweiz / Europa'}</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/95 text-emerald-800 backdrop-blur-md shadow-xs border border-emerald-200/80">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>100% Gefriergetrocknet</span>
          </span>
        </div>
      </div>

      {/* Thumbnail Switcher - prikazuje se isključivo ako proizvod ima 2 ili više slika */}
      {galleryImages.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-1 pt-1">
          {galleryImages.map((img, idx) => {
            const isSelected = idx === activeIndex;
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
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
