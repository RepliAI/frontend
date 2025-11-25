"use client";

interface Props {
  status: "OPEN" | "PENDING" | "RESOLVED";
}

const COLORS: Record<string, string> = {
  OPEN: "bg-blue-100 text-blue-700",
  PENDING: "bg-yellow-100 text-yellow-700",
  RESOLVED: "bg-green-100 text-green-700",
};

export function StatusBadge({ status }: Props) {
  return (
    <span className={`px-2 py-1 rounded-md text-xs font-medium ${COLORS[status]}`}>
      {status}
    </span>
  );
}