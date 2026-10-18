import type { LatLng } from "@/shared/model";
import { MOCK_RECOMMENDED_PLACES, createMockNearbyPlaces } from "../config/mock-places";
import type { Place } from "../model/types";

// TODO: 장소 API 연동 시 어댑터(외부 응답 → Place) + TanStack Query 훅으로 교체
export function getRecommendedPlaces(groupId: string): Place[] {
  void groupId;
  return MOCK_RECOMMENDED_PLACES;
}

/** 기준 좌표 주변의 추천 장소 */
export function getNearbyPlaces(center: LatLng): Place[] {
  return createMockNearbyPlaces(center);
}
