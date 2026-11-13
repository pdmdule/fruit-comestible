export interface FormLink {
  form: 'Ganz' | 'Granulat' | 'Pulver' | string;
  label: string;
  href: string;
  isActive: boolean;
}

export interface FruitFamilyDef {
  familyKey: string;
  baseFruitName: string;
  dbSlug: string;
  forms: {
    form: 'Ganz' | 'Granulat' | 'Pulver';
    label: string; // 'Ganze Früchte' | 'Knusper-Granulat' | 'Fruchtpulver'
    slug: string;
    aliases: string[];
    name: string;
    subtitle: string;
    category: string;
    variantMatch: (formDe?: string, labelDe?: string) => boolean;
  }[];
}

export const FRUIT_FAMILIES: FruitFamilyDef[] = [
  {
    familyKey: 'erdbeere',
    baseFruitName: 'Erdbeeren',
    dbSlug: 'gefriergetrocknete-erdbeere',
    forms: [
      {
        form: 'Ganz',
        label: 'Ganze Früchte',
        slug: 'erdbeeren-ganz',
        aliases: ['gefriergetrocknete-erdbeere', 'erdbeeren-ganz', 'erdbeere-ganz'],
        name: 'Gefriergetrocknete Erdbeeren (Ganz)',
        subtitle: 'Sonnengereifte Schweizer Erdbeeren in schonend gefriergetrockneten Hälften.',
        category: 'Früchte & Beeren',
        variantMatch: (form, label) => {
          const str = `${form || ''} ${label || ''}`.toLowerCase();
          return str.includes('hälfte') || str.includes('ganz') || (!str.includes('granulat') && !str.includes('pulver'));
        },
      },
      {
        form: 'Granulat',
        label: 'Granulat',
        slug: 'erdbeergranulat',
        aliases: ['erdbeergranulat', 'erdbeer-granulat', 'erdbeeren-granulat'],
        name: 'Erdbeergranulat',
        subtitle: 'Knuspriges Granulat aus gefriergetrockneten Erdbeeren für Bowls und Müsli.',
        category: 'Granulat & Crunch',
        variantMatch: (form, label) => {
          const str = `${form || ''} ${label || ''}`.toLowerCase();
          return str.includes('granulat');
        },
      },
      {
        form: 'Pulver',
        label: 'Fruchtpulver',
        slug: 'erdbeerpulver',
        aliases: ['erdbeerpulver', 'erdbeer-pulver', 'erdbeeren-pulver'],
        name: 'Erdbeerpulver',
        subtitle: '100% naturreines Fruchtpulver aus sonnengereiften Erdbeeren ohne Zusätze.',
        category: 'Fruchtpulver',
        variantMatch: (form, label) => {
          const str = `${form || ''} ${label || ''}`.toLowerCase();
          return str.includes('pulver');
        },
      },
    ],
  },
  {
    familyKey: 'himbeere',
    baseFruitName: 'Himbeeren',
    dbSlug: 'gefriergetrocknete-himbeeren',
    forms: [
      {
        form: 'Ganz',
        label: 'Ganze Früchte',
        slug: 'himbeeren-ganz',
        aliases: ['gefriergetrocknete-himbeeren', 'himbeeren-ganz', 'himbeere-ganz'],
        name: 'Gefriergetrocknete Himbeeren (Ganz)',
        subtitle: 'Ganze, hocharomatische Schweizer Himbeeren schonend vakuumiert.',
        category: 'Früchte & Beeren',
        variantMatch: (form, label) => {
          const str = `${form || ''} ${label || ''}`.toLowerCase();
          return str.includes('ganz') || (!str.includes('granulat') && !str.includes('pulver'));
        },
      },
      {
        form: 'Granulat',
        label: 'Granulat',
        slug: 'himbeergranulat',
        aliases: ['himbeergranulat', 'himbeer-granulat', 'himbeeren-granulat'],
        name: 'Himbeergranulat',
        subtitle: 'Fruchtig-knuspriger Himbeer-Crunch für Desserts, Joghurt und Porridge.',
        category: 'Granulat & Crunch',
        variantMatch: (form, label) => {
          const str = `${form || ''} ${label || ''}`.toLowerCase();
          return str.includes('granulat');
        },
      },
      {
        form: 'Pulver',
        label: 'Fruchtpulver',
        slug: 'himbeerpulver',
        aliases: ['himbeerpulver', 'himbeer-pulver', 'himbeeren-pulver'],
        name: 'Himbeerpulver',
        subtitle: 'Intensives, vitaminreiches Schweizer Himbeerpulver ohne jeglichen Zuckerzusatz.',
        category: 'Fruchtpulver',
        variantMatch: (form, label) => {
          const str = `${form || ''} ${label || ''}`.toLowerCase();
          return str.includes('pulver');
        },
      },
    ],
  },
  {
    familyKey: 'sauerkirsche',
    baseFruitName: 'Sauerkirschen',
    dbSlug: 'gefriergetrocknete-sauerkirsche',
    forms: [
      {
        form: 'Ganz',
        label: 'Ganze Früchte',
        slug: 'sauerkirsche-ganz',
        aliases: ['gefriergetrocknete-sauerkirsche', 'sauerkirsche-ganz', 'sauerkirschen-ganz'],
        name: 'Gefriergetrocknete Sauerkirschen (Ganz)',
        subtitle: 'Herrlich fruchtig-säuerliche ganze Sauerkirschen in Spitzenqualität.',
        category: 'Früchte & Beeren',
        variantMatch: (form, label) => {
          const str = `${form || ''} ${label || ''}`.toLowerCase();
          return str.includes('ganz') || (!str.includes('granulat') && !str.includes('pulver'));
        },
      },
      {
        form: 'Granulat',
        label: 'Granulat',
        slug: 'sauerkirsche-granulat',
        aliases: ['sauerkirsche-granulat', 'sauerkirschgranulat', 'sauerkirschen-granulat'],
        name: 'Sauerkirschgranulat',
        subtitle: 'Knuspriges Sauerkirsch-Granulat mit herb-frischer Geschmacksnote.',
        category: 'Granulat & Crunch',
        variantMatch: (form, label) => {
          const str = `${form || ''} ${label || ''}`.toLowerCase();
          return str.includes('granulat');
        },
      },
      {
        form: 'Pulver',
        label: 'Fruchtpulver',
        slug: 'sauerkirsche-pulver',
        aliases: ['sauerkirsche-pulver', 'sauerkirschpulver', 'sauerkirschen-pulver'],
        name: 'Sauerkirschpulver',
        subtitle: 'Feinstes Sauerkirschpulver zum Backen, Kochen und Verfeinern.',
        category: 'Fruchtpulver',
        variantMatch: (form, label) => {
          const str = `${form || ''} ${label || ''}`.toLowerCase();
          return str.includes('pulver');
        },
      },
    ],
  },
  {
    familyKey: 'heidelbeere',
    baseFruitName: 'Heidelbeeren',
    dbSlug: 'gefriergetrocknete-echte-heidelbeere',
    forms: [
      {
        form: 'Ganz',
        label: 'Ganze Früchte',
        slug: 'echte-heidelbeere-ganz',
        aliases: ['gefriergetrocknete-echte-heidelbeere', 'echte-heidelbeere-ganz', 'heidelbeeren-ganz'],
        name: 'Gefriergetrocknete Echte Heidelbeeren',
        subtitle: 'Wilde Waldheidelbeeren aus nachhaltiger Ernte – reich an Anthocyanen.',
        category: 'Früchte & Beeren',
        variantMatch: (form, label) => {
          const str = `${form || ''} ${label || ''}`.toLowerCase();
          return str.includes('ganz') || !str.includes('pulver');
        },
      },
      {
        form: 'Pulver',
        label: 'Fruchtpulver',
        slug: 'echte-heidelbeere-pulver',
        aliases: ['echte-heidelbeere-pulver', 'heidelbeerpulver', 'heidelbeeren-pulver'],
        name: 'Heidelbeerpulver',
        subtitle: 'Tiefblaues, hochkonzentriertes Heidelbeerpulver für Shakes und Bowls.',
        category: 'Fruchtpulver',
        variantMatch: (form, label) => {
          const str = `${form || ''} ${label || ''}`.toLowerCase();
          return str.includes('pulver');
        },
      },
    ],
  },
  {
    familyKey: 'aprikose',
    baseFruitName: 'Aprikosen',
    dbSlug: 'gefriergetrocknete-aprikose',
    forms: [
      {
        form: 'Ganz',
        label: 'Schnitze / Stücke',
        slug: 'aprikose-schnitze',
        aliases: ['gefriergetrocknete-aprikose', 'aprikose-schnitze', 'aprikosen-ganz'],
        name: 'Gefriergetrocknete Aprikosen (Schnitze)',
        subtitle: 'Sonnenverwöhnte Walliser Aprikosen in knusprigen Spalten.',
        category: 'Früchte & Beeren',
        variantMatch: (form, label) => {
          const str = `${form || ''} ${label || ''}`.toLowerCase();
          return str.includes('schnitz') || str.includes('ganz') || (!str.includes('granulat') && !str.includes('pulver'));
        },
      },
      {
        form: 'Granulat',
        label: 'Granulat',
        slug: 'aprikose-granulat',
        aliases: ['aprikose-granulat', 'aprikosengranulat', 'aprikosen-granulat'],
        name: 'Aprikosengranulat',
        subtitle: 'Feiner Aprikosen-Crunch mit samtig-süssem Schweizer Naturaroma.',
        category: 'Granulat & Crunch',
        variantMatch: (form, label) => {
          const str = `${form || ''} ${label || ''}`.toLowerCase();
          return str.includes('granulat');
        },
      },
      {
        form: 'Pulver',
        label: 'Fruchtpulver',
        slug: 'aprikose-pulver',
        aliases: ['aprikose-pulver', 'aprikosenpulver', 'aprikosen-pulver'],
        name: 'Aprikosenpulver',
        subtitle: 'Reines Aprikosenpulver für feine Pâtisserie, Quark und Desserts.',
        category: 'Fruchtpulver',
        variantMatch: (form, label) => {
          const str = `${form || ''} ${label || ''}`.toLowerCase();
          return str.includes('pulver');
        },
      },
    ],
  },
  {
    familyKey: 'zwetschgen',
    baseFruitName: 'Zwetschgen',
    dbSlug: 'gefriergetrocknete-zwetschgen',
    forms: [
      {
        form: 'Ganz',
        label: 'Schnitze / Stücke',
        slug: 'zwetschgen-schnitze',
        aliases: ['gefriergetrocknete-zwetschgen', 'zwetschgen-schnitze', 'zwetschgen-ganz'],
        name: 'Gefriergetrocknete Zwetschgen (Schnitze)',
        subtitle: 'Klassische Schweizer Zwetschgenspalten, intensiv aromatisch und knusprig.',
        category: 'Früchte & Beeren',
        variantMatch: (form, label) => {
          const str = `${form || ''} ${label || ''}`.toLowerCase();
          return str.includes('schnitz') || str.includes('ganz') || (!str.includes('granulat') && !str.includes('pulver'));
        },
      },
      {
        form: 'Granulat',
        label: 'Granulat',
        slug: 'zwetschgen-granulat',
        aliases: ['zwetschgen-granulat', 'zwetschgengranulat'],
        name: 'Zwetschgengranulat',
        subtitle: 'Würziger Zwetschgen-Crunch für Porridge, Joghurt und Herbstgebäck.',
        category: 'Granulat & Crunch',
        variantMatch: (form, label) => {
          const str = `${form || ''} ${label || ''}`.toLowerCase();
          return str.includes('granulat');
        },
      },
      {
        form: 'Pulver',
        label: 'Fruchtpulver',
        slug: 'zwetschgen-pulver',
        aliases: ['zwetschgen-pulver', 'zwetschgenpulver'],
        name: 'Zwetschgenpulver',
        subtitle: 'Naturreines Schweizer Zwetschgenpulver für Teige, Shakes und Cremes.',
        category: 'Fruchtpulver',
        variantMatch: (form, label) => {
          const str = `${form || ''} ${label || ''}`.toLowerCase();
          return str.includes('pulver');
        },
      },
    ],
  },
  {
    familyKey: 'apfel',
    baseFruitName: 'Äpfel',
    dbSlug: 'gefriergetrockneter-apfel',
    forms: [
      {
        form: 'Ganz',
        label: 'Würfel / Stücke',
        slug: 'apfel-Gewurfelt',
        aliases: ['gefriergetrockneter-apfel', 'apfel-gewurfelt', 'apfel-ganz', 'apfelscheiben-ganz'],
        name: 'Gefriergetrocknete Apfelstücke (Ganz)',
        subtitle: 'Knusprige Schweizer Apfelwürfel mit herrlich erfrischendem Biss.',
        category: 'Früchte & Beeren',
        variantMatch: (form, label) => {
          const str = `${form || ''} ${label || ''}`.toLowerCase();
          return str.includes('würfel') || str.includes('gewürfelt') || str.includes('ganz') || (!str.includes('granulat') && !str.includes('pulver'));
        },
      },
      {
        form: 'Granulat',
        label: 'Granulat',
        slug: 'apfel-granulat',
        aliases: ['apfel-granulat', 'apfelgranulat'],
        name: 'Apfelgranulat',
        subtitle: 'Goldenes Apfelgranulat mit natürlicher Schweizer Apfelsüsse.',
        category: 'Granulat & Crunch',
        variantMatch: (form, label) => {
          const str = `${form || ''} ${label || ''}`.toLowerCase();
          return str.includes('granulat');
        },
      },
      {
        form: 'Pulver',
        label: 'Fruchtpulver',
        slug: 'apfel-pulver',
        aliases: ['apfel-pulver', 'apfelpulver'],
        name: 'Apfelpulver',
        subtitle: 'Reines Schweizer Apfelpulver reich an Ballaststoffen und natürlichem Pektin.',
        category: 'Fruchtpulver',
        variantMatch: (form, label) => {
          const str = `${form || ''} ${label || ''}`.toLowerCase();
          return str.includes('pulver');
        },
      },
    ],
  },
  {
    familyKey: 'banane',
    baseFruitName: 'Bananen',
    dbSlug: 'gefriergetrocknete-banane',
    forms: [
      {
        form: 'Ganz',
        label: 'Scheiben',
        slug: 'banane-scheiben',
        aliases: ['gefriergetrocknete-banane', 'banane-scheiben', 'bananen-ganz'],
        name: 'Gefriergetrocknete Bananenscheiben',
        subtitle: 'Süsse, knusprige Bananenscheiben ohne Fett, ohne Frittieren und ohne Zusätze.',
        category: 'Früchte & Beeren',
        variantMatch: (form, label) => {
          const str = `${form || ''} ${label || ''}`.toLowerCase();
          return str.includes('scheibe') || str.includes('ganz') || !str.includes('pulver');
        },
      },
      {
        form: 'Pulver',
        label: 'Fruchtpulver',
        slug: 'banane-pulver',
        aliases: ['banane-pulver', 'bananenpulver', 'bananen-pulver'],
        name: 'Bananenpulver',
        subtitle: 'Cremiges Bananenpulver für natürliche Shakes, Smoothies und Porridge.',
        category: 'Fruchtpulver',
        variantMatch: (form, label) => {
          const str = `${form || ''} ${label || ''}`.toLowerCase();
          return str.includes('pulver');
        },
      },
    ],
  },
  {
    familyKey: 'mango',
    baseFruitName: 'Mango',
    dbSlug: 'gefriergetrocknete-mango',
    forms: [
      {
        form: 'Ganz',
        label: 'Würfel / Stücke',
        slug: 'mango-wuerfel',
        aliases: ['gefriergetrocknete-mango', 'mango-wuerfel', 'mango-ganz'],
        name: 'Gefriergetrocknete Mango (Würfel)',
        subtitle: 'Exotische Mangowürfel voller Tropenaroma und sonniger Fülle.',
        category: 'Früchte & Beeren',
        variantMatch: (form, label) => {
          const str = `${form || ''} ${label || ''}`.toLowerCase();
          return str.includes('würfel') || str.includes('streifen') || str.includes('ganz') || !str.includes('pulver');
        },
      },
      {
        form: 'Pulver',
        label: 'Fruchtpulver',
        slug: 'mangopulver',
        aliases: ['mangopulver', 'mango-pulver'],
        name: 'Mangopulver',
        subtitle: 'Sonnengelbes Mangopulver für exotische Drinks, Desserts und Currys.',
        category: 'Fruchtpulver',
        variantMatch: (form, label) => {
          const str = `${form || ''} ${label || ''}`.toLowerCase();
          return str.includes('pulver');
        },
      },
    ],
  },
  {
    familyKey: 'brombeere',
    baseFruitName: 'Brombeeren',
    dbSlug: 'gefriergetrocknete-brombeere',
    forms: [
      {
        form: 'Ganz',
        label: 'Ganze Früchte',
        slug: 'brombeere-ganz',
        aliases: ['gefriergetrocknete-brombeere', 'brombeere-ganz', 'brombeeren-ganz'],
        name: 'Gefriergetrocknete Brombeeren (Ganz)',
        subtitle: 'Ganze, samtig-dunkle Brombeeren mit vollem Waldbeergeschmack.',
        category: 'Früchte & Beeren',
        variantMatch: (form, label) => {
          const str = `${form || ''} ${label || ''}`.toLowerCase();
          return str.includes('ganz') || !str.includes('pulver');
        },
      },
      {
        form: 'Pulver',
        label: 'Fruchtpulver',
        slug: 'brombeere-pulver',
        aliases: ['brombeere-pulver', 'brombeerpulver', 'brombeeren-pulver'],
        name: 'Brombeerpulver',
        subtitle: 'Feines Brombeerpulver reich an Vitamin C und tiefdunklen Vitalstoffen.',
        category: 'Fruchtpulver',
        variantMatch: (form, label) => {
          const str = `${form || ''} ${label || ''}`.toLowerCase();
          return str.includes('pulver');
        },
      },
    ],
  },
  {
    familyKey: 'rote-drachenfrucht',
    baseFruitName: 'Rote Drachenfrucht',
    dbSlug: 'rote-drachenfrucht-schnitze',
    forms: [
      {
        form: 'Ganz',
        label: 'Schnitze / Scheiben',
        slug: 'rote-drachenfrucht-schnitze',
        aliases: ['rote-drachenfrucht-schnitze', 'drachenfrucht-schnitze'],
        name: 'Gefriergetrocknete Rote Drachenfrucht (Schnitze)',
        subtitle: 'Exotische rote Pitaya-Schnitze voller intensiver Farbe und milder Fruchtsüsse.',
        category: 'Früchte & Beeren',
        variantMatch: (form, label) => {
          const str = `${form || ''} ${label || ''}`.toLowerCase();
          return str.includes('schnitz') || str.includes('ganz') || !str.includes('granulat');
        },
      },
      {
        form: 'Granulat',
        label: 'Granulat',
        slug: 'rote-drachenfrucht-granulat',
        aliases: ['rote-drachenfrucht-granulat', 'drachenfrucht-granulat'],
        name: 'Gefriergetrocknete Rote Drachenfrucht (Granulat)',
        subtitle: 'Farbenfroher Drachenfrucht-Crunch für Bowls, Müesli und Desserts.',
        category: 'Granulat & Crunch',
        variantMatch: (form, label) => {
          const str = `${form || ''} ${label || ''}`.toLowerCase();
          return str.includes('granulat');
        },
      },
    ],
  },
  {
    familyKey: 'schwarze-johannisbeere',
    baseFruitName: 'Schwarze Johannisbeeren',
    dbSlug: 'gefriergetrocknete-schwarze-johannisbeere',
    forms: [
      {
        form: 'Ganz',
        label: 'Ganze Früchte',
        slug: 'schwarze-johannisbeere-ganz',
        aliases: ['gefriergetrocknete-schwarze-johannisbeere', 'schwarze-johannisbeere-ganz'],
        name: 'Gefriergetrocknete Schwarze Johannisbeeren',
        subtitle: 'Kräftig-aromatische Cassisbeeren mit herb-frischem Vitamin-C-Kick.',
        category: 'Früchte & Beeren',
        variantMatch: (form, label) => {
          const str = `${form || ''} ${label || ''}`.toLowerCase();
          return str.includes('ganz') || !str.includes('pulver');
        },
      },
      {
        form: 'Pulver',
        label: 'Fruchtpulver',
        slug: 'schwarze-johannisbeere-pulver',
        aliases: ['schwarze-johannisbeere-pulver', 'cassis-pulver'],
        name: 'Schwarze Johannisbeeren Pulver',
        subtitle: 'Reines Cassispulver für kräftige Farben und tägliche Immununterstützung.',
        category: 'Fruchtpulver',
        variantMatch: (form, label) => {
          const str = `${form || ''} ${label || ''}`.toLowerCase();
          return str.includes('pulver');
        },
      },
    ],
  },
  {
    familyKey: 'orange',
    baseFruitName: 'Orange',
    dbSlug: 'gefriergetrocknete-orange',
    forms: [
      {
        form: 'Pulver',
        label: 'Fruchtpulver',
        slug: 'orange-pulver',
        aliases: ['gefriergetrocknete-orange', 'orange-pulver', 'orangenpulver'],
        name: 'Gefriergetrocknetes Orangenpulver',
        subtitle: 'Sonniges Zitrusaroma und natürliche Frische in schonend getrocknetem Orangenpulver.',
        category: 'Fruchtpulver',
        variantMatch: () => true,
      },
    ],
  },
  {
    familyKey: 'zitrone',
    baseFruitName: 'Zitrone',
    dbSlug: 'gefriergetrocknete-zitrone',
    forms: [
      {
        form: 'Pulver',
        label: 'Fruchtpulver',
        slug: 'zitrone-pulver',
        aliases: ['gefriergetrocknete-zitrone', 'zitrone-pulver', 'zitronenpulver'],
        name: 'Gefriergetrocknetes Zitronenpulver',
        subtitle: 'Herrlich spritzige Zitronenfrische für Desserts, Dressings und Getränke.',
        category: 'Fruchtpulver',
        variantMatch: () => true,
      },
    ],
  },
  {
    familyKey: 'ananas',
    baseFruitName: 'Ananas',
    dbSlug: 'gefriergetrocknete-ananas',
    forms: [
      {
        form: 'Granulat',
        label: 'Granulat',
        slug: 'ananas-granulat',
        aliases: ['gefriergetrocknete-ananas', 'ananas-granulat', 'ananasgranulat'],
        name: 'Gefriergetrocknete Ananas (Granulat)',
        subtitle: 'Knusprig-süsser Ananas-Crunch für tropisches Sommerfeeling im Müsli.',
        category: 'Granulat & Crunch',
        variantMatch: () => true,
      },
    ],
  },
  {
    familyKey: 'maracuja',
    baseFruitName: 'Maracuja',
    dbSlug: 'gefriergetrocknete-maracuja',
    forms: [
      {
        form: 'Granulat',
        label: 'Granulat',
        slug: 'maracuja-granulat',
        aliases: ['gefriergetrocknete-maracuja', 'maracuja-granulat', 'maracujagranulat'],
        name: 'Gefriergetrocknete Maracuja (Granulat)',
        subtitle: 'Prickelnd exotischer Maracuja-Crunch mit intensiv säuerlich-süssem Aroma.',
        category: 'Granulat & Crunch',
        variantMatch: () => true,
      },
    ],
  },
];

