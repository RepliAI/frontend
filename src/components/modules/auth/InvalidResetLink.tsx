export default function InvalidResetLink() {
    return (
        <div className="min-h-screen flex items-center justify-center px-6 py-20 bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="relative w-full max-w-md p-10 rounded-3xl  bg-white/70 backdrop-blur-2xl  border border-red-200/60 shadow-[0_8px_40px_rgba(255,0,0,0.06)] animate-fade-up text-center space-y-6">
                <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-red-200/50 to-rose-300/40 blur-2xl opacity-40" />
                <div className="mx-auto h-14 w-14 flex items-center justify-center rounded-2xl bg-gradient-to-br from-red-600 to-rose-700 shadow-xl text-white text-2xl">
                    ⚠️
                </div>
                <h1 className="text-2xl font-bold text-gray-900">
                    Lien invalide ou expiré
                </h1>
                <p className="text-sm text-gray-600 max-w-xs mx-auto">
                    Ce lien de réinitialisation n'est plus valide.
                    Vous pouvez demander un nouveau lien depuis la page de connexion.
                </p>
                <a href="/authentication" className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-black text-white text-sm font-medium shadow-lg hover:shadow-xl hover:scale-[1.03] transition-all">
                    Retour à la connexion →
                </a>
            </div>
        </div>
    );
};
