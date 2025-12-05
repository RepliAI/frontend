"use client";

type MessageRole = "customer" | "agent" | "ai";

type Message = {
	id: string;
	from: string;
	to: string;
	content: string;
	date: string;
};

export function MessageItem({ message }: { message: Message }) {
	const detectedRole: MessageRole = message.from === "agent" || message.from === "ai" ? (message.from as MessageRole) : message.from.includes("@") ? "customer" : "customer";
	const isRight = detectedRole === "agent" || detectedRole === "ai";
	const avatarInitial = detectedRole === "ai" ? "IA"  : detectedRole === "agent" ? "S" : "C";

	const bubbleStyle = {
		customer: "bg-white border border-gray-200 text-gray-800",
		agent: "bg-blue-600 text-white",
		ai: "bg-gray-100 border border-gray-300 text-gray-800",
	}[detectedRole];

	const roleLabel = {
		customer: "Client",
		agent: "Support",
		ai: "Réponse IA",
	}[detectedRole];

	return (
		<div className={`flex gap-3 ${isRight ? "justify-end" : ""}`}>
			{!isRight && (
				<div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-700 shrink-0">
					{avatarInitial}
				</div>
			)}

			<div className={`flex flex-col max-w-[75%] ${isRight ? "items-end" : ""}`}>
				<span className="text-xs text-gray-500 mb-1">{roleLabel}</span>
				<div className={`px-4 py-2 rounded-2xl shadow-sm whitespace-pre-wrap ${bubbleStyle}`}>
					{message.content}
				</div>
				<span className="text-[10px] text-gray-400 mt-1">
					{new Date(message.date).toLocaleString("fr-FR", {
						hour: "2-digit",
						minute: "2-digit",
						day: "2-digit",
						month: "short",
					})}
				</span>
			</div>
			{isRight && (
				<div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-700 shrink-0">
					{avatarInitial}
				</div>
			)}
		</div>
	);
}