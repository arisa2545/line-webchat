import { pushMessage } from "@/lib/line/client";
import { insertMessage } from "@/lib/supabase/repository";
import type { CreateMessagePayload } from "@/lib/supabase/types";
import { Direction } from "@/types/chat";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const userId = body.userId;
    const text = body.text;

    if (!userId || !text) {
      return Response.json(
        { error: "Missing userId or text parameter" },
        { status: 400 },
      );
    }

    const mapPayload: CreateMessagePayload = {
      userId: userId,
      direction: Direction.outbound,
      type: "text",
      text: text,
    };

    await pushMessage(userId, text);
    return Response.json(await insertMessage(mapPayload));
  } catch (error) {
    console.error("[messages] failed", error);
    return Response.json({ error: "Failed to send message" }, { status: 500 });
  }
}
