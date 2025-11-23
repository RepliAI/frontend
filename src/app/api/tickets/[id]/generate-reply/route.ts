import { cookies } from "next/headers";

export async function POST(
    _req: Request,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params;

    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    const res = await fetch(
        `${process.env.BACKEND_URL}/tickets/${id}/generate-reply`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const text = await res.text();
    return new Response(text, { status: res.status });
}