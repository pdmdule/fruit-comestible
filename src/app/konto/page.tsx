'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth, type UserProfile } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import Breadcrumbs from '@/components/Breadcrumbs';
import OrderHistory, { type Order, type OrderRecord } from '@/components/OrderHistory';
import {
  User,
  MapPin,
  Package,
  LogOut,
  CheckCircle2,
  AlertCircle,
  Truck,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export type { Order, OrderRecord };
export type OrderItem = Order;

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

function KontoDashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');

  const { user, profile, loading: authLoading, updateProfile, signOut } = useAuth();

  const [activeTab, setActiveTab] = useState<'daten' | 'adresse' | 'bestellungen'>('daten');

  // Sync tab with URL param if provided
  useEffect(() => {
    if (tabParam === 'bestellungen') {
      setActiveTab('bestellungen');
    } else if (tabParam === 'adresse') {
      setActiveTab('adresse');
    } else if (tabParam === 'daten') {
      setActiveTab('daten');
    }
  }, [tabParam]);

  // Form: Meine Daten
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');

  // Form: Lieferadresse
  const [streetAddress, setStreetAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [canton, setCanton] = useState('ZH');

  // Orders
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  // Notifications
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Populate state from profile
  useEffect(() => {
    if (profile) {
      setFirstName(profile.first_name || user?.user_metadata?.first_name || '');
      setLastName(profile.last_name || user?.user_metadata?.last_name || '');
      setPhone(profile.phone || '');
      setStreetAddress(profile.street_address || '');
      setPostalCode(profile.postal_code || '');
      setCity(profile.city || '');
      setCanton(profile.canton || 'ZH');
    } else if (user) {
      setFirstName(user.user_metadata?.first_name || '');
      setLastName(user.user_metadata?.last_name || '');
    }
  }, [profile, user]);

  // Protect route
  useEffect(() => {
    if (!authLoading && !user) {
      router.replace('/login?redirect=/konto');
    }
  }, [user, authLoading, router]);

  // Fetch orders for user
  useEffect(() => {
    if (!user?.email) return;

    let isMounted = true;
    setOrdersLoading(true);

    const loadOrders = async () => {
      let combined: OrderItem[] = [];

      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('customer_email', user.email)
          .order('created_at', { ascending: false });

        if (data && Array.isArray(data)) {
          combined.push(...data);
        }
      } catch (err) {
        console.warn('Notice loading orders from database:', err);
      }

      // Also read local storage cache for any recent orders
      try {
        const localRaw = localStorage.getItem('fc_user_orders');
        if (localRaw) {
          const localOrders: OrderItem[] = JSON.parse(localRaw);
          const filteredLocal = localOrders.filter(
            (o) => !o.customer_email || o.customer_email.toLowerCase() === user.email?.toLowerCase()
          );

          // Deduplicate by order_number
          const existingNumbers = new Set(combined.map((o) => String(o.order_number)));
          for (const lo of filteredLocal) {
            if (!existingNumbers.has(String(lo.order_number))) {
              combined.push(lo);
              existingNumbers.add(String(lo.order_number));
            }
          }
        }
      } catch (err) {
        console.warn('Notice reading local orders cache:', err);
      }

      // Sort newest first
      combined.sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

      if (isMounted) {
        setOrders(combined);
        setOrdersLoading(false);
      }
    };

    loadOrders();

    return () => {
      isMounted = false;
    };
  }, [user]);

  // Handle saving "Meine Daten"
  const handleSaveDaten = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setStatusMessage(null);

    const res = await updateProfile({
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      phone: phone.trim(),
    });

    setIsSaving(false);
    if (!res.success || res.error) {
      setStatusMessage({
        type: 'error',
        text: res.error || 'Fehler beim Speichern der persönlichen Daten.',
      });
    } else {
      setStatusMessage({
        type: 'success',
        text: 'Persönliche Daten erfolgreich aktualisiert.',
      });
      setTimeout(() => setStatusMessage(null), 4000);
    }
  };

  // Handle saving "Lieferadresse"
  const handleSaveAdresse = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setStatusMessage(null);

    const res = await updateProfile({
      street_address: streetAddress.trim(),
      postal_code: postalCode.trim(),
      city: city.trim(),
      canton: canton.trim(),
      country: 'Schweiz',
      phone: phone.trim(),
    });

    setIsSaving(false);
    if (!res.success || res.error) {
      setStatusMessage({
        type: 'error',
        text: res.error || 'Fehler beim Speichern der Lieferadresse.',
      });
    } else {
      setStatusMessage({
        type: 'success',
        text: 'Schweizer Lieferadresse erfolgreich gespeichert.',
      });
      setTimeout(() => setStatusMessage(null), 4000);
    }
  };

  const handleLogout = async () => {
    await signOut();
    router.push('/');
    router.refresh();
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center text-stone-400 text-sm">
        Konto wird geladen...
      </div>
    );
  }

  const displayName =
    firstName || profile?.first_name || user.user_metadata?.first_name || 'Kunde';

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans antialiased">
      {/* Top Breadcrumb Bar */}
      <div className="border-b border-stone-200/80 bg-white">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-3.5 flex items-center justify-between text-xs">
          <Breadcrumbs customItems={[{ label: 'Mein Konto' }]} />
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-stone-900 transition cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Abmelden</span>
          </button>
        </div>
      </div>

      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-10 sm:py-14 space-y-8">
        {/* User Hero Banner */}
        <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-stone-900 text-white flex items-center justify-center font-bold text-xl uppercase shadow-xs">
              {displayName.charAt(0)}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-stone-900">
                  Guten Tag, {displayName}!
                </h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/70 text-emerald-800 text-[11px] font-bold">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  Kunde
                </span>
              </div>
              <p className="text-xs text-stone-500 font-mono">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/shop"
              className="px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs flex items-center gap-2 transition shadow-xs"
            >
              <span>Zum Sortiment</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Status Toast */}
        {statusMessage && (
          <div
            className={`p-4 rounded-2xl border text-xs font-medium flex items-center gap-2.5 animate-in fade-in duration-200 ${
              statusMessage.type === 'success'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-rose-50 border-rose-200 text-rose-800'
            }`}
          >
            {statusMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        )}

        {/* 3-Section Navigation Tabs */}
        <div className="flex border-b border-stone-200 gap-2 sm:gap-4 overflow-x-auto no-scrollbar scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveTab('daten')}
            className={`pb-3.5 px-3 sm:px-4 text-xs sm:text-sm font-bold flex items-center gap-2 transition cursor-pointer border-b-2 whitespace-nowrap ${
              activeTab === 'daten'
                ? 'border-stone-900 text-stone-900'
                : 'border-transparent text-stone-400 hover:text-stone-700'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Meine Daten</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('adresse')}
            className={`pb-3.5 px-3 sm:px-4 text-xs sm:text-sm font-bold flex items-center gap-2 transition cursor-pointer border-b-2 whitespace-nowrap ${
              activeTab === 'adresse'
                ? 'border-stone-900 text-stone-900'
                : 'border-transparent text-stone-400 hover:text-stone-700'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Lieferadresse</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('bestellungen')}
            className={`pb-3.5 px-3 sm:px-4 text-xs sm:text-sm font-bold flex items-center gap-2 transition cursor-pointer border-b-2 whitespace-nowrap ${
              activeTab === 'bestellungen'
                ? 'border-stone-900 text-stone-900'
                : 'border-transparent text-stone-400 hover:text-stone-700'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Bestellungen</span>
            {orders.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-stone-100 text-stone-700 font-mono text-[10px] font-bold">
                {orders.length}
              </span>
            )}
          </button>
        </div>

        {/* Tab 1: Meine Daten */}
        {activeTab === 'daten' && (
          <div className="max-w-2xl bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="border-b border-stone-100 pb-4">
              <h2 className="text-lg font-black tracking-tight text-stone-900">
                Persönliche Angaben
              </h2>
              <p className="text-xs text-stone-500">
                Verwalte deinen Namen und deine Kontaktangaben.
              </p>
            </div>

            <form onSubmit={handleSaveDaten} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    Vorname
                  </label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Anna"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-900 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    Nachname
                  </label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Muster"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-900 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  E-Mail-Adresse (fest hinterlegt)
                </label>
                <input
                  type="email"
                  disabled
                  value={user.email || ''}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-stone-500 font-mono text-sm cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  Telefonnummer (für Postzustellung)
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+41 79 123 45 67"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-900 transition"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-sm transition shadow-xs cursor-pointer disabled:opacity-60"
                >
                  {isSaving ? 'Wird gespeichert...' : 'Änderungen speichern'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tab 2: Lieferadresse */}
        {activeTab === 'adresse' && (
          <div className="max-w-2xl bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="border-b border-stone-100 pb-4">
              <div className="flex items-center gap-2 mb-1">
                <Truck className="w-5 h-5 text-red-600" />
                <h2 className="text-lg font-black tracking-tight text-stone-900">
                  Primäre Schweizer Lieferadresse
                </h2>
              </div>
              <p className="text-xs text-stone-500">
                Diese Adresse wird bei deinen Bestellungen an der Kasse automatisch vorausgefüllt.
              </p>
            </div>

            <form onSubmit={handleSaveAdresse} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  Strasse und Hausnummer
                </label>
                <input
                  type="text"
                  required
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                  placeholder="Bahnhofstrasse 12"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-900 transition"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    Postleitzahl (PLZ)
                  </label>
                  <input
                    type="text"
                    required
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="8001"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-900 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    Ortschaft
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Zürich"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-900 transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    Kanton
                  </label>
                  <select
                    value={canton}
                    onChange={(e) => setCanton(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-900 transition cursor-pointer"
                  >
                    {SWISS_CANTONS.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.code} – {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    Land
                  </label>
                  <input
                    type="text"
                    disabled
                    value="Schweiz 🇨🇭"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-stone-600 font-bold text-sm cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-sm transition shadow-xs cursor-pointer disabled:opacity-60"
                >
                  {isSaving ? 'Wird gespeichert...' : 'Lieferadresse speichern'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tab 3: Bestellungen */}
        {activeTab === 'bestellungen' && (
          <div className="space-y-5">
            <div className="border-b border-stone-200/80 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-lg font-black tracking-tight text-stone-900">
                  Bestellverlauf
                </h2>
                <p className="text-xs text-stone-500">
                  Alle mit {user.email} getätigten Einkäufe.
                </p>
              </div>
              <span className="text-xs text-stone-500 font-medium">
                {orders.length} {orders.length === 1 ? 'Bestellung' : 'Bestellungen'}
              </span>
            </div>

            <OrderHistory orders={orders} isLoading={ordersLoading} />
          </div>
        )}
      </main>
    </div>
  );
}

export default function KontoPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-stone-50 flex items-center justify-center text-stone-400 text-sm">
          Konto wird geladen...
        </div>
      }
    >
      <KontoDashboardContent />
    </Suspense>
  );
}
