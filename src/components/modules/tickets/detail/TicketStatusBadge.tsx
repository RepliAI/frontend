"use client";

import { ticketStatusColors, ticketStatusLabels } from "@/utils/constants";
import { useState, useEffect } from "react";

interface TicketStatusBadgeProps { 
	initialStatus: string 
}

export function TicketStatusBadge({ initialStatus }: TicketStatusBadgeProps) {
	const [status, setStatus] = useState(initialStatus);

	useEffect(() => {
		const handler = (e: any) => {
			setStatus(e.detail.status);
		};

		window.addEventListener("ticket-status-changed", handler);
		return () => window.removeEventListener("ticket-status-changed", handler);
	}, []);

	const label = ticketStatusLabels[status] ?? status;
	const color = ticketStatusColors[status] ?? "bg-gray-50 text-gray-700 border-gray-200";

	return (
		<span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${color}`}>
			Statut : {label}
		</span>
	);
}
