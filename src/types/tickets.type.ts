export interface Ticket {
    id: string;
    subject: string;
    status: "OPEN" | "PENDING" | "RESOLVED";
    createdAt: string;
    messages: TicketMessage[];
}

export interface TicketMessage {
    id: string;
    from: string;
    to: string;
    content: string;
    date: string;
    isRisky?: boolean;
}

export interface TicketListResponse {
    items: Ticket[];
    total: number;
    page: number;
    pageSize:number;
}  
export interface AIReplyResponse {
    reply:string;
}

export enum Status {
    Open = "OPEN",
    Pending = "PENDING",
    Resolved = "RESOLVED",
}