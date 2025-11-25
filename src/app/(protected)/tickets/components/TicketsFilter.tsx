"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export function TicketFilters() {
  const router = useRouter();
  const params = useSearchParams();

  const [status, setStatus] = useState(params.get("status") || "");
  const [search, setSearch] = useState(params.get("search") || "");

  useEffect(() => {
    const nextStatus = params.get("status") || "";
    const nextSearch = params.get("search") || "";

    if (nextStatus !== status) setStatus(nextStatus);
    if (nextSearch !== search) setSearch(nextSearch);
  }, [params]);

  function applyFilters(nextStatus = status, nextSearch = search) {
    const query = new URLSearchParams();

    if (nextStatus) query.set("status", nextStatus);
    if (nextSearch) query.set("search", nextSearch);

    router.push("/tickets?" + query.toString());
  }

  return (
    <div className="flex items-center gap-4 bg-white border rounded-xl p-4 shadow-sm">

      <select
        className="border rounded-lg px-3 py-2"
        value={status}
        onChange={(e) => {
          const newStatus = e.target.value;
          setStatus(newStatus);
          applyFilters(newStatus, search);
        }}
      >
        <option value="">Tous les statuts</option>
        <option value="OPEN">Ouverts</option>
        <option value="PENDING">En attente</option>
        <option value="RESOLVED">Résolus</option>
      </select>

      <input
            className="border rounded-lg px-3 py-2 flex-1"
            placeholder="Rechercher…"
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearch(e.target.value)
            }
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter") {
                applyFilters(status, (e.target as HTMLInputElement).value);
                }
            }}
        />


      <button
        onClick={() => applyFilters(status, search)}
        className="bg-black text-white px-4 py-2 rounded-lg"
      >
        Filtrer
      </button>
    </div>
  );
}
