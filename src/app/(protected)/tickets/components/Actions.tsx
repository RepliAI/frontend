"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function Actions({ id }: { id: string }) {
  const router = useRouter();

  const [loadingMsg, setLoadingMsg] = useState(false);
  const [loading, setLoading] = useState(false);
  const [textareaValue, setTextareaValue] = useState("");

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
      alert("Erreur lors de l'envoi du message");
      setLoadingMsg(false);
      return;
    }

    setTextareaValue("");

    setLoadingMsg(false);

    router.refresh();
  }

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
  }

  return (
    <div className="space-y-4">
      {/* Envoi manuel */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(new FormData(e.currentTarget));
        }}
        className="space-y-3"
      >
        <textarea
          name="content"
          value={textareaValue}
          placeholder="Votre message…"
          className="border rounded-xl px-3 py-2 w-full h-40"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setTextareaValue(e.target.value)}
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
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
      >
        {loading ? "Génération…" : "Générer une réponse IA"}
      </button>
    </div>
  );
}