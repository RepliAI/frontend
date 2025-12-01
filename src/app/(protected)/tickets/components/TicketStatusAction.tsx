"use client";

import { useEffect, useState } from "react";

const LABELS: any = {
  OPEN: "Ouvert",
  PENDING: "En attente",
  RESOLVED: "Résolu",
};

export function TicketStatusActions({
  id,
  currentStatus,
}: {
  id: string;
  currentStatus: string;
}) {
  const [status, setStatus] = useState(currentStatus);

  useEffect(() => {
    const handler = (e: any) => {
      setStatus(e.detail);
    };
  
    window.addEventListener("ticket-status-changed", handler);
    return () => window.removeEventListener("ticket-status-changed", handler);
  }, [])

  const updateStatus = async (newStatus: string) => {
    setStatus(newStatus);

    const res = await fetch(`/api/tickets/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    });

    if (res.ok) {
        window.dispatchEvent(
          new CustomEvent("ticket-status-changed", { detail: newStatus })
        );
    }
  }

  return (
    <select
      className="bg-white border border-gray-300 text-sm rounded-md px-2 py-1 focus:ring-2 focus:ring-black"
      value={status}
      onChange={(e) => updateStatus(e.target.value)}
    >
      <option value="OPEN">{LABELS.OPEN}</option>
      <option value="PENDING">{LABELS.PENDING}</option>
      <option value="RESOLVED">{LABELS.RESOLVED}</option>
    </select>
  );
}
