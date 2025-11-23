"use client";

export function MessageBubble({ message }: { message: any }) {
    const isCustomer = message.from === "customer";

    return (
        <div
            className={`p-3 rounded-xl border ${isCustomer
                    ? "bg-white border-gray-300"
                    : "bg-blue-50 border-blue-200"
                }`}
        >
            <div className="text-sm opacity-60">{message.from}</div>
            <div className="text-sm opacity-40">
                {new Date(message.date).toLocaleString()}
            </div>
            <p className="mt-2 whitespace-pre-line">{message.content}</p>
        </div>
    );
}