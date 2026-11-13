export interface DailyRecipe {
  id: string;
  slug: string;
  title: string;
  category: string;
  prepTime: string;
  difficulty: string;
  description: string;
  imageUrl: string;
  featuredProductSlug?: string;
  featuredProductName?: string;
  featuredProductImage?: string;
  servings?: string;
}

/**
 * Picks a deterministic recipe of the day exclusively from the provided database list.
 * Changes once every 24 hours; returns null when no recipes exist in the database.
 */
export function getDailyRecipe(recipes?: DailyRecipe[] | null): DailyRecipe | null {
  if (!recipes || recipes.length === 0) {
    return null;
  }

  const dayOfYear = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
  return recipes[dayOfYear % recipes.length];
}
