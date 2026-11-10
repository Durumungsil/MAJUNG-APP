"use client";

import { useState, type ReactNode } from "react";
import { PlaceCard, PlaceDetailSheet, type Place } from "@/entities/place";
import { useIntersection } from "@/shared/lib";
import { Button, Spinner, type BottomSheetSnap } from "@/shared/ui";
import {
  addPlaceToDate,
  getSelectedCount,
  isPlaceSelected,
  removePlaceFromDate,
  toSelectionDays,
  type DaySelection,
} from "../lib/day-selection";
import type { SelectionDay } from "../lib/selection-payload";

type PlaceSelectListProps = {
  places: Place[];
  /**
   * 목록 대신 보여줄 내용 (불러오는 중·실패·빈 목록).
   * 카테고리 탭을 바꿔도 고른 장소가 남도록 목록 자리만 바꾸고 이 컴포넌트는 그대로 둠
   */
  fallback?: ReactNode;
  /** 지금 고르는 방문일 (YYYY-MM-DD). Day 탭을 바꾸면 그날의 선택이 따로 쌓임 */
  date: string;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  /** 다음 페이지 요청이 실패하면 자동으로 다시 부르지 않고 더 보기 버튼을 보여줌 */
  isLoadMoreError: boolean;
  onLoadMore: () => void;
  /** 대표자만 타임라인을 만들 수 있으므로 멤버에게는 생성 버튼과 상세 시트의 장소 선택 버튼을 숨김 */
  canSubmit: boolean;
  /** 타임라인 생성 요청 중이면 버튼에 진행 상태를 표시함 */
  isSubmitting: boolean;
  /** 방문일별로 고른 장소를 고른 순서대로 넘김 */
  onSubmit: (days: SelectionDay[]) => void;
};

export default function PlaceSelectList({
  places,
  fallback,
  date,
  hasNextPage,
  isFetchingNextPage,
  isLoadMoreError,
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
    fallback === undefined && hasNextPage && !isFetchingNextPage && !isLoadMoreError,
  );

  const selectedStopsOfDate = selection[date] ?? [];

  function handlePlaceClick(place: Place) {
    setPreviewPlace(place);
    setSnap("peek");
  }

  function handleSheetClose() {
    setPreviewPlace(null);
  }

  // 이미 고른 장소면 시트 버튼이 선택 취소로 바뀜
  const isPreviewSelected =
    previewPlace !== null && isPlaceSelected(selectedStopsOfDate, previewPlace.id);

  function handlePlaceSelect(place: Place) {
    setSelection((prev) =>
      isPlaceSelected(prev[date] ?? [], place.id)
        ? removePlaceFromDate(prev, date, place.id)
        : addPlaceToDate(prev, date, { placeId: place.id, category: place.category }),
    );
    setPreviewPlace(null);
  }

  function handleSubmitClick() {
    onSubmit(toSelectionDays(selection));
  }

  return (
    <>
      {/* 목록만 이 영역 안에서 스크롤되고, 생성 버튼은 아래에 고정됨 */}
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        {fallback ?? (
          <>
            <ul className="flex flex-col gap-5">
              {places.map((place) => (
                <li key={place.id}>
                  <PlaceCard
                    place={place}
                    selected={
                      isPlaceSelected(selectedStopsOfDate, place.id) ||
                      previewPlace?.id === place.id
                    }
                    onClick={() => handlePlaceClick(place)}
                  />
                </li>
              ))}
            </ul>
            <div ref={loadMoreRef} className="flex justify-center">
              {isFetchingNextPage && <Spinner />}
              {isLoadMoreError && !isFetchingNextPage && (
                <button
                  type="button"
                  onClick={onLoadMore}
                  className="mt-5 w-full text-center text-xs text-text-muted"
                >
                  더 보기
                </button>
              )}
            </div>
          </>
        )}
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
        onSelect={canSubmit ? handlePlaceSelect : undefined}
        selectLabel={isPreviewSelected ? "선택 취소하기" : undefined}
      />
    </>
  );
}
