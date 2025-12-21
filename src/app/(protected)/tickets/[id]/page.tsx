"use client";

import { useEffect, useState } from "react";
import { Ticket, AlertTriangle } from "lucide-react";
import { useParams } from "next/navigation";

import { ticketService } from "@/services/tickets.service";
import { PageHeader } from "@/components/layout/pageHeader";
import { TicketStatusBadge } from "@/components/modules/tickets/detail/TicketStatusBadge";
import { TicketStatusActions } from "@/components/modules/tickets/detail/TicketStatusAction";
import { MessageTimeline } from "@/components/modules/tickets/detail/MessageTimeline";
import { Actions } from "@/components/modules/tickets/detail/Actions";
import { Ticket as TicketDetailResponse } from "@/types";

export default function TicketDetailPage() {
	const params = useParams();
	const id = params.id as string;

	const [ticket, setTicket] = useState<TicketDetailResponse | null>(null);
	const [loading, setLoading] = useState(true);

	const handleGetTicket = async () => {
		try {
			const data = await ticketService.getTicketById(id);
			setTicket(data);
		} catch (e) {
			setTicket(null);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		handleGetTicket();
	}, [id]);

	useEffect(() => {
		const handler = () => handleGetTicket();
		window.addEventListener("messages-updated", handler);
		return () => window.removeEventListener("messages-updated", handler);
	  }, []);

	if (loading) return <div className="p-6">Chargement…</div>;
	if (!ticket) return <div className="p-6">Ticket introuvable.</div>;

	const hasRiskyMessages = ticket.messages?.some((msg) => msg.isRisky) ?? false;

	return (
		<div className="max-w-4xl mx-auto p-6 space-y-8">
			<PageHeader icon={<Ticket size={18} />} title={ticket.subject} subtitle={`Ticket créé le ${new Date(ticket.createdAt).toLocaleDateString("fr-FR")}`} />
			<div className="bg-white border rounded-xl shadow-sm p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
				<div className="flex items-center gap-3 flex-wrap">
					<TicketStatusBadge initialStatus={ticket.status} />
					{hasRiskyMessages && (
						<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-700 border-2 border-red-400 shadow-sm">
							<AlertTriangle size={14} className="text-red-600" />
							Ticket à risque
						</span>
					)}
				</div>
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