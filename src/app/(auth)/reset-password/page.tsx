"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { authService } from "@/services/auth.service";
import InvalidResetLink from "@/components/modules/auth/InvalidResetLink";

export default function ResetPasswordPage() {
    const params = useSearchParams();
    const token = params.get("token");

    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    if (!token) {
        return <InvalidResetLink />
    }

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (password !== confirm) {
            throw new Error("Les mots de passe ne correspondent pas.");
        }

        setLoading(true);
        try {
            await authService.resetPassword(token, password);
            setSuccess("Votre mot de passe a été modifié. Vous pouvez maintenant vous connecter.");
        } catch (error) {
            const message: string = error instanceof Error ? error.message : 'Impossible de réinitialiser le mot de passe';
            setError(message);
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-6 py-20 bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="relative w-full max-w-md p-10 rounded-3xl  bg-white/70 backdrop-blur-2xl  border border-gray-200/60 shadow-[0_8px_40px_rgba(0,0,0,0.06)] animate-fade-up space-y-8">
                <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-blue-200/50 to-indigo-300/40 blur-2xl opacity-40" />
                <div className="text-center">
                    <div className="mx-auto h-14 w-14 flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 shadow-xl text-white text-2xl font-bold">
                        🔐
                    </div>
                    <h1 className="mt-6 text-3xl font-semibold tracking-tight text-gray-900">
                        Réinitialiser votre mot de passe
                    </h1>
                    <p className="text-sm text-gray-600 mt-2 max-w-sm mx-auto">
                        Définissez un nouveau mot de passe sécurisé pour accéder à ReplyAI.
                    </p>
                </div>
                {success && (
                    <div className="space-y-6 animate-fade-in">
                        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl text-sm">
                            {success}
                        </div>
                        <a href="/authentication" className="block w-full text-center py-3 rounded-xl font-medium text-white text-sm bg-gradient-to-r from-black to-gray-900 shadow-lg hover:shadow-xl hover:scale-[1.03] transition-all">
                            Se connecter →
                        </a>
                    </div>
                )}
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm animate-fade-in">
                        {error}
                    </div>
                )}
                {!success && (
                    <form onSubmit={handleResetPassword} className="space-y-5">
                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                Nouveau mot de passe
                            </label>
                            <input
                                type="password"
                                className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                Confirmer le mot de passe
                            </label>
                            <input
                                type="password"
                                className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5  text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                                value={confirm}
                                onChange={(e) => setConfirm(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 rounded-xl font-medium text-white text-sm bg-gradient-to-r from-black to-gray-900 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all disabled:opacity-50 disabled:scale-100">
                            {loading ? "Chargement…" : "Réinitialiser le mot de passe"}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
