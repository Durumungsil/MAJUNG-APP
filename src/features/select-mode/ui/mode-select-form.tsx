"use client";

import { useState, type CSSProperties } from "react";
import { cn } from "@/shared/lib";
import { Button } from "@/shared/ui";
import { DEFAULT_MODE_INDEX, TRAVEL_MODES } from "../config/modes";
import { getSwipeStep, getVisibleSlots, wrapIndex } from "../lib/carousel";
import { useSwipe } from "../model/use-swipe";
import ModeCard from "./mode-card";

const CARD_STEP_PX = 202;
const SWIPE_THRESHOLD_PX = 50;
const SLOT_RADIUS = 2;

type ModeSelectFormProps = {
  confirmHref: string;
};

export default function ModeSelectForm({ confirmHref }: ModeSelectFormProps) {
  const [position, setPosition] = useState(DEFAULT_MODE_INDEX);
  const current = TRAVEL_MODES[wrapIndex(TRAVEL_MODES.length, position)];

  function handleSwipeEnd(dragX: number) {
    const step = getSwipeStep(dragX, SWIPE_THRESHOLD_PX);
    setPosition((prev) => prev + step);
  }

  const { dragX, dragging, swipeHandlers } = useSwipe({ onSwipeEnd: handleSwipeEnd });

  function handleSlotClick(offset: number) {
    setPosition((prev) => prev + offset);
  }

  return (
    <div className="flex flex-1 flex-col justify-between gap-10">
      <div className="mt-10 flex flex-col items-center gap-19.25">
        <div
          role="group"
          aria-roledescription="캐러셀"
          aria-label="여행 모드"
          className="relative -mx-page h-68.25 w-[calc(100%+var(--spacing-gutter)*2)] touch-pan-y overflow-hidden select-none"
          {...swipeHandlers}
        >
          {getVisibleSlots(position, SLOT_RADIUS).map(({ virtualIndex, offset }) => {
            const mode = TRAVEL_MODES[wrapIndex(TRAVEL_MODES.length, virtualIndex)];
            const isCurrent = offset === 0;
            const isOffscreen = Math.abs(offset) > 1;

            const style: CSSProperties = {
              transform: `translate(-50%, -50%) translateX(${offset * CARD_STEP_PX + dragX}px)`,
            };

            return (
              <button
                key={virtualIndex}
                type="button"
                aria-label={isCurrent ? `${mode.name} 모드 (선택됨)` : `${mode.name} 모드 보기`}
                aria-hidden={isOffscreen}
                tabIndex={isOffscreen ? -1 : 0}
                onClick={() => handleSlotClick(offset)}
                style={style}
                className={cn(
                  "absolute top-1/2 left-1/2",
                  isCurrent ? "z-10" : "z-0",
                  !dragging && "transition-transform duration-300 ease-out",
                )}
              >
                <ModeCard name={mode.name} size={isCurrent ? "lg" : "sm"} />
              </button>
            );
          })}
        </div>
        <p aria-live="polite" className="min-h-6.5 text-center text-s text-text-muted">
          {current.description}
        </p>
      </div>
      <Button variant="primary" href={confirmHref}>
        모드 확정하기
      </Button>
    </div>
  );
}
