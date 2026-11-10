import { canPlaceSlot, overlaps, toTimeSlot, type TimeSlot } from "./time-slot";

export type TimePatch = { id: string; slot: TimeSlot };

type PlanTimePatchesInput = {
  /** 서버에 저장된 그날 방문 시간 (항목 id → 구간) */
  current: ReadonlyMap<string, TimeSlot>;
  /** 바꾸려는 그날 방문 시간. current에 있는 항목만 봄 */
  target: ReadonlyMap<string, TimeSlot>;
  dayRange: TimeSlot;
};

/** 빈 시간에 잠깐 옮겨 둘 때 쓰는 길이(분) */
const PARK_MINUTES = 1;

/**
 * 하루치 방문 시간을 하나씩 PATCH할 순서를 정함.
 * 서버는 요청마다 같은 날 다른 방문과 겹치면 거절하므로, 두 장소를 맞바꾸면 바로 보낼 수 없음.
 * 지금 바로 옮길 수 있는 항목부터 보내고, 막히면 한 항목을 빈 시간에 1분짜리로 잠깐 옮겨
 * 자리를 비운 뒤 이어 감. 최종 시간이 서로 겹치거나 비울 빈 시간이 없으면 null
 */
export function planTimePatches({
  current,
  target,
  dayRange,
}: PlanTimePatchesInput): TimePatch[] | null {
  const state = new Map(current);
  const pending = new Set(
    [...target]
      .filter(([id, slot]) => {
        const now = current.get(id);
        return now !== undefined && (now.start !== slot.start || now.end !== slot.end);
      })
      .map(([id]) => id),
  );

  // 최종 상태 자체가 서버 규칙에 맞는지 먼저 확인함
  const finalSlots = [...state].map(([id, slot]) => target.get(id) ?? slot);
  const isFinalValid = finalSlots.every((slot, index) =>
    canPlaceSlot(
      slot,
      finalSlots.filter((_, otherIndex) => otherIndex !== index),
      dayRange,
    ),
  );
  if (!isFinalValid) return null;

  const patches: TimePatch[] = [];
  const parked = new Set<string>();

  function othersOf(id: string): TimeSlot[] {
    return [...state].filter(([otherId]) => otherId !== id).map(([, slot]) => slot);
  }

  function apply(id: string, slot: TimeSlot) {
    state.set(id, slot);
    patches.push({ id, slot });
  }

  while (pending.size > 0) {
    const ready = [...pending].find((id) => {
      const slot = target.get(id);
      return slot !== undefined && canPlaceSlot(slot, othersOf(id), dayRange);
    });
    if (ready !== undefined) {
      apply(ready, target.get(ready) as TimeSlot);
      pending.delete(ready);
      continue;
    }

    const toPark = [...pending].find((id) => !parked.has(id));
    if (toPark === undefined) return null;
    const gap = findGap(toPark);
    if (gap === null) return null;
    apply(toPark, gap);
    parked.add(toPark);
  }

  return patches;

  /** 다른 방문의 지금 시간과 다른 대기 항목의 최종 시간을 모두 피하는 빈 시간 */
  function findGap(id: string): TimeSlot | null {
    const blockers = [
      ...othersOf(id),
      ...[...pending]
        .filter((otherId) => otherId !== id)
        .map((otherId) => target.get(otherId))
        .filter((slot): slot is TimeSlot => slot !== undefined),
    ];
    const candidates = [dayRange.start, ...blockers.map((slot) => slot.end)].sort((a, b) => a - b);
    for (const start of candidates) {
      const slot = { start, end: start + PARK_MINUTES };
      if (slot.end <= dayRange.end && blockers.every((blocker) => !overlaps(slot, blocker))) {
        return slot;
      }
    }
    return null;
  }
}

type DayStops = {
  date: string;
  stops: readonly { id: string; startTime: string; endTime: string }[];
};

function toSlotMap(stops: DayStops["stops"]): Map<string, TimeSlot> | null {
  const map = new Map<string, TimeSlot>();
  for (const stop of stops) {
    const slot = toTimeSlot(stop.startTime, stop.endTime);
    if (slot === null) return null;
    map.set(stop.id, slot);
  }
  return map;
}

/**
 * 타임라인 전체(여러 날)의 PATCH 순서. 서버는 같은 날 안에서만 겹침을 보므로 날짜별로 따로 정함.
 * 하루라도 순서를 정할 수 없으면 null
 */
export function planTimelinePatches(
  savedDays: readonly DayStops[],
  editedDays: readonly DayStops[],
  dayRange: TimeSlot,
): TimePatch[] | null {
  const patches: TimePatch[] = [];
  for (const saved of savedDays) {
    const edited = editedDays.find((day) => day.date === saved.date);
    if (!edited) continue;
    const current = toSlotMap(saved.stops);
    const target = toSlotMap(edited.stops);
    if (current === null || target === null) return null;
    const dayPatches = planTimePatches({ current, target, dayRange });
    if (dayPatches === null) return null;
    patches.push(...dayPatches);
  }
  return patches;
}
