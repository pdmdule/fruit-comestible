'use client';

import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

export interface MacroItem {
  name: string;
  value: number;
  color?: string;
}

interface ProductNutritionChartProps {
  macroDistribution?: MacroItem[];
}

const DEFAULT_COLORS: Record<string, string> = {
  Kohlenhydrate: '#e11d48', // rose-600 berry
  Ballaststoffe: '#047857', // emerald-700
  Proteine: '#3b82f6',
  Fett: '#f59e0b',
};

export default function ProductNutritionChart({
  macroDistribution,
}: ProductNutritionChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!macroDistribution || macroDistribution.length === 0) {
    return (
      <div className="rounded-3xl border border-stone-200 p-8 text-center text-sm text-stone-500 bg-white">
        Keine Nährwertangaben vorhanden.
      </div>
    );
  }

  const data = macroDistribution.map((item) => ({
    name: item.name,
    value: Number(item.value),
    color: item.color || DEFAULT_COLORS[item.name] || '#78716c',
  }));

  const totalGrams = data.reduce((sum, item) => sum + item.value, 0);

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
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={68}
                    outerRadius={95}
                    paddingAngle={3}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const item = payload[0];
                        const val = Number(item.value);
                        const pct = totalGrams > 0 ? ((val / totalGrams) * 100).toFixed(0) : 0;
                        return (
                          <div className="bg-stone-900 text-white text-xs px-3 py-2 rounded-xl shadow-lg border border-stone-800">
                            <span className="font-semibold">{item.name}: </span>
                            <span className="font-mono">{val}g ({pct}%)</span>
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
              <div className="w-32 h-32 rounded-full border-4 border-stone-100 border-t-rose-600 animate-spin" />
            </div>
          )}
        </div>

        {/* Minimalist Breakdown Table */}
        <div className="md:col-span-6 space-y-4">
          <div className="divide-y divide-stone-100">
            {data.map((item) => {
              const pct = totalGrams > 0 ? ((item.value / totalGrams) * 100).toFixed(0) : 0;
              return (
                <div
                  key={item.name}
                  className="py-3 flex items-center justify-between text-sm group"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-3 h-3 rounded-full shrink-0 shadow-xs"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="font-medium text-stone-700">
                      {item.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-right">
                    <span className="font-mono font-bold text-stone-900">
                      {item.value}g
                    </span>
                    <span className="text-xs text-stone-400 font-mono w-10">
                      {pct}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-xs text-stone-400 pt-2 border-t border-stone-100">
            * Natürliche Nährwertschwankungen bei reinen Naturprodukten vorbehalten.
          </p>
        </div>
      </div>
    </div>
  );
}
