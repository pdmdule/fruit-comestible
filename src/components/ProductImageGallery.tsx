'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MapPin, Sparkles } from 'lucide-react';

interface ProductImageGalleryProps {
  images?: string[];
  title: string;
  originCountry?: string;
}

// Fallback high-quality curated images for freeze-dried strawberries if single image provided
const COMPLEMENTARY_IMAGES = [
  'https://images.unsplash.com/photo-1543528176-61b239494933?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1518635017498-87f514b751ba?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?q=80&w=1200&auto=format&fit=crop',
];

export default function ProductImageGallery({
  images,
  title,
  originCountry,
}: ProductImageGalleryProps) {
  // If array has at least 2 images, use them; otherwise complement with close-ups
  const galleryImages =
    images && images.length > 1
      ? images
      : images && images.length === 1
      ? [images[0], ...COMPLEMENTARY_IMAGES.slice(1)]
      : COMPLEMENTARY_IMAGES;

  const [activeIndex, setActiveIndex] = useState(0);
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

      {/* Thumbnail Switcher */}
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
                className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 transition-all duration-200 bg-stone-100 ${
                  isSelected
                    ? 'ring-2 ring-rose-600 ring-offset-2 border-transparent scale-102 shadow-xs'
                    : 'border border-stone-200 opacity-60 hover:opacity-100 hover:border-stone-300'
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
