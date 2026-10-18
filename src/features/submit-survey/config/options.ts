export const MAX_FOOD_RATING = 5;

export const TRANSPORT_OPTIONS = [
  { value: "walk", label: "걷기" },
  { value: "bus", label: "버스" },
  { value: "subway", label: "지하철" },
  { value: "airplane", label: "비행기" },
] as const;

export const TRAVEL_STYLE_OPTIONS = [
  { value: "healing", label: "힐링" },
  { value: "festival", label: "축제" },
  { value: "shopping", label: "쇼핑" },
  { value: "culture", label: "문화관광" },
  { value: "activity", label: "액티비티" },
  { value: "food-tour", label: "맛집 탐방" },
  { value: "nature", label: "자연친화적" },
] as const;

export const INITIAL_FOOD_ROW_COUNT = 2;
