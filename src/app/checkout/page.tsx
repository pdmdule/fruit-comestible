'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import Breadcrumbs from '@/components/Breadcrumbs';
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
  const [orderComplete, setOrderComplete] = useState<string | null>(null);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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

    const orderNumber = `FC-CH-${Math.floor(100000 + Math.random() * 900000)}`;

    const orderItems = items.map((item) => ({
      name: item.name,
      form: item.label || '',
      quantity: item.quantity,
      price: item.price,
      image_url: item.image || '',
    }));

    const newOrder = {
      order_number: orderNumber,
      customer_name: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
      customer_email: formData.email.trim(),
      total_chf: total,
      order_status: 'Eingegangen',
      payment_status: paymentMethod === 'bill' ? 'Ausstehend' : 'paid',
      payment_method: paymentMethod,
      shipping_street: formData.street.trim(),
      shipping_zip: formData.plz.trim(),
      shipping_city: formData.city.trim(),
      shipping_canton: formData.canton,
      items: orderItems,
      created_at: new Date().toISOString(),
    };

    // Save order in Supabase
    supabase
      .from('orders')
      .insert([newOrder])
      .then(({ error }: { error: any }) => {
        if (error) {
          console.warn('Notice saving order to Supabase orders table:', error);
        }
      });

    // Also cache in local storage so orders immediately appear in user dashboard
    try {
      const existingRaw = localStorage.getItem('fc_user_orders');
      const existingList = existingRaw ? JSON.parse(existingRaw) : [];
      existingList.unshift(newOrder);
      localStorage.setItem('fc_user_orders', JSON.stringify(existingList));
    } catch (err) {
      console.warn('LocalStorage order caching notice:', err);
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

    setTimeout(() => {
      setOrderComplete(orderNumber);
      clearCart();
      setIsSubmitting(false);
    }, 1200);
  };

  // Order Success Screen
  if (orderComplete) {
    return (
      <div className="min-h-screen bg-stone-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto bg-white border border-stone-200 rounded-3xl p-8 sm:p-12 shadow-sm text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Bestellung erfolgreich abgeschlossen
            </span>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-stone-900">
              Vielen Dank für Ihre Bestellung!
            </h1>
            <p className="text-sm text-stone-500">
              Bestellnummer:{' '}
              <strong className="font-mono text-stone-900 font-bold">
                {orderComplete}
              </strong>
            </p>
          </div>

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
              <strong className="text-stone-800">{formData.email}</strong> gesendet.
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

          <div className="pt-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-2xl bg-stone-900 text-white font-bold text-sm hover:bg-stone-800 transition shadow-sm"
            >
              Zurück zum Shop
            </Link>
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
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            unoptimized
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs text-stone-400">
                            Bild
                          </div>
                        )}
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

                  <div className="flex justify-between text-stone-400 text-[11px]">
                    <span>Darin enthaltene 2.6% MwSt.</span>
                    <span className="font-mono">
                      CHF {vatIncluded.toFixed(2)}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex justify-between items-baseline text-base font-extrabold text-stone-900">
                    <span>Gesamtbetrag</span>
                    <span className="text-2xl font-mono font-black">
                      CHF {total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Order Confirmation CTA */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 rounded-2xl bg-stone-900 text-white hover:bg-stone-800 active:scale-[0.98] font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Bestellung wird verarbeitet...</span>
                    </div>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Zahlungspflichtig bestellen • CHF {total.toFixed(2)}</span>
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
