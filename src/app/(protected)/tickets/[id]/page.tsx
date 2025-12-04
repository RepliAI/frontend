import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { Ticket } from "lucide-react";

import { PageHeader } from "@/components/pageHeader";

import { Actions } from "../components/Actions";
import { MessageTimeline } from "./components/MessageTimeline";
import { TicketStatusActions } from "../components/TicketStatusAction";
import { TicketStatusBadge } from "./components/TicketStatusBadge";


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
		return <div className="p-6 text-gray-600">Ticket introuvable.</div>;
	}

	const ticket = await res.json();

	return (
		<div className="max-w-4xl mx-auto p-6 space-y-8">
			<PageHeader icon={<Ticket size={18} />} title={ticket.subject} subtitle={`Ticket créé le ${new Date(ticket.createdAt).toLocaleDateString("fr-FR")}`}/>
			<div className="bg-white border rounded-xl shadow-sm p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
				<TicketStatusBadge initialStatus={ticket.status} />
				<TicketStatusActions id={id} currentStatus={ticket.status} />
			</div>
			<div className="bg-white border rounded-xl shadow-sm p-6">
				<h2 className="text-lg font-semibold mb-4">Historique des échanges</h2>
				<MessageTimeline messages={ticket.messages} />
			</div>
			<div className="bg-white border rounded-xl shadow-sm p-6">
				<Actions id={id} />
			</div>
		</div>
	);
}