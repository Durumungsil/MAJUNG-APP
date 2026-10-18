"use client";

import { Button, Modal } from "@/shared/ui";
import { formatHintLimitNotice } from "../lib/hint-countdown";

type HintIntroModalProps = {
  open: boolean;
  limitSeconds: number;
  cancelHref: string;
  onStartClick: () => void;
};

function handleModalClose() {}

export default function HintIntroModal({
  open,
  limitSeconds,
  cancelHref,
  onStartClick,
}: HintIntroModalProps) {
  return (
    <Modal
      open={open}
      onClose={handleModalClose}
      labelledBy="hint-intro-title"
      compact
      className="gap-3"
    >
      <div className="flex flex-col items-center">
        <h2 id="hint-intro-title" className="text-xl text-text-primary">
          {formatHintLimitNotice(limitSeconds)}
        </h2>
        <p className="text-xs text-text-muted">힌트를 사용하면 취소할 수 없어요</p>
      </div>
      <div className="flex gap-3">
        <Button href={cancelHref} size="md" variant="tertiary">
          취소하기
        </Button>
        <Button size="md" variant="secondary" onClick={onStartClick}>
          힌트 사용하기
        </Button>
      </div>
    </Modal>
  );
}
