"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function BillingSuccessPage() {
  return (
    <div className="max-w-xl mx-auto py-20 px-6 text-center">
      <CheckCircle className="w-16 h-16 text-green-600 mx-auto" />

      <h1 className="text-3xl font-bold mt-6">
        Paiement confirmé 🎉
      </h1>

      <p className="text-gray-600 mt-3 text-lg">
        Votre abonnement a été activé avec succès.  
        Vous pouvez dès maintenant profiter de toutes les fonctionnalités de votre plan.
      </p>

      <div className="mt-10">
        <Link
          href="/dashboard"
          className="px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-900 transition font-medium"
        >
          Accéder au tableau de bord
        </Link>
      </div>

      <p className="text-gray-500 text-sm mt-6">
        Une facture a été envoyée à votre adresse e-mail.
      </p>
    </div>
  );
}