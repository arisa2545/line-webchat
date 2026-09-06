"use client";

import { useState } from "react";
import { ChatBubbleIcon } from "@/components/icons/ChatBubbleIcon";
import UserList from "@/components/UserList";
import "@/styles/chat-console.css";
import ChatWindow from "@/components/ChatWindow";
import MessageInput from "@/components/MessageInput";

export default function Home() {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  return (
    <div className="chat-console">
      {/* ── Header ───────────────────────────────────────────── */}
      <header className="chat-console__header">
        <div className="chat-console__brand">
          <span className="chat-console__logo">L</span>
          <h1 className="chat-console__title">LINE Webchat Console</h1>
        </div>
      </header>

      <div className="chat-console__body">
        {/* ── Sidebar: User List ──────────────────────────── */}
        <aside className="chat-console__sidebar">
          <UserList
            selectedUserId={selectedUserId}
            onSelect={setSelectedUserId}
          />
        </aside>

        {/* ── Chat pane ────────────────────────────────────────── */}
        <section className="chat-console__chat">
          {selectedUserId && (
            <ChatWindow key={selectedUserId} selectedUserId={selectedUserId} />
          )}
          {!selectedUserId && (
            <div className="chat-console__empty">
              <div>
                <div className="chat-console__empty-icon">
                  <ChatBubbleIcon />
                </div>
                <p className="chat-console__empty-title">
                  ยังไม่ได้เลือกห้องแชท
                </p>
                <p className="chat-console__empty-hint">
                  เลือกผู้ใช้จากรายการทางซ้ายเพื่อดูข้อความ
                </p>
              </div>
            </div>
          )}

          <MessageInput userId={selectedUserId} />
        </section>
      </div>
    </div>
  );
}
