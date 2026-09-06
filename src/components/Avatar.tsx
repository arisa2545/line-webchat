import { Conversation } from "@/types/chat";
import "@/styles/user-list.css";

export function Avatar({ conversation }: { conversation: Conversation }) {
  if (conversation.pictureUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- รูปจาก LINE CDN ขนาดคงที่ ไม่ต้องผ่าน image optimizer
      <img
        src={conversation.pictureUrl}
        alt=""
        className="user-list__avatar"
        width={36}
        height={36}
      />
    );
  }

  const initial = conversation.displayName.trim().charAt(0) || "?";

  return (
    <span className="user-list__avatar user-list__avatar--fallback" aria-hidden>
      {initial}
    </span>
  );
}