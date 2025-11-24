"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export function TicketTrendChart({ tickets }: { tickets: any[] }) {
  const grouped = tickets.reduce((acc: any, t) => {
    const date = new Date(t.createdAt).toLocaleDateString("fr-FR");
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(grouped)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => {
      const A = new Date(a.date.split("/").reverse().join("-")).getTime();
      const B = new Date(b.date.split("/").reverse().join("-")).getTime();
      return A - B;
    });

  return (
    <div className="p-6 bg-white rounded-xl border shadow-sm h-full">
      <h2 className="text-lg font-semibold mb-4">Évolution des tickets</h2>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 20, bottom: 40, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
          <XAxis dataKey="date" dy={10}/>
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#6366f1"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
