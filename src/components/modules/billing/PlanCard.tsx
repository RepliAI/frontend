import { useRouter } from "next/navigation";
import { useState } from "react";

import { Plan, PlanFeatures } from "@/types";
import { billingService } from "@/services/billing.service";
import PlanFeature from "./PlanFeatures";

interface PlanCardProps {
	plan: Plan;
	isCurrent: boolean;
	setMessage: React.Dispatch<React.SetStateAction<string | null>>
}
export default function PlanCard({ plan, isCurrent, setMessage }: PlanCardProps) {
	const highlight = plan.highlighted ? "border-blue-600 shadow-xl shadow-blue-100/40 bg-white" : "border-gray-200 bg-white";
	const [loading, setLoading] = useState<boolean>(false);
	const router = useRouter();

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
				{plan.features.map((feature: PlanFeatures, i: number) => (
					<PlanFeature key={i} feature={feature}/>
				))}
			</ul>
			<button onClick={() => handlePlanChange(plan.planId, plan.id)} disabled={isCurrent || loading} className={`mt-8 w-full py-3 rounded-xl font-medium transition-all ${isCurrent ? "bg-gray-100 text-gray-500 cursor-not-allowed" : "bg-black text-white hover:bg-gray-900"}`}>
				{isCurrent ? "Plan actuel" : loading ? "Chargement…" : "Choisir ce plan"}
			</button>
		</div>
	)
}