"use client";

import { Sidebar } from "../../components/layout/sidebar/Sidebar";
import { SidebarProvider, useSidebar } from "@/context/SidebarContext";
import { Toaster } from "react-hot-toast";
import { useNotifications } from "@/hooks/useNotifications";
import "@/app/globals.css";

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { collapsed } = useSidebar();
  useNotifications();

  return (
    <div className="flex h-screen w-full bg-[#F7F8FA]">
      <Sidebar />
      <main id="main-content" className={`flex-1 overflow-y-auto transition-all duration-300 ${collapsed ? "ml-16" : "ml-64"} px-10 py-10`}>
        <div className="max-w-6xl mx-auto space-y-10">
          {children}
        </div>
      </main>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 5000,
          style: {
            background: '#fff',
            color: '#363636',
          },
        }}
      />
    </div>
  );
}

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <LayoutContent>{children}</LayoutContent>
    </SidebarProvider>
  );
}