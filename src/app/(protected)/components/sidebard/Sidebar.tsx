"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, Home, Ticket, User, ChevronLeft } from "lucide-react";
import { useSidebar } from "@/context/SidebarContext";
import clsx from "clsx";

export function Sidebar() {
  const pathname = usePathname();
  const { collapsed, toggle } = useSidebar();

  const nav = [
    { label: "Tableau de bord", href: "/dashboard", icon: Home },
    { label: "Tickets", href: "/tickets", icon: Ticket },
    { label: "Profil", href: "/profile", icon: User },
  ];

  return (
    <aside
      className={clsx(
        "h-screen border-r bg-white fixed left-0 top-0 p-4 flex flex-col justify-between transition-all duration-300 z-40",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Toggle button */}
      <button
        onClick={toggle}
        className="absolute -right-3 top-6 w-6 h-6 rounded-full bg-white border shadow flex items-center justify-center"
      >
        <ChevronLeft
          className={clsx(
            "w-4 transition-transform",
            collapsed && "rotate-180"
          )}
        />
      </button>

      {/* Navigation */}
      <nav className="space-y-2 mt-10">
        {nav.map((item) => {
          const Icon = item.icon;
          const active = pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition overflow-hidden",
                active
                  ? "bg-black text-white"
                  : "text-gray-700 hover:bg-gray-100",
                collapsed && "justify-center"
              )}
            >
              <Icon size={collapsed ? 20 : 18} className="shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Déconnexion */}
      <form action="/api/auth/logout" method="POST">
        <button
          className={clsx(
            "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium w-full text-red-600 hover:bg-red-50 transition",
            collapsed && "justify-center"
          )}
        >
          <LogOut size={collapsed ? 20 : 18} className="shrink-0" />
          {!collapsed && "Déconnexion"}
        </button>
      </form>
    </aside>
  );
}
