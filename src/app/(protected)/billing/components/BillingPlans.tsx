"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const plans = [
  {
    id: "free",
    name: "Gratuit",
    price: "0€ / mois",
    highlighted: false,
    description:
      "Idéal pour découvrir la plateforme et gérer vos premiers tickets.",
    planId: "FREE",
    features: [
      { label: "5 tickets / mois", included: true },
      { label: "Import Gmail automatique", included: false },
      { label: "Génération IA illimitée", included: false },
      { label: "Envoi automatique IA", included: false },
      { label: "Support client prioritaire", included: false },
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: "29€ / mois",
    highlighted: true,
    badge: "Le plus populaire",
    description:
      "Parfait pour automatiser votre support et accélérer vos réponses.",
    planId: process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO,
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
    highlighted: false,
    description:
      "Automatisation maximale pour équipes support exigeantes.",
    planId: process.env.NEXT_PUBLIC_STRIPE_PRICE_BUSINESS,
    features: [
      { label: "Tickets illimités", included: true },
      { label: "Import Gmail automatique", included: true },
      { label: "Génération IA illimitée", included: true },
      { label: "Envoi automatique IA", included: true },
      { label: "Support prioritaire", included: true },
    ],
  },
];

export default function BillingPlans({ current }: { current: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  const handleUnsubscribe = async () => {
    try {
      setLoading("free");

      const res = await fetch("/api/billing/unsuscribe", {
        method: "POST",
      });

      if (!res.ok) {
        console.error("Unsubscribe failed");
        return;
      }

      router.refresh();
    } finally {
      setLoading(null);
    }
  };

  async function subscribe(planId: string, id: string) {
    if (planId === current?.plan || planId === "free") return;
    setLoading(planId);

    const res = await fetch("/api/billing/checkout", {
      method: "POST",
      body: JSON.stringify({ priceId: planId, plan: id }),
    });

    const data = await res.json();
    if (data.url) router.push(data.url);

    setLoading(null);
  }

  return (
    <div className="max-w-5xl mx-auto py-16 px-6 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">
          Choisissez le plan adapté à votre croissance
        </h1>
        <p className="text-gray-600 text-lg">
          Passez au niveau supérieur lorsque vous êtes prêt. Le plan gratuit reste accessible sans engagement.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan) => {
          const isCurrent = current?.plan === plan.id;

          return (
            <div
              key={plan.id}
              className={`relative rounded-2xl border p-8 bg-white shadow-sm transition hover:shadow-md ${
                plan.highlighted ? "border-black shadow-lg" : "border-gray-200"
              }`}
            >
              {plan.badge && (
                <div className="absolute top-4 right-4 bg-black text-white text-xs px-3 py-1 rounded-full">
                  {plan.badge}
                </div>
              )}

              <h2 className="text-2xl font-semibold">{plan.name}</h2>
              <p className="text-gray-600 mt-1">{plan.description}</p>

              <div className="mt-6">
                <span className="text-4xl font-bold">{plan.price}</span>
              </div>

              <ul className="mt-6 space-y-3">
                {plan.features.map((f, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm">
                    {f.included ? (
                      <span className="text-green-600">✔</span>
                    ) : (
                      <span className="text-gray-400">✖</span>
                    )}
                    <span
                      className={f.included ? "text-gray-900" : "text-gray-400"}
                    >
                      {f.label}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => plan.id !== 'free'? subscribe(plan.planId!, plan.id): handleUnsubscribe()}
                disabled={isCurrent || loading === plan.id}
                className={`mt-8 w-full py-3 rounded-xl font-medium transition ${
                  isCurrent
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : plan.highlighted
                    ? "bg-black text-white hover:bg-gray-900"
                    : "bg-gray-900 text-white hover:bg-black"
                }`}
              >
                {isCurrent
                  ? "Plan actuel"
                  : loading === plan.id
                  ? "Redirection…"
                  : "Choisir ce plan"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}