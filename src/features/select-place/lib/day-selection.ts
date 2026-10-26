/** 방문일(YYYY-MM-DD)별로 고른 장소 id. 배열 순서가 그날 고른 순서 */
export type DaySelection = Readonly<Record<string, readonly number[]>>;

/**
 * date에 장소를 추가함. 한 장소는 타임라인에 한 번만 들어가므로
 * 다른 날에 이미 고른 장소면 그날에서 빼고 이 날로 옮김
 */
export function addPlaceToDate(
  selection: DaySelection,
  date: string,
  placeId: number,
): DaySelection {
  const next: Record<string, readonly number[]> = {};
  for (const [selectedDate, placeIds] of Object.entries(selection)) {
    const rest = placeIds.filter((id) => id !== placeId);
    if (rest.length > 0) next[selectedDate] = rest;
  }
  next[date] = [...(next[date] ?? []), placeId];
  return next;
}

export function getSelectedCount(selection: DaySelection): number {
  return Object.values(selection).reduce((count, placeIds) => count + placeIds.length, 0);
}

/** 선택 저장 body로 바꿀 수 있게 날짜별 방문 목록으로 펼침 */
export function toSelectionDays(selection: DaySelection) {
  return Object.entries(selection).map(([date, placeIds]) => ({
    date,
    stops: placeIds.map((destinationId) => ({ destinationId })),
  }));
}
