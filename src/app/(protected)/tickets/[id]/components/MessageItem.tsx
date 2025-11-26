"use client";

type Message = {
  id: string;
  from: string;
  to: string;
  content: string;
  date: string;
};

interface Props {
  message: Message;
}

export function MessageItem({ message }: Props) {
  const from = (message.from || "").toLowerCase();
  const isAgent = from === "agent" || from === "support";
  const roleLabel = isAgent ? "Agent" : "Client";

  const time = new Date(message.date).toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const avatarClasses = isAgent
    ? "bg-blue-600 text-white"
    : "bg-gray-300 text-gray-800";

  const cardClasses = isAgent
    ? "border-blue-100 bg-blue-50"
    : "border-gray-200 bg-gray-50";

  return (
    <div className="flex gap-3">
      <div
        className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-semibold ${avatarClasses}`}
      >
        {roleLabel[0]}
      </div>

      <div
        className={`flex-1 rounded-xl border px-4 py-3 text-sm space-y-1 ${cardClasses}`}
      >
        <div className="flex items-center justify-between gap-2">
          <span className="font-medium">{roleLabel}</span>
          <span className="text-xs text-gray-500">{time}</span>
        </div>

        <p className="whitespace-pre-wrap text-sm text-gray-800">
          {message.content}
        </p>
      </div>
    </div>
  );
}