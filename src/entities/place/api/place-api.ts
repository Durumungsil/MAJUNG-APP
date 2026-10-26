import { apiRequest } from "@/shared/api";
import { DESTINATION_CATEGORY_LABEL } from "../config/category";
import { MOCK_PLACE_DETAIL } from "../config/mock-places";
import type { Place } from "../model/types";
import type { DestinationRecommendationsResponse } from "./dto";

export type RecommendedPlacePage = {
  places: Place[];
  /** 다음 페이지가 없으면 null */
  nextCursor: string | null;
};

/** 백엔드 추천 장소 → 마중 Place. 응답에 없는 상세 정보는 장소 상세 API가 나오기 전까지 목 데이터로 채움 */
function toPlace(item: DestinationRecommendationsResponse["items"][number]): Place {
  return {
    ...MOCK_PLACE_DETAIL,
    id: item.destination_id,
    name: item.name,
    category: DESTINATION_CATEGORY_LABEL[item.category],
    address: item.address,
    location: { lat: item.latitude, lng: item.longitude },
  };
}

/** 여행지 리스트 추천 - 그룹 취향 기준 추천 장소 한 페이지 */
export async function fetchRecommendedPlaces(
  groupId: number,
  limit: number,
  cursor: string | null,
): Promise<RecommendedPlacePage> {
  const params = new URLSearchParams({ limit: String(limit) });
  if (cursor) params.set("cursor", cursor);
  const data = await apiRequest<DestinationRecommendationsResponse>(
    `/api/v1/groups/${groupId}/destinations/recommendations?${params}`,
  );
  return { places: data.items.map(toPlace), nextCursor: data.next_cursor };
}
