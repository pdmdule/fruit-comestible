'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import {
  getProductOrigin,
  PRODUCT_ORIGINS,
  resolveCountryKey,
  countryCoords,
  type ProductOriginData,
} from '@/data/productOrigins';
import {
  Truck,
  Calendar,
  Sun,
  Leaf,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Compass,
} from 'lucide-react';

export { countryCoords, resolveCountryKey };

// Dynamically import the Leaflet map with ssr: false to support client-side rendering
const OriginMapClient = dynamic(() => import('@/components/OriginMapClient'), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-16/11 sm:aspect-16/10 rounded-3xl bg-stone-100 border border-stone-200/90 flex flex-col items-center justify-center p-6 text-center space-y-3">
      <div className="w-10 h-10 rounded-2xl bg-white border border-stone-200 flex items-center justify-center shadow-xs animate-pulse">
        <Compass className="w-5 h-5 text-stone-400 animate-spin" />
      </div>
      <div className="space-y-1">
        <p className="text-xs font-bold text-stone-700">Karte wird geladen...</p>
        <p className="text-[11px] text-stone-400">Verbindung zu den regionalen Anbaugebieten</p>
      </div>
    </div>
  ),
});

export interface ProductOriginMapProps {
  slug: string;
  originCountry?: string | null;
  productName: string;
  originData?: ProductOriginData;
}

export default function ProductOriginMap({
  slug,
  originCountry,
  productName,
  originData,
}: ProductOriginMapProps) {
  // Direct per-product slug lookup or passed originData - NO CATEGORY FALLBACK
  const origin: ProductOriginData =
    originData || PRODUCT_ORIGINS[slug] || getProductOrigin(slug, originCountry);

  const isSwissOrigin =
    origin.countryCode === 'CH' ||
    resolveCountryKey(origin.country) === 'Schweiz' ||
    origin.country.toLowerCase().includes('schweiz');

  const harvestTimeDisplay = origin.harvestTime || origin.harvestSeason || 'Saisonal';
  const harvestMethodDisplay = origin.harvestMethod || 'Sorgfältige Handernte bei voller Reife';
  const transportMethodDisplay =
    origin.transportMethod ||
    (isSwissOrigin
      ? 'Regionaler Schweizer Kurzstrecken-Transport (< 100 km)'
      : 'Klimaschonender Direkttransport zur Veredelung in der Schweiz');
  const climateInfoDisplay =
    origin.climateInfo ||
    'Optimale klimatische Bedingungen für intensiv-fruchtiges Aroma.';

  return (
    <div className="bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm space-y-8">
      {/* Top Header Information */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-2xl leading-none">{origin.flag || '📍'}</span>
            <h3 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
              {origin.region}, {origin.country}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-stone-500">
            Geprüfte Herkunft & transparente Lieferkette für {productName}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200/80">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>100% Rückverfolgbar</span>
          </span>
          <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium bg-stone-100 text-stone-700">
            <Compass className="w-3.5 h-3.5 text-stone-500" />
            <span>{isSwissOrigin ? 'Regional' : 'Direktimport'}</span>
          </span>
        </div>
      </div>

      {/* Main 2-Column Responsive Grid: Real Map + Detailed Origin Story */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Real Interactive Map */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between text-xs text-stone-500 px-1">
            <span className="font-semibold uppercase tracking-wider text-[11px] text-stone-400">
              Herkunftskarte
            </span>
            <span className="text-[11px] text-stone-400">
              ● 100% Schweizer Rückverfolgbarkeit
            </span>
          </div>

          <OriginMapClient origin={origin} isSwissOrigin={isSwissOrigin} />

          {/* Map Legend */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-stone-500 pt-1 px-1">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-600 border border-white shadow-xs inline-block" />
              <span>Ernteregion ({origin.country})</span>
            </div>
            {!isSwissOrigin && (
              <div className="flex items-center gap-2">
                <span className="w-4 h-0.5 border-t-2 border-dashed border-rose-500 inline-block" />
                <span>Kompensierte Transportroute</span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <span>🇨🇭</span>
              <span>Fruit Comestible Manufaktur</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-stone-400">
              <span>🌿 OpenStreetMap / QGIS Geodaten (100% Free & Open-Source)</span>
            </div>
          </div>
        </div>

        {/* Right Column: Agronomic & Terroir Profile Card */}
        <div className="lg:col-span-5 space-y-5">
          {/* Authentic Terroir Story / Description */}
          {origin.description && (
            <div className="p-4 sm:p-5 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-sm">🌱</span>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-600">
                  Herkunftsgeschichte & Terroir
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
                {origin.description}
              </p>
            </div>
          )}

          {/* Origin Attributes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* 1. Berba / Erntemethode */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-1.5">
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center mb-1">
                <Leaf className="w-4 h-4 stroke-[2.2]" />
              </div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Erntemethode
              </h4>
              <p className="text-xs sm:text-sm font-bold text-stone-900 leading-snug">
                {harvestMethodDisplay}
              </p>
            </div>

            {/* 2. Erntezeit (harvestTime) */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-1.5">
              <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center mb-1">
                <Calendar className="w-4 h-4 stroke-[2.2]" />
              </div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Erntezeitraum
              </h4>
              <p className="text-xs sm:text-sm font-bold text-stone-900 leading-snug">
                {harvestTimeDisplay}
              </p>
            </div>

            {/* 3. Transport & Frischekette */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-1.5">
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center mb-1">
                <Truck className="w-4 h-4 stroke-[2.2]" />
              </div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Frischelogistik
              </h4>
              <p className="text-xs sm:text-sm font-bold text-stone-900 leading-snug">
                {transportMethodDisplay}
              </p>
            </div>

            {/* 4. Klima & Terroir */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-1.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-1">
                <Sun className="w-4 h-4 stroke-[2.2]" />
              </div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Terroir & Klima
              </h4>
              <p className="text-xs sm:text-sm font-bold text-stone-900 leading-snug">
                {climateInfoDisplay}
              </p>
            </div>
          </div>

          {/* "Schon gewusst?" Fun Facts Block */}
          {origin.funFacts && origin.funFacts.length > 0 && (
            <div className="p-5 sm:p-6 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-3.5">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center shrink-0">
                  <Sparkles className="w-3.5 h-3.5 stroke-[2.2]" />
                </div>
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-amber-950">
                  Schon gewusst? (Fakten zur Frucht)
                </h4>
              </div>

              <ul className="space-y-2.5">
                {origin.funFacts.map((fact, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-amber-950/90 leading-relaxed"
                  >
                    <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Swiss Transparency Guarantee Badge */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/60 flex items-center gap-3">
            <div className="text-xl shrink-0">🇨🇭</div>
            <div className="space-y-0.5 min-w-0">
              <p className="text-xs font-bold text-stone-900 truncate">
                Schweizer Qualitäts- und Veredelungsgarantie
              </p>
              <p className="text-[11px] text-stone-500">
                Geprüft nach strengsten Lebensmittelstandards der Eidgenossenschaft.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
