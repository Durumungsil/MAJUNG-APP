import { apiRequest } from "@/shared/api";
import { toLatLng } from "@/shared/lib";
import type { Place, PlaceCategory } from "../model/types";
import type {
  DestinationRecommendationsResponse,
  NearbyDestinationsResponse,
  RecommendedPlaceItem,
} from "./dto";

export type RecommendedPlacePage = {
  places: Place[];
  /** 다음 페이지가 없으면 null */
  nextCursor: string | null;
};

function toPlace(item: RecommendedPlaceItem): Place {
  return {
    id: item.place_id,
    name: item.name,
    category: item.category,
    location: toLatLng(item.latitude, item.longitude),
  };
}

/**
 * 여행지 리스트 추천 - 그룹 취향 기준 추천 장소 한 페이지.
 * category가 null이면 그룹 취향 상위 카테고리를 섞어서 추천함.
 * cursor는 같은 category로만 이어 받을 수 있음 (조건이 바뀌거나 15분이 지나면 400)
 */
export async function fetchRecommendedPlaces(
  groupId: number,
  {
    category,
    limit,
    cursor,
  }: { category: PlaceCategory | null; limit: number; cursor: string | null },
): Promise<RecommendedPlacePage> {
  const params = new URLSearchParams({ limit: String(limit) });
  if (category) params.set("category", category);
  if (cursor) params.set("cursor", cursor);
  const data = await apiRequest<DestinationRecommendationsResponse>(
    `/api/v1/groups/${groupId}/destinations/recommendations?${params}`,
  );
  return { places: data.items.map(toPlace), nextCursor: data.next_cursor };
}

/** 2차 추천 - 기준 장소 주변 추천 장소 첫 페이지 (기준 장소는 결과에서 빠짐) */
export async function fetchNearbyPlaces(groupId: number, placeId: string): Promise<Place[]> {
  const data = await apiRequest<NearbyDestinationsResponse>(
    `/api/v1/groups/${groupId}/destinations/${encodeURIComponent(placeId)}/recommendations`,
  );
  return data.items.map(toPlace);
}
