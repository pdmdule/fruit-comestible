import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Server-side / admin Supabase client (bypasses RLS when SUPABASE_SERVICE_ROLE_KEY is provided)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  '';

const supabaseAdmin = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

interface ReviewRequestBody {
  productId: string;
  authorName: string;
  authorLocation?: string;
  rating: number;
  comment: string;
  usageTag?: string;
  website_url?: string; // Honeypot field
}

export async function POST(req: NextRequest) {
  try {
    // 1. Authenticate user via Bearer token from Supabase session
    const authHeader = req.headers.get('authorization') || '';
    const token = authHeader.toLowerCase().startsWith('bearer ')
      ? authHeader.slice(7).trim()
      : '';

    if (!token) {
      return NextResponse.json(
        { error: 'Du musst angemeldet sein, um eine Bewertung abzugeben.' },
        { status: 401 }
      );
    }

    const {
      data: { user },
      error: authError,
    } = await supabaseAdmin.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Du musst angemeldet sein, um eine Bewertung abzugeben.' },
        { status: 401 }
      );
    }

    const body = (await req.json()) as Partial<ReviewRequestBody>;
    const {
      productId,
      authorName,
      authorLocation,
      rating,
      comment,
      usageTag,
      website_url,
    } = body;

    // 2. Honeypot check (anti-spam bot trap)
    if (website_url && website_url.trim().length > 0) {
      return NextResponse.json(
        {
          success: true,
          message:
            'Vielen Dank für deine Bewertung! Nach kurzer Prüfung wird dein Beitrag veröffentlicht.',
        },
        { status: 200 }
      );
    }

    // 3. Validate input fields
    if (!productId || typeof productId !== 'string') {
      return NextResponse.json(
        { error: 'Produkt-ID fehlt oder ist ungültig.' },
        { status: 400 }
      );
    }

    const cleanAuthorName = typeof authorName === 'string' ? authorName.trim() : '';
    if (!cleanAuthorName || cleanAuthorName.length < 2) {
      return NextResponse.json(
        { error: 'Bitte gib deinen Namen ein (mindestens 2 Zeichen).' },
        { status: 400 }
      );
    }

    const numRating = Number(rating);
    if (!numRating || isNaN(numRating) || numRating < 1 || numRating > 5) {
      return NextResponse.json(
        { error: 'Bitte wähle eine Bewertung zwischen 1 und 5 Sternen.' },
        { status: 400 }
      );
    }

    const cleanComment = typeof comment === 'string' ? comment.trim() : '';
    if (!cleanComment || cleanComment.length < 5) {
      return NextResponse.json(
        { error: 'Bitte verfasse einen kurzen Kommentar (mindestens 5 Zeichen).' },
        { status: 400 }
      );
    }

    const userEmail = (user.email || '').trim().toLowerCase();
    if (!userEmail) {
      return NextResponse.json(
        { error: 'Keine gültige E-Mail-Adresse im Benutzerkonto gefunden.' },
        { status: 400 }
      );
    }

    // 4. Prevent duplicate reviews per user/email for the same product
    const { data: existingByUserId } = await supabaseAdmin
      .from('product_reviews')
      .select('id')
      .eq('product_id', productId)
      .eq('user_id', user.id)
      .limit(1)
      .maybeSingle();

    if (existingByUserId) {
      return NextResponse.json(
        { error: 'Du hast dieses Produkt bereits bewertet.' },
        { status: 400 }
      );
    }

    const { data: existingByEmail } = await supabaseAdmin
      .from('product_reviews')
      .select('id')
      .eq('product_id', productId)
      .ilike('email', userEmail)
      .limit(1)
      .maybeSingle();

    if (existingByEmail) {
      return NextResponse.json(
        { error: 'Du hast dieses Produkt bereits bewertet.' },
        { status: 400 }
      );
    }

    // 5. Smart Verified Purchase check in orders table (silent background check)
    let isVerifiedPurchase = false;
    try {
      const { data: matchingOrderByUser } = await supabaseAdmin
        .from('orders')
        .select('id')
        .eq('user_id', user.id)
        .limit(1)
        .maybeSingle();

      if (matchingOrderByUser) {
        isVerifiedPurchase = true;
      } else {
        const { data: matchingOrderByEmail } = await supabaseAdmin
          .from('orders')
          .select('id')
          .ilike('customer_email', userEmail)
          .limit(1)
          .maybeSingle();

        if (matchingOrderByEmail) {
          isVerifiedPurchase = true;
        }
      }
    } catch {
      // Ignore silent verification errors so authenticated users can still submit reviews
    }

    // 6. Insert new review (requires admin approval)
    const cleanUsageTag =
      typeof usageTag === 'string' && usageTag.trim().length > 0
        ? usageTag.trim()
        : null;

    const cleanLocation =
      typeof authorLocation === 'string' && authorLocation.trim().length > 0
        ? authorLocation.trim()
        : null;

    const { error: insertError } = await supabaseAdmin
      .from('product_reviews')
      .insert({
        product_id: productId,
        user_id: user.id,
        author_name: cleanAuthorName,
        author_location: cleanLocation,
        email: userEmail,
        order_number: null,
        rating: Math.round(numRating),
        comment: cleanComment,
        usage_tag: cleanUsageTag,
        is_verified_purchase: isVerifiedPurchase,
        is_approved: false,
      });

    if (insertError) {
      console.error('Error inserting product review:', insertError);
      return NextResponse.json(
        {
          error:
            'Beim Speichern deiner Bewertung ist ein Fehler aufgetreten. Bitte versuche es später erneut.',
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message:
          'Vielen Dank für deine Bewertung! Nach kurzer Prüfung wird dein Beitrag veröffentlicht.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Unexpected error in /api/reviews:', error);
    return NextResponse.json(
      { error: 'Ein unerwarteter Fehler ist aufgetreten.' },
      { status: 500 }
    );
  }
}
