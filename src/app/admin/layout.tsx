import Sidebar from "@/components/admin/Sidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { SidebarProvider } from "@/context/SidebarContext";

/**
 * Komponen AdminLayout yang membungkus seluruh halaman admin.
 * Menggunakan SidebarProvider untuk mengelola status buka-tutup sidebar secara responsif.
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-[#f8fafc] font-sans">
        {/* SIDEBAR - Navigasi Samping yang bisa dibuka-tutup */}
        <Sidebar />

        {/* AREA UTAMA - Bagian konten di sisi kanan */}
        <div className="flex flex-col flex-1 min-w-0">
          {/* HEADER - Bagian atas yang berisi tombol toggle dan profil */}
          <AdminHeader />

          {/* PAGE CONTENT - Area render untuk halaman-halaman admin */}
          <main className="flex-1 p-4 md:p-8">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}