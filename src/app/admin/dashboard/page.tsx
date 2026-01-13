"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import {
  Loader2,
  RefreshCcw,
  CalendarIcon,
  MessageCircle,
  Search,
  Car,
  Filter
} from "lucide-react";

/**
 * Konfigurasi Warna Status
 */
const STATUS_CONFIG = {
  BARU: {
    color: "bg-blue-100 text-blue-600 border-blue-200",
    label: "BARU"
  },
  DIPROSES: {
    color: "bg-amber-100 text-amber-600 border-amber-200",
    label: "DIPROSES"
  },
  SELESAI: {
    color: "bg-emerald-100 text-emerald-600 border-emerald-200",
    label: "TERJUAL"
  },
  BATAL: {
    color: "bg-rose-100 text-rose-600 border-rose-200",
    label: "DIBATALKAN"
  }
};

type OfferStatus = keyof typeof STATUS_CONFIG;

interface Offer {
  id: number;
  fullName: string;
  whatsapp: string;
  brand: string;
  model: string;
  year: number;
  location: string;
  status: OfferStatus;
  createdAt: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function AdminDashboardPage() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [statistics, setStatistics] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Filter States
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const from = dateRange?.from ? format(dateRange.from, "yyyy-MM-dd") : "";
  const to = dateRange?.to ? format(dateRange.to, "yyyy-MM-dd") : "";

