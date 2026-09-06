import { getMessagesByUserId } from "@/lib/supabase/repository";

export async function GET(req: Request) {
  const userId = new URL(req.url).searchParams.get("userId");
  
  if (!userId) {
    return Response.json({ error: "Missing userId parameter" }, { status: 400 });
  }

  try {
      return Response.json(await getMessagesByUserId(userId ?? ""));
    } catch (error) {
      console.error("[messages] failed", error);
      return Response.json({ error: "Failed to load messages" }, { status: 500 });
    }
}
