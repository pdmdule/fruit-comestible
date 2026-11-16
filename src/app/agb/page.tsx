import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import PrintButton from '@/components/PrintButton';

export const metadata: Metadata = {
  title: 'Allgemeine Geschäftsbedingungen (AGB)',
  description:
    'Allgemeine Geschäftsbedingungen (AGB) von Fruit-Comestible (www.fruit-comestible.ch), Stand: 15. November 2026. Gültig für Bestellungen in der Schweiz.',
  alternates: {
    canonical: 'https://www.fruit-comestible.ch/agb',
  },
  openGraph: {
    title: 'Allgemeine Geschäftsbedingungen (AGB) | Fruit-Comestible Schweiz',
    description:
      'Allgemeine Geschäftsbedingungen (AGB) von Fruit-Comestible, Sandackerstrasse 2, 8200 Schaffhausen, Schweiz.',
    url: 'https://www.fruit-comestible.ch/agb',
    siteName: 'Fruit-Comestible',
    locale: 'de_CH',
    type: 'website',
  },
};

export default function AgbPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen py-16 px-4 print:bg-white print:py-0 print:px-0">
      <div className="max-w-3xl mx-auto mb-6 print:hidden">
        <Breadcrumbs customItems={[{ label: 'Allgemeine Geschäftsbedingungen (AGB)' }]} />
      </div>

      <main className="max-w-3xl mx-auto bg-white p-8 sm:p-12 rounded-2xl border border-stone-200 shadow-xs print:border-none print:shadow-none print:p-0 print:max-w-none space-y-8 text-stone-700 leading-relaxed">
        {/* Document Header */}
        <header className="space-y-4 border-b border-stone-200 pb-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold bg-[#F4EFE6] text-stone-800 border border-stone-200">
              Stand: 15. November 2026
            </span>
            <PrintButton label="Drucken / PDF speichern" />
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 leading-tight">
            Allgemeine Geschäftsbedingungen (AGB)
          </h1>

          <p className="text-sm text-stone-500 font-medium">
           fruit-comestible | www.fruit-comestible.ch | Stand: 15. November 2026
          </p>
        </header>

        {/* Quick Anchor Navigation */}
        <nav
          aria-label="Inhaltsverzeichnis"
          className="print:hidden bg-[#FAF8F5] rounded-xl border border-stone-200/80 p-4 sm:p-5 text-xs sm:text-sm"
        >
          <p className="font-semibold text-stone-900 mb-2.5 uppercase tracking-wider text-xs">
            Inhaltsübersicht
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-stone-600">
            <a href="#geltungsbereich" className="hover:text-stone-900 hover:underline">1. Geltungsbereich</a>
            <a href="#produkte" className="hover:text-stone-900 hover:underline">2. Produkte und Angebot</a>
            <a href="#preise" className="hover:text-stone-900 hover:underline">3. Preise</a>
            <a href="#vertragsabschluss" className="hover:text-stone-900 hover:underline">4. Bestellung und Vertragsabschluss</a>
            <a href="#zahlung" className="hover:text-stone-900 hover:underline">5. Zahlungsbedingungen</a>
            <a href="#lieferung" className="hover:text-stone-900 hover:underline">6. Lieferung und Versand</a>
            <a href="#transport" className="hover:text-stone-900 hover:underline">7. Transport und beschädigte Sendungen</a>
            <a href="#retouren" className="hover:text-stone-900 hover:underline">8. Rückgabe und Widerruf</a>
            <a href="#gewaehrleistung" className="hover:text-stone-900 hover:underline">9. Produktqualität und Gewährleistung</a>
            <a href="#lagerung" className="hover:text-stone-900 hover:underline">10. Haltbarkeit und Lagerung</a>
            <a href="#allergene" className="hover:text-stone-900 hover:underline">11. Allergene und Produktinformationen</a>
            <a href="#eigentumsvorbehalt" className="hover:text-stone-900 hover:underline">12. Eigentumsvorbehalt</a>
            <a href="#haftung" className="hover:text-stone-900 hover:underline">13. Haftung</a>
            <a href="#datenschutz" className="hover:text-stone-900 hover:underline">14. Datenschutz</a>
            <a href="#aenderungen" className="hover:text-stone-900 hover:underline">15. Änderungen der AGB</a>
            <a href="#gerichtsstand" className="hover:text-stone-900 hover:underline">16. Anwendbares Recht und Gerichtsstand</a>
          </div>
        </nav>

        {/* Sections 1 - 16 */}
        <div className="space-y-8 text-sm sm:text-[15px]">
          <section id="geltungsbereich" className="scroll-mt-24 space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
              1. Geltungsbereich
            </h2>
            <p>
              Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für sämtliche Bestellungen, die über den Online-Shop www.fruit-comestible.ch getätigt werden.
            </p>
            <p>Betreiber des Online-Shops ist:</p>
            <address className="not-italic bg-[#FAF8F5] border border-stone-200 rounded-xl p-4 text-stone-800 space-y-0.5">
              <p className="font-bold text-stone-900">Fruit-Comestible</p>
              <p>Lukas Pem</p>
              <p>Sandackerstrasse 2</p>
              <p>8200 Schaffhausen</p>
              <p>Schweiz</p>
              <p className="pt-1">
                E-Mail:{' '}
                <a
                  href="mailto:info@fruit-comestible.ch"
                  className="text-[#6c943e] hover:underline font-medium"
                >
                  info@fruit-comestible.ch
                </a>
              </p>
            </address>
            <p>
              Das Angebot richtet sich an Privatpersonen und Unternehmen mit Lieferadresse in der Schweiz. Lieferungen ins Ausland werden nicht angeboten.
            </p>
            <p>
              Mit Abschluss einer Bestellung akzeptieren Kundinnen und Kunden die zum Bestellzeitpunkt gültigen AGB.
            </p>
          </section>

          <section id="produkte" className="scroll-mt-24 space-y-3 pt-6 border-t border-stone-100">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
              2. Produkte und Angebot
            </h2>
            <p>
             fruit-comestible bietet insbesondere gefriergetrocknete Früchte, Fruchtsnacks, Müeslimischungen, Geschenkpackungen und weitere Lebensmittel an.
            </p>
            <p>
              Die Produktbeschreibungen, Abbildungen und Angaben im Online-Shop dienen der Information über die angebotenen Produkte.
            </p>
            <p>
              Da es sich teilweise um Naturprodukte handelt, können Farbe, Form, Grösse und Aussehen der Früchte natürlichen Schwankungen unterliegen. Solche geringfügigen, produkttypischen Abweichungen stellen keinen Mangel dar, sofern die vereinbarte Qualität und Beschaffenheit eingehalten werden.
            </p>
            <p>
              Sämtliche Angebote gelten solange Vorrat.fruit-comestible behält sich vor, das Sortiment jederzeit anzupassen.
            </p>
          </section>

          <section id="preise" className="scroll-mt-24 space-y-3 pt-6 border-t border-stone-100">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
              3. Preise
            </h2>
            <p>
              Alle Verkaufspreise werden in Schweizer Franken (CHF) angegeben und verstehen sich inklusive der gesetzlich anwendbaren Mehrwertsteuer.
            </p>
            <p>
              Allfällige Versandkosten werden separat ausgewiesen und sind vor Abschluss der Bestellung ersichtlich.
            </p>
            <p>
              Es gelten die zum Zeitpunkt der Bestellung im Online-Shop angezeigten Preise.
            </p>
            <p>
              Preisänderungen bleiben für zukünftige Bestellungen vorbehalten. Bereits abgeschlossene Kaufverträge bleiben davon unberührt.
            </p>
            <p>
              Offensichtliche Preis- oder Eingabefehler berechtigenfruit-comestible, eine betroffene Bestellung nach den gesetzlichen Bestimmungen anzufechten. Bereits geleistete Zahlungen werden in diesem Fall zurückerstattet.
            </p>
          </section>

          <section id="vertragsabschluss" className="scroll-mt-24 space-y-3 pt-6 border-t border-stone-100">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
              4. Bestellung und Vertragsabschluss
            </h2>
            <p>
              Die Präsentation der Produkte im Online-Shop stellt eine Einladung zur Bestellung dar.
            </p>
            <p>
              Kundinnen und Kunden können Produkte auswählen, in den Warenkorb legen und ihre Angaben vor Abschluss der Bestellung überprüfen und korrigieren.
            </p>
            <p>
              Mit dem Anklicken der Schaltfläche zur zahlungspflichtigen Bestellung geben sie eine verbindliche Bestellung ab.
            </p>
            <p>
              Unmittelbar nach Eingang der Bestellung wird eine automatische Bestellbestätigung per E-Mail versendet.
            </p>
            <p>
              Der Kaufvertrag kommt mit der ausdrücklichen Annahme der Bestellung durchfruit-comestible zustande. Die Annahme kann durch eine entsprechende Bestätigung oder durch den Versand der Ware erfolgen. Eine automatische Eingangsbestätigung allein stellt noch keine Annahme dar, sofern darin nicht ausdrücklich etwas anderes mitgeteilt wird.
            </p>
            <p>
              Sollte ein bestelltes Produkt nicht verfügbar sein, wird die Kundin oder der Kunde informiert. Bereits geleistete Zahlungen für nicht lieferbare Produkte werden zurückerstattet, sofern keine Ersatzlieferung vereinbart wird.
            </p>
          </section>

          <section id="zahlung" className="scroll-mt-24 space-y-3 pt-6 border-t border-stone-100">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
              5. Zahlungsbedingungen
            </h2>
            <p>
              Die Bezahlung erfolgt über die im Online-Shop angebotenen Zahlungsmethoden.
            </p>
            <p>
              Die verfügbaren Zahlungsarten werden während des Bestellvorgangs angezeigt.
            </p>
            <p>
              Bei elektronischen Zahlungsmethoden erfolgt die Zahlungsabwicklung über die jeweils eingesetzen Zahlungsdienstleister.
            </p>
            <p>
              Bei Kauf auf Rechnung gelten die während des Bestellvorgangs angegebenen Zahlungsfristen.
            </p>
            <p>
              Bei Zahlungsverzug kannfruit-comestible nach den gesetzlichen Bestimmungen Verzugszinsen und gegebenenfalls notwendige und angemessene Inkassokosten geltend machen.
            </p>
            <p>
             fruit-comestible behält sich vor, bestimmte Zahlungsmethoden im Einzelfall nicht anzubieten.
            </p>
          </section>

          <section id="lieferung" className="scroll-mt-24 space-y-3 pt-6 border-t border-stone-100">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
              6. Lieferung und Versand
            </h2>
            <p>
             fruit-comestible liefert ausschliesslich an Lieferadressen innerhalb der Schweiz.
            </p>
            <p>
              Der Versand erfolgt über geeignete Versand- und Transportdienstleister.
            </p>
            <p>
              Die voraussichtlichen Lieferzeiten und Versandkosten werden im Online-Shop beziehungsweise während des Bestellvorgangs angegeben.
            </p>
            <p>
              Die angegebenen Lieferzeiten sind grundsätzlich Richtwerte, sofern nicht ausdrücklich ein verbindlicher Liefertermin vereinbart wurde.
            </p>
            <p>
              Bei Lieferverzögerungen informiertfruit-comestible die betroffenen Kundinnen und Kunden, sobald die Verzögerung bekannt ist.
            </p>
            <p>
              Kann eine Bestellung nicht innerhalb einer angemessenen Frist geliefert werden, stehen den Kundinnen und Kunden die gesetzlichen Rechte zu.
            </p>
            <p>
              Die Kundschaft ist dafür verantwortlich, eine vollständige und korrekte Lieferadresse anzugeben. Entstehen durch fehlerhafte Adressangaben zusätzliche Versandkosten, können diese der verursachenden Kundin oder dem verursachenden Kunden in Rechnung gestellt werden, soweit dies rechtlich zulässig ist.
            </p>
          </section>

          <section id="transport" className="scroll-mt-24 space-y-3 pt-6 border-t border-stone-100">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
              7. Transport und beschädigte Sendungen
            </h2>
            <p>
             fruit-comestible legt grossen Wert auf eine sorgfältige und transportsichere Verpackung seiner Produkte.
            </p>
            <p>
              Die Kundschaft wird gebeten, die Lieferung nach Erhalt auf sichtbare Transportschäden, fehlende Artikel und offensichtliche Mängel zu überprüfen.
            </p>
            <p>
              Beschädigte oder unvollständige Lieferungen sollten möglichst rasch an info@fruit-comestible.ch gemeldet werden, idealerweise unter Beilage von Fotos der Verpackung und der betroffenen Produkte.
            </p>
            <p>
              Eine unterlassene sofortige Meldung führt nicht automatisch zum Verlust gesetzlicher Ansprüche.
            </p>
            <p>
              Der Übergang von Nutzen und Gefahr richtet sich nach den anwendbaren gesetzlichen Bestimmungen, soweit nicht wirksam etwas anderes vereinbart wurde.
            </p>
          </section>

          <section id="retouren" className="scroll-mt-24 space-y-3 pt-6 border-t border-stone-100">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
              8. Rückgabe und Widerruf
            </h2>
            <p>
              Dafruit-comestible überwiegend Lebensmittel vertreibt, wird für mangelfreie Produkte grundsätzlich kein freiwilliges Rückgabe- oder Umtauschrecht gewährt.
            </p>
            <p>
              Insbesondere sind Rückgaben aufgrund einer Meinungsänderung, einer irrtümlichen Bestellung oder persönlicher Geschmacksvorlieben ausgeschlossen, sofernfruit-comestible nicht ausdrücklich einer Rücknahme zustimmt.
            </p>
            <p>
              Dies gilt insbesondere für bereits geöffnete Lebensmittelverpackungen.
            </p>
            <p>
              Ein allgemeines gesetzliches Widerrufsrecht besteht bei gewöhnlichen Onlinekäufen nach Schweizer Recht nicht.
            </p>
            <p>
              Gesetzliche Ansprüche bei mangelhaften, beschädigten oder falsch gelieferten Produkten bleiben ausdrücklich vorbehalten.
            </p>
            <p>
              Rücksendungen sind vorab mitfruit-comestible abzusprechen, damit eine geeignete Lösung vereinbart werden kann.
            </p>
          </section>

          <section id="gewaehrleistung" className="scroll-mt-24 space-y-3 pt-6 border-t border-stone-100">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
              9. Produktqualität und Gewährleistung
            </h2>
            <p>
             fruit-comestible verpflichtet sich, Produkte in einwandfreier Qualität und entsprechend den geltenden lebensmittelrechtlichen Anforderungen anzubieten.
            </p>
            <p>
              Sollte ein Produkt bei der Lieferung mangelhaft sein oder nicht der Bestellung entsprechen, istfruit-comestible möglichst zeitnah zu kontaktieren.
            </p>
            <p>
              Reklamationen können per E-Mail an info@fruit-comestible.ch eingereicht werden. Zur Bearbeitung können die Bestellnummer, eine Beschreibung des Mangels und gegebenenfalls Fotos angefordert werden.
            </p>
            <p>
              Bei berechtigten Reklamationen wird eine angemessene Lösung angeboten, beispielsweise eine Ersatzlieferung, eine Preisreduktion oder eine Rückerstattung.
            </p>
            <p>
              Die gesetzlichen Gewährleistungsrechte und Verjährungsfristen bleiben vorbehalten.
            </p>
            <p>
              Natürliche Unterschiede bei Farbe, Form, Grösse oder Textur der Früchte gelten nicht als Mangel, sofern die Produkte die vereinbarte Beschaffenheit aufweisen.
            </p>
            <div className="bg-[#FAF8F5] border border-stone-200 rounded-xl p-4 space-y-1.5">
              <p className="font-semibold text-stone-900">
                Hinweis zu natürlichen Fruchtbestandteilen und Steinresten:
              </p>
              <p>
                Bei entsteinten Früchten wie Sauerkirschen, Aprikosen oder Zwetschgen können trotz sorgfältiger Verarbeitung und Qualitätskontrolle vereinzelt Fruchtsteine oder Steinfragmente im Produkt verbleiben. Wir empfehlen deshalb, diese Produkte mit entsprechender Vorsicht zu verzehren und insbesondere bei der Abgabe an Kinder auf mögliche Steinreste zu achten.
              </p>
            </div>
            <p>
             fruit-comestible legt grossen Wert auf die Sicherheit und Qualität seiner Produkte. Gesetzliche Gewährleistungs- und Haftungsansprüche bleiben vorbehalten.
            </p>
          </section>

          <section id="lagerung" className="scroll-mt-24 space-y-3 pt-6 border-t border-stone-100">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
              10. Haltbarkeit und Lagerung
            </h2>
            <p>
              Die Produkte vonfruit-comestible sind entsprechend den Angaben auf der Verpackung aufzubewahren.
            </p>
            <p>
              Gefriergetrocknete Früchte reagieren empfindlich auf Feuchtigkeit. Die Kundschaft wird deshalb gebeten, die Produkte trocken, vor Wärme und direkter Sonneneinstrahlung geschützt sowie nach dem Öffnen gut verschlossen aufzubewahren.
            </p>
            <p>
              Das auf der Verpackung angegebene Mindesthaltbarkeitsdatum und allfällige besondere Lagerhinweise sind zu beachten.
            </p>
            <p>
              Für Qualitätsbeeinträchtigungen, die nach der Übergabe durch unsachgemässe Lagerung oder Handhabung durch die Kundschaft entstehen, übernimmtfruit-comestible keine Haftung, soweit gesetzlich zulässig.
            </p>
          </section>

          <section id="allergene" className="scroll-mt-24 space-y-3 pt-6 border-t border-stone-100">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
              11. Allergene und Produktinformationen
            </h2>
            <p>
              Die für das jeweilige Produkt relevanten Informationen, insbesondere Zutaten, Allergene, Nettofüllmenge und besondere Lagerhinweise, werden gemäss den gesetzlichen Vorgaben bereitgestellt.
            </p>
            <p>
              Kundinnen und Kunden mit Allergien oder Unverträglichkeiten werden gebeten, die Produktinformationen vor dem Verzehr sorgfältig zu beachten.
            </p>
            <p>
              Bei Unklarheiten können sie sich vor der Bestellung an info@fruit-comestible.ch wenden.
            </p>
            <p>
              Massgebend sind die verbindlichen Produktinformationen und Kennzeichnungen.
            </p>
          </section>

          <section id="eigentumsvorbehalt" className="scroll-mt-24 space-y-3 pt-6 border-t border-stone-100">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
              12. Eigentumsvorbehalt
            </h2>
            <p>
              Die gelieferten Produkte bleiben bis zur vollständigen Bezahlung Eigentum vonfruit-comestible, soweit ein Eigentumsvorbehalt nach den gesetzlichen Bestimmungen wirksam begründet werden kann.
            </p>
          </section>

          <section id="haftung" className="scroll-mt-24 space-y-3 pt-6 border-t border-stone-100">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
              13. Haftung
            </h2>
            <p>
             fruit-comestible haftet im Rahmen der anwendbaren gesetzlichen Bestimmungen.
            </p>
            <p>
              Eine Haftung für Schäden, die durch vorsätzliches oder grobfahrlässiges Verhalten verursacht werden, wird nicht ausgeschlossen.
            </p>
            <p>
              Ebenso bleiben zwingende gesetzliche Haftungsansprüche, insbesondere aus dem Produktehaftpflichtrecht, vorbehalten.
            </p>
            <p>
              Für Schäden, die ausschliesslich auf unsachgemässe Verwendung, Lagerung oder Handhabung der Produkte durch die Kundschaft zurückzuführen sind, übernimmtfruit-comestible keine Haftung, soweit gesetzlich zulässig.
            </p>
          </section>

          <section id="datenschutz" className="scroll-mt-24 space-y-3 pt-6 border-t border-stone-100">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
              14. Datenschutz
            </h2>
            <p>
              Der Schutz personenbezogener Daten istfruit-comestible wichtig.
            </p>
            <p>
              Personenbezogene Daten werden im Rahmen der geltenden Datenschutzgesetzgebung, insbesondere des Schweizer Datenschutzgesetzes (DSG), bearbeitet.
            </p>
            <p>
              Informationen über die Erhebung, Verwendung, Speicherung und Weitergabe personenbezogener Daten sowie über die Rechte betroffener Personen sind in der separaten{' '}
              <Link href="/datenschutz" className="text-[#6c943e] hover:underline font-medium">
                Datenschutzerklärung
              </Link>{' '}
              auf www.fruit-comestible.ch enthalten.
            </p>
          </section>

          <section id="aenderungen" className="scroll-mt-24 space-y-3 pt-6 border-t border-stone-100">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
              15. Änderungen der AGB
            </h2>
            <p>
             fruit-comestible behält sich vor, diese Allgemeinen Geschäftsbedingungen jederzeit anzupassen.
            </p>
            <p>
              Für eine Bestellung gelten jeweils die AGB, die zum Zeitpunkt des Vertragsabschlusses gültig waren.
            </p>
            <p>
              Änderungen der AGB haben keine rückwirkende Wirkung auf bereits abgeschlossene Kaufverträge, sofern nicht ausdrücklich und wirksam etwas anderes vereinbart wurde.
            </p>
          </section>

          <section id="gerichtsstand" className="scroll-mt-24 space-y-3 pt-6 border-t border-stone-100">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
              16. Anwendbares Recht und Gerichtsstand
            </h2>
            <p>Es gilt ausschliesslich schweizerisches Recht.</p>
            <p>
              Für Streitigkeiten aus Vertragsverhältnissen mitfruit-comestible gelten die gesetzlichen Gerichtsstandsbestimmungen.
            </p>
            <p>
              Bei Konsumentenverträgen bleiben insbesondere die zwingenden Gerichtsstände gemäss Schweizer Zivilprozessordnung vorbehalten.
            </p>
            <p>
              Soweit eine Gerichtsstandsvereinbarung rechtlich zulässig ist, wird Schaffhausen als Gerichtsstand vereinbart.
            </p>
          </section>
        </div>

        {/* Footer Links */}
        <footer className="print:hidden pt-6 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm">
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/datenschutz" className="text-[#6c943e] hover:underline font-medium">
              Zur Datenschutzerklärung
            </Link>
            <Link href="/impressum" className="text-[#6c943e] hover:underline font-medium">
              Zum Impressum
            </Link>
          </div>
          <Link href="/shop" className="text-stone-600 hover:text-stone-900 hover:underline">
            Zurück zum Shop
          </Link>
        </footer>
      </main>
    </div>
  );
}
