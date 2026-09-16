"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "./nav-links";

export default function HeaderClient() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Actions */}
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

      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-[60] transition-opacity md:hidden",
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setOpen(false)}
      />

      {/* Mobile Menu */}
      <aside
        className={cn(
          "fixed top-0 right-0 z-[70] h-full w-[80%] max-w-sm bg-card shadow-2xl transition-all md:hidden",
          open ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 invisible pointer-events-none hidden"
        )}
      >
        <div className="flex justify-between items-center m-5 mb-0 border-b-2 pb-3">
          <span className="font-black text-lg">Menu</span>
          <button onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>

        <nav className="flex flex-col gap-1 bg-card w-full">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-100 font-bold border-b border-slate-300 text-slate-700 transition-colors"
            >
              {link.name}
              <ChevronRight className="w-4 h-4 text-slate-300" />
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
