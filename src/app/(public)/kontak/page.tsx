import type { Metadata } from "next";
import { CONTACT } from "@/lib/contact";
import { MessageCircle, Instagram, Facebook, MapPin, ArrowUpRight, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Kontak | Putra Aditya Motor",
  description: "Hubungi Putra Aditya Motor via WhatsApp, Instagram, Facebook, atau kunjungi kami di Google Maps. Layanan inspeksi gratis Jabodetabek.",
};

const cards = [
  {
    title: "WhatsApp",
    desc: "Chat langsung — respon cepat",
    handle: CONTACT.whatsappDisplay,
    href: CONTACT.whatsappUrl,
    cta: "Buka WhatsApp",
    icon: MessageCircle,
    bg: "bg-[#25D366]",
    fg: "text-white",
  },
  {
    title: "Instagram",
    desc: "Lihat katalog & promo terbaru",
    handle: CONTACT.instagramHandle,
    href: CONTACT.instagram,
    cta: "Buka Instagram",
    icon: Instagram,
    bg: "bg-gradient-to-br from-pink-500 via-purple-500 to-orange-400",
    fg: "text-white",
  },
  {
    title: "Facebook",
    desc: "Ikuti update & testimoni",
    handle: CONTACT.facebookHandle,
    href: CONTACT.facebook,
    cta: "Buka Facebook",
    icon: Facebook,
    bg: "bg-[#1877F2]",
    fg: "text-white",
  },
] as const;

export default function KontakPage() {
  return (
    <section className="py-8 md:py-12 bg-[#f8fafc] min-h-[70vh]">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 border border-blue-100 mb-4">
            <Phone className="w-4 h-4" />
            <span className="text-xs font-black uppercase tracking-widest">Hubungi Kami</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900">
            Kontak <span className="text-primary">Putra Aditya Motor</span>
          </h1>
          <p className="mt-4 text-slate-500 text-sm md:text-base">
            Pilih channel favoritmu — WhatsApp, Instagram, Facebook, atau lihat lokasi kami di Google Maps. Inspeksi gratis Jabodetabek.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {cards.map((c) => (
            <a
              key={c.title}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-[2rem] border bg-white p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col"
            >
              <div className={`w-12 h-12 rounded-2xl ${c.bg} ${c.fg} flex items-center justify-center shadow-sm`}>
                <c.icon className="w-6 h-6" />
              </div>
              <h3 className="mt-4 font-black text-slate-900">{c.title}</h3>
              <p className="text-sm text-slate-500 mt-1">{c.desc}</p>
              <p className="text-xs font-bold text-slate-400 mt-2">{c.handle}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-black text-primary group-hover:gap-2 transition-all">
                {c.cta} <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </a>
          ))}
        </div>

        <a
          href={CONTACT.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-5 rounded-[2rem] border bg-white p-6 md:p-8 shadow-sm hover:shadow-xl transition-shadow"
        >
          <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center shrink-0">
            <MapPin className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-black text-slate-900">Lokasi Kami</h3>
            <p className="text-sm text-slate-500 mt-1">{CONTACT.address}</p>
            <p className="text-xs font-bold text-slate-400 mt-1">{CONTACT.mapsQuery}</p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full bg-slate-900 text-white px-5 py-2.5 text-xs font-black shrink-0">
            Buka di Google Maps <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </a>
      </div>
    </section>
  );
}
