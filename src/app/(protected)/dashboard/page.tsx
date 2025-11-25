import { cookies } from "next/headers";
import { StatusPieChart } from "./components/StatusPieChart";
import { TicketTrendChart } from "./components/TicketTrendChart";
import { PeriodSelector } from "./components/PeriodSelector";
import StatCard from "./components/StatsCard";

export const revalidate = 0;

export default async function DashboardPage({ searchParams }: any) {
  const token = (await cookies()).get("access_token")?.value;
  if (!token) return <div>Unauthorized</div>;

  const paramsObj = await searchParams;
  const daysParam = paramsObj?.days;
  const days = daysParam ? parseInt(daysParam, 10) || 14 : 14;

  const res = await fetch(
    `${process.env.BACKEND_URL}/stats?days=${days}`,
    {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    return <div className="p-6">Impossible de charger les statistiques.</div>;
  }

  const stats = await res.json();

  const periodStats = stats.period?.summary || { open: 0, pending: 0, resolved: 0 };
  const periodTickets = stats.period?.tickets || [];

  return (
    <div className="p-6 space-y-6">

      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Tableau de bord</h1>
          <p className="text-sm text-gray-500">
            Vue d’ensemble de votre activité support.
          </p>
        </div>
        <PeriodSelector currentDays={days} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
      <StatCard label="Total Tickets" value={stats.total} color="bg-gray-900" />
        <StatCard label="Ouverts" value={stats.open} color="bg-blue-600" />
        <StatCard label="En attente" value={stats.pending} color="bg-yellow-500" />
        <StatCard label="Résolus" value={stats.resolved} color="bg-green-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-80">
          <StatusPieChart
            stats={{
              open: periodStats.open,
              pending: periodStats.pending,
              resolved: periodStats.resolved,
            }}
          />
        </div>

        <div className="h-80">
          <TicketTrendChart tickets={periodTickets} />
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-medium mb-4">Derniers tickets</h2>
        <div className="space-y-3">
          {stats.lastTickets.map((t: any) => (
            <a
              key={t.id}
              href={`/tickets/${t.id}`}
              className="flex items-center justify-between px-5 py-4 border rounded-xl bg-white hover:bg-gray-50 transition"
            >
              <span className="font-medium">{t.subject}</span>
              <span className="text-gray-500 text-sm">
                {new Date(t.createdAt).toLocaleDateString("fr-FR")}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}