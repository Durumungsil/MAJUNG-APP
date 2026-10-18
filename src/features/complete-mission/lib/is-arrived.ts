import { getDistanceMeters } from "@/shared/lib/get-distance-meters";
import type { LatLngLiteral } from "@/shared/model/lat-lng";
import { ARRIVAL_RADIUS_METERS } from "../config/arrival";

// TODO: 도착 판정은 백엔드가 할 예정이라 API 연동 시 서버 판정 결과로 대체
export function isArrived(
  current: LatLngLiteral | null,
  target: LatLngLiteral | null,
  radiusMeters: number = ARRIVAL_RADIUS_METERS,
): boolean {
  if (current === null || target === null) return false;
  return getDistanceMeters(current, target) <= radiusMeters;
}
