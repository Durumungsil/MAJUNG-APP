import type { FoodPreference } from "../model/types";

export function createFoodPreference(key: string): FoodPreference {
  return { key, name: "", rating: 0 };
}

export function updateFoodPreference(
  list: FoodPreference[],
  key: string,
  patch: Partial<Omit<FoodPreference, "key">>,
): FoodPreference[] {
  return list.map((item) => (item.key === key ? { ...item, ...patch } : item));
}

/** 같은 별을 다시 누르면 선택을 해제함 */
export function toggleRating(currentRating: number, clickedRating: number): number {
  return currentRating === clickedRating ? 0 : clickedRating;
}
