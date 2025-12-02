"use client";

import Link from "next/link";
import { XCircle } from "lucide-react";

export default function BillingCancelPage() {
  return (
    <div className="max-w-xl mx-auto py-20 px-6 text-center">
      <XCircle className="w-16 h-16 text-red-600 mx-auto" />

      <h1 className="text-3xl font-bold mt-6">
        Paiement annulé
      </h1>

      <p className="text-gray-600 mt-3 text-lg">
        Aucun montant n’a été prélevé.  
        Vous pouvez réessayer à tout moment si vous souhaitez poursuivre votre abonnement.
      </p>

      <div className="mt-10 flex items-center justify-center gap-4">
        <Link
          href="/billing"
          className="px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-900 transition font-medium"
        >
          Revenir aux abonnements
        </Link>

        <Link
          href="/dashboard"
          className="px-6 py-3 border rounded-xl hover:bg-gray-100 transition font-medium"
        >
          Retour au tableau de bord
        </Link>
      </div>
    </div>
  );
}
