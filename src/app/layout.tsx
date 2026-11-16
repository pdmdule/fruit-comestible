import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import CookieConsent from "@/components/CookieConsent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.fruit-comestible.ch"),
  title: {
    default: "Fruit-Comestible | 100 % natürliche gefriergetrocknete Früchte Schweiz",
    template: "%s | Fruit-Comestible Schweiz",
  },
  description:
    "Knusprige, schonend gefriergetrocknete Früchte in Premium-Qualität. 100 % natürlich, ohne Zuckerzusatz und voller Vitamine. Schneller Versand in der ganzen Schweiz.",
  keywords: [
    "gefriergetrocknete Früchte Schweiz",
    "Trockenfrüchte kaufen",
    "Fruchtpulver",
    "gefriergetrocknete Erdbeeren",
    "gesunde Snacks Schweiz",
    "Fruit-Comestible",
  ],
  openGraph: {
    title: "Fruit-Comestible | 100 % natürliche gefriergetrocknete Früchte Schweiz",
    description:
      "Knusprige, schonend gefriergetrocknete Früchte in Premium-Qualität. 100 % natürlich, ohne Zuckerzusatz und voller Vitamine. Schneller Versand in der ganzen Schweiz.",
    url: "https://www.fruit-comestible.ch",
    siteName: "Fruit-Comestible",
    locale: "de_CH",
    type: "website",
  },
  icons: {
    icon: "/logo.webp",
    shortcut: "/logo.webp",
    apple: "/logo.webp",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="de"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-stone-50 text-stone-900 font-sans antialiased selection:bg-rose-100 selection:text-rose-900">
        <AuthProvider>
          <CartProvider>
            <Header />
            <div className="flex-1">{children}</div>
            <Footer />
            <CartDrawer />
          </CartProvider>
        </AuthProvider>
        <CookieConsent />
      </body>
    </html>
  );
}
