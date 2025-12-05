import { apiFetch } from "@/lib/api-client";
import { GmailConnectResponse } from "@/types";

export const gmailService = {
    connectGmailAccount() {
        return apiFetch<GmailConnectResponse>(`/api/gmail/connect`, {
            method: "GET",
        });
    },
};