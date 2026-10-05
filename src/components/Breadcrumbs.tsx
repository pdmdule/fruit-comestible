'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';
import { getCategoryConfig } from '@/lib/categoryConfig';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  customItems?: BreadcrumbItem[];
  className?: string;
  showJsonLd?: boolean;
}

const STATIC_SEGMENT_MAP: Record<string, { label: string; defaultHref?: string }> = {
  shop: { label: 'Shop', defaultHref: '/shop' },
  produkte: { label: 'Shop', defaultHref: '/shop' },
  blog: { label: 'Magazin & Rezepte', defaultHref: '/blog' },
  rezepte: { label: 'Rezepte', defaultHref: '/blog' },
  'ueber-uns': { label: 'Über uns', defaultHref: '/ueber-uns' },
  agb: { label: 'AGB & Datenschutz', defaultHref: '/agb' },
  checkout: { label: 'Kasse', defaultHref: '/checkout' },
  login: { label: 'Anmelden', defaultHref: '/login' },
  konto: { label: 'Mein Konto', defaultHref: '/konto' },
  'update-password': { label: 'Passwort aktualisieren', defaultHref: '/update-password' },
};

function formatSlugToLabel(slug: string): string {
  const categoryConfig = getCategoryConfig(slug);
  if (categoryConfig) {
    return categoryConfig.name;
  }

  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function Breadcrumbs({
  customItems,
  className = '',
  showJsonLd = true,
}: BreadcrumbsProps) {
  const pathname = usePathname();

  let resolvedItems: BreadcrumbItem[] = [];

  if (customItems && customItems.length > 0) {
    // If custom items are provided, ignore leading "Home" if already passed by caller
    resolvedItems = customItems[0].label.toLowerCase() === 'home'
      ? customItems.slice(1)
      : [...customItems];
  } else {
    // Automatic route parsing
    const segments = (pathname || '').split('/').filter(Boolean);

    // If on homepage or empty path, no breadcrumbs needed
    if (segments.length === 0) {
      return null;
    }

    let accumulated = '';
    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      accumulated += `/${segment}`;
      const isLast = i === segments.length - 1;

      const staticEntry = STATIC_SEGMENT_MAP[segment.toLowerCase()];
      if (staticEntry) {
        resolvedItems.push({
          label: staticEntry.label,
          href: isLast ? undefined : staticEntry.defaultHref || accumulated,
        });
      } else {
        resolvedItems.push({
          label: formatSlugToLabel(segment),
          href: isLast ? undefined : accumulated,
        });
      }
    }
  }

  if (resolvedItems.length === 0) {
    return null;
  }

  // Schema.org BreadcrumbList for rich snippets
  const jsonLd = showJsonLd
    ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://fruit-comestible.ch',
          },
          ...resolvedItems.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 2,
            name: item.label,
            ...(item.href ? { item: `https://fruit-comestible.ch${item.href}` } : {}),
          })),
        ],
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      <nav
        aria-label="Breadcrumb"
        className={`overflow-x-auto whitespace-nowrap no-scrollbar scrollbar-none py-1 ${className}`}
      >
        <ol className="flex items-center gap-1.5 sm:gap-2 text-xs">
          {/* 1. Root: Home */}
          <li className="inline-flex items-center shrink-0">
            <Link
              href="/"
              aria-label="Fruit Comestible Startseite"
              className="inline-flex items-center gap-1.5 text-stone-500 hover:text-stone-900 transition-colors font-medium group"
            >
              <Home className="w-3.5 h-3.5 text-stone-400 group-hover:text-stone-700 transition-colors" />
              <span>Home</span>
            </Link>
          </li>

          {/* 2. Trailing Breadcrumbs */}
          {resolvedItems.map((item, index) => {
            const isLast = index === resolvedItems.length - 1;
            return (
              <React.Fragment key={`${item.label}-${index}`}>
                <li
                  className="inline-flex items-center shrink-0 text-stone-300"
                  aria-hidden="true"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </li>

                <li className="inline-flex items-center min-w-0">
                  {item.href && !isLast ? (
                    <Link
                      href={item.href}
                      className="text-stone-500 hover:text-stone-900 transition-colors font-medium hover:underline underline-offset-4 shrink-0"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span
                      className="font-bold text-stone-900 truncate max-w-[200px] sm:max-w-xs md:max-w-md lg:max-w-none"
                      aria-current="page"
                      title={item.label}
                    >
                      {item.label}
                    </span>
                  )}
                </li>
              </React.Fragment>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

export default Breadcrumbs;
