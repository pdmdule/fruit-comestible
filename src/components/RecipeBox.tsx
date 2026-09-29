import React from 'react';
import {
  Clock,
  Flame,
  Users,
  Sparkles,
  ChefHat,
  Check,
  Lightbulb,
} from 'lucide-react';

export interface RecipeData {
  servings?: string;
  prep_time?: string;
  cook_time?: string;
  difficulty?: string;
  ingredients?: Array<{
    category: string;
    items: string[];
  }>;
  steps?: string[];
  tip?: string;
}

interface RecipeBoxProps {
  recipe: RecipeData;
  recipeTitle?: string;
}

export default function RecipeBox({ recipe, recipeTitle }: RecipeBoxProps) {
  return (
    <div className="my-10 bg-white rounded-3xl border border-stone-200/90 shadow-sm overflow-hidden">
      {/* Top Banner */}
      <div className="bg-stone-900 text-white px-6 sm:px-8 py-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0">
            <ChefHat className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <span className="text-[10px] tracking-widest uppercase font-bold text-rose-300 block">
              Rezept-Kasten
            </span>
            <h3 className="font-extrabold text-base sm:text-lg leading-tight">
              {recipeTitle || 'Zutaten & Schritt-für-Schritt Zubereitung'}
            </h3>
          </div>
        </div>

        <span className="text-xs font-semibold text-stone-400 bg-stone-800/80 px-3 py-1.5 rounded-full border border-stone-700">
          🇨🇭 Schweizer Rezeptidee
        </span>
      </div>

      {/* Meta Quick Info Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-stone-200/80 border-b border-stone-200/80 bg-stone-50/60 text-center">
        {recipe.prep_time && (
          <div className="p-4 sm:p-5 flex flex-col items-center justify-center gap-1">
            <Clock className="w-4 h-4 text-stone-500" />
            <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
              Zubereitung
            </span>
            <span className="text-sm font-extrabold text-stone-900">
              {recipe.prep_time}
            </span>
          </div>
        )}

        {recipe.cook_time && (
          <div className="p-4 sm:p-5 flex flex-col items-center justify-center gap-1">
            <Flame className="w-4 h-4 text-rose-600" />
            <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
              Koch- / Backzeit
            </span>
            <span className="text-sm font-extrabold text-stone-900">
              {recipe.cook_time}
            </span>
          </div>
        )}

        {recipe.servings && (
          <div className="p-4 sm:p-5 flex flex-col items-center justify-center gap-1">
            <Users className="w-4 h-4 text-stone-500" />
            <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
              Portionen
            </span>
            <span className="text-sm font-extrabold text-stone-900">
              {recipe.servings}
            </span>
          </div>
        )}

        {recipe.difficulty && (
          <div className="p-4 sm:p-5 flex flex-col items-center justify-center gap-1">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
              Schwierigkeit
            </span>
            <span className="text-sm font-extrabold text-stone-900 capitalize">
              {recipe.difficulty}
            </span>
          </div>
        )}
      </div>

      {/* Main Two-Column Content: Left = Ingredients, Right = Steps */}
      <div className="p-6 sm:p-8 lg:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Ingredients */}
          <div className="lg:col-span-5 space-y-6">
            <div className="border-b border-stone-200/80 pb-3">
              <h4 className="font-black text-lg text-stone-900 flex items-center gap-2">
                <span>Zutaten</span>
              </h4>
            </div>

            {recipe.ingredients && recipe.ingredients.length > 0 ? (
              <div className="space-y-6">
                {recipe.ingredients.map((group, gIdx) => (
                  <div key={gIdx} className="space-y-2.5">
                    {group.category && (
                      <h5 className="text-xs font-extrabold tracking-wider uppercase text-rose-700 bg-rose-50 px-2.5 py-1 rounded-md inline-block">
                        {group.category}
                      </h5>
                    )}
                    <ul className="space-y-2 text-xs sm:text-sm">
                      {group.items.map((item, iIdx) => (
                        <li
                          key={iIdx}
                          className="flex items-start gap-2.5 text-stone-700 leading-snug"
                        >
                          <span className="w-4 h-4 rounded-full bg-stone-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3 stroke-[2.5]" />
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-stone-500">Keine Zutaten angegeben.</p>
            )}
          </div>

          {/* Right Column: Step-by-Step Instructions */}
          <div className="lg:col-span-7 space-y-6">
            <div className="border-b border-stone-200/80 pb-3">
              <h4 className="font-black text-lg text-stone-900">
                Schritt-für-Schritt Zubereitung
              </h4>
            </div>

            {recipe.steps && recipe.steps.length > 0 ? (
              <ol className="space-y-4">
                {recipe.steps.map((step, idx) => {
                  // Check if step starts with a title followed by a colon (e.g. "Vorbereitung: ...")
                  const colonIndex = step.indexOf(':');
                  const hasPrefix = colonIndex > 0 && colonIndex < 35;
                  const prefix = hasPrefix ? step.substring(0, colonIndex) : null;
                  const body = hasPrefix ? step.substring(colonIndex + 1).trim() : step;

                  return (
                    <li
                      key={idx}
                      className="p-4 rounded-2xl bg-stone-50 border border-stone-200/60 flex items-start gap-3.5"
                    >
                      <div className="w-7 h-7 rounded-xl bg-stone-900 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                        {idx + 1}
                      </div>
                      <div className="text-xs sm:text-sm leading-relaxed text-stone-700 space-y-0.5">
                        {prefix && (
                          <strong className="font-black text-stone-900 block">
                            {prefix}
                          </strong>
                        )}
                        <p>{body}</p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            ) : (
              <p className="text-sm text-stone-500">Keine Schritte angegeben.</p>
            )}
          </div>
        </div>

        {/* Special Tip Block: "Tipp vom Team" */}
        {recipe.tip && (
          <div className="mt-8 rounded-2xl bg-amber-50/90 border border-amber-200/90 p-5 sm:p-6 flex items-start gap-4 text-amber-950">
            <div className="w-10 h-10 rounded-xl bg-amber-200 text-amber-800 flex items-center justify-center shrink-0">
              <Lightbulb className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-sm text-amber-950 uppercase tracking-wider">
                Tipp vom Team:
              </h4>
              <p className="text-xs sm:text-sm text-amber-900/90 leading-relaxed font-medium">
                {recipe.tip}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
