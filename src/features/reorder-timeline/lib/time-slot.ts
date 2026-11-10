/** 하루 안의 시간 구간 (자정부터 분). end는 포함하지 않음 */
export type TimeSlot = { start: number; end: number };

/** 응답에 하루 일정 범위가 없을 때(예전 캐시) 쓰는 범위 */
const FALLBACK_DAY_RANGE: TimeSlot = { start: 0, end: 24 * 60 - 1 };

/** "HH:mm" → 분. 형식이 틀리면 null */
export function toMinutes(time: string): number | null {
  const match = /^(\d{2}):(\d{2})$/.exec(time);
  if (!match) return null;
  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (hours > 23 || minutes > 59) return null;
  return hours * 60 + minutes;
}

/** 분 → "HH:mm" */
export function formatMinutes(total: number): string {
  const hours = Math.floor(total / 60);
  const minutes = total % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

/** "HH:mm" 두 개 → 구간. 형식이 틀리거나 종료가 시작보다 빠르면 null */
export function toTimeSlot(startTime: string, endTime: string): TimeSlot | null {
  const start = toMinutes(startTime);
  const end = toMinutes(endTime);
  if (start === null || end === null || end <= start) return null;
  return { start, end };
}

/** 하루 일정 범위. 값이 없거나 틀리면 하루 전체로 봄 */
export function toDayRange(dayStartTime: string | undefined, dayEndTime: string | undefined) {
  return (dayStartTime && dayEndTime && toTimeSlot(dayStartTime, dayEndTime)) || FALLBACK_DAY_RANGE;
}

export function overlaps(a: TimeSlot, b: TimeSlot): boolean {
  return a.start < b.end && b.start < a.end;
}

function isWithin(slot: TimeSlot, range: TimeSlot): boolean {
  return slot.start >= range.start && slot.end <= range.end;
}

/**
 * 방문 시간을 slot으로 바꿀 수 있는지. 서버 규칙과 같게 하루 일정 범위 안이고
 * 같은 날 다른 방문과 겹치지 않아야 함
 */
export function canPlaceSlot(
  slot: TimeSlot,
  otherSlots: readonly TimeSlot[],
  dayRange: TimeSlot,
): boolean {
  return isWithin(slot, dayRange) && otherSlots.every((other) => !overlaps(slot, other));
}
