'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
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
  User,
  Package,
  LogOut,
} from 'lucide-react';
import QuickSearch from './QuickSearch';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { totalItems, openCart } = useCart();
  const { user, profile, signOut } = useAuth();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [pathname]);

  // Click outside to close user dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
            <span>Kostenloser Versand ab CHF 80.– innerhalb der Schweiz</span>
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
        <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 h-18 sm:h-20 flex items-center justify-between gap-4">
          {/* Left: Brand / Logo */}
          <div className="flex items-center relative z-10">
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
                unoptimized
                className="h-10 sm:h-11 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Middle: Desktop Navigation (Perfect Center) */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-700 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-auto whitespace-nowrap">
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
          <div className="flex items-center gap-2 sm:gap-3 relative z-20">
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

            {/* User Account / Login Button */}
            {user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  type="button"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  aria-label="Kundenkonto öffnen"
                  className="p-2 sm:px-3 sm:py-2 rounded-2xl border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-900 transition flex items-center gap-2 cursor-pointer"
                >
                  <div className="w-5 h-5 rounded-full bg-stone-900 text-white text-[10px] font-black flex items-center justify-center uppercase shrink-0">
                    {(profile?.first_name || user.user_metadata?.first_name || user.email || 'K').charAt(0)}
                  </div>
                  <span className="hidden xl:inline text-xs font-semibold text-stone-700 max-w-[90px] truncate">
                    {profile?.first_name || user.user_metadata?.first_name || 'Konto'}
                  </span>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white border border-stone-200 shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-4 py-2 border-b border-stone-100">
                      <p className="text-[11px] text-stone-400">Angemeldet als</p>
                      <p className="text-xs font-bold text-stone-900 truncate">
                        {user.email}
                      </p>
                    </div>

                    <div className="py-1">
                      <Link
                        href="/konto"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-50 hover:text-stone-900 transition"
                      >
                        <User className="w-4 h-4 text-stone-400" />
                        <span>Mein Konto</span>
                      </Link>

                      <Link
                        href="/konto?tab=bestellungen"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-50 hover:text-stone-900 transition"
                      >
                        <Package className="w-4 h-4 text-stone-400" />
                        <span>Meine Bestellungen</span>
                      </Link>
                    </div>

                    <div className="border-t border-stone-100 pt-1">
                      <button
                        type="button"
                        onClick={async () => {
                          setIsUserMenuOpen(false);
                          await signOut();
                          router.push('/');
                          router.refresh();
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-50 transition text-left cursor-pointer"
                      >
                        <LogOut className="w-4 h-4 text-rose-600" />
                        <span>Abmelden</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                aria-label="Kundenkonto / Anmelden"
                className="p-2.5 sm:px-3 sm:py-2 rounded-2xl border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700 hover:text-stone-900 transition flex items-center gap-2 cursor-pointer"
              >
                <User className="w-5 h-5 text-stone-700" />
                <span className="hidden xl:inline text-xs font-semibold text-stone-600">
                  Anmelden
                </span>
              </Link>
            )}

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

      {/* 3. Mobile Navigation Drawer (Opening from RIGHT) */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Mobiles Navigationsmenü"
        className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Drawer Panel - Slides from Right */}
        <div
          className={`fixed inset-y-0 right-0 w-[85%] max-w-sm bg-white shadow-2xl z-50 flex flex-col justify-between overflow-y-auto transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="relative">
            {/* Close Button in top right corner directly under thumb */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Menü schliessen"
              className="absolute top-5 right-5 p-2 rounded-full text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition z-10 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Drawer Header */}
            <div className="p-5 border-b border-stone-100 flex items-center pr-14">
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
                  unoptimized
                  className="h-10 w-auto object-contain"
                />
              </Link>
            </div>

            {/* Mobile Quick Search Button */}
            <div className="p-4 border-b border-stone-100">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsSearchOpen(true);
                }}
                className="w-full py-2.5 px-4 rounded-2xl bg-stone-50 border border-stone-200 text-stone-500 text-xs font-medium flex items-center gap-2.5 hover:bg-stone-100 transition cursor-pointer"
              >
                <Search className="w-4 h-4 text-stone-400" />
                <span>Früchte oder Rezepte suchen...</span>
              </button>
            </div>

            {/* Mobile User Profile Section */}
            <div className="p-4 border-b border-stone-100">
              {user ? (
                <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-stone-900 text-white text-xs font-black flex items-center justify-center uppercase shrink-0">
                      {(profile?.first_name || user.user_metadata?.first_name || user.email || 'K').charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-stone-900 truncate">
                        {profile?.first_name
                          ? `${profile.first_name} ${profile.last_name || ''}`
                          : user.email}
                      </p>
                      <p className="text-[10px] text-stone-400 font-mono truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-1 border-t border-stone-200/60 text-xs font-bold">
                    <Link
                      href="/konto"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="py-1.5 px-2.5 rounded-xl bg-white border border-stone-200 text-stone-800 text-center hover:bg-stone-100 transition"
                    >
                      Mein Konto
                    </Link>
                    <button
                      type="button"
                      onClick={async () => {
                        setIsMobileMenuOpen(false);
                        await signOut();
                        router.push('/');
                        router.refresh();
                      }}
                      className="py-1.5 px-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-center hover:bg-rose-100 transition cursor-pointer"
                    >
                      Abmelden
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full py-2.5 px-4 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold flex items-center justify-center gap-2 transition"
                >
                  <User className="w-4 h-4" />
                  <span>Anmelden / Registrieren</span>
                </Link>
              )}
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
                <span>Kostenloser Versand ab CHF 80.–</span>
              </div>
              <div className="flex items-center gap-2 font-semibold text-stone-800">
                <Leaf className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% reine Frucht – Ohne Zuckerzusatz</span>
              </div>
            </div>
          </div>

          {/* Drawer Bottom CTA & Social Links */}
          <div className="p-6 pb-6 sm:pb-8 border-t border-stone-100 space-y-4 bg-stone-50/50">
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

      {/* 4. Quick Search Live Modal */}
      <QuickSearch
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
