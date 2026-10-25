import type { FoodScore, MyPreference, TransportType, TravelCategory } from "@/entities/preference";
import {
  MAX_BUDGET,
  MAX_FOOD_RATING,
  TRANSPORT_OPTIONS,
  TRAVEL_STYLE_OPTIONS,
} from "../config/options";
import type { SurveyDefaults, SurveyValues } from "../model/types";

/** 저장 API에 보낼 값 (camelCase) */
export type PreferencePayload = Pick<
  MyPreference,
  "transportTypes" | "foodPreferences" | "allergies" | "travelCategories" | "budgetMax"
>;

/** 어떤 입력이 잘못됐는지 (화면에서 안내 문구를 고르는 데 씀) */
export type SurveyInvalidField = "budget" | "transport" | "travelStyle";

export type PayloadResult =
  { ok: true; payload: PreferencePayload } | { ok: false; field: SurveyInvalidField };

const TRANSPORT_VALUES = new Set<string>(TRANSPORT_OPTIONS.map((option) => option.value));
const TRAVEL_STYLE_VALUES = new Set<string>(TRAVEL_STYLE_OPTIONS.map((option) => option.value));

/** 빈 값이면 null, 0 ~ MAX_BUDGET 정수가 아니면 undefined(잘못된 입력) */
function parseBudget(text: string): number | null | undefined {
  if (!text) return null;
  if (!/^\d+$/.test(text)) return undefined;
  const budget = Number(text);
  return budget <= MAX_BUDGET ? budget : undefined;
}

/** "땅콩, 새우,," → ["땅콩", "새우"] (앞뒤 공백 제거, 빈 값·중복 제외) */
export function parseAllergies(text: string): string[] {
  const words = text
    .split(",")
    .map((word) => word.trim())
    .filter(Boolean);
  return [...new Set(words)];
}

/** 이름이 비었거나 별점이 0점(미선택)인 줄은 빼고 보냄 */
function parseFoods(names: string[], ratings: number[]): FoodScore[] {
  return names.flatMap((rawName, index) => {
    const food = rawName.trim();
    const score = ratings[index] ?? 0;
    return food && score >= 1 && score <= MAX_FOOD_RATING ? [{ food, score }] : [];
  });
}

/** 설문 입력을 저장 API 값으로 바꿈. 잘못된 입력이 있으면 해당 항목을 알려줌 */
export function toPreferencePayload(values: SurveyValues): PayloadResult {
  const budgetMax = parseBudget(values.budget);
  if (budgetMax === undefined) return { ok: false, field: "budget" };

  const transportTypes = values.transports.filter((value): value is TransportType =>
    TRANSPORT_VALUES.has(value),
  );
  if (transportTypes.length === 0) return { ok: false, field: "transport" };

  const travelCategories = values.travelStyles.filter((value): value is TravelCategory =>
    TRAVEL_STYLE_VALUES.has(value),
  );
  if (travelCategories.length === 0) return { ok: false, field: "travelStyle" };

  return {
    ok: true,
    payload: {
      budgetMax,
      allergies: parseAllergies(values.allergy),
      foodPreferences: parseFoods(values.foodNames, values.foodRatings),
      transportTypes,
      travelCategories,
    },
  };
}

/** 불러온 이전 취향을 설문 기본값으로 바꿈 (선택지와 1:1이라 그대로 채움) */
export function toSurveyDefaults(preference: MyPreference): SurveyDefaults {
  return {
    budget: preference.budgetMax === null ? "" : String(preference.budgetMax),
    allergy: preference.allergies.join(","),
    foods: preference.foodPreferences.map((item) => ({ name: item.food, rating: item.score })),
    transports: preference.transportTypes,
    travelStyles: preference.travelCategories,
  };
}
