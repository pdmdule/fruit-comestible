import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q')?.trim() || '';

  if (!q) {
    return NextResponse.json({ products: [], blogPosts: [] });
  }

  try {
    const [productsRes, blogRes] = await Promise.all([
      // 1. Query products
      supabase
        .from('products')
        .select(
          'id, slug, name_de, subtitle_de, description_de, images, product_variants(price_chf)'
        )
        .or(
          `name_de.ilike.%${q}%,subtitle_de.ilike.%${q}%,description_de.ilike.%${q}%`
        )
        .limit(8),

      // 2. Query blog posts & recipes
      supabase
        .from('blog_posts')
        .select(
          'id, slug, title_de, summary_de, category, image_url, cover_image_url, recipe_data'
        )
        .or(
          `title_de.ilike.%${q}%,content_de.ilike.%${q}%,category.ilike.%${q}%`
        )
        .limit(6),
    ]);

    if (productsRes.error) {
      console.error('Products search error:', productsRes.error);
    }
    if (blogRes.error) {
      console.error('Blog search error:', blogRes.error);
    }

    // Format products
    const products = (productsRes.data || []).map((p: any) => {
      const variants = p.product_variants || [];
      const prices = variants
        .map((v: any) => Number(v.price_chf))
        .filter((price: number) => !isNaN(price) && price > 0);
      const minPrice = prices.length > 0 ? Math.min(...prices) : null;
      const image =
        Array.isArray(p.images) && p.images.length > 0
          ? p.images[0]
          : '/logo.webp';

      return {
        id: p.id,
        slug: p.slug,
        name_de: p.name_de,
        subtitle_de: p.subtitle_de,
        min_price: minPrice,
        image,
      };
    });

    // Format blog posts & recipes
    const blogPosts = (blogRes.data || []).map((b: any) => {
      const isRecipe =
        b.category?.toLowerCase().includes('rezept') ||
        (b.recipe_data !== null && b.recipe_data !== undefined);
      const image =
        b.image_url ||
        b.cover_image_url ||
        'https://images.unsplash.com/photo-1543528176-61b239494933?q=80&w=800&auto=format&fit=crop';

      return {
        id: b.id,
        slug: b.slug,
        title_de: b.title_de,
        category: isRecipe ? 'Rezept' : b.category || 'Wissen',
        is_recipe: isRecipe,
        image,
      };
    });

    return NextResponse.json({
      products,
      blogPosts,
    });
  } catch (error: any) {
    console.error('Search API failure:', error);
    return NextResponse.json(
      { error: 'Search failed', products: [], blogPosts: [] },
      { status: 500 }
    );
  }
}
