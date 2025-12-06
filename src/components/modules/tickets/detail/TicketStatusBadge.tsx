"use client";

import { useState, useEffect } from "react";

const LABELS: Record<string, string> = {
	OPEN: "Ouvert",
	PENDING: "En attente",
	RESOLVED: "Résolu",
};

const COLORS: Record<string, string> = {
	OPEN: "bg-blue-50 text-blue-700 border-blue-200",
	PENDING: "bg-yellow-50 text-yellow-700 border-yellow-200",
	RESOLVED: "bg-green-50 text-green-700 border-green-200",
};

export function TicketStatusBadge({ initialStatus }: { initialStatus: string }) {
	const [status, setStatus] = useState(initialStatus);

	useEffect(() => {
		const handler = (e: any) => {
			setStatus(e.detail.status);
		};

		window.addEventListener("ticket-status-changed", handler);
		return () => window.removeEventListener("ticket-status-changed", handler);
	}, []);

	const label = LABELS[status] ?? status;
	const color = COLORS[status] ?? "bg-gray-50 text-gray-700 border-gray-200";

	return (
		<span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${color}`}>
			Statut : {label}
		</span>
	);
}
