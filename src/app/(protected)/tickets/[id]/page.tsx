import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { MessageBubble } from "../components/MessageBubble";
import { Actions } from "../components/Actions";

export const revalidate = 0;

export default async function TicketDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params;

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) notFound();

  const res = await fetch(`${process.env.BACKEND_URL}/tickets/${id}`, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    return <div className="p-4">Ticket introuvable.</div>;
  }

  const ticket = await res.json();

  return (
    <div className="max-w-3xl mx-auto py-10 space-y-8">
      <h1 className="text-2xl font-semibold">{ticket.subject}</h1>

      <div className="space-y-4">
        {ticket.messages.map((m: any) => (
          <MessageBubble key={m.id} message={m} />
        ))}
      </div>

      <Actions id={id} />
    </div>
  );
}