"use client";

import { useEffect, useRef } from "react";

declare global {
    var __ticketUpdatesSocket: {
        connected: boolean;
        on: (event: string, handler: (...args: any[]) => void) => void;
        off: (event: string, handler?: (...args: any[]) => void) => void;
        disconnect: () => void;
        removeAllListeners: () => void;
        id?: string;
    } | null;
}

export function useTicketUpdates(
    onNewTicket?: (data?: { ticketId: string; isRisky?: boolean }) => void,
    onNewMessage?: (ticketId: string, isRisky?: boolean) => void
) {
    const callbacksRef = useRef({ onNewTicket, onNewMessage });
    const cleanupRef = useRef<(() => void) | null>(null);

    useEffect(() => {
        callbacksRef.current = { onNewTicket, onNewMessage };
    }, [onNewTicket, onNewMessage]);

    useEffect(() => {
        let mounted = true;
        let checkInterval: NodeJS.Timeout | null = null;

        function setupListeners(socket: any) {
            if (cleanupRef.current) {
                cleanupRef.current();
            }

            const ticketHandler = (data: { ticketId: string; subject: string; isRisky?: boolean; timestamp?: Date }) => {
                if (mounted && callbacksRef.current.onNewTicket) {
                    callbacksRef.current.onNewTicket({ ticketId: data.ticketId, isRisky: data.isRisky });
                }
            };

            const messageHandler = (data: { ticketId: string; ticketSubject: string; content: string; isRisky?: boolean; timestamp?: Date }) => {
                console.log("[useTicketUpdates] new-message event received:", data);
                if (mounted && callbacksRef.current.onNewMessage) {
                    callbacksRef.current.onNewMessage(data.ticketId, data.isRisky);
                }
            };

            socket.on("new-ticket", ticketHandler);
            socket.on("new-message", messageHandler);
            
            console.log("[useTicketUpdates] Listeners attached successfully");

            cleanupRef.current = () => {
                socket.off("new-ticket", ticketHandler);
                socket.off("new-message", messageHandler);
            };
        }

        const socket = (globalThis as any).__ticketUpdatesSocket;
        if (socket?.connected) {
            console.log("[useTicketUpdates] Socket already connected, setting up listeners");
            setupListeners(socket);
        } else {
            console.log("[useTicketUpdates] Socket not ready, waiting...");
            checkInterval = setInterval(() => {
                const currentSocket = (globalThis as any).__ticketUpdatesSocket;
                if (currentSocket?.connected && mounted) {
                    console.log("[useTicketUpdates] Socket now connected, setting up listeners");
                    if (checkInterval) {
                        clearInterval(checkInterval);
                        checkInterval = null;
                    }
                    setupListeners(currentSocket);
                }
            }, 100);

            setTimeout(() => {
                if (checkInterval) {
                    console.warn("[useTicketUpdates] Timeout waiting for socket");
                    clearInterval(checkInterval);
                    checkInterval = null;
                }
            }, 10000);
        }

        return () => {
            mounted = false;
            if (checkInterval) {
                clearInterval(checkInterval);
            }
            if (cleanupRef.current) {
                cleanupRef.current();
                cleanupRef.current = null;
            }
        };
    }, []);
}

