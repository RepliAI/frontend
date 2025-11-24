import Link from "next/link";
import { MessageSquare } from "lucide-react";

export default function LastTickets({ tickets }: { tickets: any[] }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border mt-6">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <MessageSquare size={18} />
        Derniers tickets
      </h2>

      <div className="space-y-3">
        {tickets.map((t) => (
          <Link
            href={`/tickets/${t.id}`}
            key={t.id}
            className="block p-3 border rounded-lg hover:bg-gray-50 transition"
          >
            <p className="font-medium">{t.subject}</p>
            <p className="text-xs text-gray-500">
              {t.messages?.[0]?.content?.slice(0, 60) ?? "Aucun message..."}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}