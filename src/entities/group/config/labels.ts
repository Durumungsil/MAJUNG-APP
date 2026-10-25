import type { TripMode, TripStatus } from "../model/types";

export const TRIP_STATUS_LABEL: Record<TripStatus, string> = {
  PLANNING: "계획 중",
  IN_PROGRESS: "여행 중",
  COMPLETED: "여행 끝",
};

/** 모드 선택 화면의 카드 이름과 같게 표기 */
export const TRIP_MODE_LABEL: Record<TripMode, string> = {
  STORY: "STORY",
  ADVENTURE: "ADVENTURE",
  EXTREME: "EXTREME",
};
