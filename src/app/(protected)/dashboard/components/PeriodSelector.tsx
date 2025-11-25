"use client";

import { useRouter, useSearchParams } from "next/navigation";

const OPTIONS = [7, 14, 30, 90];

export function PeriodSelector({ currentDays }: { currentDays: number }) {
  const router = useRouter();
  const params = useSearchParams();

  function changeDays(days: number) {
    const query = new URLSearchParams(Array.from(params.entries()));

    if (days === 14) {
      query.delete("days");
    } else {
      query.set("days", String(days));
    }

    router.push("/dashboard?" + query.toString());
  }

  return (
    <div className="flex items-center gap-2 bg-white border rounded-xl px-3 py-2 shadow-sm">
      <span className="text-xs text-gray-500">Période</span>
      <div className="flex gap-1">
        {OPTIONS.map((d) => (
          <button
            key={d}
            onClick={() => changeDays(d)}
            className={`px-2 py-1 rounded-lg text-xs border ${
              d === currentDays
                ? "bg-black text-white border-black"
                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
            }`}
          >
            {d}j
          </button>
        ))}
      </div>
    </div>
  );
}