"use client";

import { useState } from "react";
import { PlaceDetailSheet, type Place } from "@/entities/place";
import { MapPinIcon } from "@/shared/assets";
import { MapOverlay, RouteMap, type BottomSheetSnap } from "@/shared/ui";
import { MOCK_GROUP_ALLERGIES } from "../config/mock-candidates";
import { getFocusPoints } from "../lib/focus-points";
import { useExtremeStore } from "../model/extreme-store";
import type { RouletteKind } from "../model/types";
import AllergyWarningModal from "./allergy-warning-modal";

type ExtremePlaceConfirmProps = {
  kind: RouletteKind;
  place: Place;
  onConfirmed: () => void;
  onClose: () => void;
};

/** 룰렛 결과 장소를 지도와 상세 시트로 보여주고 확정함. 음식점은 확정 전에 알러지를 알려줌 */
export default function ExtremePlaceConfirm({
  kind,
  place,
  onConfirmed,
  onClose,
}: ExtremePlaceConfirmProps) {
  const [snap, setSnap] = useState<BottomSheetSnap>("peek");
  const [allergyWarningOpen, setAllergyWarningOpen] = useState(false);
  const confirm = useExtremeStore((state) => state.confirm);

  // TODO: 그룹 알러지 집계 API 연동
  const allergies = kind === "food" ? MOCK_GROUP_ALLERGIES : [];

  // TODO: 장소 확정 API 연동
  function confirmPlace() {
    confirm(kind, place);
    onConfirmed();
  }

  function handleSelect() {
    if (allergies.length > 0) setAllergyWarningOpen(true);
    else confirmPlace();
  }

  function handleAllergyWarningClose() {
    setAllergyWarningOpen(false);
  }

  return (
    <>
      <RouteMap
        fitPoints={getFocusPoints(place.location)}
        label={`${place.name} 위치 지도`}
        className="aspect-[402/674] w-full"
      >
        <MapOverlay position={place.location}>
          <MapPinIcon variant="active" className="h-[47.78px] w-[33.72px]" />
        </MapOverlay>
      </RouteMap>
      <PlaceDetailSheet
        place={place}
        snap={snap}
        onSnapChange={setSnap}
        onClose={onClose}
        onSelect={handleSelect}
        selectLabel="장소 확정하기"
      />
      <AllergyWarningModal
        open={allergyWarningOpen}
        allergies={allergies}
        onClose={handleAllergyWarningClose}
        onConfirmClick={confirmPlace}
      />
    </>
  );
}
