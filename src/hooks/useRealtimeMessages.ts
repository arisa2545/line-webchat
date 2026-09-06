"use client";

import { useEffect, useRef } from "react";
import { supabaseBrowser } from "@/lib/supabase/browser";
import type { ChatMessage, Direction } from "@/types/chat";

type MessageRow = {
  id: string;
  user_id: string;
  direction: Direction;
  type: string;
  text: string;
  created_at: string;
};

/**
 * ฟัง INSERT ของตาราง messages ผ่าน Supabase Realtime
 *
 * @param onInsert  เรียกทุกครั้งที่มีข้อความใหม่
 * @param userId    ถ้าใส่ จะฟังเฉพาะห้องนั้น · ถ้าไม่ใส่ จะฟังทุกห้อง
 */
export function useRealtimeMessages(
  onInsert: (message: ChatMessage) => void,
  userId?: string,
) {
  const onInsertRef = useRef(onInsert);

  useEffect(() => {
    onInsertRef.current = onInsert;
  }, [onInsert]);

  useEffect(() => {
    const channel = supabaseBrowser
      .channel(`messages:${userId ?? "all"}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          ...(userId ? { filter: `user_id=eq.${userId}` } : {}),
        },
        (payload) => {
          const row = payload.new as MessageRow;
          onInsertRef.current({
            id: row.id,
            userId: row.user_id,
            direction: row.direction,
            type: row.type,
            text: row.text,
            createdAt: row.created_at,
          });
        },
      )
      .subscribe();

    return () => {
      supabaseBrowser.removeChannel(channel);
    };
  }, [userId]);
}
