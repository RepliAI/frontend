"use client";

import Link from "next/link";
import { ChevronRight, AlertTriangle } from "lucide-react";
import { StatusBadge } from "./StatusBadge";

interface Props {
	ticket: any;
}

export function TicketCard({ ticket }: Props) {
	const lastMessage = ticket.messages && ticket.messages.length > 0 ? ticket.messages[ticket.messages.length - 1].content : "Aucun message";
	const hasRiskyMessages = ticket.messages?.some((msg: any) => msg.isRisky) ?? false;

	return (
		<Link href={`/tickets/${ticket.id}`} className="group relative block rounded-xl overflow-hidden bg-white/70 backdrop-blur-lg border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 p-5">
			<div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/40 to-white/10 pointer-events-none" />
			<div className="relative flex justify-between items-start mb-3">
				<div className="flex flex-col gap-1 flex-1">
					<div className="flex items-center gap-2 flex-wrap">
						<h2 className="font-semibold text-gray-900 text-lg leading-tight">
							{ticket.subject}
						</h2>
						{hasRiskyMessages && (
							<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-red-50 text-red-700 border border-red-300">
								<AlertTriangle size={10} />
								Urgent
							</span>
						)}
					</div>
					<p className="text-sm text-gray-500 line-clamp-2 max-w-[90%]">
						{lastMessage}
					</p>
				</div>
				<StatusBadge status={ticket.status} />
			</div>
			<div className="relative flex items-center justify-between mt-4">
				<p className="text-xs text-gray-400">
					{new Date(ticket.createdAt).toLocaleDateString("fr-FR", {
						 day: "2-digit",
						 month: "2-digit",
						 year: "numeric",
						 hour: "2-digit",
						 minute: "2-digit",
						 second: "2-digit",
					})}
				</p>
				<ChevronRight className="text-gray-400 group-hover:text-gray-800 transition-transform duration-300 group-hover:translate-x-1" size={18}/>
			</div>
		</Link>
	);
}