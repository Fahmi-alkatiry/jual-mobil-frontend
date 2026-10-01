"use client";

import React from "react";
import { LogOut, UserCircle, Bell, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/context/SidebarContext";

export default function AdminHeader() {
  const { toggleSidebar, isOpen } = useSidebar();
  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("admin_token");
      window.location.href = "/admin/login";
    }
  };
  return (
    <header className="h-14 sm:h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between gap-2 px-3 sm:px-4 md:px-6 lg:px-8 sticky top-0 z-40 shrink-0 w-full">
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <Button variant="ghost" size="icon" className="md:hidden shrink-0 min-w-[44px] min-h-[44px] text-slate-600" onClick={toggleSidebar} aria-label={isOpen ? "Tutup menu" : "Buka menu"} aria-expanded={isOpen}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
        <div className="flex flex-col min-w-0">
          <p className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-widest truncate">Panel Manajemen</p>
          <p className="text-xs sm:text-sm font-black text-slate-900 truncate">Selamat Datang, Admin</p>
        </div>
      </div>
      <div className="flex items-center gap-1 sm:gap-3 md:gap-6 shrink-0">
        <button className="p-2 min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-xl text-slate-400 hover:text-blue-600 hover:bg-slate-50 relative" aria-label="Notifikasi">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white shadow-sm" />
        </button>
        <div className="h-8 w-[1px] bg-slate-100 hidden md:block" />
        <a href="/admin/profile" className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity min-w-0">
          <div className="text-right hidden lg:block min-w-0">
            <p className="text-xs font-black text-slate-900 leading-none truncate">Super Administrator</p>
            <p className="text-[10px] text-slate-400 font-bold mt-1 tracking-tighter truncate">admin@putraadityamotor.id</p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 shadow-sm shrink-0">
            <UserCircle className="w-6 h-6" />
          </div>
        </a>
        <Button size="sm" variant="ghost" onClick={logout} className="rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 font-bold text-xs min-h-[44px] min-w-[44px] sm:min-w-0 px-2 sm:px-3" aria-label="Keluar">
          <LogOut className="w-4 h-4 sm:mr-2" />
          <span className="hidden sm:inline font-black">KELUAR</span>
        </Button>
      </div>
    </header>
  );
}
