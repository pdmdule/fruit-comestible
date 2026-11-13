import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Server-side / admin Supabase client using SUPABASE_SERVICE_ROLE_KEY
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

export interface OrderItemPayload {
  product_id?: string;
  variant_id?: string;
  sku?: string;
  name_de: string;
  weight_grams?: number;
  quantity: number;
  price_chf: number;
  form?: string;
  image_url?: string;
}

export interface CreateOrderRequestBody {
  customer_name: string;
  customer_email: string;
  customer_phone?: string | null;
  shipping_street: string;
  shipping_zip: string;
  shipping_city: string;
  shipping_canton?: string | null;
  subtotal_chf: number;
  shipping_chf?: number;
  vat_chf?: number;
  total_chf: number;
  payment_method?: string;
  user_id?: string | null;
  coupon_code?: string | null;
  discount_chf?: number;
  items: OrderItemPayload[];
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<CreateOrderRequestBody>;

    // 1. Validation of required customer fields
    const customerName = typeof body.customer_name === 'string' ? body.customer_name.trim() : '';
    if (!customerName || customerName.length < 2) {
      return NextResponse.json(
        { error: 'Bitte geben Sie einen vollständigen Namen ein (Vor- und Nachname).' },
        { status: 400 }
      );
    }

    const customerEmail = typeof body.customer_email === 'string' ? body.customer_email.trim().toLowerCase() : '';
    if (!customerEmail || !EMAIL_REGEX.test(customerEmail)) {
      return NextResponse.json(
        { error: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.' },
        { status: 400 }
      );
    }

    const shippingStreet = typeof body.shipping_street === 'string' ? body.shipping_street.trim() : '';
    if (!shippingStreet) {
      return NextResponse.json(
        { error: 'Bitte geben Sie Ihre Strasse und Hausnummer an.' },
        { status: 400 }
      );
    }

    const shippingZip = typeof body.shipping_zip === 'string' ? body.shipping_zip.trim() : '';
    if (!shippingZip) {
      return NextResponse.json(
        { error: 'Bitte geben Sie Ihre Postleitzahl (PLZ) an.' },
        { status: 400 }
      );
    }

    const shippingCity = typeof body.shipping_city === 'string' ? body.shipping_city.trim() : '';
    if (!shippingCity) {
      return NextResponse.json(
        { error: 'Bitte geben Sie Ihren Wohnort an.' },
        { status: 400 }
      );
    }

    // 2. Validation of items and totals
    if (!body.items || !Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json(
        { error: 'Ihre Bestellung enthält keine Artikel. Der Warenkorb ist leer.' },
        { status: 400 }
      );
    }

    const subtotalChf = Number(body.subtotal_chf);
    const shippingChf = Number(body.shipping_chf || 0);
    const vatChf = Number(body.vat_chf || 0);

    // 3. Server-side coupon verification and security check
    let verifiedCouponCode: string | null = null;
    let verifiedDiscountChf = 0;

    if (body.coupon_code && typeof body.coupon_code === 'string' && body.coupon_code.trim()) {
      const normalizedCode = body.coupon_code.trim().toUpperCase();
      const { data: coupon } = await supabaseAdmin
        .from('coupons')
        .select('*')
        .eq('code', normalizedCode)
        .maybeSingle();

      if (coupon && coupon.is_active) {
        const isNotExpired = !coupon.expires_at || new Date(coupon.expires_at) >= new Date();
        const hasUsesLeft =
          coupon.max_uses === null ||
          coupon.max_uses === undefined ||
          (coupon.used_count || 0) < Number(coupon.max_uses);
        const minOrder = Number(coupon.min_order_chf || 0);
        const meetsMinOrder = minOrder === 0 || subtotalChf >= minOrder;

        if (isNotExpired && hasUsesLeft && meetsMinOrder) {
          verifiedCouponCode = normalizedCode;
          const val = Number(coupon.discount_value || 0);
          if (coupon.discount_type === 'percentage') {
            verifiedDiscountChf = Math.round(((subtotalChf * val) / 100) * 100) / 100;
            verifiedDiscountChf = Math.min(verifiedDiscountChf, subtotalChf);
          } else {
            verifiedDiscountChf = Math.min(val, subtotalChf);
          }

          // Increment used_count by 1 in coupons table
          await supabaseAdmin
            .from('coupons')
            .update({ used_count: (coupon.used_count || 0) + 1 })
            .eq('id', coupon.id);
        }
      }
    }

    const calculatedTotal = Math.max(0, Math.round((subtotalChf + shippingChf - verifiedDiscountChf) * 100) / 100);
    const totalChf = !isNaN(calculatedTotal) ? calculatedTotal : Number(body.total_chf);

    if (isNaN(totalChf) || totalChf < 0) {
      return NextResponse.json(
        { error: 'Ungültiger Gesamtbetrag der Bestellung.' },
        { status: 400 }
      );
    }

    // 4. Insert order into Supabase orders table
    // Do NOT provide order_number because the PostgreSQL database generates it via auto-increment sequence
    const { data: newOrder, error: insertError } = await supabaseAdmin
      .from('orders')
      .insert({
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: body.customer_phone ? body.customer_phone.trim() : null,
        shipping_street: shippingStreet,
        shipping_zip: shippingZip,
        shipping_city: shippingCity,
        shipping_canton: body.shipping_canton ? body.shipping_canton.trim() : null,
        subtotal_chf: subtotalChf,
        shipping_chf: shippingChf,
        vat_chf: vatChf,
        total_chf: totalChf,
        coupon_code: verifiedCouponCode,
        discount_chf: Number(verifiedDiscountChf.toFixed(2)),
        payment_method: body.payment_method || 'pending',
        payment_status: 'pending',
        order_status: 'new',
        user_id: body.user_id || null,
        items: body.items,
      })
      .select('id, order_number, customer_email, total_chf, shipping_street, shipping_zip, shipping_city, shipping_canton, items, coupon_code, discount_chf, created_at')
      .single();

    if (insertError || !newOrder) {
      console.error('Error inserting order in Supabase:', insertError);
      return NextResponse.json(
        {
          error:
            'Beim Speichern der Bestellung ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.',
          details: insertError?.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        order: newOrder,
        message: 'Bestellung erfolgreich aufgegeben!',
      },
      { status: 201 }
    );
  } catch (err) {
    console.error('Unexpected error in POST /api/orders:', err);
    return NextResponse.json(
      { error: 'Ein unerwarteter Serverfehler ist aufgetreten.' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    const orderNumber = searchParams.get('order_number');
    const userId = searchParams.get('user_id');

    if (!email && !orderNumber && !userId) {
      return NextResponse.json(
        { error: 'Mindestens ein Filterkriterium erforderlich (email, order_number oder user_id).' },
        { status: 400 }
      );
    }

    let query = supabaseAdmin
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (email) {
      query = query.ilike('customer_email', email.trim().toLowerCase());
    }
    if (orderNumber) {
      const cleanNum = parseInt(String(orderNumber).replace(/[^0-9]/g, ''), 10);
      if (!isNaN(cleanNum)) {
        query = query.eq('order_number', cleanNum);
      }
    }
    if (userId) {
      query = query.eq('user_id', userId);
    }

    const { data: rawOrders, error } = await query;

    if (error) {
      console.error('Error fetching orders from Supabase:', error);
      return NextResponse.json(
        { error: 'Fehler beim Laden der Bestellungen.' },
        { status: 500 }
      );
    }

    const orders = (rawOrders || []).map((order) => {
      let parsedItems = order.items;
      if (typeof parsedItems === 'string') {
        try {
          parsedItems = JSON.parse(parsedItems);
        } catch {
          parsedItems = [];
        }
      }
      return {
        ...order,
        items: Array.isArray(parsedItems) ? parsedItems : [],
      };
    });

    // Check for missing image_url in items of older orders and lookup from products table
    const missingProductIds = new Set<string>();
    for (const order of orders) {
      for (const item of order.items) {
        if (!item.image_url && !item.image && item.product_id) {
          missingProductIds.add(item.product_id);
        }
      }
    }

    if (missingProductIds.size > 0) {
      try {
        const { data: productsData } = await supabaseAdmin
          .from('products')
          .select('id, images, product_variants(image_url)')
          .in('id', Array.from(missingProductIds));

        if (productsData && productsData.length > 0) {
          const imgMap = new Map<string, string>();
          for (const p of productsData) {
            const variantImg = (p.product_variants as any[])?.find((v) => v?.image_url)?.image_url;
            const prodImg = variantImg || p.images?.[0] || '/images/placeholder.png';
            imgMap.set(p.id, prodImg);
          }

          for (const order of orders) {
            for (const item of order.items) {
              if (!item.image_url && !item.image && item.product_id && imgMap.has(item.product_id)) {
                item.image_url = imgMap.get(item.product_id);
              }
            }
          }
        }
      } catch (imgErr) {
        console.warn('Notice resolving missing product images for orders:', imgErr);
      }
    }

    return NextResponse.json({
      success: true,
      orders,
    });
  } catch (err) {
    console.error('Unexpected error in GET /api/orders:', err);
    return NextResponse.json(
      { error: 'Ein unerwarteter Serverfehler ist aufgetreten.' },
      { status: 500 }
    );
  }
}
