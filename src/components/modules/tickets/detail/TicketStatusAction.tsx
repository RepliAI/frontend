"use client";

import { ticketService } from "@/services/tickets.service";
import { useState } from "react";

const LABELS: any = {
	OPEN: "Ouvert",
	PENDING: "En attente",
	RESOLVED: "Résolu",
};
interface TicketStatusActionProps {
	id: string;
	currentStatus: string;
}

export function TicketStatusActions({ id, currentStatus }: TicketStatusActionProps) {
	const [status, setStatus] = useState(currentStatus);

	const handleUpdateStatus = async (newStatus: string) => {
		await ticketService.updateTicketStatus(id, newStatus)
		setStatus(newStatus);

		window.dispatchEvent(
			new CustomEvent("ticket-status-changed", {
				detail: { status: newStatus }
			})
		);
	}

	return (
		<select className="bg-white border border-gray-300 text-sm rounded-lg px-3 py-2 focus:ring-2 focus:ring-black/10 focus:border-black outline-none" value={status} onChange={(e) => handleUpdateStatus(e.target.value)}>
			<option value="OPEN">{LABELS.OPEN}</option>
			<option value="PENDING">{LABELS.PENDING}</option>
			<option value="RESOLVED">{LABELS.RESOLVED}</option>
		</select>
	);
}