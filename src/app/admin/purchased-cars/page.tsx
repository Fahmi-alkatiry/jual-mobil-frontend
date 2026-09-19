"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Plus, Search, Trash2, Pencil, EyeOff } from "lucide-react";
import { type PurchasedCar, CATEGORY_LABEL, formatPriceRange, formatYearRange } from "@/types/purchasedCar";

export default function AdminPurchasedCarsPage() {
  const [cars, setCars] = useState<PurchasedCar[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");
  const [published, setPublished] = useState("ALL");

  const fetchCars = async () => {
    setLoading(true);
    try {
      const res = await api.get("/purchased-cars", {
        params: {
          page,
          search: search || undefined,
          category: category !== "ALL" ? category : undefined,
          published: published !== "ALL" ? published : undefined,
        },
      });
      setCars(res.data.data);
      setTotalPages(res.data.pagination?.totalPages ?? 1);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  useEffect(() => { fetchCars(); }, [page, category, published]);
  useEffect(() => { const t = setTimeout(() => { setPage(1); fetchCars(); }, 400); return () => clearTimeout(t); }, [search]);

  const del = async (id: number) => {
    if (!confirm("Hapus mobil ini?")) return;
    try { await api.delete(`/purchased-cars/${id}`); toast.success("Dihapus"); fetchCars(); }
    catch (e: any) { toast.error(e.response?.data?.message || "Gagal hapus"); }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900">Mobil Yang Kami Beli</h1>
          <p className="text-sm text-slate-500 font-medium">Kelola katalog mobil — card di halaman publik.</p>
        </div>
        <Link href="/admin/purchased-cars/new"><Button className="rounded-xl bg-blue-600 hover:bg-blue-700 font-bold"><Plus className="w-4 h-4 mr-2" />Tambah Mobil</Button></Link>
      </div>

      <div className="bg-white p-4 rounded-2xl border shadow-sm flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input placeholder="Cari merek atau model..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10 h-10 rounded-xl" />
        </div>
        <Select value={category} onValueChange={v => { setCategory(v); setPage(1); }}>
          <SelectTrigger className="w-full md:w-40 rounded-xl h-10 font-bold"><SelectValue placeholder="Kategori" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Semua</SelectItem>
            <SelectItem value="MPV">MPV</SelectItem>
            <SelectItem value="CITY_CAR">City Car</SelectItem>
            <SelectItem value="LCGC">LCGC</SelectItem>
            <SelectItem value="SUV">SUV</SelectItem>
          </SelectContent>
        </Select>
        <Select value={published} onValueChange={v => { setPublished(v); setPage(1); }}>
          <SelectTrigger className="w-full md:w-36 rounded-xl h-10 font-bold"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Semua Status</SelectItem>
            <SelectItem value="true">Published</SelectItem>
            <SelectItem value="false">Draft</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>
      ) : cars.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-2xl border"><p className="font-bold text-slate-400">Belum ada data. Tambah mobil pertama.</p></div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {cars.map(c => (
              <Card key={c.id} className="overflow-hidden rounded-2xl border bg-white">
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img src={c.imageUrl} alt={`${c.brand} ${c.model}`} className="h-full w-full object-cover" loading="lazy" />
                  <Badge className="absolute left-3 top-3 rounded-full bg-white/90 text-slate-800 border-slate-200 font-bold text-[10px]">{CATEGORY_LABEL[c.category]}</Badge>
                  {!c.isPublished && <Badge variant="destructive" className="absolute right-3 top-3 rounded-full text-[10px]">Draft</Badge>}
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="font-black text-slate-900 leading-tight">{c.brand} {c.model} • {formatYearRange(c.yearMin, c.yearMax)}</h3>
                  <p className="text-sm font-black text-blue-600">{formatPriceRange(c.priceMin, c.priceMax)}</p>
                  <div className="flex gap-2 pt-2">
                    <Link href={`/admin/purchased-cars/${c.id}`} className="flex-1"><Button variant="outline" size="sm" className="w-full rounded-xl font-bold"><Pencil className="w-3.5 h-3.5 mr-1" />Edit</Button></Link>
                    <Button variant="outline" size="sm" onClick={() => del(c.id)} className="rounded-xl text-rose-600 hover:bg-rose-50"><Trash2 className="w-4 h-4" /></Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage(p => p - 1)} className="rounded-xl">Sebelumnya</Button>
              <span className="text-xs font-bold text-slate-500">Halaman {page} / {totalPages}</span>
              <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage(p => p + 1)} className="rounded-xl">Berikutnya</Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
