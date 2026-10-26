"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/shared/lib";
import { getTripDates } from "../lib/trip-dates";

type ScheduleHeaderProps = {
  startDate: string;
  endDate: string;
  /** 오른쪽 끝 링크 (지도로 보기 / 타임라인 보기) */
  action?: ReactNode;
  /** 선택한 Day 탭 위치. 넘기지 않으면 컴포넌트가 직접 관리함 */
  selectedIndex?: number;
  onSelectedIndexChange?: (index: number) => void;
};

/** "YYYY-MM-DD의 일정" 제목과 Day 탭 */
export default function ScheduleHeader({
  startDate,
  endDate,
  action,
  selectedIndex: controlledIndex,
  onSelectedIndexChange,
}: ScheduleHeaderProps) {
  const dates = getTripDates(startDate, endDate);
  const [uncontrolledIndex, setUncontrolledIndex] = useState(0);
  const selectedIndex = controlledIndex ?? uncontrolledIndex;

  function handleDayClick(index: number) {
    setUncontrolledIndex(index);
    onSelectedIndexChange?.(index);
  }

  return (
    <div className="flex items-start justify-between">
      {/* Day 탭이 많아도 오른쪽 링크가 밀려나지 않게 탭 줄만 가로 스크롤함 */}
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <h2 className="text-l text-text-primary">{dates[selectedIndex]}의 일정</h2>
        <div className="scrollbar-none flex gap-2 overflow-x-auto">
          {dates.map((date, index) => {
            const selected = index === selectedIndex;
            return (
              <button
                key={date}
                type="button"
                aria-pressed={selected}
                onClick={() => handleDayClick(index)}
                className={cn(
                  "shrink-0 rounded-lg px-4 py-1 text-xs whitespace-nowrap text-text-primary",
                  selected ? "bg-secondary-400" : "bg-secondary-300",
                )}
              >
                Day {index + 1}
              </button>
            );
          })}
        </div>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
