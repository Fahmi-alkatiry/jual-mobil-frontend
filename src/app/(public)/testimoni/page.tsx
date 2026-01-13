"use client";

import React from "react";
import { 
  Star, 
  Quote, 
  User, 
  CheckCircle2,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const Testimoni = () => {
  const testimonials = [
    {
      name: "Budi Santoso",
      role: "Pemilik Toyota Avanza",
      content: "Prosesnya luar biasa cepat. Dari inspeksi sampai uang masuk ke rekening cuma butuh waktu 3 jam. Harga yang ditawarkan juga sangat fair dibanding dealer lain.",
      rating: 5,
      image: null, // Bisa diisi URL foto jika ada
    },
    {
      name: "Siska Putri",
      role: "Pemilik Honda HR-V",
      content: "Awalnya ragu jual mobil online, tapi JualMobilku membuktikan kalau prosesnya transparan banget. Teknisi inspeksinya ramah dan menjelaskan kondisi mobil apa adanya.",
      rating: 5,
      image: null,
    },
    {
      name: "Andi Wijaya",
      role: "Pemilik Mitsubishi Pajero",
      content: "Sangat membantu buat yang sibuk. Timnya datang ke kantor untuk inspeksi, jadi saya nggak perlu keluar rumah. Pembayaran instan di hari yang sama!",
      rating: 4,
      image: null,
    },
  ];

  return (
    <section id="testimoni" className="py-4 mb-16 bg-white">
      <div className="container mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4 border border-primary/20">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-xs font-black uppercase tracking-widest">Kepuasan Pelanggan</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 mb-6">
            Apa Kata Mereka Tentang <span className="text-primary">Kami?</span>
          </h2>
          <p className="text-slate-500 text-lg">
            Lebih dari 10.000+ pemilik mobil telah mempercayakan penjualan kendaraan mereka kepada JualMobilku.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <div 
              key={index}
              className="group p-8 rounded-[2.5rem] bg-slate-50 border border-transparent hover:border-primary/20 hover:bg-white transition-all duration-500 flex flex-col h-full shadow-sm hover:shadow-2xl hover:shadow-primary/5"
            >
              {/* Rating Stars */}
              <div className="flex gap-1 mb-6 text-primary">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={cn(
                      "w-4 h-4", 
                      i < item.rating ? "fill-current" : "text-slate-300 fill-transparent"
                    )} 
                  />
                ))}
              </div>

              {/* Quote Content */}
              <div className="relative flex-1">
                <Quote className="absolute -top-4 -left-2 w-10 h-10 text-primary/10 group-hover:text-primary/20 transition-colors" />
                <p className="relative z-10 text-slate-600 leading-relaxed italic mb-8">
                  "{item.content}"
                </p>
              </div>

              {/* User Info */}
              <div className="pt-6 border-t border-slate-200 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-black">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-900 flex items-center gap-1">
                    {item.name}
                    <CheckCircle2 className="w-3 h-3 text-blue-500" />
                  </h4>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Call to Action Brief */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-6 p-2 pr-6 rounded-full bg-slate-50 border border-slate-100">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-400">
                  U{i}
                </div>
              ))}
            </div>
            <p className="text-xs font-bold text-slate-500 italic">
              Join <span className="text-primary">10,000+</span> happy customers today!
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Testimoni;