import type { TimelineStop } from "../model/types";

// TODO: AI 타임라인 API 연동 전까지 사용하는 퍼블리싱용 목 데이터
export const MOCK_TIMELINE_STOPS: TimelineStop[] = [
  {
    id: "stop-1",
    destinationId: 1,
    startTime: "09:00",
    endTime: "11:00",
    placeName: "현태의 집",
    location: { lat: 35.205, lng: 128.999 },
  },
  {
    id: "stop-2",
    destinationId: 2,
    startTime: "11:00",
    endTime: "13:00",
    placeName: "미수의 집",
    location: { lat: 35.153, lng: 129.02 },
  },
  {
    id: "stop-3",
    destinationId: 3,
    startTime: "13:00",
    endTime: "15:00",
    placeName: "소리의 집",
    location: { lat: 35.17, lng: 128.985 },
  },
  {
    id: "stop-4",
    destinationId: 4,
    startTime: "15:00",
    endTime: "17:00",
    placeName: "정우의 집",
    location: { lat: 35.162, lng: 128.984 },
  },
  {
    id: "stop-5",
    destinationId: 5,
    startTime: "17:00",
    endTime: "19:00",
    placeName: "광안리 해수욕장",
    location: { lat: 35.1532, lng: 129.1186 },
  },
  {
    id: "stop-6",
    destinationId: 6,
    startTime: "19:00",
    endTime: "21:00",
    placeName: "해운대 해수욕장",
    location: { lat: 35.1587, lng: 129.1604 },
  },
];
