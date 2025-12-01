import { ConnectGmailButton } from "./components/ConnectGmailButton";

export default function SettingsPage() {
  return (
    <div className="p-10 space-y-6">
      <h1 className="text-2xl font-semibold">Paramètres</h1>

      <div className="p-4 border rounded-lg">
        <h2 className="text-lg font-medium mb-2">Connexion Gmail</h2>
        <ConnectGmailButton />
      </div>
    </div>
  );
}