"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { buildWaLink } from "@/lib/whatsapp";

const CONSULTATION_MESSAGE =
  "Halo Putra Aditya Motor, saya ingin konsultasi dan menjual mobil saya. Mohon informasi estimasi harga dan jadwal inspeksi gratis ke rumah.";

const consultationHref = buildWaLink(CONSULTATION_MESSAGE);

const whatsappBase64 =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiB2aWV3Qm94PSIwIDAgMzIgMzIiIGZpbGw9IiNmZmZmZmYiPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTI0LjUwNCA3LjUwNEExMS44NzUgMTEuODc1IDAgMCAwIDE2LjA1IDRDOS40NjUgNCA0LjEgOS4zNiA0LjEgMTUuOTQ1YTExLjg4MiAxMS44ODIgMCAwIDAgMS41OTQgNS45NzNMNCAyOC4xMDlsNi4zMzYtMS42NjRhMTEuOTU4IDExLjk1OCAwIDAgMCA1LjcxIDEuNDU3aC4wMDVjNi41ODYgMCAxMS45NDUtNS4zNTkgMTEuOTQ5LTExLjk0OWMwLTMuMTkxLTEuMjQyLTYuMTkxLTMuNDk2LTguNDV6TTE2LjA1IDI1Ljg4M2gtLjAwNGE5LjkzIDkuOTMgMCAwIDEtNS4wNTUtMS4zODNsLS4zNjMtLjIxNWwtMy43NjIuOTg1bDEuMDA0LTMuNjY1bC0uMjM0LS4zNzVhOS45MDQgOS45MDQgMCAwIDEtMS41Mi01LjI4NWMwLTUuNDcyIDQuNDU3LTkuOTI1IDkuOTM4LTkuOTI1YTkuODYzIDkuODYzIDAgMCAxIDcuMDIgMi45MWE5Ljg3NSA5Ljg3NSAwIDAgMSAyLjkwNSA3LjAyM2MwIDUuNDc3LTQuNDU3IDkuOTMtOS45MyA5Ljkzem01LjQ0NS03LjQzOGMtLjI5Ny0uMTQ4LTEuNzY2LS44Ny0yLjAzOS0uOTY4Yy0uMjczLS4xMDItLjQ3My0uMTQ5LS42NzIuMTQ4Yy0uMi4zLS43Ny45NzMtLjk0NSAxLjE3MmMtLjE3Mi4xOTUtLjM0OC4yMjMtLjY0NS4wNzRjLS4zLS4xNDgtMS4yNjEtLjQ2NS0yLjQwMi0xLjQ4NGMtLjg4Ny0uNzktMS40ODgtMS43Ny0xLjY2LTIuMDY3Yy0uMTc2LS4zLS4wMi0uNDYuMTI5LS42MWMuMTM2LS4xMzIuMy0uMzQ3LjQ0OS0uNTIzYy4xNDgtLjE3MS4yLS4yOTYuMy0uNDk2Yy4wOTgtLjE5OS4wNDgtLjM3NS0uMDI3LS41MjNjLS4wNzQtLjE0OC0uNjcxLTEuNjIxLS45MjEtMi4yMTljLS4yNDMtLjU4Mi0uNDg5LS41LS42NzItLjUxMWMtLjE3Mi0uMDA4LS4zNzEtLjAwOC0uNTctLjAwOGMtLjIgMC0uNTI0LjA3NC0uNzk4LjM3NWMtLjI3My4yOTctMS4wNDMgMS4wMi0xLjA0MyAyLjQ4OGMwIDEuNDY5IDEuMDcgMi44OSAxLjIyIDMuMDljLjE0OC4xOTUgMi4xMDUgMy4yMSA1LjEgNC41MDRhMTYuODUgMTYuODUgMCAwIDAgMS43LjYyOWMuNzE1LjIyNiAxLjM2Ny4xOTUgMS44ODMuMTJjLjU3NC0uMDg1IDEuNzY1LS43MjIgMi4wMTUtMS40MjFjLjI0Ny0uNjk1LjI0Ny0xLjI5My4xNzItMS40MThjLS4wNzQtLjEyNS0uMjczLS4yLS41NzQtLjM1MnoiLz48L3N2Zz4=";
const mapsBase64 =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLW1hcC1waW4gcHJldmlldy1pY29uIj48cGF0aCBkPSJNMjAgMTBjMCA0Ljk5My01LjUzOSAxMC4xOTMtNy4zOTkgMTEuNzk5YTEgMSAwIDAgMS0xLjIwMiAwQzkuNTM5IDIwLjE5MyA0IDE0Ljk5MyA0IDEwYTggOCAwIDAgMSAxNiAwIi8+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMCIgcj0iMyIvPjwvc3ZnPg==";

