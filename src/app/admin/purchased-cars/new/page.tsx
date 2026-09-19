import PurchasedCarForm from "@/components/admin/PurchasedCarForm";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NewPurchasedCarPage() {
  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/purchased-cars"><Button variant="outline" className="rounded-xl">← Kembali</Button></Link>
        <h1 className="text-xl font-black tracking-tight text-slate-900">Tambah Mobil</h1>
      </div>
      <PurchasedCarForm />
    </div>
  );
}
