import type { LatLngLiteral } from "@/shared/model/lat-lng";

/** 소수 넷째 자리(약 10m)로 반올림. 이보다 작은 움직임에는 남은 거리를 다시 묻지 않음 */
const POSITION_PRECISION = 10_000;

export function roundPosition({ lat, lng }: LatLngLiteral): LatLngLiteral {
  return {
    lat: Math.round(lat * POSITION_PRECISION) / POSITION_PRECISION,
    lng: Math.round(lng * POSITION_PRECISION) / POSITION_PRECISION,
  };
}
