"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Car,
  Settings,
  LogOut,
  UserCircle,
  Menu,
  X,
  Globe,
  ExternalLink,
  Link2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/context/SidebarContext";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";

const navItems = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
    isActive: (p: string) => p === "/admin/dashboard" || p.startsWith("/admin/offers"),
  },
  {
    label: "Mobil Dibeli",
    href: "/admin/purchased-cars",
    icon: Car,
    isActive: (p: string) => p.startsWith("/admin/purchased-cars"),
  },
  {
    label: "Profil & WA",
    href: "/admin/profile",
    icon: Settings,
    isActive: (p: string) => p === "/admin/profile",
  },
];

export default function AdminHeader() {
  const { toggleSidebar, isOpen } = useSidebar();
  const pathname = usePathname() || "";
  const [adminName, setAdminName] = useState<string>("Admin");

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await api.get("/auth/me");
        if (res.data?.success && res.data?.data?.username) {
          setAdminName(res.data.data.username);
        }
      } catch {
        // Fallback tetap Admin jika offline/error
      }
    };
    fetchAdmin();
  }, []);

  const logout = () => {
    if (typeof window !== "undefined") {
      if (confirm("Apakah Anda yakin ingin keluar dari panel admin?")) {
        localStorage.removeItem("admin_token");
        window.location.href = "/login";
      }
    }
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200/90 flex items-center justify-between gap-3 px-3 sm:px-4 md:px-6 sticky top-0 z-40 shrink-0 w-full shadow-2xs">
      {/* Left: Mobile Hamburger & Brand Logo */}
      <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden shrink-0 min-w-[42px] min-h-[42px] text-slate-700 hover:bg-slate-100 rounded-xl"
          onClick={toggleSidebar}
          aria-label={isOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>

        <Link
          href="/admin/dashboard"
          className="flex items-center gap-2.5 group"
          aria-label="Dashboard Admin Putra Aditya Motor"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-white border border-slate-200 rounded-xl flex items-center justify-center shadow-2xs shrink-0 overflow-hidden p-0.5">
            <Image
              src="/logo-square.png"
              alt="PAM Logo"
              width={36}
              height={36}
              className="w-full h-full object-contain"
              priority
            />
          </div>
          <div className="hidden sm:flex flex-col min-w-0">
            <span className="text-sm font-black tracking-tight text-slate-900 leading-tight">
              Putra Aditya Motor
            </span>
            <span className="text-[10px] font-bold text-primary uppercase tracking-widest leading-none">
              Admin Panel
            </span>
          </div>
        </Link>
      </div>

      {/* Center: Desktop Navigation Bar (Tampil di Mode Desktop) */}
      <nav
        aria-label="Navigasi Utama Admin"
        className="hidden md:flex items-center gap-1 lg:gap-1.5 bg-slate-100/90 p-1 rounded-2xl border border-slate-200/60"
      >
        {navItems.map((item) => {
          const active = item.isActive(pathname);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all",
                active
                  ? "bg-white text-primary shadow-xs font-black"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
              )}
            >
              <Icon
                className={cn(
                  "w-4 h-4 shrink-0",
                  active ? "text-primary" : "text-slate-400"
                )}
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Right: Quick Links, Profile & Logout */}
      <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
        {/* Tombol Pintasan Lihat Website */}
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-600 hover:text-primary hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200"
          title="Buka Website Utama (Tab Baru)"
        >
          <Globe className="w-3.5 h-3.5 text-primary" />
          <span>Lihat Web</span>
          <ExternalLink className="w-3 h-3 text-slate-400" />
        </Link>

        {/* Tombol Pintasan Bio Links */}
        <Link
          href="/links"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-600 hover:text-primary hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200"
          title="Buka Halaman Bio Links (Tab Baru)"
        >
          <Link2 className="w-3.5 h-3.5 text-primary" />
          <span>Bio Links</span>
          <ExternalLink className="w-3 h-3 text-slate-400" />
        </Link>

        <div className="h-5 w-[1px] bg-slate-200 hidden sm:block" />

        {/* Profil Admin */}
        <Link
          href="/admin/profile"
          className={cn(
            "flex items-center gap-2 p-1 sm:px-2 sm:py-1 rounded-xl transition-colors group",
            pathname === "/admin/profile"
              ? "bg-primary/10 text-primary border border-primary/20"
              : "hover:bg-slate-100 text-slate-700"
          )}
          title="Pengaturan Profil & WA Gateway"
        >
          <div className="w-8 h-8 rounded-lg bg-orange-50 border border-orange-200 flex items-center justify-center text-primary shadow-2xs shrink-0 group-hover:scale-105 transition-transform">
            <UserCircle className="w-5 h-5" />
          </div>
          <div className="text-left hidden md:block min-w-0">
            <p className="text-xs font-black leading-none truncate group-hover:text-primary transition-colors">
              {adminName}
            </p>
            <p className="text-[10px] text-slate-400 font-bold mt-1 tracking-tight truncate">
              Super Admin
            </p>
          </div>
        </Link>

        {/* Tombol Keluar */}
        <Button
          size="sm"
          variant="ghost"
          onClick={logout}
          className="rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 font-bold text-xs min-h-[38px] px-2.5 sm:px-3"
          aria-label="Keluar dari akun admin"
          title="Keluar dari akun admin"
        >
          <LogOut className="w-4 h-4 sm:mr-1.5" />
          <span className="hidden sm:inline font-black text-xs">Keluar</span>
        </Button>
      </div>
    </header>
  );
}
