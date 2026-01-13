"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  // Ambil nama dari URL, jika tidak ada pakai default "Pelanggan"
  const name = searchParams.get("name") || "Pelanggan";

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center animate-in fade-in zoom-in duration-500">
      <div className="bg-green-100 p-6 rounded-full mb-6">
        <CheckCircle2 className="w-16 h-16 text-green-600" />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Permintaan Diterima!</h1>
      <p className="text-lg text-gray-600 max-w-md mb-8">
        Terima kasih, <span className="font-bold text-gray-800">{name}</span>. 
        Tim kami akan segera menganalisa data mobil Anda dan menghubungi via WhatsApp dalam waktu 15-30 menit.
      </p>
      <Link href="/">
        <Button className="h-12 px-8 rounded-xl font-bold">
          Kembali ke Beranda
        </Button>
      </Link>
    </div>
  );
}

export default function SuccessPage() {
  // Wajib dibungkus Suspense agar tidak error saat build di Next.js App Router
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}