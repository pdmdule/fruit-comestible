import React from 'react';

const SEO_TOPICS = [
  {
    title: 'Natürliche Snacks ohne Zuckerzusatz',
    text: 'Wer auf eine bewusste Ernährung achtet, sucht oft nach echten Alternativen zu herkömmlichen Süssigkeiten. Unsere schonend verarbeiteten Produkte bestehen zu 100 % aus purer Frucht. Durch den Entzug von Feuchtigkeit wird der natürliche Geschmack intensiviert, ganz ohne künstliche Aromen oder zusätzlichen Zucker. Ein ehrlicher Fruchtsnack für jeden Tag.',
  },
  {
    title: 'Gesunde Snacks für Kinder und für unterwegs',
    text: 'Eltern kennen die Herausforderung: Ein schneller, nahrhafter Snack für die Schule oder den Ausflug muss her. Gefriergetrocknete Früchte sind leicht, kleben nicht und versorgen den Körper mit wertvollen Nährstoffen. Sie sind die perfekten gesunden Snacks für Kinder und passen ideal in jeden Rucksack – die praktische Fruchtportion für unterwegs.',
  },
  {
    title: 'Das ideale Topping für Müesli und Joghurt',
    text: 'Ein guter Morgen beginnt mit dem richtigen Frühstück. Unser Fruchtgranulat und die ganzen Beeren eignen sich hervorragend als farbenfrohes Topping für Müesli, Porridge oder Smoothie-Bowls. Auch als knusprige Ergänzung für frisches Joghurt oder als aromatische Zutat zum Backen bieten sie unendliche kulinarische Möglichkeiten.',
  },
  {
    title: 'Schweizer Standard für deinen Fruchtgenuss',
    text: 'Qualität ist kein Zufall. Als Schweizer Marke legen wir höchsten Wert auf faire Produktionsbedingungen, strengste Qualitätskontrollen und schützende Premium-Verpackungen. So stellen wir sicher, dass jeder Bissen seinen ultimativen Crunch behält und du das Beste aus der Natur direkt zu dir nach Hause geliefert bekommst.',
  },
];

export default function SeoContentSection() {
  return (
    <section
      id="fruchtwissen"
      className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 scroll-mt-24"
    >
      <div className="p-6 sm:p-8 md:p-10 rounded-3xl bg-white border border-stone-200/90 shadow-2xs">
        <div className="max-w-5xl space-y-6 sm:space-y-7">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-stone-900 tracking-tight">
            Alles über gefriergetrocknete Früchte &amp; gesunde Snacks
          </h2>
          <div className="space-y-6 sm:space-y-7">
            {SEO_TOPICS.map((topic) => (
              <div key={topic.title} className="space-y-2">
                <h3 className="text-base sm:text-lg font-bold text-stone-900">
                  {topic.title}
                </h3>
                <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
                  {topic.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
