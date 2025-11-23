// src/app/(protected)/tickets/components/StatusBadge.tsx
export function StatusBadge({ status }: { status: string }) {
    const color = {
        open: "bg-green-100 text-green-800",
        pending: "bg-yellow-100 text-yellow-800",
        closed: "bg-gray-200 text-gray-700",
    }[status.toLowerCase()] ?? "bg-gray-100 text-gray-700";

    return (
        <span className={`text-xs px-2 py-1 rounded-full uppercase tracking-wide ${color}`}>
            {status}
        </span>
    );
}  