"use client";

import { useId } from "react";
import { BottomSheet, Button, type BottomSheetSnap } from "@/shared/ui";
import { PREVIEW_REVIEW_COUNT } from "../config/constants";
import type { Place } from "../model/types";
import PlaceDetail from "./place-detail";

type PlaceDetailSheetProps = {
  place: Place | null;
  snap: BottomSheetSnap;
  onSnapChange: (snap: BottomSheetSnap) => void;
  onClose: () => void;
  onSelect: (place: Place) => void;
  /** 하단 버튼 문구 */
  selectLabel?: string;
};

/** 장소 상세 바텀시트. "리뷰 더보기"를 누르면 full로 펼쳐 전체 리뷰를 보여줌 */
export default function PlaceDetailSheet({
  place,
  snap,
  onSnapChange,
  onClose,
  onSelect,
  selectLabel = "장소 선택하기",
}: PlaceDetailSheetProps) {
  const titleId = useId();

  if (!place) return null;

  const visibleReviewCount = snap === "full" ? place.reviews.length : PREVIEW_REVIEW_COUNT;

  function handleShowMoreReviews() {
    onSnapChange("full");
  }

  function handleSelectClick() {
    if (place) onSelect(place);
  }

  return (
    <BottomSheet
      open
      snap={snap}
      onSnapChange={onSnapChange}
      onClose={onClose}
      labelledBy={titleId}
      footer={
        <Button size="xl" onClick={handleSelectClick}>
          {selectLabel}
        </Button>
      }
    >
      <PlaceDetail
        place={place}
        titleId={titleId}
        visibleReviewCount={visibleReviewCount}
        onShowMoreReviews={handleShowMoreReviews}
      />
    </BottomSheet>
  );
}
