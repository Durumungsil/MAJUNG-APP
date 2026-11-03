import type { OpeningTimePoint, PlaceOpeningHours, PlaceOpenStatus } from "../model/types";

const MINUTES_PER_DAY = 24 * 60;
const MINUTES_PER_WEEK = 7 * MINUTES_PER_DAY;
/** 장소 시차를 모를 때 쓰는 한국 표준시(UTC+9) */
const KOREA_UTC_OFFSET_MINUTES = 9 * 60;

/** 일요일 0시부터 지난 분 */
function toMinuteOfWeek({ day, hour, minute }: OpeningTimePoint): number {
  return day * MINUTES_PER_DAY + hour * 60 + minute;
}

/** 지금 시각을 장소 현지 기준 "일요일 0시부터 지난 분"으로 바꿈 */
function getLocalMinuteOfWeek(now: Date, utcOffsetMinutes: number): number {
  const local = new Date(now.getTime() + utcOffsetMinutes * 60_000);
  return local.getUTCDay() * MINUTES_PER_DAY + local.getUTCHours() * 60 + local.getUTCMinutes();
}

function formatTime({ hour, minute }: OpeningTimePoint): string {
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

/**
 * 정기 영업시간으로 지금 열려 있는지와 다음 여는 시각을 계산함.
 * 영업시간 정보가 없으면 null
 */
export function getOpenStatus(
  hours: PlaceOpeningHours | null,
  now: Date = new Date(),
): PlaceOpenStatus | null {
  if (!hours || hours.periods.length === 0) return null;

  const current = getLocalMinuteOfWeek(now, hours.utcOffsetMinutes ?? KOREA_UTC_OFFSET_MINUTES);

  const isOpen = hours.periods.some(({ open, close }) => {
    if (close === null) return true;
    const start = toMinuteOfWeek(open);
    let end = toMinuteOfWeek(close);
    // 자정을 넘기거나 토요일 → 일요일로 넘어가는 구간
    if (end <= start) end += MINUTES_PER_WEEK;
    return (
      (current >= start && current < end) ||
      (current + MINUTES_PER_WEEK >= start && current + MINUTES_PER_WEEK < end)
    );
  });
  if (isOpen) return { isOpen: true };

  // 지금부터 가장 먼저 돌아오는 여는 시각
  const next = hours.periods
    .map(({ open }) => ({
      open,
      wait: (toMinuteOfWeek(open) - current + MINUTES_PER_WEEK) % MINUTES_PER_WEEK,
    }))
    .sort((a, b) => a.wait - b.wait)[0];

  return { isOpen: false, nextOpenTime: next ? formatTime(next.open) : null };
}
