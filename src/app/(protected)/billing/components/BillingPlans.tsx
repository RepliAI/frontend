"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const plans = [
  {
    id: "free",
    name: "Gratuit",
    price: "0€ / mois",
    planId: "FREE",
    description:
      "Idéal pour découvrir la plateforme et gérer vos premiers tickets.",
    features: [
      { label: "5 tickets / mois", included: true },
      { label: "Import Gmail automatique", included: false },
      { label: "Génération IA illimitée", included: false },
      { label: "Envoi automatique IA", included: false },
      { label: "Support prioritaire", included: false },
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: "29€ / mois",
    highlighted: true,
    planId: process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO!,
    description:
      "Parfait pour automatiser votre support et accélérer vos réponses.",
    features: [
      { label: "Tickets illimités", included: true },
      { label: "Import Gmail automatique", included: true },
      { label: "Génération IA illimitée", included: true },
      { label: "Envoi automatique IA", included: false },
      { label: "Support prioritaire", included: false },
    ],
  },
  {
    id: "business",
    name: "Business",
    price: "69€ / mois",
    planId: process.env.NEXT_PUBLIC_STRIPE_PRICE_BUSINESS!,
    description:
    "Automatisation maximale pour équipes support exigeantes.",
    features: [
      { label: "Tickets illimités", included: true },
      { label: "Import Gmail automatique", included: true },
      { label: "Génération IA illimitée", included: true },
      { label: "Envoi automatique IA", included: true },
      { label: "Support prioritaire", included: true },
    ],
  },
];

export default function BillingPlans({ current } :  { current: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handlePlanChange = async (priceId: string, plan: string ) => {
    setLoading(plan);
    setMessage(null);

    const res = await fetch("/api/billing/checkout", {
      method: "POST",
      body: JSON.stringify({ priceId, plan }),
    });

    const data = await res.json();

    if (data.url) {
      router.push(data.url);
      return;
    }

    setMessage("Votre changement d’offre sera appliqué à la fin de la période en cours.");
    setLoading(null);

    router.refresh();
  };

  return (
    <div className="max-w-5xl mx-auto py-16 px-6 space-y-8">
      {message && (
        <p className="text-center text-green-600 font-medium">{message}</p>
      )}

      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan) => {
          const isCurrent = current?.plan === plan.id;

          return (
            <div
              key={plan.id}
              className={`relative rounded-2xl border p-8 shadow-sm 
                ${plan.highlighted ? "border-black shadow-lg" : "border-gray-200"}`}
            >
              <h2 className="text-2xl font-semibold">{plan.name}</h2>
              <p className="text-gray-600 mt-1">{plan.description}</p>

              <div className="mt-6">
                <span className="text-4xl font-bold">{plan.price}</span>
              </div>

              <ul className="mt-6 space-y-3">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <span className={f.included ? "text-green-600" : "text-gray-400"}>
                      {f.included ? "✔" : "✖"}
                    </span>
                    <span className={f.included ? "" : "text-gray-400"}>
                      {f.label}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() =>
                  handlePlanChange(plan.planId, plan.id )
                }
                disabled={isCurrent || loading === plan.id}
                className={`mt-8 w-full py-3 rounded-xl font-medium transition 
                  ${isCurrent
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-black text-white hover:bg-gray-900"}`}
              >
                {isCurrent
                  ? "Plan actuel"
                  : loading === plan.id
                  ? "Chargement…"
                  : "Choisir ce plan"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}