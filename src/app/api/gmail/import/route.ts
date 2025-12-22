import { NextResponse } from "next/server";

import { getAuthHeaders, updateCookiesFromResponse } from "@/lib/api-route-helper";

export async function POST(req: Request) {
  const authHeaders = await getAuthHeaders();

  if (!authHeaders.Authorization) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const backendUrl = process.env.BACKEND_URL!;
  const res = await fetch(`${backendUrl}/gmail/import`, {
    method: "POST",
    headers: {
      ...authHeaders,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  const nextResponse = NextResponse.json(data, { status: res.status });
  return updateCookiesFromResponse(res, nextResponse);
}