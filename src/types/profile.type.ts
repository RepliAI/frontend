import { PlanId } from "./billing.type";

export interface Profile {
    email: string;
    plan: PlanId;
    createdAt?: string;
    gmailConnected: boolean;
};