const DATE_TIME_PATTERN = /^\d{4}-(\d{2})-(\d{2})T(\d{2}):(\d{2})/;

/**
 * "2026-09-08T10:00:00" → "09.08 10:00까지" (초대 코드 만료 표시).
 * 서버가 시간대 없이 한국 시간으로 내려주므로 Date로 바꾸지 않고 문자열에서 바로 읽음
 */
export function formatExpiresAt(value: string): string | null {
  const match = DATE_TIME_PATTERN.exec(value);
  if (!match) return null;
  const [, month, day, hour, minute] = match;
  return `${month}.${day} ${hour}:${minute}까지`;
}
