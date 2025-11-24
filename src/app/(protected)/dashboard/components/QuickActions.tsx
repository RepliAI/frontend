"use client";

import Link from "next/link";
import { PlusCircle, Ticket } from "lucide-react";

export default function QuickActions() {
  return (
    <div className="flex gap-4 mt-6">
      <Link
        href="/tickets/new"
        className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-900 transition"
      >
        <PlusCircle size={18} />
        Nouveau ticket
      </Link>

      <Link
        href="/tickets"
        className="flex items-center gap-2 bg-white border px-4 py-2 rounded-xl hover:bg-gray-50 transition"
      >
        <Ticket size={18} />
        Voir tous les tickets
      </Link>
    </div>
  );
}
