// 백엔드 enum 값. 설문 선택지와 1:1로 대응함

export type TransportType =
  "WALK" | "BICYCLE" | "BUS" | "TRAIN" | "TAXI" | "CAR" | "OWN_CAR" | "AIRPLANE";

export type TravelCategory =
  "HEALING" | "FESTIVAL" | "SHOPPING" | "CULTURE" | "ACTIVITY" | "FOOD" | "NATURE";

export type FoodScore = {
  food: string;
  /** 1 ~ 5 */
  score: number;
};

/** 내가 입력한 취향 (민감 정보 포함 - 브라우저 저장소에 남기지 말 것) */
export type MyPreference = {
  transportTypes: TransportType[];
  foodPreferences: FoodScore[];
  /** 사용자가 입력한 알레르기 이름 그대로 (예: ["땅콩", "새우"]) */
  allergies: string[];
  travelCategories: TravelCategory[];
  budgetMax: number | null;
  /** 현재 회차에 입력이 없어 이전 회차 취향을 불러왔으면 true */
  loadedFromPrevious: boolean;
};

/** 그룹 취향 통합 결과. 멤버 개개인이 아닌 집계 값만 담김 */
export type PreferenceSummary = {
  transportTypes: TransportType[];
  foodPreferences: string[];
  travelCategories: TravelCategory[];
  allergies: string[];
  /** min = 멤버 예산 중 최솟값, max = 멤버 예산의 중앙값 */
  budget: { min: number | null; max: number | null };
  completedMemberCount: number;
  memberCount: number;
};
