import type { LatLng } from "@/shared/model";

/** 타임라인의 한 칸. 시간은 "HH:mm" */
export type TimelineStop = {
  id: string;
  /** 백엔드 destination_id */
  destinationId: number;
  startTime: string;
  endTime: string;
  placeName: string;
  /** 타임라인 응답에 좌표가 추가되기 전까지는 null일 수 있음 */
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
  days: ItineraryDay[];
};
