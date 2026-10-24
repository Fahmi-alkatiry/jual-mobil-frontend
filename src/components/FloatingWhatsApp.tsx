import { Button } from "@/components/ui/button";
import { buildWaLink } from "@/lib/whatsapp";

const CONSULTATION_MESSAGE =
  "Halo Putra Aditya Motor, saya ingin berkonsultasi dan menjual mobil saya. Mohon informasi estimasi harga dan jadwal inspeksi gratis ke rumah. Terima kasih!";

export function FloatingWhatsApp() {
  const whatsappBase64 =
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiB2aWV3Qm94PSIwIDAgMzIgMzIiIGZpbGw9IiNmZmZmZmYiPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTI0LjUwNCA3LjUwNEExMS44NzUgMTEuODc1IDAgMCAwIDE2LjA1IDRDOS40NjUgNCA0LjEgOS4zNiA0LjEgMTUuOTQ1YTExLjg4MiAxMS44ODIgMCAwIDAgMS41OTQgNS45NzNMNCAyOC4xMDlsNi4zMzYtMS42NjRhMTEuOTU4IDExLjk1OCAwIDAgMCA1LjcxIDEuNDU3aC4wMDVjNi41ODYgMCAxMS45NDUtNS4zNTkgMTEuOTQ5LTExLjk0OWMwLTMuMTkxLTEuMjQyLTYuMTkxLTMuNDk2LTguNDV6TTE2LjA1IDI1Ljg4M2gtLjAwNGE5LjkzIDkuOTMgMCAwIDEtNS4wNTUtMS4zODNsLS4zNjMtLjIxNWwtMy43NjIuOTg1bDEuMDA0LTMuNjY1bC0uMjM0LS4zNzVhOS45MDQgOS45MDQgMCAwIDEtMS41Mi01LjI4NWMwLTUuNDcyIDQuNDU3LTkuOTI1IDkuOTM4LTkuOTI1YTkuODYzIDkuODYzIDAgMCAxIDcuMDIgMi45MWE5Ljg3NSA5Ljg3NSAwIDAgMSAyLjkwNSA3LjAyM2MwIDUuNDc3LTQuNDU3IDkuOTMtOS45MyA5Ljkzem01LjQ0NS03LjQzOGMtLjI5Ny0uMTQ4LTEuNzY2LS44Ny0yLjAzOS0uOTY4Yy0uMjczLS4xMDItLjQ3My0uMTQ5LS42NzIuMTQ4Yy0uMi4zLS43Ny45NzMtLjk0NSAxLjE3MmMtLjE3Mi4xOTUtLjM0OC4yMjMtLjY0NS4wNzRjLS4zLS4xNDgtMS4yNjEtLjQ2NS0yLjQwMi0xLjQ4NGMtLjg4Ny0uNzktMS40ODgtMS43Ny0xLjY2LTIuMDY3Yy0uMTc2LS4zLS4wMi0uNDYuMTI5LS42MWMuMTM2LS4xMzIuMy0uMzQ3LjQ0OS0uNTIzYy4xNDgtLjE3MS4yLS4yOTYuMy0uNDk2Yy4wOTgtLjE5OS4wNDgtLjM3NS0uMDI3LS41MjNjLS4wNzQtLjE0OC0uNjcxLTEuNjIxLS45MjEtMi4yMTljLS4yNDMtLjU4Mi0uNDg5LS41LS42NzItLjUxMWMtLjE3Mi0uMDA4LS4zNzEtLjAwOC0uNTctLjAwOGMtLjIgMC0uNTI0LjA3NC0uNzk4LjM3NWMtLjI3My4yOTctMS4wNDMgMS4wMi0xLjA0MyAyLjQ4OGMwIDEuNDY5IDEuMDcgMi44OSAxLjIyIDMuMDljLjE0OC4xOTUgMi4xMDUgMy4yMSA1LjEgNC41MDRhMTYuODUgMTYuODUgMCAwIDAgMS43LjYyOWMuNzE1LjIyNiAxLjM2Ny4xOTUgMS44ODMuMTJjLjU3NC0uMDg1IDEuNzY1LS43MjIgMi4wMTUtMS40MjFjLjI0Ny0uNjk1LjI0Ny0xLjI5My4xNzItMS40MThjLS4wNzQtLjEyNS0uMjczLS4yLS41NzQtLjM1MnoiLz48L3N2Zz4=";

  return (
    <a
      href={buildWaLink(CONSULTATION_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 group flex items-center gap-2.5 transition-transform duration-300 hover:scale-105 active:scale-95"
      aria-label="Konsultasi via WhatsApp"
    >
      <span className="hidden sm:inline-flex items-center px-3.5 py-1.5 rounded-full bg-white text-slate-800 text-xs font-black shadow-lg border border-slate-100 opacity-90 group-hover:opacity-100 transition-opacity">
        Chat WhatsApp
      </span>
      <div className="relative">
        <Button
          size="lg"
          className="rounded-full h-13 w-13 sm:h-14 sm:w-14 p-0 bg-[#25D366] hover:bg-[#1ebe5d] text-white shadow-xl shadow-emerald-500/30 flex items-center justify-center transition-all"
        >
          <img
            src={whatsappBase64}
            alt="WhatsApp"
            className="w-8 h-8 sm:w-9 sm:h-9 object-contain"
          />
          <span className="sr-only">Chat WhatsApp</span>
        </Button>
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white" />
        </span>
      </div>
    </a>
  );
}
