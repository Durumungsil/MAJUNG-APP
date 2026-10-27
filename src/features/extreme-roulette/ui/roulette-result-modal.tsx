"use client";

import type { Place } from "@/entities/place";
import { Button, Modal } from "@/shared/ui";

type RouletteResultModalProps = {
  place: Place | null;
  detailHref: string;
  onClose: () => void;
  onRespinClick: () => void;
};

export default function RouletteResultModal({
  place,
  detailHref,
  onClose,
  onRespinClick,
}: RouletteResultModalProps) {
  return (
    <Modal
      open={place !== null}
      onClose={onClose}
      labelledBy="roulette-result-title"
      compact
      className="gap-3"
    >
      <div className="flex flex-col items-center text-center">
        <h2 id="roulette-result-title" className="text-xl text-text-primary">
          {place?.name}
        </h2>
        <p className="text-xs text-text-muted">상세 정보를 확인하고 확정해요</p>
      </div>
      <div className="flex gap-3">
        <Button size="md" variant="tertiary" href={detailHref}>
          상세정보 확인
        </Button>
        <Button size="md" variant="secondary" onClick={onRespinClick}>
          다시 돌리기
        </Button>
      </div>
    </Modal>
  );
}
