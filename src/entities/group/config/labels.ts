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

/** 버튼 문구에 쓰는 한국어 모드 이름. 모드 화면의 "스토리 모드 종료하기" 등과 같게 표기 */
export const TRIP_MODE_NAME: Record<TripMode, string> = {
  STORY: "스토리",
  ADVENTURE: "모험",
  EXTREME: "익스트림",
};
