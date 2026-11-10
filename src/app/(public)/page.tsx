// frontend-v2/src/app/%28public%29/page.tsx
import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import TrustSignals from "@/components/TrustSignals";
import HomeCarousel from "@/components/HomeCarousel";
import PriceEstimateForm from "@/components/PriceEstimateForm";

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

  metadataBase: new URL("https://putraadityamotor.id"),

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Jual Mobil Cepat & Aman | Putra Aditya Motor",
    description: "Inspeksi gratis, proses cepat, harga terbaik.",
    url: "https://putraadityamotor.id",
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
      url: "https://putraadityamotor.id",
      logo: "https://putraadityamotor.id/logo.png",
      image: "https://putraadityamotor.id/og-home.jpg",
      telephone: "+6281585029377",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Jl. Kemenyan, RT.8/RW.5, Ciganjur, Kec. Jagakarsa",
        addressLocality: "Kota Jakarta Selatan",
        addressRegion: "DKI Jakarta",
        postalCode: "12640",
        addressCountry: "ID",
      },
      hasMap: "https://maps.app.goo.gl/grnQgLGcd7ny8yiy5?g_st=iw",
      areaServed: {
        "@type": "Country",
        name: "Indonesia",
      },
      sameAs: [
        "https://instagram.com/putraadityamotor",
        "https://facebook.com/putraadityamotor",
      ],
      description:
        "Pusat jual beli mobil bekas cepat, aman, dan harga transparan di Jabodetabek. Dana cair 30 menit & inspeksi gratis ke rumah.",
      priceRange: "Rp 50.000.000 - Rp 1.000.000.000",
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "08:00",
          closes: "21:00",
        },
      ],
      geo: {
        "@type": "GeoCoordinates",
        latitude: -6.3402,
        longitude: 106.8045,
      },
    }),
  }}
/>
    <main className="min-h-screen">
      <HomeCarousel />
      <PriceEstimateForm />
      {/* <HeroSection /> */}
      <TrustSignals />
    </main>
    </>
  );
}
