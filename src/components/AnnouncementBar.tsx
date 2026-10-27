'use client';

import React, { useState, useEffect } from 'react';
import { Truck, Leaf, ShieldCheck, Sparkles } from 'lucide-react';

export interface AnnouncementBarProps {
  className?: string;
}

export function AnnouncementBar({ className = '' }: AnnouncementBarProps) {
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);

  const mobileMessages = [
    {
      icon: <Truck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />,
      text: 'Kostenloser Versand ab CHF 80.–',
    },
    {
      icon: <Leaf className="w-3.5 h-3.5 text-emerald-400 shrink-0" />,
      text: 'Bio-zertifizierte Premium-Qualität',
    },
  ];

  // Subtle mobile ticker to showcase both Free Shipping and Bio Certification
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveMobileIndex((prev) => (prev + 1) % mobileMessages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [mobileMessages.length]);

  return (
    <div
      className={`w-full bg-stone-900 dark:bg-stone-950 text-white text-xs font-medium py-2 border-b border-stone-800 ${className}`}
    >
      <div className="max-w-7xl xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Mobilni prikaz: centrirano s ikonicom, naizmjenično (ticker) s Bio oznakom */}
        <div className="flex md:hidden items-center justify-center gap-1.5 text-center font-medium transition-all duration-300">
          {mobileMessages[activeMobileIndex].icon}
          <span>{mobileMessages[activeMobileIndex].text}</span>
        </div>

        {/* Desktop prikaz: uravnotežen raspored u punoj širini */}
        <div className="hidden md:flex items-center justify-between w-full text-stone-300">
          {/* 1. Lijevo */}
          <span className="inline-flex items-center gap-1.5">
            <span>🇨🇭</span>
            <span>Schweizer Post – Schnell &amp; Zuverlässig</span>
          </span>

          {/* 2. Sredina */}
          <span className="inline-flex items-center gap-1.5 font-semibold text-white">
            <Truck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Kostenloser Versand ab CHF 80.–</span>
          </span>

          {/* 3. Desno */}
          <span className="inline-flex items-center gap-1.5">
            <Leaf className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Bio-zertifizierte Premium-Qualität</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default AnnouncementBar;
