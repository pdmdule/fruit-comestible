'use client';

import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

export interface NutrientItem {
  name: string;
  value: number;
  unit?: string;
  color?: string;
  parent?: string;
  parentCategory?: string | null;
  is_chart_slice?: boolean;
  totalParent?: number;
  totalParentValue?: number;
}

// Backward-compatible alias
export type MacroItem = NutrientItem;

export interface ProductNutritionChartProps {
  product?: {
    macro_distribution?: NutrientItem[] | any[];
    [key: string]: any;
  };
  macroDistribution?: NutrientItem[] | any[];
  macro_distribution?: NutrientItem[] | any[];
  nutritionalValues?: any[];
  nutritional_values?: any[];
  nutrients?: any[];
}

/**
 * Fallback helper when nutrients in DB don't yet have explicit is_chart_slice flags.
 */
export function prepareNutritionChartData(nutrients: NutrientItem[] | any[]): NutrientItem[] {
  if (!Array.isArray(nutrients)) return [];

  // Check if caller/DB already tagged chart slices
  const hasExplicitSlices = nutrients.some((n) => n?.is_chart_slice !== undefined);
  if (hasExplicitSlices) {
    return nutrients.filter((item) => item?.is_chart_slice && Number(item?.value) > 0);
  }

  // 1. Ugljeni hidrati i šećer
  const totalCarbsItem = nutrients.find(
    (n) =>
      n?.name === 'Kohlenhydrat' ||
      n?.name === 'Kohlenhydrate' ||
      n?.name?.toLowerCase?.() === 'kohlenhydrate' ||
      n?.name?.toLowerCase?.() === 'kohlenhydrat'
  );
  const sugarItem = nutrients.find(
    (n) =>
      n?.name === 'davon Zucker' ||
      n?.name === 'Zucker' ||
      n?.name?.toLowerCase?.().includes('zucker')
  );

  const totalCarbs = Number(totalCarbsItem?.value) || 0;
  const sugar = Number(sugarItem?.value) || 0;
  const complexCarbs = Math.max(0, Number((totalCarbs - sugar).toFixed(2)));

  // 2. Masti i zasićene masne kiseline
  const totalFatItem = nutrients.find(
    (n) => n?.name === 'Fett' || n?.name?.toLowerCase?.() === 'fett'
  );
  const satFatItem = nutrients.find(
    (n) =>
      n?.name === 'davon gesättige Fettsäuren' ||
      n?.name === 'davon gesättigte Fettsäuren' ||
      n?.name === 'gesättigte Fettsäuren' ||
      n?.name?.toLowerCase?.().includes('gesättig')
  );

  const totalFat = Number(totalFatItem?.value) || 0;
  const satFat = Number(satFatItem?.value) || 0;
  const otherFat = Math.max(0, Number((totalFat - satFat).toFixed(2)));

  // 3. Proteini i vlakna
  const proteinItem = nutrients.find(
    (n) =>
      n?.name === 'Protein' ||
      n?.name === 'Proteine' ||
      n?.name === 'Eiweiss' ||
      n?.name === 'Eiweiß' ||
      n?.name?.toLowerCase?.().startsWith('protein')
  );
  const fiberItem = nutrients.find(
    (n) =>
      n?.name === 'Nahrungsfasern' ||
      n?.name === 'Nahrungsfasern (Ballaststoffe)' ||
      n?.name === 'Ballaststoffe' ||
      n?.name?.toLowerCase?.().includes('ballaststoff') ||
      n?.name?.toLowerCase?.().includes('nahrungsfaser')
  );

  const chartSegments: NutrientItem[] = [
    // --- UGLJENI HIDRATI ---
    {
      name: 'davon Zucker',
      parent: 'Kohlenhydrate',
      parentCategory: 'Kohlenhydrate',
      is_chart_slice: true,
      value: sugar,
      totalParent: totalCarbs,
      totalParentValue: totalCarbs,
      unit: sugarItem?.unit || 'g',
      color: sugarItem?.color || '#f59e0b',
    },
    {
      name: sugar > 0 ? 'Andere Kohlenhydrate' : 'Kohlenhydrate',
      parent: sugar > 0 ? 'Kohlenhydrate' : undefined,
      parentCategory: sugar > 0 ? 'Kohlenhydrate' : null,
      is_chart_slice: true,
      value: sugar > 0 ? complexCarbs : totalCarbs,
      totalParent: totalCarbs,
      totalParentValue: totalCarbs,
      unit: totalCarbsItem?.unit || 'g',
      color: sugar > 0 ? '#fde68a' : totalCarbsItem?.color || '#f59e0b',
    },

    // --- MASTI ---
    {
      name: 'davon gesättigte Fettsäuren',
      parent: 'Fett',
      parentCategory: 'Fett',
      is_chart_slice: true,
      value: satFat,
      totalParent: totalFat,
      totalParentValue: totalFat,
      unit: satFatItem?.unit || 'g',
      color: satFatItem?.color || '#dc2626',
    },
    {
      name: satFat > 0 ? 'Ungesättigte Fettsäuren' : 'Fett',
      parent: satFat > 0 ? 'Fett' : undefined,
      parentCategory: satFat > 0 ? 'Fett' : null,
      is_chart_slice: true,
      value: satFat > 0 ? otherFat : totalFat,
      totalParent: totalFat,
      totalParentValue: totalFat,
      unit: totalFatItem?.unit || 'g',
      color: satFat > 0 ? '#fca5a5' : totalFatItem?.color || '#ef4444',
    },

    // --- PROTEINI ---
    {
      name: 'Protein',
      parent: undefined,
      parentCategory: null,
      is_chart_slice: true,
      value: Number(proteinItem?.value) || 0,
      unit: proteinItem?.unit || 'g',
      color: proteinItem?.color || '#3b82f6',
    },
  ];

  if (fiberItem && Number(fiberItem.value) > 0) {
    chartSegments.push({
      name: fiberItem.name?.includes('Nahrungsfaser') ? 'Nahrungsfasern' : 'Ballaststoffe',
      parent: undefined,
      parentCategory: null,
      is_chart_slice: true,
      value: Number(fiberItem.value),
      unit: fiberItem.unit || 'g',
      color: fiberItem.color || '#10b981',
    });
  }

  return chartSegments.filter((item) => item.value > 0);
}

