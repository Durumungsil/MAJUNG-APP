"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/shared/lib";
import { getTripDates } from "../lib/trip-dates";

type ScheduleHeaderProps = {
  startDate: string;
  endDate: string;
  /** 오른쪽 끝 링크 (지도로 보기 / 타임라인 보기) */
  action?: ReactNode;
};

/** "YYYY-MM-DD의 일정" 제목과 Day 탭 */
export default function ScheduleHeader({ startDate, endDate, action }: ScheduleHeaderProps) {
  const dates = getTripDates(startDate, endDate);
  const [selectedIndex, setSelectedIndex] = useState(0);

  function handleDayClick(index: number) {
    setSelectedIndex(index);
  }

  return (
    <div className="flex items-start justify-between">
      <div className="flex flex-col gap-3">
        <h2 className="text-l text-text-primary">{dates[selectedIndex]}의 일정</h2>
        <div className="flex gap-2">
          {dates.map((date, index) => {
            const selected = index === selectedIndex;
            return (
              <button
                key={date}
                type="button"
                aria-pressed={selected}
                onClick={() => handleDayClick(index)}
                className={cn(
                  "rounded-lg px-4 py-1 text-xs whitespace-nowrap text-text-primary",
                  selected ? "bg-secondary-400" : "bg-secondary-300",
                )}
              >
                Day {index + 1}
              </button>
            );
          })}
        </div>
      </div>
      {action}
    </div>
  );
}
