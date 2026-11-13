'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import {
  Package,
  Calendar,
  Truck,
  MapPin,
  CheckCircle2,
  Clock,
  ArrowRight,
  CreditCard,
  QrCode,
  RotateCcw,
  Check,
  FileText,
} from 'lucide-react';

export interface OrderItemProduct {
  name?: string;
  name_de?: string;
  form?: string;
  quantity: number;
  price?: number;
  price_chf?: number;
  image_url?: string;
  image?: string;
  product_id?: string;
  variant_id?: string;
  product_slug?: string;
  sku?: string;
  weight_grams?: number;
}

export interface Order {
  id?: string;
  order_number: number | string;
  total_chf: number | string;
  coupon_code?: string | null;
  discount_chf?: number | string | null;
  order_status?: string;
  payment_status?: string;
  payment_method?: string;
  customer_name?: string;
  customer_email?: string;
  shipping_street?: string | null;
  shipping_zip?: string | null;
  shipping_city?: string | null;
  shipping_canton?: string | null;
  items?: OrderItemProduct[] | any[] | string | null;
  created_at: string;
}

export type OrderRecord = Order;

interface OrderHistoryProps {
  orders: OrderRecord[];
  isLoading?: boolean;
}

function parseOrderItems(rawItems: Order['items']): OrderItemProduct[] {
  if (!rawItems) return [];
  if (Array.isArray(rawItems)) return rawItems;
  if (typeof rawItems === 'string') {
    try {
      const parsed = JSON.parse(rawItems);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.warn('Failed parsing order.items JSON:', e);
    }
  }
  return [];
}

