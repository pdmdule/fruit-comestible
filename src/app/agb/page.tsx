import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  FileText,
  ShieldCheck,
  Scale,
  Lock,
  Mail,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Server,
  UserCheck,
  ShoppingCart,
  Share2,
  Globe2,
  Cookie,
  Activity,
  BarChart3,
  HelpCircle,
  Clock,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'AGB & Datenschutz | fruit-Comestible Schweiz',
  description:
    'Allgemeine Geschäftsbedingungen (AGB) und Datenschutzerklärung von fruit-comestible.ch. Transparente Bedingungen, Schweizer Recht und sichere Datenverarbeitung nach DSG & DSGVO.',
  alternates: {
    canonical: 'https://fruit-comestible.ch/agb',
  },
  openGraph: {
    title: 'AGB & Datenschutz | fruit-Comestible Schweiz',
    description:
      'Allgemeine Geschäftsbedingungen und Datenschutzerklärung von fruit-comestible.ch.',
    url: 'https://fruit-comestible.ch/agb',
    siteName: 'fruit-Comestible Schweiz',
    locale: 'de_CH',
    type: 'website',
  },
};

export default function AgbPage() {
  const tableOfContentsAgb = [
    { id: 'geltung', num: '1', title: 'Geltung der Bedingungen' },
    { id: 'angebot', num: '2', title: 'Angebot und Vertragsschluss' },
    { id: 'preise', num: '3', title: 'Preise' },
    { id: 'lieferzeit', num: '4', title: 'Liefer- und Leistungszeit' },
    { id: 'annahmeverzug', num: '5', title: 'Annahmeverzug' },
    { id: 'lieferung', num: '6', title: 'Lieferung & Beanstandungen' },
    { id: 'gefahrenuebergang', num: '7', title: 'Gefahrenübergang' },
    { id: 'gewaehrleistung', num: '8', title: 'Gewährleistung' },
    { id: 'retouren', num: '9', title: 'Retouren' },
    { id: 'eigentumsvorbehalt', num: '10', title: 'Eigentumsvorbehalt' },
    { id: 'zahlung', num: '11', title: 'Zahlung' },
    { id: 'haftung', num: '14', title: 'Haftungsbeschränkung' },
    { id: 'gerichtsstand', num: '17', title: 'Gerichtsstand & Anwendbares Recht' },
  ];

  const tableOfContentsPrivacy = [
    { id: 'datenschutz', num: '15', title: 'Datenschutz & Verantwortliche Stelle' },
    { id: 'aufruf-website', num: '15.1', title: 'Aufruf unserer Website (Logfiles)' },
    { id: 'kundenkonto', num: '15.2', title: 'Eröffnung eines Kundenkontos' },
    { id: 'einkauf-onlineshop', num: '15.3', title: 'Einkauf im Onlineshop' },
    { id: 'weitergabe-dritte', num: '15.4', title: 'Weitergabe der Daten an Dritte' },
    { id: 'uebermittlung-ausland', num: '15.5', title: 'Übermittlung von Daten ins Ausland' },
    { id: 'cookies', num: '15.6', title: 'Einsatz von Cookies' },
    { id: 'tracking', num: '15.7', title: 'Tracking (Ads & Pixel)' },
    { id: 'web-analytics', num: '15.8', title: 'Web Analytics (Google & Mailchimp)' },
    { id: 'trusted-shops', num: '15.9', title: 'Trusted Shops Trustbadge' },
    { id: 'usa-uebermittlung', num: '15.10', title: 'Datenübermittlung in die USA' },
    { id: 'betroffenenrechte', num: '15.11', title: 'Ihre Rechte (Auskunft, Löschung)' },
    { id: 'datensicherheit', num: '15.12', title: 'Datensicherheit' },
    { id: 'aufbewahrung', num: '15.13', title: 'Aufbewahrungsfristen' },
    { id: 'beschwerderecht', num: '15.14', title: 'Recht auf Beschwerde' },
  ];

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans antialiased selection:bg-rose-100 selection:text-rose-900">
      {/* Top Breadcrumb Header Bar */}
      <div className="border-b border-stone-200/80 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between text-xs">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-semibold text-stone-500 hover:text-stone-900 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Zurück zur Startseite</span>
          </Link>
          <div className="flex items-center gap-2 text-stone-500">
            <span>🇨🇭 Schweiz</span>
            <span>•</span>
            <span className="font-medium text-stone-800">Rechtliche Hinweise</span>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
        {/* Main Document Title */}
        <header className="space-y-4 border-b border-stone-200 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-800 border border-rose-200/80">
            <Scale className="w-3.5 h-3.5 text-rose-600" />
            <span>Rechtssicherheit & Transparenz</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-stone-900 leading-tight">
            Allgemeine Geschäftsbedingungen (AGB) &amp; Datenschutzerklärung
          </h1>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-stone-600">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-stone-400" />
              <span>Stand: <strong>September 2026</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-rose-600" />
              <span>Kontakt: </span>
              <a
                href="mailto:info@fruit-comestible.ch"
                className="font-bold text-rose-700 hover:underline inline-flex items-center gap-1"
              >
                info@fruit-comestible.ch
              </a>
            </div>
            <div className="flex items-center gap-1.5 text-stone-500">
              <span>Betreiber: <strong>Lukas Pem</strong></span>
            </div>
          </div>

          {/* Quick Notice Box */}
          <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs text-xs sm:text-sm text-stone-600 space-y-2">
            <div className="flex items-center gap-2 font-bold text-stone-900">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Gültig für alle Einkäufe und die Nutzung von fruit-comestible.ch</span>
            </div>
            <p className="leading-relaxed">
              Willkommen bei Fruit Comestible. Nachfolgend finden Sie unsere Allgemeinen
              Geschäftsbedingungen sowie die ausführliche Datenschutzerklärung nach
              schweizerischem Datenschutzgesetz (DSG) und der europäischen
              Datenschutz-Grundverordnung (EU-DSGVO).
            </p>
          </div>
        </header>

        {/* Interactive Table of Contents (Schnellnavigation) */}
        <section aria-labelledby="toc-heading" className="space-y-4">
          <h2 id="toc-heading" className="text-sm font-bold uppercase tracking-wider text-stone-500">
            Inhaltsübersicht (Schnellnavigation)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Column A: AGB */}
            <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
                <FileText className="w-4 h-4 text-rose-700" />
                <h3 className="font-bold text-sm text-stone-900">
                  Teil 1: Allgemeine Geschäftsbedingungen
                </h3>
              </div>
              <ul className="space-y-1.5 text-xs text-stone-600">
                {tableOfContentsAgb.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="hover:text-rose-700 hover:underline flex items-baseline gap-2 py-0.5"
                    >
                      <span className="font-bold text-stone-400 w-4 text-right">
                        {item.num}.
                      </span>
                      <span>{item.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column B: Datenschutz */}
            <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
                <Lock className="w-4 h-4 text-emerald-700" />
                <h3 className="font-bold text-sm text-stone-900">
                  Teil 2: Datenschutzerklärung
                </h3>
              </div>
              <ul className="space-y-1.5 text-xs text-stone-600">
                {tableOfContentsPrivacy.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="hover:text-emerald-700 hover:underline flex items-baseline gap-2 py-0.5"
                    >
                      <span className="font-bold text-stone-400 w-7 text-right">
                        {item.num}
                      </span>
                      <span className="truncate">{item.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* TEIL 1: ALLGEMEINE GESCHÄFTSBEDINGUNGEN */}
        {/* ========================================================================= */}
        <section aria-labelledby="agb-heading" className="space-y-8 pt-6">
          <div className="flex items-center gap-3 pb-3 border-b-2 border-rose-600">
            <Scale className="w-6 h-6 text-rose-600 shrink-0" />
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
                Teil 1
              </span>
              <h2 id="agb-heading" className="text-2xl sm:text-3xl font-black text-stone-900">
                Allgemeine Geschäftsbedingungen
              </h2>
            </div>
          </div>

          <div className="space-y-8">
            {/* 1 Geltung der Bedingungen */}
            <article id="geltung" className="p-6 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-3 scroll-mt-20">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-xl bg-stone-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  1
                </span>
                <h3 className="text-lg font-bold text-stone-900">
                  Geltung der Bedingungen
                </h3>
              </div>
              <p className="text-sm text-stone-700 leading-relaxed">
                Die Lieferungen, Leistungen und Angebote von fruit-comestible.ch erfolgen
                ausschliesslich aufgrund dieser Geschäftsbedingungen, auch wenn sie nicht nochmals
                ausdrücklich vereinbart werden. Mit Bestellung der Ware oder Leistung gelten diese
                Bedingungen als angenommen. Allgemeinen Einkaufsbedingungen des Käufers wird hiermit
                widersprochen. Abweichungen von diesen Geschäftsbedingungen sind nur wirksam, wenn wir
                sie schriftlich bestätigen.
              </p>
            </article>

            {/* 2 Angebot und Vertragsschluss */}
            <article id="angebot" className="p-6 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-3 scroll-mt-20">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-xl bg-stone-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  2
                </span>
                <h3 className="text-lg font-bold text-stone-900">
                  Angebot und Vertragsschluss
                </h3>
              </div>
              <div className="text-sm text-stone-700 leading-relaxed space-y-2.5">
                <p>
                  Die Angebote der FRUIT-COMESTIBLE.CH in Preislisten und Inseraten sind freibleibend
                  und unverbindlich. Bestellungen sind für die FRUIT-COMESTIBLE.CH erst nach
                  schriftlicher Bestätigung verbindlich. Angebote wie geprüfte Retoure und Ausverkauf
                  sind von der Verbindlichkeit der Verfügbarkeit ausgeschlossen.
                </p>
                <p>
                  Die Angaben in unseren Verkaufsunterlagen (Zeichnungen, Abbildungen, Masse,
                  Gewichte und sonstige Leistungen) sind nur als Richtwerte zu verstehen und stellen
                  keine Zusicherung von Eigenschaften dar, es sei denn, sie werden schriftlich
                  ausdrücklich als verbindlich bezeichnet.
                </p>
                <p>
                  Überschreitet ein Käufer durch eine Bestellung sein Kreditlimit, so sind wir von
                  unserer Lieferverpflichtung entbunden.
                </p>
              </div>
            </article>

            {/* 3 Preise */}
            <article id="preise" className="p-6 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-3 scroll-mt-20">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-xl bg-stone-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  3
                </span>
                <h3 className="text-lg font-bold text-stone-900">
                  Preise
                </h3>
              </div>
              <p className="text-sm text-stone-700 leading-relaxed">
                Massgebend sind die in unserer Auftragsbestätigung genannten Preise. Diese werden für
                Lagerware zum Zeitpunkt der Bestellung fixiert. Bei Lieferengpässen sowie
                Besorgungen gilt der Tagespreis am Bestelltag. Die Preise verstehen sich, falls nicht
                anders vereinbart, zuzüglich Transportkosten, inklusive der gesetzlichen
                Mehrwertsteuer. Die aktuellen Preise sind im Online-Shop publiziert, Preisänderungen
                und Fehler vorbehalten.
              </p>
            </article>

            {/* 4 Liefer- und Leistungszeit */}
            <article id="lieferzeit" className="p-6 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-3 scroll-mt-20">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-xl bg-stone-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  4
                </span>
                <h3 className="text-lg font-bold text-stone-900">
                  Liefer- und Leistungszeit
                </h3>
              </div>
              <p className="text-sm text-stone-700 leading-relaxed">
                Termine und Lieferfristen sind unverbindlich, sofern nicht ausdrücklich schriftlich
                etwas anderes vereinbart wurde. Die Angabe bestimmter Lieferfristen und Liefertermine
                durch die FRUIT-COMESTIBLE.CH steht unter dem Vorbehalt der richtigen und rechtzeitigen
                Belieferung der FRUIT-COMESTIBLE.CH durch Zulieferanten und Hersteller.
              </p>
            </article>

            {/* 5 Annahmeverzug */}
            <article id="annahmeverzug" className="p-6 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-3 scroll-mt-20">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-xl bg-stone-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  5
                </span>
                <h3 className="text-lg font-bold text-stone-900">
                  Annahmeverzug
                </h3>
              </div>
              <p className="text-sm text-stone-700 leading-relaxed">
                Wenn der Käufer nach Ablauf einer ihm gesetzten Nachfrist die Annahme der
                Liefergegenstände verweigert oder erklärt, die Ware nicht abnehmen zu wollen, kann die
                FRUIT-COMESTIBLE.CH die Erfüllung des Vertrages verweigern und Schadensersatz wegen
                Nichterfüllung verlangen. FRUIT-COMESTIBLE.CH ist berechtigt, als Schadensersatz
                wahlweise entweder pauschal 25 % des vereinbarten Kaufpreises oder den Ersatz des
                effektiv entstandenen Schadens vom Käufer zu fordern.
              </p>
            </article>

            {/* 6 Lieferung */}
            <article id="lieferung" className="p-6 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-3 scroll-mt-20">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-xl bg-stone-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  6
                </span>
                <h3 className="text-lg font-bold text-stone-900">
                  Lieferung &amp; Mängelrüge
                </h3>
              </div>
              <p className="text-sm text-stone-700 leading-relaxed">
                Bei Lieferung und Montage muss die Zugänglichkeit für die Ware durch den Kunden
                gewährleistet werden. Sichtbare Mengendifferenzen müssen sofort bei Warenerhalt,
                verdeckte Mengendifferenzen innerhalb von 4 Tagen nach Warenerhalt der
                FRUIT-COMESTIBLE.CH und dem Frachtführer schriftlich angezeigt werden. Beanstandungen
                betreffend Beschädigung, Verspätung, Verlust oder schlechter Verpackung sind sofort
                nach Eingang der Warensendung anzumelden.
              </p>
            </article>

            {/* 7 Gefahrenübergang */}
            <article id="gefahrenuebergang" className="p-6 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-3 scroll-mt-20">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-xl bg-stone-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  7
                </span>
                <h3 className="text-lg font-bold text-stone-900">
                  Gefahrenübergang
                </h3>
              </div>
              <p className="text-sm text-stone-700 leading-relaxed">
                Die Gefahr geht auf den Käufer über, sobald die Sendung an die den Transport
                ausführende Person übergeben worden ist. Falls der Versand sich ohne unser Verschulden
                verzögert oder unmöglich wird, geht die Gefahr mit der Meldung der Versandbereitschaft
                auf den Käufer über. Eine im Einzelfall vereinbarte Übernahme der Transportkosten
                durch die FRUIT-COMESTIBLE.CH hat keinen Einfluss auf den Gefahrenübergang.
              </p>
            </article>

            {/* 8 Gewährleistung */}
            <article id="gewaehrleistung" className="p-6 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-3 scroll-mt-20">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-xl bg-stone-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  8
                </span>
                <h3 className="text-lg font-bold text-stone-900">
                  Gewährleistung
                </h3>
              </div>
              <p className="text-sm text-stone-700 leading-relaxed">
                Unwesentliche Abweichungen von zugesicherten Eigenschaften der Ware lösen keine
                Gewährleistungsrechte aus. Gewährleistungsansprüche gegen FRUIT-COMESTIBLE.CH stehen
                nur dem unmittelbaren Käufer zu und sind nicht abtretbar.
              </p>
            </article>

            {/* 9 Retouren */}
            <article id="retouren" className="p-6 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-3 scroll-mt-20">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-xl bg-stone-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  9
                </span>
                <h3 className="text-lg font-bold text-stone-900">
                  Retouren
                </h3>
              </div>
              <p className="text-sm text-stone-700 leading-relaxed">
                Eine Rücksendung von Produkten durch den Kunden bedarf der vorherigen Zustimmung von
                FRUIT-COMESTIBLE.CH und erfolgt auf Kosten und Risiko des Kunden. Die Rücksendung der
                Produkte hat originalverpackt sowie unter Beilage einer detaillierten
                Fehler-/Mängelbeschreibung sowie einer Retouren-Nummer zu erfolgen.
              </p>
            </article>

            {/* 10 Eigentumsvorbehalt */}
            <article id="eigentumsvorbehalt" className="p-6 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-3 scroll-mt-20">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-xl bg-stone-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  10
                </span>
                <h3 className="text-lg font-bold text-stone-900">
                  Eigentumsvorbehalt
                </h3>
              </div>
              <p className="text-sm text-stone-700 leading-relaxed">
                Die gelieferte Ware bleibt bis zur vollständigen Bezahlung Eigentum der
                FRUIT-COMESTIBLE.CH. Die Rechnungen sind je nach Vereinbarung per Nachnahme, bar oder
                innert 10 Tagen rein netto zahlbar, soweit nicht anders vereinbart. Die Lieferung
                erfolgt grundsätzlich unfrei, d.h. zu Lasten des Käufers per Paketpost, Spedition
                oder eigenem Fahrzeug, ausser es wurde ausdrücklich etwas anderes vereinbart. Eine
                Zahlung gilt erst dann als erfolgt, wenn wir über den Betrag verfügen können. Gerät der
                Käufer in Verzug, so sind wir berechtigt, von dem betreffenden Zeitpunkt ab Zinsen in
                Höhe von 5 % zu berechnen. Während der Dauer des Verzuges ist die FRUIT-COMESTIBLE.CH
                auch jederzeit berechtigt, vom Vertrag zurückzutreten, die gelieferte Ware
                zurückzuverlangen und Schadensersatz auf das Dahinfallen des Vertrages zu fordern.
                Alle Forderungen werden sofort fällig, wenn der Abnehmer in Zahlungsverzug gerät,
                sonstige wesentliche Verpflichtungen aus dem Vertrag schuldhaft nicht einhält oder wenn
                uns Umstände bekannt werden, die geeignet sind, die Kreditwürdigkeit des Abnehmers zu
                mindern, insbesondere Zahlungseinstellung, Anhängigkeit eines Vergleichs- oder
                Konkursverfahrens. In diesen Fällen sind wir berechtigt, noch ausstehende Lieferungen
                zurückzubehalten oder nur gegen Vorauszahlung oder Sicherheiten auszuführen.
              </p>
            </article>

            {/* 11 Zahlung */}
            <article id="zahlung" className="p-6 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-3 scroll-mt-20">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-xl bg-stone-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  11
                </span>
                <h3 className="text-lg font-bold text-stone-900">
                  Zahlung &amp; Zahlungsverzug
                </h3>
              </div>
              <p className="text-sm text-stone-700 leading-relaxed">
                Die Rechnungen sind je nach Vereinbarung per Nachnahme, bar oder innert 10 Tagen rein
                netto zahlbar, soweit nicht anders vereinbart. Die Lieferung erfolgt grundsätzlich
                unfrei, d.h. zu Lasten des Käufers per Paketpost, Spedition oder eigenem Fahrzeug,
                ausser es wurde ausdrücklich etwas anderes vereinbart. Eine Zahlung gilt erst dann als
                erfolgt, wenn wir über den Betrag verfügen können. Gerät der Käufer in Verzug, so sind
                wir berechtigt, von dem betreffenden Zeitpunkt ab Zinsen in Höhe von 5 % zu berechnen.
                Während der Dauer des Verzuges ist die FRUIT-COMESTIBLE.CH auch jederzeit berechtigt,
                vom Vertrag zurückzutreten, die gelieferte Ware zurückzuverlangen und Schadensersatz
                auf das Dahinfallen des Vertrages zu fordern. Alle Forderungen werden sofort fällig,
                wenn der Abnehmer in Zahlungsverzug gerät, sonstige wesentliche Verpflichtungen aus dem
                Vertrag schuldhaft nicht einhält oder wenn uns Umstände bekannt werden, die geeignet
                sind, die Kreditwürdigkeit des Abnehmers zu mindern, insbesondere Zahlungseinstellung,
                Anhängigkeit eines Vergleichs- oder Konkursverfahrens. In diesen Fällen sind wir
                berechtigt, noch ausstehende Lieferungen zurückzubehalten oder nur gegen Vorauszahlung
                oder Sicherheiten auszuführen.
              </p>
            </article>

            {/* 14 Haftungsbeschränkung */}
            <article id="haftung" className="p-6 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-3 scroll-mt-20">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-xl bg-stone-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  14
                </span>
                <h3 className="text-lg font-bold text-stone-900">
                  Haftungsbeschränkung
                </h3>
              </div>
              <p className="text-sm text-stone-700 leading-relaxed">
                Schadensersatzansprüche aus Unmöglichkeit der Leistung, aus Vertragsverletzung, aus
                Verschulden bei Vertragsschluss und aus unerlaubter Handlung, sind sowohl gegen uns, als
                auch gegen unsere Erfüllungs- bzw. Verrichtungsgehilfen ausgeschlossen, soweit nicht
                vorsätzliches oder grob fahrlässiges Handeln vorliegt.
              </p>
            </article>

            {/* 17 Gerichtsstand */}
            <article id="gerichtsstand" className="p-6 rounded-2xl bg-stone-900 text-white shadow-sm space-y-3 scroll-mt-20 border border-stone-800">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-xl bg-rose-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  17
                </span>
                <h3 className="text-lg font-bold text-white">
                  Gerichtsstand &amp; Anwendbares Recht
                </h3>
              </div>
              <p className="text-sm text-stone-200 leading-relaxed">
                <strong>Schaffhausen</strong> ist ausschliesslich Gerichtsstand für alle sich aus dem
                Vertragsverhältnis unmittelbar oder mittelbar ergebenden Streitigkeiten. Das
                Rechtsverhältnis untersteht dem <strong>schweizerischen Recht</strong>.
              </p>
            </article>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* TEIL 2: DATENSCHUTZERKLÄRUNG */}
        {/* ========================================================================= */}
        <section aria-labelledby="datenschutz-heading" className="space-y-8 pt-10 border-t border-stone-200">
          <div className="flex items-center gap-3 pb-3 border-b-2 border-emerald-600">
            <Lock className="w-6 h-6 text-emerald-600 shrink-0" />
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                Teil 2
              </span>
              <h2 id="datenschutz-heading" className="text-2xl sm:text-3xl font-black text-stone-900">
                Datenschutzerklärung
              </h2>
            </div>
          </div>

          <div className="space-y-8">
            {/* 15 Datenschutz - Einleitung */}
            <article id="datenschutz" className="p-6 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-3 scroll-mt-20">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-xl bg-emerald-800 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  15
                </span>
                <h3 className="text-lg font-bold text-stone-900">
                  Datenschutz &amp; Verantwortliche Stelle
                </h3>
              </div>
              <div className="text-sm text-stone-700 leading-relaxed space-y-3">
                <p>
                  Die Datenschutzerklärung ist integrierter Bestandteil dieser AGB. Mit der
                  Akzeptanz dieser AGBs erklären Sie auch diesem Artikel zuzustimmen. Die Regelungen
                  bzgl. Datenschutz sind wie folgt:
                </p>
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/90 space-y-1 text-xs sm:text-sm">
                  <p className="font-bold text-stone-900">
                    Verantwortliche Stelle:
                  </p>
                  <p className="text-stone-700">
                    <strong>Lukas Pem</strong> ist Betreiber/in der Website{' '}
                    <span className="font-mono text-stone-900">www.fruit-comestible.ch</span> und der
                    darauf angebotenen Dienste und somit verantwortlich für die Erhebung, Verarbeitung
                    und Nutzung Ihrer persönlichen Daten und die Vereinbarkeit der Datenbearbeitung mit
                    dem anwendbaren Datenschutzrecht (Schweizer DSG sowie EU-DSGVO).
                  </p>
                  <p className="text-stone-700 pt-1">
                    E-Mail für Datenschutzanfragen:{' '}
                    <a
                      href="mailto:info@fruit-comestible.ch"
                      className="font-bold text-rose-700 hover:underline"
                    >
                      info@fruit-comestible.ch
                    </a>
                  </p>
                </div>
                <p>
                  Damit Sie wissen, welche personenbezogenen Daten wir von Ihnen erheben und für welche
                  Zwecke wir sie verwenden, nehmen Sie bitte die nachstehenden Informationen zur
                  Kenntnis.
                </p>
              </div>
            </article>

            {/* Aufruf unserer Website */}
            <article id="aufruf-website" className="p-6 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-3 scroll-mt-20">
              <div className="flex items-center gap-2.5">
                <Server className="w-5 h-5 text-stone-700 shrink-0" />
                <h3 className="text-base sm:text-lg font-bold text-stone-900">
                  Aufruf unserer Website (Server-Logfiles)
                </h3>
              </div>
              <div className="text-sm text-stone-700 leading-relaxed space-y-2.5">
                <p>
                  Beim Besuch unserer Website speichern unsere Server temporär jeden Zugriff in einer
                  Protokolldatei. Folgende technischen Daten werden dabei, wie grundsätzlich bei jeder
                  Verbindung mit einem Webserver, ohne Ihr Zutun erfasst und gespeichert:
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-3 bg-stone-50 rounded-xl border border-stone-200/80 text-xs">
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-stone-500 shrink-0 mt-0.5" />
                    <span>IP-Adresse des anfragenden Rechners</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-stone-500 shrink-0 mt-0.5" />
                    <span>Name des Inhabers des IP-Adressbereichs (Internet-Provider)</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-stone-500 shrink-0 mt-0.5" />
                    <span>Datum und Uhrzeit des Zugriffs</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-stone-500 shrink-0 mt-0.5" />
                    <span>Website, von der aus Zugriff erfolgte (Referrer URL)</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-stone-500 shrink-0 mt-0.5" />
                    <span>Name und URL der abgerufenen Datei</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-stone-500 shrink-0 mt-0.5" />
                    <span>Status-Code (z.B. HTTP 200, Fehlermeldung)</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-stone-500 shrink-0 mt-0.5" />
                    <span>Betriebssystem Ihres Rechners</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-stone-500 shrink-0 mt-0.5" />
                    <span>Browser (Typ, Version und Sprache) &amp; Protokoll</span>
                  </li>
                </ul>
                <p>
                  Die Erhebung und Verarbeitung dieser Daten erfolgt zu dem Zweck, die Nutzung unserer
                  Website zu ermöglichen (Verbindungsaufbau), die Systemsicherheit und -stabilität
                  dauerhaft zu gewährleisten und die Optimierung unseres Internetangebots zu
                  ermöglichen sowie zu internen statistischen Zwecken. Hierin besteht unser
                  berechtigtes Interesse an der Datenverarbeitung im Sinne von Art. 6 Abs. 1 lit. f
                  DSGVO.
                </p>
              </div>
            </article>

            {/* Eröffnung eines Kundenkontos */}
            <article id="kundenkonto" className="p-6 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-3 scroll-mt-20">
              <div className="flex items-center gap-2.5">
                <UserCheck className="w-5 h-5 text-stone-700 shrink-0" />
                <h3 className="text-base sm:text-lg font-bold text-stone-900">
                  Eröffnung eines Kundenkontos
                </h3>
              </div>
              <div className="text-sm text-stone-700 leading-relaxed space-y-2.5">
                <p>
                  Um im Onlineshop Bestellungen zu tätigen, können Sie als Gast bestellen oder ein
                  Kunden-Konto eröffnen. Bei der Registrierung für ein Kunden-Konto erheben wir
                  folgende Daten:
                </p>
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 text-xs">
                  <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    <li className="font-semibold text-stone-800">• Anrede</li>
                    <li className="font-semibold text-stone-800">• Vor- und Nachname</li>
                    <li className="font-semibold text-stone-800">• Postadresse</li>
                    <li className="font-semibold text-stone-800">• E-Mail Adresse</li>
                    <li className="font-semibold text-stone-800">• Telefon (optional)</li>
                    <li className="font-semibold text-stone-800">• Passwort</li>
                  </ul>
                </div>
                <p>
                  Die Erhebung der Daten erfolgt zum Zweck, dem Kunden einen passwortgeschützten
                  direkten Zugang zu seinen bei uns gespeicherten Basisdaten zur Verfügung zu stellen.
                  Der Kunde kann darin seine abgeschlossenen und offenen Bestellungen einsehen oder
                  seine persönlichen Daten verwalten bzw. ändern. Die Rechtsgrundlage der
                  Verarbeitung der Daten für diesen Zweck liegt in der von Ihnen erteilten
                  Einwilligung nach Art. 6 Abs. 1 lit. a EU-DSGVO.
                </p>
              </div>
            </article>

            {/* Einkauf im Onlineshop */}
            <article id="einkauf-onlineshop" className="p-6 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-3 scroll-mt-20">
              <div className="flex items-center gap-2.5">
                <ShoppingCart className="w-5 h-5 text-stone-700 shrink-0" />
                <h3 className="text-base sm:text-lg font-bold text-stone-900">
                  Einkauf im Onlineshop
                </h3>
              </div>
              <div className="text-sm text-stone-700 leading-relaxed space-y-2.5">
                <p>
                  Wenn Sie in unserem Onlineshop Bestellungen tätigen möchten, benötigen wir für die
                  Abwicklung des Vertrags folgende Daten:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-stone-800">
                  <li>Vor- und Nachname</li>
                  <li>Rechnungsadresse (und falls abweichend Lieferadresse)</li>
                  <li>Angaben im Rahmen der Zahlung (abhängig von der gewählten Zahlungsmethode)</li>
                  <li>Login-Daten, d.h. E-Mail-Adresse und Passwort (bei registrierten Kunden)</li>
                </ul>
                <p>
                  Sofern in dieser Datenschutzerklärung nicht anders festgehalten bzw. Sie dazu nicht
                  gesondert eingewilligt haben, werden wir die vorgenannten Daten nur benutzen, um den
                  Vertrag abzuwickeln, namentlich um Ihre Bestellungen zu bearbeiten, die bestellten
                  Produkte auszuliefern und die korrekte Zahlung sicherzustellen.
                </p>
                <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950">
                  <strong>Wichtiger Hinweis bei Geschenken:</strong> Wenn Sie uns personenbezogene
                  Daten anderer Personen zur Verfügung stellen, z.B. Daten über den Empfänger eines
                  Geschenks, geben Sie uns personenbezogene Daten des Empfängers bitte nur dann
                  bekannt, wenn Sie dazu gemäss den geltenden Datenschutzgesetzen berechtigt sind und
                  wenn die andere Person damit einverstanden ist, dass Sie uns die personenbezogenen
                  Daten für die Zwecke der Verarbeitung zur Verfügung stellen.
                </div>
                <p className="text-xs text-stone-500">
                  Die Rechtsgrundlage der Datenverarbeitung zu diesem Zweck liegt in der Erfüllung eines
                  Vertrages nach Art. 6 Abs. 1 lit. b EU-DSGVO.
                </p>
              </div>
            </article>

            {/* Weitergabe der Daten an Dritte */}
            <article id="weitergabe-dritte" className="p-6 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-3 scroll-mt-20">
              <div className="flex items-center gap-2.5">
                <Share2 className="w-5 h-5 text-stone-700 shrink-0" />
                <h3 className="text-base sm:text-lg font-bold text-stone-900">
                  Weitergabe der Daten an Dritte
                </h3>
              </div>
              <div className="text-sm text-stone-700 leading-relaxed space-y-2.5">
                <p>
                  Wir geben Ihre personenbezogenen Daten nur weiter, wenn Sie ausdrücklich
                  eingewilligt haben, hierfür eine gesetzliche Verpflichtung besteht oder dies zur
                  Durchsetzung unserer Rechte, insbesondere zur Durchsetzung von Ansprüchen aus dem
                  Vertragsverhältnis, erforderlich ist.
                </p>
                <p>
                  Darüber hinaus geben wir Ihre Daten an Dritte weiter, soweit dies im Rahmen der
                  Nutzung der Webseite und der Vertragsabwicklung (auch ausserhalb der Webseite),
                  namentlich der Verarbeitung Ihrer Bestellung erforderlich ist. Hierzu zählt der
                  jeweilige Transportdienstleister (namentlich die <strong>Schweizer Post</strong>), der mit dem
                  Versand von bestellten Waren betraut wurde. Die Webseite wird auf Servern in der
                  Schweiz gehostet. Die Weitergabe der Daten erfolgt zum Zweck der Bereitstellung und
                  Aufrechterhaltung der Funktionalitäten unserer Website. Hierin besteht unser
                  berechtigtes Interesse im Sinne von Art. 6 Abs. 1 lit. f EU-DSGVO.
                </p>
                <p>
                  Sofern wir in Vorleistung treten, z.B. bei einem Kauf auf Rechnung, können wir zur
                  Wahrung unserer berechtigten Interessen gegebenenfalls eine Bonitätsauskunft auf der
                  Basis mathematisch-statistischer Verfahren bei einer Auskunftei einholen.
                </p>
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 space-y-1.5">
                  <h4 className="font-bold text-xs sm:text-sm text-stone-900">
                    Kreditkartenzahlungen via Stripe
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Schliesslich leiten wir Ihre Kreditkarteninformationen bei Kreditkartenzahlung auf
                    der Webseite über den Payment Service Provider <strong>Stripe</strong> an Ihren
                    Kreditkartenherausgeber sowie an den Kreditkarten-Acquirer weiter. Wenn Sie sich
                    für eine Kreditkartenzahlung entscheiden, werden Sie jeweils zur Eingabe aller
                    zwingend notwendigen Informationen gebeten. Die Rechtsgrundlage der Weitergabe der
                    Daten liegt in der Erfüllung eines Vertrages nach Art. 6 Abs. 1 lit. b EU-DSGVO.
                    Betreffend die Bearbeitung Ihrer Kreditkarteninformationen durch diese Dritten
                    bitten wir Sie, auch die Allgemeinen Geschäftsbedingungen sowie die
                    Datenschutzerklärung Ihres Kreditkartenherausgebers zu lesen.
                  </p>
                </div>
              </div>
            </article>

            {/* Übermittlung von Daten ins Ausland */}
            <article id="uebermittlung-ausland" className="p-6 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-3 scroll-mt-20">
              <div className="flex items-center gap-2.5">
                <Globe2 className="w-5 h-5 text-stone-700 shrink-0" />
                <h3 className="text-base sm:text-lg font-bold text-stone-900">
                  Übermittlung von Daten ins Ausland
                </h3>
              </div>
              <p className="text-sm text-stone-700 leading-relaxed">
                Wir sind berechtigt, Ihre persönlichen Daten zum Zwecke der in dieser
                Datenschutzerklärung beschriebenen Datenbearbeitungen auch an dritte Unternehmen
                (beauftragte Dienstleister) im Ausland zu übertragen.
              </p>
            </article>

            {/* Cookies */}
            <article id="cookies" className="p-6 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-3 scroll-mt-20">
              <div className="flex items-center gap-2.5">
                <Cookie className="w-5 h-5 text-stone-700 shrink-0" />
                <h3 className="text-base sm:text-lg font-bold text-stone-900">
                  Cookies
                </h3>
              </div>
              <div className="text-sm text-stone-700 leading-relaxed space-y-2.5">
                <p>
                  Cookies helfen unter vielen Aspekten, Ihren Besuch auf unserer Website einfacher,
                  angenehmer und sinnvoller zu gestalten. Cookies sind Informationsdateien, die Ihr
                  Webbrowser automatisch auf der Festplatte Ihres Computers speichert, wenn Sie unsere
                  Internetseite besuchen.
                </p>
                <p>
                  Wir setzen Cookies beispielsweise ein, um Ihnen die Warenkorb-Funktion über mehrere
                  Seiten hinweg anzubieten und um Ihre Eingaben beim Ausfüllen eines Formulars auf der
                  Website temporär zu speichern, damit Sie die Eingabe beim Aufruf einer anderen
                  Unterseite nicht wiederholen müssen. Cookies werden gegebenenfalls auch eingesetzt, um
                  Sie nach der Registrierung auf der Website als registrierten Benutzer identifizieren
                  zu können, ohne dass Sie sich beim Aufruf einer anderen Unterseite erneut einloggen
                  müssen.
                </p>
                <p>
                  Die meisten Internet-Browser akzeptieren Cookies automatisch. Sie können Ihren
                  Browser jedoch so konfigurieren, dass keine Cookies auf Ihrem Computer gespeichert
                  werden oder stets ein Hinweis erscheint, wenn Sie ein neues Cookie erhalten. Die
                  Deaktivierung von Cookies kann dazu führen, dass Sie nicht alle Funktionen unserer
                  Website nutzen können.
                </p>
              </div>
            </article>

            {/* Tracking */}
            <article id="tracking" className="p-6 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-3 scroll-mt-20">
              <div className="flex items-center gap-2.5">
                <Activity className="w-5 h-5 text-stone-700 shrink-0" />
                <h3 className="text-base sm:text-lg font-bold text-stone-900">
                  Tracking &amp; Remarketing
                </h3>
              </div>
              <div className="text-sm text-stone-700 leading-relaxed space-y-2.5">
                <p>
                  Zum Zwecke der bedarfsgerechten Gestaltung und fortlaufenden Optimierung unserer
                  Website, sowie der Steuerung von Werbemassnahmen auf externen Plattformen nutzen wir
                  sogenannte Tracking Links, z.B. für Google Analytics. Tracking Links werden
                  beispielsweise verwendet für:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
                  <li>Schaltung von Adwords (Google Ads)</li>
                  <li>Facebook-Pixel-Tracking</li>
                </ul>
                <p>
                  Sind sie bei Facebook eingeloggt und besuchen unseren Onlineshop, so werden Daten an
                  Facebook übermittelt welche die Einblendung gezielter Werbung erlauben. Die gemäss
                  folgenden Richtlinien. Die Ermächtigung dazu kann in Ihrem Facebook-Profil
                  ausgeschaltet werden.
                </p>
              </div>
            </article>

            {/* Web Analytics Tools */}
            <article id="web-analytics" className="p-6 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-4 scroll-mt-20">
              <div className="flex items-center gap-2.5">
                <BarChart3 className="w-5 h-5 text-stone-700 shrink-0" />
                <h3 className="text-base sm:text-lg font-bold text-stone-900">
                  Web Analytics Tools
                </h3>
              </div>
              <div className="text-sm text-stone-700 leading-relaxed space-y-3">
                <p>
                  Zum Zwecke der bedarfsgerechten Gestaltung und fortlaufenden Optimierung unserer
                  Website nutzen wir den Webanalysedienst von Google Analytics. In diesem Zusammenhang
                  werden pseudonymisierte Nutzungsprofile erstellt und kleine Textdateien, die auf Ihrem
                  Computer gespeichert sind («Cookies»), verwendet. Die durch den Cookie erzeugten
                  Informationen über Ihre Benutzung dieser Website werden an die Server der Anbieter
                  dieser Dienste übertragen, dort gespeichert und für uns aufbereitet.
                </p>
                <div className="p-4 bg-stone-50 rounded-xl border border-stone-200/80 space-y-1.5">
                  <p className="font-bold text-xs text-stone-900">
                    Zusätzlich erhalten wir dadurch unter Umständen folgende Informationen:
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-stone-600">
                    <li>• Navigationspfad, den ein Besucher auf der Site beschreitet</li>
                    <li>• Verweildauer auf der Website oder Unterseite</li>
                    <li>• Unterseite, auf welcher die Website verlassen wird</li>
                    <li>• Land, Region oder Stadt, von wo ein Zugriff erfolgt</li>
                    <li>• Endgerät (Typ, Version, Farbtiefe, Auflösung, Breite und Höhe)</li>
                    <li>• Wiederkehrender oder neuer Besucher</li>
                  </ul>
                </div>
                <p>
                  Die Informationen werden verwendet, um die Nutzung der Website auszuwerten, um
                  Reports über die Websiteaktivitäten zusammenzustellen und um weitere mit der
                  Websitenutzung und der Internetnutzung verbundene Dienstleistungen zu Zwecken der
                  Marktforschung und bedarfsgerechten Gestaltung dieser Website zu erbringen. Auch
                  werden diese Informationen gegebenenfalls an Dritte übertragen, sofern dies gesetzlich
                  vorgeschrieben ist oder soweit Dritte diese Daten im Auftrag verarbeiten.
                </p>

                {/* Sub-block Mailchimp */}
                <div className="pt-2 border-t border-stone-100 space-y-1">
                  <h4 className="font-bold text-xs sm:text-sm text-stone-900">
                    Mailchimp (Newsletter-Anbieter aus den USA)
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Für den Versand unseres Newsletters nutzen wir Mailchimp, einen Dienst der Rocket
                    Science Group LLC aus den USA.
                  </p>
                </div>

                {/* Sub-block Google Analytics IP-Anonymisierung */}
                <div className="pt-2 border-t border-stone-100 space-y-1.5">
                  <h4 className="font-bold text-xs sm:text-sm text-stone-900">
                    Google Analytics mit IP-Anonymisierung
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Anbieter von Google Analytics ist Google Inc., ein Unternehmen der Holding
                    Gesellschaft Alphabet Inc, mit Sitz in den USA. Vor der Übermittlung der Daten an
                    den Anbieter wird die IP-Adresse durch die Aktivierung der IP-Anonymisierung
                    («anonymizeIP») auf dieser Webseite innerhalb der Mitgliedstaaten der Europäischen
                    Union oder in anderen Vertragsstaaten des Abkommens über den Europäischen
                    Wirtschaftsraum gekürzt. Die im Rahmen von Google Analytics von Ihrem Browser
                    übermittelte anonymisierte IP-Adresse wird nicht mit anderen Daten von Google
                    zusammengeführt. Nur in Ausnahmefällen wird die volle IP-Adresse an einen Server von
                    Google in den USA übertragen und dort gekürzt. In diesen Fällen stellen wir durch
                    vertragliche Garantien sicher, dass Google Inc. ein ausreichendes
                    Datenschutzniveau einhält. Gemäss Google Inc. wird in keinem Fall die IP-Adresse
                    mit anderen den Nutzer betreffenden Daten in Verbindung gebracht werden.
                  </p>
                  <p className="text-xs text-stone-600">
                    Weitere Informationen über den genutzten Webanalyse-Dienst finden Sie auf der
                    Website von Google Analytics. Eine Anleitung, wie Sie die Verarbeitung Ihrer Daten
                    durch den Webanalyse-Dienst verhindern können, finden Sie unter:{' '}
                    <a
                      href="http://tools.google.com/dlpage/gaoptout?hl=de"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-rose-700 underline font-semibold inline-flex items-center gap-1"
                    >
                      tools.google.com/dlpage/gaoptout <ExternalLink className="w-3 h-3" />
                    </a>
                  </p>
                </div>
              </div>
            </article>

            {/* Trusted Shops */}
            <article id="trusted-shops" className="p-6 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-3 scroll-mt-20">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-stone-700 shrink-0" />
                <h3 className="text-base sm:text-lg font-bold text-stone-900">
                  Trusted Shops Trustbadge
                </h3>
              </div>
              <p className="text-sm text-stone-700 leading-relaxed">
                Bei dem Aufruf des Trustbadge speichert der Webserver automatisch ein sogenanntes
                Server-Logfile, das z.B. Ihre IP-Adresse, Datum und Uhrzeit des Abrufs, übertragene
                Datenmenge und den anfragenden Provider (Zugriffsdaten) enthält und den Abruf
                dokumentiert. Diese Zugriffsdaten werden nicht ausgewertet und spätestens sieben Tagen
                nach Ende Ihres Seitenbesuchs automatisch überschrieben.
              </p>
            </article>

            {/* Hinweis zu Datenübermittlungen in die USA */}
            <article id="usa-uebermittlung" className="p-6 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-3 scroll-mt-20">
              <div className="flex items-center gap-2.5">
                <AlertCircle className="w-5 h-5 text-amber-700 shrink-0" />
                <h3 className="text-base sm:text-lg font-bold text-stone-900">
                  Hinweis zu Datenübermittlungen in die USA
                </h3>
              </div>
              <div className="text-sm text-stone-700 leading-relaxed space-y-2.5">
                <p>
                  Aus Gründen der Vollständigkeit weisen wir für Nutzer mit Wohnsitz oder Sitz in der
                  Schweiz darauf hin, dass in den USA Überwachungsmassnahmen von US-Behörden bestehen,
                  die generell die Speicherung aller personenbezogenen Daten sämtlicher Personen,
                  deren Daten aus der Schweiz in die USA übermittelt wurden, ermöglicht. Dies geschieht
                  ohne Differenzierung, Einschränkung oder Ausnahme anhand des verfolgten Ziels und
                  ohne ein objektives Kriterium, das es ermöglicht, den Zugang der US-Behörden zu den
                  Daten und deren spätere Nutzung auf ganz bestimmte, strikt begrenzte Zwecke zu
                  beschränken, die den sowohl mit dem Zugang zu diesen Daten als auch mit deren Nutzung
                  verbundenen Eingriff zu rechtfertigen vermögen.
                </p>
                <p>
                  Ausserdem weisen wir darauf hin, dass in den USA für die betroffenen Personen aus der
                  Schweiz keine Rechtsbehelfe vorliegen, die es ihnen erlauben, Zugang zu den sie
                  betreffenden Daten zu erhalten und deren Berichtigung oder Löschung zu erwirken, bzw.
                  kein wirksamer gerichtlicher Rechtsschutz gegen generelle Zugriffsrechte von
                  US-Behörden vorliegt. Wir weisen den Betroffenen explizit auf diese Rechts- und
                  Sachlage hin, um eine entsprechend informierte Entscheidung zur Einwilligung in die
                  Verwendung seiner Daten zu treffen.
                </p>
                <p>
                  Nutzer mit Wohnsitz in einem Mitgliedstaat der EU weisen wir darauf hin, dass die USA
                  aus Sicht der Europäischen Union – unter anderem aufgrund der in diesem Abschnitt
                  genannten Themen – nicht über ein ausreichendes Datenschutzniveau verfügt. Soweit wir
                  in dieser Datenschutzerklärung erläutert haben, dass Empfänger von Daten (wie z.B.
                  Google) ihren Sitz in den USA haben, werden wir entweder durch vertragliche
                  Regelungen zu diesen Unternehmen oder durch die Sicherstellung der Zertifizierung
                  dieser Unternehmen unter dem EU- bzw. Swiss-US-Privacy Schild sicherstellen, dass Ihre
                  Daten bei unseren Partnern mit einem angemessenen Niveau geschützt sind.
                </p>
              </div>
            </article>

            {/* Recht auf Auskunft, Berichtigung, Löschung und Einschränkung */}
            <article id="betroffenenrechte" className="p-6 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-3 scroll-mt-20">
              <div className="flex items-center gap-2.5">
                <UserCheck className="w-5 h-5 text-stone-700 shrink-0" />
                <h3 className="text-base sm:text-lg font-bold text-stone-900">
                  Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung
                </h3>
              </div>
              <div className="text-sm text-stone-700 leading-relaxed space-y-2.5">
                <p>
                  Sie haben das Recht, über die personenbezogenen Daten, die von uns über Sie
                  gespeichert werden, auf Antrag Auskunft zu erhalten. Zusätzlich haben Sie das Recht
                  auf Berichtigung unrichtiger Daten und das Recht auf Löschung Ihrer
                  personenbezogenen Daten, soweit dem keine gesetzliche Aufbewahrungspflicht oder ein
                  Erlaubnistatbestand, der uns die Verarbeitung der Daten gestattet, entgegensteht.
                </p>
                <p>
                  Sie können uns für die vorgenannten Zwecke über die E-Mail-Adresse{' '}
                  <a
                    href="mailto:info@fruit-comestible.ch"
                    className="font-bold text-rose-700 hover:underline"
                  >
                    info@fruit-comestible.ch
                  </a>{' '}
                  erreichen. Für die Bearbeitung Ihrer Gesuche können wir, nach eigenem Ermessen, einen
                  Identitätsnachweis verlangen.
                </p>
              </div>
            </article>

            {/* Datensicherheit */}
            <article id="datensicherheit" className="p-6 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-3 scroll-mt-20">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-stone-700 shrink-0" />
                <h3 className="text-base sm:text-lg font-bold text-stone-900">
                  Datensicherheit
                </h3>
              </div>
              <div className="text-sm text-stone-700 leading-relaxed space-y-2.5">
                <p>
                  Wir bedienen uns geeigneter technischer und organisatorischer Sicherheitsmassnahmen,
                  um Ihre bei uns gespeicherten persönlichen Daten gegen Manipulation, teilweisen oder
                  vollständigen Verlust und gegen unbefugten Zugriff Dritter zu schützen. Unsere
                  Sicherheitsmassnahmen werden entsprechend der technologischen Entwicklung fortlaufend
                  verbessert.
                </p>
                <p>
                  Sie sollten Ihre Zugangsdaten stets vertraulich behandeln und das Browserfenster
                  schliessen, wenn Sie die Kommunikation mit uns beendet haben, insbesondere wenn Sie
                  den Computer gemeinsam mit anderen nutzen.
                </p>
                <p>
                  Auch den unternehmensinternen Datenschutz nehmen wir sehr ernst. Unsere Mitarbeiter
                  und die von uns beauftragten Dienstleistungsunternehmen sind von uns zur
                  Verschwiegenheit und zur Einhaltung der datenschutzrechtlichen Bestimmungen
                  verpflichtet worden.
                </p>
              </div>
            </article>

            {/* Aufbewahrung von Daten */}
            <article id="aufbewahrung" className="p-6 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-3 scroll-mt-20">
              <div className="flex items-center gap-2.5">
                <Clock className="w-5 h-5 text-stone-700 shrink-0" />
                <h3 className="text-base sm:text-lg font-bold text-stone-900">
                  Aufbewahrung von Daten
                </h3>
              </div>
              <div className="text-sm text-stone-700 leading-relaxed space-y-2.5">
                <p>
                  Wir speichern personenbezogene Daten nur so lange, wie es erforderlich ist, um die
                  oben genannten Tracking- und Analysedienste sowie die weiteren Bearbeitungen im Rahmen
                  unseres berechtigten Interesses zu verwenden.
                </p>
                <p>
                  Vertragsdaten werden von uns länger aufbewahrt, da dies durch gesetzliche
                  Aufbewahrungspflichten vorgeschrieben ist. Aufbewahrungspflichten, die uns zur
                  Aufbewahrung von Daten verpflichten, ergeben sich aus Vorschriften der
                  Rechnungslegung und aus steuerrechtlichen Vorschriften. Gemäss diesen Vorschriften
                  sind geschäftliche Kommunikation, geschlossene Verträge und Buchungsbelege bis zu 10
                  Jahren aufzubewahren. Soweit wir diese Daten nicht mehr zur Durchführung der
                  Dienstleistungen für Sie benötigen, werden die Daten gesperrt. Dies bedeutet, dass
                  die Daten dann nur noch für Zwecke der Rechnungslegung und für Steuerzwecke verwendet
                  werden dürfen.
                </p>
              </div>
            </article>

            {/* Recht auf Beschwerde bei einer Datenschutzaufsichtsbehörde */}
            <article id="beschwerderecht" className="p-6 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-3 scroll-mt-20">
              <div className="flex items-center gap-2.5">
                <Scale className="w-5 h-5 text-stone-700 shrink-0" />
                <h3 className="text-base sm:text-lg font-bold text-stone-900">
                  Recht auf Beschwerde bei einer Datenschutzaufsichtsbehörde
                </h3>
              </div>
              <p className="text-sm text-stone-700 leading-relaxed">
                Sie haben das Recht, sich jederzeit bei einer Datenschutzaufsichtsbehörde zu
                beschweren (in der Schweiz: Eidgenössischer Datenschutz- und Öffentlichkeitsbeauftragter,
                EDÖB).
              </p>
            </article>
          </div>
        </section>

        {/* Footer Contact & Assistance Callout */}
        <section className="pt-8 border-t border-stone-200">
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-stone-900">
                Haben Sie Fragen zu unseren AGB oder zum Datenschutz?
              </h3>
              <p className="text-xs sm:text-sm text-stone-600">
                Unser Kundenservice steht Ihnen gerne schriftlich zur Verfügung.
              </p>
            </div>
            <a
              href="mailto:info@fruit-comestible.ch"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold transition shadow-xs shrink-0"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>info@fruit-comestible.ch</span>
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
