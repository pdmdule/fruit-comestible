export * from './utils';

export interface ChocolateCheckTarget {
  slug?: string | null;
  name_de?: string | null;
  name?: string | null;
  category?: string | null;
  ingredients_de?: string | null;
}

export function isChocolateProduct(
  product?: ChocolateCheckTarget | null
): boolean {
  if (!product) return false;
  const fields = [
    product.slug,
    product.name_de,
    product.name,
    product.category,
    product.ingredients_de,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  return (
    fields.includes('schoko') ||
    fields.includes('cokolad') ||
    fields.includes('milchschokolade') ||
    fields.includes('schokolade')
  );
}

export function hasStoneFruitPitNotice(
  product?: ChocolateCheckTarget | null
): boolean {
  if (!product) return false;
  const fields = [
    product.slug,
    product.name_de,
    product.name,
    product.ingredients_de,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  return (
    fields.includes('sauerkirsch') ||
    fields.includes('kirsch') ||
    fields.includes('aprikos') ||
    fields.includes('zwetschg') ||
    fields.includes('pflaum')
  );
}