export default function OrderHistory({ orders, isLoading }: OrderHistoryProps) {
  const { addItem, openCart } = useCart();
  const [reorderingId, setReorderingId] = useState<string | null>(null);

  const handleReorder = (order: OrderRecord) => {
    const itemsToAdd = parseOrderItems(order.items);
    if (itemsToAdd.length === 0) return;

    const orderKey = String(order.id ?? order.order_number);

    itemsToAdd.forEach((item, idx) => {
      const itemName = item.name_de || item.name || 'Gefriergetrocknete Früchte';
      const fallbackVariantId =
        item.variant_id ||
        item.sku ||
        item.product_id ||
        `${item.product_slug || itemName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${item.form || idx}`;

      addItem({
        productId: item.product_id || item.product_slug || fallbackVariantId,
        variantId: fallbackVariantId,
        name: itemName,
        label: item.form || (item.weight_grams ? `${item.weight_grams}g` : 'Standard'),
        weight_grams: item.weight_grams,
        price: Number(item.price_chf ?? item.price ?? 0),
        quantity: Math.max(1, Number(item.quantity || 1)),
        image: item.image_url || item.image || '/images/placeholder.png',
        sku: item.sku,
      });
    });

    setReorderingId(orderKey);
    openCart();

    setTimeout(() => {
      setReorderingId((prev) => (prev === orderKey ? null : prev));
    }, 2000);
  };

  if (isLoading) {
    return (
      <div className="bg-white border border-stone-200 rounded-3xl p-12 text-center text-stone-400 text-sm">
        Bestellungen werden geladen...
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="bg-white border border-stone-200 rounded-3xl p-10 sm:p-14 text-center space-y-4 max-w-xl mx-auto shadow-xs">
        <div className="w-14 h-14 rounded-2xl bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
          <Package className="w-7 h-7" />
        </div>
        <div className="space-y-1">
          <h3 className="text-base font-bold text-stone-900">
            Noch keine Bestellungen vorhanden
          </h3>
          <p className="text-xs text-stone-500 leading-relaxed">
            Entdecke unser Sortiment an schonend gefriergetrockneten Schweizer Früchten, Beeren und Fruchtpulver.
          </p>
        </div>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-900 text-white text-xs font-bold hover:bg-stone-800 transition shadow-xs"
        >
          <span>Jetzt Sortiment entdecken</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {orders.map((order) => {
        const parsedItems = parseOrderItems(order.items);
        const orderKey = String(order.id ?? order.order_number);

        // Date formatting in Swiss format
        const orderDate = new Date(order.created_at);
        const formattedDate = !isNaN(orderDate.getTime())
          ? orderDate.toLocaleDateString('de-CH', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })
          : order.created_at;

        // Display formatted order number (e.g. #1042 or #FC-CH-123456)
        const displayOrderNumber =
          order.order_number !== undefined && order.order_number !== null && String(order.order_number).trim() !== ''
            ? String(order.order_number).startsWith('#')
              ? String(order.order_number)
              : `#${order.order_number}`
            : '#Bestellung';

        // Shipping address formatting: ${order.shipping_street}, ${order.shipping_zip} ${order.shipping_city} (${order.shipping_canton})
        const hasShippingAddress = Boolean(
          order.shipping_street ||
            order.shipping_zip ||
            order.shipping_city ||
            order.shipping_canton
        );

        const formattedAddress = hasShippingAddress
          ? `${order.shipping_street || ''}${
              order.shipping_street && (order.shipping_zip || order.shipping_city)
                ? ', '
                : ''
            }${order.shipping_zip || ''} ${order.shipping_city || ''}${
              order.shipping_canton ? ` (${order.shipping_canton})` : ''
            }`.trim()
          : null;

        // Status badge configuration
        const statusLower = (order.order_status || 'In Bearbeitung').toLowerCase();
        let statusBadgeClass = 'bg-amber-50 text-amber-800 border-amber-200/80';
        let StatusIcon = Clock;

        if (statusLower.includes('geliefert') || statusLower.includes('abgeschlossen')) {
          statusBadgeClass = 'bg-emerald-50 text-emerald-800 border-emerald-200/80';
          StatusIcon = CheckCircle2;
        } else if (statusLower.includes('versendet')) {
          statusBadgeClass = 'bg-blue-50 text-blue-800 border-blue-200/80';
          StatusIcon = Truck;
        }

        // Payment status badge
        const paymentLower = (order.payment_status || '').toLowerCase();
        const isPaid = paymentLower === 'paid' || paymentLower === 'bezahlt';

        return (
          <div
            key={String(order.order_number ?? order.id ?? Math.random())}
            className="bg-white border border-stone-200/90 rounded-3xl p-5 sm:p-7 shadow-xs hover:border-stone-300 transition space-y-5"
          >
            {/* Top Bar: Order number, date, status, total */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-5">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="text-base font-black font-mono tracking-tight text-stone-900">
                    {displayOrderNumber}
                  </span>

                  {/* Status Badge */}
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${statusBadgeClass}`}
                  >
                    <StatusIcon className="w-3.5 h-3.5" />
                    <span>{order.order_status || 'In Bearbeitung'}</span>
                  </span>

                  {/* Payment Status Badge */}
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                      isPaid
                        ? 'bg-emerald-100/70 text-emerald-800'
                        : 'bg-stone-100 text-stone-600'
                    }`}
                  >
                    <span>{isPaid ? 'Bezahlt' : order.payment_status || 'Offen'}</span>
                  </span>
                </div>

                <p className="text-xs text-stone-400 flex items-center gap-1.5 font-medium">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Bestelldatum: {formattedDate}</span>
                </p>
              </div>

              {/* Total amount */}
              <div className="text-left sm:text-right bg-stone-50 sm:bg-transparent p-3 sm:p-0 rounded-2xl">
                <span className="text-xs text-stone-500 block font-medium">
                  Gesamter Rechnungsbetrag
                </span>
                <span className="text-lg sm:text-xl font-black font-mono text-stone-900">
                  CHF {Number(order.total_chf || 0).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Middle Section: Items List */}
            {parsedItems.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">
                  Bestellte Früchte ({parsedItems.length})
                </h4>

                <div className="divide-y divide-stone-100 rounded-2xl border border-stone-100 bg-stone-50/40 p-2 sm:p-3">
                  {parsedItems.map((item, idx) => {
                    const itemName = item.name_de || item.name || 'Bestelltes Produkt';
                    const itemImage = item.image_url || item.image || '/images/placeholder.png';
                    const itemPrice = Number(item.price_chf ?? item.price ?? 0);
                    const itemQty = Number(item.quantity || 1);
                    const itemForm = item.form || (item.weight_grams ? `${item.weight_grams}g` : undefined);

                    return (
                      <div
                        key={`${itemName}-${idx}`}
                        className="py-2.5 px-2 flex items-center justify-between gap-3 text-xs"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-stone-200 bg-[#F9F6F0]">
                            <Image
                              src={itemImage}
                              alt={itemName}
                              fill
                              sizes="48px"
                              className="object-contain p-1"
                            />
                          </div>

                          <div className="min-w-0">
                            <p className="font-bold text-stone-900 truncate">
                              {itemName}
                            </p>
                            <div className="flex items-center gap-2 text-[11px] text-stone-500">
                              {itemForm && (
                                <span className="px-1.5 py-0.5 rounded-md bg-stone-100 font-semibold text-stone-700">
                                  {itemForm}
                                </span>
                              )}
                              <span>Menge: {itemQty}×</span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="font-mono font-bold text-stone-900 text-xs">
                            CHF {(itemPrice * itemQty).toFixed(2)}
                          </span>
                          {itemQty > 1 && (
                            <span className="block text-[10px] text-stone-400 font-mono">
                              CHF {itemPrice.toFixed(2)} / Stk.
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Applied Coupon Discount */}
            {order.coupon_code && Number(order.discount_chf) > 0 && (
              <div className="flex items-center justify-between text-xs sm:text-sm text-emerald-700 bg-emerald-50/80 border border-emerald-200 px-3 py-1.5 rounded-lg mt-2">
                <span className="flex items-center gap-1.5 font-medium">
                  <span>🏷️ Gutscheincode:</span>
                  <span className="font-mono font-bold uppercase">{order.coupon_code}</span>
                </span>
                <span className="font-semibold">
                  - CHF {Number(order.discount_chf).toFixed(2)}
                </span>
              </div>
            )}

            {/* Bottom Section: Delivery address, Payment Method & Reorder CTA */}
            <div className="pt-3 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-stone-600">
              {/* Shipping Address */}
              {formattedAddress ? (
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] font-bold text-stone-400 block uppercase tracking-wider">
                      Lieferadresse
                    </span>
                    <span className="font-medium text-stone-800">
                      {formattedAddress}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-stone-500">
                  <Truck className="w-4 h-4 text-emerald-600" />
                  <span>Schweizer Post Standardversand</span>
                </div>
              )}

              {/* Payment Method & Reorder Button */}
              <div className="flex flex-wrap items-center justify-between sm:justify-end gap-3 sm:gap-4 shrink-0">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                    Zahlungsart:
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-bold text-stone-800">
                    {order.payment_method === 'bill' ? (
                      <>
                        <QrCode className="w-3.5 h-3.5 text-rose-700" />
                        <span>QR-Rechnung</span>
                      </>
                    ) : order.payment_method === 'twint' ? (
                      <span>TWINT</span>
                    ) : (
                      <>
                        <CreditCard className="w-3.5 h-3.5 text-stone-600" />
                        <span>Kreditkarte / Online</span>
                      </>
                    )}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <Link
                    href={`/orders/${order.id || order.order_number}/invoice`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium bg-white text-stone-800 border border-stone-300 hover:bg-stone-50 transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5 text-[#6c943e]" />
                    <span>Beleg / PDF</span>
                  </Link>

                  {parsedItems.length > 0 && (
                    <button
                      type="button"
                      onClick={() => handleReorder(order)}
                      disabled={reorderingId === orderKey}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium bg-[#F4EFE6] text-stone-800 border border-stone-300 hover:bg-[#e8e0d2] transition-colors cursor-pointer disabled:opacity-50"
                    >
                      {reorderingId === orderKey ? (
                        <span className="inline-flex items-center gap-1.5 text-emerald-800 font-semibold">
                          <Check className="w-3.5 h-3.5" />
                          <span>In den Warenkorb gelegt</span>
                        </span>
                      ) : (
                        <>
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Erneut bestellen</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
