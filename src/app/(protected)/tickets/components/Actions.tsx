"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function Actions({ id }: { id: string }) {
  const router = useRouter();

  const [loadingMsg, setLoadingMsg] = useState(false);
  const [loading, setLoading] = useState(false);

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

    router.refresh();
  }

  async function generateAIReply() {
    setLoading(true);

    const res = await fetch(`/api/tickets/${id}/generate-reply`, {
      method: "POST",
    });

    setLoading(false);

    if (!res.ok) {
      alert("Erreur lors de la génération");
      return;
    }

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

      {/* Génération IA */}
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
