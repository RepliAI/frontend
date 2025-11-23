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

  const token = (await cookies()).get("access_token")?.value;
  if (!token) notFound();

  const res = await fetch(`${process.env.BACKEND_URL}/tickets/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!res.ok) notFound();

  const ticket = await res.json();

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-6">
      <h1 className="text-2xl font-semibold">{ticket.subject}</h1>

      <MessageList messages={ticket.messages ?? []} />

      <Actions id={id} />
    </div>
  );
}