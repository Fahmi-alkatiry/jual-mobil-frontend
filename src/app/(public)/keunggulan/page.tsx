"use client";

import React from "react";
import { 
  ShieldCheck, 
  Zap, 
  Gem, 
  Search, 
  Wallet, 
  HeartHandshake,
  ArrowUpRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const Keunggulan = () => {
  const keunggulanData = [
    {
      title: "Harga Terbaik",
      description: "Kami memberikan penawaran harga paling kompetitif di pasar berdasarkan data aktual dan kondisi unit.",
      icon: <Gem className="w-6 h-6" />,
    },
    {
      title: "Proses Kilat",
      description: "Hanya butuh waktu kurang dari 24 jam dari inspeksi hingga uang masuk ke rekening Anda.",
      icon: <Zap className="w-6 h-6" />,
    },
    {
      title: "Keamanan Terjamin",
      description: "Seluruh transaksi diawasi dan didokumentasikan secara legal untuk memberikan rasa aman penuh.",
      icon: <ShieldCheck className="w-6 h-6" />,
    },
    {
      title: "Inspeksi Gratis",
      description: "Layanan pengecekan fisik mobil oleh teknisi ahli kami berikan secara cuma-cuma tanpa komitmen.",
      icon: <Search className="w-6 h-6" />,
    },
    {
      title: "Pembayaran Instan",
      description: "Tidak ada penundaan. Begitu kesepakatan tercapai, dana langsung dikirim ke rekening Anda.",
      icon: <Wallet className="w-6 h-6" />,
    },
    {
      title: "Layanan Ramah",
      description: "Tim support kami siap membantu Anda di setiap langkah proses dengan profesionalisme tinggi.",
      icon: <HeartHandshake className="w-6 h-6" />,
    },
  ];

  return (
    <section id="mengapa-kami" className="py-4 mb-16 bg-slate-50">
      <div className="container mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-primary/10 text-primary mb-4">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-black uppercase tracking-widest">Keunggulan Utama</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900">
              Mengapa Jual Mobil di <span className="text-primary">JualMobilku?</span>
            </h2>
          </div>
          <p className="text-slate-500 font-medium max-w-sm">
            Kami menggabungkan teknologi dan transparansi untuk memberikan pengalaman jual mobil terbaik di Indonesia.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {keunggulanData.map((item, index) => (
            <div 
              key={index}
              className="group p-8 rounded-[2rem] bg-white border border-slate-100 hover:border-primary/30 transition-all duration-500 shadow-sm hover:shadow-xl hover:shadow-primary/5 flex flex-col h-full"
            >
              {/* Icon Container */}
              <div className="w-14 h-14 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500 mb-6 group-hover:rotate-6">
                {item.icon}
              </div>

              {/* Text Content */}
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              {/* Decorative Footer */}
              <div className="pt-4 border-t border-slate-50 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="text-[10px] font-black text-primary uppercase tracking-widest">Pelajari Selengkapnya</span>
                <ArrowUpRight className="w-4 h-4 text-primary" />
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section (Visual Reinforcement) */}
        <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Mobil Terjual", value: "10k+" },
            { label: "Partner Dealer", value: "500+" },
            { label: "Kepuasan Klien", value: "99%" },
            { label: "Kota Terjangkau", value: "25+" },
          ].map((stat, i) => (
            <div key={i} className="text-center p-6 bg-primary/5 rounded-2xl border border-primary/10">
              <div className="text-3xl font-black text-primary mb-1">{stat.value}</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Keunggulan;