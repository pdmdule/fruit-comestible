'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import {
  ShoppingBag,
  Search,
  Menu,
  X,
  Sparkles,
  ArrowRight,
  Truck,
  Leaf,
  Heart,
  Mail,
  ChevronRight,
} from 'lucide-react';
import QuickSearch from './QuickSearch';

export default function Header() {
  const pathname = usePathname();
  const { totalItems, openCart } = useCart();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { label: 'Shop', href: '/shop' },
    { label: 'Geschenkboxen', href: '/shop/geschenkboxen' },
    { label: 'Rezepte & Wissen', href: '/blog' },
    { label: 'Über uns', href: '/ueber-uns' },
  ];

  return (
    <>
      {/* 1. Top Announcement Bar */}
      <div className="bg-stone-900 text-stone-200 text-xs py-2 px-4 border-b border-stone-800">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 flex items-center justify-between sm:justify-center gap-6 sm:gap-10 text-[11px] sm:text-xs font-medium">
          <div className="flex items-center gap-2">
            <span>🇨🇭</span>
            <span>Kostenloser Versand mit Schweizer Post ab CHF 60.–</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-stone-400">
            <span>•</span>
            <span className="text-stone-300">
              🌿 100% reine Frucht – Ohne Zuckerzusatz
            </span>
          </div>
          <div className="hidden lg:flex items-center gap-2 text-stone-400">
            <span>•</span>
            <span className="text-emerald-400 font-semibold">
              ✓ Schweizer Manufaktur seit 2019
            </span>
          </div>
        </div>
      </div>

      {/* 2. Main Header */}
      <header className="sticky top-0 z-40 w-full border-b border-stone-200 bg-white/95 backdrop-blur-md transition-all">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 h-18 sm:h-20 flex items-center justify-between gap-4">
          {/* Left: Brand / Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              aria-label="Fruit Comestible Startseite"
              className="flex items-center shrink-0 transition-opacity duration-200 hover:opacity-85 focus:outline-none"
            >
              <Image
                src="/logo.webp"
                alt="Fruit Comestible Logo"
                width={120}
                height={120}
                priority
                className="h-10 sm:h-11 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Middle: Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-700">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href.includes('?') && pathname === link.href.split('?')[0]);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`transition-colors py-1 relative hover:text-stone-900 ${
                    isActive
                      ? 'text-stone-900 font-bold'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-rose-600 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Search Button */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Produkte suchen"
              className="p-2.5 sm:px-3 sm:py-2 rounded-2xl hover:bg-stone-100 text-stone-700 hover:text-stone-900 transition flex items-center gap-2 cursor-pointer"
            >
              <Search className="w-5 h-5 text-stone-700" />
              <span className="hidden xl:inline text-xs font-semibold text-stone-400">
                Suchen...
              </span>
            </button>

            {/* Cart Button */}
            <button
              type="button"
              onClick={openCart}
              aria-label="Warenkorb öffnen"
              className="relative p-2.5 rounded-2xl border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-900 transition flex items-center gap-2 cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="bg-rose-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold animate-in zoom-in-50 duration-200 shadow-xs">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Menü öffnen"
              className="md:hidden p-2.5 rounded-2xl border border-stone-200 text-stone-700 hover:text-stone-900 hover:bg-stone-100 transition cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* 3. Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobiles Navigationsmenü"
          className="fixed inset-0 z-50 md:hidden animate-in fade-in duration-200"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="fixed inset-y-0 left-0 w-[85%] max-w-sm bg-white shadow-2xl z-50 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-left duration-300">
            <div>
              {/* Drawer Header */}
              <div className="p-5 border-b border-stone-100 flex items-center justify-between">
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Fruit Comestible Startseite"
                  className="flex items-center transition-opacity duration-200 hover:opacity-85 shrink-0"
                >
                  <Image
                    src="/logo.webp"
                    alt="Fruit Comestible Logo"
                    width={100}
                    height={100}
                    priority
                    className="h-10 w-auto object-contain"
                  />
                </Link>

                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Menü schliessen"
                  className="p-2 rounded-xl text-stone-400 hover:text-stone-900 hover:bg-stone-100 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Quick Search Button */}
              <div className="p-4 border-b border-stone-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsSearchOpen(true);
                  }}
                  className="w-full py-2.5 px-4 rounded-2xl bg-stone-50 border border-stone-200 text-stone-500 text-xs font-medium flex items-center gap-2.5"
                >
                  <Search className="w-4 h-4 text-stone-400" />
                  <span>Früchte oder Rezepte suchen...</span>
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="p-4 space-y-1">
                {navLinks.map((link) => {
                  const isActive =
                    pathname === link.href ||
                    (link.href.includes('?') &&
                      pathname === link.href.split('?')[0]);
                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-4 py-3.5 rounded-2xl text-base font-bold transition ${
                        isActive
                          ? 'bg-stone-100 text-stone-900'
                          : 'text-stone-700 hover:bg-stone-50 hover:text-stone-900'
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronRight className="w-4 h-4 text-stone-400" />
                    </Link>
                  );
                })}

                <Link
                  href="/#gefriertrocknung"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-3.5 rounded-2xl text-base font-bold text-stone-700 hover:bg-stone-50 hover:text-stone-900 transition"
                >
                  <span>Gefriertrocknung Verfahren</span>
                  <ChevronRight className="w-4 h-4 text-stone-400" />
                </Link>
              </nav>

              {/* Swiss Trust Feature Badges in Drawer */}
              <div className="p-4 mx-4 my-2 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2 text-xs text-stone-600">
                <div className="flex items-center gap-2 font-semibold text-stone-800">
                  <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Kostenloser Versand ab CHF 60.–</span>
                </div>
                <div className="flex items-center gap-2 font-semibold text-stone-800">
                  <Leaf className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% reine Frucht – Ohne Zuckerzusatz</span>
                </div>
              </div>
            </div>

            {/* Drawer Bottom CTA & Social Links */}
            <div className="p-6 border-t border-stone-100 space-y-4 bg-stone-50/50">
              <Link
                href="/shop"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full h-12 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-sm transition"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Jetzt einkaufen</span>
              </Link>

              <div className="flex items-center justify-between text-xs text-stone-500 pt-1">
                <span>🇨🇭 Schweizer Qualität</span>
                <span className="text-[11px] text-stone-400">Since 2019</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Quick Search Live Modal */}
      <QuickSearch
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
