export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-zinc-50 font-sans dark:bg-zinc-950">
      {/* ── Header ───────────────────────────────────────────── */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-zinc-200 bg-white px-4 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-500 text-sm font-bold text-white">
            L
          </span>
          <h1 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            LINE Webchat Console
          </h1>
        </div>

        <span className="rounded-full border border-amber-300 bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700 dark:border-amber-700/50 dark:bg-amber-950/40 dark:text-amber-400">
          ยังไม่เชื่อมต่อ LINE OA
        </span>
      </header>

      <div className="flex min-h-0 flex-1">
        {/* ── Sidebar: User List ──────────────────────────── */}
        <aside className="flex w-60 shrink-0 flex-col border-r border-zinc-200 bg-white md:w-80 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="shrink-0 border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
            <h2 className="text-xs font-semibold tracking-wide text-zinc-500 uppercase dark:text-zinc-400">
              การสนทนา
            </h2>
            <p className="mt-0.5 text-xs text-zinc-400 dark:text-zinc-500">
              0 รายการ
            </p>
          </div>

          {/* TODO: แทนที่ด้วย <UserList /> */}
          <div className="flex flex-1 items-center justify-center overflow-y-auto p-6">
            <p className="text-center text-xs leading-5 text-zinc-400 dark:text-zinc-500">
              ยังไม่มีผู้ใช้ทักเข้ามา
              <br />
              รอเชื่อมต่อ LINE webhook
            </p>
          </div>
        </aside>

        {/* ── Chat pane ────────────────────────────────────────── */}
        <section className="flex min-w-0 flex-1 flex-col">
          {/* TODO: แทนที่ด้วย <ChatWindow /> */}
          <div className="flex flex-1 items-center justify-center overflow-y-auto p-6">
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-200 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-600">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 10h8M8 14h5m-8 7 3.5-3.5H18a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v14Z"
                  />
                </svg>
              </div>
              <p className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
                ยังไม่ได้เลือกห้องแชท
              </p>
              <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-500">
                เลือกผู้ใช้จากรายการทางซ้ายเพื่อดูข้อความ
              </p>
            </div>
          </div>

          {/* TODO: แทนที่ด้วย <MessageInput /> */}
          <div className="shrink-0 border-t border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center gap-2">
              <input
                type="text"
                disabled
                placeholder="เลือกผู้ใช้ก่อนจึงจะพิมพ์ได้"
                className="min-w-0 flex-1 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 disabled:cursor-not-allowed dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500"
              />
              <button
                type="button"
                disabled
                className="shrink-0 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                ส่ง
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
