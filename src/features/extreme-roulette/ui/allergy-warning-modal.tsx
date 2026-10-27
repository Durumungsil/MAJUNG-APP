"use client";

import { Button, Modal } from "@/shared/ui";
import { formatAllergyList } from "../lib/allergy";

type AllergyWarningModalProps = {
  open: boolean;
  /** 그룹 전체 알러지 집계. 누가 냈는지는 표시하지 않음 */
  allergies: readonly string[];
  onClose: () => void;
  onConfirmClick: () => void;
};

/** 음식점을 확정하기 전에 그룹 알러지를 알려주는 모달 */
export default function AllergyWarningModal({
  open,
  allergies,
  onClose,
  onConfirmClick,
}: AllergyWarningModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      labelledBy="allergy-warning-title"
      compact
      className="gap-3"
    >
      <div className="flex flex-col items-center gap-1 text-center">
        <h2 id="allergy-warning-title" className="text-xl text-text-primary">
          {formatAllergyList(allergies)}
          <br />
          알러지가 있는 멤버가 있어요!
        </h2>
        <p className="w-41.75 text-xs text-text-muted">
          선택을 확정하기 전에 알아두세요
          <br />
          마중은 책임지지 않아요
        </p>
      </div>
      <div className="flex gap-3">
        <Button size="md" variant="tertiary" onClick={onClose}>
          취소하기
        </Button>
        <Button size="md" variant="secondary" onClick={onConfirmClick}>
          확인했어요
        </Button>
      </div>
    </Modal>
  );
}
