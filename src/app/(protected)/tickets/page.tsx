import { cookies } from "next/headers";

export default async function TicketsPage() {
  const token = (await cookies()).get("access_token")?.value;

  const res = await fetch(`${process.env.BACKEND_URL}/tickets`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  const tickets = await res.json();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Vos tickets</h1>

      <div className="space-y-4">
        {tickets.map((ticket: any) => (
          <a
            key={ticket.id}
            href={`/tickets/${ticket.id}`}
            className="block bg-white shadow-sm rounded-xl p-4 border hover:bg-gray-50"
          >
            <div className="flex justify-between">
              <p className="font-semibold">{ticket.subject}</p>

              <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 uppercase">
                {ticket.status}
              </span>
            </div>

            <p className="text-xs text-gray-500 mt-1">
              Créé le {new Date(ticket.createdAt).toLocaleString("fr-FR")}
            </p>

            <p className="text-sm mt-3 text-gray-700 line-clamp-2">
              {ticket.messages[0]?.content ?? "—"}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}