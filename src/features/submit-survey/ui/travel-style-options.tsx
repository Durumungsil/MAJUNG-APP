import type { TravelCategory } from "@/entities/preference";
import { TRAVEL_STYLE_OPTIONS } from "../config/options";

type TravelStyleOptionsProps = {
  defaultValues?: TravelCategory[];
};

/** 여행 스타일 여러 개 선택 (최소 1개는 제출할 때 확인함) */
export default function TravelStyleOptions({ defaultValues = [] }: TravelStyleOptionsProps) {
  return (
    <fieldset className="flex flex-col">
      <legend className="mb-6 text-m text-black">어떤 식으로 여행하는걸 좋아하나요?</legend>
      <div className="flex flex-col gap-2">
        {TRAVEL_STYLE_OPTIONS.map((option) => (
          <label
            key={option.value}
            className="flex cursor-pointer items-center gap-3 text-s text-black"
          >
            <input
              type="checkbox"
              name="travelStyle"
              value={option.value}
              defaultChecked={defaultValues.includes(option.value)}
              className="peer sr-only"
            />
            <span
              aria-hidden
              className="relative size-4 shrink-0 rounded-full border border-natural-500 bg-white peer-checked:border-primary-400 peer-checked:after:absolute peer-checked:after:inset-px peer-checked:after:rounded-full peer-checked:after:bg-primary-400 peer-focus-visible:ring-1 peer-focus-visible:ring-primary-400"
            />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
