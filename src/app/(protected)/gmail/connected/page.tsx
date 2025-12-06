"use client";

import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function GmailConnectedPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-sm p-10 text-center animate-fadeIn">
                <div className="flex items-center justify-center mb-6">
                    <div className="h-20 w-20 rounded-full bg-green-50 flex items-center justify-center border border-green-100">
                        <CheckCircle2 className="w-12 h-12 text-green-600" />
                    </div>
                </div>
                <h1 className="text-2xl font-semibold text-gray-900">
                    Gmail connecté
                </h1>
                <p className="text-gray-600 text-sm mt-3 leading-relaxed">
                    Votre compte Gmail a été configuré avec succès.  
                    Les emails entrants seront désormais automatiquement transformés en tickets.
                </p>
                <Link href="/settings" className="inline-block mt-8 px-6 py-2 rounded-lg bg-black text-white text-sm hover:bg-gray-800 transition shadow-sm">
                    Retour aux paramètres
                </Link>
            </div>
        </div>
    );
}