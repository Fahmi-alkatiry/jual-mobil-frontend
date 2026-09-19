"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  CATEGORY_OPTIONS,
  CATEGORY_LABEL,
  type PurchasedCar,
} from "@/types/purchasedCar";

export default function PurchasedCarForm({
  initial,
}: {
  initial?: PurchasedCar;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    brand: initial?.brand ?? "",
    model: initial?.model ?? "",
    yearMin: initial?.yearMin ?? 2000,
    yearMax: initial?.yearMax ?? 2030,
    imageUrl: initial?.imageUrl ?? "",
    priceMin: initial?.priceMin ?? 10,
    priceMax: initial?.priceMax ?? 999,
    category: initial?.category ?? ("MPV" as any),
    isPublished: initial?.isPublished ?? true,
  });

  const currentYear = new Date().getFullYear();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.yearMax < form.yearMin) {
      toast.error("Tahun max harus >= tahun min");
      return;
    }
    if (form.priceMax < form.priceMin) {
      toast.error("priceMax harus >= priceMin");
      return;
    }
    setLoading(true);
    try {
      if (initial) await api.patch(`/purchased-cars/${initial.id}`, form);
      else await api.post("/purchased-cars", form);
      toast.success(initial ? "Data diperbarui" : "Data ditambahkan");
      router.push("/admin/purchased-cars");
    } catch (err: any) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.message ||
        "Gagal menyimpan";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={submit}
      className="space-y-5 bg-white p-6 rounded-2xl border"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Merek</Label>
          <Input
            value={form.brand}
            onChange={(e) => setForm({ ...form, brand: e.target.value })}
            placeholder="Toyota"
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Model / Tipe</Label>
          <Input
            value={form.model}
            onChange={(e) => setForm({ ...form, model: e.target.value })}
            placeholder="Avanza Veloz"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label>Tahun Min</Label>
          <Input
            type="number"
            min={2000}
            max={currentYear}
            value={form.yearMin as any ?? ""}
            onChange={(e) => {
              const val = e.target.value;
              setForm({ ...form, yearMin: (val === "" ? "" : Number(val)) as any });
            }}
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Tahun Max</Label>
          <Input
            type="number"
            min={2000}
            max={currentYear}
            value={form.yearMax as any}
            onChange={(e) => {
              const val = e.target.value;
              setForm({ ...form, yearMax: (val === "" ? "" : Number(val)) as any });
            }}
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Kategori</Label>
          <Select
            value={form.category}
            onValueChange={(v) => setForm({ ...form, category: v })}
          >
            <SelectTrigger className="h-10 rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CATEGORY_OPTIONS.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Status</Label>
          <Select
            value={form.isPublished ? "true" : "false"}
            onValueChange={(v) =>
              setForm({ ...form, isPublished: v === "true" })
            }
          >
            <SelectTrigger className="h-10 rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">Published</SelectItem>
              <SelectItem value="false">Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>URL Gambar</Label>
        <Input
          value={form.imageUrl}
          onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
          placeholder="https://..."
          required
        />
        {form.imageUrl && (
          <img
            src={form.imageUrl}
            alt="preview"
            className="h-40 w-full object-cover rounded-xl border mt-2"
          />
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Harga Min (Rp)</Label>
          <Input
            type="text"
            value={form.priceMin as any}
            onChange={(e) => {
              const val = e.target.value;
              setForm({ ...form, priceMin: (val === "" ? "" : Number(val)) as any });
            }}
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Harga Max (Rp)</Label>
          <Input
            type="text"
            value={form.priceMax as any}
            onChange={(e) => {
              const val = e.target.value;
              setForm({ ...form, priceMax: (val === "" ? "" : Number(val)) as any });
            }}
            required
          />
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          className="rounded-xl"
          onClick={() => router.back()}
        >
          Batal
        </Button>
        <Button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-blue-600 hover:bg-blue-700"
        >
          {loading
            ? "Menyimpan..."
            : initial
              ? "Simpan Perubahan"
              : "Tambah Mobil"}
        </Button>
      </div>
    </form>
  );
}
