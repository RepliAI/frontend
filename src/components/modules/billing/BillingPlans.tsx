"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { billingService } from "@/services/billing.service";

const plans = [
	{
		id: "free",
		name: "Gratuit",
		price: "0€ / mois",
		planId: "FREE",
		description:
			"Pour découvrir la plateforme avant de passer à la vitesse supérieure.",
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
			"La meilleure option pour automatiser votre support et accélérer vos réponses.",
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
			"Automatisation complète et support ultra-prioritaire pour équipes exigeantes.",
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
	const [loading, setLoading] = useState<boolean>(false);
	const [message, setMessage] = useState<string | null>(null);

	const handlePlanChange = async (priceId: string, plan: string) => {
		setLoading(true);
		setMessage(null);
		try {
			const data = await billingService.getCheckoutUrl(priceId, plan);
			if (data.url) {
				router.push(data.url);
				return;
			}
		} finally {

		}
		
		setMessage("Votre changement d’offre sera appliqué à la fin de la période en cours.");
		setLoading(false);
		router.refresh();
	};

	return (
		<div className="max-w-5xl mx-auto py-10 px-6 space-y-8">
			{message && (
				<p className="text-center text-green-600 font-medium">{message}</p>
			)}
			<div className="grid md:grid-cols-3 gap-8">
				{plans.map((plan) => {
					const isCurrent = current?.plan === plan.id;
					const highlight = plan.highlighted ? "border-blue-600 shadow-xl shadow-blue-100/40 bg-white" : "border-gray-200 bg-white";
					return (
						<div key={plan.id} className={`relative p-8 rounded-2xl border transition-all duration-300 hover:shadow-lg hover:scale-[1.01] ${highlight}`}>
							{isCurrent && (
								<div className="absolute top-4 right-4 px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full border border-blue-200">
									Actuel
								</div>
							)}
							<div className="min-h-[110px] flex flex-col justify-between">
								<h2 className="text-2xl font-semibold tracking-tight">
									{plan.name}
								</h2>
								<p className="text-gray-600 mt-1 text-sm leading-relaxed">
									{plan.description}
								</p>
							</div>
							<div className="mt-6">
								<span className="text-4xl font-bold tracking-tight">
									{plan.price}
								</span>
							</div>
							<ul className="mt-6 space-y-3">
								{plan.features.map((f, i) => (
									<li key={i} className="flex items-center gap-2 text-sm text-gray-700">
										<span className={`flex h-5 w-5 items-center justify-center rounded-full border text-xs ${f.included ? "bg-green-100 border-green-300 text-green-700" : "bg-gray-100 border-gray-300 text-gray-400" }`}>
											{f.included ? "✓" : "✕"}
										</span>
										<span className={!f.included ? "text-gray-400" : ""}>
											{f.label}
										</span>
									</li>
								))}
							</ul>
							<button onClick={() => handlePlanChange(plan.planId, plan.id)} disabled={isCurrent || loading } className={`mt-8 w-full py-3 rounded-xl font-medium transition-all ${isCurrent ? "bg-gray-100 text-gray-500 cursor-not-allowed" : "bg-black text-white hover:bg-gray-900"}`}>
								{isCurrent ? "Plan actuel" : loading  ? "Chargement…" : "Choisir ce plan"}
							</button>
						</div>
					);
				})}
			</div>
		</div>
	);
}