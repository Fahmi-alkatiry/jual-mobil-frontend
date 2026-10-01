import Sidebar from "@/components/admin/Sidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { SidebarProvider } from "@/context/SidebarContext";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-[100dvh] bg-[#f8fafc] font-sans flex flex-col">
        <AdminHeader />
        <div className="flex flex-1 min-h-0">
          <Sidebar />
          <main className="flex-1 min-w-0 p-3 sm:p-4 md:p-6 lg:p-8 overflow-x-clip">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
