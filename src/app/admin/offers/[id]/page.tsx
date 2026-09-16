"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function OfferDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [offer, setOffer] = useState<any>(null);

  useEffect(() => {
    api.get(`/offers/${id}`).then(res => {
      setOffer(res.data.data);
    });
    console.log(offer);
  }, [id]);

  if (!offer) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl space-y-6">
      <Button variant="outline" onClick={() => router.back()}>
        ← Kembali
      </Button>

      <div className="bg-white p-6 rounded-xl border space-y-4">
        <h1 className="text-2xl font-extrabold">
          <b>Nama : </b>{offer.fullName}
        </h1>
        <p className="">
          <b>Email:</b> : {offer.email}
        </p>
        <p><b>WhatsApp:</b> {offer.whatsapp}</p>

        <Badge>{offer.status}</Badge>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <p><b>Brand:</b> {offer.brand}</p>
          <p><b>Model:</b> {offer.model}</p>
          <p><b>Tahun:</b> {offer.year}</p>
          <p><b>Transmisi:</b> {offer.transmission}</p>
          <p><b>Warna:</b> {offer.color}</p>
          <p><b>Masa Berlaku:</b> {new Date(offer.taxDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          <p><b>Kepemilikan:</b> {offer.stnkOwnership}</p>
          <p><b>Kilometer:</b> {offer.mileage.toLocaleString()} KM</p>
          <p><b>Lokasi:</b> {offer.location}</p>
          
        </div>
      </div>
    </div>
  );
}
