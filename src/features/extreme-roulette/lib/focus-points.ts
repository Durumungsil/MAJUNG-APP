import type { LatLng } from "@/shared/model";

/** 장소 주변으로 지도를 맞출 범위 (위도, 경도 반경) */
const FOCUS_RADIUS = { lat: 0.004, lng: 0.005 } as const;

/** 좌표 하나만으로 범위를 맞추면 최대로 확대되므로, 주변을 함께 보이도록 두 꼭짓점을 만듦 */
export function getFocusPoints(center: LatLng): LatLng[] {
  return [
    { lat: center.lat - FOCUS_RADIUS.lat, lng: center.lng - FOCUS_RADIUS.lng },
    { lat: center.lat + FOCUS_RADIUS.lat, lng: center.lng + FOCUS_RADIUS.lng },
  ];
}
