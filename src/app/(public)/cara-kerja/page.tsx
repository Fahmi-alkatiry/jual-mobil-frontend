import {
  ClipboardCheck,
  CalendarDays,
  Banknote,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import Link from "next/link";

const CaraKerja = () => {
  const STEPS = [
    {
      id: "01",
      title: "Isi Detail Mobil",
      description:
        "Lengkapi formulir online dengan informasi detail kendaraan Anda.",
      icon: ClipboardCheck,
    },
    {
      id: "02",
      title: "Jadwalkan Inspeksi",
      description: "Tim ahli kami akan datang ke lokasi Anda.",
      icon: CalendarDays,
    },
    {
      id: "03",
      title: "Terima Penawaran",
      description: "Dapatkan penawaran harga terbaik secara transparan.",
      icon: ShieldCheck,
    },
    {
      id: "04",
      title: "Pembayaran Instan",
      description: "Dana langsung ditransfer di hari yang sama.",
      icon: Banknote,
    },
  ] as const;

  return (
    <section id="cara-kerja" className="py-4 mb-16 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4 border border-primary/20">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">
              Proses Transparan
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6">
            Jual Mobil Hanya dalam{" "}
            <span className="text-primary">4 Langkah Mudah</span>
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed">
            Kami memangkas birokrasi yang rumit. Proses kami dirancang untuk
            menghemat waktu Anda dengan keamanan transaksi yang terjamin.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Garis Penghubung (Hanya muncul di Desktop) */}
          <div className="hidden lg:block absolute top-1/4 left-0 w-full h-0.5 bg-slate-100 -z-10" />

          {STEPS.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.id}
                className="group relative flex flex-col items-center text-center"
              >
                <div className="relative mb-8">
                  <div
                    className="w-20 h-20 rounded-3xl bg-white border-2 border-slate-100 flex items-center justify-center text-slate-400
          group-hover:border-primary group-hover:text-primary group-hover:bg-primary/5
          transition-colors transition-shadow duration-500
          shadow-xl shadow-slate-100 group-hover:shadow-primary/20"
                  >
                    <Icon className="w-8 h-8" />
                  </div>

                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-white text-xs font-black flex items-center justify-center border-4 border-white">
                    {step.id}
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {step.title}
                </h3>

                <p className="text-slate-500 text-sm leading-relaxed px-4">
                  {step.description}
                </p>

                {index < STEPS.length - 1 && (
                  <div className="lg:hidden my-6 text-slate-200">
                    <ArrowRight className="w-6 h-6 rotate-90" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Card */}
        <div className="mt-20 p-8 md:p-12 rounded-[2.5rem] bg-slate-900 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h4 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Siap untuk melepas mobil Anda?
              </h4>
              <p className="text-slate-400">
                Dapatkan estimasi harga sekarang tanpa biaya sepeserpun.
              </p>
            </div>
            <Link
              href="/"
              prefetch
              className="px-10 py-5 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black transition-colors transition-shadow shadow-xl shadow-primary/20 group"
            >
              Dapatkan Penawaran Sekarang{" "}
              <ArrowRight className="inline-block w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          {/* Decorative Background Element */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -left-20 -top-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        </div>
      </div>
    </section>
  );
};

export default CaraKerja;
