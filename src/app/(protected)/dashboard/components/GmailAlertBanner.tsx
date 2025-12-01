"use client";

import Link from "next/link";
import { useGmailStatus } from "@/app/hooks/useGmailStatus";
import { AlertTriangle, CheckCircle } from "lucide-react";

export function GmailAlertBanner() {
  const { loading, connected } = useGmailStatus();

  if (loading) return null;

  if (connected) {
    return (
      <div className="w-full p-3 bg-green-100 border border-green-300 text-green-800 rounded-lg flex items-center gap-2">
        <CheckCircle size={20} />
        <span>Gmail connecté — synchronisation active.</span>
      </div>
    );
  }

  return (
    <div className="w-full p-3 bg-red-100 border border-red-300 text-red-800 rounded-lg flex items-center justify-between">
      <div className="flex items-center gap-2">
        <AlertTriangle size={20} />
        <span>Vous n'avez pas encore connecté Gmail. Aucun ticket ne sera importé.</span>
      </div>
      <Link
        href="/gmail/connect"
        className="px-3 py-1 bg-red-600 text-white rounded-md text-sm hover:bg-red-700"
      >
        Connecter Gmail
      </Link>
    </div>
  );
}