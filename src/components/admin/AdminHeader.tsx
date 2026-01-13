"use client";

import React from "react";
import { LogOut, UserCircle, Bell, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
// Menggunakan jalur relatif untuk menghindari masalah resolusi alias
import { useSidebar } from "@/context/SidebarContext";

export default function AdminHeader() {
  const { toggleSidebar, isOpen } = useSidebar();

  /**
   * Fungsi Logout
   * Membersihkan token dan mengarahkan ke halaman login
   */
  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("admin_token");
      window.location.href = "/admin/login";
    }
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 sticky top-0 z-20">
      <div className="flex items-center gap-4">
        {/* Tombol Hamburger Mobile */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden text-slate-600" 
          onClick={toggleSidebar}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>

        {/* BREADCRUMB / GREETING */}
        <div className="hidden sm:flex flex-col">
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
            Panel Manajemen
          </p>
          <p className="text-sm font-black text-slate-900">
            Selamat Datang, Admin
          </p>
        </div>
      </div>

      {/* ACTIONS & PROFILE */}
      <div className="flex items-center gap-3 md:gap-6">
        {/* Notifikasi */}
        <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors relative">
           <Bell className="w-5 h-5" />
           <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white shadow-sm" />
        </button>

        <div className="h-8 w-[1px] bg-slate-100 hidden md:block" />

        {/* Profil Admin menggunakan tag <a> untuk stabilitas kompilasi */}
        <a href="/admin/profile" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="text-right hidden md:block">
            <p className="text-xs font-black text-slate-900 leading-none">Super Administrator</p>
            <p className="text-[10px] text-slate-400 font-bold mt-1 tracking-tighter">
              admin@jualmobilku.id
            </p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 shadow-sm">
            <UserCircle className="w-6 h-6" />
          </div>
        </a>

        {/* Tombol Logout */}
        <Button
          size="sm"
          variant="ghost"
          onClick={logout}
          className="rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 font-bold text-xs"
        >
          <LogOut className="w-4 h-4 md:mr-2" />
          <span className="hidden md:inline font-black">KELUAR</span>
        </Button>
      </div>
    </header>
  );
}