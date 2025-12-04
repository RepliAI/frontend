"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function BillingSuccessPage() {
	return (
		<div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-24">
			<div className="relative rounded-3xl w-full max-w-2xl p-14 text-center bg-white/70 backdrop-blur-xl border border-gray-200 shadow-lg animate-fade-up">
				<div className="absolute inset-0 rounded-3xl -z-10 bg-gradient-to-br from-blue-100/60 to-indigo-200/40 blur-2xl opacity-40" />
				<div className="mx-auto w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 shadow-xl flex items-center justify-center animate-pop">
					<CheckCircle className="w-14 h-14 text-white" />
				</div>
				<h1 className="text-4xl font-bold mt-10 tracking-tight text-gray-900">
					Paiement confirmé 🎉
				</h1>

				<p className="text-gray-600 mt-5 text-lg leading-relaxed max-w-md mx-auto">
					Votre abonnement est maintenant actif.
					Merci de votre confiance — vous disposez désormais de toutes les fonctionnalités avancées.
				</p>
				<div className="my-10 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent w-40 mx-auto" />
				<Link href="/dashboard" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-white font-semibold text-lg bg-gradient-to-r from-black to-gray-900 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.03]">
					Accéder au tableau de bord →
				</Link>
				<p className="text-gray-500 text-sm mt-6">
					Une facture vous a été envoyée par e-mail.
				</p>
			</div>
		</div>

	);
}
