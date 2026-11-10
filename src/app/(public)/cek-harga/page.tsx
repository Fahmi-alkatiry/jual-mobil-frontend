import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import TrustSignals from "@/components/TrustSignals";

export const metadata: Metadata = {
  title: "Cek Estimasi Harga Mobil Bekas Online Gratis",
  description:
    "Hitung taksiran harga jual mobil bekas Anda secara akurat dalam 2 menit. Dapatkan penawaran tertinggi dari dealer resmi Putra Aditya Motor.",
  alternates: {
    canonical: "/cek-harga",
  },
  openGraph: {
    title: "Cek Estimasi Harga Mobil Bekas Online Gratis | Putra Aditya Motor",
    description:
      "Hitung taksiran harga mobil Anda dalam 2 menit. Bebas biaya admin & inspeksi gratis langsung ke rumah se-Jabodetabek.",
    url: "https://putraadityamotor.id/cek-harga",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

const CekHarga = () => {
  return (
    <section id="cara-kerja" className="py-4 mb-16 bg-white overflow-hidden">
      <HeroSection />
      <TrustSignals />
    </section>
  );
};

export default CekHarga;
