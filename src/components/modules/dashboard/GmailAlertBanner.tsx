"use client";

import Link from "next/link";
import { AlertTriangle, CheckCircle } from "lucide-react";

import { useGmailStatus } from "@/hooks/useGmailStatus";

export function GmailAlertBanner() {
	const { loading, connected } = useGmailStatus();

	if (loading) return null;

	if (connected) {
		return (
			<div className="w-full flex items-center gap-3 rounded-xl border border-green-200  bg-green-50/60 px-4 py-3 shadow-sm">
				<div className="flex items-center justify-center h-8 w-8 rounded-full bg-green-100">
					<CheckCircle className="text-green-600" size={18} />
				</div>
				<p className="text-green-700 text-sm font-medium">
					Gmail connecté — synchronisation active.
				</p>
			</div>
		);
	}

	return (
		<div className="w-full flex items-center justify-between px-4 py-3 rounded-xl  border border-red-200 bg-red-50/70 shadow-sm">
			<div className="flex items-center gap-3">
				<div className="flex items-center justify-center h-8 w-8 rounded-full bg-red-100">
					<AlertTriangle className="text-red-600" size={18} />
				</div>
				<span className="text-red-700 text-sm font-medium">
					Gmail n’est pas connecté — aucun ticket ne sera importé.
				</span>
			</div>
			<Link href="/gmail/connect" className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm  font-medium shadow hover:bg-red-700 transition">
				Connecter Gmail
			</Link>
		</div>
	);
}
