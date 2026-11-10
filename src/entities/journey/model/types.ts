import type { LatLng } from "@/shared/model";

/** 타임라인의 한 칸. 시간은 "HH:mm". 장소 이름은 응답에 없어 Google SDK로 따로 조회함 */
export type TimelineStop = {
  id: string;
  /** Google place_id */
  placeId: string;
  startTime: string;
  endTime: string;
  /** 서버의 좌표 캐시가 만료되면 null */
  location: LatLng | null;
};

/** 하루 일정. 화면에는 방문(VISIT) 항목만 보여주므로 이동 항목은 담지 않음 */
export type ItineraryDay = {
  /** YYYY-MM-DD */
  date: string;
  stops: TimelineStop[];
};

/** 현재 여행 회차의 스토리모드 타임라인 */
export type Itinerary = {
  id: number;
  /** YYYY-MM-DD */
  startDate: string;
  /** YYYY-MM-DD */
  endDate: string;
  /** 하루 일정 시작 시각 "HH:mm". 방문 시간은 이 범위 안에서만 바꿀 수 있음 */
  dayStartTime: string;
  /** 하루 일정 종료 시각 "HH:mm" */
  dayEndTime: string;
  days: ItineraryDay[];
};
