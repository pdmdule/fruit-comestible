import React from 'react';
import { Leaf, Sparkles, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface ValueItem {
  id: string;
  title: string;
  text: string;
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  iconColor: string;
}

const BRAND_VALUES: ValueItem[] = [
  {
    id: 'bio-natur',
    title: 'BIO Zertifiziert & 100% Natur',
    text: 'Reiner Fruchtgenuss aus zertifiziertem Bio-Anbau. Ohne Zuckerzusatz, vegan und vollkommen naturbelassen.',
    icon: Leaf,
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-800',
  },
  {
    id: 'crunch',
    title: 'Ultimativer Crunch',
    text: 'Schonendes Trocknungsverfahren mit unter 10% Restfeuchtigkeit garantiert maximale Aromatik und den perfekten Knusper-Effekt.',
    icon: Sparkles,
    iconBg: 'bg-rose-100',
    iconColor: 'text-rose-700',
  },
  {
    id: 'aromaschutz',
    title: 'Premium Aromaschutz',
    text: 'Spezielle Verpackungen bewahren die höchste Qualität und sorgen für eine langanhaltende Knusprigkeit unserer Früchte.',
    icon: ShieldCheck,
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-800',
  },
  {
    id: 'swiss-standard',
    title: 'Schweizer Standard',
    text: 'Faire Preise für unsere Erzeuger und kompromisslose Qualität. In der Schweiz kontrolliert und verpackt.',
    icon: CheckCircle2,
    iconBg: 'bg-red-100',
    iconColor: 'text-red-700',
  },
];

export default function ValuesSection() {
  return (
    <section className="border-y border-stone-200/80 bg-white">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-12 sm:py-16 lg:py-20 space-y-10">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-extrabold tracking-widest uppercase text-rose-700 block">
            Qualitätsversprechen
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-stone-900">
            Warum Fruit-Comestible? Schweizer Qualität & echter Geschmack
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {BRAND_VALUES.map((val) => {
            const Icon = val.icon;
            return (
              <div
                key={val.id}
                className="p-5 sm:p-6 lg:p-7 rounded-2xl sm:rounded-3xl bg-stone-50/70 border border-stone-200/80 h-full flex flex-col justify-between hover:border-stone-300 transition-colors shadow-2xs"
              >
                <div>
                  <div
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl ${val.iconBg} ${val.iconColor} flex items-center justify-center shrink-0 mb-4 sm:mb-5`}
                  >
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.2]" />
                  </div>
                  <h3 className="font-bold text-stone-900 text-base sm:text-lg mb-2">
                    {val.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                    {val.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
