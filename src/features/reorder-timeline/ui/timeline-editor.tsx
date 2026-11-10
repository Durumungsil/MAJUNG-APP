"use client";

import { useState } from "react";
import { TimelineStopCard, type ItineraryDay, type TimelineStop } from "@/entities/journey";
import { PlaceName } from "@/entities/place";
import { ERROR_MESSAGES } from "@/shared/config/error-messages";
import { useToast } from "@/shared/lib";
import { Button, Toast } from "@/shared/ui";
import { useUpdateStopTime } from "../api/update-stop-time";
import { reorderStopPlaces } from "../lib/reorder-stops";
import type { TimeSlot } from "../lib/time-slot";
import { toEditedSlot, withDayStopTime } from "../lib/with-stop-time";
import { useLongPressReorder } from "../model/use-long-press-reorder";
import StopTimeSheet from "./stop-time-sheet";

type TimelineEditorProps = {
  groupId: number;
  itineraryId: number;
  initialDays: ItineraryDay[];
  /** 지금 보고 있는 날짜 (YYYY-MM-DD) */
  date: string | undefined;
  /** 방문 시간은 하루 일정 범위 안에서만 바꿀 수 있음 */
  dayRange: TimeSlot;
  /** 확정 요청 중이면 버튼에 진행 상태를 표시함 */
  isConfirming: boolean;
  /** 순서·시간을 바꾼 최종 일정을 넘김 */
  onConfirm: (days: ItineraryDay[]) => void;
};

/**
 * 날짜별로 장소 순서와 방문 시간을 바꿈. 다른 Day 탭을 봤다 와도 바꾼 내용이 남도록 날짜별로 들고 있음.
 * 꾹 눌러 바꾼 순서는 확정할 때 저장하고, 카드를 눌러 고친 시간은 시트에서 바로 저장함
 */
export default function TimelineEditor({
  groupId,
  itineraryId,
  initialDays,
  date,
  dayRange,
  isConfirming,
  onConfirm,
}: TimelineEditorProps) {
  const [stopsByDate, setStopsByDate] = useState<Record<string, TimelineStop[]>>(() =>
    Object.fromEntries(initialDays.map((day) => [day.date, day.stops])),
  );
  const [editingStop, setEditingStop] = useState<TimelineStop | null>(null);
  const { mutate: updateStopTime, isPending: isSavingTime } = useUpdateStopTime(
    groupId,
    itineraryId,
  );
  const { toastMessage, showToast } = useToast();
  const stops = (date && stopsByDate[date]) || [];

  function handleStopMove(from: number, to: number) {
    if (!date) return;
    setStopsByDate((prev) => ({
      ...prev,
      [date]: reorderStopPlaces(prev[date] ?? [], from, to),
    }));
  }

  function handleStopTap(index: number) {
    setEditingStop(stops[index] ?? null);
  }

  function handleSheetClose() {
    setEditingStop(null);
  }

  function handleTimeSave(startTime: string, endTime: string) {
    if (!date || !editingStop) return;
    const stopId = editingStop.id;
    const slot = toEditedSlot(stops, stopId, startTime, endTime, dayRange);
    if (slot === null) {
      showToast(ERROR_MESSAGES.timelineTimeInvalid);
      return;
    }
    updateStopTime(
      { id: stopId, slot },
      {
        onSuccess: (response) => {
          setStopsByDate((prev) => ({
            ...prev,
            [date]: withDayStopTime(prev[date] ?? [], stopId, response.start_at, response.end_at),
          }));
          setEditingStop(null);
          if (response.has_conflict) showToast(ERROR_MESSAGES.timelineOutsideOpenHours);
        },
        // 겹침·범위 오류(400)는 다른 기기에서 바뀐 일정 때문일 수 있어 같은 문구로 알림
        onError: () => showToast(ERROR_MESSAGES.timelineTimeInvalid),
      },
    );
  }

  function handleConfirmClick() {
    onConfirm(Object.entries(stopsByDate).map(([dayDate, stops]) => ({ date: dayDate, stops })));
  }

  const { draggingIndex, getItemProps } = useLongPressReorder({
    onMove: handleStopMove,
    onTap: handleStopTap,
  });

  return (
    <>
      <ol aria-label="타임라인" className="flex flex-col gap-5 select-none">
        {stops.map((stop, index) => (
          <li key={stop.id} {...getItemProps(index)} className="[-webkit-touch-callout:none]">
            {/* 누르면 시간 수정 시트가 열림. 클릭은 li의 탭 처리로 전달됨 */}
            <button type="button" className="block w-full">
              <TimelineStopCard
                stop={stop}
                placeName={<PlaceName placeId={stop.placeId} />}
                highlighted={draggingIndex === index}
              />
            </button>
          </li>
        ))}
      </ol>
      <Button
        size="xl"
        onClick={handleConfirmClick}
        disabled={isConfirming}
        aria-busy={isConfirming}
        className="mt-10"
      >
        타임라인 확정하기
      </Button>
      <StopTimeSheet
        stop={editingStop}
        placeName={editingStop && <PlaceName placeId={editingStop.placeId} />}
        dayRange={dayRange}
        isSaving={isSavingTime}
        onClose={handleSheetClose}
        onSave={handleTimeSave}
      />
      <Toast open={toastMessage !== null} message={toastMessage ?? ""} />
    </>
  );
}
