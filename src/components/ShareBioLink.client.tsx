"use client";

import { useState } from "react";
import Link from "next/link";
import { Share2, Check, ArrowUpRight, Sparkles, Link2 } from "lucide-react";
import { toast } from "sonner";

interface ShareBioLinkProps {
  variant?: "button" | "banner";
  className?: string;
}

export function ShareBioLinkButton({ className = "" }: { className?: string }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const origin =
      typeof window !== "undefined"
        ? window.location.origin
        : "https://jualmobilku.my.id";
    const shareUrl = `${origin}/links`;

    const shareData = {
      title: "Putra Aditya Motor — Semua Link & Kontak Resmi",
      text: "Akses seluruh kontak resmi, WhatsApp, estimasi harga mobil, dan media sosial Putra Aditya Motor di satu halaman:",
      url: shareUrl,
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
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        toast.success("Tautan halaman link berhasil disalin!");
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      toast.error("Gagal menyalin tautan.");
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      aria-label="Bagikan Halaman Link Putra Aditya Motor"
      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all border shadow-xs active:scale-95 ${
        copied
          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
          : "bg-white text-slate-700 border-slate-200 hover:border-primary/40 hover:text-primary hover:bg-orange-50/40"
      } ${className}`}
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-emerald-600" />
          <span>Tersalin!</span>
        </>
      ) : (
        <>
          <Share2 className="w-3.5 h-3.5 text-primary" />
          <span>Bagikan Halaman Link</span>
        </>
      )}
    </button>
  );
}

export function BioLinkBanner({ className = "" }: { className?: string }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const origin =
      typeof window !== "undefined"
        ? window.location.origin
        : "https://jualmobilku.my.id";
    const shareUrl = `${origin}/links`;

    const shareData = {
      title: "Putra Aditya Motor — Semua Link & Kontak Resmi",
      text: "Akses seluruh tautan resmi, WhatsApp, cek estimasi harga, dan media sosial Putra Aditya Motor:",
      url: shareUrl,
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
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        toast.success("Tautan halaman link berhasil disalin!");
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      toast.error("Gagal menyalin tautan.");
    }
  };

  return (
    <div
      className={`relative overflow-hidden rounded-[2rem] border border-orange-200/80 bg-gradient-to-br from-orange-500 via-primary to-amber-500 p-6 md:p-8 text-white shadow-lg shadow-orange-500/15 ${className}`}
    >
      {/* Background Glow Accent */}
      <div className="absolute top-0 right-0 -mr-10 -mt-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shrink-0 shadow-xs">
            <Link2 className="w-6 h-6 md:w-7 md:h-7 text-white" />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-black uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-amber-200" />
                Semua Tautan Dalam 1 Halaman
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">
              Halaman Bio Link Resmi
            </h3>
            <p className="text-white/90 text-xs md:text-sm mt-1 max-w-xl font-medium leading-relaxed">
              Akses cepat WhatsApp 24 Jam, formulir estimasi harga jual mobil,
              katalog mobil yang kami beli, dan seluruh sosial media kami di satu
              tempat.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto shrink-0">
          <Link
            href="/links"
            className="flex-1 md:flex-initial inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-full bg-white text-slate-900 font-extrabold text-xs shadow-md hover:bg-slate-50 hover:shadow-lg transition-all active:scale-95"
          >
            <span>Buka Halaman Link</span>
            <ArrowUpRight className="w-4 h-4 text-primary" />
          </Link>

          <button
            type="button"
            onClick={handleShare}
            aria-label="Bagikan Halaman Link"
            className={`inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-full font-bold text-xs transition-all border active:scale-95 ${
              copied
                ? "bg-emerald-500 text-white border-emerald-400"
                : "bg-white/15 text-white border-white/30 hover:bg-white/25 backdrop-blur-sm"
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>Tersalin!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-white" />
                <span>Bagikan</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
