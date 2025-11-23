"use client";

import { usePathname, useRouter } from "next/navigation";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  }

  const pageTitle = pathname.startsWith("/tickets")
    ? "Tickets"
    : pathname.startsWith("/dashboard")
    ? "Dashboard"
    : pathname.startsWith("/profil")
    ? "Profil"
    : "RepliAI";

  return (
    <header className="h-16 bg-white shadow flex items-center justify-between px-6">
      <h2 className="text-lg font-semibold">{pageTitle}</h2>

      <button
        onClick={logout}
        className="px-4 py-2 bg-black text-white rounded-lg"
      >
        Déconnexion
      </button>
    </header>
  );
}