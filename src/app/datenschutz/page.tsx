import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import PrintButton from '@/components/PrintButton';

export const metadata: Metadata = {
  title: 'Datenschutzerklärung',
  description:
    'Datenschutzerklärung von Fruit-Comestible (www.fruit-comestible.ch), Stand: 15. November 2026. Bearbeitung von Personendaten gemäss Schweizer Datenschutzgesetz (DSG).',
  alternates: {
    canonical: 'https://www.fruit-comestible.ch/datenschutz',
  },
  openGraph: {
    title: 'Datenschutzerklärung | Fruit-Comestible Schweiz',
    description:
      'Datenschutzerklärung von Fruit-Comestible, Sandackerstrasse 2, 8200 Schaffhausen, Schweiz.',
    url: 'https://www.fruit-comestible.ch/datenschutz',
    siteName: 'Fruit-Comestible',
    locale: 'de_CH',
    type: 'website',
  },
};

export default function DatenschutzPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen py-16 px-4 print:bg-white print:py-0 print:px-0">
      <div className="max-w-3xl mx-auto mb-6 print:hidden">
        <Breadcrumbs customItems={[{ label: 'Datenschutzerklärung' }]} />
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
            Datenschutzerklärung
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
            <a href="#verantwortliche-stelle" className="hover:text-stone-900 hover:underline">1. Verantwortliche Stelle</a>
            <a href="#geltungsbereich" className="hover:text-stone-900 hover:underline">2. Geltungsbereich und gesetzliche Grundlagen</a>
            <a href="#erhebung-verwendung" className="hover:text-stone-900 hover:underline">3. Erhebung und Verwendung von Personendaten</a>
            <a href="#hosting" className="hover:text-stone-900 hover:underline">4. Hosting und technische Daten</a>
            <a href="#bestellungen-konten" className="hover:text-stone-900 hover:underline">5. Bestellungen und Kundenkonten</a>
            <a href="#payrexx" className="hover:text-stone-900 hover:underline">6. Zahlungsabwicklung mit Payrexx</a>
            <a href="#mailchimp" className="hover:text-stone-900 hover:underline">7. Newsletter mit Mailchimp</a>
            <a href="#cookies" className="hover:text-stone-900 hover:underline">8. Cookies</a>
            <a href="#weitergabe" className="hover:text-stone-900 hover:underline">9. Weitergabe von Personendaten</a>
            <a href="#ausland" className="hover:text-stone-900 hover:underline">10. Bekanntgabe von Daten ins Ausland</a>
            <a href="#aufbewahrung" className="hover:text-stone-900 hover:underline">11. Aufbewahrung und Löschung von Daten</a>
            <a href="#datensicherheit" className="hover:text-stone-900 hover:underline">12. Datensicherheit</a>
            <a href="#ihre-rechte" className="hover:text-stone-900 hover:underline">13. Ihre Rechte</a>
            <a href="#aenderungen" className="hover:text-stone-900 hover:underline">14. Änderungen dieser Datenschutzerklärung</a>
          </div>
        </nav>

        {/* Sections 1 - 14 */}
        <div className="space-y-8 text-sm sm:text-[15px]">
          <section id="verantwortliche-stelle" className="scroll-mt-24 space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
              1. Verantwortliche Stelle
            </h2>
            <p>
              Der Schutz Ihrer persönlichen Daten ist uns wichtig. Mit dieser Datenschutzerklärung informieren wir Sie darüber, welche Personendaten wir erheben, zu welchen Zwecken wir diese bearbeiten und welche Rechte Ihnen zustehen.
            </p>
            <p>Verantwortlich für die Bearbeitung Ihrer Personendaten ist:</p>
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
              <p>Website: www.fruit-comestible.ch</p>
            </address>
            <p>
              Bei Fragen zum Datenschutz können Sie uns jederzeit per E-Mail kontaktieren.
            </p>
          </section>

          <section id="geltungsbereich" className="scroll-mt-24 space-y-3 pt-6 border-t border-stone-100">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
              2. Geltungsbereich und gesetzliche Grundlagen
            </h2>
            <p>
              Diese Datenschutzerklärung gilt für die Nutzung unserer Website www.fruit-comestible.ch, unseren Online-Shop sowie die damit verbundenen Dienstleistungen.
            </p>
            <p>
              Wir bearbeiten Personendaten im Einklang mit dem Schweizer Datenschutzgesetz (DSG) und den weiteren anwendbaren gesetzlichen Bestimmungen.
            </p>
            <p>
              Unser Online-Shop richtet sich an Kundinnen und Kunden mit Lieferadresse in der Schweiz. Lieferungen ins Ausland werden nicht angeboten.
            </p>
          </section>

          <section id="erhebung-verwendung" className="scroll-mt-24 space-y-3 pt-6 border-t border-stone-100">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
              3. Erhebung und Verwendung von Personendaten
            </h2>
            <p>
              Wir erheben und bearbeiten Personendaten, soweit dies für den Betrieb unseres Online-Shops, die Abwicklung von Bestellungen und die Kommunikation mit unserer Kundschaft erforderlich ist.
            </p>
            <p>Dazu können insbesondere folgende Angaben gehören:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Vor- und Nachname</li>
              <li>Rechnungs- und Lieferadresse</li>
              <li>E-Mail-Adresse</li>
              <li>Telefonnummer, sofern angegeben</li>
              <li>Angaben zu bestellten Produkten</li>
              <li>Bestell- und Zahlungsinformationen</li>
              <li>Korrespondenz und Kundenanfragen</li>
              <li>Technische Daten bei der Nutzung unserer Website</li>
            </ul>
            <p>
              Wir verwenden diese Daten insbesondere zur Bearbeitung von Bestellungen, zur Lieferung unserer Produkte, zur Zahlungsabwicklung, zur Kundenbetreuung sowie zur Erfüllung gesetzlicher Verpflichtungen.
            </p>
            <p>
              Eine Verwendung Ihrer Kontaktdaten für unseren Newsletter erfolgt nur, wenn Sie sich dafür angemeldet haben.
            </p>
          </section>

          <section id="hosting" className="scroll-mt-24 space-y-3 pt-6 border-t border-stone-100">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
              4. Hosting und technische Daten
            </h2>
            <p>
              Unser Online-Shop wird beim Hostinganbieter Hostec in der Schweiz betrieben.
            </p>
            <p>
              Beim Besuch unserer Website können automatisch technische Informationen erfasst und in Serverprotokollen gespeichert werden.
            </p>
            <p>Dazu gehören beispielsweise:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>IP-Adresse</li>
              <li>Datum und Uhrzeit des Zugriffs</li>
              <li>Aufgerufene Seiten und Dateien</li>
              <li>Browsertyp und Betriebssystem</li>
              <li>Technische Verbindungsinformationen</li>
              <li>Fehlermeldungen und Serverprotokolle</li>
            </ul>
            <p>
              Diese Informationen dienen dazu, den sicheren und zuverlässigen Betrieb unserer Website zu gewährleisten, technische Probleme zu erkennen und die Sicherheit unserer Systeme zu verbessern.
            </p>
            <p>
              Im Rahmen der technischen Betreuung kann Hostec Zugriff auf Personendaten erhalten, soweit dies zur Erbringung der Hostingdienstleistungen erforderlich ist.
            </p>
          </section>

          <section id="bestellungen-konten" className="scroll-mt-24 space-y-3 pt-6 border-t border-stone-100">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
              5. Bestellungen und Kundenkonten
            </h2>
            <p>
              Wenn Sie in unserem Online-Shop eine Bestellung aufgeben, bearbeiten wir die für die Vertragsabwicklung erforderlichen Personendaten.
            </p>
            <p>
              Dazu gehören insbesondere Ihre Kontaktdaten, die Rechnungs- und Lieferadresse sowie Informationen über die bestellten Produkte.
            </p>
            <p>Wir verwenden diese Angaben für:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Die Bearbeitung und Bestätigung Ihrer Bestellung</li>
              <li>Die Vorbereitung und den Versand Ihrer Produkte</li>
              <li>Die Abwicklung der Bezahlung</li>
              <li>Die Bearbeitung von Rückfragen und Reklamationen</li>
              <li>Die Erfüllung gesetzlicher Aufbewahrungspflichten</li>
            </ul>
            <p>
              Sofern unser Online-Shop die Einrichtung eines Kundenkontos ermöglicht, werden die dafür erforderlichen Daten zur Verwaltung des Kontos bearbeitet.
            </p>
          </section>

          <section id="payrexx" className="scroll-mt-24 space-y-3 pt-6 border-t border-stone-100">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
              6. Zahlungsabwicklung mit Payrexx
            </h2>
            <p>
              Für die sichere Abwicklung elektronischer Zahlungen verwenden wir den Schweizer Zahlungsdienstleister Payrexx AG, Thun, Schweiz.
            </p>
            <p>
              Bei einer elektronischen Zahlung werden die für die Transaktion erforderlichen Informationen an Payrexx beziehungsweise an die beteiligten Zahlungs- und Finanzdienstleister übermittelt.
            </p>
            <p>Dazu können insbesondere gehören:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Name und Kontaktdaten</li>
              <li>Zahlungsbetrag und Währung</li>
              <li>Transaktions- und Bestellinformationen</li>
              <li>Angaben zum gewählten Zahlungsmittel</li>
              <li>Technische Informationen zur Zahlungsabwicklung</li>
            </ul>
            <p>
              Die Bearbeitung dieser Daten erfolgt zur Durchführung der Zahlung, zur Betrugsprävention und zur Erfüllung gesetzlicher Verpflichtungen.
            </p>
            <p>
             fruit-comestible erhält die für die Zuordnung und Bearbeitung der Zahlung notwendigen Transaktionsinformationen. Die Verarbeitung sensibler Zahlungsdaten erfolgt entsprechend den technischen Abläufen der beteiligten Zahlungsdienstleister.
            </p>
            <p>
              Weitere Informationen finden Sie in der Datenschutzerklärung von Payrexx:{' '}
              <a
                href="https://payrexx.com/de/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6c943e] hover:underline break-all"
              >
                https://payrexx.com/de/legal/privacy-policy
              </a>
            </p>
          </section>

          <section id="mailchimp" className="scroll-mt-24 space-y-3 pt-6 border-t border-stone-100">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
              7. Newsletter mit Mailchimp
            </h2>
            <p>
             fruit-comestible versendet gelegentlich Newsletter mit Informationen über neue Produkte, Aktionen, Angebote und Neuigkeiten aus unserem Sortiment.
            </p>
            <p>
              Der Newsletter wird ausschliesslich an Personen versendet, die sich freiwillig dafür angemeldet haben.
            </p>
            <p>
              Für die Anmeldung und den Versand bearbeiten wir insbesondere die E-Mail-Adresse sowie gegebenenfalls den Namen der angemeldeten Person.
            </p>
            <p>
              Für den Newsletterversand verwenden wir Mailchimp, einen Dienst des Unternehmens Intuit.
            </p>
            <p>
              Die hierfür erforderlichen Personendaten werden an Mailchimp übermittelt und können insbesondere in den Vereinigten Staaten von Amerika (USA) bearbeitet werden. Dabei beachten wir die gesetzlichen Anforderungen an die Bekanntgabe von Personendaten ins Ausland.
            </p>
            <p>
              Sofern entsprechende Funktionen aktiviert sind, kann Mailchimp Informationen über die Öffnung von Newslettern und das Anklicken von Links erfassen. Diese Informationen dienen der Auswertung und Verbesserung unserer Newsletter.
            </p>
            <p>
              Eine Abmeldung ist jederzeit kostenlos möglich. Jeder Newsletter enthält einen entsprechenden Abmeldelink. Alternativ kann die Abmeldung per E-Mail an info@fruit-comestible.ch verlangt werden.
            </p>
            <p>
              Nach der Abmeldung wird die E-Mail-Adresse aus der aktiven Versandliste entfernt. Soweit erforderlich, können minimale Informationen zur Dokumentation der Abmeldung aufbewahrt werden, um einen erneuten unerwünschten Versand zu verhindern.
            </p>
            <p>
              Weitere Informationen zum Datenschutz bei Mailchimp finden Sie unter:{' '}
              <a
                href="https://mailchimp.com/legal/privacy/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6c943e] hover:underline break-all"
              >
                https://mailchimp.com/legal/privacy/
              </a>
            </p>
          </section>

          <section id="cookies" className="scroll-mt-24 space-y-3 pt-6 border-t border-stone-100">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
              8. Cookies
            </h2>
            <p>
              Unser Online-Shop kann Cookies und vergleichbare Technologien verwenden.
            </p>
            <p>
              Cookies sind kleine Dateien, die auf Ihrem Endgerät gespeichert werden und bestimmte Funktionen der Website ermöglichen.
            </p>
            <p>
              Technisch notwendige Cookies können insbesondere für folgende Zwecke eingesetzt werden:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Die Warenkorbfunktion</li>
              <li>Die Verwaltung einer Sitzung</li>
              <li>Die sichere Abwicklung des Bestellvorgangs</li>
              <li>Die Speicherung technisch erforderlicher Einstellungen</li>
            </ul>
            <p>
              Sie können Cookies über die Einstellungen Ihres Browsers einschränken oder löschen.
            </p>
            <p>
              Wenn technisch notwendige Cookies deaktiviert werden, können einzelne Funktionen unseres Online-Shops eingeschränkt sein.
            </p>
            <p>
              Sollten zusätzliche, nicht notwendige Analyse- oder Marketingtechnologien eingesetzt werden, informieren wir darüber und holen erforderliche Einwilligungen ein.
            </p>
          </section>

          <section id="weitergabe" className="scroll-mt-24 space-y-3 pt-6 border-t border-stone-100">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
              9. Weitergabe von Personendaten
            </h2>
            <p>Wir verkaufen keine Kundendaten an Dritte.</p>
            <p>
              Personendaten werden nur weitergegeben, soweit dies für die beschriebenen Zwecke erforderlich oder gesetzlich zulässig ist.
            </p>
            <p>Dazu gehören insbesondere folgende Empfänger:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Hostec als Hostingdienstleister</li>
              <li>Payrexx und beteiligte Zahlungsdienstleister zur Zahlungsabwicklung</li>
              <li>Mailchimp für den Newsletterversand</li>
              <li>Versand- und Transportdienstleister zur Zustellung von Bestellungen</li>
              <li>Behörden, soweit eine gesetzliche Verpflichtung besteht</li>
            </ul>
            <p>
              Unsere Dienstleister erhalten nur diejenigen Daten, die für ihre jeweilige Aufgabe erforderlich sind. Wir achten auf die Einhaltung der anwendbaren Datenschutzanforderungen.
            </p>
          </section>

          <section id="ausland" className="scroll-mt-24 space-y-3 pt-6 border-t border-stone-100">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
              10. Bekanntgabe von Daten ins Ausland
            </h2>
            <p>Unser Online-Shop wird in der Schweiz gehostet.</p>
            <p>
              Bei der Nutzung externer Dienstleistungen, insbesondere Mailchimp, können Personendaten ins Ausland übermittelt werden. Dies betrifft insbesondere die USA.
            </p>
            <p>
              Wir achten darauf, dass solche Datenübermittlungen nur unter Einhaltung der gesetzlichen Voraussetzungen erfolgen.
            </p>
            <p>
              Soweit erforderlich, werden geeignete Datenschutzgarantien verwendet, beispielsweise anerkannte Standarddatenschutzklauseln oder andere gesetzlich vorgesehene Schutzmechanismen.
            </p>
            <p>
              Weitere Informationen über konkrete Datenübermittlungen und Schutzmassnahmen können unter info@fruit-comestible.ch angefragt werden.
            </p>
          </section>

          <section id="aufbewahrung" className="scroll-mt-24 space-y-3 pt-6 border-t border-stone-100">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
              11. Aufbewahrung und Löschung von Daten
            </h2>
            <p>
              Wir speichern Personendaten nur so lange, wie dies für die jeweiligen Bearbeitungszwecke erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen.
            </p>
            <p>
              Geschäftsunterlagen, Buchungsbelege und weitere aufbewahrungspflichtige Dokumente werden grundsätzlich während der gesetzlich vorgeschriebenen Dauer von zehn Jahren aufbewahrt.
            </p>
            <p>
              Newsletterdaten werden grundsätzlich bis zur Abmeldung beziehungsweise bis zum Wegfall des Bearbeitungszwecks gespeichert, soweit keine anderweitigen gesetzlichen Gründe eine Löschung erfordern.
            </p>
            <p>
              Nicht mehr benötigte Personendaten werden gelöscht oder anonymisiert, soweit keine gesetzlichen Verpflichtungen oder berechtigten Gründe einer Löschung entgegenstehen.
            </p>
          </section>

          <section id="datensicherheit" className="scroll-mt-24 space-y-3 pt-6 border-t border-stone-100">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
              12. Datensicherheit
            </h2>
            <p>
              Wir treffen angemessene technische und organisatorische Massnahmen, um Ihre Personendaten vor unbefugtem Zugriff, Verlust, Missbrauch oder unzulässiger Bearbeitung zu schützen.
            </p>
            <p>
              Dazu gehören insbesondere geeignete Zugriffsberechtigungen, Sicherheitsmassnahmen beim Hosting und eine verschlüsselte Übertragung von Daten.
            </p>
            <p>
              Trotz sorgfältiger Sicherheitsmassnahmen kann bei der Datenübertragung über das Internet keine absolute Sicherheit gewährleistet werden.
            </p>
          </section>

          <section id="ihre-rechte" className="scroll-mt-24 space-y-3 pt-6 border-t border-stone-100">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
              13. Ihre Rechte
            </h2>
            <p>
              Im Rahmen des anwendbaren Datenschutzrechts haben Sie insbesondere das Recht:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Auskunft über Ihre bearbeiteten Personendaten zu verlangen</li>
              <li>Unrichtige Personendaten berichtigen zu lassen</li>
              <li>Die Löschung von Personendaten zu verlangen, soweit die gesetzlichen Voraussetzungen erfüllt sind</li>
              <li>Einer bestimmten Datenbearbeitung zu widersprechen</li>
              <li>Eine erteilte Einwilligung mit Wirkung für die Zukunft zu widerrufen</li>
              <li>Unter den gesetzlichen Voraussetzungen die Herausgabe oder Übertragung Ihrer Personendaten zu verlangen</li>
            </ul>
            <p>
              Zur Ausübung Ihrer Rechte können Sie uns kontaktieren:{' '}
              <a
                href="mailto:info@fruit-comestible.ch"
                className="text-[#6c943e] hover:underline font-medium"
              >
                info@fruit-comestible.ch
              </a>
            </p>
            <p>
              Zum Schutz Ihrer Daten können wir bei Bedarf einen angemessenen Identitätsnachweis verlangen.
            </p>
            <p>
              Bei datenschutzrechtlichen Anliegen können Sie sich auch an den Eidgenössischen Datenschutz- und Öffentlichkeitsbeauftragten (EDÖB) wenden.
            </p>
          </section>

          <section id="aenderungen" className="scroll-mt-24 space-y-3 pt-6 border-t border-stone-100">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
              14. Änderungen dieser Datenschutzerklärung
            </h2>
            <p>
              Wir behalten uns vor, diese Datenschutzerklärung anzupassen, wenn sich gesetzliche Anforderungen, technische Abläufe oder unsere Dienstleistungen ändern.
            </p>
            <p>
              Die jeweils aktuelle Fassung wird auf unserer Website veröffentlicht.
            </p>
          </section>
        </div>

        {/* Footer Links */}
        <footer className="print:hidden pt-6 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm">
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/agb" className="text-[#6c943e] hover:underline font-medium">
              Zu den AGB
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
