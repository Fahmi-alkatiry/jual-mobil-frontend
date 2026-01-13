// frontend-v2/src/components/TrustSignals.tsx
import { Clock, Banknote, ShieldCheck } from "lucide-react";

const signals = [
  {
    icon: Clock,
    title: "Proses 1 Jam",
    description: "Inspeksi cepat & estimasi harga langsung di tempat",
  },
  {
    icon: Banknote,
    title: "Pembayaran Langsung Lunas",
    description: "Transfer instan setelah deal, tidak perlu menunggu",
  },
  {
    icon: ShieldCheck,
    title: "Dokumen Kami Urus",
    description: "Balik nama, pajak, semua urusan administrasi selesai",
  },
];

const TrustSignals = () => {
  return (
    <section className="py-16 sm:py-20 bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">
          Kenapa Pilih <span className="text-primary">JualMobilku</span>?
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
          Kami hadir untuk membuat pengalaman jual mobil Anda semudah dan
          secepat mungkin
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {signals.map((signal, index) => (
            <div
              key={index}
              className="flex flex-col justify-center items-center text-center h-full min-h-[220px]
                         p-6 sm:p-7 rounded-2xl bg-background border border-border
                         hover:border-primary/30 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center mb-4
                              group-hover:bg-primary/10 transition-colors">
                <signal.icon className="w-7 h-7 text-primary" />
              </div>

              <h3 className="text-base font-semibold mb-2">
                {signal.title}
              </h3>

              <p className="text-muted-foreground text-sm leading-snug max-w-[240px]">
                {signal.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSignals;
