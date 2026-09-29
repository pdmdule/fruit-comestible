export interface CategoryConfig {
  slug: string;
  aliases: string[];
  name: string;
  h1: string;
  subtitle: string;
  metaTitle: string;
  metaDescription: string;
  badgeText: string;
  canonicalPath: string;
  matches: (product: {
    category?: string;
    form?: string;
    slug: string;
    name_de: string;
  }) => boolean;
}

export const CATEGORIES_CONFIG: CategoryConfig[] = [
  {
    slug: 'beeren',
    aliases: ['fruechte', 'beeren-fruechte', 'ganz'],
    name: 'Früchte & Beeren',
    h1: 'Gefriergetrocknete Früchte & Beeren',
    subtitle:
      'Ganze, sonnengereifte Beeren und Fruchtstücke in Schweizer Spitzenqualität. Knusprig, 100% naturbelassen und reich an wertvollen Vitaminen.',
    metaTitle: 'Gefriergetrocknete Früchte & Beeren kaufen | fruit-Comestible Schweiz',
    metaDescription:
      'Gefriergetrocknete Beeren & Früchte aus der Schweiz kaufen. Ganze Himbeeren, Erdbeeren, Heidelbeeren uvm. – schonend vakuumiert und herrlich knusprig.',
    badgeText: '100% Naturbelassen',
    canonicalPath: '/shop/beeren',
    matches: (p) => p.form === 'Ganz' && p.category !== 'Schokolade',
  },
  {
    slug: 'fruchtpulver',
    aliases: ['pulver'],
    name: 'Fruchtpulver',
    h1: 'Gefriergetrocknetes Fruchtpulver',
    subtitle:
      '100% reines Fruchtpulver ohne jegliche Zusatzstoffe. Perfekt für cremige Smoothies, Vital-Shakes, Porridge-Bowls und kreative Pâtisserie.',
    metaTitle: 'Gefriergetrocknetes Fruchtpulver kaufen | fruit-Comestible Schweiz',
    metaDescription:
      'Feinstes Schweizer Fruchtpulver ohne künstliche Aromen oder Zuckerzusatz. Intensiver Naturgeschmack für Shakes, Smoothies und Backkreationen.',
    badgeText: '100% Naturrein',
    canonicalPath: '/shop/fruchtpulver',
    matches: (p) => {
      const slug = p.slug.toLowerCase();
      const name = p.name_de.toLowerCase();
      return (
        p.category === 'Fruchtpulver' ||
        p.form === 'Pulver' ||
        slug.includes('pulver') ||
        name.includes('pulver')
      );
    },
  },
  {
    slug: 'granulat',
    aliases: ['crunch'],
    name: 'Granulat & Crunch',
    h1: 'Gefriergetrocknetes Granulat & Crunch',
    subtitle:
      'Herrlich knuspriges Fruchtgranulat für den perfekten Crunch im Müsli, Joghurt oder Dessert. Intensiv im Aroma und reich an Ballaststoffen.',
    metaTitle: 'Gefriergetrocknetes Granulat kaufen | fruit-Comestible Schweiz',
    metaDescription:
      'Knuspriges Fruchtgranulat schonend gefriergetrocknet aus Schweizer Hand. Perfekt für Porridge, Joghurt und Desserts. 100% Frucht ohne Zuckerzusatz.',
    badgeText: 'Knusprig & Aromatisch',
    canonicalPath: '/shop/granulat',
    matches: (p) => {
      const slug = p.slug.toLowerCase();
      const name = p.name_de.toLowerCase();
      return (
        p.category === 'Granulat & Crunch' ||
        p.form === 'Granulat' ||
        slug.includes('granulat') ||
        name.includes('granulat')
      );
    },
  },
  {
    slug: 'mixes',
    aliases: ['snacks', 'mix'],
    name: 'Snacks & Mixes',
    h1: 'Frucht-Mixes & Gesunde Snacks',
    subtitle:
      'Abgestimmte Früchtemischungen und praktische Vitamin-Snacks für das Büro, Sportler oder die gesunde Zwischenmahlzeit.',
    metaTitle: 'Frucht-Mixes & Gesunde Snacks kaufen | fruit-Comestible Schweiz',
    metaDescription:
      'Gesunde Frucht-Snacks & Müsli-Mischungen bestellen. Schnelle Energie für Büro, Schule und Sport. Natürlich, vegan und direkt aus der Schweiz.',
    badgeText: 'Für Büro & Unterwegs',
    canonicalPath: '/shop/mixes',
    matches: (p) => {
      const slug = p.slug.toLowerCase();
      return (
        p.category === 'Snacks & Mixes' ||
        slug.includes('snack') ||
        slug.includes('probier') ||
        slug.includes('booster') ||
        slug.includes('muesli') ||
        slug.includes('detox')
      );
    },
  },
  {
    slug: 'schokolade',
    aliases: ['choco', 'chocolate'],
    name: 'Schokolade',
    h1: 'Gefriergetrocknete Früchte in Schweizer Schokolade',
    subtitle:
      'Zartschmelzende Schweizer Milchschokolade trifft auf knusprige Beeren. Der edle Genussmoment für anspruchsvolle Feinschmecker.',
    metaTitle: 'Früchte in Schweizer Schokolade kaufen | fruit-Comestible Schweiz',
    metaDescription:
      'Gefriergetrocknete Erdbeeren & Himbeeren umhüllt von zartschmelzender Schweizer Milchschokolade. Jetzt edle Fruchtschokolade online bestellen.',
    badgeText: 'Edler Schweizer Genuss',
    canonicalPath: '/shop/schokolade',
    matches: (p) => p.category === 'Schokolade' || p.slug.includes('schokolade'),
  },
  {
    slug: 'geschenkboxen',
    aliases: ['boxen', 'geschenke'],
    name: 'Geschenkboxen',
    h1: 'Fruchtige Geschenkboxen & Probierboxen',
    subtitle:
      'Stilvoll zusammengestellte Geschenkboxen mit knusprigen Früchten. Die gesunde Geschenkidee für Familie, Freunde und Geschäftspartner.',
    metaTitle: 'Fruchtige Geschenkboxen & Probiersets kaufen | fruit-Comestible Schweiz',
    metaDescription:
      'Hochwertige Geschenkboxen mit gefriergetrockneten Früchten und Probiersäckli. Das gesunde Schweizer Geschenk für jeden Anlass schnell geliefert.',
    badgeText: 'Liebevoll Verpackt',
    canonicalPath: '/shop/geschenkboxen',
    matches: (p) => p.category === 'Geschenkboxen' || p.slug.includes('box'),
  },
];

export const SHOP_NAV_TABS = [
  { id: 'all', slug: 'all', label: 'Alle', href: '/shop' },
  { id: 'beeren', slug: 'beeren', label: 'Früchte & Beeren', href: '/shop/beeren' },
  { id: 'fruchtpulver', slug: 'fruchtpulver', label: 'Fruchtpulver', href: '/shop/fruchtpulver' },
  { id: 'granulat', slug: 'granulat', label: 'Granulat & Crunch', href: '/shop/granulat' },
  { id: 'mixes', slug: 'mixes', label: 'Snacks & Mixes', href: '/shop/mixes' },
  { id: 'schokolade', slug: 'schokolade', label: 'Schokolade', href: '/shop/schokolade' },
  { id: 'geschenkboxen', slug: 'geschenkboxen', label: 'Geschenkboxen', href: '/shop/geschenkboxen' },
];

export function getCategoryConfig(slugOrAlias: string): CategoryConfig | undefined {
  const clean = slugOrAlias.toLowerCase().trim();
  return CATEGORIES_CONFIG.find(
    (c) => c.slug === clean || c.aliases.includes(clean)
  );
}
