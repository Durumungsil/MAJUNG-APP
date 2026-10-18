"use client";

import { Button, Modal } from "@/shared/ui";

type HintExpiredModalProps = {
  open: boolean;
  backHref: string;
};

function handleModalClose() {}

export default function HintExpiredModal({ open, backHref }: HintExpiredModalProps) {
  return (
    <Modal
      open={open}
      onClose={handleModalClose}
      labelledBy="hint-expired-title"
      compact
      className="gap-3"
    >
      <h2 id="hint-expired-title" className="text-xl text-text-primary">
        장소 힌트가 종료되었어요!
      </h2>
      <Button href={backHref} size="md" variant="secondary">
        지도로 돌아가기
      </Button>
    </Modal>
  );
}
