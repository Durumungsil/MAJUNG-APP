import type { ItineraryDay } from "@/entities/journey";
import type { PlaceCategory } from "@/entities/place";

export type DestinationSelection = {
  place_id: string;
  /** 여행 회차 안에서 겹치지 않는 방문 순서 (1부터) */
  order: number;
  /** YYYY-MM-DD */
  visit_date: string;
  /** 없으면 서버가 관광명소(SIGHTSEEING)로 봄. 체류 시간·끼니 배치에 쓰이므로 알면 꼭 보냄 */
  category?: PlaceCategory;
};

/** 선택한 장소 하나. 일정 응답에는 카테고리가 없어 타임라인에서 넘길 때는 비어 있음 */
export type SelectionStop = {
  placeId: string;
  category?: PlaceCategory | null;
};

/** 선택 저장에 필요한 만큼만 받음. 타임라인의 ItineraryDay도 그대로 넘길 수 있음 */
export type SelectionDay = Pick<ItineraryDay, "date"> & {
  stops: readonly SelectionStop[];
};

/** 날짜순·하루 안 순서대로 방문 순서를 1부터 매겨 선택 저장 body로 만듦 */
export function toSelectionPayload(days: readonly SelectionDay[]): DestinationSelection[] {
  return [...days]
    .sort((a, b) => a.date.localeCompare(b.date))
    .flatMap((day) => day.stops.map((stop) => ({ date: day.date, stop })))
    .map(({ date, stop }, index) => ({
      place_id: stop.placeId,
      order: index + 1,
      visit_date: date,
      ...(stop.category ? { category: stop.category } : {}),
    }));
}
