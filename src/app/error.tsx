'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, Home, RotateCcw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global application error:', error);
  }, [error]);

  return (
    <main className="min-h-[75vh] bg-[#FAF8F5] flex items-center justify-center px-4 py-16 sm:py-24">
      <div className="max-w-xl w-full bg-[#F4EFE6]/70 border border-stone-200/90 rounded-3xl p-8 sm:p-12 text-center shadow-sm">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FAF8F5] border border-stone-200 text-[#A0522D] shadow-xs">
          <AlertTriangle className="h-8 w-8 stroke-[1.5]" aria-hidden="true" />
        </div>

        <span className="inline-block px-4 py-1.5 rounded-full bg-[#FAF8F5] border border-stone-200 text-xs font-medium tracking-widest uppercase text-[#A0522D] mb-5">
          Unerwarteter Fehler
        </span>

        <h1 className="font-serif text-3xl sm:text-4xl leading-tight text-stone-900 mb-4">
          Etwas ist schiefgelaufen
        </h1>

        <p className="text-stone-600 text-base sm:text-lg leading-relaxed mb-9">
          Beim Laden dieser Seite ist ein unerwarteter Fehler aufgetreten. Bitte
          versuche es erneut.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <button
            type="button"
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-stone-900 px-7 py-3.5 text-sm font-medium text-[#FAF8F5] hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            <span>Erneut versuchen</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#FAF8F5] border border-stone-300 px-7 py-3.5 text-sm font-medium text-stone-800 hover:bg-stone-100 hover:border-stone-400 transition-colors"
          >
            <Home className="h-4 w-4" aria-hidden="true" />
            <span>Zur Startseite</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
