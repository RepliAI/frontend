"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Search, Filter } from "lucide-react";
import clsx from "clsx";

import { statuses } from "@/utils/constants";

export function TicketFilters() {
	const router = useRouter();
	const params = useSearchParams();

	const [status, setStatus] = useState(params.get("status") || "");
	const [search, setSearch] = useState(params.get("search") || "");

	useEffect(() => {
		const nextStatus = params.get("status") || "";
		const nextSearch = params.get("search") || "";

		if (nextStatus !== status) setStatus(nextStatus);
		if (nextSearch !== search) setSearch(nextSearch);
	}, [params]);

	function applyFilters(nextStatus = status, nextSearch = search) {
		const query = new URLSearchParams();

		if (nextStatus) query.set("status", nextStatus);
		if (nextSearch) query.set("search", nextSearch);

		router.push("/tickets?" + query.toString());
	}

	return (
		<div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-xl border bg-white/70 backdrop-blur-lg shadow-sm">
			<div className="flex items-center gap-2 overflow-x-auto py-1">
				{statuses.map((s) => (
					<button key={s.value} onClick={() => applyFilters(s.value, search)} className={clsx("px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap", status === s.value ? "bg-gray-900 text-white shadow" : "bg-gray-100 text-gray-600 hover:bg-gray-200")}>
						{s.label}
					</button>
				))}
			</div>
			<div className="relative w-full md:w-80">
				<Search className="absolute left-3 top-2.5 text-gray-400" size={18}/>
				<input
					className="w-full pl-10 pr-4 py-2 rounded-lg border bg-white/50 backdrop-blur-sm text-gray-700 focus:ring-2 focus:ring-gray-200 outline-none transition"
					placeholder="Rechercher un ticket…"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter") applyFilters(status, search);
					}}
				/>
			</div>
		</div>
	);
}