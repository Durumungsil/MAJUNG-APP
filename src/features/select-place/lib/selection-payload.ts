import type { ItineraryDay, TimelineStop } from "@/entities/journey";

export type DestinationSelection = {
  destination_id: number;
  /** 여행 회차 안에서 겹치지 않는 방문 순서 (1부터) */
  order: number;
  /** YYYY-MM-DD */
  visit_date: string;
};

/** 선택 저장에 필요한 만큼만 받음. 타임라인의 ItineraryDay도 그대로 넘길 수 있음 */
export type SelectionDay = Pick<ItineraryDay, "date"> & {
  stops: readonly Pick<TimelineStop, "destinationId">[];
};

/** 날짜순·하루 안 순서대로 방문 순서를 1부터 매겨 선택 저장 body로 만듦 */
export function toSelectionPayload(days: readonly SelectionDay[]): DestinationSelection[] {
  return [...days]
    .sort((a, b) => a.date.localeCompare(b.date))
    .flatMap((day) => day.stops.map((stop) => ({ date: day.date, stop })))
    .map(({ date, stop }, index) => ({
      destination_id: stop.destinationId,
      order: index + 1,
      visit_date: date,
    }));
}
