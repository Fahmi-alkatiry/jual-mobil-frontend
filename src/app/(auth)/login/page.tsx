"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Lock } from "lucide-react";
import { api } from "@/lib/api";

export default function AdminLoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // 🔐 Cek apakah admin sudah login
  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) return;

    const checkLogin = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          router.replace("/admin/dashboard");
        } else {
          localStorage.removeItem("admin_token");
        }
      } catch {
        localStorage.removeItem("admin_token");
      }
    };

    checkLogin();
  }, [router]);

  // 🔑 Handle login
 const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    // URL dasar sudah diatur otomatis di instance api
    const res = await api.post("/auth/login", formData);

    if (res.data.success) {
      localStorage.setItem("admin_token", res.data.token);
      toast.success("Login Berhasil", {
        description: "Selamat datang kembali, Admin.",
      });
      router.replace("/admin/dashboard");
    }
  } catch (error: any) {
    toast.error("Login Gagal", {
      description: error.response?.data?.message || "Gagal terhubung ke server.",
    });
  } finally {
    setIsLoading(false);
  }
};
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <Card className="w-full max-w-md shadow-lg border-t-4 border-t-primary">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-2">
            <div className="p-3 bg-primary/10 rounded-full">
              <Lock className="w-6 h-6 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">
            Admin Login
          </CardTitle>
          <CardDescription>
            Masukkan kredensial Anda untuk mengelola dashboard
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="admin"
                required
                value={formData.username}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    username: e.target.value,
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password: e.target.value,
                  })
                }
              />
            </div>

            <Button
              type="submit"
              className="w-full h-11 font-bold"
              disabled={isLoading}
            >
              {isLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Masuk
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
