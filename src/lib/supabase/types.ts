import type { Direction } from "@/types/chat";

export type LineUserRow = {
  id: string;
  display_name: string;
  picture_url: string | null;
  last_message_at: string;
};

export type LineMessageRow = {
  id: string;
  user_id: string;
  direction: Direction;
  type: string;
  text: string;
  created_at: string;
};

export type LineConversationRow = LineUserRow & {
  messages: { text: string; type: string; created_at: string }[];
};

export type CreateUserPayload = {
  id: string;
  displayName: string;
  pictureUrl?: string;
};

export type CreateMessagePayload = {
  userId: string;
  direction: Direction;
  type: string;
  text: string;
};
