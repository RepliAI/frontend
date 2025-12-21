"use client";

import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { LogOut, ChevronLeft, Mail } from "lucide-react";

import { useSidebar } from "@/context/SidebarContext";
import { useGmailStatus } from "@/hooks/useGmailStatus";
import { nav } from "@/utils/constants";

export function Sidebar() {
  const pathname = usePathname();
  const { collapsed, toggle } = useSidebar();
  const { loading, connected } = useGmailStatus();

  return (
    <aside className={clsx("h-screen border-r bg-white fixed left-0 top-0 p-4 flex flex-col justify-between transition-all duration-300 z-40", collapsed ? "w-16" : "w-64")}>
      <button onClick={toggle} className="absolute -right-3 top-6 w-7 h-7 rounded-full bg-white border shadow-sm flex items-center justify-center hover:shadow-md transition">
        <ChevronLeft className={clsx("w-4 text-gray-500 transition-transform", collapsed && "rotate-180")}/>
      </button>
      <div className={clsx("flex items-center mt-2 mb-6 transition-all duration-300", collapsed ? "justify-center" : "gap-3 px-2")}>
        <div className="w-8 h-8 flex items-center justify-center rounded-xl bg-blue-600 text-white font-semibold">
          R
        </div>
        {!collapsed && (
          <span className="text-lg font-semibold text-gray-800">ReplyAI</span>
        )}
      </div>
      <nav className="space-y-1">
        {nav.map((item) => {
          const Icon = item.icon;
          const active = pathname.startsWith(item.href);

          return (
            <Link key={item.href} href={item.href} className={clsx( "flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap", active ? "bg-blue-50 text-blue-700 shadow-sm" : "text-gray-600 hover:bg-gray-100", collapsed && "justify-center")}>
              	<Icon size={collapsed ? 22 : 18} className="shrink-0"/>
              	{!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {!loading && !connected && (
        <div className={clsx("mt-4 p-3 rounded-xl border text-sm font-medium transition shadow-sm cursor-pointer", "bg-red-50 border-red-200 text-red-700", collapsed && "flex justify-center p-2")}>
          	<Link href="/settings" className={clsx("flex items-center gap-2", collapsed && "justify-center")}>
         		<Mail size={collapsed ? 20 : 18} className="text-red-600" />
            	{!collapsed && <span>Gmail non connecté</span>}
          	</Link>
        	</div>
      )}
      <form action="/api/auth/logout" method="POST">
        <button className={clsx("flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium w-full text-red-600 hover:bg-red-50 transition", collapsed && "justify-center")}>
          <LogOut size={collapsed ? 20 : 18} className="shrink-0" />
          {!collapsed && "Déconnexion"}
        </button>
      </form>
    </aside>
  );
}