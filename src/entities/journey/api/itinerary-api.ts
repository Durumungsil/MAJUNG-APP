import { apiRequest } from "@/shared/api";
import { toLatLng } from "@/shared/lib";
import type { Itinerary, TimelineStop } from "../model/types";
import type { ItineraryItemResponse, ItineraryResponse } from "./dto";

function isVisit(
  item: ItineraryItemResponse,
): item is Extract<ItineraryItemResponse, { type: "VISIT" }> {
  return item.type === "VISIT";
}

/** "HH:mm"은 문자열 순서가 시간 순서와 같음 */
function compareStartTime(a: TimelineStop, b: TimelineStop): number {
  return a.startTime.localeCompare(b.startTime);
}

/**
 * 타임라인 응답 → 화면용 Itinerary. 이동(MOVE) 항목은 화면에 없으므로 버림.
 * 방문 시간을 고쳐도 서버의 sequence는 그대로라서 시작 시각 순으로 다시 정렬함
 */
export function toItinerary(data: ItineraryResponse): Itinerary {
  return {
    id: data.itinerary_id,
    startDate: data.start_date,
    endDate: data.end_date,
    dayStartTime: data.day_start_time,
    dayEndTime: data.day_end_time,
    days: data.days.map((day) => ({
      date: day.date,
      stops: day.items
        .filter(isVisit)
        .map((item): TimelineStop => ({
          id: String(item.item_id),
          placeId: item.place_id,
          startTime: item.start_at,
          endTime: item.end_at,
          location: toLatLng(item.latitude, item.longitude),
        }))
        .sort(compareStartTime),
    })),
  };
}

/** 타임라인 조회 */
export async function fetchItinerary(groupId: number, itineraryId: number): Promise<Itinerary> {
  const data = await apiRequest<ItineraryResponse>(
    `/api/v1/groups/${groupId}/itineraries/${itineraryId}`,
  );
  return toItinerary(data);
}
