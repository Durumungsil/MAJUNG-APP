"use client";

import { useId } from "react";
import { TextField } from "@/shared/ui";
import type { SurveyDefaults } from "../model/types";
import FoodPreferenceList from "./food-preference-list";
import TransportOptions from "./transport-options";
import TravelStyleOptions from "./travel-style-options";

type SurveyFieldsProps = {
  defaults?: SurveyDefaults;
};

/** 설문 입력칸 묶음. 기본값이 바뀌면 상위에서 key를 바꿔 새로 그림 */
export default function SurveyFields({ defaults }: SurveyFieldsProps) {
  const id = useId();

  return (
    <div className="flex flex-col gap-12.5">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-8">
          <label htmlFor={`${id}-budget`} className="shrink-0 text-m text-black">
            예산
          </label>
          <TextField
            id={`${id}-budget`}
            name="budget"
            inputMode="numeric"
            defaultValue={defaults?.budget}
            placeholder="최대 예산을 입력하세요"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-5">
            <label htmlFor={`${id}-allergy`} className="shrink-0 text-m text-black">
              알러지
            </label>
            <TextField
              id={`${id}-allergy`}
              name="allergy"
              autoComplete="off"
              defaultValue={defaults?.allergy}
              placeholder="알러지를 입력하세요"
              aria-describedby={`${id}-allergy-hint`}
            />
          </div>
          <p id={`${id}-allergy-hint`} className="text-right text-xs text-text-muted">
            여러개를 입력해야한다면 쉼표(,)로 띄어쓰기 없이 붙여주세요!
          </p>
        </div>
      </div>

      <FoodPreferenceList defaultFoods={defaults?.foods} />

      <div className="flex flex-col gap-13.5">
        <TransportOptions defaultValues={defaults?.transports} />
        <TravelStyleOptions defaultValues={defaults?.travelStyles} />
      </div>
    </div>
  );
}
