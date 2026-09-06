"use client";

import { useCallback, useEffect, useState } from "react";
import type { Conversation } from "@/types/chat";
import "@/styles/user-list.css";
import { formatTime } from "@/app/utils/format";
import { Avatar } from "./Avatar";
import { useRealtimeMessages } from "@/hooks/useRealtimeMessages";

type UserListProps = {
  selectedUserId: string | null;
  onSelect: (userId: string) => void;
};

type LoadStatus = "loading" | "ready" | "error";

async function fetchConversations(): Promise<Conversation[]> {
  const res = await fetch("/api/conversations");
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export default function UserList({ selectedUserId, onSelect }: UserListProps) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [status, setStatus] = useState<LoadStatus>("loading");

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const data = await fetchConversations();
        if (cancelled) return;

        setConversations(data);
        setStatus("ready");
      } catch (error) {
        console.error("[UserList] load failed", error);
        if (!cancelled) setStatus("error");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  useRealtimeMessages(
    useCallback(() => {
      fetchConversations()
        .then(setConversations)
        .catch((error) => console.error("[UserList] refresh failed", error));
    }, []),
  );

  return (
    <div className="user-list">
      <div className="user-list__header">
        <h2 className="user-list__title">การสนทนา</h2>
        <p className="user-list__count">
          {status === "ready" ? `${conversations.length} รายการ` : " "}
        </p>
      </div>

      {status === "loading" && <p className="user-list__state">กำลังโหลด…</p>}

      {status === "error" && (
        <p className="user-list__state user-list__state--error">
          โหลดรายการไม่สำเร็จ
        </p>
      )}

      {status === "ready" && conversations.length === 0 && (
        <p className="user-list__state">
          ยังไม่มีผู้ใช้ทักเข้ามา
          <br />
          ลองทักหา LINE OA จากมือถือ
        </p>
      )}

      {status === "ready" && conversations.length > 0 && (
        <ul className="user-list__items">
          {conversations.map((conversation) => (
            <li key={conversation.id}>
              <button
                type="button"
                onClick={() => onSelect(conversation.id)}
                aria-current={conversation.id === selectedUserId}
                className={
                  conversation.id === selectedUserId
                    ? "user-list__item user-list__item--active"
                    : "user-list__item"
                }
              >
                <Avatar conversation={conversation} />

                <span className="user-list__body">
                  <span className="user-list__row">
                    <span className="user-list__name">
                      {conversation.displayName || "ไม่ทราบชื่อ"}
                    </span>
                    <time
                      dateTime={conversation.lastMessageAt}
                      className="user-list__time"
                    >
                      {formatTime(conversation.lastMessageAt)}
                    </time>
                  </span>

                  <span className="user-list__preview">
                    {conversation.lastMessageText || "ยังไม่มีข้อความ"}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
