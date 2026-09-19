"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import PurchasedCarCard from "@/components/PurchasedCarCard";
import { type PurchasedCar } from "@/types/purchasedCar";
import { cn } from "@/lib/utils";
import { Loader2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const FILTERS = [
  { label: "Semua", value: "ALL" },
  { label: "MPV", value: "MPV" },
  { label: "City Car", value: "CITY_CAR" },
  { label: "LCGC", value: "LCGC" },
  { label: "SUV", value: "SUV" },
] as const;

export default function MobilYangKamiBeliPage() {
  const [cars, setCars] = useState<PurchasedCar[]>([]);
  const [category, setCategory] = useState<string>("ALL");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchCars = async () => {
    setLoading(true);
    try {
      const res = await api.get("/purchased-cars", { params: { category: category !== "ALL" ? category : undefined, search: search || undefined, page, limit: 12 } });
      setCars(res.data.data);
      setTotalPages(res.data.pagination?.totalPages ?? 1);
    } catch {}
    setLoading(false);
  };

  useEffect(() => { fetchCars(); }, [category, page]);
  useEffect(() => { const t = setTimeout(() => { setPage(1); fetchCars(); }, 400); return () => clearTimeout(t); }, [search]);

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-black tracking-tight text-slate-900">Mobil Yang Kami Beli</h1>
          <p className="mt-2 text-sm font-medium text-slate-500">Kumpulan mobil yang telah kami beli — filter berdasarkan kategori. Harga estimasi Rp 115jt – 215jt.</p>
        </div>

        <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {FILTERS.map(f => (
              <button key={f.value} onClick={() => { setCategory(f.value); setPage(1); }}
                className={cn("rounded-full px-4 py-2 text-xs font-black border transition-colors", category === f.value ? "bg-blue-600 text-white border-blue-600" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50")}>
                {f.label}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input placeholder="Cari merek atau model..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10 rounded-xl h-10 bg-white" />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-16"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>
        ) : cars.length === 0 ? (
          <div className="py-16 text-center rounded-2xl border bg-white mt-6">
            <p className="font-bold text-slate-400">Belum ada mobil di kategori ini</p>
          </div>
        ) : (
          <>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {cars.map(c => <PurchasedCarCard key={c.id} car={c} />)}
            </div>
            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                <button disabled={page <= 1} onClick={() => setPage(p => p - 1)} className="rounded-xl border bg-white px-4 py-2 text-xs font-bold disabled:opacity-40">Sebelumnya</button>
                <span className="text-xs font-bold text-slate-500">Halaman {page} / {totalPages}</span>
                <button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)} className="rounded-xl border bg-white px-4 py-2 text-xs font-bold disabled:opacity-40">Berikutnya</button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
