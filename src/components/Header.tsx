"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Car,
  Menu,
  X,
  ChevronRight,
  Info,
  Star,
  ArrowRight,
  PhoneCall,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Beranda", href: "/", icon: <Info className="w-4 h-4" /> },
    {
      name: "Cara Kerja",
      href: "/cara-kerja",
      icon: <Info className="w-4 h-4" />,
    },
    {
      name: "Keunggulan",
      href: "/keunggulan",
      icon: <Star className="w-4 h-4" />,
    },
    {
      name: "Testimoni",
      href: "/testimoni",
      icon: <Star className="w-4 h-4" />,
    },
  ];

  const isActive = (href: string) => {
    if (href.startsWith("#")) return false;
    return pathname === href;
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full backdrop-blur-md border-b transition-all duration-300",
          scrolled
            ? "bg-white/90 border-slate-200 py-3 shadow-sm"
            : "bg-transparent border-transparent py-5"
        )}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
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
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-sm font-bold transition-colors relative group",
                  isActive(link.href)
                    ? "text-primary"
                    : "text-slate-600 hover:text-primary"
                )}
              >
                {link.name}
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 h-0.5 bg-primary transition-all",
                    isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
                  )}
                />
              </Link>
            ))}
          </nav>

          {/* Action */}
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button className="hidden sm:flex bg-primary text-white rounded-full px-6 font-bold group">
                Mulai Jual
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            <button
              className="md:hidden p-2 rounded-xl bg-slate-100"
              onClick={() => setOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-[60] bg-black/40 transition-opacity md:hidden",
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setOpen(false)}
      />

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          "fixed top-0 right-0 z-[70] h-full w-[80%] max-w-sm bg-white shadow-2xl transition-transform md:hidden p-8",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex justify-between items-center mb-10">
          <span className="font-black text-lg">Menu</span>
          <button onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>

        <nav className="flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 font-bold"
            >
              <span>{link.name}</span>
              <ChevronRight className="w-4 h-4 text-slate-300" />
            </Link>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t">
          <Button className="w-full h-14 rounded-xl bg-primary text-white font-black">
            Jual Mobil Sekarang
          </Button>
          <div className="mt-4 flex items-center justify-center gap-2 text-slate-400">
            <PhoneCall className="w-3 h-3" />
            <span className="text-xs font-bold">Bantuan 24/7</span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Header;
