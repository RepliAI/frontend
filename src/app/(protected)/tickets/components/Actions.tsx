"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { ErrorModal } from "@/components/ui/ErrorModal";

export function Actions({ id }: { id: string }) {
	const router = useRouter();

	const [loadingMsg, setLoadingMsg] = useState(false);
	const [loading, setLoading] = useState(false);
	const [textareaValue, setTextareaValue] = useState("");
	const [showGmailError, setShowGmailError] = useState(false);
	const [gmailErrorMessage, setGmailErrorMessage] = useState("");

	const sendMessage = async (formData: FormData) => {
		setLoadingMsg(true);

		const response = await fetch(`/api/tickets/${id}/messages`, {
			method: "POST",
			body: JSON.stringify({
				content: formData.get("content"),
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) {
			const error = await response.json();

			if (error.message === "GMAIL_NOT_CONNECTED") {
				setGmailErrorMessage(
					"Votre compte Gmail n’est pas connecté.\n\nVeuillez connecter votre Gmail dans les paramètres pour pouvoir envoyer des emails."
				);
				setShowGmailError(true);
			} else {
				setGmailErrorMessage("Une erreur est survenue.");
				setShowGmailError(true);
			}
			setLoadingMsg(false);
			return;
		}

		window.dispatchEvent(
			new CustomEvent("ticket-status-changed", { detail: "PENDING" })
		);

		setTextareaValue("");
		setLoadingMsg(false);
		router.refresh();
	};

	const generateAIReply = async () => {
		setLoading(true);

		const res = await fetch(`/api/tickets/${id}/generate-reply`, {
			method: "POST",
		});

		setLoading(false);

		if (!res.ok) {
			alert("Erreur lors de la génération");
			return;
		}
		const data = await res.json();
		setTextareaValue(data.reply);

		router.refresh();
	};

	return (
		<>
			<ErrorModal open={showGmailError} message={gmailErrorMessage} onClose={() => setShowGmailError(false)}/>
			<div className="space-y-4">
				<form onSubmit={(e) => {
						e.preventDefault();
						sendMessage(new FormData(e.currentTarget));
					}}
					className="space-y-3"
				>
					<label className="text-sm font-medium text-gray-700">
						Réponse au client
					</label>
					<textarea name="content" value={textareaValue} placeholder="Rédigez votre réponse au client…" className="border rounded-xl px-3 py-2 w-full h-40 text-sm bg-white focus:ring-2 focus:ring-black/10 focus:border-black outline-none" onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
							setTextareaValue(e.target.value)
						}
						required
					/>
					<div className="flex flex-wrap items-center gap-3">
						<button type="submit" disabled={loadingMsg} className="bg-black text-white px-4 py-2 rounded-xl text-sm font-medium disabled:opacity-50 hover:bg-gray-900 transition">
							{loadingMsg ? "Envoi…" : "Envoyer au client"}
						</button>
						<button type="button" onClick={generateAIReply} disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium disabled:opacity-50 hover:bg-blue-700 transition">
							{loading ? "Génération…" : "Générer une réponse IA"}
						</button>
					</div>
				</form>
			</div>
		</>
	);
}
