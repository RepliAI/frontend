'use client';

import { useState } from 'react';

import { AuthMode } from '@/types';
import { authService } from '@/services/auth.service';
import { authTabsList, featureList } from '@/utils/constants';
import Feature from '@/components/modules/auth/Feature';
import AuthTab from '@/components/modules/auth/AuthTab';


export default function AuthPage() {
	const [mode, setMode] = useState<AuthMode>(AuthMode.Login);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const handleLogin = async () => {
		try {
			await authService.login(email, password);
			window.location.href = "/tickets";
		} catch (err) {
			throw new Error(err instanceof Error ? err.message : "Impossible de se connecter.");
		}
	}

	const handleRegister = async () => {
		if (password !== passwordConfirm) {
			throw new  Error('Les mots de passe ne correspondent pas.')
		}
		try {
			await authService.register(email, password);
			setSuccess('Compte créé avec succès. Vous pouvez vous connecter.');
			setMode(AuthMode.Login);
		} catch (err) {
			throw new Error(err instanceof Error ? err.message : "Impossible de se connecter.");
		}
	}

	const handleForgotPassword = async () => {
		await authService.forgotPassword(email);
		setSuccess('Un email de réinitialisation a été envoyé.');
	}
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setSuccess(null);
		setLoading(true);
		console.log("🚀 ~ handleSubmit ~ mode:", mode)
		try {
			switch(mode) {
				case 'login':
					await handleLogin();
				break;
				case 'register':
					await handleRegister();
				break;
				case 'forgot':
					await handleForgotPassword();
				break;
			}
		} catch (err: any) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	}

	const title = mode === 'login' ? 'Connexion' : mode === 'register' ? 'Créer un compte' : 'Mot de passe oublié';

	const subtitle = mode === 'login' ? 'Accédez à votre espace ReplyAI.' : mode === 'register' ? 'Rejoignez ReplyAI en quelques secondes.' : 'Recevez un lien de réinitialisation.';

	return (
		<div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-gray-50 text-gray-900">
			<div className="hidden lg:flex relative items-center justify-center overflow-hidden">
				<img src="/auth-hero.png" className="absolute inset-0 h-full w-full object-cover brightness-95" alt="Auth Hero" />
				<div className="absolute inset-0 bg-white/60 backdrop-blur-md" />
				<div className="relative z-10 max-w-xl px-12 space-y-8">
					<div className="text-sm font-medium text-gray-700 tracking-wide">
						REPLYAI — SUPPORT CLIENT PAR IA
					</div>
					<h1 className="text-4xl font-semibold leading-tight">
						Automatisez vos réponses clients
						<span className="block text-blue-600 font-bold">
							tout en restant professionnel.
						</span>
					</h1>
					<p className="text-gray-600 text-base leading-relaxed">
						ReplyAI analyse vos emails Gmail, crée des tickets automatiquement
						et génère des réponses prêtes à envoyer, adaptées à votre ton.
					</p>
					<div className="grid grid-cols-2 gap-6 pt-2">
						{featureList.map((feature, index) => (
							<Feature key={index} title={feature.title} desc={feature.desc} />
						))}
					</div>
				</div>
			</div>
			<div className="flex flex-col justify-center items-center px-6 py-12">
				<div className="w-full max-w-md space-y-8">
					<header className="text-center mb-6">
						<div className="mx-auto h-12 w-12 rounded-xl bg-blue-600 text-white flex items-center justify-center text-lg font-bold">
							R
						</div>
						<h2 className="mt-4 text-2xl font-semibold">{title}</h2>
						<p className="text-sm text-gray-500">{subtitle}</p>
					</header>
					<div className="flex gap-2 bg-gray-100 p-1 rounded-full text-sm font-medium">
						{authTabsList.map((tab, index) => (
							<AuthTab key={index} label={tab.label} mode={tab.mode} current={mode} onClick={setMode} />
						))}
					</div>
					{error && (
						<div className="rounded-lg bg-red-100 border border-red-300 px-3 py-2 text-sm text-red-700">
							{error}
						</div>
					)}
					{success && (
						<div className="rounded-lg bg-green-100 border border-green-300 px-3 py-2 text-sm text-green-700">
							{success}
						</div>
					)}
					<form onSubmit={handleSubmit} className="space-y-4">
						<div>
							<label className="text-sm font-medium text-gray-700">
								Adresse email
							</label>
							<input
								type="email"
								required
								placeholder="vous@exemple.com"
								className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						{(mode === 'login' || mode === 'register') && (
							<div>
								<label className="text-sm font-medium text-gray-700">Mot de passe</label>
								<input
									type="password"
									required
									placeholder="••••••••"
									className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
						)}
						{mode === 'register' && (
							<>
								<div>
									<label className="text-sm font-medium text-gray-700">
										Confirmer le mot de passe
									</label>
									<input
										type="password"
										required
										placeholder="••••••••"
										className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
										value={passwordConfirm}
										onChange={(e) => setPasswordConfirm(e.target.value)}
									/>
								</div>
							</>
						)}
						<button type="submit" disabled={loading} className="w-full rounded-lg bg-blue-600 text-white py-2 text-sm font-medium hover:bg-blue-700 transition shadow-sm">
							{loading ? 'Chargement...' : mode === 'login' ? 'Se connecter' : mode === 'register' ? "Créer mon compte" : 'Envoyer le lien'}
						</button>
					</form>
					<p className="mt-6 text-center text-xs text-gray-500">
						© {new Date().getFullYear()} ReplyAI — Tous droits réservés.
					</p>
				</div>
			</div>
		</div>
	);
}

