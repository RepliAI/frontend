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
    const date = new Date(t.createdAt).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
    });

    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(grouped).map(([date, count]) => ({
    date,
    count,
  }));

  return (
    <div className="p-6 bg-white rounded-xl border shadow-sm h-full flex flex-col">
      <h2 className="text-lg font-semibold mb-4">Évolution des tickets</h2>

      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 20,
              right: 20,
              left: 0,
              bottom: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />

            <XAxis
              dataKey="date"
              tickMargin={10}
            />

            <YAxis allowDecimals={false} />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="count"
              stroke="#6366f1"
              strokeWidth={3}
              dot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
