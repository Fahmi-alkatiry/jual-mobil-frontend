import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Katalog Mobil Yang Kami Beli — MPV, SUV, City Car, & LCGC",
  description:
    "Lihat daftar merek dan tipe mobil yang dibeli oleh Putra Aditya Motor: Toyota Avanza, Innova, Calya, Honda Brio, HR-V, Daihatsu Sigra, Xenia, dan lainnya. Penawaran harga transparan & terbaik.",
  alternates: {
    canonical: "/mobil-yang-kami-beli",
  },
  openGraph: {
    title: "Katalog Mobil Yang Kami Beli | Putra Aditya Motor",
    description:
      "Kami menerima mobil bekas segala merek dan tipe (2016-2024). Cek kriteria mobil dan dapatkan penawaran harga terbaik.",
    url: "https://putraadityamotor.id/mobil-yang-kami-beli",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function MobilYangKamiBeliLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
