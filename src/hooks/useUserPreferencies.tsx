"use client";

import { useEffect, useState } from "react";

export function useUserPreferences() {
  const [loading, setLoading] = useState(true);
  const [preferences, setPreferences] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/preferences/get");
      const data = await res.json();
      setPreferences(data);
      setLoading(false);
    }
    load();
  }, []);

  async function updatePreferences(update: any) {
    const res = await fetch("/api/preferences/update", {
      method: "PATCH",
      body: JSON.stringify(update),
    });
    const data = await res.json();
    setPreferences(data);
    return data;
  }

  return {
    loading,
    preferences,
    updatePreferences,
  };
}