  const fetchOffers = async () => {
    setLoading(true);
    try {
      const res = await api.get("/offers", {
        params: { 
          page, 
          search, 
          from, 
          to, 
          status: statusFilter !== "ALL" ? statusFilter : undefined 
        },
      });
      setOffers(res.data.data);
      setPagination(res.data.pagination);
      setStatistics(res.data.statistics);
    } catch (err) {
      console.error("Fetch offers error:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: number, status: OfferStatus) => {
    try {
      await api.patch(`/offers/${id}/status`, { status });
      fetchOffers();
    } catch (err) {
      console.error("Update status error:", err);
    }
  };

  // Trigger fetch saat halaman atau filter status berubah secara instan (opsional)
  // Di sini kita trigger saat page berubah, sementara filter lain pakai tombol "Terapkan"
  useEffect(() => {
    fetchOffers();
  }, [page]);

  const handleReset = () => {
    setSearch("");
    setStatusFilter("ALL");
    setDateRange(undefined);
    setPage(1);
    // Kita panggil fetch manual setelah reset state (atau gunakan useEffect)
  };

  return (
    <div className="space-y-6 p-4 md:p-8 bg-slate-50/30 min-h-screen font-sans">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-xl shadow-lg shadow-blue-100">
            <Car className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900">Dashboard Penawaran</h1>
            <p className="text-sm text-muted-foreground font-medium">
              Manajemen data real-time JualMobilku
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={fetchOffers}
          disabled={loading}
          className="rounded-xl font-bold border-slate-200"
        >
          <RefreshCcw className={cn("mr-2 h-4 w-4 text-slate-500", loading && "animate-spin")} />
          Refresh Data
        </Button>
      </div>

      {/* SEARCH & FILTER BAR */}
      <div className="bg-white p-5 rounded-2xl border shadow-sm space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Cari nama klien, merek mobil, model, atau lokasi..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="h-11 pl-10 rounded-xl border-slate-200 focus-visible:ring-blue-500 transition-all"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Status Filter */}
          <div className="w-full md:w-48">
            <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setPage(1); }}>
              <SelectTrigger className="rounded-xl font-bold h-10 border-slate-200">
                <div className="flex items-center gap-2">
                  <Filter className="w-3.5 h-3.5 text-blue-600" />
                  <SelectValue placeholder="Status" />
                </div>
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="ALL" className="font-bold text-xs">SEMUA STATUS</SelectItem>
                <SelectItem value="BARU" className="font-bold text-xs text-blue-600">STATUS BARU</SelectItem>
                <SelectItem value="DIPROSES" className="font-bold text-xs text-amber-600">DIPROSES</SelectItem>
                <SelectItem value="SELESAI" className="font-bold text-xs text-emerald-600">TERJUAL</SelectItem>
                <SelectItem value="BATAL" className="font-bold text-xs text-rose-600">DIBATALKAN</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date Picker */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full md:w-[280px] justify-start text-left font-bold h-10 rounded-xl border-slate-200",
                  !dateRange && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-blue-600" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <span className="truncate">
                      {format(dateRange.from, "dd MMM")} - {format(dateRange.to, "dd MMM yyyy")}
                    </span>
                  ) : (
                    format(dateRange.from, "dd MMM yyyy")
                  )
                ) : (
                  <span>Pilih tanggal</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={(range) => { setDateRange(range); setPage(1); }}
                numberOfMonths={2}
                initialFocus
                className="rounded-xl border shadow-2xl"
              />
            </PopoverContent>
          </Popover>

          <Button 
            variant="default" 
            onClick={fetchOffers}
            className="rounded-xl bg-blue-600 hover:bg-blue-700 font-bold px-6 shadow-lg shadow-blue-100 transition-all ml-auto md:ml-0"
          >
            Terapkan Filter
          </Button>

          {(search || statusFilter !== "ALL" || dateRange) && (
            <Button
              variant="ghost"
              onClick={handleReset}
              className="text-slate-400 font-bold hover:text-rose-500 transition-colors"
            >
              Reset
            </Button>
          )}
        </div>
      </div>

      {/* STATISTICS CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: "Total Unit", value: statistics?.TOTAL || 0, color: "text-slate-900", icon: null },
          { label: "Status Baru", value: statistics?.BARU || 0, color: "text-blue-600", icon: "BARU" },
          { label: "Diproses", value: statistics?.DIPROSES || 0, color: "text-amber-600", icon: "DIPROSES" },
          { label: "Terjual", value: statistics?.SELESAI || 0, color: "text-emerald-600", icon: "SELESAI" },
          { label: "Dibatalkan", value: statistics?.BATAL || 0, color: "text-rose-600", icon: "BATAL" },
        ].map((item) => (
          <div
            key={item.label}
            onClick={() => { if(item.icon) setStatusFilter(item.icon); fetchOffers(); }}
            className="rounded-2xl border bg-white p-5 shadow-sm transition-all hover:shadow-md hover:-translate-y-1 cursor-pointer group"
          >
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 group-hover:text-primary transition-colors">
              {item.label}
            </p>
            <p className={cn("text-3xl font-black tracking-tight", item.color)}>
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* TABLE SECTION */}
      <div className="relative overflow-hidden rounded-2xl border bg-white shadow-sm">
        {loading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60 backdrop-blur-[1px]">
            <div className="flex flex-col items-center gap-2">
               <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
               <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Sinkronisasi...</p>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow>
                <TableHead className="font-bold py-4 px-6 text-[11px] text-slate-400 uppercase tracking-widest">Klien & Kontak</TableHead>
                <TableHead className="font-bold py-4 text-[11px] text-slate-400 uppercase tracking-widest">Informasi Unit</TableHead>
                <TableHead className="font-bold py-4 text-[11px] text-slate-400 uppercase tracking-widest text-center">Lokasi</TableHead>
                <TableHead className="font-bold py-4 text-[11px] text-slate-400 uppercase tracking-widest">Progres Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {offers.map((o) => (
                <TableRow key={o.id} className="hover:bg-slate-50/30 transition-colors">
                  <TableCell className="px-6 py-4">
                    <div className="font-bold text-slate-900 leading-tight">{o.fullName}</div>
                    <a
                      href={`https://wa.me/${o.whatsapp.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-emerald-600 font-bold flex items-center gap-1 mt-1 hover:underline"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      {o.whatsapp}
                    </a>
                  </TableCell>

                  <TableCell className="py-4">
                    <div className="font-bold text-slate-800 leading-tight">
                      {o.brand} {o.model}
                    </div>
                    <div className="flex gap-2 mt-1">
                      <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded uppercase">
                        {o.year}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="py-4 text-center">
                    <Badge variant="outline" className="rounded-full font-bold text-[10px] border-slate-200 py-0.5">
                      {o.location}
                    </Badge>
                  </TableCell>

                  <TableCell className="py-4">
                    <Select
                      defaultValue={o.status}
                      onValueChange={(v) => updateStatus(o.id, v as OfferStatus)}
                    >
                      <SelectTrigger className={cn(
                        "h-8 w-32 text-[10px] font-black rounded-full border shadow-sm transition-all",
                        STATUS_CONFIG[o.status]?.color || "bg-slate-100 text-slate-600"
                      )}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-slate-200">
                        {Object.entries(STATUS_CONFIG).map(([key, config]) => (
                          <SelectItem key={key} value={key} className="text-[11px] font-bold">
                            {config.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}

              {!loading && offers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="py-24 text-center">
                    <div className="flex flex-col items-center text-slate-300">
                       <Filter className="w-12 h-12 mb-2 opacity-20" />
                       <p className="font-bold">Tidak ada data yang sesuai filter</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* PAGINATION SECTION */}
      {pagination && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            Halaman {pagination.page} dari {pagination.totalPages}
          </p>

          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              className="h-9 px-4 rounded-xl font-bold border-slate-200 hover:bg-slate-100"
              disabled={page === 1 || loading}
              onClick={() => setPage((p) => p - 1)}
            >
              Sebelumnya
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="h-9 px-4 rounded-xl font-bold border-slate-200 hover:bg-slate-100"
              disabled={page >= pagination.totalPages || loading}
              onClick={() => setPage((p) => p + 1)}
            >
              Berikutnya
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}