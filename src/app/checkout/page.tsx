'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getProductDisplayImage } from '@/lib/utils';
import {
  ShieldCheck,
  Truck,
  CheckCircle2,
  ArrowLeft,
  Smartphone,
  CreditCard,
  FileText,
  AlertCircle,
  QrCode,
  Lock,
  Sparkles,
  Tag,
  X,
} from 'lucide-react';

const SWISS_CANTONS = [
  { code: 'ZH', name: 'Zürich' },
  { code: 'BE', name: 'Bern' },
  { code: 'LU', name: 'Luzern' },
  { code: 'UR', name: 'Uri' },
  { code: 'SZ', name: 'Schwyz' },
  { code: 'OW', name: 'Obwalden' },
  { code: 'NW', name: 'Nidwalden' },
  { code: 'GL', name: 'Glarus' },
  { code: 'ZG', name: 'Zug' },
  { code: 'FR', name: 'Fribourg / Freiburg' },
  { code: 'SO', name: 'Solothurn' },
  { code: 'BS', name: 'Basel-Stadt' },
  { code: 'BL', name: 'Basel-Landschaft' },
  { code: 'SH', name: 'Schaffhausen' },
  { code: 'AR', name: 'Appenzell Ausserrhoden' },
  { code: 'AI', name: 'Appenzell Innerrhoden' },
  { code: 'SG', name: 'St. Gallen' },
  { code: 'GR', name: 'Graubünden' },
  { code: 'AG', name: 'Aargau' },
  { code: 'TG', name: 'Thurgau' },
  { code: 'TI', name: 'Ticino' },
  { code: 'VD', name: 'Vaud' },
  { code: 'VS', name: 'Valais / Wallis' },
  { code: 'NE', name: 'Neuchâtel' },
  { code: 'GE', name: 'Genève' },
  { code: 'JU', name: 'Jura' },
  { code: 'FL', name: 'Fürstentum Liechtenstein' },
];

