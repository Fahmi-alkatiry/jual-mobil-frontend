"use client";

import React, { useState, useEffect } from "react";
import { 
  User, 
  Mail, 
  Phone, 
  ShieldCheck, 
  Camera, 
  Save, 
  Lock,
  KeyRound,
  CheckCircle2,
  AlertCircle,
  Smartphone,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { api } from "@/lib/api";

export default function AdminProfilePage() {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // State untuk form profil yang disinkronkan dengan skema database baru
  const [profileData, setProfileData] = useState({
    username: "",
    fullName: "Administrator", // Default display name
    email: "",
    admin_wa: "",
    wa_device_id: "",
    role: "Super Admin"
  });

  // Ambil data profil saat komponen dimuat
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/auth/me");
        if (res.data.success) {
          const data = res.data.data;
          setProfileData({
            username: data.username || "",
            fullName: data.fullName || data.username || "Administrator",
            email: data.email || "",
            admin_wa: data.admin_wa || "",
            wa_device_id: data.wa_device_id || "",
            role: "Super Admin"
          });
        }
      } catch (error) {
        console.error("Gagal mengambil profil:", error);
      } finally {
        setFetching(false);
      }
    };
    fetchProfile();
  }, []);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Endpoint simulasi untuk update profil
      const res = await api.patch("/auth/update-profile", profileData);
      if (res.data.success) {
        toast.success("Profil dan konfigurasi WhatsApp berhasil diperbarui!");
      }
    } catch (error) {
      toast.error("Gagal memperbarui profil. Pastikan server berjalan.");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Permintaan ubah kata sandi telah dikirim ke email Anda.");
  };

  if (fetching) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
        <p className="text-slate-400 font-bold text-sm tracking-widest uppercase">Sinkronisasi Data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-10">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Profil & Pengaturan</h1>
          <p className="text-slate-500 font-medium">Kelola informasi akun dan integrasi sistem WhatsApp Anda.</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest bg-white px-4 py-2 rounded-full border border-slate-100 shadow-sm">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          Status Akun: Terverifikasi
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: AVATAR & QUICK INFO */}
        <div className="space-y-6">
          <Card className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-white">
            <CardContent className="p-8 flex flex-col items-center text-center">
              <div className="relative group">
                <div className="w-32 h-32 rounded-[2rem] bg-blue-600 flex items-center justify-center text-white text-5xl font-black shadow-2xl shadow-blue-200 transition-transform group-hover:scale-105 duration-500">
                  {profileData.username.charAt(0).toUpperCase()}
                </div>
                <button className="absolute -bottom-2 -right-2 p-3 bg-white rounded-2xl shadow-lg border border-slate-100 text-blue-600 hover:text-blue-700 transition-all">
                  <Camera className="w-5 h-5" />
                </button>
              </div>
              
              <div className="mt-6 space-y-1">
                <h2 className="text-xl font-black text-slate-900">@{profileData.username}</h2>
                <Badge className="bg-blue-50 text-blue-600 border-none font-bold uppercase text-[10px] tracking-widest mt-1">
                  {profileData.role}
                </Badge>
              </div>

              <div className="w-full mt-8 pt-8 border-t border-slate-50 space-y-4">
                <div className="flex items-center gap-3 text-left">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[10px] font-black text-slate-300 uppercase">Email Resmi</p>
                    <p className="text-sm font-bold text-slate-600 truncate">{profileData.email || "-"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-left">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-300 uppercase">Device ID WA</p>
                    <p className="text-sm font-bold text-slate-600">{profileData.wa_device_id || "-"}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="p-6 bg-blue-50 rounded-[2rem] border border-blue-100 flex items-start gap-4">
            <AlertCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
            <p className="text-xs text-blue-700 font-medium leading-relaxed">
              WA Device ID digunakan untuk menghubungkan sistem notifikasi otomatis ke perangkat WhatsApp Anda.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: FORMS */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* PERSONAL INFO & WA CONFIG FORM */}
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-white overflow-hidden">
            <CardHeader className="p-8 border-b border-slate-50">
              <CardTitle className="text-lg font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" /> Informasi Akun & Integrasi
              </CardTitle>
              <CardDescription className="text-slate-400 font-medium">Lengkapi data profil dan parameter WhatsApp API Anda.</CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Username Admin</label>
                    <Input 
                      value={profileData.username}
                      disabled
                      className="rounded-xl bg-slate-50 border-slate-100 h-11 font-bold text-slate-400 cursor-not-allowed"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Email Sistem</label>
                    <Input 
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      placeholder="contoh@jualmobilku.id"
                      className="rounded-xl border-slate-200 h-11 font-bold focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Nomor WhatsApp Admin</label>
                    <Input 
                      value={profileData.admin_wa}
                      onChange={(e) => setProfileData({...profileData, admin_wa: e.target.value})}
                      placeholder="628123456789"
                      className="rounded-xl border-slate-200 h-11 font-bold focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">WhatsApp Device ID</label>
                    <Input 
                      value={profileData.wa_device_id}
                      onChange={(e) => setProfileData({...profileData, wa_device_id: e.target.value})}
                      placeholder="Contoh: DEV-XXXXX"
                      className="rounded-xl border-slate-200 h-11 font-bold focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end pt-4">
                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 rounded-2xl px-8 h-12 font-black shadow-lg shadow-blue-100 transition-all"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                    SIMPAN KONFIGURASI
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* SECURITY FORM */}
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-white overflow-hidden">
            <CardHeader className="p-8 border-b border-slate-50">
              <CardTitle className="text-lg font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
                <Lock className="w-5 h-5 text-rose-500" /> Keamanan Akun
              </CardTitle>
              <CardDescription className="text-slate-400 font-medium">Kelola akses keamanan kata sandi admin Anda.</CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-slate-400 shadow-sm">
                    <KeyRound className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900">Ubah Kata Sandi</h4>
                    <p className="text-xs text-slate-500 font-medium">Amankan akun Anda secara berkala</p>
                  </div>
                </div>
                <Button 
                  onClick={handleChangePassword}
                  variant="outline" 
                  className="rounded-xl font-bold border-slate-200 bg-white hover:bg-slate-50"
                >
                  Kirim Link Reset
                </Button>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 bg-emerald-50/50 rounded-3xl border border-emerald-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-emerald-500 shadow-sm">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900">Autentikasi Dua Faktor (2FA)</h4>
                    <p className="text-xs text-emerald-600 font-bold">Aktif melalui WhatsApp</p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  className="rounded-xl font-bold text-slate-400 hover:text-rose-600"
                >
                  Nonaktifkan
                </Button>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}

/**
 * Komponen Badge Sederhana
 */
function Badge({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-medium border", className)}>
      {children}
    </span>
  );
}