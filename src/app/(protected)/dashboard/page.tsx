import { cookies } from "next/headers";
import { StatusPieChart } from "./components/StatusPieChart";
import { TicketTrendChart } from "./components/TicketTrendChart";
import { PeriodSelector } from "./components/PeriodSelector";
import StatCard from "./components/StatsCard";
import { GmailAlertBanner } from "./components/GmailAlertBanner";
import { PageHeader } from "@/components/pageHeader";
import { BarChart3 } from "lucide-react";

export const revalidate = 0;

export default async function DashboardPage({ searchParams }: any) {
	const token = (await cookies()).get("access_token")?.value;
	if (!token) return <div>Unauthorized</div>;

	const paramsObj = await searchParams;
	const daysParam = paramsObj?.days;
	const days = daysParam ? parseInt(daysParam, 10) || 14 : 14;

	const res = await fetch(`${process.env.BACKEND_URL}/stats?days=${days}`, {
		cache: "no-store",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	if (!res.ok) {
		return <div className="p-6">Impossible de charger les statistiques.</div>;
	}

	const stats = await res.json();

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
				<PageHeader icon={<BarChart3 size={18} />} title="Tableau de bord" subtitle="Vue d’ensemble de votre activité support."/> 
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
					{stats.lastTickets.map((t: any) => (
						<a key={t.id} href={`/tickets/${t.id}`} className="flex items-center justify-between py-3 px-1 hover:bg-gray-50 rounded-lg transition-colors">
							<span className="text-sm font-medium text-gray-900">
								{t.subject}
							</span>
							<span className="text-xs text-gray-500">
								{new Date(t.createdAt).toLocaleDateString("fr-FR")}
							</span>
						</a>
					))}
				</div>
			</section>
		</div>
	);
}
