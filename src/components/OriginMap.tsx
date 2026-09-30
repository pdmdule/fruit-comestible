'use client';

import React from 'react';
import ProductOriginMap from '@/components/ProductOriginMap';
import { countryCoords, resolveCountryKey } from '@/lib/productOrigins';

export { countryCoords, resolveCountryKey };

export interface OriginMapProps {
  slug?: string;
  originCountry?: string | null;
  productName?: string;
}

export default function OriginMap({
  slug = '',
  originCountry = 'Schweiz',
  productName = 'Frucht',
}: OriginMapProps) {
  return (
    <ProductOriginMap
      slug={slug}
      originCountry={originCountry || 'Schweiz'}
      productName={productName}
    />
  );
}
