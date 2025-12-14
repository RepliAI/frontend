"use client";

import { useEffect, useState } from "react";
import { Mail, ShieldAlert, User } from "lucide-react";

import { PageHeader } from "@/components/layout/pageHeader";
import { useGmailStatus } from "@/hooks/useGmailStatus";
import { apiFetch } from "@/lib/api-client";
import { DangerModal } from "@/components/ui/DangerModal";
import { PlanId } from "@/types/billing.type";
import { Profile } from "@/types";
import { profileService } from "@/services/profile.service";

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [newEmail, setNewEmail] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  const [dangerLoading, setDangerLoading] =
    useState<"logout-all" | "delete" | null>(null);

  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState("");

  const { connected: gmailConnectedFromHook } = useGmailStatus();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data: Profile = await profileService.getProfile();
        setProfile(data);
        setNewEmail(data.email);
      } catch {
        setError("Impossible de charger votre profil.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const gmailConnected =
    gmailConnectedFromHook ?? profile?.gmailConnected ?? false;

  const planLabel = (plan: PlanId) =>
    plan === "free" ? "Gratuit" : plan === "pro" ? "Pro" : "Business";

  const planBadge = (plan: PlanId) =>
    plan === "free"
      ? "bg-gray-100 text-gray-700 border-gray-200"
      : plan === "pro"
        ? "bg-blue-50 text-blue-700 border-blue-200"
        : "bg-amber-50 text-amber-700 border-amber-200";

  const handleEmailChangeRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError(null);
    setEmailSuccess(null);
    setEmailLoading(true);

    try {
      await profileService.changeEmailRequest(newEmail);
      setEmailSuccess(
        "Un email de validation vous a été envoyé. Le changement sera effectif après confirmation."
      );
    } catch (err: any) {
      setEmailError(err?.message || "Impossible d'envoyer l'email.");
    } finally {
      setEmailLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setDangerLoading("delete");
    try {
      await profileService.deleteAccount();
      window.location.href = "/authentication";
    } finally {
      setDangerLoading(null);
    }
  };

  if (loading) {
    return <div className="p-6 text-gray-500">Chargement…</div>;
  }

  if (!profile || error) {
    return (
      <div className="p-6 max-w-xl mx-auto rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm">
        {error || "Profil introuvable"}
      </div>
    );
  }

  return (
    <>
      <DangerModal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        title="Supprimer définitivement votre compte"
        description="Cette action est irréversible. Tapez SUPPRIMER pour confirmer."
        confirmLabel="Supprimer définitivement"
        loading={dangerLoading === "delete"}
        danger
        inputValue={deleteConfirm}
        onInputChange={setDeleteConfirm}
        confirmDisabled={deleteConfirm !== "SUPPRIMER"}
        onConfirm={handleDeleteAccount}
      />

      <div className="p-6 max-w-4xl mx-auto space-y-10">
        <PageHeader
          icon={<User size={18} />}
          title="Profil"
          subtitle="Gérez vos informations personnelles et la sécurité de votre compte."
        />
        <section className="rounded-2xl bg-white border shadow-sm p-6 space-y-4">
          <div className="flex justify-between">
            <div>
              <h2 className="font-semibold text-gray-900">
                Informations du compte
              </h2>
              <p className="text-sm text-gray-500">
                Email et abonnement actif
              </p>
            </div>
            <span className={`inline-flex items-center h-7 px-3 rounded-full text-xs font-medium border ${planBadge(profile.plan)}`}>
              {planLabel(profile.plan)}
            </span>
          </div>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-xs text-gray-500">Email</p>
              <p className="text-gray-900">{profile.email}</p>
            </div>
            {profile.createdAt && (
              <div>
                <p className="text-xs text-gray-500">Compte créé le</p>
                <p className="text-gray-900">
                  {new Date(profile.createdAt).toLocaleDateString("fr-FR")}
                </p>
              </div>
            )}
          </div>
        </section>
        <section className="rounded-2xl bg-white border shadow-sm p-6 space-y-4">
          <div className="flex gap-3 items-center">
            <Mail size={16} className="text-blue-600" />
            <div>
              <h2 className="text-sm font-semibold">
                Modifier votre adresse email
              </h2>
              <p className="text-xs text-gray-500">
                Un email de confirmation sera requis.
              </p>
            </div>
          </div>
          {emailSuccess && (
            <div className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
              {emailSuccess}
            </div>
          )}
          {emailError && (
            <div className="text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {emailError}
            </div>
          )}

          <form onSubmit={handleEmailChangeRequest} className="grid md:grid-cols-[1fr_auto] gap-3">
            <input
              type="email"
              required
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="rounded-xl border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-200 outline-none"
            />
            <button disabled={emailLoading} className="rounded-xl bg-black text-white px-4 py-2 text-sm hover:bg-gray-900 disabled:opacity-50">
              {emailLoading ? "Envoi…" : "Valider"}
            </button>
          </form>
        </section>
        <section className="rounded-2xl bg-white border shadow-sm p-6 space-y-2">
          <h2 className="text-sm font-semibold">Connexion Gmail</h2>
          <p className="text-xs text-gray-500">
            Statut actuel de l’intégration Gmail.
          </p>
          <span className={`inline-block mt-2 text-xs px-2 py-1 rounded-full border ${gmailConnected ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-red-50 text-red-700 border-red-200"}`}>
            {gmailConnected ? "Connecté" : "Non connecté"}
          </span>
        </section>
        <section className="rounded-2xl bg-red-50 border border-red-200 p-6 space-y-4">
          <div className="flex gap-3 items-center text-red-700">
            <ShieldAlert size={16} />
            <div>
              <h2 className="font-semibold text-sm">Zone à risque</h2>
              <p className="text-xs">
                Actions sensibles et irréversibles
              </p>
            </div>
          </div>
          <div className="flex justify-between items-center bg-white rounded-xl p-4 border border-red-200">
            <div>
              <p className="text-sm font-semibold text-red-800">
                Supprimer le compte
              </p>
              <p className="text-xs text-red-600">
                Suppression définitive de toutes vos données
              </p>
            </div>
            <button onClick={() => setOpenDeleteModal(true)} className="text-xs bg-red-600 text-white rounded-lg px-3 py-1.5 hover:bg-red-700">
              Supprimer
            </button>
          </div>
        </section>
      </div>
    </>
  );
}
