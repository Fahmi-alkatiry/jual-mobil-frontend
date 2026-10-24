"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronRight,
  ArrowRight,
  Car,
  Phone,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { buildWaLink } from "@/lib/whatsapp";
import { NAV_LINKS } from "./nav-links";

const CONSULTATION_MESSAGE =
  "Halo Putra Aditya Motor, saya ingin konsultasi dan menjual mobil saya. Mohon informasi estimasi harga dan jadwal inspeksi gratis ke rumah.";

export default function HeaderClient() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Kunci scroll halaman secara menyeluruh saat drawer mobile terbuka (termasuk iOS Safari)
  useEffect(() => {
    if (!open) return;

    const scrollY = window.scrollY;
    const prevOverflow = document.body.style.overflow;
    const prevPosition = document.body.style.position;
    const prevTop = document.body.style.top;
    const prevWidth = document.body.style.width;

    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.position = prevPosition;
      document.body.style.top = prevTop;
      document.body.style.width = prevWidth;
      window.scrollTo(0, scrollY);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  // Otomatis tutup drawer jika rute berpindah
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Actions Navbar */}
      <div className="flex items-center gap-2 sm:gap-3">
        <Link href="/cek-harga" className="hidden sm:block">
          <Button className="bg-primary hover:bg-primary/90 rounded-full px-6 font-bold text-white shadow-sm hover:shadow-md transition-all group">
            Mulai Jual
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>

        <button
          type="button"
          aria-label="Buka menu navigasi"
          aria-expanded={open}
          onClick={() => setOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-800 transition-colors hover:bg-slate-200 active:scale-95 md:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* PORTAL KE DOCUMENT.BODY:
          Memastikan drawer dan overlay keluar dari stacking context <header> yang memiliki backdrop-filter.
          Ini mencegah overlay terpotong, mencegah kotak abu-abu di pojok kiri atas,
          serta mencegah sidebar bergeser saat celah di sebelah kiri disentuh/discroll. */}
      {mounted &&
        createPortal(
          <div className="md:hidden">
            {/* Dark Backdrop Overlay (Menutup seluruh layar 100vw x 100vh) */}
            <div
              onClick={() => setOpen(false)}
              onTouchMove={(e) => e.preventDefault()}
              aria-hidden="true"
              className={cn(
                "fixed inset-0 z-[998] bg-slate-950/60 backdrop-blur-sm transition-opacity duration-300",
                open
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              )}
            />

            {/* Mobile Menu Drawer (Terkunci kokoh di kanan layar) */}
            <aside
              role="dialog"
              aria-modal="true"
              aria-label="Menu navigasi"
              className={cn(
                "fixed right-0 top-0 bottom-0 z-[999] flex h-[100dvh] w-[86%] max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 ease-out will-change-transform",
                open
                  ? "translate-x-0 pointer-events-auto"
                  : "translate-x-full pointer-events-none invisible"
              )}
            >
              {/* Header Drawer */}
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 shrink-0 bg-white">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-sm">
                    <Car className="h-5 w-5 text-white" />
                  </div>
                  <div className="leading-none">
                    <span className="font-black text-base text-slate-900">
                      Putra <span className="text-primary">Aditya Motor</span>
                    </span>
                    <p className="mt-1 text-[9px] font-bold uppercase tracking-widest text-slate-400">
                      Trusted Dealer
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  aria-label="Tutup menu"
                  onClick={() => setOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 active:scale-95"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 overflow-y-auto overscroll-contain px-3 py-4">
                <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Menu Utama
                </p>

                <ul className="flex flex-col gap-1">
                  {NAV_LINKS.map((link) => {
                    const isActive =
                      link.href === "/"
                        ? pathname === "/"
                        : pathname.startsWith(link.href);

                    return (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          onClick={() => setOpen(false)}
                          aria-current={isActive ? "page" : undefined}
                          className={cn(
                            "flex items-center justify-between rounded-xl px-3.5 py-3 text-sm font-bold transition-all",
                            isActive
                              ? "bg-primary/10 text-primary font-black"
                              : "text-slate-700 hover:bg-slate-50 active:bg-slate-100"
                          )}
                        >
                          <span className="flex items-center gap-3">
                            <span
                              className={cn(
                                "h-2 w-2 rounded-full transition-colors",
                                isActive ? "bg-primary" : "bg-slate-300"
                              )}
                            />
                            {link.name}
                          </span>
                          <ChevronRight
                            className={cn(
                              "h-4 w-4 transition-colors",
                              isActive
                                ? "text-primary stroke-[2.5]"
                                : "text-slate-300"
                            )}
                          />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* Drawer Footer / CTA */}
              <div className="border-t border-slate-100 bg-slate-50/90 px-5 py-4 pb-6 shrink-0 space-y-2.5">
                <Link
                  href="/cek-harga"
                  onClick={() => setOpen(false)}
                  className="block"
                >
                  <Button className="h-11 w-full rounded-xl bg-primary hover:bg-primary/90 font-bold text-white shadow-md shadow-primary/20 transition-all active:scale-[0.98]">
                    Jual Mobil Sekarang
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>

                <a
                  href={buildWaLink(CONSULTATION_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#1ebe5d] text-sm font-black text-white shadow-md shadow-emerald-500/20 transition-all active:scale-[0.98]"
                >
                  <Phone className="h-4 w-4" />
                  Chat WhatsApp
                </a>

                <p className="pt-1 flex items-center justify-center gap-1.5 text-[11px] font-semibold text-slate-400">
                  <MapPin className="h-3 w-3 shrink-0 text-slate-400" />
                  Melayani Jabodetabek &amp; sekitarnya
                </p>
              </div>
            </aside>
          </div>,
          document.body
        )}
    </>
  );
}
