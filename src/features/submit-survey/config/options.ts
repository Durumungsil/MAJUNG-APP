import type { TransportType, TravelCategory } from "@/entities/preference";

export const MAX_FOOD_RATING = 5;

/** 예산 최댓값 (백엔드 검증 범위) */
export const MAX_BUDGET = 100_000_000;

/** 선택지 value가 곧 백엔드 TransportType 값 (1:1) */
export const TRANSPORT_OPTIONS = [
  { value: "WALK", label: "도보" },
  { value: "BICYCLE", label: "자전거" },
  { value: "BUS", label: "버스" },
  // 타일이 좁아 "/기차"부터 줄바꿈 (타일에 whitespace-pre-line 적용)
  { value: "TRAIN", label: "지하철\n/기차" },
  { value: "TAXI", label: "택시" },
  { value: "CAR", label: "렌터카" },
  { value: "OWN_CAR", label: "자가용" },
  { value: "AIRPLANE", label: "비행기" },
] as const satisfies readonly { value: TransportType; label: string }[];

/**
 * 선택지 value가 곧 백엔드 TravelCategory 값 (1:1).
 * FESTIVAL은 서버가 장소 검색에 쓰지 않으므로 선택지에서 숨김 (이전 응답에 있어도 다시 제출할 때 빠짐)
 */
export const TRAVEL_STYLE_OPTIONS = [
  { value: "HEALING", label: "힐링" },
  { value: "SHOPPING", label: "쇼핑" },
  { value: "CULTURE", label: "문화관광" },
  { value: "ACTIVITY", label: "액티비티" },
  { value: "FOOD", label: "맛집 탐방" },
  { value: "NATURE", label: "자연친화적" },
  { value: "CAFE", label: "카페·디저트" },
  { value: "SIGHTSEEING", label: "관광명소" },
] as const satisfies readonly { value: TravelCategory; label: string }[];

export const INITIAL_FOOD_ROW_COUNT = 2;
