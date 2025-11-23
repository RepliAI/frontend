import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { TicketList } from "./components/TicketList";

export const revalidate = 0;

export default async function TicketsPage() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    if (!accessToken) notFound();

    const res = await fetch(`${process.env.BACKEND_URL}/tickets`, {
        cache: "no-store",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!res.ok) {
        return (
            <div className="max-w-3xl mx-auto py-10">
                <p className="text-red-600">Impossible de charger les tickets.</p>
            </div>
        );
    }

    const tickets = await res.json();

    return (
        <div className="max-w-3xl mx-auto py-10 space-y-6">
            <h1 className="text-2xl font-semibold">Vos tickets</h1>
            <TicketList tickets={tickets} />
        </div>
    );
}
