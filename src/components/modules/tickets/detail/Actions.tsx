"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { ErrorModal } from "@/components/ui/ErrorModal";
import { ticketService } from "@/services/tickets.service";

export function Actions({ id }: { id: string }) {
	const router = useRouter();

	const [loadingMsg, setLoadingMsg] = useState(false);
	const [loading, setLoading] = useState(false);
	const [textareaValue, setTextareaValue] = useState("");
	const [showGmailError, setShowGmailError] = useState(false);
	const [gmailErrorMessage, setGmailErrorMessage] = useState("");

	const handleGenerateAIReply = async () => {
		setLoading(true);
		try {
			const { reply } = await ticketService.generateAIReply(id)
			setTextareaValue(reply);

		} finally {
			setLoading(false);
		}
		router.refresh();
	};

	const handleSendMessage = async (e: FormEvent) => {
		e.preventDefault()
		setLoadingMsg(true);
		try {
			await ticketService.sendMessage(id, textareaValue);
			window.dispatchEvent(new CustomEvent("messages-updated"));
			window.dispatchEvent(
				new CustomEvent("ticket-status-changed", { detail: "PENDING" })
			);
	
			setTextareaValue("");
			setLoadingMsg(false);
			router.refresh();
		} catch(err){
			setGmailErrorMessage(err instanceof Error ? err.message : "Une erreur s'est produite lors de l'envoi du message")
		} finally {
			setLoadingMsg(false);
		}

	}
	return (
		<>
			<ErrorModal open={showGmailError} message={gmailErrorMessage} onClose={() => setShowGmailError(false)}/>
			<div className="space-y-4">
				<form onSubmit={(e) => handleSendMessage(e)} className="space-y-3">
					<label className="text-sm font-medium text-gray-700">
						Réponse au client
					</label>
					<textarea name="content" value={textareaValue} placeholder="Rédigez votre réponse au client…" className="border rounded-xl px-3 py-2 w-full h-40 text-sm bg-white focus:ring-2 focus:ring-black/10 focus:border-black outline-none" onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setTextareaValue(e.target.value)} required/>
					<div className="flex flex-wrap items-center gap-3">
						<button type="submit" disabled={loadingMsg} className="bg-black text-white px-4 py-2 rounded-xl text-sm font-medium disabled:opacity-50 hover:bg-gray-900 transition">
							{loadingMsg ? "Envoi…" : "Envoyer au client"}
						</button>
						<button type="button" onClick={handleGenerateAIReply} disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium disabled:opacity-50 hover:bg-blue-700 transition">
							{loading ? "Génération…" : "Générer une réponse IA"}
						</button>
					</div>
				</form>
			</div>
		</>
	);
}
