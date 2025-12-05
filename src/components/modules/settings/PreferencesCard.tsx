"use client";

import { useState, useRef } from "react";
import { Sparkles, PenLine, SlidersHorizontal } from "lucide-react";

type Preferences = {
	tone: string;
	signature: string;
	autoImport: boolean;
	autoAiSend: boolean;
};

export function PreferencesCard({ preferences }: { preferences: Preferences }) {
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
		const next = { ...prefs, ...partial };
		setPrefs(next);
		setLoading(true);

		const res = await fetch("/api/preferences/update", {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(buildDto(next)),
		});

		const data = await res.json();
		setPrefs(data);
		setLoading(false);
	}

	function updateSignature(value: string) {
		const next = { ...prefs, signature: value };
		setPrefs(next);

		if (debounceRef.current) clearTimeout(debounceRef.current);

		debounceRef.current = setTimeout(() => {
			updatePrefs({ signature: value });
		}, 500);
	}

	function updateTone(value: string) {
		updatePrefs({ tone: value });
	}

	function togglePref(key: "autoImport" | "autoAiSend") {
		updatePrefs({ [key]: !prefs[key] } as any);
	}

	return (
		<div className="rounded-xl border bg-white shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
			<div className="px-6 py-5 border-b bg-gray-50 flex items-center gap-3">
				<SlidersHorizontal size={18} className="text-gray-700" />
				<h3 className="font-semibold text-gray-800 tracking-tight">Préférences IA</h3>
			</div>
			<div className="p-6 space-y-8">
				<div className="space-y-2">
					<label className="text-sm font-medium text-gray-700 flex items-center gap-2">
						<Sparkles size={16} className="text-gray-500" />
						Ton de la réponse IA
					</label>
					<select disabled={loading} value={prefs.tone} onChange={(e) => updateTone(e.target.value)} className="w-full border px-3 py-2 rounded-lg bg-white  text-gray-800 font-medium focus:ring-2 focus:ring-black/10 focus:border-black transition">
						<option value="neutral">Neutre</option>
						<option value="friendly">Amical</option>
						<option value="formal">Formel</option>
					</select>


					<p className="text-xs text-gray-500">
						Définit le ton utilisé par l’IA lors de la génération de réponses.
					</p>
				</div>
				<div className="space-y-2">
					<label className="text-sm font-medium text-gray-700 flex items-center gap-2">
						<PenLine size={16} className="text-gray-500" />
						Signature automatique
					</label>
					<textarea disabled={loading} value={prefs.signature} onChange={(e) => updateSignature(e.target.value)} placeholder="Ex : Cordialement, Nicolas – Support Client" className="w-full border rounded-lg px-3 py-2 text-sm h-28 bg-white focus:ring-2 focus:ring-black/20 focus:border-black transition resize-none"/>
					<p className="text-xs text-gray-500">Ajoutée automatiquement aux réponses générées.</p>
				</div>
				<div className="space-y-5">
					<div className="flex items-center justify-between border rounded-lg p-4 hover:bg-gray-50 transition">
						<div className="text-sm text-gray-700 leading-tight">
							Import automatique Gmail
							<p className="text-xs text-gray-500 mt-1">
								Crée automatiquement des tickets dès réception d'un email.
							</p>
						</div>
						<button disabled={loading} onClick={() => togglePref("autoImport")} className={`relative w-12 h-6 rounded-full transition-all cursor-pointer ${prefs.autoImport ? "bg-green-600" : "bg-gray-300"}`}>
							<span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${prefs.autoImport ? "left-7" : "left-1"}`}></span>
						</button>
					</div>
					<div className="flex items-center justify-between border rounded-lg p-4 hover:bg-gray-50 transition">
						<div className="text-sm text-gray-700 leading-tight">
							Envoi automatique IA
							<p className="text-xs text-gray-500 mt-1">
								Envoie automatiquement les réponses générées par l’IA.
							</p>
						</div>
						<button disabled={loading} onClick={() => togglePref("autoAiSend")} className={`relative w-12 h-6 rounded-full transition-all cursor-pointer ${prefs.autoAiSend ? "bg-green-600" : "bg-gray-300"}`}>
							<span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${prefs.autoAiSend ? "left-7" : "left-1"}`}></span>
						</button>
					</div>

				</div>
			</div>
		</div>
	);
}
