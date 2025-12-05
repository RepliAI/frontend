'use client'

import { TicketFilters } from "../../../components/modules/tickets/TicketsFilter";
import { TicketList } from "../../../components/modules/tickets/TicketList";
import { Pagination } from "../../../components/modules/tickets/Pagination";
import { PageHeader } from "@/components/layout/pageHeader";
import { Ticket } from "lucide-react";
import { useEffect, useState } from "react";
import { ticketService } from "@/services/tickets.service";
import { TicketListResponse } from "@/types";


export default function TicketsPage() {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<TicketListResponse>();

	const handleGetTickets = async () => {
		const tickets = await ticketService.getTickets();
		setData(tickets);
		return tickets;
	}
	useEffect(() => {
		try {
			handleGetTickets();
		} finally {
			setLoading(false);
		}
	}, []);

	if (loading || !data) return <div>Chargement...</div>;

	return (
		<div className="space-y-6 p-6">
			<PageHeader icon={<Ticket size={18} />} title="Tickets" subtitle="Consultez vos tickets" />
			<TicketFilters />
			<TicketList tickets={data.items} />
			<Pagination total={data.total} page={data.page} pageSize={data.pageSize} />
		</div>
	);
}