export function formatTime(iso: string): string {
  const date = new Date(iso);
  const isToday = date.toDateString() === new Date().toDateString();

  return isToday
    ? date.toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" })
    : date.toLocaleDateString("th-TH", { day: "numeric", month: "short" });
}