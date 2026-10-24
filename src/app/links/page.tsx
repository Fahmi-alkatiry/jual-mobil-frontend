"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Share2,
  CheckCircle2,
  MessageCircle,
  Instagram,
  Facebook,
  MapPin,
  Phone,
  Car,
  Sparkles,
  Globe,
  FileText,
  Clock,
  ArrowRight,
  ExternalLink,
  Check,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import { CONTACT } from "@/lib/contact";

export default function LinksPage() {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: "Putra Aditya Motor — Bio Links",
      text: "Pusat Jual Beli Mobil Bekas Cepat Jabodetabek. Dana Cair 30 Menit & Inspeksi Gratis ke Rumah.",
      url: typeof window !== "undefined" ? window.location.href : "https://jualmobilku.my.id/links",
    };

    if (
      typeof navigator !== "undefined" &&
      navigator.share &&
      navigator.canShare &&
      navigator.canShare(shareData)
    ) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
      }
    }

    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        toast.success("Tautan berhasil disalin ke clipboard!");
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      toast.error("Gagal menyalin tautan.");
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 relative selection:bg-primary/20 selection:text-primary">
      {/* Background Decorator */}
      <div
        className="pointer-events-none fixed inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(#cbd5e1 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-80 bg-gradient-to-b from-primary/10 via-amber-500/5 to-transparent blur-3xl"
        aria-hidden="true"
      />

      {/* Main Container */}
      <div className="relative z-10 max-w-md mx-auto px-4 py-6 sm:py-10 flex flex-col items-center">
        {/* Top Header Bar */}
        <header className="w-full flex items-center justify-between mb-6">
          <Link
            href="/"
            className="text-xs font-semibold text-slate-500 hover:text-primary transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 border border-slate-200/80 shadow-xs backdrop-blur-sm"
          >
            <Car className="w-3.5 h-3.5 text-primary" />
            <span>Website Utama</span>
          </Link>

          <button
            type="button"
            onClick={handleShare}
            aria-label="Bagikan profil Putra Aditya Motor"
            className="text-xs font-semibold text-slate-700 hover:text-primary transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 border border-slate-200/80 shadow-xs hover:shadow-sm backdrop-blur-sm active:scale-95"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-600 font-bold">Tersalin!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Bagikan</span>
              </>
            )}
          </button>
        </header>

        {/* Profile / Avatar */}
        <div className="relative mb-4 group">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-amber-600 via-primary to-orange-400 p-1 shadow-xl shadow-primary/20 ring-4 ring-white flex items-center justify-center transition-transform group-hover:scale-105 duration-300">
            <div className="w-full h-full rounded-[22px] bg-gradient-to-tr from-primary to-amber-500 flex items-center justify-center text-white">
              <Car className="w-12 h-12 stroke-[2.2]" />
            </div>
          </div>
          {/* Verified Badge */}
          <div
            className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-blue-500 text-white flex items-center justify-center ring-2 ring-white shadow-md"
            title="Dealer Terverifikasi"
          >
            <Check className="w-4 h-4 stroke-[3]" />
          </div>
        </div>

        {/* Brand Name & Verified Title */}
        <div className="text-center mb-1 flex items-center justify-center gap-1.5">
          <h1 className="text-2xl font-black tracking-tight text-slate-900">
            Putra Aditya Motor
          </h1>
          <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" fill="currentColor" color="#ffffff" />
        </div>

        {/* Trust Pill */}
        <div className="mb-3">
          <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-[11px] font-extrabold uppercase tracking-wider">
            <ShieldCheck className="w-3 h-3" />
            Showroom & Dealer Terpercaya
          </span>
        </div>

        {/* Tagline / Bio */}
        <p className="text-center text-sm font-medium text-slate-600 leading-relaxed max-w-sm mb-6">
          Showroom & Pusat Jual Beli Mobil Bekas Cepat Jabodetabek. Dana Cair 30
          Menit &amp; Layanan Inspeksi Gratis ke Rumah Anda.
        </p>

        {/* Quick Social & Action Icons Row */}
        <div className="w-full flex items-center justify-center gap-3.5 mb-8">
          {/* WhatsApp */}
          <a
            href={CONTACT.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat WhatsApp"
            className="w-11 h-11 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-500/25 transition-all hover:scale-110 active:scale-95"
            title="WhatsApp Resmi"
          >
            <MessageCircle className="w-5 h-5" />
          </a>

          {/* Instagram */}
          <a
            href={CONTACT.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram Resmi"
            className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center shadow-md shadow-rose-500/25 transition-all hover:scale-110 active:scale-95"
            title="Instagram @putraadityamotor"
          >
            <Instagram className="w-5 h-5" />
          </a>

          {/* Facebook */}
          <a
            href={CONTACT.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook Page"
            className="w-11 h-11 rounded-2xl bg-[#1877F2] hover:bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/25 transition-all hover:scale-110 active:scale-95"
            title="Facebook Page"
          >
            <Facebook className="w-5 h-5" />
          </a>

          {/* Google Maps */}
          <a
            href={CONTACT.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Lokasi Google Maps"
            className="w-11 h-11 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center shadow-md shadow-rose-500/25 transition-all hover:scale-110 active:scale-95"
            title="Lokasi Google Maps"
          >
            <MapPin className="w-5 h-5" />
          </a>

          {/* Phone Call */}
          <a
            href={`tel:+${CONTACT.whatsapp}`}
            aria-label="Telepon Langsung"
            className="w-11 h-11 rounded-2xl bg-slate-800 hover:bg-slate-900 text-white flex items-center justify-center shadow-md shadow-slate-800/25 transition-all hover:scale-110 active:scale-95"
            title="Telepon Langsung"
          >
            <Phone className="w-5 h-5" />
          </a>
        </div>

        {/* Link Cards List */}
        <div className="w-full flex flex-col gap-3.5 mb-8">
          {/* 1. Featured WhatsApp Card */}
          <a
            href={CONTACT.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-600 to-teal-600 p-4 text-white shadow-lg shadow-emerald-600/20 hover:shadow-xl hover:shadow-emerald-600/30 transition-all border border-emerald-500/30 active:scale-[0.99]"
          >
            {/* Top Shine Accent */}
            <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />

            <div className="flex items-center gap-3.5 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/20 shadow-xs">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-extrabold uppercase tracking-wide">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-200 animate-pulse" />
                    Utama • Respon Cepat
                  </span>
                </div>
                <h2 className="text-base font-extrabold leading-snug">
                  Chat WhatsApp Resmi
                </h2>
                <p className="text-xs text-emerald-100 font-medium truncate">
                  {CONTACT.whatsappDisplay} • Konsultasi Cepat &amp; Gratis
                </p>
              </div>

              <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center shrink-0 group-hover:bg-white group-hover:text-emerald-700 transition-colors">
                <ExternalLink className="w-4 h-4" />
              </div>
            </div>
          </a>

          {/* 2. Cek Estimasi Harga Mobil */}
          <Link
            href="/cek-harga"
            className="group flex items-center gap-3.5 rounded-2xl bg-white p-4 border border-slate-200/90 shadow-xs hover:border-primary/50 hover:shadow-md transition-all active:scale-[0.99]"
          >
            <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
              <Sparkles className="w-6 h-6" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wide">
                  Gratis
                </span>
                <span className="text-[10px] font-semibold text-slate-400">
                  Estimasi Akurat
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-primary transition-colors">
                Cek Estimasi Harga Mobil
              </h2>
              <p className="text-xs text-slate-500 font-medium truncate">
                Hitung taksiran harga jual mobil Anda dalam 2 menit
              </p>
            </div>

            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-500 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>

          {/* 3. Mobil Yang Kami Beli */}
          <Link
            href="/mobil-yang-kami-beli"
            className="group flex items-center gap-3.5 rounded-2xl bg-white p-4 border border-slate-200/90 shadow-xs hover:border-blue-400/50 hover:shadow-md transition-all active:scale-[0.99]"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Car className="w-6 h-6" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wide border border-blue-200/60">
                  Semua Merek
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                Mobil Yang Kami Beli
              </h2>
              <p className="text-xs text-slate-500 font-medium truncate">
                Kriteria merek, tahun, &amp; kondisi mobil yang kami terima
              </p>
            </div>

            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>

          {/* 4. Instagram Resmi */}
          <a
            href={CONTACT.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3.5 rounded-2xl bg-white p-4 border border-slate-200/90 shadow-xs hover:border-rose-400/50 hover:shadow-md transition-all active:scale-[0.99]"
          >
            <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center shrink-0 text-rose-600 group-hover:bg-rose-600 group-hover:text-white transition-colors">
              <Instagram className="w-6 h-6" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 text-[10px] font-bold uppercase tracking-wide border border-rose-200/60">
                  Instagram
                </span>
                <span className="text-[10px] font-semibold text-slate-400">
                  Update Harian
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                Instagram Resmi
              </h2>
              <p className="text-xs text-slate-500 font-medium truncate">
                {CONTACT.instagramHandle} • Galeri unit masuk &amp; tips
              </p>
            </div>

            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-500 group-hover:bg-rose-50 group-hover:text-rose-600 transition-colors">
              <ExternalLink className="w-4 h-4" />
            </div>
          </a>

          {/* 5. Facebook Page Resmi */}
          <a
            href={CONTACT.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3.5 rounded-2xl bg-white p-4 border border-slate-200/90 shadow-xs hover:border-indigo-400/50 hover:shadow-md transition-all active:scale-[0.99]"
          >
            <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <Facebook className="w-6 h-6" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-wide border border-indigo-200/60">
                  Facebook
                </span>
                <span className="text-[10px] font-semibold text-slate-400">
                  Komunitas
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                Facebook Page Resmi
              </h2>
              <p className="text-xs text-slate-500 font-medium truncate">
                {CONTACT.facebookHandle} • Info promo &amp; ulasan pelanggan
              </p>
            </div>

            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-500 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
              <ExternalLink className="w-4 h-4" />
            </div>
          </a>

          {/* 6. Petunjuk Arah Google Maps */}
          <a
            href={CONTACT.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3.5 rounded-2xl bg-white p-4 border border-slate-200/90 shadow-xs hover:border-red-400/50 hover:shadow-md transition-all active:scale-[0.99]"
          >
            <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center shrink-0 text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
              <MapPin className="w-6 h-6" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="px-2 py-0.5 rounded-full bg-red-50 text-red-600 text-[10px] font-bold uppercase tracking-wide border border-red-200/60">
                  Lokasi
                </span>
                <span className="text-[10px] font-semibold text-slate-400">
                  Jabodetabek
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                Petunjuk Arah Google Maps
              </h2>
              <p className="text-xs text-slate-500 font-medium truncate">
                Layanan inspeksi jemput langsung se-Jabodetabek
              </p>
            </div>

            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-500 group-hover:bg-red-50 group-hover:text-red-600 transition-colors">
              <ExternalLink className="w-4 h-4" />
            </div>
          </a>

          {/* 7. Website Utama */}
          <Link
            href="/"
            className="group flex items-center gap-3.5 rounded-2xl bg-white p-4 border border-slate-200/90 shadow-xs hover:border-slate-400/50 hover:shadow-md transition-all active:scale-[0.99]"
          >
            <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 text-slate-700 group-hover:bg-slate-800 group-hover:text-white transition-colors">
              <Globe className="w-6 h-6" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold uppercase tracking-wide">
                  Portal Resmi
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-slate-700 transition-colors">
                Website Utama
              </h2>
              <p className="text-xs text-slate-500 font-medium truncate">
                Kunjungi portal lengkap Putra Aditya Motor
              </p>
            </div>

            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-500 group-hover:bg-slate-200 transition-colors">
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>

          {/* 8. Panduan Cara Jual Mobil */}
          <Link
            href="/cara-kerja"
            className="group flex items-center gap-3.5 rounded-2xl bg-white p-4 border border-slate-200/90 shadow-xs hover:border-amber-400/50 hover:shadow-md transition-all active:scale-[0.99]"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0 text-amber-700 group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <FileText className="w-6 h-6" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-bold uppercase tracking-wide border border-amber-200/60">
                  Panduan
                </span>
                <span className="text-[10px] font-semibold text-slate-400">
                  3 Langkah
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                Panduan Cara Jual Mobil
              </h2>
              <p className="text-xs text-slate-500 font-medium truncate">
                Prosedur mudah: Penawaran, inspeksi gratis, uang cair
              </p>
            </div>

            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-500 group-hover:bg-amber-50 group-hover:text-amber-700 transition-colors">
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>

          {/* 9. Highlight / 24 Hours Service Card */}
          <div className="rounded-2xl bg-gradient-to-br from-amber-50 via-orange-50/40 to-slate-50 p-4 border border-amber-200/80 shadow-xs">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                <Clock className="w-5 h-5" />
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-1.5 mb-1">
                  <h3 className="text-sm font-bold text-slate-900">
                    Layanan 24 Jam Nonstop
                  </h3>
                  <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold">
                    <Zap className="w-2.5 h-2.5 fill-current" />
                    Siap Respon
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Butuh jual mobil mendesak hari ini? Tim kami siap melayani
                  inspeksi gratis langsung ke lokasi Anda di seluruh Jabodetabek.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Value Points Pill Row */}
        <div className="w-full flex flex-wrap items-center justify-center gap-2 mb-6 text-[11px] font-bold text-slate-500">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-slate-200/70 shadow-xs">
            <Check className="w-3 h-3 text-emerald-600" />
            Dana Cair 30 Menit
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-slate-200/70 shadow-xs">
            <Check className="w-3 h-3 text-emerald-600" />
            Bebas Biaya Admin
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-slate-200/70 shadow-xs">
            <Check className="w-3 h-3 text-emerald-600" />
            Inspeksi di Rumah
          </span>
        </div>

        {/* Footer */}
        <footer className="text-center pt-2 pb-6 border-t border-slate-200/80 w-full">
          <p className="text-xs font-semibold text-slate-600 mb-1">
            Putra Aditya Motor — Jual Mobil Cepat &amp; Aman
          </p>
          <p className="text-[11px] text-slate-400">
            &copy; {new Date().getFullYear()} Putra Aditya Motor. Semua hak dilindungi.
          </p>
        </footer>
      </div>
    </main>
  );
}
