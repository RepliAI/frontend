"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  total: number;
  page: number;
  pageSize: number;
}

export function Pagination({ total, page, pageSize }: PaginationProps) {
  const router = useRouter();
  const params = useSearchParams();

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  function updateQuery(newPage: number, newSize?: number) {
    const query = new URLSearchParams(params.toString());
    query.set("page", String(newPage));

    if (newSize) {
      query.set("pageSize", String(newSize));
      query.set("page", "1"); // reset à la première page quand on change la taille
    }

    router.push(`/tickets?${query.toString()}`);
  }

  function generatePages() {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 3) pages.push("…");

      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);

      for (let i = start; i <= end; i++) pages.push(i);

      if (page < totalPages - 2) pages.push("…");
      pages.push(totalPages);
    }

    return pages;
  }
  
  const displayedPages = generatePages();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-8 gap-4">

      <div className="text-sm text-gray-600">
        Affiche
        {" "}
        <span className="font-medium">
          {(page - 1) * pageSize + 1}
        </span>
        {" "}-{" "}
        <span className="font-medium">
          {Math.min(page * pageSize, total)}
        </span>
        {" "}
        sur{" "}
        <span className="font-medium">{total}</span>
        {" "}tickets
      </div>

      <div className="flex items-center gap-2">

        <button
          disabled={page <= 1}
          onClick={() => updateQuery(page - 1)}
          className="px-3 py-1 border rounded-lg text-sm disabled:opacity-40"
        >
          ←
        </button>

        {displayedPages.map((p, idx) =>
          p === "…" ? (
            <span key={idx} className="px-2 text-gray-400">
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => updateQuery(Number(p))}
              className={`px-3 py-1 rounded-lg text-sm border ${
                p === page
                  ? "bg-black text-white border-black"
                  : "hover:bg-gray-100"
              }`}
            >
              {p}
            </button>
          )
        )}
        <button
          disabled={page >= totalPages}
          onClick={() => updateQuery(page + 1)}
          className="px-3 py-1 border rounded-lg text-sm disabled:opacity-40"
        >
          →
        </button>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Par page :</span>

        <select
          value={pageSize}
          onChange={(e) => updateQuery(1, Number(e.target.value))}
          className="border rounded-lg px-2 py-1 text-sm"
        >
          {[10, 20, 50, 100].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

    </div>
  );
}