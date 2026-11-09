"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Car,
  Settings,
  Globe,
  Link2,
  ChevronRight,
  X,
  PanelLeftClose,
  PanelLeft,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/context/SidebarContext";

interface MenuItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
  match?: (pathname: string) => boolean;
}

const mainMenus: MenuItem[] = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
    match: (p) => p === "/admin/dashboard" || p.startsWith("/admin/offers"),
  },
  {
    label: "Mobil Dibeli",
    href: "/admin/purchased-cars",
    icon: Car,
    match: (p) => p.startsWith("/admin/purchased-cars"),
  },
  {
    label: "Profil & Akun",
    href: "/admin/profile",
    icon: Settings,
    match: (p) => p === "/admin/profile",
  },
];

const quickLinks = [
  {
    label: "Lihat Website",
    href: "/",
    icon: Globe,
  },
  {
    label: "Halaman Bio Links",
    href: "/links",
    icon: Link2,
  },
];

export default function Sidebar() {
  const pathname = usePathname() || "";
  const { isOpen, isCollapsed, closeSidebar, toggleCollapsed } = useSidebar();

  // Otomatis tutup sidebar mobile saat route berpindah
  useEffect(() => {
    closeSidebar();
  }, [pathname, closeSidebar]);

  // Tutup sidebar mobile jika ukuran layar berubah ke desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) closeSidebar();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [closeSidebar]);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      if (confirm("Apakah Anda yakin ingin keluar dari panel admin?")) {
        localStorage.removeItem("admin_token");
        window.location.href = "/login";
      }
    }
  };

  return (
    <>
      {/* Backdrop overlay di mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs z-40 md:hidden transition-opacity duration-300"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        aria-label="Navigasi Admin"
        className={cn(
          // Mobile Drawer: slide dari kiri
          "fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] bg-white shadow-2xl flex flex-col transition-all duration-300 ease-out border-r border-slate-200/90",
          isOpen ? "translate-x-0" : "-translate-x-full",
          // Desktop: static pinned sidebar under sticky header
          "md:translate-x-0 md:static md:inset-auto md:z-30 md:shadow-none md:border-r md:border-slate-200 md:h-[calc(100dvh-4rem)] md:sticky md:top-16",
          isCollapsed ? "md:w-20" : "md:w-64"
        )}
      >
        {/* Header Sidebar */}
        <div
          className={cn(
            "h-16 flex items-center border-b border-slate-100 shrink-0 px-4",
            isCollapsed ? "md:justify-center md:px-2" : "justify-between"
          )}
        >
          <Link
            href="/admin/dashboard"
            className={cn(
              "flex items-center gap-2.5 min-w-0 transition-opacity hover:opacity-90",
              isCollapsed && "md:justify-center"
            )}
            onClick={closeSidebar}
          >
            <div className="w-9 h-9 bg-white border border-slate-200 rounded-xl flex items-center justify-center shadow-xs shrink-0 overflow-hidden p-0.5">
              <Image
                src="/logo-square.png"
                alt="PAM Logo"
                width={36}
                height={36}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-black tracking-tight text-slate-900 leading-tight truncate">
                  Putra Aditya
                </span>
                <span className="text-[10px] font-black text-primary uppercase tracking-widest leading-none">
                  Admin Panel
                </span>
              </div>
            )}
          </Link>

          {/* Tombol aksi kanan: toggle di desktop, close di mobile */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={toggleCollapsed}
              className="hidden md:inline-flex p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label={isCollapsed ? "Perlebar sidebar" : "Persempit sidebar"}
              title={isCollapsed ? "Perlebar sidebar" : "Persempit sidebar"}
            >
              {isCollapsed ? (
                <PanelLeft className="w-5 h-5" />
              ) : (
                <PanelLeftClose className="w-5 h-5" />
              )}
            </button>

            <button
              type="button"
              onClick={closeSidebar}
              className="md:hidden p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Tutup sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Menu Navigasi Utama */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 overscroll-contain">
          {/* Main Menus */}
          <div>
            {!isCollapsed && (
              <p className="px-3 mb-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                Menu Utama
              </p>
            )}
            <nav className="space-y-1">
              {mainMenus.map((menu) => {
                const active = menu.match
                  ? menu.match(pathname)
                  : pathname.startsWith(menu.href);
                const Icon = menu.icon;

                return (
                  <Link
                    key={menu.href}
                    href={menu.href}
                    title={isCollapsed ? menu.label : undefined}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center rounded-xl text-xs sm:text-sm font-bold transition-all min-h-[44px] group relative",
                      isCollapsed
                        ? "justify-center px-2 py-2.5"
                        : "justify-between px-3.5 py-2.5",
                      active
                        ? "bg-primary text-white shadow-sm shadow-primary/25"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    )}
                  >
                    <div
                      className={cn(
                        "flex items-center",
                        isCollapsed ? "justify-center" : "gap-3"
                      )}
                    >
                      <Icon
                        className={cn(
                          "w-5 h-5 shrink-0 transition-transform group-hover:scale-105",
                          active
                            ? "text-white"
                            : "text-slate-400 group-hover:text-slate-700"
                        )}
                      />
                      {!isCollapsed && (
                        <span className="truncate">{menu.label}</span>
                      )}
                    </div>

                    {!isCollapsed && active && (
                      <ChevronRight className="w-4 h-4 shrink-0 text-white/80" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Quick Links Section */}
          <div className="pt-2 border-t border-slate-100">
            {!isCollapsed && (
              <p className="px-3 mb-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                Akses Cepat
              </p>
            )}
            <div className="space-y-1">
              {quickLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={isCollapsed ? link.label : undefined}
                    className={cn(
                      "flex items-center rounded-xl text-xs sm:text-sm font-bold text-slate-500 hover:bg-slate-100 hover:text-primary transition-all min-h-[42px] group",
                      isCollapsed
                        ? "justify-center px-2 py-2"
                        : "justify-between px-3.5 py-2"
                    )}
                  >
                    <div
                      className={cn(
                        "flex items-center",
                        isCollapsed ? "justify-center" : "gap-3"
                      )}
                    >
                      <Icon className="w-4 h-4 shrink-0 text-slate-400 group-hover:text-primary" />
                      {!isCollapsed && (
                        <span className="truncate">{link.label}</span>
                      )}
                    </div>
                    {!isCollapsed && (
                      <ExternalLink className="w-3.5 h-3.5 text-slate-300 group-hover:text-primary" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Sidebar */}
        <div className="p-3 border-t border-slate-100 bg-slate-50/70 shrink-0 space-y-2">
          {/* Tombol Logout */}
          <button
            type="button"
            onClick={handleLogout}
            title={isCollapsed ? "Keluar" : undefined}
            className={cn(
              "w-full flex items-center rounded-xl text-xs font-bold text-slate-500 hover:bg-rose-50 hover:text-rose-600 transition-colors py-2.5",
              isCollapsed ? "justify-center px-2" : "gap-3 px-3.5"
            )}
          >
            <LogOut className="w-4 h-4 shrink-0 text-slate-400 group-hover:text-rose-600" />
            {!isCollapsed && <span>Keluar Panel</span>}
          </button>

          {!isCollapsed && (
            <div className="px-3 pt-1 text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Putra Aditya Motor
              </p>
              <p className="text-[9px] text-slate-400">v2.1 • Panel Manajemen</p>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
