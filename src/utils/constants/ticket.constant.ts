import { Status } from "@/types";

export const statuses = [
    { label: "Tous", value: "" },
    { label: "Ouverts", value: "OPEN" },
    { label: "En attente", value: "PENDING" },
    { label: "Résolus", value: "RESOLVED" },
];

export const ticketStatusLabels: Record<string, string> = {
	OPEN: "Ouvert",
	PENDING: "En attente",
	RESOLVED: "Résolu",
};

export const ticketStatusColors: Record<string, string> = {
	OPEN: "bg-blue-50 text-blue-700 border-blue-200",
	PENDING: "bg-yellow-50 text-yellow-700 border-yellow-200",
	RESOLVED: "bg-green-50 text-green-700 border-green-200",
};

export const statusOptionsList: Status[] = [ Status.Open, Status.Pending, Status.Resolved ];