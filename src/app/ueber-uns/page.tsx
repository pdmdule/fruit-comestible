import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  Leaf,
  ShieldCheck,
  Truck,
  Heart,
  ShoppingBag,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Über uns | Fruit Comestible Suisse',
  description:
    'Erfahren Sie mehr über Fruit Comestible: Unsere Schweizer Manufaktur für 100% naturbelassene, schonend gefriergetrocknete Früchte seit 2019.',
};

export default function UeberUnsPage() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans antialiased pb-24">
      {/* Top Breadcrumb */}
      <div className="border-b border-stone-200/80 bg-white">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-3.5 flex items-center justify-between text-xs">
          <Breadcrumbs customItems={[{ label: 'Über uns' }]} />
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 space-y-16 sm:space-y-20">
        {/* Hero Section */}
        <section className="text-center space-y-5 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-stone-200 shadow-2xs text-xs font-bold text-stone-800">
            <span className="w-4 h-4 rounded-full bg-red-600 text-white flex items-center justify-center text-[10px] font-black leading-none">
              +
            </span>
            <span>Schweizer Kleinunternehmen • Seit 2019</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-stone-900 leading-[1.08]">
            Unsere Leidenschaft für{' '}
            <span className="text-rose-700">100% reine Frucht.</span>
          </h1>

          <p className="text-base sm:text-xl text-stone-600 leading-relaxed font-normal">
            Wir glauben daran, dass gesunde Ernährung einfach, intensiv und
            unverfälscht sein muss. Keine E-Nummern, kein zugesetzter Zucker – nur
            die reine Kraft der Natur im knusprigsten Zustand.
          </p>
        </section>

        {/* Brand Story Image & Story Block */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center bg-white border border-stone-200/80 rounded-3xl p-6 sm:p-10 shadow-xs">
          <div className="md:col-span-5 relative aspect-square rounded-2xl overflow-hidden bg-stone-100 border border-stone-200">
            <Image
              src="/logo.webp"
              alt="Fruit Comestible Suisse Emblem"
              fill
              unoptimized
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-contain p-8"
            />
          </div>

          <div className="md:col-span-7 space-y-5">
            <span className="text-xs font-extrabold uppercase tracking-widest text-rose-700">
              Unsere Geschichte
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 leading-snug">
              Vom Entschluss für sauberes Essen zur beliebten Schweizer Knusperfrucht-Marke
            </h2>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              Fruit Comestible entstand aus einem einfachen Moment im Alltag: Beim Blick
              auf die Zutatenliste herkömmlicher Fruchterzeugnisse waren wir schockiert
              über künstliche Aromen, Stabilisatoren und Glucosesirup.
            </p>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              Wir wollten unseren Familien und anspruchsvollen Geniessern in der Schweiz
              eine echte Alternative bieten. Mit der innovativen Vakuum-Gefriertrocknung
              entziehen wir reifen Sommerbeeren schonend das Wasser, während bis zu 95%
              der Vitamine, das intensive Naturaroma und die leuchtende Farbe vollständig
              erhalten bleiben.
            </p>
          </div>
        </section>

        {/* 4 Pillars */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-2xl sm:text-3xl font-black text-stone-900">
              Wofür wir stehen
            </h3>
            <p className="text-sm text-stone-600">
              Unsere vier Kernversprechen an jeden Kunden in der Schweiz.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-stone-200/80 space-y-3 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <Leaf className="w-5 h-5 stroke-[2.2]" />
              </div>
              <h4 className="font-extrabold text-base text-stone-900">
                100% Natürlich & Vegan
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Nichts als pure Frucht. Absolut kein Kristallzucker, kein Schwefeldioxid,
                keine künstlichen Farb- oder Aromastoffe.
              </p>
            </div>

            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-stone-200/80 space-y-3 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5 stroke-[2.2]" />
              </div>
              <h4 className="font-extrabold text-base text-stone-900">
                Bis zu 95% Vitaminerhalt
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Modernste Gefriertrocknung schützt hitzeempfindliche Vitamine C und B
                sowie wertvolle Antioxidantien.
              </p>
            </div>

            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-stone-200/80 space-y-3 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-red-100 text-red-800 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
              </div>
              <h4 className="font-extrabold text-base text-stone-900">
                Schweizer Qualitätsanspruch
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                In der Schweiz von Hand selektiert und in hochbarriere Spezialbeutel
                mit Aromaschutz-ZIP verpackt.
              </p>
            </div>

            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-stone-200/80 space-y-3 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <Truck className="w-5 h-5 stroke-[2.2]" />
              </div>
              <h4 className="font-extrabold text-base text-stone-900">
                Schweizer Post Versand
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Klimaneutrale, blitzschnelle Zustellung direkt aus unserem Schweizer Lager
                (kostenlos ab CHF 80.–).
              </p>
            </div>
          </div>
        </section>

        {/* CTA to Shop */}
        <section className="p-8 sm:p-12 rounded-3xl bg-stone-900 text-white text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-rose-400">
              Erleben Sie den Unterschied
            </span>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
              Probieren Sie unsere Schweizer Knusperfrüchte
            </h3>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
              Ob für Ihr tägliches Müsli, knackige Snacks im Büro oder als edles
              Geschenk – entdecken Sie unser gesamtes Sortiment.
            </p>
          </div>

          <div className="pt-2 flex justify-center">
            <Link
              href="/shop"
              className="h-14 px-8 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-sm transition active:scale-[0.98]"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Zum Fruchtsortiment</span>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
