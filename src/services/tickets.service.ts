import { apiFetch } from "@/lib/api-client";
import { TicketListResponse } from "@/types";
import { toQueryString } from "@/utils/query";

export const ticketService = {
    getTickets(filters?: Record<string, string>) {
        const queryString = filters ? toQueryString(filters) : "";
        return apiFetch<TicketListResponse>(`/api/tickets?${queryString}`, {
            method: "GET",
        });
    },
};