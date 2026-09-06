const MESSAGE_TYPE_LABEL: Record<string, string> = {
  sticker: "สติกเกอร์",
  image: "รูปภาพ",
  video: "วิดีโอ",
  audio: "ข้อความเสียง",
  file: "ไฟล์",
  location: "ตำแหน่งที่ตั้ง",
};

export function messageTypeLabel(type: string): string {
  return MESSAGE_TYPE_LABEL[type] ?? "ข้อความประเภทอื่น";
}

export function unsupportedMessageText(type: string): string {
  return `ส่ง${messageTypeLabel(type)} — ระบบยังไม่รองรับการแสดงผล`;
}

export function previewText(type: string, text: string): string {
  if (type === "text") return text;
  return `[${messageTypeLabel(type)}]`;
}

export function formatTime(iso: string): string {
  const date = new Date(iso);
  const isToday = date.toDateString() === new Date().toDateString();

  return isToday
    ? date.toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" })
    : date.toLocaleDateString("th-TH", { day: "numeric", month: "short" });
}