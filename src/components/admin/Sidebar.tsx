"use client";

import React, { useEffect, useState } from "react";
// Menggunakan fallback sederhana jika next/navigation tidak tersedia di lingkungan tertentu
let usePathname: () => string;
try {
  usePathname = require("next/navigation").usePathname;
} catch (e) {
  usePathname = () => (typeof window !== "undefined" ? window.location.pathname : "");
}

import {
  LayoutDashboard,
  Car,
  Users,
  Settings,
  ChevronRight,
  X
} from "lucide-react";
import { cn } from "../../lib/utils";
import { useSidebar } from "../../context/SidebarContext";

const menus = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Mobil Dibeli", href: "/admin/purchased-cars", icon: Car },
];

export default function Sidebar() {
  const pathname = usePathname() || "";
  const { isOpen, closeSidebar } = useSidebar();

  // Efek untuk menutup sidebar otomatis jika layar di-resize ke ukuran desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        closeSidebar();
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [closeSidebar]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed left-0 right-0 bottom-0 top-16 bg-slate-900/50 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
          onClick={closeSidebar}
        />
      )}

      <aside className={cn(
        "fixed inset-x-0 top-16 z-50 bg-white border-b border-slate-200 shadow-xl flex flex-col rounded-b-2xl max-h-[calc(100vh-4rem)] overflow-hidden transition-transform duration-300 ease-in-out",
        "md:inset-y-0 md:left-0 md:right-auto md:w-64 md:border-r md:border-b-0 md:shadow-none md:rounded-none md:max-h-none md:relative md:translate-x-0 md:translate-y-0",
        isOpen ? "translate-y-0 md:translate-y-0" : "-translate-y-full md:translate-y-0 pointer-events-none md:pointer-events-auto"
      )}>
        {/* LOGO & TOMBOL TUTUP (Mobile) */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-100">
              <Car className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-lg font-black tracking-tight text-slate-900">
              Admin Panel
            </h1>
          </div>
          <button 
            onClick={closeSidebar} 
            className="md:hidden p-2 text-slate-400 hover:text-slate-600 transition-colors"
            aria-label="Tutup Sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* NAVIGASI MENU */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menus.map((menu) => {
            const active = pathname.startsWith(menu.href);
            const Icon = menu.icon;

            return (
              <a
                key={menu.href}
                href={menu.href}
                onClick={closeSidebar} // Tutup sidebar otomatis saat menu diklik di mobile
                className={cn(
                  "flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all group",
                  active
                    ? "bg-blue-50 text-blue-600 shadow-sm shadow-blue-50"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon className={cn(
                    "w-5 h-5 transition-colors", 
                    active ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"
                  )} />
                  <span>{menu.label}</span>
                </div>
                {active && <ChevronRight className="w-4 h-4 animate-in fade-in slide-in-from-left-1" />}
              </a>
            );
          })}
        </nav>

        {/* FOOTER SIDEBAR */}
        <div className="p-6 border-t border-slate-50">
          <div className="p-4 bg-slate-50 rounded-2xl text-center">
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">JualMobilku</p>
             <p className="text-[10px] text-slate-300 mt-1 font-medium italic">v2.0.4-stable</p>
          </div>
        </div>
      </aside>
    </>
  );
}