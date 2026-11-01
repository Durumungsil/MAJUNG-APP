import type { LatLng } from "@/shared/model";

/** 백엔드 좌표 → LatLng. 좌표 캐시가 만료되면 위도·경도가 null로 오므로 하나라도 없으면 null */
export function toLatLng(latitude: number | null, longitude: number | null): LatLng | null {
  if (latitude === null || longitude === null) return null;
  return { lat: latitude, lng: longitude };
}