/**
 * Returns the matching fruit family, active form item, and sibling links.
 */
export function getFruitFamilyInfo(requestedSlug: string) {
  const cleanSlug = requestedSlug.toLowerCase().trim();

  for (const family of FRUIT_FAMILIES) {
    // Check if the slug matches any of the family's forms or aliases
    for (const formItem of family.forms) {
      if (
        formItem.slug.toLowerCase() === cleanSlug ||
        formItem.aliases.some((a) => a.toLowerCase() === cleanSlug) ||
        (family.dbSlug.toLowerCase() === cleanSlug && formItem.form === 'Ganz')
      ) {
        // Found matching family & active form!
        const siblingLinks: FormLink[] = family.forms.map((f) => ({
          form: f.form,
          label: f.label,
          href: `/produkte/${f.slug}`,
          isActive: f.slug.toLowerCase() === formItem.slug.toLowerCase(),
        }));

        return {
          family,
          activeForm: formItem,
          siblingLinks: siblingLinks.length > 1 ? siblingLinks : [],
          dbSlugToFetch: family.dbSlug,
        };
      }
    }
  }

  // Not part of a multi-form fruit family
  return null;
}

/**
 * Expands raw database products so that each processing form (Ganz, Granulat, Pulver)
 * is represented as its own distinct product card in the Shop Catalog.
 */
