import { getDistanceMeters } from "@/shared/lib/get-distance-meters";
import type { LatLngLiteral } from "@/shared/model/lat-lng";

const METERS_PER_KILOMETER = 1000;

/** 200 → "200m", 1234 → "1.2km" */
export function formatDistance(meters: number): string {
  if (meters < METERS_PER_KILOMETER) return `${Math.round(meters)}m`;
  return `${(meters / METERS_PER_KILOMETER).toFixed(1)}km`;
}

/**
 * 현재 위치에서 힌트로 본 미션 장소까지의 남은 거리 문구.
 * 미션 장소 좌표는 힌트 API에서만 받으므로, 지금 미션의 힌트를 아직 안 봤으면 null
 */
export function getRemainingDistanceLabel(
  position: LatLngLiteral | null,
  hintTarget: { missionId: number; location: LatLngLiteral } | null,
  missionId: number | null,
): string | null {
  if (position === null || hintTarget === null || hintTarget.missionId !== missionId) return null;
  return formatDistance(getDistanceMeters(position, hintTarget.location));
}
