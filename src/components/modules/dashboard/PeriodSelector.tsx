"use client";

import { useRouter, useSearchParams } from "next/navigation";

const OPTIONS = [7, 14, 30, 90];

export function PeriodSelector({ currentDays }: { currentDays: number }) {
	const router = useRouter();
	const params = useSearchParams();

	const changeDays = (days: number) => {
		const query = new URLSearchParams(Array.from(params.entries()));

		if (days === 14) {
			query.delete("days");
		} else {
			query.set("days", String(days));
		} 

		router.push("/dashboard?" + query.toString());
	}

	return (
		<div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl px-4 py-2 shadow-sm">
			<span className="text-xs font-medium text-gray-500">Période</span>
			<div className="flex bg-gray-100 border border-gray-200 rounded-xl p-1">
				{OPTIONS.map((d) => {
					const active = d === currentDays;
					return (
						<button key={d} onClick={() => changeDays(d)} className={`px-3 py-1 text-xs rounded-lg transition-all ${active ? "bg-white shadow-sm text-gray-900" : "text-gray-600 hover:text-gray-800"}`}>
							{d}j
						</button>
					);
				})}
			</div>
		</div>
	);
}
