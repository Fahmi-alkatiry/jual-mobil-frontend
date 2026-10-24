"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  ArrowLeft,
  Car,
  User,
  ShieldCheck,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Gauge,
  Clock,
  Loader2,
  ExternalLink,
  MessageCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const STATUS_CONFIG = {
  BARU: {
    color: "bg-blue-100 text-blue-700 border-blue-200",
    label: "STATUS BARU",
  },
  DIPROSES: {
    color: "bg-amber-100 text-amber-700 border-amber-200",
    label: "SEDANG DIPROSES",
  },
  SELESAI: {
    color: "bg-emerald-100 text-emerald-700 border-emerald-200",
    label: "TERJUAL / SELESAI",
  },
  BATAL: {
    color: "bg-rose-100 text-rose-700 border-rose-200",
    label: "DIBATALKAN",
  },
};

type OfferStatus = keyof typeof STATUS_CONFIG;

export default function OfferDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [offer, setOffer] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    api
      .get(`/offers/${id}`)
      .then((res) => {
        setOffer(res.data.data);
      })
      .catch((err) => {
        console.error("Gagal mengambil detail penawaran:", err);
        toast.error("Data penawaran tidak ditemukan");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const updateStatus = async (status: OfferStatus) => {
    setUpdating(true);
    try {
      const res = await api.patch(`/offers/${id}/status`, { status });
      if (res.data.success) {
        setOffer((prev: any) => ({ ...prev, status }));
        toast.success(`Status penawaran diperbarui ke ${STATUS_CONFIG[status]?.label || status}`);
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Gagal memperbarui status");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <Loader2 className="w-9 h-9 animate-spin text-blue-600" />
        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
          Memuat Detail Penawaran...
        </p>
      </div>
    );
  }

  if (!offer) {
    return (
      <div className="max-w-xl mx-auto py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
          <Car className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-black text-slate-800">Penawaran Tidak Ditemukan</h2>
        <p className="text-sm text-slate-500">
          Data penawaran mobil ini mungkin telah dihapus atau ID tidak valid.
        </p>
        <Button onClick={() => router.push("/admin/dashboard")} variant="outline" className="rounded-xl">
          Kembali ke Dashboard
        </Button>
      </div>
    );
  }

  const cleanPhone = offer.whatsapp?.replace(/\D/g, "") || "";
  const waGreeting = encodeURIComponent(
    `Halo Bapak/Ibu ${offer.fullName},\n\nTerima kasih telah mengajukan penjualan unit *${offer.brand} ${offer.model} (${offer.year})* di Putra Aditya Motor.\n\nKami ingin mengonfirmasi kelengkapan data dan jadwal inspeksi gratis di rumah Anda. Kapan waktu yang paling luang untuk kunjungan tim teknisi kami? Terima kasih.`
  );
  const waUrl = `https://wa.me/${cleanPhone}?text=${waGreeting}`;

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* TOP NAVIGATION & ACTIONS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.back()}
          className="rounded-xl font-bold border-slate-200 self-start hover:bg-slate-50"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Kembali
        </Button>

        <div className="flex items-center gap-2.5">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider hidden sm:inline">
            Ubah Status:
          </span>
          <Select
            value={offer.status}
            disabled={updating}
            onValueChange={(val) => updateStatus(val as OfferStatus)}
          >
            <SelectTrigger
              className={cn(
                "h-10 w-44 rounded-xl font-black text-xs border shadow-sm transition-all",
                STATUS_CONFIG[offer.status as OfferStatus]?.color || "bg-slate-100 text-slate-700"
              )}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-slate-200">
              {Object.entries(STATUS_CONFIG).map(([key, config]) => (
                <SelectItem key={key} value={key} className="text-xs font-bold">
                  {config.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* LEAD HERO CARD */}
      <div className="rounded-3xl border bg-white p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                ID #{offer.id}
              </span>
              <Badge
                variant="outline"
                className={cn(
                  "rounded-full font-black text-xs px-3 py-1 border",
                  STATUS_CONFIG[offer.status as OfferStatus]?.color || "bg-slate-100 text-slate-700"
                )}
              >
                {STATUS_CONFIG[offer.status as OfferStatus]?.label || offer.status}
              </Badge>
              <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 ml-1">
                <Clock className="w-3.5 h-3.5" />
                {new Date(offer.createdAt).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {offer.brand} {offer.model}
            </h1>
            <p className="text-sm font-semibold text-slate-500">
              Pengajuan inspeksi penjualan mobil perorangan
            </p>
          </div>

          {/* QUICK CTA */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 shrink-0">
            {cleanPhone && (
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button className="w-full sm:w-auto rounded-xl bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold text-xs sm:text-sm h-11 px-5 shadow-lg shadow-emerald-500/20 flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Chat WhatsApp
                </Button>
              </a>
            )}
            {cleanPhone && (
              <a href={`tel:${cleanPhone}`} className="w-full sm:w-auto">
                <Button variant="outline" className="w-full sm:w-auto rounded-xl font-bold text-xs sm:text-sm h-11 px-4 border-slate-200 hover:bg-slate-50 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-600" />
                  Telepon
                </Button>
              </a>
            )}
          </div>
        </div>

        {/* 3-GRID DETAIL PANELS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 1. DATA PENJUAL */}
          <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-4">
            <div className="flex items-center gap-2 text-slate-900 font-black text-sm">
              <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
              <span>Data Penjual / Klien</span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="font-bold text-slate-400 uppercase text-[10px] tracking-wider block">
                  Nama Lengkap
                </span>
                <span className="font-extrabold text-slate-900 text-sm mt-0.5 block">
                  {offer.fullName}
                </span>
              </div>

              <div>
                <span className="font-bold text-slate-400 uppercase text-[10px] tracking-wider block">
                  Nomor WhatsApp
                </span>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-emerald-600 hover:underline flex items-center gap-1 mt-0.5"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  {offer.whatsapp}
                </a>
              </div>

              <div>
                <span className="font-bold text-slate-400 uppercase text-[10px] tracking-wider block">
                  Email
                </span>
                <span className="font-medium text-slate-700 mt-0.5 block">
                  {offer.email || "-"}
                </span>
              </div>

              <div>
                <span className="font-bold text-slate-400 uppercase text-[10px] tracking-wider block">
                  Lokasi Inspeksi
                </span>
                <div className="mt-1">
                  <Badge variant="outline" className="font-bold bg-white text-slate-800 border-slate-200">
                    <MapPin className="w-3 h-3 mr-1 text-rose-500" />
                    {offer.location}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* 2. SPESIFIKASI MOBIL */}
          <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-4">
            <div className="flex items-center gap-2 text-slate-900 font-black text-sm">
              <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center">
                <Car className="w-4 h-4" />
              </div>
              <span>Spesifikasi Kendaraan</span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="font-bold text-slate-400 uppercase text-[10px] tracking-wider block">
                  Merek / Brand
                </span>
                <span className="font-extrabold text-slate-900 text-sm mt-0.5 block">
                  {offer.brand}
                </span>
              </div>

              <div>
                <span className="font-bold text-slate-400 uppercase text-[10px] tracking-wider block">
                  Model / Tipe
                </span>
                <span className="font-extrabold text-slate-900 text-sm mt-0.5 block">
                  {offer.model}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="font-bold text-slate-400 uppercase text-[10px] tracking-wider block">
                    Tahun
                  </span>
                  <span className="font-bold text-slate-800 text-xs mt-0.5 block">
                    {offer.year}
                  </span>
                </div>
                <div>
                  <span className="font-bold text-slate-400 uppercase text-[10px] tracking-wider block">
                    Transmisi
                  </span>
                  <span className="font-bold text-slate-800 text-xs mt-0.5 block">
                    {offer.transmission}
                  </span>
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-400 uppercase text-[10px] tracking-wider block">
                  Warna Kendaraan
                </span>
                <span className="font-medium text-slate-700 mt-0.5 block">
                  {offer.color}
                </span>
              </div>
            </div>
          </div>

          {/* 3. KONDISI & LEGALITAS */}
          <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-4">
            <div className="flex items-center gap-2 text-slate-900 font-black text-sm">
              <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span>Kondisi & Dokumen</span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="font-bold text-slate-400 uppercase text-[10px] tracking-wider block">
                  Kilometer (KM)
                </span>
                <span className="font-extrabold text-blue-600 text-sm mt-0.5 flex items-center gap-1.5">
                  <Gauge className="w-4 h-4" />
                  {offer.mileage ? `${Number(offer.mileage).toLocaleString("id-ID")} KM` : "0 KM"}
                </span>
              </div>

              <div>
                <span className="font-bold text-slate-400 uppercase text-[10px] tracking-wider block">
                  Kondisi Umum
                </span>
                <span className="font-bold text-slate-800 mt-0.5 block">
                  {offer.generalCondition || "Tidak ada catatan"}
                </span>
              </div>

              <div>
                <span className="font-bold text-slate-400 uppercase text-[10px] tracking-wider block">
                  Masa Berlaku Pajak STNK
                </span>
                <span className="font-bold text-slate-800 mt-0.5 block">
                  {offer.taxDate
                    ? new Date(offer.taxDate).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : "Belum tercatat"}
                </span>
              </div>

              <div>
                <span className="font-bold text-slate-400 uppercase text-[10px] tracking-wider block">
                  Kepemilikan STNK
                </span>
                <div className="mt-1">
                  <Badge variant="outline" className="font-bold bg-white text-slate-800 border-slate-200">
                    {offer.stnkOwnership}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
