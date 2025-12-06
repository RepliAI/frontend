"use client";

import { Mail } from "lucide-react";
import { useState } from "react";
import { gmailService } from "@/services/gmail.service";

export function GmailConnectCard({ connected }: { connected: boolean }) {
    const [loading, setLoading] = useState(false);

    const handleConnect = async () => {
        setLoading(true);
        try {
            const data = await gmailService.connectGmailAccount();
            window.location.href = data.url;
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="rounded-xl border bg-white p-5 shadow-sm  hover:shadow-md transition cursor-default">
            <div className="flex items-start gap-4">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center ${connected ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    <Mail size={18} />
                </div>
                <div className="flex-1">
                    <h3 className="font-medium text-gray-900">
                        Gmail {connected ? "connecté" : "non connecté"}
                    </h3>
                    <p className="text-gray-500 text-sm mt-1">
                        {connected ? "Votre synchronisation Gmail est active. Les emails entrants créent automatiquement des tickets." : "Connectez Gmail pour que vos emails clients se transforment automatiquement en tickets."}
                    </p>
                    {!connected && (
                        <button onClick={() => handleConnect()} className="inline-block mt-4 px-4 py-2 rounded-lg  bg-black text-white text-sm hover:bg-gray-800  transition shadow-sm">
                            Connecter Gmail
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}