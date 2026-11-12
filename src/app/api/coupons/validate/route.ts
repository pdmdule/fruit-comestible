import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Server-side admin Supabase client using SUPABASE_SERVICE_ROLE_KEY
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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const rawCode = body?.code;
    const subtotalChf = Number(body?.subtotal_chf ?? 0);

    if (!rawCode || typeof rawCode !== 'string' || !rawCode.trim()) {
      return NextResponse.json(
        { valid: false, error: 'Bitte gib einen Gutscheincode ein.' },
        { status: 400 }
      );
    }

    const normalizedCode = rawCode.trim().toUpperCase();

    // Query coupons table in Supabase
    const { data: coupon, error } = await supabaseAdmin
      .from('coupons')
      .select('*')
      .eq('code', normalizedCode)
      .maybeSingle();

    if (error || !coupon) {
      return NextResponse.json(
        { valid: false, error: 'Ungültiger Gutscheincode.' },
        { status: 400 }
      );
    }

    // 1. Check if coupon is active
    if (!coupon.is_active) {
      return NextResponse.json(
        { valid: false, error: 'Dieser Gutscheincode ist nicht mehr aktiv.' },
        { status: 400 }
      );
    }

    // 2. Check expiration date
    if (coupon.expires_at) {
      const expiresAt = new Date(coupon.expires_at);
      if (expiresAt < new Date()) {
        return NextResponse.json(
          { valid: false, error: 'Dieser Gutscheincode ist leider bereits abgelaufen.' },
          { status: 400 }
        );
      }
    }

    // 3. Check max usage limit
    if (
      coupon.max_uses !== null &&
      coupon.max_uses !== undefined &&
      (coupon.used_count || 0) >= Number(coupon.max_uses)
    ) {
      return NextResponse.json(
        {
          valid: false,
          error: 'Dieser Gutscheincode hat die maximale Anzahl an Einlösungen erreicht.',
        },
        { status: 400 }
      );
    }

    // 4. Check minimum order value (min_order_chf)
    const minOrder = Number(coupon.min_order_chf || 0);
    if (minOrder > 0 && !isNaN(subtotalChf) && subtotalChf < minOrder) {
      return NextResponse.json(
        {
          valid: false,
          error: `Mindestbestellwert von CHF ${minOrder.toFixed(2)} nicht erreicht.`,
        },
        { status: 400 }
      );
    }

    // 5. Calculate discount amount
    const discountValue = Number(coupon.discount_value || 0);
    let discountChf = 0;

    if (coupon.discount_type === 'percentage') {
      discountChf = Math.round(((subtotalChf * discountValue) / 100) * 100) / 100;
      discountChf = Math.min(discountChf, subtotalChf);
    } else if (coupon.discount_type === 'fixed') {
      discountChf = Math.min(discountValue, subtotalChf);
    } else {
      discountChf = Math.min(discountValue, subtotalChf);
    }

    return NextResponse.json({
      valid: true,
      code: normalizedCode,
      discount_type: coupon.discount_type,
      discount_value: discountValue,
      discount_chf: Number(discountChf.toFixed(2)),
    });
  } catch (err) {
    console.error('Error validating coupon:', err);
    return NextResponse.json(
      { valid: false, error: 'Fehler bei der Überprüfung des Gutscheincodes.' },
      { status: 500 }
    );
  }
}
