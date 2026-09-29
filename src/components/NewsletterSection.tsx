'use client';

import React, { useState } from 'react';
import { Mail, Check, Sparkles, ArrowRight } from 'lucide-react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    setSubmitted(true);
  };

  return (
    <section className="relative overflow-hidden rounded-3xl bg-stone-900 text-white p-8 sm:p-12 lg:p-16 shadow-lg">
      {/* Decorative gradient overlay */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-rose-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-2xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-rose-300 text-xs font-bold backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Exklusives Willkommensgeschenk</span>
        </div>

        <h3 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
          10% Rabatt auf Ihre erste Bestellung
        </h3>

        <p className="text-sm sm:text-base text-stone-300 leading-relaxed max-w-xl mx-auto">
          Melden Sie sich für unseren Genuss-Newsletter an. Erhalten Sie sofort Ihren
          Rabattcode, Rezeptideen für Müsli & Bowls sowie saisonale Angebote.
        </p>

        {submitted ? (
          <div className="p-6 rounded-2xl bg-white/10 border border-white/20 text-center space-y-2 animate-in fade-in zoom-in-95 duration-300">
            <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto">
              <Check className="w-6 h-6 stroke-[3]" />
            </div>
            <p className="text-base font-bold text-white">
              Vielen Dank für Ihre Anmeldung!
            </p>
            <p className="text-xs text-stone-300">
              Ihr persönlicher 10% Rabattcode lautet:{' '}
              <strong className="font-mono text-white bg-white/20 px-2 py-0.5 rounded-md text-sm">
                NATURE10
              </strong>
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <div className="relative flex-1">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ihre E-Mail-Adresse..."
                className="w-full h-13 pl-11 pr-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-stone-400 text-sm focus:outline-hidden focus:ring-2 focus:ring-rose-500 transition"
              />
            </div>
            <button
              type="submit"
              className="h-13 px-7 rounded-2xl bg-rose-600 hover:bg-rose-500 active:scale-[0.98] text-white font-bold text-sm flex items-center justify-center gap-2 transition shrink-0 shadow-md"
            >
              <span>Code anfordern</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        <p className="text-[11px] text-stone-400">
          Jederzeit abmeldbar. Kein Spam, nur gesunder Schweizer Naturgenuss.
        </p>
      </div>
    </section>
  );
}
