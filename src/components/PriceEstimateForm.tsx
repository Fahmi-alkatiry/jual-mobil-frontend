"use client";

import { useState } from "react";
import { Check, ChevronsUpDown, AlertCircle, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { carBrands, carModelsByBrand } from "@/lib/car-options";
import { buildWaLink } from "@/lib/whatsapp";

const currentYear = new Date().getFullYear();

type Errors = Partial<
  Record<"brand" | "model" | "year" | "whatsapp", string>
>;

const PriceEstimateForm = () => {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  const [brandOpen, setBrandOpen] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);
  const [isCustomModel, setIsCustomModel] = useState(false);

  const modelOptions = brand ? (carModelsByBrand[brand] ?? []) : [];
  const useCustomModel = brand === "Merek Lain" || isCustomModel;

  const validate = (): Errors => {
    const next: Errors = {};

    if (!brand) next.brand = "Merek wajib dipilih";
    if (!model) next.model = "Model wajib diisi";

    const yearNum = Number(year);
    if (!year) next.year = "Tahun wajib diisi";
    else if (!Number.isInteger(yearNum)) next.year = "Tahun tidak valid";
    else if (yearNum < 2000) next.year = "Tahun minimal 2000";
    else if (yearNum > currentYear)
      next.year = `Tahun maksimal ${currentYear}`;

    const waDigits = whatsapp.replace(/\D/g, "");
    if (!waDigits) next.whatsapp = "Nomor WA wajib diisi";
    else if (waDigits.length < 9) next.whatsapp = "Nomor WA tidak valid";

    return next;
  };

  const buildWaUrl = () => {
    const waNumber = whatsapp.replace(/\D/g, "");
    const message = [
      "Halo Putra Aditya Motor, saya ingin menjual mobil dengan rincian berikut:",
      `No. WhatsApp: ${waNumber}`,
      `Merek Mobil: ${brand}`,
      `Model / Tipe: ${model}`,
      `Tahun Pembuatan: ${year}`,
      "Mohon info estimasi penawaran harga dan jadwal inspeksi gratis di rumah. Terima kasih",
    ].join("\n");

    return buildWaLink(message);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    window.open(buildWaUrl(), "_blank", "noopener,noreferrer");
  };

  const clearError = (field: keyof Errors) => {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const FieldError = ({ field }: { field: keyof Errors }) => {
    if (!errors[field]) return null;
    return (
      <p
        className="mt-1 flex items-center text-[0.8rem] font-medium text-destructive"
        role="alert"
        aria-live="polite"
      >
        <AlertCircle className="mr-1 h-3 w-3 shrink-0" />
        <span>{errors[field]}</span>
      </p>
    );
  };

  return (
    <section className="py-4" aria-label="Cek perkiraan harga mobil">
      <div className="mx-auto max-w-3xl px-4">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-xl sm:p-8">
          <div className="mb-6 text-center">
            <h2 className="text-xl font-black sm:text-2xl">
              Cek Perkiraan Harga Mobil Instan
            </h2>
            <p className="mt-2 flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
              <Zap className="h-4 w-4 shrink-0 text-primary" />
              <span>
                Hasil langsung terhubung ke WhatsApp (+62 896-6812-5652)
              </span>
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Merek Mobil */}
              <div className="space-y-2">
                <Label htmlFor="pe-brand">Merek Mobil</Label>
                <Popover open={brandOpen} onOpenChange={setBrandOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      id="pe-brand"
                      type="button"
                      variant="outline"
                      role="combobox"
                      aria-expanded={brandOpen}
                      className={cn(
                        "h-12 w-full justify-between rounded-xl font-normal",
                        !brand && "text-muted-foreground",
                        errors.brand && "border-destructive",
                      )}
                    >
                      {brand || "Pilih merek"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-[--radix-popover-trigger-width] p-0"
                    align="start"
                  >
                    <Command>
                      <CommandInput placeholder="Cari merek..." />
                      <CommandList>
                        <CommandEmpty>Merek tidak ditemukan.</CommandEmpty>
                        <CommandGroup>
                          {carBrands.map((b) => (
                            <CommandItem
                              key={b}
                              value={b}
                              onSelect={() => {
                                if (b !== brand) {
                                  setModel("");
                                  setIsCustomModel(false);
                                }
                                setBrand(b);
                                clearError("brand");
                                clearError("model");
                                setBrandOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  brand === b ? "opacity-100" : "opacity-0",
                                )}
                              />
                              {b}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FieldError field="brand" />
              </div>

              {/* Model / Tipe */}
              <div className="space-y-2">
                <Label htmlFor="pe-model">Model / Tipe</Label>
                {useCustomModel ? (
                  <>
                    <Input
                      id="pe-model"
                      placeholder="cth: Pajero Sport"
                      value={model}
                      onChange={(e) => {
                        setModel(e.target.value);
                        clearError("model");
                      }}
                      className={cn(
                        "h-12 rounded-xl",
                        errors.model && "border-destructive",
                      )}
                    />
                    {isCustomModel && (
                      <button
                        type="button"
                        onClick={() => {
                          setIsCustomModel(false);
                          setModel("");
                          clearError("model");
                        }}
                        className="text-xs font-bold text-primary hover:underline"
                      >
                        ← Kembali ke daftar model
                      </button>
                    )}
                    <FieldError field="model" />
                  </>
                ) : (
                  <>
                    <Popover open={modelOpen} onOpenChange={setModelOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          id="pe-model"
                          type="button"
                          variant="outline"
                          role="combobox"
                          aria-expanded={modelOpen}
                          disabled={!brand}
                          className={cn(
                            "h-12 w-full justify-between rounded-xl font-normal",
                            !model && "text-muted-foreground",
                            errors.model && "border-destructive",
                            !brand && "cursor-not-allowed opacity-50",
                          )}
                        >
                          {model || (brand ? "Pilih model" : "Pilih merek dulu")}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-[--radix-popover-trigger-width] p-0"
                        align="start"
                      >
                        <Command>
                          <CommandInput placeholder="Cari model..." />
                          <CommandList>
                            <CommandEmpty>
                              Model tidak ditemukan.
                            </CommandEmpty>
                            <CommandGroup>
                              {modelOptions.map((m) => (
                                <CommandItem
                                  key={m}
                                  value={m}
                                  onSelect={() => {
                                    if (m === "Model Lain") {
                                      setIsCustomModel(true);
                                      setModel("");
                                      setModelOpen(false);
                                      return;
                                    }
                                    setModel(m);
                                    clearError("model");
                                    setModelOpen(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      model === m
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                  {m}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FieldError field="model" />
                  </>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Tahun */}
              <div className="space-y-2">
                <Label htmlFor="pe-year">Tahun Pembuatan</Label>
                <Input
                  id="pe-year"
                  type="number"
                  inputMode="numeric"
                  min={2000}
                  max={currentYear}
                  placeholder="2020"
                  value={year}
                  onChange={(e) => {
                    setYear(e.target.value);
                    clearError("year");
                  }}
                  className={cn(
                    "h-12 rounded-xl",
                    errors.year && "border-destructive",
                  )}
                />
                <FieldError field="year" />
              </div>

              {/* Nomor WhatsApp */}
              <div className="space-y-2">
                <Label htmlFor="pe-whatsapp">Nomor WhatsApp</Label>
                <Input
                  id="pe-whatsapp"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  placeholder="Contoh: 08123456789"
                  value={whatsapp}
                  onChange={(e) => {
                    setWhatsapp(e.target.value.replace(/\D/g, ""));
                    clearError("whatsapp");
                  }}
                  className={cn(
                    "h-12 rounded-xl",
                    errors.whatsapp && "border-destructive",
                  )}
                />
                <FieldError field="whatsapp" />
              </div>
            </div>

            <Button
              type="submit"
              className="h-13 w-full rounded-xl bg-[#25D366] text-base font-bold text-white hover:bg-[#25D366]/90"
            >
              Cek Harga di WA
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default PriceEstimateForm;
