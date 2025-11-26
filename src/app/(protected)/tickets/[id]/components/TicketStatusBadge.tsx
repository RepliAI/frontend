"use client";

import { useState, useEffect } from "react";

export function TicketStatusBadge({ initialStatus }: { initialStatus: string }) {
  const [status, setStatus] = useState(initialStatus);

  useEffect(() => {
    const handler = (e: any) => {
      setStatus(e.detail);
    };

    window.addEventListener("ticket-status-changed", handler);
    return () => window.removeEventListener("ticket-status-changed", handler);
  }, []);

  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
      Statut : {status}
    </span>
  );
}