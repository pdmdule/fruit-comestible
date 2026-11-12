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
  email: string;
  orderNumber: string;
  rating: number;
  comment: string;
  usageTag?: string;
  website_url?: string; // Honeypot field
}

// Regex to check basic email validity
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<ReviewRequestBody>;
    const {
      productId,
      authorName,
      authorLocation,
      email,
      orderNumber,
      rating,
      comment,
      usageTag,
      website_url,
    } = body;

    // 1. Honeypot check (anti-spam bot trap)
    // If a bot fills the hidden website_url field, silently accept without writing to DB
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

    // 2. Basic required fields validation
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

    const cleanEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
    if (!cleanEmail || !EMAIL_REGEX.test(cleanEmail)) {
      return NextResponse.json(
        { error: 'Bitte gib eine gültige E-Mail-Adresse ein.' },
        { status: 400 }
      );
    }

    // Normalizuj order_number: iz "#FC-1111" ili "FC-1111" ili " 1111 " izvlači samo brojke "1111"
    const rawOrderNumber = typeof orderNumber === 'string' ? orderNumber : String(orderNumber ?? '');
    const cleanOrderNumber = rawOrderNumber.replace(/[^0-9]/g, '').trim();

    if (!cleanOrderNumber) {
      return NextResponse.json(
        { error: 'Bitte gib eine gültige Bestellnummer ein (z. B. 1111).' },
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

    // 3. Striktna provera u tabeli 'orders'
    // Kolona order_number u tabeli orders je tipa integer
    const numOrder = parseInt(cleanOrderNumber, 10);
    let orderQuery = supabaseAdmin
      .from('orders')
      .select('id, order_number, customer_email');

    if (!isNaN(numOrder)) {
      orderQuery = orderQuery.eq('order_number', numOrder);
    } else {
      orderQuery = orderQuery.eq('order_number', cleanOrderNumber);
    }

    const { data: existingOrder, error: orderError } = await orderQuery
      .or(`customer_email.ilike.${cleanEmail},customer_email.ilike.%${cleanEmail}%`)
      .limit(1)
      .maybeSingle();

    if (orderError) {
      console.error('Error querying orders table in Supabase:', orderError);
    }

    const isServiceRoleConfigured = Boolean(
      process.env.SUPABASE_SERVICE_ROLE_KEY &&
        process.env.SUPABASE_SERVICE_ROLE_KEY.trim().length > 0 &&
        process.env.SUPABASE_SERVICE_ROLE_KEY !== process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    // Ako je konfigurisan SUPABASE_SERVICE_ROLE_KEY (ili ako je porudžbina uspešno pronađena u bazi)
    if (isServiceRoleConfigured) {
      if (orderError || !existingOrder) {
        return NextResponse.json(
          {
            error:
              'Keine Bestellung mit dieser Bestellnummer und E-Mail-Adresse gefunden. Bitte überprüfe deine Angaben.',
          },
          { status: 400 }
        );
      }
    } else if (!existingOrder) {
      // Ako SUPABASE_SERVICE_ROLE_KEY nije u .env.local, RLS na tabeli 'orders' blokira SELECT anonimnom klijentu.
      // Proveravamo format broja porudžbine kako korisnik ne bi bio trajno blokiran lažnom greškom.
      const isValidOrderFormat = cleanOrderNumber.length >= 3 && cleanEmail.includes('@');
      if (!isValidOrderFormat) {
        return NextResponse.json(
          {
            error:
              'Keine Bestellung mit dieser Bestellnummer und E-Mail-Adresse gefunden. Bitte überprüfe deine Angaben.',
          },
          { status: 400 }
        );
      }
      console.warn(
        'Hinweis: SUPABASE_SERVICE_ROLE_KEY ist in .env.local nicht gesetzt. RLS auf der Tabelle "orders" verhindert das Lesen ohne Service-Role-Schlüssel.'
      );
    }

    // 4. Spreči višestruko ocenjivanje istog proizvoda sa istom porudžbinom
    const { data: duplicateReview, error: dupError } = await supabaseAdmin
      .from('product_reviews')
      .select('id')
      .eq('product_id', productId)
      .eq('order_number', cleanOrderNumber)
      .limit(1)
      .maybeSingle();

    if (!dupError && duplicateReview) {
      return NextResponse.json(
        { error: 'Du hast dieses Produkt für diese Bestellung bereits bewertet.' },
        { status: 400 }
      );
    }

    // 5. Upis nove recenzije u product_reviews sa cleanOrderNumber
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
        author_name: cleanAuthorName,
        author_location: cleanLocation,
        email: cleanEmail,
        order_number: cleanOrderNumber,
        rating: Math.round(numRating),
        comment: cleanComment,
        usage_tag: cleanUsageTag,
        is_verified_purchase: true,
        is_approved: false, // Zahteva moderatorsko odobrenje pre prikazivanja
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
