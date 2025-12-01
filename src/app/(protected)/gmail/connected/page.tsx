export default function GmailConnectedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-6 p-10">
      <h1 className="text-2xl font-bold text-green-600">
        Votre compte Gmail est connecté 🎉
      </h1>

      <p className="text-gray-700 max-w-md text-center">
        Vous pouvez maintenant importer vos emails automatiquement et envoyer des réponses
        directement depuis l’application.
      </p>

      <a
        href="/dashboard"
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Retour au tableau de bord
      </a>
    </div>
  );
}