"use client";

import { TicketCard } from "./TicketCard";

export function TicketList({ tickets }: { tickets: any[] }) {
  if (!tickets || tickets.length === 0) {
    return (
      <div className="text-gray-500 text-center py-10">
        Aucun ticket trouvé.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {tickets.map((t) => (
        <TicketCard key={t.id} ticket={t} />
      ))}
    </div>
  );
}