// Backward-compatible alias
export const prepareChartData = prepareNutritionChartData;

export default function ProductNutritionChart({
  product,
  macroDistribution,
  macro_distribution,
  nutritionalValues,
  nutritional_values,
  nutrients,
}: ProductNutritionChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const allNutrients: NutrientItem[] =
    product?.macro_distribution ||
    macroDistribution ||
    macro_distribution ||
    nutritionalValues ||
    nutritional_values ||
    nutrients ||
    [];

  if (!allNutrients || allNutrients.length === 0) {
    return (
      <div className="rounded-3xl border border-stone-200 p-8 text-center text-sm text-stone-500 bg-white">
        Keine Nährwertangaben vorhanden.
      </div>
    );
  }

  // 1. PRIKAZ U PIE CHART-U:
  // Koristi elemente koji imaju is_chart_slice === true i value > 0
  const hasExplicitSlices = allNutrients.some((item) => item?.is_chart_slice !== undefined);
  const chartData = hasExplicitSlices
    ? allNutrients.filter((item: any) => item?.is_chart_slice && Number(item?.value) > 0)
    : prepareNutritionChartData(allNutrients);

  if (chartData.length === 0) {
    return (
      <div className="rounded-3xl border border-stone-200 p-8 text-center text-sm text-stone-500 bg-white">
        Keine Nährwertangaben vorhanden.
      </div>
    );
  }

  // 2. LEGENDA / LISTA DETALJA:
  const carbsTotal = allNutrients.find(
    (n) => n?.name === 'Kohlenhydrate' || n?.name === 'Kohlenhydrat'
  );
  const sugar = allNutrients.find(
    (n) => n?.name === 'davon Zucker' || n?.name === 'Zucker'
  );
  const otherCarbs = allNutrients.find(
    (n) =>
      n?.name === 'Andere Kohlenhydrate' ||
      n?.name === 'Komplexe Kohlenhydrate'
  );

  const fatTotal = allNutrients.find((n) => n?.name === 'Fett');
  const satFat = allNutrients.find(
    (n) =>
      n?.name === 'davon gesättigte Fettsäuren' ||
      n?.name === 'davon gesättige Fettsäuren' ||
      n?.name === 'gesättigte Fettsäuren'
  );
  const otherFat = allNutrients.find(
    (n) => n?.name === 'Ungesättigte Fettsäuren'
  );

  const protein = allNutrients.find(
    (n) =>
      n?.name === 'Protein' ||
      n?.name === 'Proteine' ||
      n?.name === 'Eiweiss' ||
      n?.name === 'Eiweiß'
  );
  const fiber = allNutrients.find(
    (n) =>
      n?.name?.includes('Nahrungsfasern') ||
      n?.name?.includes('Ballaststoffe')
  );
  const sodium = allNutrients.find(
    (n) =>
      n?.name === 'Natrium' ||
      n?.name?.toLowerCase?.() === 'natrium' ||
      n?.name?.toLowerCase?.() === 'salz'
  );
  const vitC = allNutrients.find(
    (n) =>
      n?.name === 'Vitamin C' ||
      n?.name?.toLowerCase?.() === 'vitamin c'
  );

  // Derived fallbacks if sub-items aren't separate entries in allNutrients
  const effectiveSugar = sugar;
  const effectiveOtherCarbs =
    otherCarbs ||
    (carbsTotal && sugar && Number(carbsTotal.value) > Number(sugar.value)
      ? {
          name: 'Andere Kohlenhydrate',
          value: Number((Number(carbsTotal.value) - Number(sugar.value)).toFixed(2)),
          unit: carbsTotal.unit || 'g',
          color: '#fde68a',
          parent: 'Kohlenhydrate',
        }
      : undefined);

  const effectiveSatFat = satFat;
  const effectiveOtherFat =
    otherFat ||
    (fatTotal && satFat && Number(fatTotal.value) > Number(satFat.value)
      ? {
          name: 'Ungesättigte Fettsäuren',
          value: Number((Number(fatTotal.value) - Number(satFat.value)).toFixed(2)),
          unit: fatTotal.unit || 'g',
          color: '#fca5a5',
          parent: 'Fett',
        }
      : undefined);

  // Extra micronutrients or any other unhandled items
  const handledNames = new Set([
    carbsTotal?.name,
    sugar?.name,
    otherCarbs?.name,
    effectiveOtherCarbs?.name,
    fatTotal?.name,
    satFat?.name,
    otherFat?.name,
    effectiveOtherFat?.name,
    protein?.name,
    fiber?.name,
    sodium?.name,
    vitC?.name,
  ].filter(Boolean));

  const extraNutrients = allNutrients.filter(
    (item) => !handledNames.has(item.name) && !item.parent
  );

  return (
    <div className="bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-8 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-5 mb-6">
        <div>
          <span className="text-xs font-bold tracking-wider uppercase text-stone-400">
            Nährwertverteilung
          </span>
          <h3 className="text-xl font-extrabold tracking-tight text-stone-900 mt-0.5">
            Makronährstoffe auf 100g
          </h3>
        </div>
        <div className="text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/60 px-3 py-1 rounded-full w-fit">
          100% naturbelassen
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Donut Chart */}
        <div className="md:col-span-6 flex flex-col items-center justify-center relative min-h-[260px]">
          {mounted ? (
            <div className="w-full h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={68}
                    outerRadius={95}
                    paddingAngle={3}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color || '#78716c'}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const item = payload[0].payload as any;
                        const unit = item.unit || 'g';
                        const parentName = item.parent || item.parentCategory;
                        return (
                          <div className="bg-stone-900 text-white text-xs px-3.5 py-2.5 rounded-xl shadow-xl border border-stone-800 space-y-0.5">
                            <p className="font-semibold text-stone-100 flex items-center gap-1.5">
                              <span
                                className="w-2.5 h-2.5 rounded-full shrink-0"
                                style={{ backgroundColor: item.color || '#f59e0b' }}
                              />
                              <span>
                                {item.name}: {item.value} {unit}
                              </span>
                            </p>
                            {parentName && (
                              <p className="text-xs text-stone-400">
                                Teil von {parentName}
                              </p>
                            )}
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              {/* Donut Center Label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-black text-stone-900 tracking-tight font-sans">
                  100g
                </span>
                <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
                  Basis
                </span>
              </div>
            </div>
          ) : (
            <div className="w-full h-[260px] flex items-center justify-center">
              <div className="w-32 h-32 rounded-full border-4 border-stone-100 border-t-amber-500 animate-spin" />
            </div>
          )}
        </div>

        {/* Grouped Legend & Details List */}
        <div className="md:col-span-6 space-y-4">
          <div className="divide-y divide-stone-100">
            {/* 1. Kohlenhydrate & Sub-items */}
            {carbsTotal && Number(carbsTotal.value) > 0 && (
              <div className="py-2.5 space-y-1.5">
                <div className="flex items-center justify-between text-sm group">
                  <div className="flex items-center gap-3">
                    <span
                      className="w-3 h-3 rounded-full shrink-0 shadow-xs"
                      style={{ backgroundColor: carbsTotal.color || '#f59e0b' }}
                    />
                    <span className="font-semibold text-stone-900">
                      {carbsTotal.name}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-stone-900">
                      {carbsTotal.value} {carbsTotal.unit || 'g'}
                    </span>
                  </div>
                </div>

                {/* Sub-items: davon Zucker & Andere Kohlenhydrate */}
                {(effectiveSugar || effectiveOtherCarbs) && (
                  <div className="pl-6 space-y-1.5 pt-1 border-l-2 border-amber-200/80 ml-1.5 my-1">
                    {effectiveSugar && Number(effectiveSugar.value) > 0 && (
                      <div className="flex items-center justify-between text-xs text-stone-700">
                        <div className="flex items-center gap-2.5">
                          <span
                            className="w-2.5 h-2.5 rounded-full shrink-0 shadow-2xs"
                            style={{ backgroundColor: effectiveSugar.color || '#f59e0b' }}
                          />
                          <span className="font-medium text-stone-700">
                            {effectiveSugar.name}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="font-mono font-semibold text-stone-900">
                            {effectiveSugar.value} {effectiveSugar.unit || 'g'}
                          </span>
                        </div>
                      </div>
                    )}

                    {effectiveOtherCarbs && Number(effectiveOtherCarbs.value) > 0 && (
                      <div className="flex items-center justify-between text-xs text-stone-700">
                        <div className="flex items-center gap-2.5">
                          <span
                            className="w-2.5 h-2.5 rounded-full shrink-0 border-2 border-amber-400 shadow-2xs"
                            style={{ backgroundColor: effectiveOtherCarbs.color || '#fde68a' }}
                          />
                          <span className="font-medium text-stone-700">
                            {effectiveOtherCarbs.name}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="font-mono font-semibold text-stone-900">
                            {effectiveOtherCarbs.value} {effectiveOtherCarbs.unit || 'g'}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* 2. Fett & Sub-items */}
            {fatTotal && Number(fatTotal.value) > 0 && (
              <div className="py-2.5 space-y-1.5">
                <div className="flex items-center justify-between text-sm group">
                  <div className="flex items-center gap-3">
                    <span
                      className="w-3 h-3 rounded-full shrink-0 shadow-xs"
                      style={{ backgroundColor: fatTotal.color || '#dc2626' }}
                    />
                    <span className="font-semibold text-stone-900">
                      {fatTotal.name}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-stone-900">
                      {fatTotal.value} {fatTotal.unit || 'g'}
                    </span>
                  </div>
                </div>

                {/* Sub-items: davon gesättigte Fettsäuren & Ungesättigte Fettsäuren */}
                {(effectiveSatFat || effectiveOtherFat) && (
                  <div className="pl-6 space-y-1.5 pt-1 border-l-2 border-red-200/80 ml-1.5 my-1">
                    {effectiveSatFat && Number(effectiveSatFat.value) > 0 && (
                      <div className="flex items-center justify-between text-xs text-stone-700">
                        <div className="flex items-center gap-2.5">
                          <span
                            className="w-2.5 h-2.5 rounded-full shrink-0 shadow-2xs"
                            style={{ backgroundColor: effectiveSatFat.color || '#dc2626' }}
                          />
                          <span className="font-medium text-stone-700">
                            {effectiveSatFat.name}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="font-mono font-semibold text-stone-900">
                            {effectiveSatFat.value} {effectiveSatFat.unit || 'g'}
                          </span>
                        </div>
                      </div>
                    )}

                    {effectiveOtherFat && Number(effectiveOtherFat.value) > 0 && (
                      <div className="flex items-center justify-between text-xs text-stone-700">
                        <div className="flex items-center gap-2.5">
                          <span
                            className="w-2.5 h-2.5 rounded-full shrink-0 border-2 border-red-300 shadow-2xs"
                            style={{ backgroundColor: effectiveOtherFat.color || '#fca5a5' }}
                          />
                          <span className="font-medium text-stone-700">
                            {effectiveOtherFat.name}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="font-mono font-semibold text-stone-900">
                            {effectiveOtherFat.value} {effectiveOtherFat.unit || 'g'}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* 3. Protein */}
            {protein && Number(protein.value) > 0 && (
              <div className="py-2.5 flex items-center justify-between text-sm group">
                <div className="flex items-center gap-3">
                  <span
                    className="w-3 h-3 rounded-full shrink-0 shadow-xs"
                    style={{ backgroundColor: protein.color || '#3b82f6' }}
                  />
                  <span className="font-medium text-stone-700">{protein.name}</span>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-stone-900">
                    {protein.value} {protein.unit || 'g'}
                  </span>
                </div>
              </div>
            )}

            {/* 4. Nahrungsfasern / Ballaststoffe */}
            {fiber && Number(fiber.value) > 0 && (
              <div className="py-2.5 flex items-center justify-between text-sm group">
                <div className="flex items-center gap-3">
                  <span
                    className="w-3 h-3 rounded-full shrink-0 shadow-xs"
                    style={{ backgroundColor: fiber.color || '#10b981' }}
                  />
                  <span className="font-medium text-stone-700">{fiber.name}</span>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-stone-900">
                    {fiber.value} {fiber.unit || 'g'}
                  </span>
                </div>
              </div>
            )}

            {/* 5. Natrium */}
            {sodium && Number(sodium.value) > 0 && (
              <div className="py-2.5 flex items-center justify-between text-sm group">
                <div className="flex items-center gap-3">
                  <span
                    className="w-3 h-3 rounded-full shrink-0 shadow-xs"
                    style={{ backgroundColor: sodium.color || '#8b5cf6' }}
                  />
                  <span className="font-medium text-stone-700">{sodium.name}</span>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-stone-900">
                    {sodium.value} {sodium.unit || 'g'}
                  </span>
                </div>
              </div>
            )}

            {/* 6. Vitamin C */}
            {vitC && Number(vitC.value) > 0 && (
              <div className="py-2.5 flex items-center justify-between text-sm group">
                <div className="flex items-center gap-3">
                  <span
                    className="w-3 h-3 rounded-full shrink-0 shadow-xs"
                    style={{ backgroundColor: vitC.color || '#ec4899' }}
                  />
                  <span className="font-medium text-stone-700">{vitC.name}</span>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-stone-900">
                    {vitC.value} {vitC.unit || 'mg'}
                  </span>
                </div>
              </div>
            )}

            {/* 7. Extra Micronutrients */}
            {extraNutrients.map((item) => (
              <div
                key={item.name}
                className="py-2.5 flex items-center justify-between text-sm group"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="w-3 h-3 rounded-full shrink-0 shadow-xs"
                    style={{ backgroundColor: item.color || '#78716c' }}
                  />
                  <span className="font-medium text-stone-700">{item.name}</span>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-stone-900">
                    {item.value} {item.unit || 'g'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-stone-400 pt-2 border-t border-stone-100">
            * Natürliche Nährwertschwankungen bei reinen Naturprodukten vorbehalten.
          </p>
        </div>
      </div>
    </div>
  );
}
