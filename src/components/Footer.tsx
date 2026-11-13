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
    <footer className="print:hidden border-t border-[#5b7f33] bg-[#6c943e] text-white text-sm">
      {/* Top Swiss Quality Bar */}
      <div className="border-b border-white/20 bg-black/10">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-xs sm:text-sm">
            <div className="flex items-center gap-3">
              <span className="text-xl">🇨🇭</span>
              <div>
                <p className="font-bold text-white">Schweizer Unternehmen</p>
                <p className="text-white/80 text-xs">Mit Liebe in der Schweiz geführt</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-white/20 text-white flex items-center justify-center shrink-0">
                <Truck className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-white">Schweizer Post Versand</p>
                <p className="text-white/80 text-xs">Klimaneutral & schnell (1–2 Tage)</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-white/20 text-white flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-white">100% Frucht & Vegan</p>
                <p className="text-white/80 text-xs">Ohne Zuckerzusatz oder Chemie</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-white/20 text-white flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-white">Sicher & Zuverlässig</p>
                <p className="text-white/80 text-xs">TWINT, Karte & QR-Rechnung</p>
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
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 shrink-0 transition-transform duration-300 group-hover:scale-105 bg-white/95 p-1 rounded-xl">
                <Image
                  src="/logo.webp"
                  alt="Fruit Comestible Logo"
                  fill
                  unoptimized
                  sizes="44px"
                  className="object-contain p-0.5"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-black tracking-tight text-base text-white leading-none">
                  FRUIT COMESTIBLE
                </span>
                <span className="text-[9px] tracking-widest uppercase font-semibold text-white/75 mt-1">
                  Suisse Naturelle • Since 2019
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-white/90 leading-relaxed max-w-sm">
              Wir veredeln die reinsten Schweizer und europäischen Sommerbeeren
              durch schonende Vakuum-Gefriertrocknung. Knusprig intensiv, voller
              Vitamine und 100% naturbelassen – ohne künstliche Zusätze.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-white/80">
              <Heart className="w-3.5 h-3.5 text-white fill-white shrink-0" />
              <span>Verpackt mit Sorgfalt für ernährungsbewusste Geniesser.</span>
            </div>
          </div>

          {/* Column 2: Navigation (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link
                  href="/shop"
                  className="text-white/85 hover:text-white hover:underline transition font-medium"
                >
                  Fruchtsortiment (Shop)
                </Link>
              </li>
              <li>
                <Link
                  href="/produkte/gefriergetrocknete-erdbeere"
                  className="text-white/85 hover:text-white hover:underline transition"
                >
                  Bestseller Erdbeeren
                </Link>
              </li>
              <li>
                <Link
                  href="/#gefriertrocknung"
                  className="text-white/85 hover:text-white hover:underline transition"
                >
                  Über Gefriertrocknung
                </Link>
              </li>
              <li>
                <Link
                  href="/#faq"
                  className="text-white/85 hover:text-white hover:underline transition"
                >
                  Häufige Fragen (FAQ)
                </Link>
              </li>
              <li>
                <Link
                  href="/checkout"
                  className="text-white/85 hover:text-white hover:underline transition"
                >
                  Warenkorb & Kasse
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal info Switzerland (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Rechtliches & Schweiz
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link
                  href="/agb#gerichtsstand"
                  className="text-white/85 hover:text-white hover:underline transition"
                >
                  Impressum &amp; Rechtssitz (Schweiz)
                </Link>
              </li>
              <li>
                <Link
                  href="/agb"
                  className="text-white/85 hover:text-white hover:underline transition font-medium"
                >
                  Allgemeine Geschäftsbedingungen (AGB)
                </Link>
              </li>
              <li>
                <Link
                  href="/agb#datenschutz"
                  className="text-white/85 hover:text-white hover:underline transition"
                >
                  Datenschutzerklärung (DSG / DSGVO)
                </Link>
              </li>
              <li>
                <Link
                  href="/agb#lieferung"
                  className="text-white/85 hover:text-white hover:underline transition"
                >
                  Versand- &amp; Lieferbedingungen
                </Link>
              </li>
              <li>
                <Link
                  href="/agb#retouren"
                  className="text-white/85 hover:text-white hover:underline transition"
                >
                  Retouren &amp; Rücksendungen
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Payment Methods & Swiss Post (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Zahlungsmethoden
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {/* TWINT */}
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white text-stone-900 border border-white/20 shadow-xs font-semibold">
                <Smartphone className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>TWINT</span>
              </div>

              {/* Kreditkarte */}
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white text-stone-900 border border-white/20 shadow-xs font-semibold">
                <CreditCard className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Kreditkarte</span>
              </div>

              {/* QR-Rechnung */}
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white text-stone-900 border border-white/20 shadow-xs font-semibold">
                <FileText className="w-4 h-4 text-stone-700 shrink-0" />
                <span>QR-Rechnung</span>
              </div>

              {/* Apple Pay */}
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white text-stone-900 border border-white/20 shadow-xs font-semibold">
                <span className="font-bold text-xs"> Pay</span>
              </div>
            </div>

            <div className="pt-2 border-t border-white/20">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white text-stone-900 border border-white/20 shadow-xs text-xs">
                <div className="w-5 h-5 rounded-md bg-yellow-400 text-stone-900 font-bold text-[9px] flex items-center justify-center shrink-0">
                  POST
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-stone-900 truncate">Schweizer Post</p>
                  <p className="text-[10px] text-stone-600 truncate">A-Post & B-Post Zustellung</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-white/20 bg-black/15 py-6">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/85">
          <p>
            © 2026 Fruit Comestible Suisse. Alle Rechte vorbehalten.
          </p>
          <p className="font-medium text-white/95">
            Preise in CHF inkl. 2.6% Schweizer MwSt.
          </p>
        </div>
      </div>
    </footer>
  );
}
