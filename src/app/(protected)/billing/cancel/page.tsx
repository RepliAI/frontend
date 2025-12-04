"use client";

import Link from "next/link";
import { XCircle } from "lucide-react";

export default function BillingCancelPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-24">
            <div className="relative rounded-3xl w-full max-w-2xl p-14 text-center bg-white/70 backdrop-blur-xl border border-gray-200 shadow-lg animate-fade-up">
                <div className="absolute inset-0 rounded-3xl -z-10 bg-gradient-to-br from-red-100/60 to-rose-200/40 blur-2xl opacity-40" />
                <div className="mx-auto w-24 h-24 rounded-2xl bg-gradient-to-br from-rose-500 to-red-600 shadow-xl flex items-center justify-center animate-pop">
                    <XCircle className="w-14 h-14 text-white" />
                </div>
                <h1 className="text-4xl font-bold mt-10 tracking-tight text-gray-900">
                    Paiement annulé
                </h1>
                <p className="text-gray-600 mt-5 text-lg leading-relaxed max-w-md mx-auto">
                    Aucun montant n’a été prélevé.
                    Vous pouvez réessayer ou sélectionner une autre offre à tout moment.
                </p>
                <div className="my-10 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent w-40 mx-auto" />
                <div className="flex items-center justify-center gap-4">
                    <Link href="/billing" className="px-8 py-4 rounded-xl text-white font-semibold text-lg bg-gradient-to-r from-black to-gray-900 shadow-lg hover:shadow-xl hover:scale-[1.03] transition-all">
                        Retour aux offres
                    </Link>
                    <Link href="/dashboard" className="px-8 py-4 rounded-xl text-gray-800 font-semibold text-lg border border-gray-300 bg-white/70 hover:bg-white hover:shadow-md hover:scale-[1.02] transition-all" >
                        Tableau de bord
                    </Link>
                </div>
                <p className="text-gray-500 text-sm mt-6">
                    Si vous avez rencontré un problème, contactez-nous.
                </p>
            </div>
        </div>
    );
}