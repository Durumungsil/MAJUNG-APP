"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { isApiError } from "@/shared/api";
import { ERROR_MESSAGES } from "@/shared/config/error-messages";
import { useToast } from "@/shared/lib";
import { Button, Toast } from "@/shared/ui";
import { useLoadPreviousPreference, useSavePreference } from "../api/save-preference";
import {
  toPreferencePayload,
  toSurveyDefaults,
  type SurveyInvalidField,
} from "../lib/preference-payload";
import type { SurveyDefaults, SurveyValues } from "../model/types";
import SurveyFields from "./survey-fields";

type SurveyFormProps = {
  groupId: number;
  submittedHref: string;
};

const INVALID_FIELD_MESSAGES: Record<SurveyInvalidField, string> = {
  budget: ERROR_MESSAGES.surveyBudgetInvalid,
  transport: ERROR_MESSAGES.surveyTransportRequired,
  travelStyle: ERROR_MESSAGES.surveyTravelStyleRequired,
};

function readSurveyValues(form: HTMLFormElement): SurveyValues {
  const data = new FormData(form);
  return {
    budget: String(data.get("budget") ?? "").trim(),
    allergy: String(data.get("allergy") ?? ""),
    foodNames: data.getAll("foodName").map(String),
    foodRatings: data.getAll("foodRating").map(Number),
    transports: data.getAll("transport").map(String),
    travelStyles: data.getAll("travelStyle").map(String),
  };
}

/**
 * 취향 설문 폼.
 * 응답(특히 알레르기)은 민감 정보이므로 브라우저 저장소에 남기지 않고 폼 상태로만 다룸.
 */
export default function SurveyForm({ groupId, submittedHref }: SurveyFormProps) {
  const router = useRouter();
  const { toastMessage, showToast } = useToast();
  const [defaults, setDefaults] = useState<SurveyDefaults>();
  // 이전 취향을 불러오면 입력칸을 새 기본값으로 다시 그림
  const [fieldsKey, setFieldsKey] = useState(0);
  const { mutate: savePreference, isPending: isSaving } = useSavePreference(groupId);
  const { mutate: loadPrevious, isPending: isLoading } = useLoadPreviousPreference(groupId);

  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // 응답 원문을 로그·URL에 남기지 말 것
    const result = toPreferencePayload(readSurveyValues(event.currentTarget));
    if (!result.ok) {
      showToast(INVALID_FIELD_MESSAGES[result.field]);
      return;
    }

    savePreference(result.payload, {
      onSuccess: () => router.push(submittedHref),
      onError: (error) =>
        showToast(
          isApiError(error, 409) ? ERROR_MESSAGES.noActiveTrip : ERROR_MESSAGES.requestFailed,
        ),
    });
  }

  function handleLoadPreviousClick() {
    loadPrevious(undefined, {
      onSuccess: (preference) => {
        setDefaults(toSurveyDefaults(preference));
        setFieldsKey((prev) => prev + 1);
      },
      onError: (error) =>
        showToast(
          isApiError(error, 404)
            ? ERROR_MESSAGES.previousSurveyNotFound
            : ERROR_MESSAGES.loadFailed,
        ),
    });
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
            disabled={isLoading}
            aria-busy={isLoading}
            className="w-full rounded-lg bg-secondary-400 px-5 py-1.5 text-s text-black disabled:opacity-50"
          >
            이전 취향 설문지 불러오기
          </button>
        </div>

        <SurveyFields key={fieldsKey} defaults={defaults} />
      </div>

      <Button type="submit" size="xl" className="h-11.25" disabled={isSaving} aria-busy={isSaving}>
        제출하기
      </Button>
      <Toast open={toastMessage !== null} message={toastMessage ?? ""} />
    </form>
  );
}
