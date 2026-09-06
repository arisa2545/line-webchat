"use client";

import { useState, type FormEvent } from "react";
import "@/styles/message-input.css";

type MessageInputProps = {
  userId: string | null;
  onSent: () => void;
};

export default function MessageInput({ userId, onSent }: MessageInputProps) {
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const trimmed = text.trim();
  const canSend = userId !== null && trimmed.length > 0 && !sending;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSend) return;

    setSending(true);
    setError(null);

    try {
      const res = await fetch("/api/messages/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, text: trimmed }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      setText("");
      onSent();
    } catch (err) {
      console.error("[MessageInput] send failed", err);
      setError("ส่งไม่สำเร็จ ลองใหม่อีกครั้ง");
    } finally {
      setSending(false);
    }
  }

  return (
    <form className="message-input" onSubmit={handleSubmit}>
      {error && (
        <p role="alert" className="message-input__error">
          {error}
        </p>
      )}

      <div className="message-input__row">
        <input
          type="text"
          value={text}
          onChange={(event) => setText(event.target.value)}
          disabled={userId === null || sending}
          placeholder={
            userId === null ? "เลือกผู้ใช้ก่อนจึงจะพิมพ์ได้" : "พิมพ์ข้อความ…"
          }
          className="message-input__field"
        />

        <button type="submit" disabled={!canSend} className="message-input__send">
          {sending ? "กำลังส่ง…" : "ส่ง"}
        </button>
      </div>
    </form>
  );
}
