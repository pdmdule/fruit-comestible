import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import PrintButton from '@/components/PrintButton';

export const metadata: Metadata = {
  title: 'Impressum',
  description:
    'Impressum und offizielle Kontaktangaben von Fruit-Comestible, Inhaber Lukas Pem, Sandackerstrasse 2, 8200 Schaffhausen, Schweiz.',
  alternates: {
    canonical: 'https://www.fruit-comestible.ch/impressum',
  },
  openGraph: {
    title: 'Impressum | Fruit-Comestible Schweiz',
    description:
      'Offizielle Kontaktangaben von Fruit-Comestible, Sandackerstrasse 2, 8200 Schaffhausen, Schweiz.',
    url: 'https://www.fruit-comestible.ch/impressum',
    siteName: 'Fruit-Comestible',
    locale: 'de_CH',
    type: 'website',
  },
};

export default function ImpressumPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen py-16 px-4 print:bg-white print:py-0 print:px-0">
      <div className="max-w-3xl mx-auto mb-6 print:hidden">
        <Breadcrumbs customItems={[{ label: 'Impressum' }]} />
      </div>

      <main className="max-w-3xl mx-auto bg-white p-8 sm:p-12 rounded-2xl border border-stone-200 shadow-xs print:border-none print:shadow-none print:p-0 print:max-w-none space-y-8 text-stone-700 leading-relaxed">
        {/* Document Header */}
        <header className="space-y-4 border-b border-stone-200 pb-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold bg-[#F4EFE6] text-stone-800 border border-stone-200">
              Stand: 15. November 2026
            </span>
            <PrintButton label="Drucken / PDF speichern" />
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 leading-tight">
            Impressum
          </h1>

          <p className="text-sm text-stone-500 font-medium">
           fruit-comestible | www.fruit-comestible.ch | Stand: 15. November 2026
          </p>
        </header>

        <div className="space-y-8 text-sm sm:text-[15px]">
          <section className="space-y-4">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
              Betreiberin des Online-Shops
            </h2>

            <div className="bg-[#FAF8F5] border border-stone-200 rounded-xl p-6 space-y-3 text-stone-800">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                  Firma
                </span>
                <span className="sm:col-span-2 font-bold text-stone-900">
                 fruit-comestible
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-stone-200/70">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                  Inhaber / Kontaktperson
                </span>
                <span className="sm:col-span-2 text-stone-900">Lukas Pem</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-stone-200/70">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                  Adresse
                </span>
                <span className="sm:col-span-2 text-stone-900">
                  Sandackerstrasse 2<br />
                  8200 Schaffhausen<br />
                  Schweiz
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-stone-200/70">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                  E-Mail
                </span>
                <span className="sm:col-span-2">
                  <a
                    href="mailto:info@fruit-comestible.ch"
                    className="text-[#6c943e] hover:underline font-medium"
                  >
                    info@fruit-comestible.ch
                  </a>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-stone-200/70">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                  Web
                </span>
                <span className="sm:col-span-2">
                  <a
                    href="https://www.fruit-comestible.ch"
                    className="text-[#6c943e] hover:underline font-medium"
                  >
                    www.fruit-comestible.ch
                  </a>
                </span>
              </div>
            </div>
          </section>

          <section className="space-y-3 pt-6 border-t border-stone-100">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
              Haftungsausschluss
            </h2>
            <p>
             fruit-comestible übernimmt keine Gewähr hinsichtlich der inhaltlichen Richtigkeit, Genauigkeit, Aktualität, Zuverlässigkeit und Vollständigkeit der bereitgestellten Informationen auf www.fruit-comestible.ch.
            </p>
            <p>
              Haftungsansprüche gegenfruit-comestible wegen Schäden materieller oder immaterieller Art, welche aus dem Zugriff oder der Nutzung beziehungsweise Nichtnutzung der veröffentlichten Informationen entstanden sind, werden im Rahmen der gesetzlichen Bestimmungen ausgeschlossen.
            </p>
          </section>

          <section className="space-y-3 pt-6 border-t border-stone-100">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
              Urheberrechte
            </h2>
            <p>
              Die Urheber- und alle anderen Rechte an Inhalten, Bildern, Fotos, Texten oder anderen Dateien auf der Website www.fruit-comestible.ch gehören ausschliesslichfruit-comestible oder den speziell genannten Rechtsinhabern. Für die Reproduktion jeglicher Elemente ist die schriftliche Zustimmung im Voraus einzuholen.
            </p>
          </section>

          <section className="space-y-3 pt-6 border-t border-stone-100">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
              Rechtliche Hinweise
            </h2>
            <p>
              Informationen zu Bestellungen, Lieferung, Gewährleistung und Rückgabe finden Sie in unseren{' '}
              <Link href="/agb" className="text-[#6c943e] hover:underline font-medium">
                Allgemeinen Geschäftsbedingungen (AGB)
              </Link>
              . Informationen zur Bearbeitung personenbezogener Daten finden Sie in unserer{' '}
              <Link href="/datenschutz" className="text-[#6c943e] hover:underline font-medium">
                Datenschutzerklärung
              </Link>
              .
            </p>
          </section>
        </div>

        {/* Footer Links */}
        <footer className="print:hidden pt-6 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm">
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/agb" className="text-[#6c943e] hover:underline font-medium">
              Zu den AGB
            </Link>
            <Link href="/datenschutz" className="text-[#6c943e] hover:underline font-medium">
              Zur Datenschutzerklärung
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
