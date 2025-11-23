"use client";

import { useState } from "react";

export function Actions({ id }: { id: string }) {
    const [loadingMsg, setLoadingMsg] = useState(false);
    const [loadingIA, setLoadingIA] = useState(false);

    async function sendMessage(formData: FormData) {
        setLoadingMsg(true);

        await fetch(`/api/tickets/${id}/messages`, {
            method: "POST",
            body: JSON.stringify({
                content: formData.get("content"),
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        setLoadingMsg(false);
        window.location.reload();
    }

    async function generateAIReply() {
        setLoadingIA(true);

        await fetch(`/api/tickets/${id}/generate-reply`, {
            method: "POST",
        });

        setLoadingIA(false);
        window.location.reload();
    }

    return (
        <div className="space-y-4">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    sendMessage(new FormData(e.currentTarget));
                }}
                className="space-y-3"
            >
                <textarea
                    name="content"
                    placeholder="Votre message…"
                    className="border rounded-xl px-3 py-2 w-full"
                    required
                />
                <button
                    disabled={loadingMsg}
                    className="bg-black text-white px-4 py-2 rounded-xl disabled:opacity-50"
                >
                    {loadingMsg ? "Envoi…" : "Envoyer"}
                </button>
            </form>

            <button
                onClick={generateAIReply}
                disabled={loadingIA}
                className="bg-blue-600 text-white px-4 py-2 rounded-xl disabled:opacity-50"
            >
                {loadingIA ? "Génération…" : "Générer réponse IA"}
            </button>
        </div>
    );
}