const slides = [
  {
    id: 1,
    title: "Jual Mobil Bekas Cepat di Putra Aditya Motor, Dana Cair 30 Menit!",
    caption:
      "Proses 30 menit, kami jemput ke rumah. Inspeksi gratis Jabodetabek.",
    image:
      "https://naufalgallerymotor.vercel.app/images/cars/avanza-silver.webp",
    href: consultationHref,
    button: "Klaim Penawaran Via WA",
    bg: "bg-green-500",
    icon: whatsappBase64,
  },
  {
    id: 2,
    title: "Gratis Home Inspection ke Rumah Anda",
    caption: "Teknisi Putra Aditya Motor datang, cek menyeluruh tanpa biaya.",
    image: "https://naufalgallerymotor.vercel.app/images/cars/calya-white.webp",
    href: consultationHref,
    button: "Jadwalkan inspeksi Gratis",
    bg: "bg-green-500",
    icon: whatsappBase64,
  },
  {
    id: 3,
    title: "Harga Terbaik & Pembayaran Instan",
    caption: "Penawaran kompetitif, transfer lunas di tempat setelah deal.",
    image: "https://naufalgallerymotor.vercel.app/images/cars/brio-yellow.webp",
    href: consultationHref,
    button: "Hubungi via WhatsApp",
    bg: "bg-green-500",
    icon: whatsappBase64,
  },
] as const;

export default function HomeCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const next = useCallback(
    () => setCurrent((p) => (p + 1) % slides.length),
    [],
  );
  const prev = useCallback(
    () => setCurrent((p) => (p - 1 + slides.length) % slides.length),
    [],
  );

  useEffect(() => {
    if (paused) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const id = setInterval(next, 4000);
    return () => clearInterval(id);
  }, [paused, next]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
    touchStartX.current = null;
  };

  return (
    <section
      className="py-4"
      aria-label="Carousel promo Putra Aditya Motor"
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") prev();
        if (e.key === "ArrowRight") next();
      }}
      tabIndex={0}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div
          className="group relative overflow-hidden rounded-2xl sm:rounded-3xl md:rounded-4xl border border-slate-200 bg-slate-900 h-[290px] sm:h-[330px] md:h-[380px] lg:h-[420px] shadow-sm select-none"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="flex h-full w-full transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {slides.map((s) => (
              <div key={s.id} className="min-w-full relative h-full shrink-0 overflow-hidden">
                <img
                  src={s.image}
                  alt={s.title}
                  loading={s.id === 1 ? "eager" : "lazy"}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 md:p-8 pb-8 sm:pb-8 flex flex-col justify-end z-10">
                  <h3 className="text-white text-base sm:text-xl md:text-2xl lg:text-3xl font-black leading-tight drop-shadow-md line-clamp-2 max-w-2xl">
                    {s.title}
                  </h3>
                  <p className="text-white/90 text-xs sm:text-sm md:text-base mt-1 sm:mt-2 max-w-2xl font-medium drop-shadow-sm line-clamp-1 sm:line-clamp-2">
                    {s.caption}
                  </p>
                  <div className="mt-3 sm:mt-4 flex flex-wrap items-center gap-2 sm:gap-3">
                    <Link
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block"
                    >
                      <Button
                        size="sm"
                        className="rounded-full bg-[#25D366] hover:bg-[#1ebe5d] text-white font-black text-xs sm:text-sm h-8 sm:h-9 px-3.5 sm:px-4 shadow-lg shadow-black/20 flex items-center gap-1.5 transition-transform active:scale-95"
                      >
                        <span>{s.button}</span>
                        <img
                          src={s.icon}
                          alt="WhatsApp"
                          className="w-4 h-4 sm:w-5 sm:h-5 object-contain"
                        />
                      </Button>
                    </Link>
                    <Link
                      href="/cek-harga"
                      className="inline-block"
                    >
                      <Button
                        size="sm"
                        className="rounded-full bg-primary hover:bg-primary/90 text-white font-black text-xs sm:text-sm h-8 sm:h-9 px-3.5 sm:px-4 shadow-lg shadow-black/20 transition-transform active:scale-95"
                      >
                        Jual Sekarang
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            aria-label="Slide sebelumnya"
            onClick={prev}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-11 md:h-11 rounded-full bg-white/85 backdrop-blur hidden md:flex items-center justify-center shadow hover:bg-white transition-colors duration-200 opacity-0 pointer-events-none md:group-hover:opacity-100 md:group-focus-within:opacity-100 md:group-hover:pointer-events-auto md:group-focus-within:pointer-events-auto z-20"
          >
            <ChevronLeft className="w-5 h-5 text-slate-900" />
          </button>
          <button
            aria-label="Slide berikutnya"
            onClick={next}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-11 md:h-11 rounded-full bg-white/85 backdrop-blur hidden md:flex items-center justify-center shadow hover:bg-white transition-colors duration-200 opacity-0 pointer-events-none md:group-hover:opacity-100 md:group-focus-within:opacity-100 md:group-hover:pointer-events-auto md:group-focus-within:pointer-events-auto z-20"
          >
            <ChevronRight className="w-5 h-5 text-slate-900" />
          </button>

          <div className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 sm:gap-2 z-20">
            {slides.map((_, i) => (
              <button
                key={i}
                aria-label={`Ke slide ${i + 1}`}
                aria-current={i === current}
                onClick={() => setCurrent(i)}
                className={cn(
                  "h-1.5 sm:h-2 rounded-full transition-all",
                  i === current
                    ? "w-5 sm:w-6 bg-white"
                    : "w-1.5 sm:w-2 bg-white/60 hover:bg-white/80",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
