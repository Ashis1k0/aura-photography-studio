import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SkipLink } from "@/components/layout/SkipLink";
import type { Metadata, Viewport } from "next";
import { Cinzel, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://aura-atelier.com"),
  title: {
    default: "Aura Atelier | Luxury & Fine Art Editorial Photography",
    template: "%s | Aura Atelier",
  },
  description:
    "Fine art wedding, editorial fashion, intimate portrait, and commercial architecture photography. Documenting emotion and light worldwide.",
  keywords: [
    "Fine Art Photography",
    "Luxury Wedding Photographer",
    "Editorial Fashion Photography",
    "Destination Wedding",
    "Character Portraits",
    "Architecture Photography",
  ],
  authors: [{ name: "Aura Atelier" }],
  creator: "Aura Atelier",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aura-atelier.com",
    siteName: "Aura Atelier",
    title: "Aura Atelier | Luxury & Fine Art Editorial Photography",
    description:
      "Fine art wedding, editorial fashion, intimate portrait, and commercial architecture photography.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200",
        width: 1200,
        height: 630,
        alt: "Aura Atelier Fine Art Photography",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aura Atelier | Luxury & Fine Art Editorial Photography",
    description: "Capturing stories through light, emotion and movement.",
    images: ["https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0C",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cinzel.variable} ${plusJakarta.variable}`}>
      <body className="bg-background text-ivory antialiased selection:bg-gold selection:text-background flex flex-col min-h-screen">
        <SkipLink />
        <Header />
        <main id="main-content" className="flex-1 focus:outline-none">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
