import type { DestinationCategory } from "../api/dto";

/** 추천 장소 카테고리 표시 이름 (취향 설문 선택지와 같은 이름) */
export const DESTINATION_CATEGORY_LABEL: Record<DestinationCategory, string> = {
  HEALING: "힐링",
  FESTIVAL: "축제",
  SHOPPING: "쇼핑",
  CULTURE: "문화관광",
  ACTIVITY: "액티비티",
  FOOD: "맛집 탐방",
  NATURE: "자연친화적",
};
