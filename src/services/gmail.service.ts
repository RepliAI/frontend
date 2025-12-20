import { apiFetch } from "@/lib/api-client";
import { GmailConnectResponse } from "@/types";

export const gmailService = {
    connectGmailAccount() {
        return apiFetch<GmailConnectResponse>(`/api/gmail/connect`, {
            method: "GET",
        });
    },
    importEmails() {
        return apiFetch<{ imported: number }>(`/api/gmail/import`, {
            method: "POST",
        });
    }
};