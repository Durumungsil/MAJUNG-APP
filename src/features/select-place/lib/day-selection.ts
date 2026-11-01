import type { SelectionStop } from "./selection-payload";

/** 방문일(YYYY-MM-DD)별로 고른 장소. 배열 순서가 그날 고른 순서 */
export type DaySelection = Readonly<Record<string, readonly SelectionStop[]>>;

/**
 * date에 장소를 추가함. 한 장소는 타임라인에 한 번만 들어가므로
 * 다른 날에 이미 고른 장소면 그날에서 빼고 이 날로 옮김
 */
export function addPlaceToDate(
  selection: DaySelection,
  date: string,
  stop: SelectionStop,
): DaySelection {
  const next: Record<string, readonly SelectionStop[]> = {};
  for (const [selectedDate, stops] of Object.entries(selection)) {
    const rest = stops.filter(({ placeId }) => placeId !== stop.placeId);
    if (rest.length > 0) next[selectedDate] = rest;
  }
  next[date] = [...(next[date] ?? []), stop];
  return next;
}

export function getSelectedCount(selection: DaySelection): number {
  return Object.values(selection).reduce((count, stops) => count + stops.length, 0);
}

export function isPlaceSelected(stops: readonly SelectionStop[], placeId: string): boolean {
  return stops.some((stop) => stop.placeId === placeId);
}

/** 선택 저장 body로 바꿀 수 있게 날짜별 방문 목록으로 펼침 */
export function toSelectionDays(selection: DaySelection) {
  return Object.entries(selection).map(([date, stops]) => ({ date, stops }));
}
