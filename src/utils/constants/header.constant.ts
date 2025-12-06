import { Home, Ticket, User, Settings, CreditCard } from "lucide-react";

export const nav = [
    { label: "Tableau de bord", href: "/dashboard", icon: Home },
    { label: "Tickets", href: "/tickets", icon: Ticket },
    { label: "Profil", href: "/profile", icon: User },
    { label: "Abonnement", href: "/billing", icon: CreditCard },
    { label: "Paramètres", href: "/settings", icon: Settings },
];