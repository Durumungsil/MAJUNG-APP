import type { TransportType, TravelCategory } from "@/entities/preference";

export type FoodPreference = {
  key: string;
  name: string;
  /** 0 = 미선택, 1 ~ MAX_FOOD_RATING */
  rating: number;
};

/** 설문 폼에서 읽은 원본 입력 (민감 정보 포함 - 저장소·로그·URL에 남기지 말 것) */
export type SurveyValues = {
  budget: string;
  allergy: string;
  foodNames: string[];
  foodRatings: number[];
  transports: string[];
  travelStyles: string[];
};

/** 설문 폼 기본값 (이전 취향 불러오기 결과) */
export type SurveyDefaults = {
  budget: string;
  allergy: string;
  foods: { name: string; rating: number }[];
  transports: TransportType[];
  travelStyles: TravelCategory[];
};
