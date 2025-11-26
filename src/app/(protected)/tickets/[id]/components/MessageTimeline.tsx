"use client";

import { MessageItem } from "./MessageItem";

type Message = {
  id: string;
  from: string;
  to: string;
  content: string;
  date: string;
};

interface Props {
  messages: Message[];
}

function groupByDate(messages: Message[]) {
  const map = new Map<string, Message[]>();

  for (const m of messages) {
    const d = new Date(m.date);
    if (Number.isNaN(d.getTime())) continue;
    const key = d.toISOString().slice(0, 10);
    const group = map.get(key) || [];
    group.push(m);
    map.set(key, group);
  }

  const entries = Array.from(map.entries()).sort(
    ([a], [b]) => new Date(a).getTime() - new Date(b).getTime()
  );

  return entries;
}

export function MessageTimeline({ messages }: Props) {
  const grouped = groupByDate(messages || []);

  return (
    <div className="space-y-6">
      {grouped.map(([dateKey, group]) => {
        const label = new Date(dateKey).toLocaleDateString("fr-FR", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });

        return (
          <div key={dateKey} className="space-y-3">
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <div className="flex-1 border-t border-gray-200" />
              <span className="px-2 py-0.5 rounded-full bg-gray-100">
                {label}
              </span>
              <div className="flex-1 border-t border-gray-200" />
            </div>

            <div className="space-y-3">
              {group.map((m) => (
                <MessageItem key={m.id} message={m} />
              ))}
            </div>
          </div>
        );
      })}

      {grouped.length === 0 && (
        <div className="text-sm text-gray-500 italic">
          Aucun message pour ce ticket pour le moment.
        </div>
      )}
    </div>
  );
}