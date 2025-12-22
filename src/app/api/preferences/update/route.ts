import { NextResponse } from "next/server";

import { getAuthHeaders, updateCookiesFromResponse } from "@/lib/api-route-helper";

export async function PATCH(req: Request) {
  const authHeaders = await getAuthHeaders();

  if (!authHeaders.Authorization) {
    return NextResponse.json(
      { error: "Not authenticated" },
      { status: 401 }
    );
  }

  const body = await req.json();
  const backend = process.env.BACKEND_URL!;

  const res = await fetch(`${backend}/preferences`, {
    method: "PATCH",
    headers: {
      ...authHeaders,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  const nextResponse = NextResponse.json(data, {
    status: res.status,
  });
  return updateCookiesFromResponse(res, nextResponse);
}