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

type GroupFormProps = {
  defaultValues?: Partial<GroupFormValues>;
  dateLabels: { start: string; end: string };
  submitLabel: string;
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
  defaultValues,
  dateLabels,
  submitLabel,
  onSubmit,
}: GroupFormProps) {
  const id = useId();
  const [maxMembers, setMaxMembers] = useState(defaultValues?.maxMembers ?? "");
  const showHint = exceedsMaxMembers(maxMembers);

  function handleMaxMembersChange(event: ChangeEvent<HTMLInputElement>) {
    setMaxMembers(sanitizeMaxMembersInput(event.target.value));
  }

  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = readFormValues(event.currentTarget);
    if (!isValidMaxMembers(values.maxMembers)) return;
    onSubmit(values);
  }

  return (
    <form onSubmit={handleFormSubmit} className="mt-26 flex flex-1 flex-col justify-between gap-10">
      <div className="flex flex-col gap-15">
        <div className="flex flex-col gap-8">
          <FormRow label="그룹명" htmlFor={`${id}-name`}>
            <TextField
              id={`${id}-name`}
              name="name"
              required
              defaultValue={defaultValues?.name}
              placeholder="그룹명을 입력하세요"
            />
          </FormRow>
          <FormRow label="여행 장소" htmlFor={`${id}-destination`}>
            <TextField
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
        <div className="flex flex-col gap-8">
          <FormRow label={dateLabels.start} htmlFor={`${id}-start-date`}>
            <TextField
              id={`${id}-start-date`}
              name="startDate"
              required
              defaultValue={defaultValues?.startDate}
              placeholder={`${dateLabels.start}을 입력하세요`}
            />
          </FormRow>
          <FormRow label={dateLabels.end} htmlFor={`${id}-end-date`}>
            <TextField
              id={`${id}-end-date`}
              name="endDate"
              required
              defaultValue={defaultValues?.endDate}
              placeholder={`${dateLabels.end}을 입력하세요`}
            />
          </FormRow>
        </div>
      </div>
      <Button type="submit">{submitLabel}</Button>
    </form>
  );
}
