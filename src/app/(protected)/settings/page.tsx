"use client";

import { Settings } from "lucide-react";

import { useGmailStatus } from "@/hooks/useGmailStatus";
import { useUserPreferences } from "@/hooks/useUserPreferencies";
import { PageHeader } from "@/components/layout/pageHeader";
import { PreferencesCard } from "@/components/modules/settings/PreferencesCard";
import { GmailConnectCard } from "@/components/modules/settings/GmailConnectCard";

export default function SettingsPage() {
  const { loading: gmailLoading, connected } = useGmailStatus();
  const { loading: prefLoading, preferences } = useUserPreferences();

  if (gmailLoading || prefLoading) {
    return <div className="p-6">Chargement...</div>;
  }

  return (
    <div className="p-6 space-y-10 max-w-3xl mx-auto">
      <PageHeader  icon={<Settings size={18} />}  title="Paramètres"  subtitle="Personnalisez votre expérience et vos préférences IA." />
      <GmailConnectCard connected={connected} />
      <PreferencesCard preferences={preferences} />
    </div>
  );
}