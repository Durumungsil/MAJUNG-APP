// 백엔드 JSON이 snake_case라서 응답 타입은 필드 이름을 그대로 따름. 화면에서는 model/types로 변환해서 씀

/** 추천 장소 카테고리 (백엔드 enum) */
export type DestinationCategory =
  "HEALING" | "FESTIVAL" | "SHOPPING" | "CULTURE" | "ACTIVITY" | "FOOD" | "NATURE";

/** GET /destinations/recommendations 응답 */
export type DestinationRecommendationsResponse = {
  region: string;
  area: {
    latitude: number;
    longitude: number;
    radius_meters: number;
    transport_type: string;
    based_on: "SELECTION" | "TOP_RECOMMENDATION";
  } | null;
  items: {
    destination_id: number;
    name: string;
    category: DestinationCategory;
    address: string;
    latitude: number;
    longitude: number;
    distance_meters: number;
    score: number;
    reason: string;
  }[];
  /** 마지막 페이지면 null */
  next_cursor: string | null;
};
