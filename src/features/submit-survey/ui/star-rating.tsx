"use client";

import { StarEmptyIcon, StarFilledIcon } from "@/shared/assets";
import { MAX_FOOD_RATING } from "../config/options";

type StarRatingProps = {
  value: number;
  label: string;
  onChange: (value: number) => void;
};

const STARS = Array.from({ length: MAX_FOOD_RATING }, (_, index) => index + 1);

export default function StarRating({ value, label, onChange }: StarRatingProps) {
  return (
    <div role="radiogroup" aria-label={label} className="flex shrink-0 gap-1">
      {STARS.map((star) => (
        <button
          key={star}
          type="button"
          role="radio"
          aria-checked={value === star}
          aria-label={`${star}점`}
          onClick={() => onChange(star)}
          className="size-6.5 p-px"
        >
          {star <= value ? (
            <StarFilledIcon className="size-full text-primary-400" />
          ) : (
            <StarEmptyIcon className="size-full text-natural-400" />
          )}
        </button>
      ))}
    </div>
  );
}
