import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Truck,
  ShieldCheck,
  Heart,
  CheckCircle2,
  Smartphone,
  CreditCard,
  FileText,
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-stone-50/70 text-stone-700 text-sm">
      {/* Top Swiss Quality Bar */}
      <div className="border-b border-stone-200/80 bg-white">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-xs sm:text-sm">
            <div className="flex items-center gap-3">
              <span className="text-xl">🇨🇭</span>
              <div>
                <p className="font-bold text-stone-900">Schweizer Unternehmen</p>
                <p className="text-stone-500 text-xs">Mit Liebe in der Schweiz geführt</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                <Truck className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-stone-900">Schweizer Post Versand</p>
                <p className="text-stone-500 text-xs">Klimaneutral & schnell (1–2 Tage)</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-stone-900">100% Frucht & Vegan</p>
                <p className="text-stone-500 text-xs">Ohne Zuckerzusatz oder Chemie</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-stone-200 text-stone-800 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-stone-900">Sicher & Zuverlässig</p>
                <p className="text-stone-500 text-xs">TWINT, Karte & QR-Rechnung</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main 4-Column Footer */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Column 1: Brand & Mission (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="relative w-11 h-11 shrink-0 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/logo.webp"
                  alt="Fruit Comestible Logo"
                  fill
                  unoptimized
                  sizes="44px"
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-black tracking-tight text-base text-stone-900 leading-none">
                  FRUIT COMESTIBLE
                </span>
                <span className="text-[9px] tracking-widest uppercase font-semibold text-stone-400 mt-1">
                  Suisse Naturelle • Since 2019
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-sm">
              Wir veredeln die reinsten Schweizer und europäischen Sommerbeeren
              durch schonende Vakuum-Gefriertrocknung. Knusprig intensiv, voller
              Vitamine und 100% naturbelassen – ohne künstliche Zusätze.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-stone-500">
              <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
              <span>Verpackt mit Sorgfalt für ernährungsbewusste Geniesser.</span>
            </div>
          </div>

          {/* Column 2: Navigation (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link
                  href="/shop"
                  className="text-stone-600 hover:text-stone-900 transition font-medium"
                >
                  Fruchtsortiment (Shop)
                </Link>
              </li>
              <li>
                <Link
                  href="/produkte/gefriergetrocknete-erdbeere"
                  className="text-stone-600 hover:text-stone-900 transition"
                >
                  Bestseller Erdbeeren
                </Link>
              </li>
              <li>
                <Link
                  href="/#gefriertrocknung"
                  className="text-stone-600 hover:text-stone-900 transition"
                >
                  Über Gefriertrocknung
                </Link>
              </li>
              <li>
                <Link
                  href="/#faq"
                  className="text-stone-600 hover:text-stone-900 transition"
                >
                  Häufige Fragen (FAQ)
                </Link>
              </li>
              <li>
                <Link
                  href="/checkout"
                  className="text-stone-600 hover:text-stone-900 transition"
                >
                  Warenkorb & Kasse
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal info Switzerland (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">
              Rechtliches & Schweiz
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link
                  href="/agb#gerichtsstand"
                  className="text-stone-600 hover:text-stone-900 transition"
                >
                  Impressum &amp; Rechtssitz (Schweiz)
                </Link>
              </li>
              <li>
                <Link
                  href="/agb"
                  className="text-stone-600 hover:text-stone-900 transition font-medium"
                >
                  Allgemeine Geschäftsbedingungen (AGB)
                </Link>
              </li>
              <li>
                <Link
                  href="/agb#datenschutz"
                  className="text-stone-600 hover:text-stone-900 transition"
                >
                  Datenschutzerklärung (DSG / DSGVO)
                </Link>
              </li>
              <li>
                <Link
                  href="/agb#lieferung"
                  className="text-stone-600 hover:text-stone-900 transition"
                >
                  Versand- &amp; Lieferbedingungen
                </Link>
              </li>
              <li>
                <Link
                  href="/agb#retouren"
                  className="text-stone-600 hover:text-stone-900 transition"
                >
                  Retouren &amp; Rücksendungen
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Payment Methods & Swiss Post (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">
              Zahlungsmethoden
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {/* TWINT */}
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-stone-200/80 shadow-2xs font-semibold text-stone-800">
                <Smartphone className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>TWINT</span>
              </div>

              {/* Kreditkarte */}
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-stone-200/80 shadow-2xs font-semibold text-stone-800">
                <CreditCard className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Kreditkarte</span>
              </div>

              {/* QR-Rechnung */}
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-stone-200/80 shadow-2xs font-semibold text-stone-800">
                <FileText className="w-4 h-4 text-stone-700 shrink-0" />
                <span>QR-Rechnung</span>
              </div>

              {/* Apple Pay */}
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-stone-200/80 shadow-2xs font-semibold text-stone-800">
                <span className="font-bold text-xs"> Pay</span>
              </div>
            </div>

            <div className="pt-2 border-t border-stone-200/60">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-stone-200/80 text-xs">
                <div className="w-5 h-5 rounded-md bg-yellow-400 text-stone-900 font-bold text-[9px] flex items-center justify-center shrink-0">
                  POST
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-stone-900 truncate">Schweizer Post</p>
                  <p className="text-[10px] text-stone-500 truncate">A-Post & B-Post Zustellung</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-stone-200 bg-white py-6">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
          <p>
            © 2026 Fruit Comestible Suisse. Alle Rechte vorbehalten.
          </p>
          <p className="font-medium text-stone-600">
            Preise in CHF inkl. 2.6% Schweizer MwSt.
          </p>
        </div>
      </div>
    </footer>
  );
}
