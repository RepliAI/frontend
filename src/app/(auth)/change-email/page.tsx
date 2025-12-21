"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { MailCheck } from "lucide-react";

import { authService } from "@/services/auth.service";

export default function ChangeEmailPage() {
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get("token");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
        <div className="max-w-md w-full rounded-2xl border border-red-200 bg-red-50 p-6 text-center space-y-3">
          <h1 className="text-lg font-semibold text-red-700">
            Lien invalide
          </h1>
          <p className="text-sm text-red-600">
            Le lien de validation est invalide ou incomplet.
          </p>
        </div>
      </div>
    );
  }

  const handleConfirmChange = async () => {
    setLoading(true);
    setError(null);

    try {
      await authService.confirmEmailChange(token!);
      setSuccess("Votre adresse email a bien été mise à jour. Vous pouvez maintenant vous reconnecter.");
    } catch (err: any) {
      setError(err?.message || "Impossible de confirmer le changement d'email. Le lien est peut-être expiré.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="relative w-full max-w-md p-10 rounded-3xl bg-white/80 backdrop-blur-xl border border-gray-200 shadow-[0_8px_40px_rgba(0,0,0,0.08)] space-y-8">
        <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-blue-200/40 to-indigo-300/40 blur-2xl opacity-40" />
        <div className="text-center space-y-4">
          <div className="mx-auto h-14 w-14 flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-lg">
            <MailCheck size={22} />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
            Confirmer votre nouvelle adresse email
          </h1>
          <p className="text-sm text-gray-600 max-w-sm mx-auto">
            Cliquez sur le bouton ci-dessous pour finaliser le changement
            d’adresse email de votre compte ReplyAI.
          </p>
        </div>
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}
        {success && (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {success}
          </div>
        )}
        {!success && (
          <button onClick={handleConfirmChange} disabled={loading} className="w-full py-3 rounded-xl font-medium text-white text-sm bg-gradient-to-r from-black to-gray-900 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all disabled:opacity-50 disabled:scale-100">
            {loading ? "Confirmation…" : "Confirmer le changement d’email"}
          </button>
        )}

        {success && (
          <button onClick={() => router.push("/authentication")} className="w-full py-3 rounded-xl font-medium text-sm border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 transition">
            Retour à la page de connexion
          </button>
        )}
      </div>
    </div>
  );
}