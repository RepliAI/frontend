import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { Actions } from "../components/Actions";
import { MessageTimeline } from "./components/MessageTimeline";

export const revalidate = 0;

export default async function TicketDetailPage(props: any) {
  const { params } = props;
  const resolvedParams = await params;
  const id = resolvedParams.id;

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
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">{ticket.subject}</h1>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
          Statut : {ticket.status}
        </span>
      </div>

      <div className="space-y-4">
        <MessageTimeline messages={ticket.messages} />
      </div>

      <Actions id={id} />
    </div>
  );
}
