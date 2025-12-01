"use client";

import { useEffect, useState } from "react";

export function useGmailStatus() {
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/gmail/status", {
          cache: "no-store",
        });

        if (!res.ok) {
          setConnected(false);
        } else {
          const data = await res.json();
          setConnected(!!data.connected);
        }
      } catch (err) {
        console.error("gmail status error", err);
        setConnected(false);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return { loading, connected };
}