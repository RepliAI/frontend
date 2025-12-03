"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function BillingSuccessPage() {
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
        <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-green-200/60 to-emerald-300/40 blur-2xl opacity-40"></div>

        {/* Icon Glow */}
        <div className="mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg flex items-center justify-center animate-pop">
          <CheckCircle className="w-14 h-14 text-white" />
        </div>

        <h1 className="text-4xl font-extrabold mt-10 tracking-tight text-gray-900">
          Paiement confirmé 🎉
        </h1>

        <p className="text-gray-600 mt-5 text-lg leading-relaxed max-w-md mx-auto">
          Votre abonnement est maintenant actif.  
          Merci de votre confiance — vous débloquez dès maintenant toutes les fonctionnalités avancées.
        </p>

        {/* Divider */}
        <div className="my-10 w-32 h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto"></div>

        <Link
          href="/dashboard"
          className="
            inline-flex items-center justify-center gap-2 px-8 py-4 
            rounded-xl text-white font-semibold text-lg
            bg-gradient-to-r from-black to-gray-900 
            shadow-lg hover:shadow-xl transition-all duration-200
            hover:scale-[1.03]
          "
        >
          Accéder au tableau de bord →
        </Link>

        <p className="text-gray-500 text-sm mt-6">
          Une facture détaillée a été envoyée à votre adresse e-mail.
        </p>
      </div>
    </div>
  );
}