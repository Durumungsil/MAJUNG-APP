import type { PlaceCategory } from "../model/types";

/** 장소 카테고리 표시 이름 (취향 설문 선택지와 같은 이름) */
export const PLACE_CATEGORY_LABEL: Record<PlaceCategory, string> = {
  HEALING: "힐링",
  FESTIVAL: "축제",
  SHOPPING: "쇼핑",
  CULTURE: "문화관광",
  ACTIVITY: "액티비티",
  FOOD: "맛집 탐방",
  NATURE: "자연친화적",
  CAFE: "카페·디저트",
  SIGHTSEEING: "관광명소",
};

/** 추천 목록 카테고리 탭 순서. null은 그룹 취향 전체. FESTIVAL은 서버가 검색하지 않으므로 뺌 */
export const RECOMMENDATION_CATEGORIES = [
  null,
  "FOOD",
  "CAFE",
  "SIGHTSEEING",
  "CULTURE",
  "ACTIVITY",
  "SHOPPING",
  "NATURE",
  "HEALING",
] as const satisfies readonly (PlaceCategory | null)[];

export const ALL_CATEGORIES_LABEL = "전체";