export default function CheckoutPage() {
  const { items, subtotal, shipping, total, vatIncluded, clearCart } = useCart();
  const { user, profile } = useAuth();

  // Form State
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    street: '',
    plz: '',
    city: '',
    canton: 'ZH',
    notes: '',
  });

  // Auto-fill delivery address from profiles table / user data
  useEffect(() => {
    if (user || profile) {
      setFormData((prev) => ({
        ...prev,
        email: prev.email || user?.email || '',
        firstName:
          prev.firstName ||
          profile?.first_name ||
          user?.user_metadata?.first_name ||
          '',
        lastName:
          prev.lastName ||
          profile?.last_name ||
          user?.user_metadata?.last_name ||
          '',
        street: prev.street || profile?.street_address || '',
        plz: prev.plz || profile?.postal_code || '',
        city: prev.city || profile?.city || '',
        canton: prev.canton !== 'ZH' ? prev.canton : profile?.canton || 'ZH',
        phone: prev.phone || profile?.phone || '',
      }));
    }
  }, [user, profile]);

  const [paymentMethod, setPaymentMethod] = useState<'twint' | 'card' | 'bill'>('twint');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [completedOrder, setCompletedOrder] = useState<{
    id: string;
    order_number: number;
    customer_email: string;
    total_chf: number;
    items?: any[];
  } | null>(null);

  // Coupon state
  const [couponCodeInput, setCouponCodeInput] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discount_type: 'percentage' | 'fixed';
    discount_value: number;
    discount_chf: number;
  } | null>(null);

  // Calculate dynamic discount and final total
  const discountChf = appliedCoupon
    ? appliedCoupon.discount_type === 'percentage'
      ? Math.round(((subtotal * appliedCoupon.discount_value) / 100) * 100) / 100
      : Math.min(appliedCoupon.discount_value, subtotal)
    : 0;

  const finalTotal = Math.max(0, Math.round((subtotal + shipping - discountChf) * 100) / 100);

  const handleApplyCoupon = async () => {
    if (!couponCodeInput.trim()) return;
    setCouponLoading(true);
    setCouponError(null);

    try {
      const res = await fetch('/api/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: couponCodeInput.trim(),
          subtotal_chf: subtotal,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.valid) {
        setCouponError(data.error || 'Ungültiger Gutscheincode.');
      } else {
        setAppliedCoupon({
          code: data.code,
          discount_type: data.discount_type,
          discount_value: data.discount_value,
          discount_chf: data.discount_chf,
        });
        setCouponCodeInput('');
      }
    } catch (err) {
      console.error('Error applying coupon:', err);
      setCouponError('Fehler bei der Überprüfung des Gutscheincodes.');
    } finally {
      setCouponLoading(false);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponError(null);
  };

  const validatePLZ = (value: string) => {
    return /^[1-9][0-9]{3}$/.test(value.trim());
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim() || !formData.email.includes('@')) {
      newErrors.email = 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';
    }
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Vorname ist erforderlich.';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Nachname ist erforderlich.';
    }
    if (!formData.street.trim()) {
      newErrors.street = 'Strasse & Hausnummer sind erforderlich.';
    }
    if (!validatePLZ(formData.plz)) {
      newErrors.plz = 'Ungültige Schweizer PLZ (genau 4 Ziffern, z.B. 8001).';
    }
    if (!formData.city.trim()) {
      newErrors.city = 'Ort ist erforderlich.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    const customerName = `${formData.firstName.trim()} ${formData.lastName.trim()}`;

    const orderItems = items.map((item) => {
      const displayImg = item.image || getProductDisplayImage(item);
      return {
        product_id: item.productId || '',
        variant_id: item.variantId || '',
        sku: item.sku || '',
        name_de: item.name,
        weight_grams: item.weight_grams || 0,
        quantity: item.quantity,
        price_chf: item.price,
        form: item.label || '',
        image_url: displayImg && displayImg !== '/images/placeholder.png' ? displayImg : (item.image || ''),
      };
    });

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: customerName,
          customer_email: formData.email.trim(),
          customer_phone: formData.phone.trim() || null,
          shipping_street: formData.street.trim(),
          shipping_zip: formData.plz.trim(),
          shipping_city: formData.city.trim(),
          shipping_canton: formData.canton?.trim() || null,
          subtotal_chf: subtotal,
          shipping_chf: shipping,
          vat_chf: vatIncluded,
          coupon_code: appliedCoupon?.code || null,
          discount_chf: discountChf,
          total_chf: finalTotal,
          payment_method: paymentMethod || 'pending',
          user_id: user?.id || null,
          items: orderItems,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setSubmitError(
          data.error || 'Beim Aufgeben der Bestellung ist ein Fehler aufgetreten.'
        );
        setIsSubmitting(false);
        return;
      }

      const createdOrder = data.order;

      // Clean up any legacy or test orders from local and session storage
      try {
        ['fc_user_orders', 'orders', 'fc_orders', 'mock_orders', 'test_orders', 'user_orders'].forEach((k) => {
          localStorage.removeItem(k);
          sessionStorage.removeItem(k);
        });
      } catch (err) {
        // ignore
      }

      // If logged in, also update profile with address if empty
      if (user) {
        supabase
          .from('profiles')
          .upsert(
            {
              id: user.id,
              first_name: formData.firstName.trim(),
              last_name: formData.lastName.trim(),
              street_address: formData.street.trim(),
              postal_code: formData.plz.trim(),
              city: formData.city.trim(),
              canton: formData.canton,
              country: 'Schweiz',
              phone: formData.phone.trim(),
            },
            { onConflict: 'id' }
          )
          .then(() => {});
      }

      clearCart();
      setCompletedOrder({
        ...createdOrder,
        items: createdOrder.items || orderItems,
      });
    } catch (err) {
      console.error('Error submitting order:', err);
      setSubmitError('Ein Netzwerkfehler ist aufgetreten. Bitte prüfen Sie Ihre Verbindung.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Order Success Screen
  if (completedOrder) {
    return (
      <div className="min-h-screen bg-stone-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto bg-white border border-stone-200/90 rounded-3xl p-8 sm:p-12 shadow-sm text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-emerald-600" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Bestellung erfolgreich abgeschlossen
            </span>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-stone-900">
              Vielen Dank für deine Bestellung!
            </h1>
            <p className="text-sm sm:text-base text-stone-600">
              Bestellnummer:{' '}
              <strong className="font-mono text-stone-900 font-bold text-lg bg-stone-100 px-3 py-1 rounded-xl border border-stone-200">
                {completedOrder.order_number}
              </strong>
            </p>
          </div>

          {/* Review Verification Hint */}
          <div className="p-4.5 rounded-2xl bg-[#F4EFE6] border border-stone-300 text-left text-xs space-y-1.5 text-stone-800">
            <div className="flex items-center gap-2 font-bold text-stone-900">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Verifizierte Produktbewertungen</span>
            </div>
            <p className="text-stone-700 leading-relaxed">
              Mit deiner Bestellnummer <strong>#{completedOrder.order_number}</strong> und deiner E-Mail-Adresse kannst du nach Erhalt deiner Früchte direkt eine verifizierte Bewertung im Shop abgeben.
            </p>
          </div>

          {/* Delivery Details */}
          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/80 text-left text-xs space-y-2">
            <div className="flex items-center gap-2 font-bold text-stone-900 text-sm">
              <Truck className="w-4 h-4 text-red-600" />
              <span>Schweizer Post Zustellung an:</span>
            </div>
            <p className="text-stone-700 leading-relaxed pl-6">
              {formData.firstName} {formData.lastName}<br />
              {formData.street}<br />
              {formData.plz} {formData.city}, Kanton {formData.canton}
            </p>
            <p className="text-stone-500 pt-1 pl-6">
              Eine Bestätigung wurde an{' '}
              <strong className="text-stone-800">{completedOrder.customer_email || formData.email}</strong> gesendet.
            </p>
          </div>

          {paymentMethod === 'bill' && (
            <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 text-left text-xs space-y-1">
              <p className="font-bold text-rose-950 flex items-center gap-1.5">
                <QrCode className="w-4 h-4 text-rose-700" />
                Schweizer QR-Rechnung
              </p>
              <p className="text-rose-800">
                Die QR-Rechnung mit 30 Tagen Zahlungsfrist liegt Ihrer Lieferung bei.
              </p>
            </div>
          )}

          {/* Ordered Items Summary */}
          {completedOrder.items && Array.isArray(completedOrder.items) && completedOrder.items.length > 0 && (
            <div className="p-5 rounded-2xl bg-white border border-stone-200/90 text-left space-y-3">
              <div className="flex items-center justify-between border-b border-stone-100 pb-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Bestellte Artikel ({completedOrder.items.length})
                </span>
                <span className="text-xs font-mono font-bold text-stone-900">
                  Total: CHF {Number(completedOrder.total_chf || total).toFixed(2)}
                </span>
              </div>

              <div className="divide-y divide-stone-100 max-h-64 overflow-y-auto pr-1">
                {completedOrder.items.map((item: any, idx: number) => {
                  const itemImage = item.image_url || item.image || '/images/placeholder.png';
                  const itemName = item.name_de || item.name || 'Bestelltes Produkt';
                  const itemPrice = Number(item.price_chf ?? item.price ?? 0);
                  const itemQty = Number(item.quantity || 1);

                  return (
                    <div
                      key={`${itemName}-${idx}`}
                      className="py-2.5 flex items-center justify-between gap-3 text-xs"
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
                            {item.form && (
                              <span className="px-1.5 py-0.5 rounded-md bg-stone-100 font-semibold text-stone-700">
                                {item.form}
                              </span>
                            )}
                            <span>Menge: {itemQty}×</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right shrink-0 font-mono font-bold text-stone-900 text-xs">
                        CHF {(itemPrice * itemQty).toFixed(2)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-2xl bg-stone-900 text-white font-bold text-sm hover:bg-stone-800 transition shadow-sm"
            >
              Zurück zum Shop
            </Link>
            {user && (
              <Link
                href="/konto"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-2xl bg-white border border-stone-300 text-stone-800 font-bold text-sm hover:bg-stone-50 transition"
              >
                Zu meinen Bestellungen
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Empty Cart Screen
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-stone-50 py-20 px-4 text-center">
        <div className="max-w-md mx-auto space-y-5 bg-white p-8 sm:p-10 rounded-3xl border border-stone-200 shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
            <Truck className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-black text-stone-900">
              Ihr Warenkorb ist leer
            </h1>
            <p className="text-sm text-stone-500">
              Wählen Sie Ihre Lieblingsfrüchte aus unserem Sortiment, bevor Sie zur
              Kasse gehen.
            </p>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-stone-900 text-white font-bold text-sm hover:bg-stone-800 transition shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Jetzt Früchte entdecken</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans antialiased py-10 sm:py-14 px-4 sm:px-6 lg:px-8 xl:px-12">
      <div className="max-w-[1600px] mx-auto">
        {/* Navigation Breadcrumb */}
        <div className="mb-8 space-y-3">
          <div className="flex items-center justify-between gap-4">
            <Breadcrumbs
              customItems={[
                { label: 'Shop', href: '/shop' },
                { label: 'Kasse' },
              ]}
            />
            <Link
              href="/shop"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-stone-900 transition shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Zurück zum Sortiment</span>
            </Link>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-stone-900">
            Kasse & Bestellung
          </h1>
          <p className="text-xs sm:text-sm text-stone-500">
            Sichere Schweizer Bezahlung & klimaneutraler Versand mit der Schweizer Post
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left Column: Form Cards */}
            <div className="lg:col-span-7 space-y-6">
              {/* Card 1: Contact Information */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-5">
                <div className="border-b border-stone-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-xs font-extrabold uppercase tracking-wider text-rose-700">
                      Schritt 1
                    </span>
                    <h2 className="text-lg font-black text-stone-900 mt-0.5">
                      Kontaktinformationen
                    </h2>
                  </div>
                  {user ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Automatisch ausgefüllt</span>
                    </span>
                  ) : (
                    <Link
                      href="/login?redirect=/checkout"
                      className="text-xs font-bold text-stone-700 hover:text-stone-900 hover:underline"
                    >
                      Bereits ein Konto? Anmelden
                    </Link>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-xs font-bold text-stone-700">
                      E-Mail-Adresse *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="ihre.adresse@example.ch"
                      className={`w-full px-4 py-3 rounded-xl border text-sm bg-stone-50/50 text-stone-900 placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-stone-900 focus:bg-white transition ${
                        errors.email ? 'border-red-500' : 'border-stone-200'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-xs font-bold text-stone-700">
                      Telefonnummer (für Versandbenachrichtigungen)
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+41 79 123 45 67"
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm bg-stone-50/50 text-stone-900 placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-stone-900 focus:bg-white transition"
                    />
                  </div>
                </div>
              </div>

              {/* Card 2: Delivery Address Switzerland */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-5">
                <div className="border-b border-stone-100 pb-4 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-extrabold uppercase tracking-wider text-rose-700">
                      Schritt 2
                    </span>
                    <h2 className="text-lg font-black text-stone-900 mt-0.5">
                      Lieferadresse (Schweiz / FL)
                    </h2>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-red-50 text-red-700 font-bold border border-red-200/80">
                    🇨🇭 CH / FL
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700">
                      Vorname *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Max"
                      className={`w-full px-4 py-3 rounded-xl border text-sm bg-stone-50/50 text-stone-900 placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-stone-900 focus:bg-white transition ${
                        errors.firstName ? 'border-red-500' : 'border-stone-200'
                      }`}
                    />
                    {errors.firstName && (
                      <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700">
                      Nachname *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Muster"
                      className={`w-full px-4 py-3 rounded-xl border text-sm bg-stone-50/50 text-stone-900 placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-stone-900 focus:bg-white transition ${
                        errors.lastName ? 'border-red-500' : 'border-stone-200'
                      }`}
                    />
                    {errors.lastName && (
                      <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>
                    )}
                  </div>

                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-xs font-bold text-stone-700">
                      Strasse & Hausnummer *
                    </label>
                    <input
                      type="text"
                      name="street"
                      value={formData.street}
                      onChange={handleInputChange}
                      placeholder="Bahnhofstrasse 12"
                      className={`w-full px-4 py-3 rounded-xl border text-sm bg-stone-50/50 text-stone-900 placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-stone-900 focus:bg-white transition ${
                        errors.street ? 'border-red-500' : 'border-stone-200'
                      }`}
                    />
                    {errors.street && (
                      <p className="text-xs text-red-500 mt-1">{errors.street}</p>
                    )}
                  </div>

                  {/* Swiss 4-digit PLZ with Validation */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700 flex items-center justify-between">
                      <span>PLZ (4 Ziffern) *</span>
                      <span className="text-[10px] text-stone-400 font-mono">z.B. 8001</span>
                    </label>
                    <input
                      type="text"
                      name="plz"
                      maxLength={4}
                      value={formData.plz}
                      onChange={handleInputChange}
                      placeholder="8001"
                      className={`w-full px-4 py-3 rounded-xl border text-sm font-mono bg-stone-50/50 text-stone-900 placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-stone-900 focus:bg-white transition ${
                        errors.plz ? 'border-red-500' : 'border-stone-200'
                      }`}
                    />
                    {errors.plz && (
                      <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        {errors.plz}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700">
                      Ort *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Zürich"
                      className={`w-full px-4 py-3 rounded-xl border text-sm bg-stone-50/50 text-stone-900 placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-stone-900 focus:bg-white transition ${
                        errors.city ? 'border-red-500' : 'border-stone-200'
                      }`}
                    />
                    {errors.city && (
                      <p className="text-xs text-red-500 mt-1">{errors.city}</p>
                    )}
                  </div>

                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-xs font-bold text-stone-700">
                      Kanton *
                    </label>
                    <select
                      name="canton"
                      value={formData.canton}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm bg-stone-50/50 text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-stone-900 focus:bg-white transition"
                    >
                      {SWISS_CANTONS.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.code} – {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Card 3: Payment Method Selection */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-5">
                <div className="border-b border-stone-100 pb-4">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-rose-700">
                    Schritt 3
                  </span>
                  <h2 className="text-lg font-black text-stone-900 mt-0.5">
                    Zahlungsmethode
                  </h2>
                </div>

                <div className="space-y-3">
                  {/* Option 1: TWINT */}
                  <label
                    className={`relative flex items-start gap-4 p-4 rounded-2xl border cursor-pointer transition ${
                      paymentMethod === 'twint'
                        ? 'border-stone-900 bg-stone-50 shadow-2xs'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="twint"
                      checked={paymentMethod === 'twint'}
                      onChange={() => setPaymentMethod('twint')}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-stone-900 flex items-center gap-2">
                          <Smartphone className="w-4 h-4 text-emerald-600" />
                          TWINT
                        </span>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          Schweizer Favorit 🇨🇭
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 mt-1">
                        Sekundenschnell mit der TWINT App per QR-Code bezahlen.
                      </p>
                    </div>
                  </label>

                  {/* Option 2: Kreditkarte */}
                  <label
                    className={`relative flex items-start gap-4 p-4 rounded-2xl border cursor-pointer transition ${
                      paymentMethod === 'card'
                        ? 'border-stone-900 bg-stone-50 shadow-2xs'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-stone-900 flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-blue-600" />
                          Kreditkarte / Debitkarte
                        </span>
                        <span className="text-[11px] font-mono text-stone-400">
                          Visa, Mastercard, AMEX
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 mt-1">
                        Sichere 256-Bit SSL-verschlüsselte Bezahlung.
                      </p>
                    </div>
                  </label>

                  {/* Option 3: Kauf auf Rechnung (Swiss QR-Bill) */}
                  <label
                    className={`relative flex items-start gap-4 p-4 rounded-2xl border cursor-pointer transition ${
                      paymentMethod === 'bill'
                        ? 'border-stone-900 bg-stone-50 shadow-2xs'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="bill"
                      checked={paymentMethod === 'bill'}
                      onChange={() => setPaymentMethod('bill')}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-stone-900 flex items-center gap-2">
                          <FileText className="w-4 h-4 text-stone-700" />
                          Kauf auf Rechnung (QR-Rechnung)
                        </span>
                        <span className="text-[11px] font-semibold text-stone-500">
                          30 Tage Zahlungsfrist
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 mt-1">
                        Zahlen Sie bequem nach Erhalt der Ware per Schweizer QR-Rechnung.
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Right Column: Order Review & Pricing */}
            <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
                <h2 className="text-lg font-black text-stone-900 border-b border-stone-100 pb-4">
                  Ihre Bestellung ({items.reduce((s, i) => s + i.quantity, 0)} Artikel)
                </h2>

                {/* Items List with Precise Form and Size */}
                <div className="divide-y divide-stone-100 max-h-72 overflow-y-auto pr-1">
                  {items.map((item) => (
                    <div key={item.variantId} className="py-3 flex items-center gap-3">
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                        <Image
                          src={item.image || getProductDisplayImage(item)}
                          alt={item.name || (item as any).name_de || 'Produktbild'}
                          fill
                          unoptimized
                          className="object-cover"
                        />
                        <span className="absolute bottom-0 right-0 bg-stone-900/80 text-white font-mono text-[10px] px-1 rounded-tl-md">
                          x{item.quantity}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-stone-900 truncate">
                          {item.name}
                        </p>
                        {item.sku && (
                          <p className="text-[10px] text-stone-400 font-mono">
                            SKU: {item.sku}
                          </p>
                        )}
                      </div>

                      <div className="text-right font-mono text-sm font-black text-stone-900">
                        CHF {(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Cost Breakdown */}
                <div className="space-y-2.5 pt-4 border-t border-stone-100 text-xs">
                  <div className="flex justify-between text-stone-600">
                    <span>Zwischensumme</span>
                    <span className="font-mono font-bold text-stone-900">
                      CHF {subtotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between text-stone-600">
                    <span className="flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5 text-red-600" />
                      Schweizer Post Versand
                    </span>
                    <span className="font-mono font-bold text-stone-900">
                      {shipping === 0 ? (
                        <span className="text-emerald-700 font-black">
                          Kostenlos
                        </span>
                      ) : (
                        `CHF ${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>

                  {/* Coupon Discount Row if applied */}
                  {appliedCoupon && discountChf > 0 && (
                    <div className="flex justify-between text-emerald-700 font-semibold">
                      <span className="flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5 text-emerald-600" />
                        Rabatt ({appliedCoupon.code}):
                      </span>
                      <span className="font-mono font-bold">
                        - CHF {discountChf.toFixed(2)}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between text-stone-400 text-[11px]">
                    <span>Darin enthaltene 2.6% MwSt.</span>
                    <span className="font-mono">
                      CHF {vatIncluded.toFixed(2)}
                    </span>
                  </div>

                  {/* Coupon Code Section */}
                  <div className="pt-3 pb-1 border-t border-stone-100">
                    {appliedCoupon ? (
                      <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs">
                        <div className="flex items-center gap-2 text-emerald-800 font-bold min-w-0">
                          <Tag className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span className="truncate">Gutschein &ldquo;{appliedCoupon.code}&rdquo;</span>
                          <span className="text-emerald-700 font-semibold text-[11px] shrink-0">
                            ({appliedCoupon.discount_type === 'percentage' ? `-${appliedCoupon.discount_value}%` : `- CHF ${appliedCoupon.discount_value.toFixed(2)}`})
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={handleRemoveCoupon}
                          className="p-1 rounded-lg text-emerald-700 hover:text-emerald-950 hover:bg-emerald-100 transition cursor-pointer shrink-0 ml-1"
                          title="Gutschein entfernen"
                          aria-label="Gutschein entfernen"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-1.5">
                        <label htmlFor="coupon-input" className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                          Gutscheincode
                        </label>
                        <div className="flex gap-2">
                          <input
                            id="coupon-input"
                            type="text"
                            value={couponCodeInput}
                            onChange={(e) => {
                              setCouponCodeInput(e.target.value.toUpperCase());
                              setCouponError(null);
                            }}
                            placeholder="z. B. WILLKOMMEN10"
                            className="flex-1 px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 focus:bg-white focus:border-stone-900 focus:ring-1 focus:ring-stone-900 text-xs font-mono font-bold text-stone-900 outline-none uppercase placeholder:normal-case placeholder:font-normal placeholder:text-stone-400"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleApplyCoupon();
                              }
                            }}
                          />
                          <button
                            type="button"
                            onClick={handleApplyCoupon}
                            disabled={couponLoading || !couponCodeInput.trim()}
                            className="px-4 py-2 rounded-xl bg-stone-900 text-white font-bold text-xs hover:bg-stone-800 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer shrink-0"
                          >
                            {couponLoading ? 'Prüfen...' : 'Anwenden'}
                          </button>
                        </div>
                        {couponError && (
                          <p className="text-xs text-rose-600 flex items-center gap-1 pt-0.5">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>{couponError}</span>
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex justify-between items-baseline text-base font-extrabold text-stone-900">
                    <span>Gesamtbetrag</span>
                    <span className="text-2xl font-mono font-black">
                      CHF {finalTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Submit Error Banner if any */}
                {submitError && (
                  <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span>{submitError}</span>
                  </div>
                )}

                {/* Order Confirmation CTA */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 rounded-2xl bg-stone-900 text-white hover:bg-stone-800 active:scale-[0.98] font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Wird bearbeitet...</span>
                    </div>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Jetzt bestellen • CHF {finalTotal.toFixed(2)}</span>
                    </>
                  )}
                </button>

                {/* Swiss Trust Seals */}
                <div className="pt-4 border-t border-stone-100 grid grid-cols-2 gap-3 text-[11px] text-stone-500">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>256-Bit SSL Schutz</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
                    <span>Schweizer Händler</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
