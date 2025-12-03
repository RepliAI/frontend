"use client";

import Link from "next/link";
import { XCircle } from "lucide-react";

export default function BillingCancelPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-6 py-24">
      <div
        className="
          relative backdrop-blur-xl bg-white/60 border border-white/40 
          shadow-[0_8px_40px_rgba(0,0,0,0.06)]
          rounded-3xl max-w-2xl w-full p-14 text-center animate-fade-up
        "
      >
        {/* Gradient glow */}
        <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-red-200/60 to-rose-300/40 blur-2xl opacity-40"></div>

        {/* Icon Glow */}
        <div className="mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-red-500 to-rose-600 shadow-lg flex items-center justify-center animate-pop">
          <XCircle className="w-14 h-14 text-white" />
        </div>

        <h1 className="text-4xl font-extrabold mt-10 tracking-tight text-gray-900">
          Paiement annulé
        </h1>

        <p className="text-gray-600 mt-5 text-lg leading-relaxed max-w-md mx-auto">
          Aucun montant n’a été prélevé.  
          Vous pouvez réessayer ou sélectionner une autre offre à tout moment.
        </p>

        <div className="my-10 w-32 h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto"></div>

        <div className="flex items-center justify-center gap-4">
          <Link
            href="/billing"
            className="
              px-8 py-4 rounded-xl text-white font-semibold text-lg
              bg-gradient-to-r from-black to-gray-900
              shadow-lg hover:shadow-xl hover:scale-[1.03] transition-all
            "
          >
            Retour aux offres
          </Link>

          <Link
            href="/dashboard"
            className="
              px-8 py-4 rounded-xl text-gray-800 font-semibold text-lg border
              bg-white/70 hover:bg-white hover:shadow-md hover:scale-[1.02] transition-all
            "
          >
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