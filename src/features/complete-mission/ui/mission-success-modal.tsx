"use client";

import { Button, Modal } from "@/shared/ui";
import { formatMissionSuccessTitle } from "../lib/format-mission-title";

type MissionSuccessModalProps = {
  open: boolean;
  missionNumber: number;
  onClose: () => void;
  onNextPlaceClick: () => void;
};

export default function MissionSuccessModal({
  open,
  missionNumber,
  onClose,
  onNextPlaceClick,
}: MissionSuccessModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      labelledBy="mission-success-title"
      compact
      className="gap-3"
    >
      <h2 id="mission-success-title" className="text-xl text-text-primary">
        {formatMissionSuccessTitle(missionNumber)}
      </h2>
      <div className="flex gap-3">
        <Button size="md" variant="tertiary" onClick={onClose}>
          주변 둘러보기
        </Button>
        <Button size="md" variant="secondary" onClick={onNextPlaceClick}>
          다음 장소 찾기
        </Button>
      </div>
    </Modal>
  );
}
