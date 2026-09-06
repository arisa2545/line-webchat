-- ─────────────────────────────────────────────
-- 1. Tables
-- ─────────────────────────────────────────────

create table line_users (
  id              text primary key,          -- LINE userId "Uxxxxxxxx..."
  display_name    text not null default '',
  picture_url     text,
  last_message_at timestamptz not null default now(),
  created_at      timestamptz not null default now()
);

create table messages (
  id         uuid primary key default gen_random_uuid(),
  user_id    text not null references line_users(id) on delete cascade,
  direction  text not null check (direction in ('inbound', 'outbound')),
  type       text not null default 'text',
  text       text not null,
  created_at timestamptz not null default now()
);

-- ─────────────────────────────────────────────
-- 2. Index
-- ─────────────────────────────────────────────

create index messages_user_created_idx on messages (user_id, created_at desc);
create index line_users_last_message_idx on line_users (last_message_at desc); -- sort sidebar ตามคนที่ทักล่าสุด

-- ─────────────────────────────────────────────
-- 3. Realtime publication
-- ─────────────────────────────────────────────

-- ให้ client subscribe INSERT ของ messages ได้
alter publication supabase_realtime add table messages;

-- ─────────────────────────────────────────────
-- 4. RLS
-- ─────────────────────────────────────────────
-- repo เป็น public และ anon key ฝังอยู่ในหน้าเว็บ ใครก็เห็น
-- RLS คือสิ่งที่กันข้อมูลจริง ไม่ใช่ความลับของ key

alter table line_users enable row level security;
alter table messages   enable row level security;

-- อ่านได้สาธารณะ (MVP — ดูข้อ 8 ในแผนถ้าจะอัปเกรดเป็น auth)
create policy "public read" on line_users for select using (true);
create policy "public read" on messages   for select using (true);