"use client";

import { useState, useRef } from "react";

type Preferences = {
  tone: string;
  signature: string;
  autoImport: boolean;
  autoAiSend: boolean;
};

export function PreferencesCard({
  preferences,
}: {
  preferences: Preferences;
}) {
  const [prefs, setPrefs] = useState<Preferences>(preferences);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  function buildDto(next: Preferences) {
    return {
      tone: next.tone,
      signature: next.signature,
      autoImport: next.autoImport,
      autoAiSend: next.autoAiSend,
    };
  }

  async function updatePrefs(partial: Partial<Preferences>) {
    const next: Preferences = { ...prefs, ...partial };
    setPrefs(next);
    setLoading(true);

    const res = await fetch("/api/preferences/update", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(buildDto(next)),
    });

    const data = await res.json();
    setPrefs(data);
    setLoading(false);
  }

  async function togglePref(key: "autoImport" | "autoAiSend") {
    updatePrefs({ [key]: !prefs[key] } as Partial<Preferences>);
  }

  function updateSignature(value: string) {
    const next: Preferences = { ...prefs, signature: value };
    setPrefs(next);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      updatePrefs({ signature: value });
    }, 500);
  }

  async function updateTone(value: string) {
    updatePrefs({ tone: value });
  }

  return (
    <div className="p-6 border rounded-xl bg-white space-y-6">
      <h2 className="text-lg font-semibold">Préférences</h2>

      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <label className="font-medium">Ton des réponses IA</label>
          <select
            disabled={loading}
            value={prefs.tone}
            onChange={(e) => updateTone(e.target.value)}
            className="w-full border px-3 py-2 rounded-lg bg-white"
          >
            <option value="neutral">Neutre</option>
            <option value="friendly">Amical</option>
            <option value="formal">Formel</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Import automatique Gmail</p>
            <p className="text-gray-500 text-sm">
              Récupère automatiquement les nouveaux emails.
            </p>
          </div>

          <button
            onClick={() => togglePref("autoImport")}
            disabled={loading}
            className={`px-4 py-2 rounded-lg text-white transition ${
              prefs.autoImport ? "bg-green-600" : "bg-gray-400"
            }`}
          >
            {prefs.autoImport ? "Activé" : "Désactivé"}
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Envoi automatique IA</p>
            <p className="text-gray-500 text-sm">
              Les réponses IA seront envoyées directement sans validation.
            </p>
          </div>

          <button
            onClick={() => togglePref("autoAiSend")}
            disabled={loading}
            className={`px-4 py-2 rounded-lg text-white transition ${
              prefs.autoAiSend ? "bg-green-600" : "bg-gray-400"
            }`}
          >
            {prefs.autoAiSend ? "Activé" : "Désactivé"}
          </button>
        </div>

        <div className="flex flex-col">
          <label className="font-medium mb-1">Signature automatique</label>
          <textarea
            value={prefs.signature}
            onChange={(e) => updateSignature(e.target.value)}
            disabled={loading}
            placeholder="Ex : Cordialement, Nicolas Marin – Service Client"
            className="w-full border px-3 py-2 rounded-lg h-28"
          />
        </div>
      </div>
    </div>
  );
}