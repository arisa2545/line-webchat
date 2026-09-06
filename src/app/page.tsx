import { ChatBubbleIcon } from "@/components/icons/ChatBubbleIcon";
import "@/styles/chat-console.css";

export default function Home() {
  return (
    <div className="chat-console">
      {/* ── Header ───────────────────────────────────────────── */}
      <header className="chat-console__header">
        <div className="chat-console__brand">
          <span className="chat-console__logo">L</span>
          <h1 className="chat-console__title">LINE Webchat Console</h1>
        </div>

        <span className="chat-console__badge">ยังไม่เชื่อมต่อ LINE OA</span>
      </header>

      <div className="chat-console__body">
        {/* ── Sidebar: User List ──────────────────────────── */}
        <aside className="chat-console__sidebar">
          <div className="chat-console__sidebar-header">
            <h2 className="chat-console__sidebar-title">การสนทนา</h2>
            <p className="chat-console__sidebar-count">0 รายการ</p>
          </div>

          {/* TODO: แทนที่ด้วย <UserList /> */}
          <div className="chat-console__sidebar-empty">
            <p>
              ยังไม่มีผู้ใช้ทักเข้ามา
              <br />
              รอเชื่อมต่อ LINE webhook
            </p>
          </div>
        </aside>

        {/* ── Chat pane ────────────────────────────────────────── */}
        <section className="chat-console__chat">
          {/* TODO: แทนที่ด้วย <ChatWindow /> */}
          <div className="chat-console__empty">
            <div>
              <div className="chat-console__empty-icon">
                <ChatBubbleIcon />
              </div>
              <p className="chat-console__empty-title">ยังไม่ได้เลือกห้องแชท</p>
              <p className="chat-console__empty-hint">
                เลือกผู้ใช้จากรายการทางซ้ายเพื่อดูข้อความ
              </p>
            </div>
          </div>

          {/* TODO: แทนที่ด้วย <MessageInput /> */}
          <div className="chat-console__composer">
            <input
              type="text"
              disabled
              placeholder="เลือกผู้ใช้ก่อนจึงจะพิมพ์ได้"
              className="chat-console__input"
            />
            <button type="button" disabled className="chat-console__send">
              ส่ง
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