export function expandProductsForCatalog(products: any[]) {
  const result: any[] = [];
  const processedSlugs = new Set<string>();

  for (const product of products) {
    const pSlug = product.slug.toLowerCase().trim();

    // Check if product is already an individual form row in DB
    if (product.form || pSlug.endsWith('-ganz') || pSlug.endsWith('pulver') || pSlug.endsWith('granulat')) {
      result.push(product);
      processedSlugs.add(product.slug);
      continue;
    }

    // Check if product matches a known fruit family
    const family = FRUIT_FAMILIES.find(
      (f) => f.dbSlug === pSlug || f.forms.some((form) => form.aliases.includes(pSlug))
    );

    const rawVariants = product.variants || product.product_variants || [];
    if (family && rawVariants && rawVariants.length > 0) {
      // Create a separate catalog card for each form that has variants or is defined in family
      for (const formDef of family.forms) {
        // Filter variants belonging to this form
        const matchingVariants = rawVariants.filter((v: any) =>
          formDef.variantMatch(v.form || v.form_de, v.label_de || v.title)
        );

        // If no matching variants found, fallback to 100g and 200g of base variants
        const variantsForThisForm =
          matchingVariants.length > 0 ? matchingVariants : rawVariants;

        const expandedItem = {
          ...product,
          id: `${product.id}-${formDef.form.toLowerCase()}`,
          slug: formDef.slug,
          name_de: formDef.name,
          subtitle_de: formDef.subtitle || product.subtitle_de,
          category: formDef.category,
          form: formDef.form,
          variants: variantsForThisForm,
          product_variants: variantsForThisForm,
        };

        result.push(expandedItem);
        processedSlugs.add(formDef.slug);
      }
    } else {
      // Single products (Mixes, Boxes, Chocolate, or already individual)
      let cat = product.category;
      let form = product.form;
      if (!cat) {
        if (pSlug.includes('schokolade')) {
          cat = 'Schokolade';
          form = form || 'Ganz';
        } else if (pSlug.includes('box')) {
          cat = 'Geschenkboxen';
          form = form || 'Box';
        } else {
          cat = 'Snacks & Mixes';
          form = form || 'Mix';
        }
      }
      result.push({
        ...product,
        category: cat,
        form: form,
        variants: product.variants || product.product_variants || [],
        product_variants: product.variants || product.product_variants || [],
      });
      processedSlugs.add(product.slug);
    }
  }

  return result;
}
