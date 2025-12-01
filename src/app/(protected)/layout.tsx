"use client";

import { Sidebar } from "./components/sidebard/Sidebar";
import { SidebarProvider, useSidebar } from "@/context/SidebarContext";
import "@/app/globals.css";

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { collapsed } = useSidebar();

  return (
    <div className="flex h-screen w-full bg-gray-50">
      <Sidebar />

      <main
        id="main-content"
        className={`flex-1 overflow-y-auto transition-all duration-300 
          ${collapsed ? "ml-16" : "ml-64"}
          px-6 md:px-10 py-6
        `}
      >
        {children}
      </main>
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
