"use client";

import { useId, useState } from "react";
import { TextField } from "@/shared/ui";
import { INITIAL_FOOD_ROW_COUNT } from "../config/options";
import { createFoodPreference, toggleRating, updateFoodPreference } from "../lib/food-preferences";
import type { FoodPreference } from "../model/types";
import StarRating from "./star-rating";

type FoodPreferenceListProps = {
  /** 이전 취향을 불러왔을 때 채울 값 */
  defaultFoods?: Pick<FoodPreference, "name" | "rating">[];
};

function createInitialRows(
  prefix: string,
  defaultFoods: Pick<FoodPreference, "name" | "rating">[] = [],
): FoodPreference[] {
  const rowCount = Math.max(INITIAL_FOOD_ROW_COUNT, defaultFoods.length);
  return Array.from({ length: rowCount }, (_, index) => ({
    ...createFoodPreference(`${prefix}-${index}`),
    ...defaultFoods[index],
  }));
}

export default function FoodPreferenceList({ defaultFoods }: FoodPreferenceListProps) {
  const id = useId();
  const [rows, setRows] = useState<FoodPreference[]>(() => createInitialRows(id, defaultFoods));

  function handleAddClick() {
    setRows((prev) => [...prev, createFoodPreference(`${id}-${prev.length}`)]);
  }

  function handleNameChange(key: string, name: string) {
    setRows((prev) => updateFoodPreference(prev, key, { name }));
  }

  function handleRatingChange(key: string, currentRating: number, clickedRating: number) {
    setRows((prev) =>
      updateFoodPreference(prev, key, { rating: toggleRating(currentRating, clickedRating) }),
    );
  }

  return (
    <fieldset className="flex flex-col gap-6">
      <legend className="mb-6 text-m text-black">선호 음식 및 선호도</legend>
      <div className="flex flex-col gap-8">
        <ul className="flex flex-col gap-5">
          {rows.map((row, index) => (
            <li key={row.key} className="flex items-center gap-4">
              <TextField
                name="foodName"
                value={row.name}
                onChange={(event) => handleNameChange(row.key, event.target.value)}
                placeholder="입력하세요"
                aria-label={`선호 음식 ${index + 1}`}
                className="flex-1"
              />
              {/* 별점은 버튼이라 폼 값에 안 잡히므로 숨은 입력으로 함께 제출함 */}
              <input type="hidden" name="foodRating" value={row.rating} />
              <StarRating
                value={row.rating}
                label={`선호 음식 ${index + 1} 선호도`}
                onChange={(rating) => handleRatingChange(row.key, row.rating, rating)}
              />
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={handleAddClick}
          className="w-full rounded-lg border border-dashed border-text-muted px-2.5 py-2 text-center text-xs text-text-muted"
        >
          추가하기
        </button>
      </div>
    </fieldset>
  );
}
