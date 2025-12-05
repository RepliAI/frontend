import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { CreditCard } from "lucide-react";

import BillingPlans from "@/components/modules/billing/BillingPlans";
import { PageHeader } from "@/components/layout/pageHeader";

export const revalidate = 0;

export default async function BillingPage() {
  const token = (await cookies()).get("access_token")?.value;
  if (!token) return notFound();

  const backend = process.env.BACKEND_URL!;
  const res = await fetch(`${backend}/billing/subscription`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  const subscription = res.ok ? await res.json() : { plan: "free", status: "active", renewAt: null };

  return (
    <div className="p-6 space-y-10 max-w-5xl mx-auto">
      <PageHeader icon={<CreditCard size={18} />} title="Abonnement" subtitle="Gérez votre formule, vos paiements et vos informations de facturation."/>
      <BillingPlans current={subscription} />
    </div>
  );
}