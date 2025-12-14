export interface Subscription {
    plan: "free" | "pro" | "business";
    status: "active" | "canceled" | "incomplete" | "past_due";
    renewAt: string | null;
}

export interface BillingCheckoutResponse {
    url?: string;
    message?: string;
}

export interface CheckoutUrlResponse {
    url: null | string;
}

export interface PlanFeatures {
    label: string;
    included: boolean;
}
export interface Plan {
    id: string;
    name: string;
    price: string;
    planId: string;
    description: string;
    features: PlanFeatures[];
    highlighted: boolean;
}

export type PlanId = "free" | "pro" | "business";
