import { Plan } from "@/types";

export const plans: Plan[] =  [
	{
		id: "free",
		name: "Gratuit",
		price: "0€ / mois",
		planId: "FREE",
		highlighted: false,
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
		highlighted: false,
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