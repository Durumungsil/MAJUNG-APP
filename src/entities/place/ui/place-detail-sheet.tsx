"use client";

import { useId } from "react";
import { BottomSheet, Button, type BottomSheetSnap } from "@/shared/ui";
import type { Place } from "../model/types";
import PlaceDetail from "./place-detail";

type PlaceDetailSheetProps = {
  place: Place | null;
  snap: BottomSheetSnap;
  onSnapChange: (snap: BottomSheetSnap) => void;
  onClose: () => void;
  /** 없으면 하단 선택 버튼을 보여주지 않음 (선택 권한이 없는 멤버 등) */
  onSelect?: (place: Place) => void;
  /** 하단 버튼 문구 */
  selectLabel?: string;
};

/** 장소 상세 바텀시트 */
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

  function handleSelectClick() {
    if (place) onSelect?.(place);
  }

  function handleReviewsExpand() {
    onSnapChange("full");
  }

  return (
    <BottomSheet
      open
      snap={snap}
      onSnapChange={onSnapChange}
      onClose={onClose}
      labelledBy={titleId}
      footer={
        onSelect && (
          <Button size="xl" onClick={handleSelectClick}>
            {selectLabel}
          </Button>
        )
      }
    >
      {/* 장소를 바꾸면 리뷰 펼침 상태를 새로 시작하도록 key를 줌 */}
      <PlaceDetail
        key={place.id}
        place={place}
        titleId={titleId}
        onReviewsExpand={handleReviewsExpand}
      />
    </BottomSheet>
  );
}
