import Link from "next/link";
import { Car } from "lucide-react";
import HeaderClient from "./Header.client";
import { NAV_LINKS } from "./nav-links";

export default function Header() {
  return (
    <header
      className="
        sticky top-0 z-40 w-full
        backdrop-blur-md
        bg-white/70
        border-b border-slate-200/70
        supports-[backdrop-filter]:bg-white/60
      "
    >
      <div className="container mx-auto px-6 flex items-center justify-between py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg">
            <Car className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="font-black text-xl leading-none">
              Jual<span className="text-primary">Mobilku</span>
            </span>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Trusted Dealer
            </p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-bold text-slate-600 hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Client-only (menu mobile, CTA) */}
        <HeaderClient />
      </div>
    </header>
  );
}
