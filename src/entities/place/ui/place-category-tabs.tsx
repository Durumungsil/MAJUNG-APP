"use client";

import { cn } from "@/shared/lib";
import {
  ALL_CATEGORIES_LABEL,
  PLACE_CATEGORY_LABEL,
  RECOMMENDATION_CATEGORIES,
} from "../config/category";
import type { PlaceCategory } from "../model/types";

type PlaceCategoryTabsProps = {
  /** null = 전체 */
  selected: PlaceCategory | null;
  onSelect: (category: PlaceCategory | null) => void;
};

/** 추천 목록 카테고리 탭. 일정 헤더의 Day 탭과 같은 모양 */
export default function PlaceCategoryTabs({ selected, onSelect }: PlaceCategoryTabsProps) {
  return (
    <div
      role="group"
      aria-label="장소 카테고리"
      className="scrollbar-none flex gap-2 overflow-x-auto"
    >
      {RECOMMENDATION_CATEGORIES.map((category) => {
        const isSelected = category === selected;
        return (
          <button
            key={category ?? "ALL"}
            type="button"
            aria-pressed={isSelected}
            onClick={() => onSelect(category)}
            className={cn(
              "shrink-0 rounded-lg px-4 py-1 text-xs whitespace-nowrap text-text-primary",
              isSelected ? "bg-secondary-400" : "bg-secondary-300",
            )}
          >
            {category ? PLACE_CATEGORY_LABEL[category] : ALL_CATEGORIES_LABEL}
          </button>
        );
      })}
    </div>
  );
}
