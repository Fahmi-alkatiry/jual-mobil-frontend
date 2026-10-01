"use client";

import React, { useEffect } from "react";
let usePathname: () => string;
try {
  usePathname = require("next/navigation").usePathname;
} catch (e) {
  usePathname = () => (typeof window !== "undefined" ? window.location.pathname : "");
}
import { LayoutDashboard, Car, ChevronRight, X, PanelLeftClose, PanelLeft } from "lucide-react";
import { cn } from "../../lib/utils";
import { useSidebar } from "../../context/SidebarContext";

const menus = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Mobil Dibeli", href: "/admin/purchased-cars", icon: Car },
];

export default function Sidebar() {
  const pathname = usePathname() || "";
  const { isOpen, isCollapsed, closeSidebar, toggleCollapsed } = useSidebar();

  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 768) closeSidebar(); };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [closeSidebar]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed left-0 right-0 bottom-0 top-14 sm:top-16 bg-slate-900/50 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      <aside
        aria-hidden={!isOpen ? true : undefined}
        className={cn(
          "fixed inset-x-0 top-14 sm:top-16 z-50 bg-white border-b border-slate-200 shadow-xl flex flex-col rounded-b-2xl max-h-[calc(100dvh-3.5rem)] sm:max-h-[calc(100dvh-4rem)] overflow-hidden transition-transform duration-200 ease-out overscroll-contain",
          "md:sticky md:top-16 md:inset-x-auto md:rounded-none md:shadow-none md:border-b-0 md:border-r md:max-h-none md:h-[calc(100dvh-4rem)] md:translate-y-0 md:overflow-visible",
          isCollapsed ? "md:w-[72px]" : "md:w-64",
          isOpen ? "translate-y-0" : "-translate-y-full md:translate-y-0 pointer-events-none md:pointer-events-auto hidden"
        )}
      >
        <div className={cn("h-14 sm:h-16 flex items-center border-b border-slate-100 shrink-0", isCollapsed ? "justify-center px-2 md:px-0" : "justify-between px-4 sm:px-6")}>
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-100 shrink-0">
              <Car className="w-5 h-5 text-white" />
            </div>
            {!isCollapsed && <h1 className="text-[15px] sm:text-lg font-black tracking-tight text-slate-900 truncate">Admin Panel</h1>}
          </div>
          <div className="flex items-center gap-1">
            <button onClick={toggleCollapsed} className="hidden md:inline-flex p-2 min-w-[44px] min-h-[44px] items-center justify-center rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-50" aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}>
              {isCollapsed ? <PanelLeft className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
            </button>
            <button onClick={closeSidebar} className="md:hidden p-2 min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-xl text-slate-400 hover:text-slate-600" aria-label="Tutup Sidebar">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <nav className="flex-1 p-2 sm:p-4 space-y-1 overflow-y-auto overscroll-contain">
          {menus.map((menu) => {
            const active = pathname.startsWith(menu.href);
            const Icon = menu.icon;
            return (
              <a
                key={menu.href}
                href={menu.href}
                onClick={closeSidebar}
                aria-current={active ? "page" : undefined}
                title={isCollapsed ? menu.label : undefined}
                className={cn(
                  "flex items-center rounded-xl text-sm font-bold transition-colors min-h-[44px] group",
                  isCollapsed ? "justify-center px-2 py-2.5" : "justify-between px-4 py-3",
                  active ? "bg-blue-50 text-blue-600 shadow-sm" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <span className={cn("flex items-center", isCollapsed ? "" : "gap-3")}>
                  <Icon className={cn("w-5 h-5 shrink-0", active ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600")} />
                  {!isCollapsed && <span>{menu.label}</span>}
                </span>
                {!isCollapsed && active && <ChevronRight className="w-4 h-4 shrink-0" />}
              </a>
            );
          })}
        </nav>

        <div className={cn("border-t border-slate-50 shrink-0", isCollapsed ? "p-2" : "p-4 sm:p-6")}>
          <div className={cn("bg-slate-50 rounded-2xl text-center", isCollapsed ? "p-2" : "p-4")}>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none truncate">{isCollapsed ? "PAM" : "Putra Aditya Motor"}</p>
            {!isCollapsed && <p className="text-[10px] text-slate-300 mt-1 font-medium italic">v2.0.4-stable</p>}
          </div>
        </div>
      </aside>
    </>
  );
}
