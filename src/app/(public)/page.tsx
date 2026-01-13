// frontend-v2/src/app/%28public%29/page.tsx
import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import TrustSignals from "@/components/TrustSignals";

export const metadata: Metadata = {
  title: "Jual Mobil Cepat & Aman | Inspeksi Gratis",
  description:
    "Jual mobil bekas Anda dengan cepat, aman, dan harga terbaik. Inspeksi gratis di lokasi Anda, proses mudah tanpa ribet.",

  keywords: [
    "jual mobil",
    "jual mobil bekas",
    "jual mobil cepat",
    "jual mobil online",
    "inspeksi mobil gratis",
  ],

  authors: [{ name: "Nama Brand Kamu" }],
  creator: "Nama Brand Kamu",
  publisher: "Nama Brand Kamu",

  metadataBase: new URL("https://domainkamu.com"),

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Jual Mobil Cepat & Aman",
    description: "Inspeksi gratis, proses cepat, harga terbaik.",
    url: "https://domainkamu.com",
    siteName: "Nama Brand Kamu",
    images: [
      {
        url: "/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "Jual Mobil Cepat & Aman",
      },
    ],
    locale: "id_ID",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Jual Mobil Cepat & Aman",
    description: "Inspeksi gratis & harga terbaik.",
    images: ["/og-home.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },
};


export default function Home() {
  return (
    <>
   <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "AutomotiveBusiness",
      name: "Nama Brand Kamu",
      url: "https://domainkamu.com",
      logo: "https://domainkamu.com/logo.png",
      image: "https://domainkamu.com/og-home.jpg",
      telephone: "+628123456789",
      address: {
        "@type": "PostalAddress",
        addressCountry: "ID",
      },
      areaServed: {
        "@type": "Country",
        name: "Indonesia",
      },
      sameAs: [
        "https://instagram.com/brandkamu",
        "https://facebook.com/brandkamu",
      ],
    }),
  }}
/>
    <main className="min-h-screen">
      <HeroSection />
      <TrustSignals />
    </main>
    </>
  );
}
