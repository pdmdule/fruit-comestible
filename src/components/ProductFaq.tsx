'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

export interface FaqItem {
  question: string;
  answer?: string;
}

interface ProductFaqProps {
  faq?: FaqItem[];
  productName?: string;
}

export default function ProductFaq({ faq, productName }: ProductFaqProps) {
  // Sva pitanja su zatvorena prema zadanim postavkama (početno stanje je null)
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!faq || faq.length === 0) {
    return null;
  }

  // Funkcija za otvaranje i zatvaranje na klik (Toggle)
  const toggleFaq = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <section className="bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-8 shadow-xs">
      <div className="flex items-center gap-3 border-b border-stone-100 pb-5 mb-6">
        <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
          <HelpCircle className="w-5 h-5" />
        </div>
        <div>
          <span className="text-xs font-bold tracking-wider uppercase text-stone-400">
            Häufige Fragen
          </span>
          <h3 className="text-xl font-extrabold tracking-tight text-stone-900">
            Fragen & Antworten {productName ? `zu ${productName}` : ''}
          </h3>
        </div>
      </div>

      <div className="space-y-3">
        {faq.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`rounded-2xl border transition-colors overflow-hidden ${
                isOpen
                  ? 'bg-white border-stone-300 shadow-xs'
                  : 'border-stone-200/80 bg-stone-50/50 hover:bg-stone-50'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleFaq(index)}
                className="w-full flex items-center justify-between p-5 cursor-pointer select-none text-left font-medium text-stone-900 focus:outline-hidden"
                aria-expanded={isOpen}
              >
                <span className="text-base font-bold pr-4 text-stone-900">
                  {item.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-stone-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-sm text-stone-700 leading-relaxed border-t border-stone-100 mt-1 animate-in fade-in duration-200">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
