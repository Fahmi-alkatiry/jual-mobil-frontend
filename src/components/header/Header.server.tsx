import Link from "next/link";
import Image from "next/image";
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
      <div className="container mx-auto px-6 flex items-center justify-between py-3.5">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group" aria-label="Beranda Putra Aditya Motor">
          <Image
            src="/logo.png"
            alt="Putra Aditya Motor"
            width={160}
            height={55}
            priority
            className="h-9 sm:h-11 w-auto object-contain transition-transform group-hover:scale-[1.02]"
          />
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
