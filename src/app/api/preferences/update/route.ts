// src/app/api/preferences/update/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function PATCH(req: Request) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) {
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
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return NextResponse.json(await res.json(), {
    status: res.status,
  });
}