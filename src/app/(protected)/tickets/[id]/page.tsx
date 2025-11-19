import { cookies } from 'next/headers';

export default async function TicketDetailPage({ params }: { params: { id: string } }) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token')?.value;
  const { id } = await params;
  
  const res = await fetch(`${process.env.BACKEND_URL}/tickets/${id}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: 'no-store',
  });

  if (!res.ok) {
    return <div className="p-4">Ticket introuvable.</div>;
  }

  const ticket = await res.json();

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-semibold">{ticket.subject}</h1>

      <div className="space-y-3">
        {ticket.messages.map((message: any) => (
          <div key={message.id} className="border p-3 rounded-lg">
            <div className="font-medium">{message.from}</div>
            <div className="text-sm opacity-60">{new Date(message.date).toLocaleString()}</div>
            <p className="mt-2">{message.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
