'use client'
import { BarChart3 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { StatusPieChart } from "@/components/modules/dashboard/StatusPieChart";
import { TicketTrendChart } from "@/components/modules/dashboard/TicketTrendChart";
import { PeriodSelector } from "@/components/modules/dashboard/PeriodSelector";
import StatCard from "@/components/modules/dashboard/StatsCard";
import { GmailAlertBanner } from "@/components/modules/dashboard/GmailAlertBanner";
import { PageHeader } from "@/components/layout/pageHeader";
import { dashboardService } from "@/services/dashboard.service";
import { TicketStatsDashboard } from "@/types/dashboard.type";



export default function DashboardPage() {

	const searchParams = useSearchParams();
	const daysParam = searchParams.get("days");
	const days = daysParam ? parseInt(daysParam, 10) || 14 : 14;

	const [stats, setStats] = useState<TicketStatsDashboard>({
		total: 0,
		open: 0,
		pending: 0,
		resolved: 0,
		lastTickets: [],
		period: {
			from: new Date(),
			to: getDateNDaysAgoAtMidnight(14),
			tickets: [],
			summary: {
				open: 0,
				pending: 0,
				resolved: 0
			}
		}
	});
	const [loading, setLoading] = useState(true);

	function getDateNDaysAgoAtMidnight(days: number): Date {
		const date = new Date();
		date.setHours(0, 0, 0, 0);
		date.setDate(date.getDate() - days);
		return date;
	}

	const handleFetchStats = async () => {
		setLoading(true);
		try {
			const data = await dashboardService.getStats(days);
			setStats(data);
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		handleFetchStats();
	}, [days])

	const periodStats = stats.period?.summary || {
		open: 0,
		pending: 0,
		resolved: 0,
	};
	const periodTickets = stats.period?.tickets || [];

	return (
		<div className="space-y-10">
			<GmailAlertBanner />
			<div className="flex items-center justify-between">
				<PageHeader icon={<BarChart3 size={18} />} title="Tableau de bord" subtitle="Vue d’ensemble de votre activité support." />
				<PeriodSelector currentDays={days} />
			</div>
			<section className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
				<StatCard label="Total tickets" value={stats.total} color="bg-slate-900" />
				<StatCard label="Ouverts" value={stats.open} color="bg-blue-600" />
				<StatCard label="En attente" value={stats.pending} color="bg-amber-500" />
				<StatCard label="Résolus" value={stats.resolved} color="bg-emerald-600" />
			</section>
			<section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
				<div className="rounded-2xl border border-gray-100 bg-white/90 p-6 shadow-sm">
					<h2 className="mb-4 text-sm font-medium text-gray-700">
						Répartition des tickets
					</h2>
					<div className="h-80">
						<StatusPieChart stats={periodStats} />
					</div>
				</div>

				<div className="rounded-2xl border border-gray-100 bg-white/90 p-6 shadow-sm">
					<h2 className="mb-4 text-sm font-medium text-gray-700">
						Évolution des tickets
					</h2>
					<div className="h-80">
						<TicketTrendChart tickets={periodTickets} />
					</div>
				</div>
			</section>
			<section className="rounded-2xl border border-gray-100 bg-white/90 p-6 shadow-sm">
				<h2 className="mb-4 text-xl font-semibold text-gray-900">
					Derniers tickets
				</h2>
				<div className="divide-y divide-gray-100">
					{stats.lastTickets.map((ticket: any) => (
						<a key={ticket.id} href={`/tickets/${ticket.id}`} className="flex items-center justify-between py-3 px-1 hover:bg-gray-50 rounded-lg transition-colors">
							<span className="text-sm font-medium text-gray-900">
								{ticket.subject}
							</span>
							<span className="text-xs text-gray-500">
								{new Date(ticket.createdAt).toLocaleDateString("fr-FR")}
							</span>
						</a>
					))}
				</div>
			</section>
		</div>
	);
}