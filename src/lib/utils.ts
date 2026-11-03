/**
 * Helper function to resolve the primary display image for a product.
 * Priority:
 * 1. image_url of the first variant in variants / product_variants
 * 2. first image in images array of the first variant
 * 3. image_url of the product itself
 * 4. first image in images array of the product itself
 * 5. fallback placeholder ('/images/placeholder.png')
 */
export function getProductDisplayImage(product: any): string {
  // 1. Prvo provjeri prvu varijantu iz relacije product_variants
  const firstVariant = product?.variants?.[0] || product?.product_variants?.[0];
  if (firstVariant?.image_url) {
    return firstVariant.image_url;
  }
  if (firstVariant?.images?.[0]) {
    return firstVariant.images[0];
  }

  // 2. Fallback na sliku samog proizvoda
  if (product?.image_url) {
    return product.image_url;
  }
  if (product?.images?.[0]) {
    return product.images[0];
  }

  // 3. Rezervni placeholder
  return '/images/placeholder.png';
}
