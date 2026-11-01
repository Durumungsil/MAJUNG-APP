import type { PlaceCategory } from "../model/types";

// 백엔드 JSON이 snake_case라서 응답 타입은 필드 이름을 그대로 따름. 화면에서는 model/types로 변환해서 씀

/** 추천 항목 공통 필드. 주소·사진·평점은 내려오지 않음 */
export type RecommendedPlaceItem = {
  place_id: string;
  name: string;
  category: PlaceCategory;
  latitude: number | null;
  longitude: number | null;
  distance_meters: number;
  score: number;
};

/** GET /destinations/recommendations 응답 */
export type DestinationRecommendationsResponse = {
  region: string;
  area: {
    latitude: number;
    longitude: number;
    radius_meters: number;
    transport_type: string;
    based_on: string;
  } | null;
  items: (RecommendedPlaceItem & { reason: string })[];
  /** 마지막 페이지면 null */
  next_cursor: string | null;
};

/** GET /destinations/{placeId}/recommendations 응답 (2차 추천) */
export type NearbyDestinationsResponse = {
  base_destination: { place_id: string; latitude: number | null; longitude: number | null };
  radius_meters: number;
  transport_type: string;
  items: (RecommendedPlaceItem & { estimated_travel_minutes: number })[];
  next_cursor: string | null;
};
