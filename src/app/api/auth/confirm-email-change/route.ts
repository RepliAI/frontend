import { NextResponse } from "next/server";

const BACKEND = process.env.BACKEND_URL!;

export async function POST(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get("token");

  if (!token) {
    return NextResponse.json(
      { message: "Token manquant dans l'URL." },
      { status: 400 }
    );
  }

  const res = await fetch(`${BACKEND}/auth/confirm-email-change`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  });

  if (!res.ok) {
    const error = await res.json();
    return NextResponse.json(
      { message: error.message || "Impossible de confirmer le changement d'email" },
      { status: res.status }
    );
  }

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}