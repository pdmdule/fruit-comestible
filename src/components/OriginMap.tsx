'use client';

import React from 'react';
import ProductOriginMap from '@/components/ProductOriginMap';
import {
  PRODUCT_ORIGINS,
  getProductOrigin,
  countryCoords,
  resolveCountryKey,
  type ProductOriginData,
} from '@/data/productOrigins';

export { countryCoords, resolveCountryKey };

export interface OriginMapProps {
  slug?: string;
  originCountry?: string | null;
  productName?: string;
  originData?: ProductOriginData;
}

export default function OriginMap({
  slug = '',
  originCountry = 'Schweiz',
  productName = 'Frucht',
  originData,
}: OriginMapProps) {
  const currentOrigin =
    originData || (slug ? PRODUCT_ORIGINS[slug] || getProductOrigin(slug, originCountry) : undefined);

  return (
    <ProductOriginMap
      slug={slug}
      originCountry={originCountry || 'Schweiz'}
      productName={productName}
      originData={currentOrigin}
    />
  );
}
