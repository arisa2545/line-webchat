import { supabase } from "./server";
import type {
  Direction,
  ChatUser,
  ChatMessage,
  Conversation,
} from "@/types/chat";

type LineUserRow = {
  id: string;
  display_name: string;
  picture_url: string | null;
  last_message_at: string;
};

type LineMessageRow = {
  id: string;
  user_id: string;
  direction: Direction;
  type: string;
  text: string;
  created_at: string;
};

type LineConversationRow = LineUserRow & {
  messages: { text: string; created_at: string }[];
};


type CreateUserPayload = {
  id: string;
  displayName: string;
  pictureUrl?: string;
};

type CreateMessagePayload = {
  userId: string;
  direction: Direction;
  type: string;
  text: string;
};

function toChatUser(row: LineUserRow): ChatUser {
  return {
    id: row.id,
    displayName: row.display_name,
    pictureUrl: row.picture_url ?? undefined,
    lastMessageAt: row.last_message_at,
  };
}

function toChatMessage(row: LineMessageRow): ChatMessage {
  return {
    id: row.id,
    userId: row.user_id,
    direction: row.direction,
    text: row.text,
    createdAt: row.created_at,
  };
}

function toChatConversation(row: LineConversationRow): Conversation {
  return {
    id: row.id,
    displayName: row.display_name,
    pictureUrl: row.picture_url ?? undefined,
    lastMessageAt: row.last_message_at,
    lastMessageText: row.messages[0]?.text || "",
  };
}

export async function getConversations(): Promise<Conversation[]> {
  const { data, error } = await supabase
    .from("line_users")
    .select("id, display_name, picture_url, last_message_at, messages(text, created_at)")
    .order("last_message_at", { ascending: false })
    .order("created_at", { referencedTable: "messages", ascending: false })
    .limit(1, { referencedTable: "messages" });

  if (error) throw new Error(`Supabase get conversations failed: ${error.message}`);

  return data ? data.map(toChatConversation) : [];
}

export async function getMessagesByUserId(userId: string): Promise<ChatMessage[]> {
  const { data, error } = await supabase
    .from("messages")
    .select("id, user_id, direction, type, text, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: true });

  if (error) throw new Error(`Supabase get messages failed: ${error.message}`);

  return data ? data.map(toChatMessage) : [];
}

export async function findUser(id: string): Promise<ChatUser | null> {
  const { data, error } = await supabase
    .from("line_users")
    .select("id, display_name, picture_url, last_message_at")
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(`Supabase findUser failed: ${error.message}`);

  return data ? toChatUser(data) : null;
}

export async function createUser(payload: CreateUserPayload): Promise<ChatUser | null> {
  const { data, error } = await supabase
    .from("line_users")
    .insert({
      id: payload.id,
      display_name: payload.displayName,
      picture_url: payload.pictureUrl,
      last_message_at: new Date().toISOString(),
    })
    .select("id, display_name, picture_url, last_message_at")
    .maybeSingle();

  if (error) throw new Error(`Supabase createUser failed: ${error.message}`);

  return data ? toChatUser(data) : null;
}

export async function touchUser(id: string): Promise<ChatUser | null> {
  const { data, error } = await supabase
    .from("line_users")
    .update({ last_message_at: new Date().toISOString() })
    .eq("id", id)
    .select("id, display_name, picture_url, last_message_at")
    .maybeSingle();

  if (error) throw new Error(`Supabase update user failed: ${error.message}`);

  return data ? toChatUser(data) : null;
}

export async function insertMessage(payload: CreateMessagePayload): Promise<ChatMessage | null> {
  const { data, error } = await supabase
    .from("messages")
    .insert({ user_id: payload.userId, direction: payload.direction, type: payload.type, text: payload.text })
    .select()
    .maybeSingle();

  if (error) throw new Error(`Supabase insert message failed: ${error.message}`);

  return data ? toChatMessage(data) : null;
}
