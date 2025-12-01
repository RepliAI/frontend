"use client";

export function ConnectGmailButton() {
  async function handleConnect() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/gmail/connect`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      alert("Erreur lors de la connexion Gmail.");
      return;
    }

    const data = await res.json();

    window.location.href = data.url;
  }

  return (
    <button
      onClick={handleConnect}
      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
    >
      Connecter mon compte Gmail
    </button>
  );
}