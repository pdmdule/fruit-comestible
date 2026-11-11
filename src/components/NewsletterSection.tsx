'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Mail, Check, Sparkles, ArrowRight, Copy } from 'lucide-react';

const BG_IMAGE_URL =
  'https://loinzvvygklupiomoisu.supabase.co/storage/v1/object/public/hero/background001.webp';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    setSubmitted(true);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText('NATURE10');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="relative overflow-hidden rounded-3xl sm:rounded-[2.5rem] bg-white text-stone-900 p-8 sm:p-14 lg:p-16 shadow-lg border border-stone-200/90">
      {/* 1. Background Pattern Image */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <Image
          src={BG_IMAGE_URL}
          alt="Beeren & Früchte Muster"
          fill
          sizes="(max-width: 1600px) 100vw, 1600px"
          className="object-cover object-center opacity-30"
        />
      </div>

      {/* 2. Main Content Container */}
      <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold tracking-wide shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-rose-600" />
          <span>Exklusives Willkommensgeschenk</span>
        </div>

        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-stone-900 leading-tight">
          10% Rabatt auf deine erste Bestellung
        </h3>

        <p className="text-base sm:text-lg text-stone-600 font-medium leading-relaxed max-w-xl mx-auto">
          Melde dich für unseren Genuss-Newsletter an. Erhalte sofort deinen
          Rabattcode, Rezeptideen für Müesli & Bowls sowie exklusive saisonale Angebote.
        </p>

        {submitted ? (
          <div className="p-7 sm:p-8 rounded-3xl bg-white border border-stone-200 shadow-xl text-center space-y-3.5 animate-in fade-in zoom-in-95 duration-300 max-w-md mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-2xs">
              <Check className="w-6 h-6 stroke-[3]" />
            </div>
            <p className="text-xl font-black text-stone-900">
              Vielen Dank für deine Anmeldung!
            </p>
            <p className="text-sm text-stone-600 font-medium">
              Dein persönlicher 10% Rabattcode lautet:
            </p>
            <div className="pt-1 flex items-center justify-center gap-2">
              <span className="font-mono text-lg font-black text-rose-700 bg-rose-50 border border-rose-200 px-5 py-2.5 rounded-xl tracking-wider select-all shadow-2xs">
                NATURE10
              </span>
              <button
                type="button"
                onClick={handleCopyCode}
                className="px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold transition cursor-pointer flex items-center gap-1.5 shadow-sm"
                title="Code kopieren"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
                    <span>Kopiert!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-stone-300" />
                    <span>Kopieren</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-xs text-stone-500 pt-1">
              Code einfach beim Checkout im Warenkorb einlösen.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto pt-2"
          >
            <div className="relative flex-1">
              <Mail className="absolute left-4.5 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Deine E-Mail-Adresse..."
                className="w-full h-14 pl-12 pr-4 rounded-2xl bg-white text-stone-900 placeholder:text-stone-400 font-medium text-sm sm:text-base border-2 border-stone-200 focus:border-rose-600 focus:outline-none focus:ring-4 focus:ring-rose-500/15 shadow-sm transition"
              />
            </div>
            <button
              type="submit"
              className="h-14 px-8 rounded-2xl bg-rose-600 hover:bg-rose-700 active:scale-[0.98] text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all shrink-0 shadow-md hover:shadow-lg cursor-pointer"
            >
              <span>Code anfordern</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        )}

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-3 text-xs sm:text-sm text-stone-600 font-semibold">
          <span className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
            Sofort 10% sparen
          </span>
          <span className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
            Kein Spam, jederzeit abmeldbar
          </span>
          <span className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
            100% Schweizer Genuss
          </span>
        </div>
      </div>
    </section>
  );
}
