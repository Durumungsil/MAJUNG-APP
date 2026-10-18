import type { LatLngLiteral } from "@/shared/model/lat-lng";
import type { JourneyStop } from "../model/journey-stop";

// TODO: API 연동 시 제거. 퍼블리싱용 임시 장소 좌표 (Figma 힌트 시안의 마포구 동교동 일대 도로)
const MOCK_LOCATIONS: LatLngLiteral[] = [
  { lat: 37.5568, lng: 126.9237 },
  { lat: 37.5547, lng: 126.9226 },
  { lat: 37.5573, lng: 126.925 },
  { lat: 37.5536, lng: 126.9244 },
  { lat: 37.5509, lng: 126.9227 },
];

export const MOCK_JOURNEY_STOPS: JourneyStop[] = MOCK_LOCATIONS.map((location, index) => ({
  id: String(index + 1),
  placeName: "장소 이름",
  location,
  rank: null,
  startedAt: null,
  endedAt: null,
}));
