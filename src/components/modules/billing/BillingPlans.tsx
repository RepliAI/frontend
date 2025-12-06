"use client";

import { useState } from "react";

import { plans } from "@/utils/constants";
import PlanCard from "./PlanCard";

export default function BillingPlans({ current }: { current: any }) {
	const [message, setMessage] = useState<string | null>(null);

	return (
		<div className="max-w-5xl mx-auto py-10 px-6 space-y-8">
			{message && (
				<p className="text-center text-green-600 font-medium">{message}</p>
			)}
			<div className="grid md:grid-cols-3 gap-8">
				{plans.map((plan, index) => {
					const isCurrent = current?.plan === plan.id;
					return (
						<PlanCard key={index} plan={plan} isCurrent={isCurrent} setMessage={setMessage} />
					)
				})}
			</div>
		</div>
	);
}