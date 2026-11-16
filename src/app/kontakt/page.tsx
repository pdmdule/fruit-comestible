import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Mail, MapPin, Globe, Clock } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Kontakt',
  description:
    'Kontaktieren Sie Fruit-Comestible in Schaffhausen, Schweiz: E-Mail info@fruit-comestible.ch, Adresse Sandackerstrasse 2, 8200 Schaffhausen.',
  alternates: {
    canonical: 'https://www.fruit-comestible.ch/kontakt',
  },
  openGraph: {
    title: 'Kontakt | Fruit-Comestible Schweiz',
    description:
      'Kontaktangaben und Kundenservice von Fruit-Comestible in Schaffhausen, Schweiz.',
    url: 'https://www.fruit-comestible.ch/kontakt',
    siteName: 'Fruit-Comestible',
    locale: 'de_CH',
    type: 'website',
  },
};

export default function KontaktPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen py-16 px-4">
      <div className="max-w-3xl mx-auto mb-6">
        <Breadcrumbs customItems={[{ label: 'Kontakt' }]} />
      </div>

      <main className="max-w-3xl mx-auto bg-white p-8 sm:p-12 rounded-2xl border border-stone-200 shadow-xs space-y-8 text-stone-700 leading-relaxed">
        <header className="space-y-3 border-b border-stone-200 pb-6">
          <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold bg-[#F4EFE6] text-stone-800 border border-stone-200">
            Schweizer Kundenservice
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
            Kontakt
          </h1>
          <p className="text-sm sm:text-base text-stone-600">
            Haben Sie Fragen zu unseren 100 % natürlichen gefriergetrockneten Früchten, zu Ihrer Bestellung oder zum Sortiment? Wir helfen Ihnen gerne weiter.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="p-5 rounded-xl bg-[#FAF8F5] border border-stone-200 space-y-2">
            <div className="flex items-center gap-2 text-stone-900 font-bold">
              <MapPin className="w-4 h-4 text-[#6c943e]" />
              <span>Adresse</span>
            </div>
            <p className="text-stone-700">
              Fruit-Comestible<br />
              Lukas Pem<br />
              Sandackerstrasse 2<br />
              8200 Schaffhausen<br />
              Schweiz
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#FAF8F5] border border-stone-200 space-y-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-stone-900 font-bold">
                <Mail className="w-4 h-4 text-[#6c943e]" />
                <span>E-Mail</span>
              </div>
              <p>
                <a
                  href="mailto:info@fruit-comestible.ch"
                  className="text-[#6c943e] hover:underline font-medium"
                >
                  info@fruit-comestible.ch
                </a>
              </p>
            </div>

            <div className="space-y-1 pt-2 border-t border-stone-200/80">
              <div className="flex items-center gap-2 text-stone-900 font-bold">
                <Globe className="w-4 h-4 text-[#6c943e]" />
                <span>Website</span>
              </div>
              <p>www.fruit-comestible.ch</p>
            </div>

            <div className="space-y-1 pt-2 border-t border-stone-200/80">
              <div className="flex items-center gap-2 text-stone-900 font-bold">
                <Clock className="w-4 h-4 text-[#6c943e]" />
                <span>Antwortzeit</span>
              </div>
              <p className="text-xs text-stone-600">Montag bis Freitag innerhalb von 24 Stunden</p>
            </div>
          </div>
        </div>

        <footer className="pt-6 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm">
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/impressum" className="text-[#6c943e] hover:underline font-medium">
              Impressum
            </Link>
            <Link href="/agb" className="text-[#6c943e] hover:underline font-medium">
              AGB
            </Link>
            <Link href="/datenschutz" className="text-[#6c943e] hover:underline font-medium">
              Datenschutzerklärung
            </Link>
          </div>
          <Link href="/shop" className="text-stone-600 hover:text-stone-900 hover:underline">
            Zurück zum Shop
          </Link>
        </footer>
      </main>
    </div>
  );
}
