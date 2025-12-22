import { NextResponse } from "next/server";

import { getAuthHeaders, updateCookiesFromResponse } from "@/lib/api-route-helper";

export async function GET() {
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL!;
  const authHeaders = await getAuthHeaders();

  const res = await fetch(`${backend}/gmail/connect`, {
    method: "GET",
    headers: authHeaders,
  });

  const data = await res.json();
  const nextResponse = NextResponse.json(data);
  return updateCookiesFromResponse(res, nextResponse);
}