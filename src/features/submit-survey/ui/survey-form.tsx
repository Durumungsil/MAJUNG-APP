"use client";

import { useRouter } from "next/navigation";
import { useId, type FormEvent } from "react";
import { Button, TextField } from "@/shared/ui";
import FoodPreferenceList from "./food-preference-list";
import TransportOptions from "./transport-options";
import TravelStyleOptions from "./travel-style-options";

type SurveyFormProps = {
  submittedHref: string;
};

/**
 * 취향 설문 폼.
 * 응답(특히 알레르기)은 민감 정보이므로 브라우저 저장소에 남기지 않고 폼 상태로만 다룸.
 */
export default function SurveyForm({ submittedHref }: SurveyFormProps) {
  const router = useRouter();
  const id = useId();

  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO: 설문 제출 API 연동 (응답 원문을 로그·URL에 남기지 말 것)
    router.push(submittedHref);
  }

  function handleLoadPreviousClick() {
    // TODO: 이전 취향 설문지 불러오기 API 연동
  }

  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col gap-25">
      <div className="flex flex-col gap-12.5">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.25">
            <h1 className="text-xl text-black">취향 설문을 시작해요!</h1>
            <p className="text-s text-text-secondary">
              입력하신 정보를 통합하여 여행 계획을 세워요!
            </p>
          </div>
          <button
            type="button"
            onClick={handleLoadPreviousClick}
            className="w-full rounded-lg bg-secondary-400 px-5 py-1.5 text-s text-black"
          >
            이전 취향 설문지 불러오기
          </button>
        </div>

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
                  placeholder="알러지를 입력하세요"
                  aria-describedby={`${id}-allergy-hint`}
                />
              </div>
              <p id={`${id}-allergy-hint`} className="text-right text-xs text-text-muted">
                여러개를 입력해야한다면 쉼표(,)로 띄어쓰기 없이 붙여주세요!
              </p>
            </div>
          </div>

          <FoodPreferenceList />

          <div className="flex flex-col gap-13.5">
            <TransportOptions />
            <TravelStyleOptions />
          </div>
        </div>
      </div>

      <Button type="submit" size="xl" className="h-11.25">
        제출하기
      </Button>
    </form>
  );
}
