"use client";

import { useId, useState, type ChangeEvent, type FormEvent } from "react";
import { Button, FormRow, TextField } from "@/shared/ui";
import { MAX_GROUP_MEMBERS } from "../config/constants";
import {
  exceedsMaxMembers,
  isValidMaxMembers,
  sanitizeMaxMembersInput,
} from "../lib/validate-max-members";
import type { GroupFormValues } from "../model/types";

type GroupFormLayout = "create" | "edit";

/** 수정 화면은 기존 값을 muted 톤으로 보여줌 (Figma 기준) */
const FIELD_CLASS: Record<GroupFormLayout, string | undefined> = {
  create: undefined,
  edit: "text-text-muted",
};

type GroupFormProps = {
  layout: GroupFormLayout;
  defaultValues?: Partial<GroupFormValues>;
  dateLabels: { start: string; end: string };
  submitLabel: string;
  /** 저장 요청 중이면 제출 버튼을 잠금 */
  submitting?: boolean;
  onSubmit: (values: GroupFormValues) => void;
};

function readFormValues(form: HTMLFormElement): GroupFormValues {
  const data = new FormData(form);
  return {
    name: String(data.get("name") ?? "").trim(),
    destination: String(data.get("destination") ?? "").trim(),
    maxMembers: String(data.get("maxMembers") ?? "").trim(),
    startDate: String(data.get("startDate") ?? "").trim(),
    endDate: String(data.get("endDate") ?? "").trim(),
  };
}

export default function GroupForm({
  layout,
  defaultValues,
  dateLabels,
  submitLabel,
  submitting = false,
  onSubmit,
}: GroupFormProps) {
  const id = useId();
  const [maxMembers, setMaxMembers] = useState(defaultValues?.maxMembers ?? "");
  // 종료일 선택기가 시작일 이전 날짜를 고를 수 없도록 min으로 씀
  const [startDate, setStartDate] = useState(defaultValues?.startDate ?? "");
  const showHint = exceedsMaxMembers(maxMembers);
  const fieldClass = FIELD_CLASS[layout];

  function handleMaxMembersChange(event: ChangeEvent<HTMLInputElement>) {
    setMaxMembers(sanitizeMaxMembersInput(event.target.value));
  }

  function handleStartDateChange(event: ChangeEvent<HTMLInputElement>) {
    setStartDate(event.target.value);
  }

  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = readFormValues(event.currentTarget);
    if (!isValidMaxMembers(values.maxMembers)) return;
    onSubmit(values);
  }

  return (
    <form onSubmit={handleFormSubmit} className="mt-12.5 flex flex-col gap-25">
      <div className="flex flex-col gap-12.5">
        <div className="flex flex-col gap-6">
          <FormRow label="그룹명" htmlFor={`${id}-name`}>
            <TextField
              className={fieldClass}
              id={`${id}-name`}
              name="name"
              required
              defaultValue={defaultValues?.name}
              placeholder="그룹명을 입력하세요"
            />
          </FormRow>
          <FormRow label="여행 장소" htmlFor={`${id}-destination`}>
            <TextField
              className={fieldClass}
              id={`${id}-destination`}
              name="destination"
              required
              defaultValue={defaultValues?.destination}
              placeholder="여행 장소를 입력하세요"
            />
          </FormRow>
          <FormRow
            label="최대 인원"
            htmlFor={`${id}-max-members`}
            hint={
              showHint && (
                <p id={`${id}-max-members-hint`} className="text-xxs text-red">
                  *최대 {MAX_GROUP_MEMBERS}명까지 입력할 수 있어요
                </p>
              )
            }
          >
            <TextField
              className={fieldClass}
              id={`${id}-max-members`}
              name="maxMembers"
              inputMode="numeric"
              pattern="[1-9][0-9]*"
              required
              value={maxMembers}
              onChange={handleMaxMembersChange}
              placeholder="최대 인원를 입력하세요"
              aria-invalid={showHint}
              aria-describedby={showHint ? `${id}-max-members-hint` : undefined}
            />
          </FormRow>
        </div>
        <div className="flex flex-col gap-6">
          <FormRow label={dateLabels.start} htmlFor={`${id}-start-date`}>
            {/* 백엔드가 날짜(YYYY-MM-DD)만 받으므로 날짜 선택기를 씀. 값은 항상 YYYY-MM-DD 형식 */}
            <TextField
              className={fieldClass}
              id={`${id}-start-date`}
              name="startDate"
              type="date"
              required
              value={startDate}
              onChange={handleStartDateChange}
            />
          </FormRow>
          <FormRow label={dateLabels.end} htmlFor={`${id}-end-date`}>
            <TextField
              className={fieldClass}
              id={`${id}-end-date`}
              name="endDate"
              type="date"
              required
              min={startDate || undefined}
              defaultValue={defaultValues?.endDate}
            />
          </FormRow>
        </div>
      </div>
      <Button type="submit" size="xl" disabled={submitting} aria-busy={submitting}>
        {submitLabel}
      </Button>
    </form>
  );
}
