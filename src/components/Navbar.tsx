import Link from "next/link";
import { cookies } from "next/headers";

export default async function Navbar() {
  const cookieStore = await cookies();
  const isLoggedIn = cookieStore.get("access_token");

  return (
    <nav className="w-full bg-white border-b shadow-sm px-6 py-3 flex items-center justify-between">
      <Link href="/tickets" className="font-bold text-lg">
        RepliAI
      </Link>

      {isLoggedIn && (
        <form action="/api/auth/logout" method="post">
          <button className="text-sm text-red-600 hover:underline">
            Déconnexion
          </button>
        </form>
      )}
    </nav>
  );
}
