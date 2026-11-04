import React from 'react';
import { Leaf, Heart, Sparkles, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface SeoTopic {
  id: string;
  number: string;
  title: string;
  text: string;
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  iconColor: string;
  badge: string;
}

const SEO_TOPICS: SeoTopic[] = [
  {
    id: 'ohne-zuckerzusatz',
    number: '01',
    title: 'Natürliche Snacks ohne Zuckerzusatz',
    text: 'Wer auf eine bewusste Ernährung achtet, sucht oft nach echten Alternativen zu herkömmlichen Süssigkeiten. Unsere schonend verarbeiteten Produkte bestehen zu 100 % aus purer Frucht. Durch den Entzug von Feuchtigkeit wird der natürliche Geschmack intensiviert, ganz ohne künstliche Aromen oder zusätzlichen Zucker. Ein ehrlicher Fruchtsnack für jeden Tag.',
    icon: Leaf,
    iconBg: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400',
    iconColor: 'text-emerald-700 dark:text-emerald-400',
    badge: '100% Pure Natur',
  },
  {
    id: 'fuer-kinder-unterwegs',
    number: '02',
    title: 'Gesunde Snacks für Kinder und für unterwegs',
    text: 'Eltern kennen die Herausforderung: Ein schneller, nahrhafter Snack für die Schule oder den Ausflug muss her. Gefriergetrocknete Früchte sind leicht, kleben nicht und versorgen den Körper mit wertvollen Nährstoffen. Sie sind die perfekten gesunden Snacks für Kinder und passen ideal in jeden Rucksack – die praktische Fruchtportion für unterwegs.',
    icon: Heart,
    iconBg: 'bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400',
    iconColor: 'text-rose-700 dark:text-rose-400',
    badge: 'Ideal für Schule & Freizeit',
  },
  {
    id: 'topping-muesli-joghurt',
    number: '03',
    title: 'Das ideale Topping für Müesli und Joghurt',
    text: 'Ein guter Morgen beginnt mit dem richtigen Frühstück. Unser Fruchtgranulat und die ganzen Beeren eignen sich hervorragend als farbenfrohes Topping für Müesli, Porridge oder Smoothie-Bowls. Auch als knusprige Ergänzung für frisches Joghurt oder als aromatische Zutat zum Backen bieten sie unendliche kulinarische Möglichkeiten.',
    icon: Sparkles,
    iconBg: 'bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-400',
    iconColor: 'text-amber-700 dark:text-amber-400',
    badge: 'Knuspriges Topping',
  },
  {
    id: 'schweizer-standard',
    number: '04',
    title: 'Schweizer Standard für deinen Fruchtgenuss',
    text: 'Qualität ist kein Zufall. Als Schweizer Marke legen wir höchsten Wert auf faire Produktionsbedingungen, strengste Qualitätskontrollen und schützende Premium-Verpackungen. So stellen wir sicher, dass jeder Bissen seinen ultimativen Crunch behält und du das Beste aus der Natur direkt zu dir nach Hause geliefert bekommst.',
    icon: ShieldCheck,
    iconBg: 'bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400',
    iconColor: 'text-red-700 dark:text-red-400',
    badge: 'Schweizer Qualitätsgarantie',
  },
];

export default function SeoContentSection() {
  return (
    <section
      id="fruchtwissen"
      className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-8 sm:space-y-10 scroll-mt-24"
    >
      {/* Header matching site aesthetic */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-2 max-w-3xl">
          <span className="text-xs font-extrabold tracking-widest uppercase text-rose-700 block">
            Fruchtwissen & Ratgeber
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-stone-900 dark:text-stone-100">
            Alles über gefriergetrocknete Früchte & gesunde Snacks
          </h2>
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 leading-relaxed">
            Erfahre mehr über die Vorzüge schonender Gefriertrocknung, pure Fruchtsnacks ohne Zuckerzusatz
            und wie du deinen Alltag mit echtem Schweizer Knuspergenuss bereicherst.
          </p>
        </div>
      </div>

      {/* 4 Cards Grid - exactly matching ProductCard and ValuesSection styling */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {SEO_TOPICS.map((topic) => {
          const Icon = topic.icon;
          return (
            <div
              key={topic.id}
              className="group flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#1E1B18] border border-stone-200/90 dark:border-stone-800 shadow-2xs hover:shadow-md hover:border-stone-300 dark:hover:border-stone-700 transition-all duration-300"
            >
              <div className="space-y-4">
                {/* Top: Icon + Number indicator */}
                <div className="flex items-center justify-between">
                  <div
                    className={`w-12 h-12 rounded-2xl ${topic.iconBg} flex items-center justify-center shrink-0 shadow-2xs`}
                  >
                    <Icon className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <span className="text-xs font-mono font-bold text-stone-400 dark:text-stone-500">
                    {topic.number}
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-2.5">
                  <h3 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 group-hover:text-rose-700 dark:group-hover:text-rose-400 transition leading-snug">
                    {topic.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                    {topic.text}
                  </p>
                </div>
              </div>

              {/* Bottom quality accent chip */}
              <div className="pt-4 mt-6 border-t border-stone-100 dark:border-stone-800/80 flex items-center gap-1.5 text-[11px] font-bold text-stone-700 dark:text-stone-300">
                <CheckCircle2 className={`w-3.5 h-3.5 ${topic.iconColor} shrink-0`} />
                <span>{topic.badge}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
