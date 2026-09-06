import { getConversations } from "@/lib/supabase/repository";

export async function GET() {
  try {
    return Response.json(await getConversations());
  } catch (error) {
    console.error("[conversations] failed", error);
    return Response.json({ error: "Failed to load conversations" }, { status: 500 });
  }
}
