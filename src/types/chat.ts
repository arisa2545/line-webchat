export enum Direction {
    inbound = 'inbound',
    outbound = 'outbound',
}

export interface ChatUser {
    id: string;
    displayName: string;
    pictureUrl?: string;
    lastMessageAt: string;
}

export interface ChatMessage {
    id: string;
    userId: string;
    direction: Direction;
    type: string;
    text: string;
    createdAt: string;
}

export interface Conversation extends ChatUser {
    lastMessageText: string;
    lastMessageType: string;
}