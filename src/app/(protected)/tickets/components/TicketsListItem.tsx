import Link from "next/link";
import { StatusBadge } from "./StatusBadge";

export function TicketListItem({ ticket }: { ticket: any }) {
  return (
    <Link
      href={`/tickets/${ticket.id}`}
      className="block border rounded-xl p-4 hover:bg-gray-50 transition cursor-pointer"
    >
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-lg">{ticket.subject}</h2>
        <StatusBadge status={ticket.status} />
      </div>

      <p className="text-sm text-gray-500 mt-1">
        Créé le {new Date(ticket.createdAt).toLocaleString("fr-FR")}
      </p>

      <p className="text-sm text-gray-600 mt-3 line-clamp-2">
        {ticket.messages?.[ticket.messages.length - 1]?.content ?? "Aucun message"}
      </p>
    </Link>
  );
}
