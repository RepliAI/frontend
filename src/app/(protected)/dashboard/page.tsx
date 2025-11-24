import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { StatusPieChart } from "./components/StatusPieChart";
import { TicketTrendChart } from "./components/TicketTrendChart";
import StatCard from "./components/StatsCard";

export const revalidate = 0;

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const daysRange = 15;

  if (!accessToken) notFound();

  const res = await fetch(`${process.env.BACKEND_URL}/stats?days=${daysRange}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  });

  if (!res.ok) {
    return <div className="p-6">Impossible de charger les statistiques.</div>;
  }

  const stats = await res.json();

  return (
    <div className="p-10 space-y-10">
      <h1 className="text-3xl font-semibold">Tableau de bord</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard label="Total Tickets" value={stats.total} color="bg-gray-900" />
        <StatCard label="Ouverts" value={stats.open} color="bg-blue-600" />
        <StatCard label="En attente" value={stats.pending} color="bg-yellow-500" />
        <StatCard label="Résolus" value={stats.resolved} color="bg-green-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-80">
          <StatusPieChart stats={stats} />
        </div>
        <div className="h-80">
          <TicketTrendChart tickets={stats.period.tickets} />
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