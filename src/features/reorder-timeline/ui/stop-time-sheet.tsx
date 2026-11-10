"use client";

import { useId, useState, type FormEvent, type ReactNode } from "react";
import type { TimelineStop } from "@/entities/journey";
import { BottomSheet, Button, FormRow, TextField, type BottomSheetSnap } from "@/shared/ui";
import { formatMinutes, type TimeSlot } from "../lib/time-slot";

type StopTimeSheetProps = {
  /** 고칠 방문. null이면 닫힘 */
  stop: TimelineStop | null;
  placeName: ReactNode;
  /** 하루 일정 범위. 이 안에서만 시간을 고를 수 있음 */
  dayRange: TimeSlot;
  /** 저장 요청 중이면 버튼에 진행 상태를 표시함 */
  isSaving: boolean;
  onClose: () => void;
  onSave: (startTime: string, endTime: string) => void;
};

/** 방문 시작·종료 시간을 고치는 시트. 검사·저장은 부모가 함 */
export default function StopTimeSheet({
  stop,
  placeName,
  dayRange,
  isSaving,
  onClose,
  onSave,
}: StopTimeSheetProps) {
  const [snap, setSnap] = useState<BottomSheetSnap>("expanded");

  if (!stop) return null;

  return (
    <BottomSheet
      open
      snap={snap}
      onSnapChange={setSnap}
      onClose={onClose}
      labelledBy="stop-time-title"
    >
      {/* 다른 방문을 열면 입력값을 새로 시작하도록 key를 줌 */}
      <StopTimeForm
        key={stop.id}
        stop={stop}
        placeName={placeName}
        dayRange={dayRange}
        isSaving={isSaving}
        onSave={onSave}
      />
    </BottomSheet>
  );
}

function StopTimeForm({
  stop,
  placeName,
  dayRange,
  isSaving,
  onSave,
}: Pick<StopTimeSheetProps, "placeName" | "dayRange" | "isSaving" | "onSave"> & {
  stop: TimelineStop;
}) {
  const startId = useId();
  const endId = useId();
  const minTime = formatMinutes(dayRange.start);
  const maxTime = formatMinutes(dayRange.end);

  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    onSave(String(data.get("startTime") ?? ""), String(data.get("endTime") ?? ""));
  }

  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col gap-10">
      <div className="flex flex-col gap-1.25">
        <h2 id="stop-time-title" className="text-xl text-text-primary">
          방문 시간 수정
        </h2>
        <p className="truncate text-s text-text-secondary">{placeName}</p>
      </div>
      <div className="flex flex-col gap-5">
        <FormRow label="시작 시간" htmlFor={startId}>
          <TextField
            id={startId}
            name="startTime"
            type="time"
            required
            min={minTime}
            max={maxTime}
            defaultValue={stop.startTime}
          />
        </FormRow>
        <FormRow label="종료 시간" htmlFor={endId}>
          <TextField
            id={endId}
            name="endTime"
            type="time"
            required
            min={minTime}
            max={maxTime}
            defaultValue={stop.endTime}
          />
        </FormRow>
      </div>
      <Button type="submit" size="xl" disabled={isSaving} aria-busy={isSaving}>
        저장하기
      </Button>
    </form>
  );
}
