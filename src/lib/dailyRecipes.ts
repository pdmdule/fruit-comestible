export interface DailyRecipe {
  id: string;
  slug: string;
  title: string;
  category: string; // npr. "Frühstück & Bowls", "Baking & Desserts"
  prepTime: string; // npr. "10 Min."
  difficulty: string; // "Einfach"
  description: string;
  imageUrl: string;
  featuredProductSlug: string;
  featuredProductName: string;
  featuredProductImage?: string;
  servings?: string;
}

export const DEFAULT_RECIPES: DailyRecipe[] = [
  {
    id: 'recipe-himbeer-bowl',
    slug: 'himbeer-chia-power-bowl',
    title: 'Knusprige Himbeer-Chia Frühstücksbowl',
    category: 'Frühstück & Bowls',
    prepTime: '10 Min.',
    difficulty: 'Einfach',
    description:
      'Ein energiereicher Start in den Tag mit samtigem Joghurt, Chia-Samen und intensiv-knusprigen gefriergetrockneten Schweizer Himbeeren.',
    imageUrl:
      'https://images.unsplash.com/photo-1511688878353-3a2f5be94cd7?q=80&w=1200&auto=format&fit=crop',
    featuredProductSlug: 'himbeeren-ganz',
    featuredProductName: 'Gefriergetrocknete Himbeeren (Ganz)',
    featuredProductImage:
      'https://loinzvvygklupiomoisu.supabase.co/storage/v1/object/public/products/himbeeren/Gefriergetrocknete-Himbeere-Ganz-fruit-comestible-Kaufen.webp',
    servings: '2 Portionen',
  },
  {
    id: 'recipe-erdbeer-panna-cotta',
    slug: 'erdbeer-panna-cotta-crunch',
    title: 'Vanille Panna Cotta mit Erdbeercrunch',
    category: 'Dessert & Patisserie',
    prepTime: '15 Min.',
    difficulty: 'Einfach',
    description:
      'Cremiges Dessert mit echter Bourbon-Vanille, veredelt durch natürlich-aromatische Schweizer Erdbeeren für ein himmlisches Knuspererlebnis.',
    imageUrl:
      'https://images.unsplash.com/photo-1543528176-61b239494933?q=80&w=1200&auto=format&fit=crop',
    featuredProductSlug: 'erdbeeren-ganz',
    featuredProductName: 'Gefriergetrocknete Erdbeeren (Hälften)',
    featuredProductImage: '/images/spotlight/erdbeeren-bowl.png',
    servings: '4 Portionen',
  },
  {
    id: 'recipe-heidelbeer-oats',
    slug: 'schweizer-waldheidelbeer-overnight-oats',
    title: 'Schweizer Waldheidelbeer Overnight Oats',
    category: 'Frühstück & Fitness',
    prepTime: '10 Min.',
    difficulty: 'Sehr einfach',
    description:
      'Traditionelle Haferflocken schonend über Nacht gezogen mit samtigem Waldheidelbeerpüree und knusprigen ganzen Beeren voller Vitamine.',
    imageUrl:
      'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?q=80&w=1200&auto=format&fit=crop',
    featuredProductSlug: 'echte-heidelbeere-ganz',
    featuredProductName: 'Gefriergetrocknete Echte Heidelbeere (Ganz)',
    featuredProductImage: '/images/spotlight/heidelbeeren-bowl.png',
    servings: '2 Portionen',
  },
  {
    id: 'recipe-mango-shake',
    slug: 'tropical-mango-maracuja-shake',
    title: 'Tropischer Mango-Maracuja Vitalshake',
    category: 'Smoothies & Drinks',
    prepTime: '5 Min.',
    difficulty: 'Sehr einfach',
    description:
      'Erfrischender Sommervitamin-Shake: Sonnengereifte Mango und spritzige Maracuja verschmelzen zu einem samtigen, exotischen Power-Getränk.',
    imageUrl:
      'https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=1200&auto=format&fit=crop',
    featuredProductSlug: 'mango-wuerfel',
    featuredProductName: 'Gefriergetrocknete Mango (Würfel)',
    featuredProductImage: '/images/spotlight/mango-bowl.png',
    servings: '2 Gläser',
  },
  {
    id: 'recipe-aprikosen-cheesecake',
    slug: 'aprikosen-rosmarin-cheesecake-glas',
    title: 'Aprikosen-Cheesecake mit Knusperschnitzen',
    category: 'Dessert & Backen',
    prepTime: '20 Min.',
    difficulty: 'Leicht',
    description:
      'Feine Frischkäse-Quarkcreme auf buttrigem Keksboden, aromatisch kombiniert mit zartem Rosmarin und knusprigen Aprikosenschnitzen.',
    imageUrl:
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1200&auto=format&fit=crop',
    featuredProductSlug: 'aprikose-schnitze',
    featuredProductName: 'Gefriergetrocknete Aprikose (Schnitze)',
    featuredProductImage: '/logo.webp',
    servings: '4 Gläser',
  },
  {
    id: 'recipe-zwetschgen-tiramisu',
    slug: 'zwetschgen-cassis-tiramisu-glas',
    title: 'Zwetschgen-Cassis Tiramisu im Glas',
    category: 'Dessert & Gourmet',
    prepTime: '10 Min.',
    difficulty: 'Einfach',
    description:
      'Herbstlicher Hochgenuss mit cremiger Mascarpone, feinen Löffelbiskuits und vollaromatischen, gefriergetrockneten Schweizer Zwetschgen.',
    imageUrl:
      'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=1200&auto=format&fit=crop',
    featuredProductSlug: 'zwetschgen-schnitze',
    featuredProductName: 'Gefriergetrocknete Zwetschgen (Schnitze)',
    featuredProductImage: '/logo.webp',
    servings: '4 Portionen',
  },
  {
    id: 'recipe-cassis-tonic',
    slug: 'botanical-cassis-berry-tonic',
    title: 'Botanical Tonic mit Johannisbeeren & Cassis',
    category: 'Drinks & Aperitif',
    prepTime: '5 Min.',
    difficulty: 'Sehr einfach',
    description:
      'Gefriergetrocknete schwarze Johannisbeeren knistern sanft im sprudelnden Tonic Water und verleihen dem Drink eine edle rubinrote Farbe.',
    imageUrl:
      'https://images.unsplash.com/photo-1577069808021-76612720d200?q=80&w=1200&auto=format&fit=crop',
    featuredProductSlug: 'schwarze-johannisbeere-ganz',
    featuredProductName: 'Gefriergetrocknete Schwarze Johannisbeere',
    featuredProductImage: '/images/spotlight/schwarze-johannisbeere-bowl.png',
    servings: '2 Gläser',
  },
];

// Algoritam koji svaki dan bira pseudo-random recept iz liste na bazi datuma:
export function getDailyRecipe(recipes?: DailyRecipe[]): DailyRecipe {
  const list = recipes && recipes.length > 0 ? recipes : DEFAULT_RECIPES;
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();

  // Pseudo-random hashing na osnovu dana, stabilan tokom celog dana a menja se svakog dana
  const seed = year * 372 + month * 31 + day;
  const hash = Math.abs(Math.sin(seed * 9973) * 100000);
  const recipeIndex = Math.floor(hash) % list.length;

  return list[recipeIndex];
}
