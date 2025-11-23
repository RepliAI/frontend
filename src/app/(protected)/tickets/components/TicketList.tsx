import { TicketListItem } from "./TicketsListItem";

export function TicketList({ tickets }: { tickets: any[] }) {
  if (tickets.length === 0) {
    return <p className="text-gray-500">Aucun ticket pour le moment.</p>;
  }

  return (
    <div className="space-y-4">
      {tickets.map(ticket => (
        <TicketListItem key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
}