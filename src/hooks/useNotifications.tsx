"use client";

import { useEffect, useRef } from "react";
import io from "socket.io-client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

// Singleton pour éviter les doubles connexions
let globalSocket: ReturnType<typeof io> | null = null;
let isConnecting = false;
let listenersAttached = false;

async function getAccessToken(): Promise<string | null> {
    try {
        const response = await fetch("/api/auth/get-token");
        if (response.ok) {
            const data = await response.json();
            return data.token;
        }
    } catch (error) {
        console.error("Error getting token:", error);
    }
    return null;
}

export function useNotifications() {
    const router = useRouter();
    const handlersRef = useRef<{ router: typeof router }>({ router });

    useEffect(() => {
        handlersRef.current.router = router;
    }, [router]);

    useEffect(() => {
        if (listenersAttached && globalSocket?.connected) {
            return;
        }

        if (globalSocket?.connected && !listenersAttached) {
            attachListeners(globalSocket, handlersRef);
            listenersAttached = true;
            return;
        }

        if (isConnecting) {
            return;
        }

        async function connectSocket() {
            if (isConnecting || (globalSocket?.connected && listenersAttached)) {
                return;
            }

            isConnecting = true;

            try {
                const token = await getAccessToken();

                if (!token) {
                    isConnecting = false;
                    return;
                }

                if (globalSocket && !globalSocket.connected) {
                    globalSocket.removeAllListeners();
                    globalSocket.disconnect();
                    globalSocket = null;
                    listenersAttached = false;
                }

                if (!globalSocket) {
                    globalSocket = io(`${BACKEND_URL}/notifications`, {
                        auth: {
                            token: token,
                        },
                        transports: ['websocket', 'polling'],
                    });
                    (globalThis as any).__ticketUpdatesSocket = globalSocket;

                    globalSocket.on("connect", () => {
                        isConnecting = false;
                        if (globalSocket) {
                            (globalThis as any).__ticketUpdatesSocket = globalSocket;
                            if (!listenersAttached) {
                                attachListeners(globalSocket, handlersRef);
                                listenersAttached = true;
                            }
                        }
                    });

                    globalSocket.on("connect_error", (error: Error) => {
                        isConnecting = false;
                    });

                    globalSocket.on("disconnect", (reason: string) => {
                        isConnecting = false;
                        listenersAttached = false;
                        if (globalSocket) {
                            globalSocket.removeAllListeners();
                            globalSocket = null;
                        }
                        (globalThis as any).__ticketUpdatesSocket = null;
                    });
                } else if (globalSocket.connected && !listenersAttached) {
                    attachListeners(globalSocket, handlersRef);
                    listenersAttached = true;
                }

            } catch (error) {
                console.error("Error connecting to WebSocket:", error);
                isConnecting = false;
            }
        }

        connectSocket();

        return () => {
        };
    }, []);
}

const displayedNotifications = new Set<string>();

let notificationTicketHandler: ((data: { ticketId: string; subject: string; timestamp?: Date }) => void) | null = null;
let notificationMessageHandler: ((data: { ticketId: string; ticketSubject: string; content: string; timestamp?: Date }) => void) | null = null;

function attachListeners(
    socket: ReturnType<typeof io>,
    handlersRef: React.MutableRefObject<{ router: ReturnType<typeof useRouter> }>
) {
    if (notificationTicketHandler) {
        socket.off("new-ticket", notificationTicketHandler);
    }
    if (notificationMessageHandler) {
        socket.off("new-message", notificationMessageHandler);
    }

    notificationTicketHandler = (data: { ticketId: string; subject: string; isRisky?: boolean; timestamp?: Date }) => {
        const notificationId = `ticket-${data.ticketId}-${data.timestamp || Date.now()}`;
        
        if (displayedNotifications.has(notificationId)) {
            return;
        }

        displayedNotifications.add(notificationId);
        
        setTimeout(() => {
            displayedNotifications.delete(notificationId);
        }, 10000);

        toast.success(
            <div 
                onClick={() => handlersRef.current.router.push(`/tickets/${data.ticketId}`)}
                className="cursor-pointer"
            >
                <p className="font-semibold">Nouveau ticket</p>
                <p className="text-sm">{data.subject}</p>
            </div>,
            {
                duration: 5000,
            }
        );
    };

    socket.on("new-ticket", notificationTicketHandler);

    notificationMessageHandler = (data: { ticketId: string; ticketSubject: string; content: string; isRisky?: boolean; timestamp?: Date }) => {
        const notificationId = `message-${data.ticketId}-${data.timestamp || Date.now()}`;
        
        if (displayedNotifications.has(notificationId)) {
            console.log("Notification déjà affichée, ignorée:", notificationId);
            return;
        }

        displayedNotifications.add(notificationId);
        
        setTimeout(() => {
            displayedNotifications.delete(notificationId);
        }, 10000);

        console.log("Received new-message event:", data, "notificationId:", notificationId);
        toast.success(
            <div 
                onClick={() => handlersRef.current.router.push(`/tickets/${data.ticketId}`)}
                className="cursor-pointer"
            >
                <p className="font-semibold">Nouveau message</p>
                <p className="text-sm text-gray-600 line-clamp-2">{data.ticketSubject}</p>
            </div>,
            {
                duration: 5000,
            }
        );
    };

    socket.on("new-message", notificationMessageHandler);
}