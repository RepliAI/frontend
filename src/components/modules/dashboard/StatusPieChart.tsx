"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = {
  OPEN: "#3b82f6",
  PENDING: "#f59e0b",
  RESOLVED: "#10b981",
};

export function StatusPieChart({ stats }: { stats: any }) {

  const data = [
    { name: "Ouverts", value: stats.open, key: "OPEN", color: COLORS.OPEN },
    { name: "En attente", value: stats.pending, key: "PENDING", color: COLORS.PENDING },
    { name: "Résolus", value: stats.resolved, key: "RESOLVED", color: COLORS.RESOLVED },
  ].filter((d) => d.value > 0);

  const chartKey = `${stats.open}-${stats.pending}-${stats.resolved}`;

  return (
    <div className="p-6 bg-white rounded-xl border shadow-sm h-full flex flex-col">
      <h2 className="text-lg font-semibold mb-4">Répartition des tickets</h2>

      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%" key={chartKey}>
          <PieChart>
            <Pie
              dataKey="value"
              data={data}
              cx="50%"
              cy="45%"
              outerRadius={80}
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              wrapperStyle={{
                paddingTop: "10px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}