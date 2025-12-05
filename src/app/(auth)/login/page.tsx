'use client';

import { useState } from 'react';

import { authService } from '@/services/auth.service';

type AuthMode = 'login' | 'register' | 'forgot';

export default function AuthPage() {
	const [mode, setMode] = useState<AuthMode>('login');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');
	const [name, setName] = useState('');
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const handleLogin =  async () => {
		try {
		  await authService.login(email, password);
		  window.location.href = "/tickets";
		} catch (err: any) {
		  throw new Error(err.message || "Impossible de se connecter.");
		}
	}
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setSuccess(null);

		if (mode === 'register' && password !== passwordConfirm) {
			setError('Les mots de passe ne correspondent pas.');
			return;
		}

		setLoading(true);
		try {
			if (mode === 'login') {
				await handleLogin();
			}
			if (mode === 'register') {
				const res = await fetch('/api/auth/register', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ email, password, name }),
				});

				if (!res.ok) {
					const data = await res.json().catch(() => ({}));
					throw new Error(data.message || "Impossible de créer le compte.");
				}

				setSuccess('Compte créé avec succès. Vous pouvez vous connecter.');
				setMode('login');
				return;
			}

			if (mode === 'forgot') {
				const res = await fetch('/api/auth/forgot-password', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ email }),
				});

				if (!res.ok) {
					const data = await res.json().catch(() => ({}));
					throw new Error(data.message || "Impossible d’envoyer l’email de réinitialisation.");
				}

				setSuccess('Un email de réinitialisation a été envoyé.');
				return;
			}
		} catch (err: any) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	}

	const title = mode === 'login' ? 'Connexion' : mode === 'register' ? 'Créer un compte' : 'Mot de passe oublié';

	const subtitle = mode === 'login' ? 'Accédez à votre espace RepliAI.' : mode === 'register' ? 'Rejoignez RepliAI en quelques secondes.' : 'Recevez un lien de réinitialisation.';

	return (
		<div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-gray-50 text-gray-900">
			<div className="hidden lg:flex relative items-center justify-center overflow-hidden">
				<img src="/auth-hero.png" className="absolute inset-0 h-full w-full object-cover brightness-95" alt="Auth Hero"/>
				<div className="absolute inset-0 bg-white/60 backdrop-blur-md" />
				<div className="relative z-10 max-w-xl px-12 space-y-8">
					<div className="text-sm font-medium text-gray-700 tracking-wide">
						REPLIAI — SUPPORT CLIENT PAR IA
					</div>
					<h1 className="text-4xl font-semibold leading-tight">
						Automatisez vos réponses clients
						<span className="block text-blue-600 font-bold">
							tout en restant professionnel.
						</span>
					</h1>
					<p className="text-gray-600 text-base leading-relaxed">
						RepliAI analyse vos emails Gmail, crée des tickets automatiquement
						et génère des réponses prêtes à envoyer, adaptées à votre ton.
					</p>
					<div className="grid grid-cols-2 gap-6 pt-2">
						<Feature title="Connexion Gmail" desc="Import automatique des emails" />
						<Feature title="IA intégrée" desc="Réponses prêtes en 1 clic" />
						<Feature title="Dashboard clair" desc="Vue globale de votre support" />
						<Feature title="Abonnements flexibles" desc="Upgrade en un clic" />
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
						<AuthTab label="Connexion" mode="login" current={mode} onClick={setMode} />
						<AuthTab label="Inscription" mode="register" current={mode} onClick={setMode} />
						<AuthTab label="Mot de passe oublié" mode="forgot" current={mode} onClick={setMode} />
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
									<label className="text-sm font-medium text-gray-700">Nom complet</label>
									<input
										type="text"
										required
										placeholder="Nicolas Martin"
										className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
										value={name}
										onChange={(e) => setName(e.target.value)}
									/>
								</div>
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
							{loading ? 'Chargement...' : mode === 'login' ? 'Se connecter' : mode === 'register' ? "Créer mon compte" : 'Envoyer le lien' }
						</button>
					</form>
					<p className="mt-6 text-center text-xs text-gray-500">
						© {new Date().getFullYear()} RepliAI — Tous droits réservés.
					</p>
				</div>
			</div>
		</div>
	);
}

function AuthTab({
	label,
	mode,
	current,
	onClick,
}: {
	label: string;
	mode: AuthMode;
	current: AuthMode;
	onClick: (m: AuthMode) => void;
}) {
	const active = current === mode;
	return (
		<button
			type="button"
			onClick={() => onClick(mode)}
			className={`flex-1 px-4 py-1.5 rounded-full transition ${active
					? 'bg-white shadow-sm text-gray-900'
					: 'text-gray-500 hover:text-gray-700'
				}`}
		>
			{label}
		</button>
	);
}

function Feature({ title, desc }: { title: string; desc: string }) {
	return (
		<div className="space-y-1">
			<div className="text-sm font-semibold text-gray-900">{title}</div>
			<div className="text-xs text-gray-600">{desc}</div>
		</div>
	);
}