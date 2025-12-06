'use client'

import { Ticket } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { TicketFilters } from "@/components/modules/tickets/TicketsFilter";
import { TicketList } from "@/components/modules/tickets/TicketList";
import { Pagination } from "@/components/modules/tickets/Pagination";
import { PageHeader } from "@/components/layout/pageHeader";
import { ticketService } from "@/services/tickets.service";
import { TicketListResponse } from "@/types";


export default function TicketsPage() {
	const searchParams = useSearchParams();
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<TicketListResponse>();

	const handleGetTickets = async () => {
		const filters = Object.fromEntries(searchParams.entries());
		const tickets = await ticketService.getTickets(filters);
		setData(tickets);
		return tickets;
	}
	useEffect(() => {
		setLoading(true);
		try {
			handleGetTickets();
		} finally {
			setLoading(false);
		}
	}, [searchParams]);

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