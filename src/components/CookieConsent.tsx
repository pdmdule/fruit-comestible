'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('fc_cookie_consent');
    if (!consent) {
      // Mala odgoda (npr. 800ms) radi uglađenijeg ulaska na stranicu
      const timer = setTimeout(() => setIsVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('fc_cookie_consent', 'all');
    setIsVisible(false);
    // Ovdje se mogu inicijalizirati skripte poput Google Analytics / Meta Pixela ako postoje
  };

  const handleAcceptEssential = () => {
    localStorage.setItem('fc_cookie_consent', 'essential');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 sm:bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="bg-white/95 dark:bg-stone-900/95 backdrop-blur-md p-5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xl text-stone-800 dark:text-stone-200">
        <div className="flex items-start gap-3">
          <span className="text-2xl select-none">🍪</span>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 mb-1">
              Wir schätzen Ihre Privatsphäre
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              Wir verwenden Cookies, um Ihr Einkaufserlebnis zu verbessern, den Warenkorb zu verwalten und Webseiten-Zugriffe zu analysieren. Weitere Informationen finden Sie in unserer{' '}
              <Link className="underline hover:text-emerald-700 dark:hover:text-emerald-400" href="/datenschutz">
                Datenschutzerklärung
              </Link>.
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row gap-2 pt-2 border-t border-stone-100 dark:border-stone-800">
          <button
            onClick={handleAcceptEssential}
            className="w-full sm:w-auto flex-1 px-3 py-2 text-xs font-medium rounded-xl border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors text-center"
          >
            Nur essenzielle
          </button>
          <button
            onClick={handleAcceptAll}
            className="w-full sm:w-auto flex-1 px-4 py-2 text-xs font-medium rounded-xl bg-stone-900 dark:bg-white text-white dark:text-stone-900 hover:bg-emerald-700 dark:hover:bg-emerald-400 transition-colors shadow-sm text-center font-semibold"
          >
            Alle akzeptieren
          </button>
        </div>
      </div>
    </div>
  );
}

export default CookieConsent;
