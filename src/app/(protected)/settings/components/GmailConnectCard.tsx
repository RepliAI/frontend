"use client";

import { useState } from "react";

export function GmailConnectCard({ connected }: { connected: boolean }) {
    const [loading, setLoading] = useState(false);

    const handleConnect = async () => {
        setLoading(true);

        try {
            const res = await fetch("/api/gmail/connect");
            const data = await res.json();

            if (data.url) {
                window.location.href = data.url;
            }
        } catch (err) {
            console.error("Erreur connexion Gmail:", err);
        }

        setLoading(false);
    };

    return (
        <div className="p-6 border rounded-xl bg-white shadow-sm">
            <h2 className="text-xl font-semibold mb-3">Connexion Gmail</h2>

            {connected ? (
                <div className="p-4 bg-green-100 text-green-700 rounded-lg">
                    Votre compte Gmail est connecté ✓
                </div>
            ) : (
                <>
                <div className="p-4 bg-red-100 text-red-700 rounded-lg">
                    Vous n’êtes pas connecté à Gmail.
                </div>
                <button
                    onClick={handleConnect}
                    disabled={loading}
                    className="mt-4 px-5 py-2 text-white bg-black rounded-lg hover:bg-gray-800 disabled:opacity-50"
                >
                    {loading ? "Redirection..." : "Connecter Gmail"}
                </button>
                </>
            )}

        </div>
    );
}