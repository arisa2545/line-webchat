import { Direction, type ChatMessage } from "@/types/chat";
import { formatTime, unsupportedMessageText } from "@/app/utils/format";
import "@/styles/message-bubble.css";

type MessageBubbleProps = {
  message: ChatMessage;
};

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isOutbound = message.direction === Direction.outbound;
  const isSupported = message.type === "text";

  const className = [
    "message-bubble",
    isOutbound ? "message-bubble--outbound" : "message-bubble--inbound",
    isSupported ? "" : "message-bubble--unsupported",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <li className={className}>
      <p className="message-bubble__text">
        {isSupported ? message.text : unsupportedMessageText(message.type)}
      </p>
      <time dateTime={message.createdAt} className="message-bubble__time">
        {formatTime(message.createdAt)}
      </time>
    </li>
  );
}
