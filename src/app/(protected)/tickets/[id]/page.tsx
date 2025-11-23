import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { MessageList } from "./components/MessageList";
import { Actions } from "../components/Actions";

export const revalidate = 0;

export default async function TicketDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) {
    notFound();
  }

  const res = await fetch(`${process.env.BACKEND_URL}/tickets/${id}`, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    if (res.status === 404) {
      notFound();
    }

    return (
      <div className="max-w-3xl mx-auto py-10">
        <p className="text-sm text-red-600">
          Impossible de charger ce ticket (code {res.status}).
        </p>
      </div>
    );
  }

  const ticket = await res.json();

  return (
    <div className="max-w-3xl mx-auto py-10 flex flex-col gap-6 h-[calc(100vh-80px)]">
      <header className="border-b pb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{ticket.subject}</h1>
          <p className="text-xs text-gray-500 mt-1">
            Créé le{" "}
            {new Date(ticket.createdAt).toLocaleString("fr-FR")}
          </p>
        </div>

        <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 uppercase tracking-wide">
          {ticket.status}
        </span>
      </header>

      <main className="flex flex-col gap-4 flex-1 min-h-0">
        <MessageList messages={ticket.messages ?? []} />

        <Actions id={id} />
      </main>
    </div>
  );
}
