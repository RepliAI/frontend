"use client";

import { useEffect, useState } from "react";
import { handleUnauthorized } from "@/lib/auth-utils";

export function useUserPreferences() {
  const [loading, setLoading] = useState(true);
  const [preferences, setPreferences] = useState<any>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/preferences/get");
        
        if (res.status === 401) {
          await handleUnauthorized();
          return;
        }
        
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        
        const data = await res.json();
        setPreferences(data);
      } catch (error) {
        console.error('Error loading preferences:', error);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function updatePreferences(update: any) {
    const res = await fetch("/api/preferences/update", {
      method: "PATCH",
      body: JSON.stringify(update),
    });
    
    if (res.status === 401) {
      await handleUnauthorized();
      throw new Error('Session expirée');
    }
    
    if (!res.ok) {
      const error = await res.json().catch(() => ({ message: `HTTP ${res.status}` }));
      throw new Error(error.message || `HTTP ${res.status}`);
    }
    
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