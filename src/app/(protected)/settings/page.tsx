"use client";

import { useGmailStatus } from "@/app/hooks/useGmailStatus";
import { useUserPreferences } from "@/app/hooks/useUserPreferencies";

import { PreferencesCard } from "./components/PreferencesCard";
import { GmailConnectCard } from "./components/GmailConnectCard";

export default function SettingsPage() {
  const { loading: gmailLoading, connected } = useGmailStatus();
  const { loading: prefLoading, preferences } = useUserPreferences();

  if (gmailLoading || prefLoading) {
    return <div className="p-6">Chargement...</div>;
  }

  return (
    <div className="p-6 space-y-10 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold">Paramètres</h1>

      <GmailConnectCard connected={connected} />

      <PreferencesCard preferences={preferences} />
    </div>
  );
}