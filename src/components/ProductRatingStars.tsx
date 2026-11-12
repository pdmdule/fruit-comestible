import React from 'react';
import { Star } from 'lucide-react';

interface ProductRatingStarsProps {
  rating: number; // e.g. 4.8
  maxStars?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
  showNumeric?: boolean;
}

const SIZE_MAP = {
  xs: 'w-3 h-3',
  sm: 'w-3.5 h-3.5',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
};

export default function ProductRatingStars({
  rating,
  maxStars = 5,
  size = 'sm',
  className = '',
  showNumeric = false,
}: ProductRatingStarsProps) {
  const starSize = SIZE_MAP[size];
  const roundedRating = Math.round(rating * 10) / 10;

  return (
    <div className={`inline-flex items-center gap-1 ${className}`}>
      <div className="flex items-center gap-0.5" aria-label={`Bewertung: ${roundedRating} von ${maxStars} Sternen`}>
        {Array.from({ length: maxStars }).map((_, index) => {
          const starValue = index + 1;
          const isFilled = rating >= starValue;
          const isHalf = !isFilled && rating >= starValue - 0.5;

          if (isFilled) {
            return (
              <Star
                key={index}
                className={`${starSize} text-amber-400 fill-amber-400`}
              />
            );
          }

          if (isHalf) {
            return (
              <div key={index} className={`relative ${starSize}`}>
                <Star className={`absolute inset-0 ${starSize} text-stone-200 fill-stone-200`} />
                <div className="absolute inset-0 overflow-hidden w-1/2">
                  <Star className={`${starSize} text-amber-400 fill-amber-400`} />
                </div>
              </div>
            );
          }

          return (
            <Star
              key={index}
              className={`${starSize} text-stone-200 fill-stone-100`}
            />
          );
        })}
      </div>

      {showNumeric && (
        <span className="font-bold text-stone-900 text-xs sm:text-sm ml-0.5">
          {roundedRating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
