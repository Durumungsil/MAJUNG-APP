"use client";

import { useState } from "react";
import { PlaceDetailSheet } from "@/entities/place";
import { MapPinIcon } from "@/shared/assets";
import { ERROR_MESSAGES } from "@/shared/config/error-messages";
import { useToast } from "@/shared/lib";
import { MapOverlay, RouteMap, Toast, type BottomSheetSnap } from "@/shared/ui";
import { useGroupAllergies } from "../api/queries";
import { getFocusPoints } from "../lib/focus-points";
import { useExtremeStore } from "../model/extreme-store";
import type { RouletteResult } from "../model/types";
import AllergyWarningModal from "./allergy-warning-modal";

type ExtremePlaceConfirmProps = {
  groupId: number;
  result: RouletteResult;
  onConfirmed: () => void;
  onClose: () => void;
};

/** 룰렛 결과 장소를 지도와 상세 시트로 보여주고 확정함. 음식점은 확정 전에 알러지를 알려줌 */
export default function ExtremePlaceConfirm({
  groupId,
  result,
  onConfirmed,
  onClose,
}: ExtremePlaceConfirmProps) {
  const { kind, place } = result;
  const [snap, setSnap] = useState<BottomSheetSnap>("peek");
  const [allergyWarningOpen, setAllergyWarningOpen] = useState(false);
  const confirm = useExtremeStore((state) => state.confirm);
  const { toastMessage, showToast } = useToast();
  // 음식점만 확정 전에 알러지를 알려주므로 음식점일 때만 미리 받아 둠
  const allergiesQuery = useGroupAllergies(groupId, kind === "food");

  // 확정 API가 없어 확정 결과는 브라우저 메모리에만 둠 (.local.claude.md 백엔드 요청 6번)
  function confirmPlace() {
    confirm(kind, place);
    onConfirmed();
  }

  async function handleSelect() {
    if (kind !== "food") {
      confirmPlace();
      return;
    }
    const allergies = allergiesQuery.data ?? (await allergiesQuery.refetch()).data;
    if (allergies === undefined) {
      showToast(ERROR_MESSAGES.requestFailed);
      return;
    }
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
        allergies={allergiesQuery.data ?? []}
        onClose={handleAllergyWarningClose}
        onConfirmClick={confirmPlace}
      />
      <Toast open={toastMessage !== null} message={toastMessage ?? ""} />
    </>
  );
}
