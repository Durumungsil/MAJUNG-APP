"use client";

import { useState } from "react";
import { Button } from "@/shared/ui";
import { DEFAULT_MODE_INDEX, TRAVEL_MODES } from "../config/modes";
import { getCarouselItems, shiftIndex } from "../lib/get-carousel-modes";
import ModeCard from "./mode-card";

type ModeSelectFormProps = {
  confirmHref: string;
};

export default function ModeSelectForm({ confirmHref }: ModeSelectFormProps) {
  const [selectedIndex, setSelectedIndex] = useState(DEFAULT_MODE_INDEX);
  const [prev, current, next] = getCarouselItems(TRAVEL_MODES, selectedIndex);

  function handlePrevClick() {
    setSelectedIndex((index) => shiftIndex(TRAVEL_MODES.length, index, -1));
  }

  function handleNextClick() {
    setSelectedIndex((index) => shiftIndex(TRAVEL_MODES.length, index, 1));
  }

  return (
    <div className="flex flex-1 flex-col justify-between gap-10">
      <div className="mt-10 flex flex-col items-center gap-19.25">
        <div
          role="group"
          aria-roledescription="캐러셀"
          aria-label="여행 모드"
          className="relative -mx-page flex w-[calc(100%+var(--spacing-gutter)*2)] items-center justify-center overflow-hidden"
        >
          <button
            type="button"
            aria-label={`${prev.name} 모드 보기`}
            onClick={handlePrevClick}
            className="absolute right-[calc(50%+--spacing(30.5))]"
          >
            <ModeCard name={prev.name} size="sm" />
          </button>
          <div aria-live="polite">
            <ModeCard name={current.name} size="lg" />
          </div>
          <button
            type="button"
            aria-label={`${next.name} 모드 보기`}
            onClick={handleNextClick}
            className="absolute left-[calc(50%+--spacing(30.5))]"
          >
            <ModeCard name={next.name} size="sm" />
          </button>
        </div>
        <p className="min-h-6.5 text-center text-s text-text-muted">{current.description}</p>
      </div>
      <Button variant="primary" href={confirmHref}>
        모드 확정하기
      </Button>
    </div>
  );
}
