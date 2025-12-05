"use client";

import React from "react";
import { CheckCircle, Clock, CircleDot } from "lucide-react";

interface Props {
	status: "OPEN" | "PENDING" | "RESOLVED";
}

const STYLES: Record<Props["status"], string> = {
	OPEN: "bg-blue-50 text-blue-700 border-blue-200",
	PENDING: "bg-yellow-50 text-yellow-700 border-yellow-200",
	RESOLVED: "bg-green-50 text-green-700 border-green-200",
};

const ICONS: Record<Props["status"], React.ReactNode> = {
	OPEN: <CircleDot size={10} />,
	PENDING: <Clock size={10} />,
	RESOLVED: <CheckCircle size={10} />,
};

export function StatusBadge({ status }: Props) {
	return (
		<span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${STYLES[status]}`}>
			{ICONS[status]}
			{status}
		</span>
	);
}