import { cookies } from "next/headers";
import { TicketFilters } from "./components/TicketsFilter";
import { TicketList } from "./components/TicketList";
import { Pagination } from "./components/Pagination";

export const revalidate = 0;

export default async function TicketsPage({ searchParams }: any) {
  const token = (await cookies()).get("access_token")?.value;
  if (!token) return <div>Unauthorized</div>;

  // searchParams est une PROMISE → on attend
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
      <h1 className="text-2xl font-semibold">Tickets</h1>

      <TicketFilters />

      <TicketList tickets={data.items} />

      <Pagination 
        total={data.total}
        page={page}
        pageSize={pageSize}
      />
    </div>
  );
}