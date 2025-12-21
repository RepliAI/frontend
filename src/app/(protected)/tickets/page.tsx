'use client'

import { Download, Ticket } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { TicketFilters } from "@/components/modules/tickets/TicketsFilter";
import { TicketList } from "@/components/modules/tickets/TicketList";
import { Pagination } from "@/components/modules/tickets/Pagination";
import { PageHeader } from "@/components/layout/pageHeader";
import { ticketService } from "@/services/tickets.service";
import { gmailService } from "@/services/gmail.service";
import { useGmailStatus } from "@/hooks/useGmailStatus";
import { useTicketUpdates } from "@/hooks/useTicketUpdates";
import { TicketListResponse } from "@/types";


export default function TicketsPage() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<TicketListResponse>();
	const [importLoading, setImportLoading] = useState(false);
	const { loading: gmailLoading, connected } = useGmailStatus();

	const handleGetTickets = async () => {
		const filters = Object.fromEntries(searchParams.entries());
		const tickets = await ticketService.getTickets(filters);
		setData(tickets);
		return tickets;
	}

	useTicketUpdates((eventData) => {
		const filters = Object.fromEntries(searchParams.entries());
		ticketService.getTickets(filters).then(setData);
	}, (ticketId, isRisky) => {
		const filters = Object.fromEntries(searchParams.entries());
		ticketService.getTickets(filters).then(setData);
	});

	const handleManualImport = async () => {
		setImportLoading(true);
		try {
			await gmailService.importEmails();
			await handleGetTickets();
			router.refresh();
		} catch (error) {
			console.error('Error importing emails:', error);
		} finally {
			setImportLoading(false);
		}
	}

	useEffect(() => {
		setLoading(true);
		try {
			handleGetTickets();
		} finally {
			setLoading(false);
		}
	}, [searchParams]);

	if (loading || !data || gmailLoading) return <div>Chargement...</div>;

	return (
		<div className="space-y-6 p-6">
			<div className="mb-8 flex items-start justify-between">
				<PageHeader icon={<Ticket size={18} />} title="Tickets" subtitle="Consultez vos tickets" />
				{connected && (
					<button 
						onClick={handleManualImport}
						disabled={importLoading}
						className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-800 transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
					>
						<Download size={16} className={importLoading ? "animate-spin" : ""} />
						{importLoading ? "Import en cours..." : "Importer les emails"}
					</button>
				)}
			</div>
			<TicketFilters />
			<TicketList tickets={data.items} />
			<Pagination total={data.total} page={data.page} pageSize={data.pageSize} />
		</div>
	);
}