"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Car,
  Menu,
  ChevronRight,
  Info,
  Star,
  ArrowRight,
  PhoneCall,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { name: "Beranda", href: "/", icon: Info },
    { name: "Cara Kerja", href: "/cara-kerja", icon: Info },
    { name: "Keunggulan", href: "/keunggulan", icon: Star },
    { name: "Testimoni", href: "/testimoni", icon: Star },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b transition-all duration-300",
        scrolled
          ? "bg-card border-border shadow-sm"
          : "bg-card md:bg-transparent md:backdrop-blur-md border-transparent"
      )}
    >
      <div className="container mx-auto px-6 flex h-16 items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-md">
            <Car className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <span className="font-black text-lg">
              Jual<span className="text-primary">Mobilku</span>
            </span>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
              Trusted Dealer
            </p>
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm font-bold relative",
                pathname === link.href
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              {link.name}
              <span
                className={cn(
                  "absolute -bottom-1 left-0 h-0.5 bg-primary transition-all",
                  pathname === link.href ? "w-full" : "w-0 hover:w-full"
                )}
              />
            </Link>
          ))}
        </nav>

        {/* ACTION */}
        <div className="flex items-center gap-3">
          <Button className="hidden sm:flex rounded-full px-6 font-bold">
            Mulai Jual
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>

          {/* MOBILE MENU */}
          <Sheet>
            <SheetTrigger asChild>
              <button className="md:hidden p-2 rounded-xl bg-muted">
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[85%] max-w-sm bg-card p-8"
            >
              <SheetHeader>
                <SheetTitle className="text-lg font-black">
                  Menu
                </SheetTitle>
              </SheetHeader>

              <nav className="mt-8 flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="flex items-center justify-between rounded-xl p-4 font-bold hover:bg-muted"
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </Link>
                ))}
              </nav>

              <div className="mt-10 border-t pt-6">
                <Button className="w-full h-14 rounded-xl font-black">
                  Jual Mobil Sekarang
                </Button>

                <div className="mt-4 flex items-center justify-center gap-2 text-muted-foreground">
                  <PhoneCall className="w-3 h-3" />
                  <span className="text-xs font-bold">Bantuan 24/7</span>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
