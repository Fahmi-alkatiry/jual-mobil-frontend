"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LogOut,
  UserCircle,
  Menu,
  X,
  Globe,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/context/SidebarContext";
import { api } from "@/lib/api";

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

  const getPageInfo = () => {
    if (pathname === "/admin/dashboard") {
      return {
        section: "Dashboard",
        title: "Penawaran Masuk",
      };
    }
    if (pathname.startsWith("/admin/offers")) {
      return {
        section: "Dashboard",
        title: "Detail Penawaran Mobil",
      };
    }
    if (pathname === "/admin/purchased-cars/new") {
      return {
        section: "Mobil Dibeli",
        title: "Tambah Unit Baru",
      };
    }
    if (pathname.startsWith("/admin/purchased-cars")) {
      return {
        section: "Katalog Showroom",
        title: "Mobil Yang Kami Beli",
      };
    }
    if (pathname === "/admin/profile") {
      return {
        section: "Pengaturan",
        title: "Profil & WA Gateway",
      };
    }
    return {
      section: "Panel Manajemen",
      title: "Dashboard",
    };
  };

  const pageInfo = getPageInfo();

  return (
    <header className="h-16 bg-white/90 backdrop-blur-md border-b border-slate-200/80 flex items-center justify-between gap-3 px-3 sm:px-4 md:px-6 lg:px-8 sticky top-0 z-40 shrink-0 w-full">
      {/* Left Area: Hamburger + Breadcrumb */}
      <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
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

        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider truncate">
            <span>{pageInfo.section}</span>
            <ChevronRight className="w-3 h-3 text-slate-300 shrink-0" />
            <span className="text-primary truncate">{pageInfo.title}</span>
          </div>
          <p className="text-xs sm:text-sm font-black text-slate-900 truncate">
            {pageInfo.title}
          </p>
        </div>
      </div>

      {/* Right Area: Shortcut & Profile */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Tombol Lihat Web Publik */}
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-slate-600 bg-slate-100/80 hover:bg-slate-200 hover:text-primary transition-colors border border-slate-200/60"
          title="Buka Website Publik (Tab Baru)"
        >
          <Globe className="w-3.5 h-3.5 text-primary" />
          <span>Lihat Web</span>
          <ExternalLink className="w-3 h-3 text-slate-400" />
        </Link>

        <div className="h-6 w-[1px] bg-slate-200 hidden sm:block" />

        {/* Profil Admin */}
        <Link
          href="/admin/profile"
          className="flex items-center gap-2 sm:gap-2.5 p-1 rounded-xl hover:bg-slate-100/80 transition-colors min-w-0 group"
          title="Buka Pengaturan Profil & WA Gateway"
        >
          <div className="text-right hidden md:block min-w-0">
            <p className="text-xs font-black text-slate-900 leading-none truncate group-hover:text-primary transition-colors">
              {adminName}
            </p>
            <p className="text-[10px] text-slate-400 font-bold mt-1 tracking-tight truncate">
              Super Admin
            </p>
          </div>
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-primary shadow-2xs shrink-0 group-hover:scale-105 transition-transform">
            <UserCircle className="w-5 h-5 sm:w-6 sm:h-6" />
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
