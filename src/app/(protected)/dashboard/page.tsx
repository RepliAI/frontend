import { cookies } from "next/headers";
import StatsCard from "./components/StatsCard";
import LastTickets from "./components/LastTickets";
import QuickActions from "./components/QuickActions";

export default async function DashboardPage() {
  const token = (await cookies()).get("access_token")?.value;

  const res = await fetch(`${process.env.BACKEND_URL}/tickets`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  const tickets = await res.json();

  const open = tickets.filter((t: any) => t.status === "OPEN").length;
  const pending = tickets.filter((t: any) => t.status === "PENDING").length;
  const resolved = tickets.filter((t: any) => t.status === "RESOLVED").length;

  const avgResponse =
    Math.round(
      tickets.reduce((acc: number, t: any) => {
        if (!t.messages || t.messages.length < 2) return acc;
        const first = new Date(t.messages[0].date).getTime();
        const second = new Date(t.messages[1].date).getTime();
        return acc + (second - first);
      }, 0) /
        (tickets.length || 1) /
        1000 /
        60
    ) || 0;

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard label="Tickets ouverts" value={open} />
        <StatsCard label="En attente d'IA" value={pending} />
        <StatsCard label="Tickets résolus" value={resolved} />
        <StatsCard label="Temps moyen de réponse" value={`${avgResponse} min`} />
      </div>

      <QuickActions />

      <LastTickets tickets={tickets.slice(0, 5)} />
    </div>
  );
}