import { cookies } from "next/headers";
import { GmailConnectCard } from "./components/GmailConnectCard";

export const revalidate = 0;

export default async function SettingsPage() {
  const token = (await cookies()).get("access_token")?.value;
  if (!token) return <div>Unauthorized</div>;

  const res = await fetch(`${process.env.BACKEND_URL}/gmail/status`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  const status = res.ok ? await res.json() : { connected: false };

  return (
    <div className="p-6 space-y-10 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold">Paramètres</h1>

      <GmailConnectCard connected={status.connected} />
    </div>
  );
}