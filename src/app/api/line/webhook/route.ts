import { getProfile } from "@/lib/line/client";
import { verifySignature } from "@/lib/line/signature";
import type { LineWebhookEvent } from "@/lib/line/types";
import {
  createUser,
  findUser,
  insertMessage,
  touchUser,
} from "@/lib/supabase/repository";
import { Direction } from "@/types/chat";

export async function POST(req: Request) {
  const raw = await req.text();

  if (!verifySignature(raw, req.headers.get("x-line-signature"))) {
    return new Response("Invalid signature", { status: 401 });
  }

  const body = JSON.parse(raw) as { events?: unknown };
  const events: LineWebhookEvent[] = Array.isArray(body.events)
    ? body.events
    : [];

  for (const event of events) {
    try {
      await handleEvent(event);
    } catch (error) {
      console.error("[webhook] event failed", error);
    }
  }

  return new Response("OK", { status: 200 });
}

async function handleEvent(event: LineWebhookEvent): Promise<void> {
  if (event.type !== "message" || event.message?.type !== "text") return; // ignore non-text messages

  const userId = event.source?.userId;
  const text = event.message.text;
  if (!userId || !text) return;

  await ensureUser(userId);

  await insertMessage({
    userId,
    direction: Direction.inbound,
    type: "text",
    text,
  });
}

async function ensureUser(userId: string): Promise<void> {
  if (await findUser(userId)) {
    await touchUser(userId);
    return;
  }

  const profile = await getProfile(userId).catch(() => null);

  await createUser({
    id: userId,
    displayName: profile?.displayName ?? "",
    pictureUrl: profile?.pictureUrl,
  });
}
