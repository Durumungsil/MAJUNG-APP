import type { LatLngLiteral } from "@/shared/model/lat-lng";

// 현재 위치를 아직 받지 못했거나 위치 권한이 거부됐을 때 보여줄 기본 좌표 (Figma 시안의 광화문 일대)
export const DEFAULT_MAP_CENTER: LatLngLiteral = { lat: 37.5705, lng: 126.9784 };
