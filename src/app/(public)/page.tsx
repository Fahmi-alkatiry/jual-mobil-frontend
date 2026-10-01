// frontend-v2/src/app/%28public%29/page.tsx
import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import TrustSignals from "@/components/TrustSignals";
import HomeCarousel from "@/components/HomeCarousel";

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

  authors: [{ name: "Putra Aditya Motor" }],
  creator: "Putra Aditya Motor",
  publisher: "Putra Aditya Motor",

  metadataBase: new URL("https://jualmobilku.my.id"),

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Jual Mobil Cepat & Aman | Putra Aditya Motor",
    description: "Inspeksi gratis, proses cepat, harga terbaik.",
    url: "https://jualmobilku.my.id",
    siteName: "Putra Aditya Motor",
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
      name: "Putra Aditya Motor",
      url: "https://jualmobilku.my.id",
      logo: "https://jualmobilku.my.id/logo.png",
      image: "https://jualmobilku.my.id/og-home.jpg",
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
        "https://instagram.com/putraadityamotor",
        "https://facebook.com/putraadityamotor",
      ],
    }),
  }}
/>
    <main className="min-h-screen">
      <HomeCarousel />
      <HeroSection />
      <TrustSignals />
    </main>
    </>
  );
}
