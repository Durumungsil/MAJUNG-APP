import type { Itinerary, TimelineStop } from "../model/types";

/** 해당 날짜의 방문 장소 목록. 그날 일정이 없으면 빈 배열 */
export function getDayStops(itinerary: Itinerary, date: string | undefined): TimelineStop[] {
  return itinerary.days.find((day) => day.date === date)?.stops ?? [];
}
