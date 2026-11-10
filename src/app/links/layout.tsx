import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bio Links & Kontak Resmi",
  description:
    "Semua tautan resmi Putra Aditya Motor: Konsultasi WhatsApp 24 Jam, Cek Estimasi Harga Mobil, Instagram, Facebook, dan Website Resmi.",
  alternates: {
    canonical: "/links",
  },
  openGraph: {
    title: "Putra Aditya Motor — Bio Links & Kontak Resmi",
    description:
      "Pusat Jual Beli Mobil Bekas Cepat, Aman, & Terpercaya Jabodetabek. Dana Cair 30 Menit & Inspeksi Gratis ke Rumah.",
    url: "/links",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Putra Aditya Motor - Bio Links & Kontak Resmi",
      },
    ],
  },
};

export default function LinksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

