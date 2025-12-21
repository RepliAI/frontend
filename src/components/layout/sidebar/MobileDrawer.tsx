"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export function MobileDrawer({
  open,
  onClose,
  navItems,
}: {
  open: boolean;
  onClose: () => void;
  navItems: NavItem[];
}) {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.aside
            className="fixed inset-y-0 left-0 w-64 bg-white z-50 shadow-lg p-4 md:hidden flex flex-col justify-between"
            initial={{ x: -260 }}
            animate={{ x: 0 }}
            exit={{ x: -260 }}
            transition={{ type: "tween", duration: 0.25 }}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-semibold text-lg">ReplyAI</span>
                <button
                  onClick={onClose}
                  className="p-2 rounded-md hover:bg-gray-100"
                >
                  <X size={20} />
                </button>
              </div>

              <nav className="space-y-1 mt-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = pathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className={`
                        flex items-center gap-3 px-3 py-2 rounded-md text-[15px] font-medium
                        transition-all duration-150
                        ${active ? "bg-black text-white" : "text-gray-700 hover:bg-gray-100"}
                      `}
                    >
                      <Icon size={18} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <form action="/api/auth/logout" method="POST" className="mt-4">
              <button
                className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium w-full 
                text-red-600 hover:bg-red-50 transition"
              >
                <LogOut size={18} />
                Déconnexion
              </button>
            </form>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}