import { apiRequest } from "@/shared/api";
import { toLatLng } from "@/shared/lib";
import type { Itinerary, TimelineStop } from "../model/types";
import type { ItineraryItemResponse, ItineraryResponse } from "./dto";

function isVisit(
  item: ItineraryItemResponse,
): item is Extract<ItineraryItemResponse, { type: "VISIT" }> {
  return item.type === "VISIT";
}

/** 타임라인 응답 → 화면용 Itinerary. 이동(MOVE) 항목은 화면에 없으므로 버림 */
export function toItinerary(data: ItineraryResponse): Itinerary {
  return {
    id: data.itinerary_id,
    startDate: data.start_date,
    endDate: data.end_date,
    days: data.days.map((day) => ({
      date: day.date,
      stops: day.items.filter(isVisit).map((item): TimelineStop => ({
        id: String(item.item_id),
        placeId: item.place_id,
        startTime: item.start_at,
        endTime: item.end_at,
        location: toLatLng(item.latitude, item.longitude),
      })),
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
