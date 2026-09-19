// frontend-v2/src/components/CarEstimationForm.tsx
// Component untuk Form Estimasi Mobil
"use client";

import { useState } from "react";
import { z } from "zod";
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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  CalendarIcon,
  ChevronRight,
  ChevronLeft,
  Check,
  Loader2,
  AlertCircle,
  ChevronsUpDown,
} from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

// --- 1. Schema Validasi (Sama persis dengan Backend) ---
const currentYear = new Date().getFullYear();

const carFormSchema = z.object({
  brand: z.string().min(1, "Merek wajib dipilih"),
  model: z.string().min(1, "Model wajib diisi"),
  year: z.coerce
    .number({ invalid_type_error: "Harus berupa angka" })
    .int()
    .min(2000, "Tahun minimal 2000")
    .max(currentYear, `Tahun maksimal ${currentYear}`),
  transmission: z.string().min(1, "Transmisi wajib dipilih"),
  color: z.string().min(1, "Warna wajib diisi"),

  mileage: z.coerce.number().min(0, "KM tidak valid"),
  taxExpiry: z.date({
    required_error: "Tanggal pajak wajib diisi",
    invalid_type_error: "Tanggal wajib diisi",
  }),
  stnkOwnership: z.string().min(1, "Kepemilikan wajib dipilih"),
  generalCondition: z.string().min(1, "Kondisi umum wajib dipilih"),

  fullName: z.string().min(3, "Nama terlalu pendek"),
  whatsapp: z.string().min(9, "Nomor WA tidak valid"),
  email: z.union([z.literal(""), z.string().email("Format email salah")]),
  inspectionLocation: z.string().min(1, "Lokasi wajib dipilih"),
});

// Tipe data inferred dari Zod
type CarFormValues = z.infer<typeof carFormSchema>;

const carBrands = [
  "Toyota",
  "Honda",
  "Mitsubishi",
  "Daihatsu",
  "Suzuki",
  "Hyundai",
  "Wuling",
  "Nissan",
  "Mazda",
  "BMW",
  "Mercedes-Benz",
  "Chery",
  "BYD",
  "Kia",
  "Merek Lain",
];

const carModelsByBrand: Record<string, string[]> = {
  Toyota: [
    "Avanza",
    "Veloz",
    "Innova",
    "Innova Reborn",
    "Fortuner",
    "Rush",
    "Agya",
    "Calya",
    "Yaris",
    "Yaris Cross", // Tambahan
    "Vios",
    "Camry",
    "Corolla Altis",
    "Corolla Cross",
    "Raize",
    "Hilux",
    "Hilux Rangga", // Tambahan (Populer)
    "Alphard",
    "Voxy",
    "Model Lain",
  ],
  Honda: [
    "Brio",
    "Brio Satya",
    "Jazz",
    "Mobilio",
    "BR-V",
    "HR-V",
    "CR-V",
    "Civic",
    "City",
    "Accord",
    "Odyssey",
    "WR-V",
    "City Hatchback",
    "Freed",
    "CR-Z",
    "Model Lain",
  ],
  Suzuki: [
    "Ignis",
    "Baleno",
    "Ertiga",
    "XL7",
    "Carry",
    "APV",
    "Swift",
    "Jimny",
    "S-Cross",
    "Grand Vitara",
    "Fronx",
    "Karimun Wagon R",
    "Model Lain",
  ],
  Mitsubishi: [
    "Xpander",
    "Xpander Cross",
    "Pajero Sport",
    "Triton",
    "L300",
    "Mirage",
    "Outlander",
    "Eclipse Cross",
    "Xforce",
    "Colt L300",
    "Colt Diesel",
    "Model Lain",
  ],
  Daihatsu: [
    "Ayla",
    "Sigra",
    "Xenia",
    "Terios",
    "Sirion",
    "Rocky",
    "Luxio",
    "Gran Max",
    "Taft",
    "Model Lain",
  ],
  Nissan: [
    "Livina",
    "Serena",
    "X-Trail",
    "Terra",
    "Navara",
    "March",
    "Magnite",
    "Kicks",
    "Juke",
    "Model Lain",
  ],
  Mazda: [
    "Mazda2",
    "Mazda3",
    "CX-3",
    "CX-5",
    "CX-30",
    "CX-8",
    "Mazda6",
    "BT-50",
    "MX-5",
    "Model Lain",
  ],
  Hyundai: [
    "Creta",
    "Stargazer",
    "Stargazer X", // Tambahan
    "Ioniq 5",
    "Ioniq 6",
    "Palisade",
    "Santa Fe",
    "Tucson",
    "H-1",
    "Kona",
    "Staria",
    "Model Lain",
  ],
  Kia: [
    "Seltos",
    "Sonet",
    "Carens",
    "Carnival",
    "Picanto",
    "Rio",
    "Sportage",
    "Sorento",
    "EV6",
    "Model Lain",
  ],
  Wuling: [
    "Almaz",
    "Almaz RS",
    "Confero",
    "Cortez",
    "Formo",
    "Alvez",
    "Air EV",
    "Binguo EV",
    "Cloud EV",
    "Model Lain",
  ],
  BMW: [
    "320i",
    "330i",
    "520i",
    "530i",
    "X1",
    "X3",
    "X5",
    "X7",
    "Z4",
    "740Li",
    "Model Lain",
  ],
  "Mercedes-Benz": [
    "A-Class",
    "C-Class",
    "E-Class",
    "S-Class",
    "GLA",
    "GLC",
    "GLE",
    "GLS",
    "CLA",
    "Vito",
    "Model Lain",
  ],
  BYD: [
    "Atto 3",
    "Dolphin",
    "Seal",
    "M6",
    "Sealion 7",
    "Denza D9",
    "Han",
    "E6",
    "Model Lain",
  ],
  Chery: [
    "Omoda 5 / Omoda E5",
    "Tiggo 7 Pro",
    "Tiggo 8 Pro",
    "Tiggo 5X",
    "Model Lain",
  ],
};
const transmissions = [
  { value: "Automatic", label: "Otomatis (AT)" },
  { value: "Manual", label: "Manual (MT)" },
];
const stnkOwnership = [
  { value: "Pribadi", label: "Perorangan/Pribadi" },
  { value: "PT", label: "Perusahaan/PT" },
];
const inspectionLocations = [
  { value: "Kantor Kami", label: "Kunjungi Kantor Kami" },
  { value: "Home Service", label: "Home Service (Kami ke Rumah Anda)" },
];
const generalConditions = [
  {
    value: "Sangat Mulus & Rutin Servis",
    label: "Sangat Mulus & Rutin Servis",
  },
  { value: "Bagus / Pemakaian Wajar", label: "Bagus / Pemakaian Wajar" },
  { value: "Ada Lecet Ringan", label: "Ada Lecet Ringan" },
  { value: "Perlu Servis / Pajak Mati", label: "Perlu Servis / Pajak Mati" },
];

