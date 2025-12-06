'use client'
import { CreditCard } from "lucide-react";
import { useEffect, useState } from "react";

import BillingPlans from "@/components/modules/billing/BillingPlans";
import { PageHeader } from "@/components/layout/pageHeader";
import { Subscription } from "@/types";
import { billingService } from "@/services/billing.service";


export default function BillingPage() {

    const [loading, setLoading] = useState(true);
    const [subscription, setSubscription] = useState<Subscription>();

    const handleGetSubscription = async () => {
        try {
            const data = await billingService.getSubscription();
            setSubscription(data);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        handleGetSubscription()
    }, [])
    
    return (
        <div className="p-6 space-y-10 max-w-5xl mx-auto">
            <PageHeader icon={<CreditCard size={18} />} title="Abonnement" subtitle="Gérez votre formule, vos paiements et vos informations de facturation."/>
            <BillingPlans current={subscription} />
        </div>
    );
}