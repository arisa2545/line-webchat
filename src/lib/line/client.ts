import { env } from '../env';
import type { LineProfile } from './types';

const LINE_API = 'https://api.line.me/v2/bot';

/**
 * fetch ไม่ throw เมื่อได้ 4xx/5xx — มันคืน response ปกติแค่ `res.ok` เป็น false
 */
async function assertOk(res: Response, action: string): Promise<void> {
  if (res.ok) return;
  const detail = await res.text().catch(() => '');
  throw new Error(`LINE ${action} failed: ${res.status} ${res.statusText} ${detail}`.trim());
}

export async function getProfile(userId: string): Promise<LineProfile> {
  const res = await fetch(`${LINE_API}/profile/${userId}`, {
    headers: { Authorization: `Bearer ${env.lineAccessToken}` },
  });

  await assertOk(res, `getProfile(${userId})`);
  return res.json() as Promise<LineProfile>;
}

export async function pushMessage(userId: string, text: string): Promise<void> {
  const res = await fetch(`${LINE_API}/message/push`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.lineAccessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      to: userId,
      messages: [{ type: 'text', text }],
    }),
  });

  await assertOk(res, 'pushMessage');
}
