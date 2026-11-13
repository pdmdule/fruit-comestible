'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Loader2, Lock, Printer, FileText } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import type { OrderItemProduct } from '@/components/OrderHistory';

interface InvoiceOrder {
  id?: string;
  order_number: number | string;
  created_at: string;
  status: string;
  payment_method?: string;
  customer_name?: string;
  customer_email?: string;
  customer_phone?: string;
  shipping_street?: string;
  shipping_zip?: string;
  shipping_city?: string;
  shipping_canton?: string;
  subtotal_chf?: number | string | null;
  shipping_chf?: number | string | null;
  vat_chf?: number | string | null;
  coupon_code?: string | null;
  discount_chf?: number | string | null;
  total_chf: number | string;
  items: OrderItemProduct[] | string;
}

export default function OrderInvoicePage() {
  const params = useParams<{ id: string }>();
  const orderId = params?.id ? decodeURIComponent(String(params.id)) : '';
  const { user, loading: authLoading } = useAuth();

  const [order, setOrder] = useState<InvoiceOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasAutoPrintedRef = useRef(false);

  useEffect(() => {
    if (authLoading) return;

    if (!user?.email || !orderId) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function loadOrder() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `/api/orders?id=${encodeURIComponent(orderId)}&email=${encodeURIComponent(user!.email!)}`,
          { cache: 'no-store' }
        );
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Beleg konnte nicht geladen werden.');
        }

        const matchedOrder = Array.isArray(data.orders) ? data.orders[0] : null;
        if (!cancelled) {
          if (!matchedOrder) {
            setError('Kein passender Beleg für Ihr Konto gefunden.');
          } else {
            setOrder(matchedOrder);
          }
        }
      } catch (err: unknown) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : 'Fehler beim Laden des Belegs.'
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadOrder();

    return () => {
      cancelled = true;
    };
  }, [authLoading, user, orderId]);

  useEffect(() => {
    if (!loading && order && !hasAutoPrintedRef.current) {
      hasAutoPrintedRef.current = true;
      const timer = setTimeout(() => {
        window.print();
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [loading, order]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center p-6">
        <div className="flex flex-col items-center gap-3 text-stone-600">
          <Loader2 className="w-7 h-7 animate-spin text-[#6c943e]" />
          <p className="text-sm font-medium">Beleg wird vorbereitet...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-3xl border border-stone-200 p-8 text-center shadow-sm space-y-5">
          <div className="w-12 h-12 rounded-2xl bg-[#F4EFE6] text-stone-800 flex items-center justify-center mx-auto">
            <Lock className="w-5 h-5" />
          </div>
          <div className="space-y-2">
            <h1 className="text-xl font-serif font-bold text-stone-900">
              Anmeldung erforderlich
            </h1>
            <p className="text-sm text-stone-600 leading-relaxed">
              Bitte melden Sie sich mit Ihrem Kundenkonto an, um Ihren Beleg einzusehen oder als PDF zu speichern.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-1">
            <Link
              href="/login"
              className="px-6 py-2.5 rounded-full bg-stone-900 text-white text-sm font-semibold hover:bg-stone-800 transition-colors"
            >
              Anmelden
            </Link>
            <Link
              href="/konto"
              className="px-6 py-2.5 rounded-full bg-[#F4EFE6] text-stone-800 text-sm font-medium border border-stone-300 hover:bg-[#e8e0d2] transition-colors"
            >
              Zum Konto
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-3xl border border-stone-200 p-8 text-center shadow-sm space-y-5">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-700 flex items-center justify-center mx-auto">
            <FileText className="w-5 h-5" />
          </div>
          <div className="space-y-2">
            <h1 className="text-xl font-serif font-bold text-stone-900">
              Beleg nicht gefunden
            </h1>
            <p className="text-sm text-stone-600 leading-relaxed">
              {error || 'Die gewünschte Rechnung konnte nicht gefunden werden.'}
            </p>
          </div>
          <Link
            href="/konto"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-stone-900 text-white text-sm font-semibold hover:bg-stone-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Zurück zum Konto</span>
          </Link>
        </div>
      </div>
    );
  }

  let parsedItems: OrderItemProduct[] = [];
  if (Array.isArray(order.items)) {
    parsedItems = order.items;
  } else if (typeof order.items === 'string') {
    try {
      const parsed = JSON.parse(order.items);
      if (Array.isArray(parsed)) parsedItems = parsed;
    } catch {
      parsedItems = [];
    }
  }

  const totalChf = Number(order.total_chf || 0);
  const discountChf = Number(order.discount_chf || 0);
  const computedItemsSum = parsedItems.reduce(
    (sum, item) =>
      sum + Number(item.price_chf ?? item.price ?? 0) * Number(item.quantity || 1),
    0
  );
  const subtotalChf =
    order.subtotal_chf != null ? Number(order.subtotal_chf) : computedItemsSum;
  const shippingChf =
    order.shipping_chf != null
      ? Number(order.shipping_chf)
      : Math.max(0, Number((totalChf - subtotalChf + discountChf).toFixed(2)));
  const vatChf =
    order.vat_chf != null
      ? Number(order.vat_chf)
      : Number((totalChf - totalChf / 1.026).toFixed(2));

  const formattedDate = order.created_at
    ? new Date(order.created_at).toLocaleDateString('de-CH', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    : '—';

  const paymentLabel =
    order.payment_method === 'bill'
      ? 'QR-Rechnung'
      : order.payment_method === 'twint'
      ? 'TWINT'
      : 'Kreditkarte / Online';

  return (
    <div className="min-h-screen bg-[#FAF8F5] print:bg-white py-8 sm:py-12 px-4 sm:px-6 print:p-0 text-stone-900 print:text-black">
      {/* Screen-Only Action Bar */}
      <div className="print:hidden max-w-4xl mx-auto mb-6 flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/konto"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium bg-white text-stone-800 border border-stone-300 hover:bg-stone-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Zurück zum Konto</span>
        </Link>

        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-stone-900 text-white hover:bg-stone-800 transition-colors cursor-pointer shadow-xs"
        >
          <Printer className="w-4 h-4" />
          <span>Als PDF speichern / Drucken</span>
        </button>
      </div>

      {/* A4 Invoice Sheet */}
      <div className="max-w-4xl mx-auto bg-white rounded-3xl print:rounded-none border border-stone-200 print:border-none shadow-sm print:shadow-none p-6 sm:p-10 lg:p-12 print:p-2 space-y-8 print:space-y-6">
        {/* Header: Company & Invoice Meta */}
        <header className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 border-b border-stone-200 pb-6">
          <div className="space-y-1.5">
            <p className="text-xs font-bold tracking-widest uppercase text-[#6c943e]">
              Schweizer Qualität
            </p>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
              fruit-Comestible
            </h1>
            <p className="text-xs sm:text-sm text-stone-600">
              100 % natürliche gefriergetrocknete Früchte
            </p>
            <p className="text-xs text-stone-500">
              Schweiz &bull; www.fruit-comestible.ch &bull; info@fruit-comestible.ch
            </p>
          </div>

          <div className="sm:text-right space-y-1 bg-[#FAF8F5] print:bg-stone-50 px-5 py-4 rounded-2xl print:rounded-lg border border-stone-200/80">
            <p className="text-xs font-bold uppercase tracking-widest text-stone-500">
              Bestellbeleg / Rechnung
            </p>
            <p className="text-lg font-mono font-bold text-stone-900">
              Bestellnummer: #{order.order_number}
            </p>
            <p className="text-xs text-stone-600">
              Datum: <span className="font-semibold text-stone-900">{formattedDate}</span>
            </p>
            <p className="text-xs text-stone-600">
              Zahlungsart: <span className="font-semibold text-stone-900">{paymentLabel}</span>
            </p>
          </div>
        </header>

        {/* Billing & Shipping Address */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
          <div className="space-y-1.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Rechnungs- &amp; Lieferadresse
            </h2>
            <p className="font-bold text-stone-900">
              {order.customer_name || 'Kunde'}
            </p>
            {order.shipping_street && (
              <p className="text-stone-700">{order.shipping_street}</p>
            )}
            {(order.shipping_zip || order.shipping_city) && (
              <p className="text-stone-700">
                {order.shipping_zip} {order.shipping_city}
                {order.shipping_canton ? `, ${order.shipping_canton}` : ''}
              </p>
            )}
            <p className="text-stone-700">Schweiz</p>
            {order.customer_email && (
              <p className="text-xs text-stone-500 pt-1">{order.customer_email}</p>
            )}
          </div>

          <div className="sm:text-right space-y-1.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Lieferstatus
            </h2>
            <p className="font-semibold text-stone-900 capitalize">
              {order.status || 'Bestätigt'}
            </p>
            <p className="text-xs text-stone-500">
              Versand ab Schweizer Lager
            </p>
          </div>
        </section>

        {/* Items Table */}
        <section>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-y border-stone-300 bg-[#FAF8F5] print:bg-stone-100 text-xs uppercase tracking-wider text-stone-600">
                  <th className="py-3 px-3 font-bold">Artikel</th>
                  <th className="py-3 px-3 font-bold text-center">Menge</th>
                  <th className="py-3 px-3 font-bold text-right">Einzelpreis</th>
                  <th className="py-3 px-3 font-bold text-right">Gesamt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {parsedItems.length > 0 ? (
                  parsedItems.map((item, idx) => {
                    const qty = Number(item.quantity || 1);
                    const unitPrice = Number(item.price_chf ?? item.price ?? 0);
                    const lineTotal = unitPrice * qty;
                    const variantInfo = [
                      item.form,
                      item.weight_grams ? `${item.weight_grams}g` : null,
                    ]
                      .filter(Boolean)
                      .join(' • ');

                    return (
                      <tr key={`${item.product_id || idx}-${idx}`}>
                        <td className="py-3.5 px-3 align-top">
                          <p className="font-semibold text-stone-900">
                            {item.name_de || item.name || 'Produkt'}
                          </p>
                          {variantInfo && (
                            <p className="text-xs text-stone-500 mt-0.5">
                              {variantInfo}
                            </p>
                          )}
                        </td>
                        <td className="py-3.5 px-3 text-center font-mono text-stone-800 align-top">
                          {qty}
                        </td>
                        <td className="py-3.5 px-3 text-right font-mono text-stone-800 align-top whitespace-nowrap">
                          CHF {unitPrice.toFixed(2)}
                        </td>
                        <td className="py-3.5 px-3 text-right font-mono font-semibold text-stone-900 align-top whitespace-nowrap">
                          CHF {lineTotal.toFixed(2)}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={4} className="py-6 text-center text-stone-500">
                      Keine Artikelpositionen vorhanden.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Totals Breakdown */}
        <section className="flex justify-end pt-2">
          <div className="w-full sm:w-80 space-y-2.5 text-sm">
            <div className="flex items-center justify-between text-stone-700">
              <span>Zwischensumme</span>
              <span className="font-mono">CHF {subtotalChf.toFixed(2)}</span>
            </div>

            {order.coupon_code && discountChf > 0 && (
              <div className="flex items-center justify-between text-emerald-700 font-medium">
                <span>Rabatt ({order.coupon_code})</span>
                <span className="font-mono">- CHF {discountChf.toFixed(2)}</span>
              </div>
            )}

            <div className="flex items-center justify-between text-stone-700">
              <span>Versandkosten</span>
              <span className="font-mono">
                {shippingChf > 0 ? `CHF ${shippingChf.toFixed(2)}` : 'CHF 0.00'}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs text-stone-500">
              <span>Inkl. MWST (2.6 %)</span>
              <span className="font-mono">CHF {vatChf.toFixed(2)}</span>
            </div>

            <div className="flex items-center justify-between pt-3 border-t-2 border-stone-900 text-base font-bold text-stone-900">
              <span>Gesamtbetrag</span>
              <span className="font-mono">CHF {totalChf.toFixed(2)}</span>
            </div>
          </div>
        </section>

        {/* Invoice Footer */}
        <footer className="pt-6 border-t border-stone-200 text-center text-xs text-stone-500 space-y-1">
          <p className="font-medium text-stone-700">
            Vielen Dank für Ihre Bestellung bei fruit-Comestible!
          </p>
          <p>
            Dieser Beleg wurde elektronisch erstellt und ist ohne Unterschrift gültig.
          </p>
        </footer>
      </div>
    </div>
  );
}
