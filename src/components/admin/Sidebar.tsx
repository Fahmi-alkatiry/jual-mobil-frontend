"use client";

import React, { useEffect } from "react";
import Link from "next/link";
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
    label: "Website Utama",
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

  const renderNavLinks = (collapsed: boolean) => (
    <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 overscroll-contain">
      {/* Menu Utama */}
      <div>
        {!collapsed && (
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
                title={collapsed ? menu.label : undefined}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center rounded-xl text-xs sm:text-sm font-bold transition-all min-h-[44px] group relative",
                  collapsed
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
                    collapsed ? "justify-center" : "gap-3"
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
                  {!collapsed && <span className="truncate">{menu.label}</span>}
                </div>

                {!collapsed && active && (
                  <ChevronRight className="w-4 h-4 shrink-0 text-white/80" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Akses Cepat */}
      <div className="pt-2 border-t border-slate-100">
        {!collapsed && (
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
                title={collapsed ? link.label : undefined}
                className={cn(
                  "flex items-center rounded-xl text-xs sm:text-sm font-bold text-slate-500 hover:bg-slate-100 hover:text-primary transition-all min-h-[42px] group",
                  collapsed
                    ? "justify-center px-2 py-2"
                    : "justify-between px-3.5 py-2"
                )}
              >
                <div
                  className={cn(
                    "flex items-center",
                    collapsed ? "justify-center" : "gap-3"
                  )}
                >
                  <Icon className="w-4 h-4 shrink-0 text-slate-400 group-hover:text-primary" />
                  {!collapsed && <span className="truncate">{link.label}</span>}
                </div>
                {!collapsed && (
                  <ExternalLink className="w-3.5 h-3.5 text-slate-300 group-hover:text-primary" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* ========================================================= */}
      {/* 1. MOBILE DRAWER (Hanya aktif di bawah breakpoint md)     */}
      {/* ========================================================= */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs z-50 md:hidden transition-opacity duration-300"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      <aside
        aria-label="Navigasi Menu Mobile"
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] bg-white shadow-2xl flex flex-col border-r border-slate-200 transition-transform duration-300 ease-out md:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-16 flex items-center justify-between border-b border-slate-100 shrink-0 px-4">
          <span className="text-sm font-black text-slate-900 tracking-tight">
            Menu Navigasi
          </span>
          <button
            type="button"
            onClick={closeSidebar}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Tutup sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {renderNavLinks(false)}

        <div className="p-3 border-t border-slate-100 bg-slate-50 shrink-0">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-500 hover:bg-rose-50 hover:text-rose-600 transition-colors"
          >
            <LogOut className="w-4 h-4 shrink-0 text-slate-400 group-hover:text-rose-600" />
            <span>Keluar Panel</span>
          </button>
        </div>
      </aside>

      {/* ========================================================= */}
      {/* 2. DESKTOP SIDEBAR (Selalu tampil di breakpoint md ke atas) */}
      {/* ========================================================= */}
      <aside
        aria-label="Sidebar Admin Desktop"
        className={cn(
          "hidden md:flex flex-col shrink-0 border-r border-slate-200/90 bg-white sticky top-16 h-[calc(100dvh-4rem)] z-30 transition-all duration-300 select-none",
          isCollapsed ? "w-20" : "w-64"
        )}
      >
        {/* Toggle Collapse Bar */}
        <div
          className={cn(
            "h-12 flex items-center border-b border-slate-100 shrink-0 px-3",
            isCollapsed ? "justify-center" : "justify-between"
          )}
        >
          {!isCollapsed && (
            <span className="text-xs font-black uppercase tracking-wider text-slate-400 pl-1">
              Navigasi
            </span>
          )}
          <button
            type="button"
            onClick={toggleCollapsed}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label={isCollapsed ? "Perlebar sidebar" : "Persempit sidebar"}
            title={isCollapsed ? "Perlebar sidebar" : "Persempit sidebar"}
          >
            {isCollapsed ? (
              <PanelLeft className="w-4 h-4" />
            ) : (
              <PanelLeftClose className="w-4 h-4" />
            )}
          </button>
        </div>

        {renderNavLinks(isCollapsed)}

        {/* Footer Sidebar Desktop */}
        <div className="p-3 border-t border-slate-100 bg-slate-50/80 shrink-0 space-y-1">
          <button
            type="button"
            onClick={handleLogout}
            title={isCollapsed ? "Keluar" : undefined}
            className={cn(
              "w-full flex items-center rounded-xl text-xs font-bold text-slate-500 hover:bg-rose-50 hover:text-rose-600 transition-colors py-2",
              isCollapsed ? "justify-center px-1" : "gap-3 px-3"
            )}
          >
            <LogOut className="w-4 h-4 shrink-0 text-slate-400 group-hover:text-rose-600" />
            {!isCollapsed && <span>Keluar</span>}
          </button>

          {!isCollapsed && (
            <div className="px-3 pt-1 text-center">
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                Putra Aditya Motor • Admin
              </p>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
