"use client";

import { useState } from "react";
import { PlaceCard, PlaceDetailSheet, type Place } from "@/entities/place";
import { useIntersection } from "@/shared/lib";
import { Button, Spinner, type BottomSheetSnap } from "@/shared/ui";

type PlaceSelectListProps = {
  places: Place[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  onLoadMore: () => void;
  /** 타임라인 생성 요청 중이면 버튼에 진행 상태를 표시함 */
  isSubmitting: boolean;
  /** 선택한 장소 id를 고른 순서대로 넘김 */
  onSubmit: (destinationIds: number[]) => void;
};

export default function PlaceSelectList({
  places,
  hasNextPage,
  isFetchingNextPage,
  onLoadMore,
  isSubmitting,
  onSubmit,
}: PlaceSelectListProps) {
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [previewPlace, setPreviewPlace] = useState<Place | null>(null);
  const [snap, setSnap] = useState<BottomSheetSnap>("peek");
  const loadMoreRef = useIntersection<HTMLDivElement>(
    onLoadMore,
    hasNextPage && !isFetchingNextPage,
  );

  function handlePlaceClick(place: Place) {
    setPreviewPlace(place);
    setSnap("peek");
  }

  function handleSheetClose() {
    setPreviewPlace(null);
  }

  function handlePlaceSelect(place: Place) {
    setSelectedIds((prev) => new Set(prev).add(place.id));
    setPreviewPlace(null);
  }

  function handleSubmitClick() {
    onSubmit([...selectedIds]);
  }

  return (
    <>
      <ul className="flex flex-col gap-5">
        {places.map((place) => (
          <li key={place.id}>
            <PlaceCard
              place={place}
              selected={selectedIds.has(place.id) || previewPlace?.id === place.id}
              onClick={() => handlePlaceClick(place)}
            />
          </li>
        ))}
      </ul>
      <div ref={loadMoreRef} className="flex justify-center">
        {isFetchingNextPage && <Spinner />}
      </div>
      <Button
        size="xl"
        onClick={handleSubmitClick}
        disabled={selectedIds.size === 0 || isSubmitting}
        aria-busy={isSubmitting}
        className="mt-10"
      >
        타임라인 생성하기
      </Button>
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
