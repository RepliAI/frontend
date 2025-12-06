"use client";

import { TicketsPeriod } from "@/types/dashboard.type";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

export function TicketTrendChart({ tickets }: { tickets: TicketsPeriod[] }) {
    const grouped = tickets.reduce((acc: any, t) => {
        const dateObj = new Date(t.createdAt);
        const key = dateObj.toISOString().slice(0, 10);
        acc[key] = (acc[key] || 0) + 1;
        return acc;
    }, {});

    const data = Object.entries(grouped)
        .map(([isoDate, count]) => {
            const d = new Date(isoDate);
            const label = d.toLocaleDateString("fr-FR", {
                day: "2-digit",
                month: "2-digit",
            });
            return { isoDate, label, count };
        })
        .sort((a, b) => (a.isoDate < b.isoDate ? -1 : a.isoDate > b.isoDate ? 1 : 0));

    return (
        <div className="p-6 bg-white rounded-xl border shadow-sm h-full flex flex-col">
            <h2 className="text-lg font-semibold mb-4">Évolution des tickets</h2>
            <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 16, right: 16, left: 8, bottom: 16 }}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="label" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey="count"
                            stroke="#6366f1"
                            strokeWidth={3}
                            dot={{ r: 3 }}
                            activeDot={{ r: 5 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
