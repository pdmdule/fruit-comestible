import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Quote,
  CheckCircle2,
  Utensils,
  Heart,
  ShieldCheck,
  Truck,
  Sparkles,
  Award,
  Leaf,
  ArrowRight,
  ShoppingBag,
  HelpCircle,
  PackageCheck,
  Check,
} from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Über uns | Unsere Geschichte & Philosophie | fruit-Comestible Suisse',
  description:
    'Lernen Sie das Team und die Philosophie von fruit-Comestible kennen: Lukas Pem & Dušica Pem Perić über saubere, unbelastete Lebensmittel, faire Erzeugerpreise und Schweizer Qualitätsstandards.',
  alternates: {
    canonical: 'https://fruit-comestible.ch/ueber-uns',
  },
};

export default function UeberUnsPage() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans antialiased selection:bg-rose-100 selection:text-rose-900 pb-20 sm:pb-28">
      {/* Top Breadcrumb Bar */}
      <div className="border-b border-stone-200/80 bg-white sticky top-18 sm:top-20 z-10">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-3.5 flex items-center justify-between text-xs">
          <Breadcrumbs customItems={[{ label: 'Über uns' }]} />
          <Link
            href="/shop"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 transition"
          >
            <span>Zum Sortiment</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-8 sm:pt-14 space-y-16 sm:space-y-24 lg:space-y-32">
        {/* ========================================================================= */}
        {/* 1. HERO & MISIJA                                                          */}
        {/* ========================================================================= */}
        <section className="relative rounded-3xl sm:rounded-[2.5rem] bg-[#FBF9F5] border border-[#EAE4DC] p-6 sm:p-10 md:p-14 lg:p-20 shadow-xs overflow-hidden">
          {/* Subtle decorative background watermark */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-radial from-rose-100/40 via-amber-100/20 to-transparent blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-radial from-emerald-100/30 via-transparent to-transparent blur-3xl pointer-events-none" />

          <div className="relative max-w-4xl mx-auto space-y-8 sm:space-y-10 text-center">
            {/* Kicker badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-[#EAE4DC] shadow-2xs text-xs font-extrabold uppercase tracking-widest text-rose-700">
              <Sparkles className="w-3.5 h-3.5 text-rose-600" />
              <span>Unsere Geschichte &amp; Philosophie</span>
            </div>

            {/* Glavni citat */}
            <blockquote className="space-y-3">
              <div className="flex justify-center mb-2">
                <Quote className="w-10 h-10 sm:w-14 sm:h-14 text-stone-300 rotate-180 opacity-80" />
              </div>
              <p className="text-2xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight leading-[1.18] sm:leading-[1.15]">
                „Saubere, unbelastete Lebensmittel sind der wahre Reichtum von Morgen.“
              </p>
            </blockquote>

            {/* Uvodni tekst */}
            <div className="space-y-4 text-stone-700 text-sm sm:text-base md:text-lg leading-relaxed text-justify sm:text-center max-w-3xl mx-auto font-normal">
              <p>
                Unsere gefriergetrockneten Früchte werden alle unter idealen klimatischen
                Bedingungen angebaut und verarbeitet. Wir erachten es als Privileg, mit solch
                tollen, naturbelassenen Lebensmitteln arbeiten zu dürfen.
              </p>
              <p>
                In Westeuropa haben wir es wegen der industriellen Landwirtschaft zum Teil schon
                verlernt, wie naturbelassene und natürlich gereifte Lebensmittel schmecken. Wir
                laden Sie dazu ein, dieses Gefühl, welches wir meistens nur noch aus unserer
                Kindheit kennen, wieder zu erleben. Werden Sie Teil unserer fruit-Comestible
                Familie – geniessen Sie mit uns saubere, unbelastete und nachhaltig produzierte
                gefriergetrocknete Früchte.
              </p>
            </div>

            {/* Potpis */}
            <div className="pt-4 flex flex-col items-center justify-center space-y-1">
              <span className="font-extrabold text-base sm:text-lg text-stone-900 tracking-tight">
                Lukas Pem
              </span>
              <span className="text-xs sm:text-sm text-stone-500 font-medium">
                Geschäftsführer fruit-Comestible
              </span>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. DAS TEAM (KARTICE TIMA)                                                */}
        {/* ========================================================================= */}
        <section className="space-y-8 sm:space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-stone-400">
              Menschen mit Leidenschaft
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-900 tracking-tight">
              Das Team hinter fruit-Comestible
            </h2>
            <p className="text-sm sm:text-base text-stone-600">
              Persönlich, qualitätsbewusst und mit echter kulinarischer Hingabe für Sie im Einsatz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {/* Kartica 1: Lukas Pem */}
            <div className="bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-6">
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-rose-50 border border-rose-200/80 text-rose-700 flex items-center justify-center font-black text-xl shadow-2xs shrink-0">
                    LP
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-stone-900 leading-tight">
                      Lukas Pem
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-rose-700 mt-0.5">
                      Geschäftsführer | Leidenschaftlicher Koch und Produktentwickler
                    </p>
                  </div>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-stone-50/80 border border-stone-200/70 relative">
                  <Quote className="w-5 h-5 text-stone-300 absolute top-3 right-3 rotate-180" />
                  <p className="text-base sm:text-lg font-bold text-stone-900 italic pr-6">
                    „Geht nicht, gibt’s nicht…“
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Mit über 25 Jahren Erfahrung in der professionellen Gastronomie,
                  als eidgenössischer Instruktor und ehemaliger Prorektor/Rektor des renommierten
                  Instituts für Kaderbildung (IFK Weggis). Lukas vereint tiefes kulinarisches Fachwissen
                  mit dem unermüdlichen Anspruch an unverfälschte Produktreinheit.
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center gap-2 text-xs font-semibold text-stone-500">
                <Utensils className="w-4 h-4 text-stone-400" />
                <span>Vision, Rezepturentwicklung &amp; Erzeugerbeziehungen</span>
              </div>
            </div>

            {/* Kartica 2: Dušica Pem Perić */}
            <div className="bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-6">
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-800 flex items-center justify-center font-black text-xl shadow-2xs shrink-0">
                    DP
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-stone-900 leading-tight">
                      Dušica Pem Perić
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-amber-800 mt-0.5">
                      Leidenschaftliche Bäckerin | Kommissionierung &amp; Versand
                    </p>
                  </div>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-stone-50/80 border border-stone-200/70 relative">
                  <Quote className="w-5 h-5 text-stone-300 absolute top-3 right-3 rotate-180" />
                  <p className="text-base sm:text-lg font-bold text-stone-900 italic pr-6">
                    „Immer mit einem Lächeln für Sie da.“
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Mit Herz, Feingefühl fürs Backhandwerk und einem geschulten Auge für
                  makellose Fruchtqualität. Dušica stellt sicher, dass jedes Paket am Schweizer
                  Hauptsitz mit grösster Sorgfalt, bruchsicher und aromaschonend für Sie
                  zusammengestellt wird.
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center gap-2 text-xs font-semibold text-stone-500">
                <Heart className="w-4 h-4 text-rose-500" />
                <span>Qualitätsprüfung, Pâtisserie-Inspiration &amp; Schweizer Versand</span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. NAŠI TEMELJI & PREDNOSTI (3 STUPA)                                     */}
        {/* ========================================================================= */}
        <section className="space-y-8 sm:space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-700">
              Unsere 3 Säulen
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-900 tracking-tight">
              Was unsere Qualität ausmacht
            </h2>
            <p className="text-sm sm:text-base text-stone-600">
              Drei kompromisslose Grundsätze vom Anbau bis zum Genuss in Ihrer Schale.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Stup 1: Premium Früchte */}
            <div className="bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xs hover:shadow-md transition duration-300 space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
                  <Sparkles className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-rose-700 uppercase tracking-wider">
                    Säule 1
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-stone-900">
                    Premium Früchte
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Ausgewählte Sorten und schonendste Vakuum-Gefriertrocknung für intensiven Geschmack.
                </p>

                <ul className="space-y-3 pt-2 text-xs sm:text-sm text-stone-700">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Geerntet bei der idealen Reife</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Geschützte geografische Herkunft der Beeren-Früchte</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Ideale klimatische Bedingungen für Flora und Fauna</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Fruchtsorten, die für intensiven Geschmack gezüchtet wurden</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Qualitätszertifizierte Verarbeitungsprozesse &amp; modernste Vakuum-Gefriertrocknung</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Stup 2: 100% Vegan & Natürlich */}
            <div className="bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xs hover:shadow-md transition duration-300 space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  <Leaf className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
                    Säule 2
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-stone-900">
                    100% Vegan &amp; Natürlich
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Reine Natur ohne Zusätze, die wertvolle Nährstoffe und aktive Enzyme bewahrt.
                </p>

                <ul className="space-y-3 pt-2 text-xs sm:text-sm text-stone-700">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Perfekt geeignet für eine pflanzenbasierte Ernährung</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Voller Nährstoffe dank optimalem Reifegrad</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Erhalt natürlicher Enzyme durch schonendes Verfahren</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Volle Naturkraft dank naturbelassener Samen und Kerne</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Stup 3: Genuss & Vitalität */}
            <div className="bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xs hover:shadow-md transition duration-300 space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                  <Heart className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">
                    Säule 3
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-stone-900">
                    Genuss &amp; Vitalität
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Voller Knusper-Crunch und aromatischer Genuss für jeden gesunden Lebensstil.
                </p>

                <ul className="space-y-3 pt-2 text-xs sm:text-sm text-stone-700">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Ideal für eine bewusste Ernährung (auch für Kinder, Schwangere &amp; Stillende)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Unterstützung der Stoffwechsel-Aktivierung &amp; Ernährungspläne</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Einzigartige Aromatik, intensive Naturfarben &amp; maximaler Knusper-Crunch</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. KAKO RADIMO & ŠVICARSKI STANDARDI (SO ARBEITEN WIR)                    */}
        {/* ========================================================================= */}
        <section className="space-y-8 sm:space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-stone-400">
              Qualitätsversprechen
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-900 tracking-tight">
              So arbeiten wir
            </h2>
            <p className="text-sm sm:text-base text-stone-600">
              Schweizer Präzision, persönliche Verantwortung und echter Kundenservice.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: Persönliche Beratung vom Chef */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-stone-200/90 shadow-2xs space-y-4 hover:border-stone-300 transition">
              <div className="w-12 h-12 rounded-2xl bg-stone-100 text-stone-900 flex items-center justify-center font-bold">
                <Utensils className="w-6 h-6 stroke-[2]" />
              </div>
              <h3 className="font-extrabold text-base sm:text-lg text-stone-900 leading-snug">
                Persönliche Beratung vom Chef
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Über 25 Jahre Erfahrung in Gastronomie &amp; kulinarischer Produktentwicklung. Sie sprechen direkt mit Fachleuten.
              </p>
            </div>

            {/* Card 2: Geprüft & verpackt in der Schweiz */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-stone-200/90 shadow-2xs space-y-4 hover:border-stone-300 transition">
              <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-700 flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6 stroke-[2]" />
              </div>
              <h3 className="font-extrabold text-base sm:text-lg text-stone-900 leading-snug">
                Geprüft &amp; verpackt in der Schweiz
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Eigene Qualitätsprüfung und sorgfältige Kommissionierung am Hauptsitz in Schaffhausen.
              </p>
            </div>

            {/* Card 3: 100% Zufriedenheits-Garantie */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-stone-200/90 shadow-2xs space-y-4 hover:border-stone-300 transition">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <Award className="w-6 h-6 stroke-[2]" />
              </div>
              <h3 className="font-extrabold text-base sm:text-lg text-stone-900 leading-snug">
                100% Zufriedenheits-Garantie
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Volle Rückerstattung, falls Sie von Frische, Knusprigkeit oder Aroma nicht restlos begeistert sind.
              </p>
            </div>

            {/* Card 4: By the way: Schweizer Post & Klimabewusstsein */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-stone-200/90 shadow-2xs space-y-4 hover:border-stone-300 transition">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <Truck className="w-6 h-6 stroke-[2]" />
              </div>
              <h3 className="font-extrabold text-base sm:text-lg text-stone-900 leading-snug">
                By the way...
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Klimaneutraler kostenloser Versand ab CHF 80.– mit Schweizer A-Post &amp; klimapositive, hochbarriere Verpackungen.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. INTERVJU S OSNIVAČEM (INTERVIEW MIT LUKAS PEM)                         */}
        {/* ========================================================================= */}
        <section className="space-y-8 sm:space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-rose-700">
              Einblick &amp; Beweggründe
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-900 tracking-tight">
              Interview mit Lukas Pem
            </h2>
            <p className="text-sm sm:text-base text-stone-600">
              Über den Wechsel aus der Spitzenhotellerie und Dozentur, den heutigen Agrar-Irrsinn
              und das Erlebnis, das alles ins Rollen brachte.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
            {/* Pitanje 1 */}
            <div className="bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xs space-y-4">
              <div className="flex items-start gap-3">
                <span className="px-2.5 py-1 rounded-lg bg-stone-100 text-stone-900 text-xs font-black shrink-0 mt-0.5">
                  F:
                </span>
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-stone-900 leading-snug">
                  Du blickst auf eine eindrückliche Laufbahn zurück – erster Fachlehrer für Systemgastronomie in der Schweiz, Küchenchef für 1500 Mahlzeiten täglich, Ausbildner, Prüfungsexperte und Prorektor/Rektor am IFK Weggis. Was bewegt jemanden nach über 11 Jahren in leitenden Bildungsfunktionen dazu, fruit-Comestible zu gründen?
                </h3>
              </div>

              <div className="flex items-start gap-3 pt-2 pl-2 sm:pl-4 border-l-2 border-rose-600/40">
                <span className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 text-xs font-black shrink-0 mt-0.5">
                  Lukas:
                </span>
                <p className="text-xs sm:text-sm md:text-base text-stone-700 leading-relaxed">
                  Nach vielen Jahren in der Ausbildung junger Gastro-Profis und in anspruchsvollen Management-Rollen spürte ich den tiefen Drang, einen ganz direkten, handfesten Beitrag für unsere Gesellschaft zu leisten. In Bildungsinstitutionen gestaltet man Lehrpläne – aber ich wollte wieder an die Wurzel: an das, was wir täglich in unseren Körper aufnehmen. Saubere Lebensmittel sind keine Selbstverständlichkeit mehr, sondern ein elementares Gut, das wir bewahren müssen.
                </p>
              </div>
            </div>

            {/* Pitanje 2 */}
            <div className="bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xs space-y-4">
              <div className="flex items-start gap-3">
                <span className="px-2.5 py-1 rounded-lg bg-stone-100 text-stone-900 text-xs font-black shrink-0 mt-0.5">
                  F:
                </span>
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-stone-900 leading-snug">
                  Viele sprechen heute von einer Sinnkrise in der modernen Lebensmittelbranche. Was hat dich im klassischen System gestört?
                </h3>
              </div>

              <div className="flex items-start gap-3 pt-2 pl-2 sm:pl-4 border-l-2 border-rose-600/40">
                <span className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 text-xs font-black shrink-0 mt-0.5">
                  Lukas:
                </span>
                <p className="text-xs sm:text-sm md:text-base text-stone-700 leading-relaxed">
                  Die Entfremdung. In weiten Teilen der industriellen Gastronomie und Grosskonzerne dreht sich alles nur noch um Deckungsbeiträge, Lieferkettenoptimierung und bürokratische Prozesse anstatt um die Menschen und das Essen selbst. Der Respekt vor dem Ausgangsprodukt und die Ehrfurcht vor der Natur sind oft auf der Strecke geblieben. Wenn Früchte nach Chemie schmecken und Tomaten nach Wasser, haben wir als Gesellschaft ein Problem. Ich wollte ein Unternehmen schaffen, bei dem Qualität nicht diskutiert, sondern bedingungslos gelebt wird.
                </p>
              </div>
            </div>

            {/* Pitanje 3 */}
            <div className="bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xs space-y-4">
              <div className="flex items-start gap-3">
                <span className="px-2.5 py-1 rounded-lg bg-stone-100 text-stone-900 text-xs font-black shrink-0 mt-0.5">
                  F:
                </span>
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-stone-900 leading-snug">
                  Du hast oft deine Sorge über den weltweiten Agrar-Irrsinn geäussert – insbesondere über frische Früchte ausserhalb jeder Saison...
                </h3>
              </div>

              <div className="flex items-start gap-3 pt-2 pl-2 sm:pl-4 border-l-2 border-rose-600/40">
                <span className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 text-xs font-black shrink-0 mt-0.5">
                  Lukas:
                </span>
                <p className="text-xs sm:text-sm md:text-base text-stone-700 leading-relaxed">
                  Es ist absurd, wenn wir im Dezember frische Himbeeren aus Südamerika oder Nordafrika in Schweizer Supermärkten sehen, für deren Anbau in Wüstenregionen das Grundwasser ganzer Dörfer leergepumpt wird – nur damit sie nach drei Tagen im Kühlschrank schimmeln und nach nichts schmecken. Durch schonende Gefriertrocknung zum exakten Zeitpunkt der Vollreife können wir das vollendete Sommeraroma über Jahre konservieren – ganz ohne Kühlkette, ohne Konservierungsstoffe und ohne ökologischen Frevel.
                </p>
              </div>
            </div>

            {/* Pitanje 4 & 5 */}
            <div className="bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xs space-y-4">
              <div className="flex items-start gap-3">
                <span className="px-2.5 py-1 rounded-lg bg-stone-100 text-stone-900 text-xs font-black shrink-0 mt-0.5">
                  F:
                </span>
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-stone-900 leading-snug">
                  Wie und wo ist die eigentliche Initialzündung für fruit-Comestible entstanden?
                </h3>
              </div>

              <div className="flex items-start gap-3 pt-2 pl-2 sm:pl-4 border-l-2 border-rose-600/40">
                <span className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 text-xs font-black shrink-0 mt-0.5">
                  Lukas:
                </span>
                <p className="text-xs sm:text-sm md:text-base text-stone-700 leading-relaxed">
                  Es war auf einem kleinen, einfachen Bauernmarkt in Westserbien. Ich probierte dort eine vollreife Himbeere der Sorte Willamette – und es traf mich wie ein Blitzschlag. Es war exakt dieser explosive, tief-fruchtige Geschmack aus meiner eigenen Kindheit, den ich in der Schweiz seit Jahrzehnten vermisst hatte. Gleichzeitig erfuhr ich im Gespräch mit den Bauern, unter welch extremen Bedingungen sie bei 40°C auf den Steilhängen von Hand ernten – und wie wenig Respekt und Ertrag ihnen von grossen Zwischenhändlern dafür übrigbleibt. In diesem Moment wusste ich: Wir müssen diese Früchte schonend retten und den Bauern faire, verlässliche Partnerschaften auf Augenhöhe bieten.
                </p>
              </div>
            </div>

            {/* Fazit / Mission */}
            <div className="bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xs space-y-4">
              <div className="flex items-start gap-3">
                <span className="px-2.5 py-1 rounded-lg bg-stone-100 text-stone-900 text-xs font-black shrink-0 mt-0.5">
                  F:
                </span>
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-stone-900 leading-snug">
                  Was ist heute die wichtigste Mission von fruit-Comestible?
                </h3>
              </div>

              <div className="flex items-start gap-3 pt-2 pl-2 sm:pl-4 border-l-2 border-emerald-600/40">
                <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-black shrink-0 mt-0.5">
                  Lukas:
                </span>
                <p className="text-xs sm:text-sm md:text-base text-stone-700 leading-relaxed">
                  Ganz einfach: Der Dreiklang aus kompromissloser Produktqualität, fairem und transparentem Handel mit den Erzeugern sowie der Begeisterung unserer Kunden in der Schweiz. Wenn ein Kunde die Tüte öffnet, den Duft riecht und das Knuspern hört – und sagt: «Genau so muss Frucht schmecken!» – dann haben wir unser Ziel erreicht.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. CTA NA DNU                                                             */}
        {/* ========================================================================= */}
        <section className="p-8 sm:p-12 lg:p-16 rounded-3xl sm:rounded-[2.5rem] bg-stone-900 text-white text-center space-y-6 sm:space-y-8 relative overflow-hidden shadow-md">
          {/* Subtle glow effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-rose-600/20 blur-[100px] pointer-events-none rounded-full" />

          <div className="relative max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-extrabold uppercase tracking-widest text-rose-400">
              Bereit für den echten Fruchtgeschmack?
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              Entdecken Sie jetzt Ihren Favoriten aus über 12 Premium-Sorten.
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl mx-auto">
              100% naturbelassen, ohne Zuckerzusatz und voller Vitamine. Schonend vakuumiert und direkt aus unserem Schweizer Lager zu Ihnen nach Hause geliefert.
            </p>
          </div>

          <div className="relative pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              href="/shop"
              className="w-full sm:w-auto h-13 sm:h-14 px-8 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-sm transition active:scale-[0.98]"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Zum Shop</span>
            </Link>
            <Link
              href="/#bestseller"
              className="w-full sm:w-auto h-13 sm:h-14 px-7 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm flex items-center justify-center gap-2 border border-white/20 transition"
            >
              <span>Bestseller ansehen</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
