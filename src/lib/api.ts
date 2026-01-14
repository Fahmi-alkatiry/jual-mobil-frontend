import axios from "axios";

/**
 * Konfigurasi Dasar Axios
 * process.env.NEXT_PUBLIC_API_URL diambil dari file .env.local Anda
 */
export const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL || "https://api.jualmobilku.my.id/api",
  withCredentials: true,
});

/**
 * Request Interceptor
 * Berfungsi untuk "mencegat" setiap request keluar dan menempelkan token JWT
 */
api.interceptors.request.use(
  (config) => {
    // Pastikan kode hanya berjalan di sisi client (browser)
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("admin_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 * Berfungsi untuk menangani respon dari server secara global
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Jika server merespon dengan 401 (Unauthorized/Token Expired)
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("admin_token");
        // Gunakan window.location agar langsung memutus state yang ada
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);
