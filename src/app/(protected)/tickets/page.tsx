import { cookies } from "next/headers";
import { TicketFilters } from "./components/TicketsFilter";
import { TicketList } from "./components/TicketList";
import { Pagination } from "./components/Pagination";
import { PageHeader } from "@/components/pageHeader";
import { Ticket } from "lucide-react";

export const revalidate = 0;

export default async function TicketsPage({ searchParams }: any) {
	const token = (await cookies()).get("access_token")?.value;
	if (!token) return <div>Unauthorized</div>;

	const paramsObj = await searchParams;

	const params = new URLSearchParams();
	for (const key in paramsObj) {
		const value = paramsObj[key];
		if (typeof value === "string") {
			params.append(key, value);
		}
	}

	const query = params.toString();

	const res = await fetch(
		`${process.env.BACKEND_URL}/tickets?${query}`,
		{
			cache: "no-store",
			headers: { Authorization: `Bearer ${token}` },
		}
	);

	const data = await res.json();

	const page = Number(paramsObj.page) || 1;
	const pageSize = Number(paramsObj.pageSize) || 10;

	return (
		<div className="space-y-6 p-6">
			<PageHeader icon={<Ticket size={18} />} title="Tickets" subtitle="Consultez, filtrez et gérez vos tickets clients."/>
			<TicketFilters />
			<TicketList tickets={data.items} />
			<Pagination total={data.total} page={page} pageSize={pageSize}/>
		</div>
	);
}