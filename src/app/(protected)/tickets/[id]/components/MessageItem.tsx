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

type MessageRole = "customer" | "agent" | "ai";

const messageStyles: Record<
  MessageRole,
  {
    container: string;
    label: React.ReactNode;
  }
> = {
  customer: {
    container: "self-start bg-gray-100 text-black",
    label: "Client",
  },
  agent: {
    container: "self-end bg-blue-600 text-white",
    label: "Support",
  },
  ai: {
    container:
      "self-end bg-slate-200 text-black border border-slate-300",
    label: (
      <span className="flex items-center gap-1 text-xs text-slate-500">
        <span className="px-1.5 py-0.5 bg-slate-300 rounded text-[10px]">
          IA
        </span>
      </span>
    ),
  },
};


export function MessageItem({ message }: { message: { from: MessageRole; content: string; date: string } }) {
  const style = messageStyles[message.from.includes('@') ? "customer" : message.from];

  return (
    <div className="flex flex-col gap-1">
      <div className="text-xs text-gray-500">{style.label}</div>

      <div className={`max-w-[75%] px-4 py-2 rounded-xl shadow ${style.container} whitespace-pre-wrap`}>
        {message.content}
      </div>
      <div className="text-[10px] text-gray-400">
        {new Date(message.date).toLocaleString("fr-FR")}
      </div>
    </div>
  );
}