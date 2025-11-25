"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function Pagination({ total, page, pageSize }: any) {
  const router = useRouter();
  const params = useSearchParams();

  const totalPages = Math.ceil(total / pageSize);

  function goToPage(p: number) {
    const query = new URLSearchParams(params.toString());
    query.set("page", String(p));
    router.push("/tickets?" + query.toString());
  }

  return (
    <div className="flex justify-center items-center gap-4 mt-6">

      <button
        disabled={page <= 1}
        onClick={() => goToPage(page - 1)}
        className="px-4 py-2 rounded-lg border bg-white disabled:opacity-40"
      >
        ← Précédent
      </button>

      <span className="text-sm text-gray-600">
        Page {page} / {totalPages}
      </span>

      <button
        disabled={page >= totalPages}
        onClick={() => goToPage(page + 1)}
        className="px-4 py-2 rounded-lg border bg-white disabled:opacity-40"
      >
        Suivant →
      </button>

    </div>
  );
}