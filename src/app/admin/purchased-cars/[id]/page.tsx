"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import PurchasedCarForm from "@/components/admin/PurchasedCarForm";
import { type PurchasedCar } from "@/types/purchasedCar";
import { Loader2 } from "lucide-react";

export default function EditPurchasedCarPage() {
  const { id } = useParams();
  const [car, setCar] = useState<PurchasedCar | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/purchased-cars/${id}`).then(res => setCar(res.data.data)).catch(() => {}).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="flex justify-center py-16"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>;
  if (!car) return <div className="py-16 text-center bg-white rounded-2xl border font-bold text-slate-400">Data tidak ditemukan</div>;

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/purchased-cars"><Button variant="outline" className="rounded-xl">← Kembali</Button></Link>
        <h1 className="text-xl font-black tracking-tight text-slate-900">Edit Mobil • {car.brand} {car.model}</h1>
      </div>
      <PurchasedCarForm initial={car} />
    </div>
  );
}
