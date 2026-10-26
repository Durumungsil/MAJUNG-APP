import type { LatLng } from "@/shared/model";
import { createMockNearbyPlaces } from "../config/mock-places";
import type { Place } from "../model/types";

// TODO: 2차 추천 API에 좌표가 추가되면 실제 요청 + TanStack Query 훅으로 교체
/** 기준 좌표 주변의 추천 장소 */
export function getNearbyPlaces(center: LatLng): Place[] {
  return createMockNearbyPlaces(center);
}
