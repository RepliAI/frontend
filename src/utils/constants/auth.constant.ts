import { AuthMode, AuthTab, Feature } from "@/types";


export const featureList: Feature[] = [
    {title: "Connexion Gmail", desc: "Import automatique des emails" },
    {title: "IA intégrée", desc: "Réponses prêtes en 1 clic" },
    {title: "Dashboard clair", desc: "Vue globale de votre support" },
    {title: "Abonnements flexibles", desc: "Upgrade en un clic" },
];

export const authTabsList: AuthTab[] = [
    {label: "Connexion", mode: AuthMode.Login },
    {label: "Inscription", mode: AuthMode.Register },
    {label: "Mot de passe oublié", mode: AuthMode.Forgot },
];