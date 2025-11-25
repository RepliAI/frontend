"use client";

import Link from "next/link";
import { StatusBadge } from "./StatusBadge";

interface Props {
  ticket: any;
}

export function TicketCard({ ticket }: Props) {
  const lastMessage =
    ticket.messages && ticket.messages.length > 0
      ? ticket.messages[ticket.messages.length - 1].content
      : "Aucun message";

  return (
    <Link
      href={`/tickets/${ticket.id}`}
      className="block bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition cursor-pointer"
    >
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-semibold">{ticket.subject}</h2>
        <StatusBadge status={ticket.status} />
      </div>

      <p className="text-sm text-gray-500 line-clamp-2 mb-3">
        {lastMessage}
      </p>

      <p className="text-xs text-gray-400">
        {new Date(ticket.createdAt).toLocaleDateString("fr-FR", {
          day: "2-digit",
          month: "2-digit",
        })}
      </p>
    </Link>
  );
}
