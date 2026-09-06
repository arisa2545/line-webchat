# LINE OA Webchat Console

คอนโซลสำหรับ operator ที่รวมแชทจากผู้ใช้ LINE หลายคนมาไว้ที่เดียว เลือกคนแล้วตอบกลับได้

## 🔗 ลิงก์สำหรับทดสอบ

| | |
|---|---|
| **LINE OA** | [`https://line.me/R/ti/p/@566rdlqp`](https://line.me/R/ti/p/@566rdlqp) — หรือค้นหา ID `@566rdlqp` ในแอป LINE |
| **Webchat Console** | **https://line-webchat-jet.vercel.app** |
| **GitHub** | https://github.com/arisa2545/line-webchat |

**ทดสอบได้ทันทีจากลิงก์ด้านบน ไม่ต้องติดตั้งอะไร** — แอดเพื่อนกับ LINE OA แล้วทักข้อความ จากนั้นเปิดคอนโซลเพื่อดูและตอบกลับ (คอนโซลไม่มีระบบล็อกอิน)

---

## 💻 วิธีรันโปรเจกต์

> หัวข้อนี้สำหรับคนที่ต้องการ**รันจากซอร์สโค้ดในเครื่องตัวเอง**เท่านั้น — ถ้าแค่ต้องการทดสอบระบบ ใช้ลิงก์ด้านบนได้เลย
>
> การรันในเครื่องต้องใช้ Supabase project และ LINE Official Account **ของตัวเอง** เพราะ repo นี้เป็น public จึงไม่มี secret ใด ๆ อยู่ในโค้ด
>
> 📩 หากกรรมการต้องการรันในเครื่องโดยใช้ Supabase และ LINE OA ชุดเดียวกับที่ deploy อยู่ **ติดต่อผู้จัดทำเพื่อขอค่า environment variables ได้โดยตรง** — ยินดีส่งให้เป็นการส่วนตัว แต่ไม่เผยแพร่ในที่สาธารณะเพราะ repo เป็น public

### 1. ติดตั้ง

```bash
git clone https://github.com/arisa2545/line-webchat.git
cd line-webchat
npm install
```

### 2. ตั้งฐานข้อมูล

สร้าง Supabase project แล้วรัน [`supabase/schema.sql`](supabase/schema.sql) ทั้งไฟล์ใน SQL Editor — ไฟล์เดียวจบครบทั้งตาราง index RLS และ realtime publication

### 3. ตั้ง environment variables

```bash
cp .env.example .env.local
```

แล้วเติมให้ครบ 5 ตัว:

| ตัวแปร | หาได้จาก |
|---|---|
| `LINE_CHANNEL_SECRET` | LINE Developers Console → Basic settings |
| `LINE_CHANNEL_ACCESS_TOKEN` | LINE Developers Console → Messaging API → Issue |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Settings → Data API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Settings → API Keys |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Settings → API Keys |

> `NEXT_PUBLIC_SUPABASE_URL` ต้องเป็น URL ของ project เท่านั้น (`https://xxx.supabase.co`) ไม่ต้องมี `/rest/v1/` ต่อท้าย

### 4. รัน

```bash
npm run dev     # http://localhost:3000
```

### 5. ให้ LINE ยิง webhook เข้าเครื่อง

LINE ต้องการ HTTPS จึงยิงเข้า `localhost` ตรง ๆ ไม่ได้ ต้องเปิด tunnel:

```bash
cloudflared tunnel --url http://localhost:3000
```

เอา URL ที่ได้ไปใส่ใน LINE Developers Console เป็น `<url>/api/line/webhook`
