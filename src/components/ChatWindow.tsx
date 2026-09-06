"use client";

import { useEffect, useRef, useState } from "react";
import type { ChatMessage } from "@/types/chat";
import MessageBubble from "./MessageBubble";
import "@/styles/chat-window.css";

type ChatWindowProps = {
  selectedUserId: string;
};

type LoadStatus = "loading" | "ready" | "error";

export default function ChatWindow({ selectedUserId }: ChatWindowProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [status, setStatus] = useState<LoadStatus>("loading");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch(
          `/api/messages?userId=${encodeURIComponent(selectedUserId)}`,
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data: ChatMessage[] = await res.json();
        if (cancelled) return;

        setMessages(data);
        setStatus("ready");
      } catch (error) {
        console.error("[ChatWindow] load failed", error);
        if (!cancelled) setStatus("error");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [selectedUserId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView();
  }, [messages]);

  if (status === "loading") {
    return <p className="chat-window__state">กำลังโหลดข้อความ…</p>;
  }

  if (status === "error") {
    return (
      <p className="chat-window__state chat-window__state--error">
        โหลดข้อความไม่สำเร็จ
      </p>
    );
  }

  if (messages.length === 0) {
    return <p className="chat-window__state">ยังไม่มีข้อความในห้องนี้</p>;
  }

  return (
    <div className="chat-window">
      <ul className="chat-window__messages">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
      </ul>
      <div ref={bottomRef} />
    </div>
  );
}
