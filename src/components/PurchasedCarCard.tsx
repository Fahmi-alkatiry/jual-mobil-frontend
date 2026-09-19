import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CATEGORY_LABEL, formatPriceRange, formatYearRange, type PurchasedCar } from "@/types/purchasedCar";

const WA_NUMBER = "6289668125652";

function buildWaHref(car: PurchasedCar) {
  const text = [
    "Halo Aditya Motor, saya ingin menjual mobil dengan rincian berikut:",
    `👤 Nama Pemilik: Pemilik`,
    `📱 No. WhatsApp: -`,
    `🚗 Merek Mobil: ${car.brand}`,
    `📋 Model / Tipe: ${car.model}`,
    `📅 Tahun Pembuatan: ${formatYearRange(car.yearMin, car.yearMax)}`,
    `⚙️ Transmisi: Manual & Matic`,
    `📍 Lokasi Inspeksi: Jabodetabek`,
    "Mohon info estimasi penawaran harga dan jadwal inspeksi gratis di rumah. Terima kasih!",
  ].join("\n");
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}

export default function PurchasedCarCard({ car }: { car: PurchasedCar }) {
  return (
    <div className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 flex flex-col">
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={car.imageUrl}
          alt={`${car.brand} ${car.model}`}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <Badge className="absolute left-3 top-3 rounded-full bg-white/90 text-slate-800 backdrop-blur font-bold text-[10px] border-slate-200">
          {CATEGORY_LABEL[car.category] ?? car.category}
        </Badge>
        {!car.isPublished && (
          <Badge variant="destructive" className="absolute right-3 top-3 rounded-full text-[10px] font-bold">Draft</Badge>
        )}
      </div>
      <div className="p-4 space-y-2 flex-1 flex flex-col">
        <h3 className="font-black text-slate-900 leading-tight line-clamp-1">{car.brand} {car.model}</h3>
        <p className="text-xs font-bold text-slate-500">{formatYearRange(car.yearMin, car.yearMax)} • {CATEGORY_LABEL[car.category] ?? car.category}</p>
        <p className="text-[11px] font-medium text-slate-400">Estimasi harga</p>
        <p className="text-sm font-black text-blue-600">Rp {formatPriceRange(car.priceMin, car.priceMax)}</p>
        <a href={buildWaHref(car)} target="_blank" rel="noopener noreferrer" className="mt-3 block">
          <Button size="sm" className="w-full rounded-xl bg-[#25D366] hover:bg-[#1ebe5d] text-white font-black text-xs h-9">
            Jual Tipe Ini via WhatsApp
          </Button>
        </a>
      </div>
    </div>
  );
}
