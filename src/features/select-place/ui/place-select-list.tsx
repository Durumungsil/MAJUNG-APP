"use client";

import { useState } from "react";
import { PlaceCard, PlaceDetailSheet, type Place } from "@/entities/place";
import { useIntersection } from "@/shared/lib";
import { Button, Spinner, type BottomSheetSnap } from "@/shared/ui";
import {
  addPlaceToDate,
  getSelectedCount,
  toSelectionDays,
  type DaySelection,
} from "../lib/day-selection";
import type { SelectionDay } from "../lib/selection-payload";

type PlaceSelectListProps = {
  places: Place[];
  /** 지금 고르는 방문일 (YYYY-MM-DD). Day 탭을 바꾸면 그날의 선택이 따로 쌓임 */
  date: string;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  onLoadMore: () => void;
  /** 대표자만 타임라인을 만들 수 있으므로 멤버에게는 생성 버튼을 숨김 */
  canSubmit: boolean;
  /** 타임라인 생성 요청 중이면 버튼에 진행 상태를 표시함 */
  isSubmitting: boolean;
  /** 방문일별로 고른 장소를 고른 순서대로 넘김 */
  onSubmit: (days: SelectionDay[]) => void;
};

export default function PlaceSelectList({
  places,
  date,
  hasNextPage,
  isFetchingNextPage,
  onLoadMore,
  canSubmit,
  isSubmitting,
  onSubmit,
}: PlaceSelectListProps) {
  const [selection, setSelection] = useState<DaySelection>({});
  const [previewPlace, setPreviewPlace] = useState<Place | null>(null);
  const [snap, setSnap] = useState<BottomSheetSnap>("peek");
  const loadMoreRef = useIntersection<HTMLDivElement>(
    onLoadMore,
    hasNextPage && !isFetchingNextPage,
  );

  const selectedIdsOfDate = selection[date] ?? [];

  function handlePlaceClick(place: Place) {
    setPreviewPlace(place);
    setSnap("peek");
  }

  function handleSheetClose() {
    setPreviewPlace(null);
  }

  function handlePlaceSelect(place: Place) {
    setSelection((prev) => addPlaceToDate(prev, date, place.id));
    setPreviewPlace(null);
  }

  function handleSubmitClick() {
    onSubmit(toSelectionDays(selection));
  }

  return (
    <>
      {/* 목록만 이 영역 안에서 스크롤되고, 생성 버튼은 아래에 고정됨 */}
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        <ul className="flex flex-col gap-5">
          {places.map((place) => (
            <li key={place.id}>
              <PlaceCard
                place={place}
                selected={selectedIdsOfDate.includes(place.id) || previewPlace?.id === place.id}
                onClick={() => handlePlaceClick(place)}
              />
            </li>
          ))}
        </ul>
        <div ref={loadMoreRef} className="flex justify-center">
          {isFetchingNextPage && <Spinner />}
        </div>
      </div>
      {canSubmit && (
        <Button
          size="xl"
          onClick={handleSubmitClick}
          disabled={getSelectedCount(selection) === 0 || isSubmitting}
          aria-busy={isSubmitting}
          className="mt-10 shrink-0"
        >
          타임라인 생성하기
        </Button>
      )}
      <PlaceDetailSheet
        place={previewPlace}
        snap={snap}
        onSnapChange={setSnap}
        onClose={handleSheetClose}
        onSelect={handlePlaceSelect}
      />
    </>
  );
}