const CarEstimationForm = () => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [brandOpen, setBrandOpen] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);
  const [isCustomModel, setIsCustomModel] = useState(false);
  const router = useRouter();

  // State Form Manual
  const [formData, setFormData] = useState<Partial<CarFormValues>>({
    brand: "",
    model: "",
    year: undefined,
    transmission: "",
    color: "",
    mileage: undefined,
    taxExpiry: undefined,
    stnkOwnership: "",
    generalCondition: "",
    fullName: "",
    whatsapp: "",
    email: "",
    inspectionLocation: "",
  });

  const modelOptions = formData.brand
    ? (carModelsByBrand[formData.brand] ?? [])
    : [];

  // State Error Manual
  const [errors, setErrors] = useState<
    Partial<Record<keyof CarFormValues, string>>
  >({});
  const [touched, setTouched] = useState<
    Partial<Record<keyof CarFormValues, boolean>>
  >({});

  // Helper: Validasi Field Tunggal
  const validateField = (field: keyof CarFormValues, value: any) => {
    try {
      // Ambil schema spesifik untuk field tersebut
      const fieldSchema = carFormSchema.shape[field];
      fieldSchema.parse(value);

      // Jika sukses, hapus error lama
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors((prev) => ({ ...prev, [field]: error.errors[0].message }));
      }
      return false;
    }
  };

  // Handler Perubahan Input
  const handleChange = (field: keyof CarFormValues, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Validasi real-time jika user sudah menyentuh field atau ada error sebelumnya
    if (touched[field] || errors[field]) {
      validateField(field, value);
    }
  };

  // Handler Blur (Saat user keluar dari input)
  const handleBlur = (field: keyof CarFormValues) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field, formData[field]);
  };

  // --- Logika Validasi Per Step ---
  const handleNextStep = async () => {
    let fieldsToValidate: (keyof CarFormValues)[] = [];

    if (step === 1)
      fieldsToValidate = ["brand", "model", "year", "transmission", "color"];
    if (step === 2)
      fieldsToValidate = [
        "mileage",
        "taxExpiry",
        "stnkOwnership",
        "generalCondition",
      ];

    let isStepValid = true;

    // Validasi semua field di step ini
    fieldsToValidate.forEach((field) => {
      const isValid = validateField(field, formData[field]);
      if (!isValid) isStepValid = false;
      // Tandai sebagai touched agar error muncul
      setTouched((prev) => ({ ...prev, [field]: true }));
    });

    if (isStepValid) {
      setStep((prev) => prev + 1);
    } else {
      toast.error("Mohon lengkapi data dengan benar.");
    }
  };

  // --- Submit Final ---
  const handleSubmit = async () => {
    setIsLoading(true);

    // 1. Validasi Field Kontak (Step 3)
    const finalFields: (keyof CarFormValues)[] = [
      "fullName",
      "whatsapp",
      "email",
      "inspectionLocation",
    ];
    let isFinalValid = true;

    finalFields.forEach((field) => {
      const isValid = validateField(field, formData[field]);
      if (!isValid) isFinalValid = false;
      setTouched((prev) => ({ ...prev, [field]: true }));
    });

    if (!isFinalValid) {
      toast.error("Mohon lengkapi data kontak.");
      setIsLoading(false);
      return;
    }

    // 2. Persiapan Payload
    // Membersihkan angka 0 di depan nomor WA (0812 -> 812)
    const cleanWhatsapp = formData.whatsapp?.startsWith("0")
      ? formData.whatsapp.slice(1)
      : formData.whatsapp;

    const payload = {
      ...formData,
      taxDate: formData.taxExpiry, // Pemetaan field untuk backend
      location: formData.inspectionLocation, // Pemetaan field untuk backend
      whatsapp: `+62${cleanWhatsapp}`, // Format standar internasional
    };

    try {
      // 3. Eksekusi Request menggunakan Axios instance
      const res = await api.post("/sell-car", payload);

      if (res.data.success) {
        toast.success("Permintaan Terkirim!", {
          description: "Tim kami akan segera menghubungi WhatsApp Anda.",
        });

        const safeName = encodeURIComponent(formData.fullName || "Pelanggan");
        router.push(`/success?name=${safeName}`);
      }
    } catch (error: any) {
      // 4. Penanganan Error terpusat dari Axios
      const result = error.response?.data;
      let errorMessage = result?.message || "Terjadi kesalahan koneksi.";

      // Menampilkan detail error validasi (misal dari Zod di backend)
      if (result?.errors && Array.isArray(result.errors)) {
        errorMessage = result.errors
          .map((e: any) => `${e.field || e.path}: ${e.message}`)
          .join(", ");
      }

      toast.error("Gagal", { description: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  // Helper Component untuk Menampilkan Error
  const FieldInfo = ({ fieldName }: { fieldName: keyof CarFormValues }) => {
    const error = errors[fieldName];

    if (!error) return null;

    return (
      <p
        id={`${fieldName}-error`}
        className="mt-1 flex items-center text-[0.8rem] font-medium text-destructive animate-in slide-in-from-top-1"
        role="alert"
        aria-live="polite"
      >
        <AlertCircle className="mr-1 h-3 shrink-0" />
        <span>{error}</span>
      </p>
    );
  };

  const renderProgressBar = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center">
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300",
                step >= s
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground",
              )}
            >
              {step > s ? <Check className="w-5 h-5" /> : s}
            </div>
            {s < 3 && (
              <div
                className={cn(
                  "flex-1 h-1 mx-1.5 rounded-full transition-all duration-300 min-w-20 md: min-w-45",
                  step > s ? "bg-primary" : "bg-muted",
                )}
              />
            )}
          </div>
        ))}
      </div>
      <p className="text-center text-sm text-muted-foreground">
        Langkah {step} dari 3:{" "}
        {step === 1
          ? "Detail Mobil"
          : step === 2
            ? "Kondisi & Legalitas"
            : "Jadwal Inspeksi"}
      </p>
    </div>
  );

  return (
    <div className="w-full max-w-xl mx-auto bg-card rounded-2xl shadow-xl p-6 sm:p-8 border border-border">
      {renderProgressBar()}

      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        {/* STEP 1 */}
        {step === 1 && (
          <div className="space-y-5 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="brand">Merek Mobil</Label>
                <Popover open={brandOpen} onOpenChange={setBrandOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={brandOpen}
                      className={cn(
                        "w-full h-12 rounded-xl justify-between font-normal",
                        !formData.brand && "text-muted-foreground",
                        errors.brand && "border-destructive",
                      )}
                    >
                      {formData.brand || "Pilih merek"}
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
                                const prevBrand = formData.brand;
                                handleChange("brand", b);
                                if (prevBrand !== b) {
                                  handleChange("model", "");
                                  setIsCustomModel(false);
                                  setErrors((prev) => {
                                    const ne = { ...prev };
                                    delete ne.model;
                                    return ne;
                                  });
                                }
                                setBrandOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  formData.brand === b
                                    ? "opacity-100"
                                    : "opacity-0",
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
                <FieldInfo fieldName="brand" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="model">Model</Label>
                {formData.brand === "Lainnya" || isCustomModel ? (
                  <>
                    <Input
                      placeholder="cth: Avanza, Brio"
                      value={formData.model}
                      onBlur={() => handleBlur("model")}
                      onChange={(e) => handleChange("model", e.target.value)}
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
                          handleChange("model", "");
                          setErrors((prev) => {
                            const ne = { ...prev };
                            delete ne.model;
                            return ne;
                          });
                        }}
                        className="text-xs font-bold text-primary hover:underline"
                      >
                        ← Kembali ke daftar model
                      </button>
                    )}
                    <FieldInfo fieldName="model" />
                  </>
                ) : (
                  <>
                    <Popover open={modelOpen} onOpenChange={setModelOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={modelOpen}
                          disabled={!formData.brand}
                          className={cn(
                            "w-full h-12 rounded-xl justify-between font-normal",
                            !formData.model && "text-muted-foreground",
                            errors.model && "border-destructive",
                            !formData.brand && "opacity-50 cursor-not-allowed",
                          )}
                        >
                          {formData.model ||
                            (formData.brand
                              ? "Pilih model"
                              : "Pilih merek dulu")}
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
                            <CommandEmpty>Model tidak ditemukan.</CommandEmpty>
                            <CommandGroup>
                              {modelOptions.map((m) => (
                                <CommandItem
                                  key={m}
                                  value={m}
                                  onSelect={() => {
                                    if (m === "Model Lain") {
                                      setIsCustomModel(true);
                                      handleChange("model", "");
                                      setModelOpen(false);
                                      return;
                                    }
                                    handleChange("model", m);
                                    setModelOpen(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      formData.model === m
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
                    <FieldInfo fieldName="model" />
                  </>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="year">Tahun</Label>
                <Input
                  type="number"
                  min={2000}
                  max={currentYear}
                  placeholder="2020"
                  value={formData.year ?? ""}
                  onBlur={() => handleBlur("year")}
                  onChange={(e) => {
                    const val = e.target.value;
                    handleChange("year", val === "" ? "" : Number(val));
                  }} // Auto convert ke number
                  className={cn(
                    "h-12 rounded-xl",
                    errors.year && "border-destructive",
                  )}
                />
                <FieldInfo fieldName="year" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="transmission">Transmisi</Label>
                <Select
                  value={formData.transmission}
                  onValueChange={(val) => handleChange("transmission", val)}
                >
                  <SelectTrigger
                    className={cn(
                      "h-12 rounded-xl",
                      errors.transmission && "border-destructive",
                    )}
                  >
                    <SelectValue placeholder="Pilih" />
                  </SelectTrigger>
                  <SelectContent>
                    {transmissions.map((t) => (
                      <SelectItem key={t.value} value={t.value}>
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldInfo fieldName="transmission" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="color">Warna</Label>
                <Input
                  placeholder="cth: Putih"
                  value={formData.color}
                  onBlur={() => handleBlur("color")}
                  onChange={(e) => handleChange("color", e.target.value)}
                  className={cn(
                    "h-12 rounded-xl",
                    errors.color && "border-destructive",
                  )}
                />
                <FieldInfo fieldName="color" />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="space-y-5 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="mileage">Kilometer (KM)</Label>
                <Input
                  type="text" // Diubah ke text agar mendukung format titik ribuan
                  placeholder="50.000"
                  value={
                    formData.mileage
                      ? Number(formData.mileage).toLocaleString("id-ID") // Format angka murni ke string ber-titik
                      : ""
                  }
                  onBlur={() => handleBlur("mileage")}
                  onChange={(e) => {
                    // 1. Hapus semua karakter selain angka (menghilangkan titik saat user mengetik)
                    const rawValue = e.target.value.replace(/\D/g, "");

                    // 2. Simpan ke state tetap sebagai Number agar validasi tidak rusak
                    handleChange(
                      "mileage",
                      rawValue === "" ? "" : Number(rawValue),
                    );
                  }}
                  className={cn(
                    "h-12 rounded-xl",
                    errors.mileage && "border-destructive",
                  )}
                />
                <FieldInfo fieldName="mileage" />
              </div>

              <div className="space-y-2">
                <Label>Masa Berlaku Pajak</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full h-12 rounded-xl justify-start text-left font-normal",
                        !formData.taxExpiry && "text-muted-foreground",
                        errors.taxExpiry && "border-destructive",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.taxExpiry
                        ? format(formData.taxExpiry, "PPP", { locale: id })
                        : "Pilih tanggal"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.taxExpiry}
                      onSelect={(val) => handleChange("taxExpiry", val)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FieldInfo fieldName="taxExpiry" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Kepemilikan STNK</Label>
              <Select
                value={formData.stnkOwnership}
                onValueChange={(val) => handleChange("stnkOwnership", val)}
              >
                <SelectTrigger
                  className={cn(
                    "h-12 rounded-xl",
                    errors.stnkOwnership && "border-destructive",
                  )}
                >
                  <SelectValue placeholder="Pilih kepemilikan" />
                </SelectTrigger>
                <SelectContent>
                  {stnkOwnership.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldInfo fieldName="stnkOwnership" />
            </div>

            <div className="space-y-2">
              <Label>Kondisi Umum Mobil</Label>
              <Select
                value={formData.generalCondition}
                onValueChange={(val) => handleChange("generalCondition", val)}
              >
                <SelectTrigger
                  className={cn(
                    "h-12 rounded-xl",
                    errors.generalCondition && "border-destructive",
                  )}
                >
                  <SelectValue placeholder="Pilih kondisi mobil" />
                </SelectTrigger>
                <SelectContent>
                  {generalConditions.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldInfo fieldName="generalCondition" />
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="space-y-5 animate-fade-in">
            <div className="space-y-2">
              <Label htmlFor="fullname">Nama Pemilik / Penjual</Label>
              {/* Ditambahkan: name="name" dan autoComplete="name" */}
              <Input
                id="fullname"
                name="name"
                autoComplete="name"
                placeholder="Nama Lengkap"
                value={formData.fullName}
                onBlur={() => handleBlur("fullName")}
                onChange={(e) => handleChange("fullName", e.target.value)}
                className={cn(
                  "h-12 rounded-xl",
                  errors.fullName && "border-destructive",
                )}
              />
              <FieldInfo fieldName="fullName" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Nomor WhatsApp</Label>
              <div className="flex">
                {/* <div className="flex items-center justify-center px-4 h-12 bg-muted border border-r-0 rounded-l-xl text-sm font-medium">
                  +62
                </div> */}
                <Input
                  id="phone"
                  inputMode="numeric"
                  name="phone"
                  autoComplete="phone"
                  type="tel"
                  pattern="[0-9]*"
                  placeholder="Contoh: 08123456789"
                  value={formData.whatsapp}
                  onBlur={() => handleBlur("whatsapp")}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    handleChange("whatsapp", value);
                  }}
                  className={cn(
                    "h-12 rounded-xl",
                    errors.whatsapp && "border-destructive",
                  )}
                />
              </div>
              <FieldInfo fieldName="whatsapp" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email (Opsional)</Label>
              {/* Ditambahkan: id="email", name="email", dan autoComplete="email" */}
              <Input
                id="email"
                name="email"
                autoComplete="email"
                type="email"
                placeholder="email@contoh.com"
                value={formData.email}
                onBlur={() => handleBlur("email")}
                onChange={(e) => handleChange("email", e.target.value)}
                className="h-12 rounded-xl"
              />
              <FieldInfo fieldName="email" />
            </div>

            <div className="space-y-2">
              <Label>Lokasi Inspeksi</Label>
              <Select
                value={formData.inspectionLocation}
                onValueChange={(val) => handleChange("inspectionLocation", val)}
              >
                <SelectTrigger
                  className={cn(
                    "h-12 rounded-xl",
                    errors.inspectionLocation && "border-destructive",
                  )}
                >
                  <SelectValue placeholder="Pilih lokasi" />
                </SelectTrigger>
                <SelectContent>
                  {inspectionLocations.map((l) => (
                    <SelectItem key={l.value} value={l.value}>
                      {l.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldInfo fieldName="inspectionLocation" />
            </div>
          </div>
        )}

        {/* BUTTONS */}
        <div className="flex gap-3 mt-8">
          {step > 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep(step - 1)}
              disabled={isLoading}
              className="flex-1 h-12 rounded-xl font-semibold"
            >
              <ChevronLeft className="w-4 h-4 mr-1" /> Kembali
            </Button>
          )}

          {step < 3 ? (
            <Button
              type="button"
              onClick={handleNextStep}
              className="flex-1 h-12 rounded-xl font-semibold"
            >
              Lanjutkan <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="flex-1 h-12 rounded-xl font-bold text-base"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Mengirim...
                </>
              ) : (
                "Jadwalkan Sekarang!"
              )}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CarEstimationForm;
