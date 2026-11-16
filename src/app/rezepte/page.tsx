import type { Metadata } from 'next';
export { default, dynamic } from '@/app/blog/page';

export const metadata: Metadata = {
  title: 'Rezepte mit gefriergetrockneten Früchten',
  description:
    'Entdecken Sie kreative Rezepte mit 100 % natürlichen gefriergetrockneten Früchten, Smoothies, Bowls und feinen Desserts – von Fruit-Comestible Schweiz.',
  alternates: {
    canonical: 'https://www.fruit-comestible.ch/rezepte',
  },
  openGraph: {
    title: 'Rezepte mit gefriergetrockneten Früchten | Fruit-Comestible Schweiz',
    description:
      'Kreative Rezepte und Inspirationen für Frühstück, Desserts und Smoothies mit gefriergetrockneten Früchten.',
    url: 'https://www.fruit-comestible.ch/rezepte',
    siteName: 'Fruit-Comestible',
    locale: 'de_CH',
    type: 'website',
  },
};
