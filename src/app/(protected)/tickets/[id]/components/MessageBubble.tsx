"use client";

import clsx from "clsx";

export function MessageBubble({
  from,
  content,
  date,
}: {
  from: "customer" | "agent";
  content: string;
  date: string;
}) {
  const isCustomer = from === "customer";
  const isAgent = from === "agent";

  return (
    <div
      className={clsx(
        "flex w-full mb-4",
        isCustomer ? "justify-start" : "justify-end"
      )}
    >
      <div
        className={clsx(
          "max-w-[75%] px-4 py-3 rounded-2xl shadow-sm border animate-fadeIn whitespace-pre-line leading-relaxed",

          // customer → gris
          isCustomer &&
            "bg-gray-100 text-gray-900 border-gray-300 rounded-bl-none",

          // agent → bleu brand
          isAgent &&
            "bg-blue-600 text-white border-blue-700 rounded-br-none"
        )}
      >
        <div>{content}</div>

        <div className="mt-2 text-xs opacity-70">
          {new Date(date).toLocaleString("fr-FR")}
        </div>
      </div>
    </div>
  );
}
