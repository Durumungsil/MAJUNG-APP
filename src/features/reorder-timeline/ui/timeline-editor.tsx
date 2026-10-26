"use client";

import { useState } from "react";
import { TimelineStopCard, type ItineraryDay, type TimelineStop } from "@/entities/journey";
import { Button } from "@/shared/ui";
import { reorderStopPlaces } from "../lib/reorder-stops";
import { useLongPressReorder } from "../model/use-long-press-reorder";

type TimelineEditorProps = {
  initialDays: ItineraryDay[];
  /** 지금 보고 있는 날짜 (YYYY-MM-DD) */
  date: string | undefined;
  confirmHref: string;
};

/** 날짜별로 장소 순서를 바꿈. 다른 Day 탭을 봤다 와도 바꾼 순서가 남도록 날짜별로 들고 있음 */
export default function TimelineEditor({ initialDays, date, confirmHref }: TimelineEditorProps) {
  const [stopsByDate, setStopsByDate] = useState<Record<string, TimelineStop[]>>(() =>
    Object.fromEntries(initialDays.map((day) => [day.date, day.stops])),
  );
  const stops = (date && stopsByDate[date]) || [];

  function handleStopMove(from: number, to: number) {
    if (!date) return;
    setStopsByDate((prev) => ({
      ...prev,
      [date]: reorderStopPlaces(prev[date] ?? [], from, to),
    }));
  }

  const { draggingIndex, getItemProps } = useLongPressReorder({ onMove: handleStopMove });

  return (
    <>
      <ol aria-label="타임라인" className="flex flex-col gap-5 select-none">
        {stops.map((stop, index) => (
          <li key={stop.id} {...getItemProps(index)} className="[-webkit-touch-callout:none]">
            <TimelineStopCard stop={stop} highlighted={draggingIndex === index} />
          </li>
        ))}
      </ol>
      <Button size="xl" href={confirmHref} className="mt-10">
        타임라인 확정하기
      </Button>
    </>
  );
}
