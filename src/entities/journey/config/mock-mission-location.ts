import { offsetLatLng } from "@/shared/lib/offset-lat-lng";
import type { LatLngLiteral } from "@/shared/model/lat-lng";

// TODO: API 연동 시 이 파일 제거. 미션 장소 좌표는 서버가 정함

// 두 번째 미션 장소: 현재 위치에서 항상 북쪽으로 100m (힌트 로드뷰 테스트용, 도착 판정이 나지 않음)
const SECOND_MISSION_OFFSET_NORTH_METERS = 100;

export function getMockMissionLocation(
  currentIndex: number,
  position: LatLngLiteral | null,
): LatLngLiteral | null {
  if (position === null) return null;
  return currentIndex === 1
    ? offsetLatLng(position, SECOND_MISSION_OFFSET_NORTH_METERS, 0)
    : position;
}
