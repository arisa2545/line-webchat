type ChatBubbleIconProps = {
  size?: number;
  className?: string;
};

export function ChatBubbleIcon({ size = 24, className }: ChatBubbleIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M8 10h8M8 14h5m-8 7 3.5-3.5H18a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v14Z" />
    </svg>
  );
}
