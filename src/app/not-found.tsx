import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Compass, Home, ShoppingBag } from 'lucide-react';

export const metadata: Metadata = {
  title: '404 – Seite nicht gefunden | Fruit Comestible',
  description:
    'Die gesuchte Seite wurde leider nicht gefunden. Entdecke unsere 100% natürlichen gefriergetrockneten Früchte im Online-Shop.',
};

const QUICK_LINKS = [
  { label: 'Beeren', href: '/shop/beeren' },
  { label: 'Müesli & Mixes', href: '/shop/mixes' },
  { label: 'Fruchtpulver', href: '/shop/fruchtpulver' },
  { label: 'Schokolade', href: '/shop/schokolade' },
  { label: 'Rezepte & Wissen', href: '/blog' },
  { label: 'Kontakt & Impressum', href: '/agb#gerichtsstand' },
];

export default function NotFound() {
  return (
    <main className="min-h-[75vh] bg-[#FAF8F5] flex items-center justify-center px-4 py-16 sm:py-24">
      <div className="max-w-2xl w-full bg-[#F4EFE6]/70 border border-stone-200/90 rounded-3xl p-8 sm:p-12 text-center shadow-sm">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FAF8F5] border border-stone-200 text-[#A0522D] shadow-xs">
          <Compass className="h-8 w-8 stroke-[1.5]" aria-hidden="true" />
        </div>

        <span className="inline-block px-4 py-1.5 rounded-full bg-[#FAF8F5] border border-stone-200 text-xs font-medium tracking-widest uppercase text-[#A0522D] mb-5">
          404 – Seite nicht gefunden
        </span>

        <h1 className="font-serif text-3xl sm:text-4xl lg:text-[2.6rem] leading-tight text-stone-900 mb-4">
          Hoppla! Diese Frucht ist uns wohl vom Baum gefallen.
        </h1>

        <p className="text-stone-600 text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-9">
          Die gesuchte Seite wurde möglicherweise verschoben, umbenannt oder ist
          vorübergehend nicht verfügbar. Entdecke stattdessen unsere 100%
          natürlichen gefriergetrockneten Früchte aus der Schweiz.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-10">
          <Link
            href="/shop"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-stone-900 px-7 py-3.5 text-sm font-medium text-[#FAF8F5] hover:bg-stone-800 transition-colors"
          >
            <ShoppingBag className="h-4 w-4" aria-hidden="true" />
            <span>Zurück zum Shop</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#FAF8F5] border border-stone-300 px-7 py-3.5 text-sm font-medium text-stone-800 hover:bg-stone-100 hover:border-stone-400 transition-colors"
          >
            <Home className="h-4 w-4" aria-hidden="true" />
            <span>Zur Startseite</span>
          </Link>
        </div>

        <div className="border-t border-stone-200/90 pt-7">
          <p className="text-xs font-medium uppercase tracking-widest text-stone-500 mb-4">
            Beliebte Bereiche entdecken
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {QUICK_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full bg-[#FAF8F5] border border-stone-200 px-4 py-1.5 text-xs sm:text-sm text-stone-700 hover:border-[#A0522D]/50 hover:text-[#A0522D] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
