import { cookies } from 'next/headers';

export default async function TicketsPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token')?.value;

  const res = await fetch(`${process.env.BACKEND_URL}/tickets`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: 'no-store',
  });

  if (!res.ok) {
    return <div className="p-4">Erreur de chargement des tickets.</div>;
  }

  const tickets = await res.json();

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Vos tickets</h1>

      <div className="space-y-3">
        {tickets.map((t: any) => (
          <a key={t.id} href={`/tickets/${t.id}`} className="block p-4 border rounded-lg hover:bg-gray-100">
            <div className="font-medium">{t.subject}</div>
            <div className="text-sm opacity-70">{t.status}</div>
          </a>
        ))}
      </div>
    </div>
  );
}
