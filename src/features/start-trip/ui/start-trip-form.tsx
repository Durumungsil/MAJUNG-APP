"use client";

import { useRouter } from "next/navigation";
import { useId, useState, type ChangeEvent, type FormEvent } from "react";
import { isApiError } from "@/shared/api";
import { ERROR_MESSAGES } from "@/shared/config/error-messages";
import { useToast } from "@/shared/lib";
import { Button, FormRow, TextField, Toast } from "@/shared/ui";
import { useStartTrip } from "../api/start-trip";

type StartTripFormProps = {
  groupId: number;
  /** 지난 여행 지역을 기본값으로 채움 */
  defaultRegion?: string;
};

function getStartTripErrorMessage(error: unknown): string {
  if (isApiError(error, 400)) return ERROR_MESSAGES.groupFormInvalid;
  if (isApiError(error, 403)) return ERROR_MESSAGES.leaderOnly;
  if (isApiError(error, 409)) return ERROR_MESSAGES.tripInProgress;
  return ERROR_MESSAGES.requestFailed;
}

/** 같은 그룹이 다시 여행을 갈 때 새 여행 회차를 만드는 폼 (그룹 생성 폼과 같은 모양) */
export default function StartTripForm({ groupId, defaultRegion }: StartTripFormProps) {
  const id = useId();
  const router = useRouter();
  // 종료일 선택기가 시작일 이전 날짜를 고를 수 없도록 min으로 씀
  const [startDate, setStartDate] = useState("");
  const { mutate: startTrip, isPending } = useStartTrip(groupId);
  const { toastMessage, showToast } = useToast();

  function handleStartDateChange(event: ChangeEvent<HTMLInputElement>) {
    setStartDate(event.target.value);
  }

  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const values = {
      region: String(data.get("region") ?? "").trim(),
      startDate: String(data.get("startDate") ?? ""),
      endDate: String(data.get("endDate") ?? ""),
    };
    if (!values.region || !values.startDate || values.endDate < values.startDate) {
      showToast(ERROR_MESSAGES.groupFormInvalid);
      return;
    }

    startTrip(values, {
      // 새 여행은 모드가 정해지지 않은 상태라 바로 모드 선택으로 보냄
      onSuccess: () => router.push(`/groups/${groupId}/mode`),
      onError: (error) => showToast(getStartTripErrorMessage(error)),
    });
  }

  return (
    <form onSubmit={handleFormSubmit} className="mt-12.5 flex flex-col gap-25">
      <div className="flex flex-col gap-6">
        <FormRow label="여행 장소" htmlFor={`${id}-region`}>
          <TextField
            id={`${id}-region`}
            name="region"
            required
            defaultValue={defaultRegion}
            placeholder="여행 장소를 입력하세요"
          />
        </FormRow>
        <FormRow label="시작 날짜" htmlFor={`${id}-start-date`}>
          <TextField
            id={`${id}-start-date`}
            name="startDate"
            type="date"
            required
            value={startDate}
            onChange={handleStartDateChange}
          />
        </FormRow>
        <FormRow label="종료 날짜" htmlFor={`${id}-end-date`}>
          <TextField
            id={`${id}-end-date`}
            name="endDate"
            type="date"
            required
            min={startDate || undefined}
          />
        </FormRow>
      </div>
      <Button type="submit" size="xl" disabled={isPending} aria-busy={isPending}>
        새 여행 시작하기
      </Button>
      <Toast open={toastMessage !== null} message={toastMessage ?? ""} />
    </form>
  );
}
