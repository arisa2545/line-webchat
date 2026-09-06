import { Direction, type ChatMessage } from "@/types/chat";
import { formatTime } from "@/app/utils/format";
import "@/styles/message-bubble.css";

type MessageBubbleProps = {
  message: ChatMessage;
};

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isOutbound = message.direction === Direction.outbound;

  return (
    <li
      className={
        isOutbound
          ? "message-bubble message-bubble--outbound"
          : "message-bubble message-bubble--inbound"
      }
    >
      <p className="message-bubble__text">{message.text}</p>
      <time dateTime={message.createdAt} className="message-bubble__time">
        {formatTime(message.createdAt)}
      </time>
    </li>
  );
}
