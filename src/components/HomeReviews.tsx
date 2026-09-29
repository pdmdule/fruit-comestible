import React from 'react';
import { Star, CheckCircle2, Quote } from 'lucide-react';

interface ReviewItem {
  name: string;
  location: string;
  rating: number;
  text: string;
  product?: string;
  date: string;
}

const REVIEWS: ReviewItem[] = [
  {
    name: 'Corinne M.',
    location: 'Zürich',
    rating: 5,
    text: 'Die gefriergetrockneten Himbeeren sind der Wahnsinn im morgendlichen Porridge! Unglaublich intensiv und knusprig.',
    product: 'Gefriergetrocknete Himbeeren',
    date: 'Vor 3 Tagen',
  },
  {
    name: 'Thomas B.',
    location: 'Bern',
    rating: 5,
    text: 'Super schneller Versand mit der Schweizer Post. Die Erdbeer-Hälften schmecken wie frisch gepflückt. Werde definitiv wieder bestellen.',
    product: 'Erdbeeren - Hälften (100g)',
    date: 'Vor 1 Woche',
  },
  {
    name: 'Sarah L.',
    location: 'Luzern',
    rating: 5,
    text: 'Endlich ein gesunder Snack für die Kinder ohne Zuckerzusatz. Das Probiersäckli war perfekt zum Durchtesten!',
    product: 'Probiersäckli Mix',
    date: 'Vor 2 Wochen',
  },
  {
    name: 'Marc K.',
    location: 'Basel',
    rating: 5,
    text: 'Hervorragende Qualität und volles Aroma. Besonders das Granulat für meine Smoothie Bowls ist unschlagbar knusprig.',
    product: 'Erdbeeren - Granulat (200g)',
    date: 'Vor 2 Wochen',
  },
];

export default function HomeReviews() {
  return (
    <section className="space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold border border-rose-200/60">
          <span>★★★★★</span>
          <span>4.9 / 5.0 Kundenzufriedenheit</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-stone-900">
          Das sagen unsere Kunden in der Schweiz
        </h2>
        <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
          Über 1&apos;200 zufriedene Kunden geniessen unsere puren Früchte im Müsli,
          Joghurt oder als gesunden Snack.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {REVIEWS.map((r, i) => (
          <div
            key={i}
            className="flex flex-col justify-between bg-white border border-stone-200/80 rounded-2xl p-6 shadow-xs hover:shadow-md transition-shadow duration-200 space-y-4"
          >
            <div className="space-y-3">
              {/* Stars */}
              <div className="flex items-center gap-1">
                {Array.from({ length: r.rating }).map((_, idx) => (
                  <Star
                    key={idx}
                    className="w-4 h-4 text-amber-400 fill-amber-400"
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-sm text-stone-700 leading-relaxed font-normal italic">
                &ldquo;{r.text}&rdquo;
              </p>
            </div>

            <div className="pt-4 border-t border-stone-100 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-stone-900">
                  {r.name}
                </span>
                <span className="text-[11px] text-stone-400">
                  {r.location}
                </span>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Verifizierter Käufer 🇨🇭</span>
              </div>
              {r.product && (
                <p className="text-[11px] text-stone-400 truncate pt-0.5">
                  Gekauft: {r.product}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
