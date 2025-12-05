"use client";

import { Menu } from "lucide-react";

export function SidebarButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="md:hidden p-2 rounded-md border border-gray-200 hover:bg-gray-100 transition"
      aria-label="Ouvrir le menu"
    >
      <Menu size={18} />
    </button>
  );
}