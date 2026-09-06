import { createHmac, timingSafeEqual } from 'node:crypto';
import { env } from '../env';

/**
 * ตรวจว่า request มาจาก LINE จริงหรือไม่
 *
 * LINE เซ็น raw body ด้วย channel secret แบบ HMAC-SHA256 แล้วส่ง base64
 * มาใน header `x-line-signature` — เราเซ็นแบบเดียวกันแล้วเทียบว่าตรงกันไหม
 *
 * @param rawBody  body ดิบจาก `req.text()`
 * @param signature  ค่าจาก header `x-line-signature`
 */
export function verifySignature(rawBody: string, signature: string | null): boolean {
  if (!signature) return false;

  const expected = createHmac('sha256', env.lineChannelSecret)
    .update(rawBody)
    .digest('base64');

  const a = Buffer.from(signature, 'utf8');
  const b = Buffer.from(expected, 'utf8');

  // timingSafeEqual จะ throw ถ้าความยาวไม่เท่ากัน
  if (a.length !== b.length) return false;

  return timingSafeEqual(a, b);
}
