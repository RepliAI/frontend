import { apiFetch } from "@/lib/api-client";
import { AIReplyResponse, Ticket, TicketListResponse, TicketMessage } from "@/types";
import { toQueryString } from "@/utils/query";

export const ticketService = {
    getTickets(filters?: Record<string, string>): Promise<TicketListResponse> {
        const queryString = filters ? toQueryString(filters) : "";
        return apiFetch<TicketListResponse>(`/api/tickets?${queryString}`, {
            method: "GET",
        });
    },
    async getTicketById(id: string): Promise<Ticket> {
        return apiFetch<Ticket>(`/api/tickets/${id}`);
    },
    async updateTicketStatus(id: string, newStatus: string): Promise<Ticket> {
        const body = {
            status: newStatus
        }
        return apiFetch(`/api/tickets/${id}/status`, {
            method: "PATCH",
            body: JSON.stringify(body)
        });
    },
    async generateAIReply(id: string): Promise<AIReplyResponse>{
        return apiFetch<AIReplyResponse>(`/api/tickets/${id}/generate-reply`, {
			method: "POST",
		})
    },
    async sendMessage(id: string, content: string): Promise<TicketMessage> {
        const body = {
            content
        }
        return apiFetch<TicketMessage>(`/api/tickets/${id}/messages`, {
			method: "POST",
            body: JSON.stringify(body)
		})
    }
};